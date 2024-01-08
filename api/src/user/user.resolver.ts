import {Args, Int, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {UserService} from "./user.service";
import {User} from "./schema/user.schema";
import {AddUserArgs} from "./dto/addUser.args";
import {UpdateUserArgs} from "./dto/updateUser.args";
import {Event} from "../event/schema/event.schema";

@Resolver(of => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(returns => [User], {name: 'users'})
    getAllUsers() {
        return this.userService.findAllUsers();
    }

    @Query(returns => User, {name: 'userById'})
    getUserById(@Args({name: "userId", type: () => Int}) id: number) {
        return this.userService.findUserById(id)
    }

    @ResolveField(returns => [Event], {name: 'events'})
    getEvents(@Parent() user: User) {
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
}