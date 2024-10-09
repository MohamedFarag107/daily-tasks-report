import { Router } from 'express';

import { validate } from '~/middleware/validate';

import {
  createEmployeeController,
  updateEmployeeController,
  deleteEmployeeController,
  findOneEmployeeController,
  findAllEmployeesController,
} from '~/controller/employee';
import {
  createEmployeeValidation,
  deleteEmployeeValidation,
  findAllEmployeesValidation,
  findOneEmployeeValidation,
  updateEmployeeValidation,
} from '~/validation/employee';

const employeeRouter = Router();

employeeRouter.post('/', validate(createEmployeeValidation), createEmployeeController);
employeeRouter.put('/:employeeId', validate(updateEmployeeValidation), updateEmployeeController);
employeeRouter.delete('/:employeeId', validate(deleteEmployeeValidation), deleteEmployeeController);
employeeRouter.get('/:employeeId', validate(findOneEmployeeValidation), findOneEmployeeController);
employeeRouter.get('/', validate(findAllEmployeesValidation), findAllEmployeesController);

export { employeeRouter };
