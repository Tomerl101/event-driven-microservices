import ParserA from './implementations/parserA';
import ParserB from './implementations/parserB';
import ParserC from './implementations/parserC';
import { IParser } from './parser.interface';
import { ParserTypes } from './parserTypes.enum';

class ParserFactory {
  public static getParser(type: ParserTypes): IParser {
    if (ParserTypes.PARSER_A === type) {
      return new ParserA();
    } else if (ParserTypes.PARSER_B === type) {
      return new ParserB();
    } else if (ParserTypes.PARSER_C === type) {
      return new ParserC();
    }
    throw new Error('Failed to create parser...');
    // process.exit(1);
  }
}

export default ParserFactory;
