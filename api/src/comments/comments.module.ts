import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import Comments from "./entities/comments.entity";
import CommentsService from "./comments.service";
import CommentsResolver from "./comments.resolver";

@Module({
    imports: [TypeOrmModule.forFeature([Comments])],
    providers: [CommentsService, CommentsResolver],
    exports: [CommentsService]
})

export default class CommentsModule {}