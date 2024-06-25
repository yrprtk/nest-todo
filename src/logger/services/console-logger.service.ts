import { ILoggerService } from '../interfaces/logger-service.interface';

export class ConsoleLoggerService implements ILoggerService {
  public log(message: string, data?: object): void {
    console.log(message, data);
  }

  public capture(error: Error): void {
    console.error(error);
  }
}
