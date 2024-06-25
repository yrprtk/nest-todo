import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ToDoStatuses } from '../enums/to-do-statuses.enum';
import { IToDoEntity } from '../interfaces/to-do-entity.interface';

@Entity('ToDo')
export class TypeormToDoEntity implements IToDoEntity {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Column({ type: 'varchar' })
  public name: string;

  @Column({ type: 'varchar' })
  public description: string;

  @Column({ type: 'varchar' })
  public status: ToDoStatuses;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  public readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public readonly updatedAt: Date;
}
