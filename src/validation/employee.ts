import { body, param, query, ValidationChain } from 'express-validator';
import { FindOptionsOrderValue } from 'typeorm';

import { Employee } from '~/entities/employee';

export const createEmployeeValidation: ValidationChain[] = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 1 })
    .withMessage('Name must be at least 1 character long'),
];
export const updateEmployeeValidation: ValidationChain[] = [
  ...createEmployeeValidation,
  param('employeeId')
    .notEmpty()
    .withMessage('Employee ID is required')
    .isNumeric()
    .withMessage('Employee ID must be a number'),
];

export const deleteEmployeeValidation: ValidationChain[] = [
  param('employeeId')
    .notEmpty()
    .withMessage('Employee ID is required')
    .isNumeric()
    .withMessage('Employee ID must be a number'),
];

export const findOneEmployeeValidation: ValidationChain[] = [
  param('employeeId')
    .notEmpty()
    .withMessage('Employee ID is required')
    .isNumeric()
    .withMessage('Employee ID must be a number'),
];

export const findAllEmployeesValidation: ValidationChain[] = [
  query('name').optional().isString().withMessage('Name must be a string'),
  query('page').optional().isNumeric().withMessage('Page must be a number').default(1),
  query('limit').optional().isNumeric().withMessage('Limit must be a number').default(10),
  query('order')
    .optional()
    .isObject()
    .withMessage('Order must be an object')
    .custom((value) => {
      const validKeys: (keyof Employee)[] = ['name', 'id', 'created_at', 'updated_at'];
      const validValues: FindOptionsOrderValue[] = ['ASC', 'DESC', 'asc', 'desc'];
      const keys = Object.keys(value) as (keyof Employee)[];
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
];
