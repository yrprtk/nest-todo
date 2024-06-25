import * as Sentry from '@sentry/node';
import { ILoggerService } from '../interfaces/logger-service.interface';

export class SentryLoggerService implements ILoggerService {
  public log(message: string, data?: object): void {
    Sentry.captureMessage(message, data);
  }

  public capture(error: Error): void {
    Sentry.captureException(error);
  }
}
