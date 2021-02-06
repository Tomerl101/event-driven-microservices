import ParserA from './implementations/parserA';
import ParserB from './implementations/parserB';
import { IParser } from './parser.interface';
import { ParserTypes } from './parserTypes.enum';

class ParserFactory {
  public static getParser(type: ParserTypes): IParser {
    if (ParserTypes.PARSER_A === type) {
      return new ParserA();
    } else if (ParserTypes.PARSER_B === type) {
      return new ParserB();
    }
    throw new Error('Cannot create parser');
  }
}

export default ParserFactory;