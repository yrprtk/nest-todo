import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ToDoStatuses } from '../enums/to-do-statuses.enum';

export class UpdateToDoSchema {
  @IsString()
  @IsOptional()
  public readonly name?: string;

  @IsString()
  @IsOptional()
  public readonly description?: string;

  @IsEnum(ToDoStatuses)
  @IsOptional()
  public readonly status?: ToDoStatuses;
}
