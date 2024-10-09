import { FindManyOptions, ILike } from 'typeorm';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { asyncHandler } from '~/utils/async-handler';
import { CreateEmployeeDto, FindAllEmployeesDto, UpdateEmployeeDto } from '~/dto/employee';
import { EmployeeRepository } from '~/repository/employee';
import { NotfoundError } from '~/error/notfound-error';
import { Employee } from '~/entities/employee';
import { createPagination } from '~/utils/create-pagination';
import { TaskRepository } from '~/repository/task';

export const createEmployeeController = asyncHandler(async (req, res) => {
  const data = <CreateEmployeeDto>req.body;

  const employee = EmployeeRepository.create(data);

  await EmployeeRepository.save(employee);

  res.status(StatusCodes.CREATED).json({
    statusCode: StatusCodes.CREATED,
    name: ReasonPhrases.CREATED,
    message: 'Employee Created Successfully',
    data: employee,
  });
});

export const updateEmployeeController = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;
  const data = <UpdateEmployeeDto>req.body;

  const employee = await EmployeeRepository.findOneBy({
    id: Number(employeeId),
  });

  if (!employee) {
    throw new NotfoundError(`Employee With ID ${employeeId} Not Found`);
  }

  Object.assign(employee, data);

  await EmployeeRepository.save(employee);

  res.status(StatusCodes.OK).json({
    statusCode: StatusCodes.OK,
    name: ReasonPhrases.OK,
    message: 'Employee Updated Successfully',
    data: employee,
  });
});

export const deleteEmployeeController = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;

  const employee = await EmployeeRepository.findOneBy({
    id: Number(employeeId),
  });

  if (!employee) {
    throw new NotfoundError(`Employee With ID ${employeeId} Not Found`);
  }

  await TaskRepository.delete({ employeeId: { id: employee.id } });
  await EmployeeRepository.delete(employee.id);

  res.status(StatusCodes.NO_CONTENT).json({});
});

export const findOneEmployeeController = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;

  const employee = await EmployeeRepository.findOneBy({
    id: Number(employeeId),
  });

  if (!employee) {
    throw new NotfoundError(`Employee With ID ${employeeId} Not Found`);
  }

  res.status(StatusCodes.OK).json({
    statusCode: StatusCodes.OK,
    name: ReasonPhrases.OK,
    message: 'The employee was found successfully.',
    data: employee,
  });
});

export const findAllEmployeesController = asyncHandler(async (req, res) => {
  const { name, page = 1, limit = 10, order = { id: 'ASC' } } = <FindAllEmployeesDto>req.query;
  const take = Number(limit);
  const currentPage = Number(page);
  const skip = (currentPage - 1) * take;

  const query: FindManyOptions<Employee> = {
    take,
    skip,
    order,
  };

  if (name && name?.trim().length > 0) {
    query.where = {
      name: ILike(`%${name}%`),
    };
  }

  const data = await EmployeeRepository.findAndCount(query);

  const { docs, ...pagination } = createPagination(data, { limit: take, page: currentPage });

  res.status(StatusCodes.OK).json({
    statusCode: StatusCodes.OK,
    name: ReasonPhrases.OK,
    message: 'The employee(s) were found successfully.',
    pagination,
    data: docs,
  });
});
