import {Field, InputType, Int} from '@nestjs/graphql';

@InputType()
export class UpdateDescriptionInput {

    @Field(type => Int)
    id: number;

    @Field()
    description: string;
}