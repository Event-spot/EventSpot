import {forwardRef, Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {Users} from "./entities/users.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {AddUserArgs} from "./dto/addUser.args";
import {UpdateUserArgs} from "./dto/updateUser.args";
import {EventsService} from "../events/events.service";
import {ModuleRef} from "@nestjs/core";
import {Events} from "../events/entities/events.entity";
import {UpdateDescriptionInput} from "./dto/update-description-input";
import {JoinEventInput} from "./dto/join-event-input";

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

    async findFollowers(user: Users): Promise<Users[]> {
        return this.usersRepo.createQueryBuilder('user')
            .innerJoin('user.following', 'follower')
            .where('follower.id = :userId', { userId: user.id })
            .getMany();
    }

    async countFollowings(id: number): Promise<number> {
        const user = await this.usersRepo.findOne({where: {id}, relations: {following: true}});
        const followings = user.following;
        return followings.length;
    }

    async countFollowers(user: Users): Promise<number> {
        const followers = await this.findFollowers(user);
        return followers.length;

    }

    async updateDescription(updateDescriptionInput: UpdateDescriptionInput): Promise<string> {
        const user: Users = await this.usersRepo.findOne({where: {id: updateDescriptionInput.id}});

        user.description = updateDescriptionInput.description;

        await this.usersRepo.save(user);

        return 'Description has been changed';
    }

    async deleteDescription(id: number): Promise<string> {
        const user: Users = await this.usersRepo.findOne({where: {id}});

        user.description = null;

        await this.usersRepo.save(user);

        return 'Description has been deleted';
    }

    async joinEvent(joinEventInput: JoinEventInput): Promise<string> {
        const user: Users = await this.usersRepo.findOne({where: {id: joinEventInput.userId}, relations: {events: true}});
        const event: Events = await this.eventService.findEventById(joinEventInput.eventId);

        user.events = [...user.events, event];

        await this.usersRepo.save(user);

        return 'User has been joined to event'
    }

    async leaveEvent(joinEventInput: JoinEventInput): Promise<string> {
        const user: Users = await this.usersRepo.findOne({where: {id: joinEventInput.userId}, relations: {events: true}})
        const eventToLeave: Events = await this.eventService.findEventById(joinEventInput.eventId);

        user.events = user.events.filter(event => event.id != eventToLeave.id);


        await this.usersRepo.save(user);

        return 'User has been left event'
    }

    async countEvents(id: number): Promise<number> {
        const user: Users = await this.usersRepo.findOne({where: {id}, relations: {events: true}});

        return user.events.length;
    }
}
