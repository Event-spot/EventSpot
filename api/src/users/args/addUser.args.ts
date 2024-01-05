import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class AddUserArgs {

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

}