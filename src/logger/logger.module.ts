import { Module } from '@nestjs/common';
import { LoggerServiceProvider } from './providers/logger-service.provider';

@Module({
  exports: [LoggerServiceProvider],
  providers: [LoggerServiceProvider],
})
export class LoggerModule {}
