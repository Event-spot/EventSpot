import {forwardRef, Inject, Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {UsersEntity} from "./entities/users.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersResolver} from "./users.resolver";
import {EventsModule} from "../events/events.module";

@Module({
    imports: [TypeOrmModule.forFeature([UsersEntity])],
    providers: [UsersService, UsersResolver],
    exports: [UsersService]
})
export class UsersModule {
}
