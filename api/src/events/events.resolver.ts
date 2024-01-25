import {Args, Int, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {Events} from "./entities/events.entity";
import {EventsService} from "./events.service";
import AddEventArgs from "./dto/addEvent.args";
import UpdateEventArgs from "./dto/updateEvent.args";
import {Users} from "../users/entities/users.entity";
import AddAttendeeInput from "./dto/add-attendee-input";

@Resolver(of => Events)
export class EventsResolver {
    constructor(private readonly eventService: EventsService) {
    }

    @Query(returns => [Events], {name: 'events'})
    getAllEvents() {
        return this.eventService.findAllEvents();
    }

    @Query(returns => Events, {name: 'eventById'})
    getEventById(@Args({name: 'eventId', type: () => Int}) id: number) {
        return this.eventService.findEventById(id);
    }

    @Query(returns => [Events], {name: 'events'})
    getAllSortedEvents(
        @Args('sortOption', { type: () => String, nullable: true }) sortOption?: string,
    @Args('startIndex', { type: () => Int, nullable: true }) startIndex?: number,
    @Args('itemsPerPage', { type: () => Int, nullable: true }) itemsPerPage?: number
    ) {
          return this.eventService.findAllEventsWithSortingAndPagination(sortOption, startIndex, itemsPerPage);
    }

    @Mutation(returns => String, {name: 'addAttendee'})
    addAttendee(@Args('addAttendeeInput') addAttendeeInput: AddAttendeeInput) {
        return this.eventService.addAttendee(addAttendeeInput);
    }

    @Mutation(returns => String, {name: 'addEvent'})
    addEvent(@Args('addEventArgs') addEventArgs: AddEventArgs) {
        return this.eventService.addEvent(addEventArgs);
    }

    @Mutation(returns => String, {name: 'deleteEvent'})
    deleteEvent(@Args('eventId') eventId: number) {
        return this.eventService.deleteEvent(eventId);
    }

    @Mutation(returns => String, {name: 'updateEvent'})
    updateEvent(@Args('updateEventArgs') updateEventArgs: UpdateEventArgs) {
        return this.eventService.updateEvent(updateEventArgs);
    }

}
