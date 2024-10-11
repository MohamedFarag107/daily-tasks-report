import { FindManyOptions, ILike, Not } from 'typeorm';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { asyncHandler } from '~/utils/async-handler';
import { CreateTaskDto, DailyTaskSummaryDto, FindAllTasksDto, UpdateTaskDto } from '~/dto/task';
import { TaskRepository } from '~/repository/task';
import { NotfoundError } from '~/error/notfound-error';
import { Task } from '~/entities/task';
import { createPagination } from '~/utils/create-pagination';
import { durationInMinutes, formateTaskDate } from '~/utils/date';
import { MAX_DURATION_IN_MINUTES } from '~/config/constant';
import { BadRequestError } from '~/error/bad-request-error';

export const createTaskController = asyncHandler(async (req, res) => {
  const data = <CreateTaskDto>req.body;

  const duration = durationInMinutes(data.from, data.to);

  const totalMinutes = await TaskRepository.sum('duration', {
    employeeId: { id: Number(data.employeeId) },
    date: formateTaskDate(data.from),
  });

  const totalDuration = duration + (totalMinutes || 0);

  if (totalDuration > MAX_DURATION_IN_MINUTES) {
    throw new BadRequestError('Employee can not work more than 8 hours a day');
  }

  const task = TaskRepository.create({
    ...data,
    duration,
    date: formateTaskDate(data.from),
    employeeId: { id: Number(data.employeeId) },
  });

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

  const duration = durationInMinutes(data.from, data.to);

  const totalMinutes = await TaskRepository.sum('duration', {
    employeeId: { id: Number(data.employeeId) },
    date: formateTaskDate(data.from),
    id: Not(task.id),
  });

  const totalDuration = duration + (totalMinutes || 0);

  if (totalDuration > MAX_DURATION_IN_MINUTES) {
    throw new BadRequestError('Employee can not work more than 8 hours a day');
  }

  Object.assign(task, {
    ...data,
    duration,
    date: formateTaskDate(data.from),
  });

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

  if (filter?.date) {
    query.where = {
      ...query.where,
      date: formateTaskDate(new Date(filter.date)),
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

export const dailyTaskSummaryController = asyncHandler(async (req, res) => {
  const { date, employeeId } = <DailyTaskSummaryDto>req.query;

  const totalMinutes = await TaskRepository.sum('duration', {
    date: formateTaskDate(date as string),
    employeeId: { id: Number(employeeId) },
  });

  const remainingMinutes = MAX_DURATION_IN_MINUTES - (totalMinutes || 0);

  res.status(StatusCodes.OK).json({
    statusCode: StatusCodes.OK,
    name: ReasonPhrases.OK,
    message: 'Daily Task Summary',
    data: {
      total_minutes: totalMinutes || 0,
      remaining_minutes: remainingMinutes,
    },
  });
});
