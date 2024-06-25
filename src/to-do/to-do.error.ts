import { DomainError } from 'src/common/errors/domain.error';

export class ToDoError extends DomainError {
  constructor(name: string, message: string) {
    super(name, message);
  }

  public static NotFound(): ToDoError {
    return new ToDoError('TODO_NOT_FOUND', 'ToDo not found');
  }
}
