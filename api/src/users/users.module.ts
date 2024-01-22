import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {Users} from "./entities/users.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersResolver} from "./users.resolver";

@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    providers: [UsersService, UsersResolver],
    exports: [UsersService]
})
export class UsersModule {
}
