import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export default class UpdateEventArgs {

    @Field(type => Int)
    id: number;

    @Field()
    name: string;

    @Field()
    localization: string;

    @Field()
    date: Date;

    @Field()
    description: string;
}