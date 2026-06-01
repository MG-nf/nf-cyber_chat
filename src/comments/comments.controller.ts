import { Controller, Get, Delete, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.commentsService.softDeleteComment(id);
  }
}
