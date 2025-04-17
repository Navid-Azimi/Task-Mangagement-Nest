import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks = [];

  getALlTasks() {
    return this.tasks;
  }
}
