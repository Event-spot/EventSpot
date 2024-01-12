import {forwardRef, Inject, Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserEntity} from "./entities/user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserResolver} from "./user.resolver";
import {EventModule} from "../event/event.module";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [UserService, UserResolver],
    exports: [UserService]
})
export class UserModule {
}
