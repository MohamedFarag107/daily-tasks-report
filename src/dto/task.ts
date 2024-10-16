// CreateTaskDto, FindAllTasksDto, UpdateTaskDto

import { FindOptionsOrderValue } from 'typeorm';
import { Task } from '~/entities/task';

export type CreateTaskDto = {
  description: Task['description'];
  employeeId: number;
  from: Task['from'];
  to: Task['to'];
};

export type UpdateTaskDto = {
  description: Task['description'];
  employeeId: number;
  from: Task['from'];
  to: Task['to'];
};

export type FindAllTasksDto = {
  description?: Task['description'];
  page?: string;
  limit?: string;
  order?: Record<keyof Task, FindOptionsOrderValue>;
  filter?: {
    employeeId?: string;
    date?: string;
  };
};

export type DailyTaskSummaryDto = {
  date: string;
  employeeId: string;
};
