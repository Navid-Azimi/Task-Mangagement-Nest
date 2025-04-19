import { TaskEntity } from './tasks.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(TaskEntity)
export class TasksRepository extends Repository<TaskEntity> {}
