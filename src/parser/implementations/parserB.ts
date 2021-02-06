import { Message } from '../../interfaces/messages.interface';
import { IParser } from '../parser.interface';

class ParserB implements IParser {
  public doParse(message: Message): string {
    // Some fancy parser logic
    console.log("ParserB: start parserB logic...'");
    return `@@@--- ${message.message} ---@@@`;
  }
}

export default ParserB;
