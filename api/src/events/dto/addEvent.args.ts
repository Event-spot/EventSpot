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

    @Field({nullable: true})
    general_information?: string;
    
    @Field({nullable: true})
    competitions?: string;

    @Field({nullable: true})
    localization_details?: string;
}