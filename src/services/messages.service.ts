import { v4 as uuidv4 } from 'uuid';
import { CreateMessageDto } from '../dtos/createMessages.dto';
import HttpError from '../errors/httpError';
import { Message } from '../interfaces/messages.interface';
import { IMessageService } from './messageService.interface';
import { isEmpty } from '../utils/isEmpty';
import ParserFactory from '../parser/parser.factory';
import { ParserTypes } from '../parser/parserTypes.enum';

class MessageService implements IMessageService {
  public messages = [{ id: '123', message: 'dummyMsg' }];
  private parser = ParserFactory.getParser(process.env.PARSER as ParserTypes);

  public getMessageById(messageId: string): Message {
    if (!messageId) throw new HttpError(400, 'Invalid message id');

    const message: Message | undefined = this.messages.find((message) => message.id === messageId);
    if (!message) throw new HttpError(404, 'Message not found');

    return message;
  }

  public createMessage(messageDto: CreateMessageDto): Message {
    if (isEmpty(messageDto)) throw new HttpError(400, 'Invalid message body');

    this.parser.doParse();
    const message: Message = { id: uuidv4(), message: messageDto.message };
    return message;
  }
}

export default MessageService;
