import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Thread } from './threads/thread.entity';
import { Comment } from './comments/comment.entity';
import { User } from './users/user.entity';
import path from 'path';

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: path.join(__dirname, '../data/cyberchat.sqlite'),
  entities: [Thread, Comment, User],
  migrations: ['src/migrations/*.ts', 'dist/migrations/*.js'],
  synchronize: false,
});
