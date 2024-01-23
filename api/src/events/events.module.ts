import {Module} from '@nestjs/common';
import {EventsService } from './events.service';
import {EventsResolver } from './events.resolver';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Events} from "./entities/events.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Events])],
  providers: [EventsService, EventsResolver],
  exports: [EventsService]
})
export class EventsModule {}
