import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { env } from '~/config/env';
import { ApiError } from '~/error/api-error';

export const globalErrorHandlerMiddleware = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const isProduction = env.isProduction;
  const error =
    err instanceof ApiError ? err : new ApiError(err.message, StatusCodes.INTERNAL_SERVER_ERROR);

  if (isProduction) {
    delete error.stack;
  }

  res.status(error.statusCode).json(error);
};
