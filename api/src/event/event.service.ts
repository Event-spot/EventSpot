import {forwardRef, Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import EventEntity from "./entities/event.entity";
import {Repository} from "typeorm";
import AddEventArgs from "./dto/addEvent.args";
import UpdateEventArgs from "./dto/updateEvent.args";
import {UserService} from "../user/user.service";
import {UserEntity} from "../user/entities/user.entity";
import AddAttendeeInput from "./dto/add-attendee-input";
import {ModuleRef} from "@nestjs/core";

@Injectable()
export class EventService implements OnModuleInit {
    private userService: UserService;
    constructor(@InjectRepository(EventEntity)public readonly eventRepo: Repository<EventEntity>,
               private moduleRef: ModuleRef) {}

    onModuleInit() {
        this.userService = this.moduleRef.get(UserService, {strict: false});
    }

    async findAllEvents(): Promise<EventEntity[]>{
        let events: EventEntity[] = await this.eventRepo.find({relations: {attendees: true}});
        return events;
    }

    async findEventById(id: number): Promise<EventEntity> {
        let event: EventEntity = await this.eventRepo.findOne({where: {id: id}});
        return event;
    }

    async deleteEvent(id: number): Promise<string> {
        await this.eventRepo.delete(id);
        return "Event has been deleted";
    }

    async addEvent(addEventArgs: AddEventArgs): Promise<string> {
        let event: EventEntity = new EventEntity();
        event.name = addEventArgs.name;
        event.localization = addEventArgs.localization;
        event.date = addEventArgs.date;
        event.description = addEventArgs.description;
        event.attendees = [];

        await this.eventRepo.save(event);
        return "Event has been added";
    }

    async updateEvent(updateEventArgs: UpdateEventArgs): Promise<string> {
        let event: EventEntity = await this.eventRepo.findOne({where: {id: updateEventArgs.id}})
        event.name = updateEventArgs.name;
        event.localization = updateEventArgs.localization;
        event.date = updateEventArgs.date;
        event.description = updateEventArgs.description;

        await this.eventRepo.save(event);
        return "Event has been updated";
    }

    async addAttendee(addAttendeeInput: AddAttendeeInput): Promise<string> {
        let event: EventEntity = await this.eventRepo.findOne({where: {id: addAttendeeInput.id}, relations: {attendees: true}})
        let user: UserEntity = await this.userService.findUserById(addAttendeeInput.userId);
        event.attendees = [...event.attendees, user]

        await this.eventRepo.save(event);
        return "Attendee has been added to Event";
    }
}
