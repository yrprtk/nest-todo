import { IToDoEntity } from './to-do-entity.interface';
import { ICreateToDo } from './create-to-do.interface';
import { IUpdateToDoFields } from './update-to-do-fields.interface';
import { IFindOneToDoConditions } from './find-one-to-do-conditions.interface';

export interface IToDoRepository {
  findOne(data: IFindOneToDoConditions): Promise<IToDoEntity>;

  findMany(): Promise<IToDoEntity[]>;

  create(data: ICreateToDo): Promise<IToDoEntity>;

  updateById(id: string, fields: IUpdateToDoFields): Promise<boolean>;

  deleteById(id: string): Promise<boolean>;
}
