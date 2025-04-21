import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TaskEntity } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksRepository } from './tasks.repository';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TasksRepository')
    private readonly tasksRepository: TasksRepository,
  ) {}

  // getALlTasks(): Task[] {
  //   return this.tasks;
  // }
  //
  // getFilteredTasks(filter: filterTaskDto): Task[] | null {
  //   const { status, search } = filter;
  //   let tasks = this.getALlTasks();
  //   if (status) {
  //     tasks = this.tasks.filter((task) => task.status === status);
  //   }
  //
  //   if (search) {
  //     tasks = this.tasks.filter((task) => {
  //       if (
  //         task.title.toLowerCase().includes(search.toLowerCase()) ||
  //         task.description.toLowerCase().includes(search.toLowerCase())
  //       ) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   return tasks;
  // }
  //
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
    const result = await this.tasksRepository.delete(id);
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
    return this.tasksRepository.save(task);
  }
}
