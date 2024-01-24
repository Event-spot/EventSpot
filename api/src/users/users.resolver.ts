import {Args, Int, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {UsersService} from "./users.service";
import {Users} from "./entities/users.entity";
import {AddUserArgs} from "./dto/addUser.args";
import {UpdateUserArgs} from "./dto/updateUser.args";
import {UpdateDescriptionInput} from "./dto/update-description-input";
import {JoinEventInput} from "./dto/join-event-input";

@Resolver(of => Users)
export class UsersResolver {
    constructor(private readonly userService: UsersService) {}

    @Query(returns => [Users], {name: 'users'})
    getAllUsers() {
        return this.userService.findAllUsers();
    }

    @Query(returns => Users, {name: 'userById'})
    getUserById(@Args({name: "userId", type: () => Int}) id: number) {
        return this.userService.findUserById(id)
    }

    @Mutation(returns => String, {name: "deleteUser"})
    deleteUserById(@Args({name: 'userId', type: () => Int}) id: number){
        return this.userService.deleteUser(id)
    }

    @Mutation(returns => String, {name: "addUser"})
    addUser(@Args("addUserArgs") addUserArgs: AddUserArgs){
        return this.userService.addUser(addUserArgs)
    }

    @Mutation(returns => String, {name: "updateUser"})
    updateUser(@Args("updateUserArgs") updateUserArgs: UpdateUserArgs){
        return this.userService.updateUser(updateUserArgs)
    }

    @Mutation(returns => String, {name: 'changeDescription'})
    changeDescription(@Args('updateDescriptionInput') updateDescriptionInput: UpdateDescriptionInput) {
        return this.userService.updateDescription(updateDescriptionInput);
    }

    @Mutation(returns => String, {name: 'deleteDescription'})
    deleteDescription(@Args('userId') id: number) {
        return this.userService.deleteDescription(id);
    }

    @Mutation(returns => String, {name: 'joinEvent'})
    joinEvent(@Args('joinEventInput') joinEventInput: JoinEventInput) {
        return this.userService.joinEvent(joinEventInput);
    }

    @Mutation(returns => String, {name: 'leaveEvent'})
    leaveEvent(@Args('joinEventInput') joinEventInput: JoinEventInput) {
        return this.userService.leaveEvent(joinEventInput);
    }

    @ResolveField(returns => [Users], {name: 'followers'})
    followers(@Parent() user: Users) {
        return this.userService.findFollowers(user)
    }

    @ResolveField(returns => Number, {name: 'followingsCount'})
    followingsCount(@Parent() user: Users) {
        return this.userService.countFollowings(user.id);
    }

    @ResolveField(returns => Number, {name: 'followersCount'})
    followersCount(@Parent() user: Users) {
        return this.userService.countFollowers(user);
    }

    @ResolveField(returns => Number, {name: 'eventsCount'})
    eventsCount(@Parent() user: Users) {
        return this.userService.countEvents(user.id);
    }
}