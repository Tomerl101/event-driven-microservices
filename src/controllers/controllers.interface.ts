import { NextFunction, Request, Response } from 'express';

export interface IControllerHandler {
  (reqss: Request, res: Response, next: NextFunction, num: number): void;
}

export interface IMessageController {
  getMessage: IControllerHandler;
  createMessage: IControllerHandler;
}
