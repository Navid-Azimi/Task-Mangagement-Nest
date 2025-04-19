import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';
import { TaskEntity } from './tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
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
  // createTask(createtaskDto: CreateTaskDto): Task {
  //   const { title, description } = createtaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.DONE,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }

  async getTaskById(id: string): Promise<TaskEntity> {
    const find = await this.tasksRepository.findOne({ where: { id: id } });
    if (!find) {
      throw new NotFoundException('Task not found');
    }
    return find;
  }

  //
  // deleteTask(taskId: string) {
  //   for (let i = 0; i < this.tasks.length; i++) {
  //     if (this.tasks[i].id === taskId) {
  //       this.tasks.splice(i, 1);
  //     }
  //   }
  // }
  //
  // updateStatusTask(taskId: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(taskId);
  //   task.status = status;
  //   return task;
  // }
}
