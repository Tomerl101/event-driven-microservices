import { Message } from '../../interfaces/messages.interface';
import { IParser } from '../parser.interface';

class ParserC implements IParser {
  public doParse(message: Message): string {
    // Some fancy parser logic
    console.log("ParserC: start parserC logic...'");
    return `###=== ${message.message} ===###`;
  }
}

export default ParserC;
