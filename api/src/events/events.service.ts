import {forwardRef, Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import EventsEntity from "./entities/events.entity";
import {Repository} from "typeorm";
import AddEventArgs from "./dto/addEvent.args";
import UpdateEventArgs from "./dto/updateEvent.args";
import {UsersService} from "../users/users.service";
import {UsersEntity} from "../users/entities/users.entity";
import AddAttendeeInput from "./dto/add-attendee-input";
import {ModuleRef} from "@nestjs/core";

@Injectable()
export class EventsService implements OnModuleInit {
    private userService: UsersService;
    constructor(@InjectRepository(EventsEntity)public readonly eventRepo: Repository<EventsEntity>,
               private moduleRef: ModuleRef) {}

    onModuleInit() {
        this.userService = this.moduleRef.get(UsersService, {strict: false});
    }

    async findAllEvents(): Promise<EventsEntity[]>{
        let events: EventsEntity[] = await this.eventRepo.find({relations: {attendees: true}});
        return events;
    }

    async findEventById(id: number): Promise<EventsEntity> {
        let event: EventsEntity = await this.eventRepo.findOne({where: {id: id}});
        return event;
    }

    async deleteEvent(id: number): Promise<string> {
        await this.eventRepo.delete(id);
        return "Event has been deleted";
    }

    async addEvent(addEventArgs: AddEventArgs): Promise<string> {
        let event: EventsEntity = new EventsEntity();
        event.name = addEventArgs.name;
        event.localization = addEventArgs.localization;
        event.date = addEventArgs.date;
        event.description = addEventArgs.description;
        event.attendees = [];

        await this.eventRepo.save(event);
        return "Event has been added";
    }

    async updateEvent(updateEventArgs: UpdateEventArgs): Promise<string> {
        let event: EventsEntity = await this.eventRepo.findOne({where: {id: updateEventArgs.id}})
        event.name = updateEventArgs.name;
        event.localization = updateEventArgs.localization;
        event.date = updateEventArgs.date;
        event.description = updateEventArgs.description;

        await this.eventRepo.save(event);
        return "Event has been updated";
    }

    async addAttendee(addAttendeeInput: AddAttendeeInput): Promise<string> {
        let event: EventsEntity = await this.eventRepo.findOne({where: {id: addAttendeeInput.id}, relations: {attendees: true}})
        let user: UsersEntity = await this.userService.findUserById(addAttendeeInput.userId);
        event.attendees = [...event.attendees, user]

        await this.eventRepo.save(event);
        return "Attendee has been added to Event";
    }
}
