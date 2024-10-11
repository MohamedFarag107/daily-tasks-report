import { Router } from 'express';

import { validate } from '~/middleware/validate';

import {
  createTaskController,
  dailyTaskSummaryController,
  deleteTaskController,
  findAllTasksController,
  findOneTaskController,
  updateTaskController,
} from '~/controller/task';
import {
  createTaskValidation,
  dailyTaskSummaryValidation,
  deleteTaskValidation,
  findAllTasksValidation,
  findOneTaskValidation,
  updateTaskValidation,
} from '~/validation/task';

const taskRouter = Router();

taskRouter.post('/', validate(createTaskValidation), createTaskController);
taskRouter.get('/daily-summary', validate(dailyTaskSummaryValidation), dailyTaskSummaryController);
taskRouter.put('/:taskId', validate(updateTaskValidation), updateTaskController);
taskRouter.delete('/:taskId', validate(deleteTaskValidation), deleteTaskController);
taskRouter.get('/:taskId', validate(findOneTaskValidation), findOneTaskController);
taskRouter.get('/', validate(findAllTasksValidation), findAllTasksController);

export { taskRouter };
