import { IsEnum, IsString } from 'class-validator';
import { ToDoStatuses } from '../enums/to-do-statuses.enum';

export class CreateToDoSchema {
  @IsString()
  public readonly name: string;

  @IsString()
  public readonly description: string;

  @IsEnum(ToDoStatuses)
  public readonly status: ToDoStatuses;
}
