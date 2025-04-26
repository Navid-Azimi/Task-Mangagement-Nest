// tasks.repository.ts
import { Repository } from 'typeorm';
import { TaskEntity } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { filterTaskDto } from './dto/filter-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectRepository(TaskEntity) readonly repo: Repository<TaskEntity>,
  ) {}

  async getTasks(filter: filterTaskDto): Promise<TaskEntity[]> {
    const query = this.repo.createQueryBuilder('tasks');
    const { search, status } = filter;

    if (search) {
      query.andWhere(
        'tasks.title LIKE :search OR tasks.description LIKE :search',
        { search: `%${search}%` },
      );
    }
    if (status) {
      query.andWhere('tasks.status = :status', { status });
    }
    return query.getMany();
  }

  async taskById(id: string): Promise<TaskEntity | null> {
    return this.repo.findOne({ where: { id } });
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const { title, description } = createTaskDto;
    let task = this.repo.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.repo.save(task);
    return task;
  }
}
