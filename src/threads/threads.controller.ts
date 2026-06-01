import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ThreadsService } from './threads.service';

@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @Post()
  create(@Body() body: { title: string; author: string; body: string }) {
    return this.threadsService.createThread(body.title, body.author, body.body);
  }

  @Get()
  findAll() {
    return this.threadsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.threadsService.findOne(id);
  }

  @Post(':id/comments')
  addComment(
    @Param('id') id: string,
    @Body() body: { author: string; body: string },
  ) {
    return this.threadsService.addComment(id, body.author, body.body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.threadsService.removeThread(id);
  }
}
