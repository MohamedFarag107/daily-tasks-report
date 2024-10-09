import { Handler } from 'express';
import { matchedData, ValidationChain, validationResult } from 'express-validator';
import { BadRequestError } from '~/error/bad-request-error';
import { asyncHandler } from '~/utils/async-handler';

export const validate = (validationSchema: ValidationChain[]): Handler[] => [
  ...validationSchema,
  asyncHandler(async (req, _res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      req.body = matchedData(req, { locations: ['body'] });
      req.query = matchedData(req, { locations: ['query'] });
      req.params = matchedData(req, { locations: ['params'] });
      return next();
    }

    const message = result.array()[0].msg as string;

    throw new BadRequestError(message);
  }),
];
