import { StatusCodes } from 'http-status-codes';
import { ApiError } from './api-error';

export class NotfoundError extends ApiError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
  }
}
