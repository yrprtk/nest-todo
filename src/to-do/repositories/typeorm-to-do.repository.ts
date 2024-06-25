import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IToDoEntity } from '../interfaces/to-do-entity.interface';
import { ICreateToDo } from '../interfaces/create-to-do.interface';
import { TypeormToDoEntity } from '../entities/typeorm-to-do.entity';
import { IToDoRepository } from '../interfaces/to-do-repository.interface';
import { IUpdateToDoFields } from '../interfaces/update-to-do-fields.interface';
import { IFindOneToDoConditions } from '../interfaces/find-one-to-do-conditions.interface';

@Injectable()
export class TypeormToDoRepository implements IToDoRepository {
  constructor(
    @InjectRepository(TypeormToDoEntity)
    private readonly toDoRepository: Repository<TypeormToDoEntity>,
  ) {}

  public async findOne(data: IFindOneToDoConditions): Promise<IToDoEntity> {
    return this.toDoRepository.findOne({
      where: data,
    });
  }

  public async findMany(): Promise<IToDoEntity[]> {
    return this.toDoRepository.find();
  }

  public async create(data: ICreateToDo): Promise<IToDoEntity> {
    const toDo = this.toDoRepository.create(data);

    return this.toDoRepository.save(toDo);
  }

  public async updateById(
    id: string,
    fields: IUpdateToDoFields,
  ): Promise<boolean> {
    const result = await this.toDoRepository.update(id, fields);

    const updated = result.affected > 0;

    return updated;
  }

  public async deleteById(id: string): Promise<boolean> {
    const result = await this.toDoRepository.delete(id);

    const deleted = result.affected > 0;

    return deleted;
  }
}
