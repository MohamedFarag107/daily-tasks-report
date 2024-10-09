import { Router } from 'express';

import { employeeRouter } from '~/router/employee';
import { taskRouter } from '~/router/task';

const mountRouter = Router();

mountRouter.use('/employees', employeeRouter);
mountRouter.use('/tasks', taskRouter);

export { mountRouter };
