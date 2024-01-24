import {Args, Int, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {UsersService} from "./users.service";
import {Users} from "./entities/users.entity";
import {AddUserArgs} from "./dto/addUser.args";
import {UpdateUserArgs} from "./dto/updateUser.args";
import {Events} from "../events/entities/events.entity";

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

    @ResolveField(returns => [Events], {name: 'events'})
    getEvents(@Parent() user: Users) {
        return user.events || [];
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

    @ResolveField(() => [Users], {name: 'followers'})
    followers(@Parent() user: Users) {
        return this.userService.findFollowers(user);
    }
}