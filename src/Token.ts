import { TokenType } from "./TokenType";

export type TokenInput = {
  type: TokenType;
  lexeme: string;
  literal: Object | null;
  line: number;
};

export class Token {
  type: TokenType;
  lexeme: string;
  literal: Object | null;
  line: number;

  constructor({ type, lexeme, literal, line }: TokenInput) {
    this.type = type;
    this.lexeme = lexeme;
    this.literal = literal;
    this.line = line;
  }

  toString() {
    return `Type: ${TokenType[this.type]} Lexeme: ${this.lexeme} Literal: ${
      this.literal
    }`;
  }
}
