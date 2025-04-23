import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TaskEntity } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksRepository } from './tasks.repository';
import { TaskStatus } from './task-status.enum';
import { filterTaskDto } from './dto/filter-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @Inject()
    private readonly tasksRepository: TasksRepository,
  ) {}

  async getTasks(filter: filterTaskDto): Promise<TaskEntity[]> {
    return await this.tasksRepository.getTasks(filter);
  }

  async createTask(createtaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.tasksRepository.createTask(createtaskDto);
  }

  async getTaskById(id: string): Promise<TaskEntity> {
    const find = await this.tasksRepository.taskById(id);
    if (!find) {
      throw new NotFoundException('Task not found');
    }
    return find;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Task not found');
    }
  }

  async updateStatusTask(
    taskId: string,
    status: TaskStatus,
  ): Promise<TaskEntity> {
    let task = await this.getTaskById(taskId);
    task.status = status;
    return this.tasksRepository.repo.save(task);
  }
}
