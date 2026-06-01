import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { ThreadsService } from './threads.service.js';
import { CreateThreadDto } from './dto/create-thread.dto.js';
import { UpdateThreadDto } from './dto/update-thread.dto.js';
import { Thread } from './thread.entity.js';

@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @Post()
  create(@Body() createThreadDto: CreateThreadDto): Promise<Thread> {
    return this.threadsService.create(createThreadDto);
  }

  @Get()
  findAll(): Promise<Thread[]> {
    return this.threadsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Thread> {
    return this.threadsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateThreadDto: UpdateThreadDto,
  ): Promise<Thread> {
    return this.threadsService.update(id, updateThreadDto);
  }
}
