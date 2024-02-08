import { Injectable, OnModuleInit} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Events} from "./entities/events.entity";
import {Repository} from "typeorm";
import AddEventArgs from "./dto/addEvent.args";
import UpdateEventArgs from "./dto/updateEvent.args";
import {UsersService} from "../users/users.service";
import {ModuleRef} from "@nestjs/core";


@Injectable()
export class EventsService implements OnModuleInit {
    private userService: UsersService;
    constructor(@InjectRepository(Events)public readonly eventRepo: Repository<Events>,
               private moduleRef: ModuleRef) {}

    onModuleInit() {
        this.userService = this.moduleRef.get(UsersService, {strict: false});
    }
    async findAllEvents(): Promise<Events[]>{
        let events: Events[] = await this.eventRepo.find({relations: ['attendees', 'comments', 'comments.user', 'organizer']});
        return events;
    }

    async findEventById(id: number): Promise<Events> {
        let event: Events = await this.eventRepo.findOne({where: {id: id}, relations: ['attendees', 'comments', 'comments.user', 'organizer']});
        return event;
    }

    async deleteEvent(id: number): Promise<string> {
        await this.eventRepo.delete(id);
        return "Event has been deleted";
    }

    async addEvent(addEventArgs: AddEventArgs): Promise<string> {
        let event: Events = new Events();
        const user= await this.userService.findUserById(addEventArgs.organizerId)
        event.name = addEventArgs.name;
        event.localization = addEventArgs.localization;
        event.date = addEventArgs.date;
        event.general_information = addEventArgs.general_information;
        event.competitions = addEventArgs.competitions;
        event.localization_details = addEventArgs.localization_details;
        event.bannerImage = addEventArgs.bannerImage;
        event.organizer = user;

        await this.eventRepo.save(event);
        return "Event has been added";
    }

    async updateEvent(updateEventArgs: UpdateEventArgs): Promise<string> {
        let event: Events = await this.eventRepo.findOne({where: {id: updateEventArgs.id}})
        event.name = updateEventArgs.name;
        event.localization = updateEventArgs.localization;
        event.date = updateEventArgs.date;
        event.general_information = updateEventArgs.general_information;
        event.competitions = updateEventArgs.competitions;
        event.localization_details = updateEventArgs.localization_details;
        event.bannerImage = updateEventArgs.bannerImage;
       

        await this.eventRepo.save(event);
        return "Event has been updated";
    }

    async findFutureEventsForUser(userId: number): Promise<Events[]> {
        const currentDate = new Date();
        return this.eventRepo.createQueryBuilder('event')
            .leftJoinAndSelect('event.attendees', 'attendee')
            .leftJoinAndSelect('event.organizer', 'organizer')
            .where('event.date >= :currentDate', { currentDate })
            .andWhere('attendee.id = :userId', { userId })
            .getMany();
    }
    
    async findPastEventsForUser(userId: number): Promise<Events[]> {
        const currentDate = new Date();
        return this.eventRepo.createQueryBuilder('event')
            .leftJoinAndSelect('event.attendees', 'attendee')
            .leftJoinAndSelect('event.organizer', 'organizer')
            .where('event.date < :currentDate', { currentDate })
            .andWhere('attendee.id = :userId', { userId })
            .orderBy('event.date', 'DESC')
            .getMany();
    }

    async countAttendees(id: number): Promise<number> {
        const event = await this.eventRepo.findOne({
            where: { id},
            relations: { attendees: true },
        });
        if (!event || !event.attendees) {
            return 0;
        }
        return event.attendees.length;
    }

    async joinEvent(userId: number, eventId: number): Promise<string> {
        const event = await this.eventRepo.findOne({ 
            where: { id: eventId }, 
            relations: ['attendees'] 
        });
        const user = await this.userService.findUserById(userId);

        if (event.attendees.some(attendee => attendee.id === userId)) {
            throw new Error('User already joined the event');
        }

        event.attendees.push(user);
        await this.eventRepo.save(event);

        return 'User has joined the event';
    }

    async leaveEvent(userId: number, eventId: number): Promise<string> {
        const event = await this.eventRepo.findOne({ 
            where: { id: eventId }, 
            relations: ['attendees'] 
        });

        const index = event.attendees.findIndex(attendee => attendee.id === userId);
        if (index === -1) {
            throw new Error('User is not a participant of this event');
        }

        event.attendees.splice(index, 1);
        await this.eventRepo.save(event);

        return 'User has left the event';
    }
    
}
