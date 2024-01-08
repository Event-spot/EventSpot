import {forwardRef, Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {UserEntity} from "./entities/user.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {AddUserArgs} from "./dto/addUser.args";
import {UpdateUserArgs} from "./dto/updateUser.args";
import {EventService} from "../event/event.service";
import {ModuleRef} from "@nestjs/core";
import EventEntity from "../event/entities/event.entity";
import * as events from "events";

@Injectable()
export class UserService implements OnModuleInit {
    private eventService: EventService
    constructor(@InjectRepository(UserEntity)public readonly usersRepo: Repository<UserEntity>,
                private moduleRef: ModuleRef) {}

    onModuleInit() {
        this.eventService = this.moduleRef.get(EventService, {strict: false});
    }

    async findAllUsers(): Promise<UserEntity[]>{
        let users = await this.usersRepo.find({relations: {events: true}});
        return users;
    }

    async findUserById(id: number): Promise<UserEntity> {
        let user = await this.usersRepo.findOne({where: {id: id}});
        return user;
    }

    async getEvents(eventId: number): Promise<EventEntity> {
        return this.eventService.findEventById(eventId);
    }

    async deleteUser(id: number): Promise<string> {
        await this.usersRepo.delete(id)
        return "User has been deleted"
    }

    async addUser(addUserArgs: AddUserArgs): Promise<string>{
        let user: UserEntity = new UserEntity();
        user.email = addUserArgs.email;
        user.password = addUserArgs.password;
        user.firstname = addUserArgs.firstname;
        user.lastname = addUserArgs.lastname;
        user.localization = addUserArgs.localization;
        user.followers = 0;
        user.following = 0;
        user.spotsVisited = 0;
        await this.usersRepo.save(user)

        return "User has been added";
    }

    async updateUser(updateUserArgs: UpdateUserArgs): Promise<string>{
        let user: UserEntity = await this.usersRepo.findOne({where : {
            id: updateUserArgs.id
            }})
        user.firstname = updateUserArgs.firstname;
        user.lastname = updateUserArgs.lastname;
        user.localization = updateUserArgs.localization;
        await this.usersRepo.save(user)

        return "User has been updated";
    }
}