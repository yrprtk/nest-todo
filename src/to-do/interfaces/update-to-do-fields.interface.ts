import { ToDoStatuses } from '../enums/to-do-statuses.enum';

export interface IUpdateToDoFields {
  readonly name?: string;

  readonly description?: string;

  readonly status?: ToDoStatuses;
}
