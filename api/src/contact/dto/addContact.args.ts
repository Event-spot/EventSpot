import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export default class AddContactArgs {

    @Field()
    title: string;

    @Field()
    email: string;

    @Field(()=> Int)
    number: number;

    @Field()
    message: string;

    
}