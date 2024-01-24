import {Field, InputType, Int} from "@nestjs/graphql";

@InputType()
export class JoinEventInput {
    @Field(type => Int)
    userId: number;

    @Field(type => Int)
    eventId: number;
}