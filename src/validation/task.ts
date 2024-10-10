import { body, param, query, ValidationChain } from 'express-validator';
import { FindOptionsOrderValue } from 'typeorm';

import { MAX_DURATION_IN_MINUTES } from '~/config/constant';
import { Task } from '~/entities/task';
import { EmployeeRepository } from '~/repository/employee';
import { durationInMinutes, isSameDay, isDate } from '~/utils/date';

export const createTaskValidation: ValidationChain[] = [
  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isString()
    .withMessage('Description must be a string')
    .isLength({ min: 1 })
    .withMessage('Description must be at least 1 character long'),
  body('employeeId')
    .notEmpty()
    .withMessage('Employee ID is required')
    .isNumeric()
    .withMessage('Employee ID must be a number')
    .custom(async (value) => {
      const employee = await EmployeeRepository.findOneBy({ id: Number(value) });

      if (!employee) {
        throw new Error('Employee not found');
      }

      return true;
    }),
  body('from')
    .notEmpty()
    .withMessage('From date is required')
    .isISO8601()
    .withMessage('From date must be a valid date'),
  body('to')
    .notEmpty()
    .withMessage('To date is required')
    .isISO8601()
    .withMessage('To date must be a valid date'),
  body('from').custom((fromValue, { req }) => {
    const { from, to } = req.body;

    const fromDate = new Date(from);
    const toDate = new Date(to);

    if (!isSameDay(fromDate, toDate)) {
      throw new Error('Task From and To date must be in the same day');
    }

    if (fromDate >= toDate) {
      throw new Error('Task From date must be before To date');
    }

    const duration = durationInMinutes(fromDate, toDate);

    if (duration <= 0 || duration > MAX_DURATION_IN_MINUTES) {
      throw new Error('Task duration must be between 1 minute and 8 hours');
    }

    return true;
  }),
];

export const updateTaskValidation: ValidationChain[] = [
  ...createTaskValidation,
  param('taskId')
    .notEmpty()
    .withMessage('Task ID is required')
    .isNumeric()
    .withMessage('Task ID must be a number'),
];

export const deleteTaskValidation: ValidationChain[] = [
  param('taskId')
    .notEmpty()
    .withMessage('Task ID is required')
    .isNumeric()
    .withMessage('Task ID must be a number'),
];

export const findOneTaskValidation: ValidationChain[] = [
  param('taskId')
    .notEmpty()
    .withMessage('Task ID is required')
    .isNumeric()
    .withMessage('Task ID must be a number'),
];

export const findAllTasksValidation: ValidationChain[] = [
  query('description').optional().isString().withMessage('Description must be a string'),
  query('page').optional().isNumeric().withMessage('Page must be a number').default(1),
  query('limit').optional().isNumeric().withMessage('Limit must be a number').default(10),
  query('order')
    .optional()
    .isObject()
    .withMessage('Order must be an object')
    .custom((value) => {
      const validKeys: (keyof Task)[] = [
        'description',
        'id',
        'created_at',
        'updated_at',
        'from',
        'to',
      ];
      const validValues: FindOptionsOrderValue[] = ['ASC', 'DESC', 'asc', 'desc'];
      const keys = Object.keys(value) as (keyof Task)[];
      const isValid = keys.every((key) => validKeys.includes(key));
      if (!isValid) {
        throw new Error(`Invalid order key, valid keys are: ${validKeys.join(', ')}`);
      }

      const values = Object.values(value) as FindOptionsOrderValue[];
      const isValidValue = values.every((v) => validValues.includes(v));
      if (!isValidValue) {
        throw new Error(`Invalid order value, valid values are: ${validValues.join(', ')}`);
      }
      return true;
    }),
  query('filter')
    .optional()
    .isObject()
    .withMessage('Filter must be an object')
    .custom((value) => {
      if (value.employeeId && !/^\d+$/.test(value.employeeId)) {
        throw new Error('Employee ID in filter must be a number');
      }

      if (value.date && !isDate(value.date)) {
        throw new Error('Date in filter must be a valid date');
      }

      return true;
    }),
];
