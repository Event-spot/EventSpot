import {InputType, Field, Int} from "@nestjs/graphql";

@InputType()
export class UpdateCommentInput {

    @Field(type => Int)
    id: number;

    @Field(type => String)
    content: string;
}