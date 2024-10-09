import { NotfoundError } from '~/error/notfound-error';
import { asyncHandler } from '~/utils/async-handler';

export const notfoundMiddleware = asyncHandler(async (req) => {
  const message = `Can't ${req.method} ${req.originalUrl}`;
  throw new NotfoundError(message);
});
