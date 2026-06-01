import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Thread } from 'src/threads/thread.entity';
import { User } from 'src/users/user.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column({ type: 'varchar' })
  threadId: string | undefined;

  @Column({ type: 'text' })
  body: string | undefined;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date | undefined;

  @ManyToOne(() => Thread, (thread) => thread.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'threadId' })
  thread: Thread | undefined;

  @Column({ type: 'varchar' })
  authorId: string | undefined;

  @ManyToOne(() => User, (user) => user.threads, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authorId' })
  author: User | undefined;
}
