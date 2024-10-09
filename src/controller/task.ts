import { FindManyOptions, ILike } from 'typeorm';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { asyncHandler } from '~/utils/async-handler';
import { CreateTaskDto, FindAllTasksDto, UpdateTaskDto } from '~/dto/task';
import { TaskRepository } from '~/repository/task';
import { NotfoundError } from '~/error/notfound-error';
import { Task } from '~/entities/task';
import { createPagination } from '~/utils/create-pagination';

export const createTaskController = asyncHandler(async (req, res) => {
  const data = <CreateTaskDto>req.body;

  const task = TaskRepository.create(data);

  await TaskRepository.save(task);

  res.status(StatusCodes.CREATED).json({
    statusCode: StatusCodes.CREATED,
    name: ReasonPhrases.CREATED,
    message: 'Task Created Successfully',
    data: task,
  });
});

export const updateTaskController = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const data = <UpdateTaskDto>req.body;

  const task = await TaskRepository.findOneBy({
    id: Number(taskId),
  });

  if (!task) {
    throw new NotfoundError(`Task With ID ${taskId} Not Found`);
  }

  Object.assign(task, data);

  await TaskRepository.save(task);

  res.status(StatusCodes.OK).json({
    statusCode: StatusCodes.OK,
    name: ReasonPhrases.OK,
    message: 'Task Updated Successfully',
    data: task,
  });
});

export const deleteTaskController = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  const task = await TaskRepository.findOneBy({
    id: Number(taskId),
  });

  if (!task) {
    throw new NotfoundError(`Task With ID ${taskId} Not Found`);
  }

  await TaskRepository.delete(task.id);

  res.status(StatusCodes.NO_CONTENT).json({});
});

export const findOneTaskController = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  const task = await TaskRepository.findOneBy({
    id: Number(taskId),
  });

  if (!task) {
    throw new NotfoundError(`Task With ID ${taskId} Not Found`);
  }

  res.status(StatusCodes.OK).json({
    statusCode: StatusCodes.OK,
    name: ReasonPhrases.OK,
    message: 'The task was found successfully.',
    data: task,
  });
});

export const findAllTasksController = asyncHandler(async (req, res) => {
  const {
    description,
    page = 1,
    limit = 10,
    order = { id: 'ASC' },
    filter,
  } = <FindAllTasksDto>req.query;
  const take = Number(limit);
  const currentPage = Number(page);
  const skip = (currentPage - 1) * take;

  const query: FindManyOptions<Task> = {
    take,
    skip,
    order,
  };

  if (filter?.employeeId) {
    query.where = {
      employeeId: {
        id: Number(filter.employeeId),
      },
    };
  }

  if (description && description.trim().length > 0) {
    query.where = {
      ...query.where,
      description: ILike(`%${description}%`),
    };
  }

  const data = await TaskRepository.findAndCount(query);

  const { docs, ...pagination } = createPagination(data, { limit: take, page: currentPage });

  res.status(StatusCodes.OK).json({
    statusCode: StatusCodes.OK,
    name: ReasonPhrases.OK,
    message: 'The task(s) were found successfully.',
    pagination,
    data: docs,
  });
});
