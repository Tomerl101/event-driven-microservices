import { v4 as uuidv4 } from 'uuid';
import { CreateMessageDto } from '../dtos/createMessages.dto';
import HttpError from '../errors/httpError';
import { Message } from '../interfaces/messages.interface';
import { IMessageService } from './messageService.interface';
import { isEmpty } from '../utils/isEmpty';
import ParserFactory from '../parser/parser.factory';
import { ParserTypes } from '../parser/parserTypes.enum';
import KafkaClient from '../utils/kafkaClient';

class MessageService implements IMessageService {
  private messages: Message[] = [{ id: '123', message: 'dummyMsg' }];
  private parser = ParserFactory.getParser(process.env.PARSER as ParserTypes);

  constructor() {
    console.log(`${process.env.SERVICE_ID} create parser of type ${process.env.PARSER}`);
    KafkaClient.consume(this.handleMessage); // Subscribe to kafka topic and isten to new events
  }

  public getMessageById(messageId: string): Message {
    if (!messageId) throw new HttpError(400, 'Invalid message id');

    const message: Message | undefined = this.messages.find((message) => message.id === messageId);
    if (!message) throw new HttpError(404, 'Message not found');

    return message;
  }

  public createMessage(messageDto: CreateMessageDto): Message {
    if (isEmpty(messageDto)) throw new HttpError(400, 'Invalid message body');

    const message: Message = { id: uuidv4(), message: messageDto.message };
    KafkaClient.produce(message);
    return message;
  }

  public handleMessage = async (eventMsg: any) =>
    //setTimeout in order to mimic async job running
    setTimeout(() => {
      const message: Message = JSON.parse(eventMsg.message.value?.toString());
      console.log('Start handle message: ', message);
      message.parsed = this.parser.doParse(message);
      this.messages.push(message);
    }, 3000);
}

export default MessageService;
