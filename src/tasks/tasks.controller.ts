import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskEntity } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  // @Get('/')
  // getTasks(@Query() filterTaskDto: filterTaskDto) {
  //   if (Object.keys(filterTaskDto).length > 0) {
  //     return this.taskService.getFilteredTasks(filterTaskDto);
  //   } else {
  //     return this.taskService.getALlTasks();
  //   }
  // }
  //
  @Post('/')
  addTasks(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.taskService.createTask(createTaskDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<TaskEntity> {
    return this.taskService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateStatusTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskEntity> {
    const { status } = updateTaskDto;
    return this.taskService.updateStatusTask(id, status);
  }
}
