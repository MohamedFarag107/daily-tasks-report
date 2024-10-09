import { AppDataSource } from "~/config/data-source";
import { Task } from "~/entities/task";

export const TaskRepository = AppDataSource.getRepository(Task);