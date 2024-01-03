import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateUserArgs {

    @Field(type => Int)
    id: number;

    @Field()
    firstname: string;

    @Field()
    lastname: string;

    @Field({nullable: true})
    localization: string;

    @Field((type) => Int)
    spotsVisited: number;

    @Field(type => Int)
    following: number;

    @Field(type => Int)
    followers: number;

}