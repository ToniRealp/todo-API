import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity, BeforeInsert, BeforeUpdate } from 'typeorm';
import { validateOrReject, IsEmail, Length, IsDefined, IsEmpty } from 'class-validator';
import Task from './task-model';


@Entity({ name: 'users' })
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsEmpty()
  id: string;

  @Column({ unique: true })
  @IsEmail()
  @IsDefined()
  email: string;

  @Column()
  @Length(6, 32)
  password: string;

  @OneToMany(() => Task, task => task.owner, { onDelete: 'CASCADE' })
  tasks: Task[];

  @Column({ type: 'time with time zone', default: '00:00:00 GMT+2' })
  resetTime: Date;

  @Column({ type: 'date', default: 'YESTERDAY' })
  plannedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}
