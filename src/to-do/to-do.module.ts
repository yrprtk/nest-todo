import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoController } from './to-do.controller';
import { ToDoService } from './services/to-do.service';
import { LoggerModule } from 'src/logger/logger.module';
import { TypeormToDoEntity } from './entities/typeorm-to-do.entity';
import { ToDoRepositoryProvider } from './providers/to-do-repository.provider';

@Module({
  controllers: [ToDoController],
  providers: [ToDoService, ToDoRepositoryProvider],
  imports: [
    TypeOrmModule.forFeature([TypeormToDoEntity]),
    LoggerModule,
    ConfigModule,
  ],
})
export class ToDoModule {}
