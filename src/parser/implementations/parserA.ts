import { IParser } from '../parser.interface';

class ParserA implements IParser {
  public doParse() {
    // Some fancy parser logic
    console.log("ParserA: start parserA logic...'");
    return 'parserA logic...';
  }
}

export default ParserA;
