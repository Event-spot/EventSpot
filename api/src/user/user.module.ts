import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import {UserEntity} from "./entities/user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserResolver} from "./user.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserResolver],
})
export class UserModule {}
