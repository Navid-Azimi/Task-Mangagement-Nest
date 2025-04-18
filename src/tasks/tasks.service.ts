import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { filterTaskDto } from './dto/filter-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getALlTasks(): Task[] {
    return this.tasks;
  }

  getFilteredTasks(filter: filterTaskDto): Task[] | null {
    const { status, search } = filter;
    let tasks = this.getALlTasks();
    if (status) {
      tasks = this.tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = this.tasks.filter((task) => {
        if (
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase())
        ) {
          return true;
        }
        return false;
      });
    }
    return tasks;
  }

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

  getTaskById(taskId: string): Task {
    const task = this.tasks.find((task) => task.id === taskId);
    if (!task) {
      throw new NotFoundException(`Task with id ${taskId} not found`);
    }
    return task;
  }

  deleteTask(taskId: string) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id === taskId) {
        this.tasks.splice(i, 1);
      }
    }
  }

  updateStatusTask(taskId: string, status: TaskStatus): Task {
    const task = this.getTaskById(taskId);
    task.status = status;
    return task;
  }
}
