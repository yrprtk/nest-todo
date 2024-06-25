import { ToDoStatuses } from '../enums/to-do-statuses.enum';

export interface IToDoEntity {
  readonly id: string;

  readonly name: string;

  readonly description: string;

  readonly status: ToDoStatuses;

  readonly createdAt: Date;

  readonly updatedAt: Date;
}
