import {ObjectType, Field, Int, GraphQLISODateTime} from '@nestjs/graphql';
import {User} from "../../user/schema/user.schema";

@ObjectType()
export class Event{

    @Field(type => Int)
    id: number;

    @Field()
    name: string;

    @Field(type => GraphQLISODateTime)
    date: Date;

    @Field(type => GraphQLISODateTime)
    createDate: Date;

    @Field()
    localization: string;

    @Field()
    description: string;

    @Field(type => [User], {nullable: true})
    attendees?: User[];
}
