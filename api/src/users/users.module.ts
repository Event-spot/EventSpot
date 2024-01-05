import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {UserEntity} from "./entities/users.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersResolver} from "./users.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
