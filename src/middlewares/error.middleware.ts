import { NextFunction, Request, Response } from 'express';
import HttpError from '../errors/httpError';
import Debug from 'debug';
const debug = Debug(`${process.env.SERVICE_ID}:error`);
// import { logger } from '../utils/logger';

function errorMiddleware(error: HttpError, req: Request, res: Response, next: NextFunction): void {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Server Internal Error';
    // logger.error(`StatusCode : ${status}, Message : ${message}`);
    debug(error);
    res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
}

export default errorMiddleware;
