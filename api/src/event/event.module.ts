import {forwardRef, Module} from '@nestjs/common';
import { EventService } from './event.service';
import { EventResolver } from './event.resolver';
import {TypeOrmModule} from "@nestjs/typeorm";
import EventEntity from "./entities/event.entity";
import {UserModule} from "../user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity])],
  providers: [EventService, EventResolver],
  exports: [EventService]
})
export class EventModule {}
