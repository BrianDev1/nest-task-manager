import { User } from '../auth/user.entity';
import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './tasks.schema';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  status: TaskStatus;

  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
