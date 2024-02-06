import {Args, Int, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {Events} from "./entities/events.entity";
import {EventsService} from "./events.service";
import AddEventArgs from "./dto/addEvent.args";
import UpdateEventArgs from "./dto/updateEvent.args";
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

    @Query(returns => [Events], { name: 'futureEvents' })
    getFutureEventsForUser(@Args({ name: 'userId', type: () => Int }) userId: number) {
        return this.eventService.findFutureEventsForUser(userId);
    }

    @Query(returns => [Events], { name: 'pastEvents' })
    getPastEventsForUser(@Args({ name: 'userId', type: () => Int }) userId: number) {
        return this.eventService.findPastEventsForUser(userId);
    }

    @ResolveField(returns => Number, {name: 'attendeesCount'})
    eventsCount(@Parent() event: Events) {
        return this.eventService.countAttendees(event.id);
    }

    @Mutation(returns => String, { name: 'joinEvent' })
    joinEvent(
        @Args('eventId', { type: () => Int }) eventId: number,
        @Args('userId', { type: () => Int }) userId: number,
    ): Promise<string> {
        return this.eventService.joinEvent(userId, eventId);
    }

    @Mutation(returns => String, { name: 'leaveEvent' })
    leaveEvent(
        @Args('eventId', { type: () => Int }) eventId: number,
        @Args('userId', { type: () => Int }) userId: number,
    ): Promise<string> {
        return this.eventService.leaveEvent(userId, eventId);
    }
}
