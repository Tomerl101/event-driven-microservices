import { NextFunction, Request, Response } from 'express';
import { CreateMessageDto } from '../dtos/createMessages.dto';
import { IMessageController } from './controllers.interface';
import { Message } from '../interfaces/messages.interface';
import messageService from '../services/messages.service';

class MessagesController implements IMessageController {
  public messageService = new messageService();

  public getMessage = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const messageId = req.params.id;
      const message: Message = this.messageService.getMessageById(messageId);
      res.status(200).json({
        id: message.id,
        message: message.message,
        parsed: 'some parsed message',
        serviceId: process.env.SERVICE_ID,
      });
    } catch (error) {
      next(error);
    }
  };

  public createMessage = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const messageDto: CreateMessageDto = req.body;
      const newMessage: Message = this.messageService.createMessage(messageDto);

      res.status(201).json({ id: newMessage.id });
    } catch (error) {
      next(error);
    }
  };
}

export default MessagesController;