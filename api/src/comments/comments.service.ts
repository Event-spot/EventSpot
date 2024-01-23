import {Injectable, OnModuleInit} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import Comments from "./entities/comments.entity";
import {Repository} from "typeorm";
import {AddCommentInput} from "./dto/add-comment-input";
import {ModuleRef} from "@nestjs/core";
import {UsersService} from "../users/users.service";
import {EventsService} from "../events/events.service";
import {Users} from "../users/entities/users.entity";
import {Events} from "../events/entities/events.entity";
import {UpdateCommentInput} from "./dto/update-comment-input";

@Injectable()
export default class CommentsService implements OnModuleInit{
    private usersService: UsersService;
    private eventsService: EventsService;
    constructor(@InjectRepository(Comments) private readonly commentsRepo: Repository<Comments>,
                private moduleRef: ModuleRef) {}

    onModuleInit(): any {
        this.usersService = this.moduleRef.get(UsersService, {strict: false});
        this.eventsService = this.moduleRef.get(EventsService, {strict: false});
    }

    async findAllComments(): Promise<Comments[]> {
        return await this.commentsRepo.find({relations: {user: true, event: true}});
    }

    async findCommentById(id: number): Promise<Comments> {
        return await this.commentsRepo.findOne({where: {id: id}, relations: {user: true, event: true}});
    }

    async deleteComment(id: number): Promise<string> {
        await this.commentsRepo.delete(id);
        return 'Comment has been deleted';
    }

    async addComment(addCommentInput: AddCommentInput): Promise<string> {

        let comment: Comments = new Comments();
        let user: Users = await this.usersService.findUserById(addCommentInput.user);
        let event: Events = await this.eventsService.findEventById(addCommentInput.event);
        comment.content = addCommentInput.content;
        comment.user = user;
        comment.event = event;

        await this.commentsRepo.save(comment);

        return 'Comment has been added';
    }

    async updateComment(updateCommentInput: UpdateCommentInput): Promise<string> {

        let comment = await this.commentsRepo.findOne({where: {id: updateCommentInput.id}});
        comment.content = updateCommentInput.content;

        await this.commentsRepo.save(comment);

        return 'Comment has been updated'
    }
}