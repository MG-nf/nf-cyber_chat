import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Thread } from '../threads/thread.entity';
import { Comment } from '../comments/comment.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column({ type: 'varchar' })
  name: string | undefined;

  @Column({ type: 'varchar', unique: true })
  email: string | undefined;

  @Column({ type: 'varchar' })
  password: string | undefined;

  @OneToMany(() => Thread, (thread) => thread.author)
  threads: Thread[] | undefined;

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[] | undefined;
}
