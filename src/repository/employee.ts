import { AppDataSource } from "~/config/data-source";
import { Employee } from "~/entities/employee";

export const EmployeeRepository = AppDataSource.getRepository(Employee);