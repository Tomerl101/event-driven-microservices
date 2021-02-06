import { Router } from 'express';
import MessageController from '../controllers/messages.controller';
import { CreateMessageDto } from '../dtos/createMessages.dto';
import IRoute from './routes.interface';
import validate from '../middlewares/validate.middleware';

class MessageRouters implements IRoute {
  public router = Router();
  public messageController = new MessageController();
  readonly baseUrl: string;

  constructor() {
    this.baseUrl = '/api/resource';
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.baseUrl}/:id`, this.messageController.getMessage);
    this.router.post(
      `${this.baseUrl}`,
      validate(CreateMessageDto, 'body', true),
      this.messageController.createMessage
    );
  }
}

export default MessageRouters;
