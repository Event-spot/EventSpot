import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export default class AddEventArgs {

    @Field()
    name: string;

    @Field()
    localization: string;

    @Field()
    date: Date;

    @Field()
    description: string;

    @Field()
    general_information?: string;
    
    @Field()
    competitions?: string;

    @Field()
    localization_details?: string;
}