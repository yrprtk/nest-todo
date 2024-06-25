import { Provider } from '@nestjs/common';
import { TODO_CONSTANTS } from '../to-do.constants';
import { TypeormToDoRepository } from '../repositories/typeorm-to-do.repository';

export const ToDoRepositoryProvider: Provider = {
  useClass: TypeormToDoRepository,
  provide: TODO_CONSTANTS.APPLICATION.REPOSITORY_TOKEN,
};
