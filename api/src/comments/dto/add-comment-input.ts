import {InputType, Field, Int} from "@nestjs/graphql";

@InputType()
export class AddCommentInput {

    @Field(type => String)
    content: string;

    @Field(type => Int)
    user: number;

    @Field(type => Int)
    event: number;
}