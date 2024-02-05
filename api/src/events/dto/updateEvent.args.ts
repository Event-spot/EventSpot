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

    @Field({nullable: true})
    general_information?: string;
    
    @Field({nullable: true})
    competitions?: string;

    @Field({nullable: true})
    localization_details?: string;

    @Field({nullable: true})
    bannerImage?: string;
}