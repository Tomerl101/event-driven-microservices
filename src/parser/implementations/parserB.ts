import { IParser } from '../parser.interface';

class ParserB implements IParser {
  public doParse() {
    // Some fancy parser logic
    console.log("ParserB: start parserB logic...'");
    return 'parserBlogic...';
  }
}

export default ParserB;
