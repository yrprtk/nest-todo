import { Provider } from '@nestjs/common';
import { LOGGER_CONSTANTS } from '../logger.constants';
import { SentryLoggerService } from '../services/sentry-logger.service';

export const LoggerServiceProvider: Provider = {
  useClass: SentryLoggerService,
  provide: LOGGER_CONSTANTS.APPLICATION.SERVICE_TOKEN,
};
