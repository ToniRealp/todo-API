import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, BeforeInsert, BeforeUpdate } from 'typeorm';
import { validateOrReject, IsEmpty, IsDefined, Length, MaxLength, IsOptional } from 'class-validator';
import User from './user-model';


@Entity({ name: 'tasks' })
export default class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsEmpty()
  id: string;

  @Column()
  @Length(1, 64)
  @IsDefined()
  title: string;

  @Column({ default: '' })
  @IsOptional()
  @MaxLength(64)
  description: string;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => User, user => user.tasks)
  owner: User | string;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }

  serialize() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      completed: this.completed,
    };
  }
}
