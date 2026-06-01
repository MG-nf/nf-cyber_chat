import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Comment } from '../comments/comment.entity';
import { User } from '../users/user.entity';

@Entity('threads')
export class Thread {
  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column({ type: 'varchar' })
  title: string | undefined;

  @Column({ type: 'text' })
  body: string | undefined;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date | undefined;

  @OneToMany(() => Comment, (comment) => comment.thread)
  comments: Comment[] | undefined;

  @Column({ type: 'varchar' })
  authorId: string | undefined;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authorId' })
  author: User | undefined;
}
