import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export default class AddAttendeeInput {

    @Field(type => Int)
    id: number;

    @Field(type => Int)
    userId: number;
}