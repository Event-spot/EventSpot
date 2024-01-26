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
        let events: Events[] = await this.eventRepo.find({relations: ['attendees', 'comments', 'comments.user']});
        return events;
    }

    async findEventById(id: number): Promise<Events> {
        let event: Events = await this.eventRepo.findOne({where: {id: id}, relations: ['attendees', 'comments', 'comments.user']});
        return event;
    }

    async deleteEvent(id: number): Promise<string> {
        await this.eventRepo.delete(id);
        return "Event has been deleted";
    }

    async addEvent(addEventArgs: AddEventArgs): Promise<string> {
        let event: Events = new Events();
        event.name = addEventArgs.name;
        event.localization = addEventArgs.localization;
        event.date = addEventArgs.date;
        event.general_information = addEventArgs.general_information;
        event.competitions = addEventArgs.competitions;
        event.localization_details = addEventArgs.localization_details;

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
       

        await this.eventRepo.save(event);
        return "Event has been updated";
    }

    async findFutureEventsForUser(userId: number): Promise<Events[]> {
        const currentDate = new Date();
        return this.eventRepo.createQueryBuilder('event')
            .leftJoinAndSelect('event.attendees', 'attendee')
            .where('event.date >= :currentDate', { currentDate })
            .andWhere('attendee.id = :userId', { userId })
            .getMany();
    }
    
    async findPastEventsForUser(userId: number): Promise<Events[]> {
        const currentDate = new Date();
        return this.eventRepo.createQueryBuilder('event')
            .leftJoinAndSelect('event.attendees', 'attendee')
            .where('event.date < :currentDate', { currentDate })
            .andWhere('attendee.id = :userId', { userId })
            .orderBy('event.date', 'DESC')
            .getMany();
    }
    
}
