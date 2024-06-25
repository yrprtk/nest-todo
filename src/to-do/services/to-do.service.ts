import { Inject, Injectable } from '@nestjs/common';
import { ToDoError } from '../to-do.error';
import { TODO_CONSTANTS } from '../to-do.constants';
import { IToDoEntity } from '../interfaces/to-do-entity.interface';
import { ICreateToDo } from '../interfaces/create-to-do.interface';
import { IToDoRepository } from '../interfaces/to-do-repository.interface';
import { IUpdateToDoFields } from '../interfaces/update-to-do-fields.interface';
import { IFindOneToDoConditions } from '../interfaces/find-one-to-do-conditions.interface';

@Injectable()
export class ToDoService {
  constructor(
    @Inject(TODO_CONSTANTS.APPLICATION.REPOSITORY_TOKEN)
    private readonly toDoRepository: IToDoRepository,
  ) {}

  public async findOne(
    conditions: IFindOneToDoConditions,
  ): Promise<IToDoEntity> {
    const toDo = await this.toDoRepository.findOne(conditions);

    if (!toDo) {
      throw ToDoError.NotFound();
    }

    return toDo;
  }

  public async findAll(): Promise<IToDoEntity[]> {
    return this.toDoRepository.findMany();
  }

  public async create(payload: ICreateToDo): Promise<IToDoEntity> {
    return this.toDoRepository.create(payload);
  }

  public async updateById(
    id: string,
    fields: IUpdateToDoFields,
  ): Promise<boolean> {
    await this.findOne({ id });

    return this.toDoRepository.updateById(id, fields);
  }

  public async deleteById(id: string): Promise<boolean> {
    await this.findOne({ id });

    return this.toDoRepository.deleteById(id);
  }
}
