import {Args, Query, Resolver, Int, Mutation} from "@nestjs/graphql";
import Comments from "./entities/comments.entity";
import CommentsService from "./comments.service";
import {AddCommentInput} from "./dto/add-comment-input";
import {UpdateCommentInput} from "./dto/update-comment-input";

@Resolver(of => Comments)
export default class CommentsResolver {

    constructor(private readonly commentsService: CommentsService) {
    }

    @Query(returns => [Comments], {name: 'comments'})
    getAllComments() {
        return this.commentsService.findAllComments();
    }

    @Query(returns => Comments, {name: 'commentById'})
    getCommentById(@Args({name: 'commentId', type: () => Int}) id: number) {
        return this.commentsService.findCommentById(id);
    }

    @Mutation(returns => String, {name: 'deleteComment'})
    deleteComment(@Args('commentId') commentId: number) {
        return this.commentsService.deleteComment(commentId);
    }

    @Mutation(returns => String, {name: 'addComment'})
    addComment(@Args('addCommentInput') addCommentInput: AddCommentInput) {
        return this.commentsService.addComment(addCommentInput);
    }

    @Mutation(returns => String, {name: 'updateComment'})
    updateComment(@Args('updateCommentInput') updateCommentInput: UpdateCommentInput) {
        return this.commentsService.updateComment(updateCommentInput);
    }
}