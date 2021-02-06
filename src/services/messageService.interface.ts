import { CreateMessageDto } from '../dtos/createMessages.dto';
import { Message } from '../interfaces/messages.interface';

export interface IMessageService {
  getMessageById(messageId: string): Message;
  createMessage(messageDto: CreateMessageDto): Message;
}
