import { FindOptionsOrderValue } from 'typeorm';
import { Employee } from '~/entities/employee';

export type CreateEmployeeDto = {
  name: Employee['name'];
};

export type UpdateEmployeeDto = {
  name: Employee['name'];
};

export type FindAllEmployeesDto = {
  name?: Employee['name'];
  page?: string;
  limit?: string;
  order?: Record<keyof Employee, FindOptionsOrderValue>;
};
