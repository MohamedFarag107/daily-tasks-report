import { Router } from 'express';

import { validate } from '~/middleware/validate';

import {
  createTaskController,
  deleteTaskController,
  findAllTasksController,
  findOneTaskController,
  updateTaskController,
} from '~/controller/task';
import {
  createTaskValidation,
  deleteTaskValidation,
  findAllTasksValidation,
  findOneTaskValidation,
  updateTaskValidation,
} from '~/validation/task';

const taskRouter = Router();

taskRouter.post('/', validate(createTaskValidation), createTaskController);
taskRouter.put('/:taskId', validate(updateTaskValidation), updateTaskController);
taskRouter.delete('/:taskId', validate(deleteTaskValidation), deleteTaskController);
taskRouter.get('/:taskId', validate(findOneTaskValidation), findOneTaskController);
taskRouter.get('/', validate(findAllTasksValidation), findAllTasksController);

export { taskRouter };
