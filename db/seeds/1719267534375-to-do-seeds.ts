import { MigrationInterface, QueryRunner } from 'typeorm';
import { ToDoStatuses } from '../../src/to-do/enums/to-do-statuses.enum';
import { ICreateToDo } from 'src/to-do/interfaces/create-to-do.interface';
import { TypeormToDoEntity } from '../../src/to-do/entities/typeorm-to-do.entity';

export class ToDoSeeds1719267534375 implements MigrationInterface {
  private toDoEntities: ICreateToDo[] = [
    {
      name: 'name1',
      status: ToDoStatuses.ToDo,
      description: 'description1',
    },
    {
      name: 'name2',
      description: 'description2',
      status: ToDoStatuses.InProgress,
    },
    {
      name: 'name3',
      status: ToDoStatuses.Done,
      description: 'description3',
    },
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    const repository = queryRunner.connection.getRepository(TypeormToDoEntity);

    await repository.insert(this.toDoEntities);
  }

  public async down(): Promise<void> {
    return;
  }
}
