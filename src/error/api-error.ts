import { getReasonPhrase, StatusCodes } from 'http-status-codes';

export class ApiError extends Error {
  statusCode: StatusCodes;
  name: string;
  error: string;
  constructor(message: string, statusCode: StatusCodes) {
    super();
    this.statusCode = statusCode;
    this.name = getReasonPhrase(statusCode);
    this.error = message;
  }
}
