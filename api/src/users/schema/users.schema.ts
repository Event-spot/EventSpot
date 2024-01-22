import {ObjectType, Field, Int} from '@nestjs/graphql';
import {Event} from "../../events/schema/events.schema";

@ObjectType()
export class User {

    @Field(type => Int)
    id: number;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    firstname: string;

    @Field()
    lastname: string;

    @Field({nullable: true})
    localization: string;

    @Field(type => Int)
    spotsVisited: number;

    @Field(type => Int)
    followers: number;

    @Field(type => Int)
    following: number;

    @Field(type => [Event], {nullable: true})
    events?: Event[]
}