import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoModule } from './to-do/to-do.module';
import { LoggerModule } from './logger/logger.module';
import { TypeormConfig } from './config/typeorm/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeormConfig,
    }),
    ToDoModule,
    LoggerModule,
  ],
})
export class AppModule {}
