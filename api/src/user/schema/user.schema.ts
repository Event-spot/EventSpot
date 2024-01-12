import {ObjectType, Field, Int} from '@nestjs/graphql';

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
}