import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Thread } from './thread.entity';

@Injectable()
export class ThreadsRepository extends Repository<Thread> {
  constructor(private dataSource: DataSource) {
    super(Thread, dataSource.createEntityManager());
  }
}
