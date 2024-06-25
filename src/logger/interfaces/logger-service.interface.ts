export interface ILoggerService {
  log(message: string, data?: object): void;

  capture(error: Error): void;
}
