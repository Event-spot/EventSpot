import {Args, Int, Mutation, Query, Resolver} from '@nestjs/graphql';
import {UsersService} from "./users.service";
import {User} from "./schema/user.schema";
import {AddUserArgs} from "./dto/addUser.args";
import {UpdateUserArgs} from "./dto/updateUser.args";

@Resolver(of => User)
export class UsersResolver {
    constructor(private readonly userService: UsersService) {}

    @Query(returns => [User], {name: 'users'})
    getAllUsers() {
        return this.userService.findAllUsers();
    }

    @Query(returns => User, {name: 'userById'})
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
}