import { TaskStatus } from '../task.model';

export class filterTaskDto {
  status?: TaskStatus;
  search?: string;
}
