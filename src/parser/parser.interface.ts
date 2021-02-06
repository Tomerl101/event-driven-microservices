import { Message } from '../interfaces/messages.interface';

export interface IParser {
  doParse(message: Message): string;
}
