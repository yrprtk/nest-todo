import {
  Get,
  Put,
  Post,
  Body,
  Param,
  Delete,
  Controller,
} from '@nestjs/common';
import { ToDoService } from './services/to-do.service';
import { CreateToDoSchema } from './schemas/create-to-do.schema';
import { UpdateToDoSchema } from './schemas/update-to-do.schema';
import { IToDoEntity } from './interfaces/to-do-entity.interface';
import { IOperationResult } from './interfaces/operation-result.interface';

@Controller('todo')
export class ToDoController {
  constructor(private readonly toDoService: ToDoService) {}

  @Get()
  public async findAll(): Promise<IToDoEntity[]> {
    return this.toDoService.findAll();
  }

  @Post()
  public async create(@Body() schema: CreateToDoSchema): Promise<IToDoEntity> {
    return this.toDoService.create(schema);
  }

  @Put(':id')
  public async updateById(
    @Param('id') id: string,
    @Body() schema: UpdateToDoSchema,
  ): Promise<IOperationResult> {
    const updated = await this.toDoService.updateById(id, schema);

    return {
      success: updated,
    };
  }

  @Delete(':id')
  public async deleteById(@Param('id') id: string): Promise<IOperationResult> {
    const deleted = await this.toDoService.deleteById(id);

    return {
      success: deleted,
    };
  }
}
