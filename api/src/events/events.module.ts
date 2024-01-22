import {forwardRef, Module} from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsResolver } from './events.resolver';
import {TypeOrmModule} from "@nestjs/typeorm";
import EventsEntity from "./entities/events.entity";
import {UsersModule} from "../users/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([EventsEntity])],
  providers: [EventsService, EventsResolver],
  exports: [EventsService]
})
export class EventsModule {}
