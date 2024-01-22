import {Args, Int, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {Event} from "./schema/events.schema";
import {EventsService} from "./events.service";
import AddEventArgs from "./dto/addEvent.args";
import UpdateEventArgs from "./dto/updateEvent.args";
import {User} from "../users/schema/users.schema";
import AddAttendeeInput from "./dto/add-attendee-input";

@Resolver(of => Event)
export class EventsResolver {
    constructor(private readonly eventService: EventsService) {
    }

    @Query(returns => [Event], {name: 'events'})
    getAllEvents() {
        return this.eventService.findAllEvents();
    }

    @Query(returns => Event, {name: 'eventById'})
    getEventById(@Args({name: 'eventId', type: () => Int}) id: number) {
        return this.eventService.findEventById(id);
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
