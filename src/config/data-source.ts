import { DataSource } from 'typeorm';

import { env } from '~/config/env';
import { Employee } from '~/entities/employee';
import { Task } from '~/entities/task';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER_NAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: env.isDevelopment,
  entities: [Employee, Task],
  subscribers: [],
  migrations: [],
});