import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
