import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { Comment } from './comment.entity';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  async createComment(
    threadId: string,
    authorId: string,
    body: string,
  ): Promise<Comment> {
    const comment = this.commentsRepository.create({
      threadId,
      authorId,
      body,
    });
    return this.commentsRepository.save(comment);
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  async softDeleteComment(id: string): Promise<Comment> {
    const comment = await this.findOne(id);
    comment.body = 'deleted';
    return this.commentsRepository.save(comment);
  }

  async deleteCommentsByThread(threadId: string): Promise<void> {
    await this.commentsRepository.delete({ threadId });
  }
}
