import { Controller, Post, Body, Param } from '@nestjs/common';
import { CommentsService } from './comments.service.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { Comment } from './comment.entity.js';

@Controller('threads')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':id/comments')
  create(
    @Param('id') threadId: string,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    return this.commentsService.create(threadId, createCommentDto);
  }
}
