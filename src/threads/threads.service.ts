import { Injectable, NotFoundException } from '@nestjs/common';
import { ThreadsRepository } from './threads.repository';
import { CommentsService } from '../comments/comments.service';
import { Thread } from './thread.entity';

@Injectable()
export class ThreadsService {
  constructor(
    private readonly threadsRepository: ThreadsRepository,
    private readonly commentsService: CommentsService,
  ) {}

  async createThread(
    title: string,
    authorId: string,
    body: string,
  ): Promise<Thread> {
    const thread = this.threadsRepository.create({ title, authorId, body });
    return this.threadsRepository.save(thread);
  }

  async findAll(): Promise<Thread[]> {
    return this.threadsRepository.find();
  }

  async findOne(id: string): Promise<Thread> {
    const thread = await this.threadsRepository.findOne({
      where: { id },
      relations: {
        comments: true,
      },
    });
    if (!thread) {
      throw new NotFoundException(`Thread with ID ${id} not found`);
    }
    return thread;
  }

  async addComment(threadId: string, authorId: string, body: string) {
    await this.findOne(threadId);
    return this.commentsService.createComment(threadId, authorId, body);
  }

  async removeThread(id: string): Promise<void> {
    const thread = await this.findOne(id);
    await this.commentsService.deleteCommentsByThread(id);
    await this.threadsRepository.remove(thread);
  }
}
