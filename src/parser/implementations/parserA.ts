import { Message } from '../../interfaces/messages.interface';
import { IParser } from '../parser.interface';

class ParserA implements IParser {
  public doParse(message: Message): string {
    // Some fancy parser logic
    console.log("ParserA: start parserA logic...'");
    return `!!!~~~ ${message.message} ~~~!!!`;
  }
}

export default ParserA;
