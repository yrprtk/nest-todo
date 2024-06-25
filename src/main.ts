import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { AppModule } from './app.module';
import { LOGGER_CONSTANTS } from './logger/logger.constants';
import { ILoggerService } from './logger/interfaces/logger-service.interface';
import { ErrorToHttpExceptionFilter } from './common/exception-filters/error-to-http.exception-filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get<Reflector>(Reflector)),
  );

  const logger = app.get<ILoggerService>(
    LOGGER_CONSTANTS.APPLICATION.SERVICE_TOKEN,
  );

  app.useGlobalFilters(new ErrorToHttpExceptionFilter(logger));

  Sentry.init({
    dsn: config.getOrThrow<string>('SENTRY_DSN'),
    tracesSampleRate: Number(
      config.getOrThrow<string>('SENTRY_TRACES_SAMPLE_RATE'),
    ),
  });

  await app.listen(config.getOrThrow<string>('PORT'));
}
bootstrap();
