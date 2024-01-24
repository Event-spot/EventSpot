import {forwardRef, Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {Users} from "./entities/users.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {AddUserArgs} from "./dto/addUser.args";
import {UpdateUserArgs} from "./dto/updateUser.args";
import {EventsService} from "../events/events.service";
import {ModuleRef} from "@nestjs/core";
import {Events} from "../events/entities/events.entity";

@Injectable()
export class UsersService implements OnModuleInit {
    private eventService: EventsService
    constructor(@InjectRepository(Users)public readonly usersRepo: Repository<Users>,
                private moduleRef: ModuleRef) {}

    onModuleInit() {
        this.eventService = this.moduleRef.get(EventsService, {strict: false});
    }

    async findAllUsers(): Promise<Users[]>{
        let users = await this.usersRepo.find({relations: {events: true, following: true}});
        return users;
    }

    async findUserById(id: number): Promise<Users> {
        let user = await this.usersRepo.findOne({where: {id: id}});
        return user;
    }

    async getEvents(eventId: number): Promise<Events> {
        return this.eventService.findEventById(eventId);
    }

    async deleteUser(id: number): Promise<string> {
        await this.usersRepo.delete(id)
        return "User has been deleted"
    }

    async addUser(addUserArgs: AddUserArgs): Promise<string>{
        let user: Users = new Users();
        user.email = addUserArgs.email;
        user.password = addUserArgs.password;
        user.firstname = addUserArgs.firstname;
        user.lastname = addUserArgs.lastname;
        user.localization = addUserArgs.localization;
        user.spotsVisited = 0;
        await this.usersRepo.save(user)

        return "User has been added";
    }

    async updateUser(updateUserArgs: UpdateUserArgs): Promise<string>{
        let user: Users = await this.usersRepo.findOne({where : {
            id: updateUserArgs.id
            }})
        user.firstname = updateUserArgs.firstname;
        user.lastname = updateUserArgs.lastname;
        user.localization = updateUserArgs.localization;
        await this.usersRepo.save(user)

        return "User has been updated";
    }
}
