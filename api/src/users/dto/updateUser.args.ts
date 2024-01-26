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

    @Field({nullable: true})
    description: string;

    @Field({nullable: true})
    facebook: string;

    @Field({nullable: true})
    instagram: string;

    @Field({nullable: true})
    tiktok: string;

    @Field({nullable: true})
    youtube: string;


}