import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class AddUserArgs {

    @Field()
    firstname: string;

    @Field()
    lastname: string;

    @Field({nullable: true})
    localization: string;

}