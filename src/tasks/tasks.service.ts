import { Injectable, Post } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getALlTasks(): Task[] {
    return this.tasks;
  }

  @Post()
  createTask(createtaskDto: CreateTaskDto): Task {
    const { title, description } = createtaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.DONE,
    };
    this.tasks.push(task);
    return task;
  }
}
