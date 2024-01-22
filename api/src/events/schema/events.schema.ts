import {ObjectType, Field, Int, GraphQLISODateTime} from '@nestjs/graphql';
import {User} from "../../users/schema/users.schema";

@ObjectType()
export class Event{

    @Field(type => Int)
    id: number;

    @Field()
    name: string;

    @Field(type => String)
    date: Date;

    @Field(type => String)
    createDate: Date;

    @Field()
    localization: string;

    @Field()
    description: string;

    @Field(type => [User], {nullable: true})
    attendees?: User[];
}
