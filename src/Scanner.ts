import { Lox } from "./Lox";
import { Token } from "./Token";
import { TokenType } from "./TokenType";

export class Scanner {
  source: string;
  tokens: Token[];
  start: number;
  current: number;
  line: number;
  lox: Lox;
  keywords: Map<string, TokenType>;

  constructor(source: string) {
    this.source = source;
    this.tokens = [];
    this.start = 0;
    this.current = 0;
    this.line = 1;
    this.lox = new Lox();
    this.keywords = new Map();
    this.keywords.set("and", TokenType.AND);
    this.keywords.set("class", TokenType.CLASS);
    this.keywords.set("else", TokenType.ELSE);
    this.keywords.set("false", TokenType.FALSE);
    this.keywords.set("for", TokenType.FOR);
    this.keywords.set("fun", TokenType.FUN);
    this.keywords.set("if", TokenType.IF);
    this.keywords.set("nil", TokenType.NIL);
    this.keywords.set("or", TokenType.OR);
    this.keywords.set("print", TokenType.PRINT);
    this.keywords.set("return", TokenType.RETURN);
    this.keywords.set("super", TokenType.SUPER);
    this.keywords.set("this", TokenType.THIS);
    this.keywords.set("true", TokenType.TRUE);
    this.keywords.set("var", TokenType.VAR);
    this.keywords.set("while", TokenType.WHILE);
  }

  scanTokens(): Token[] {
    while (!this.isAtEnd()) {
      // We are at the beginning of the next lexeme
      this.start = this.current;
      this.scanToken();
    }

    this.tokens.push(
      new Token({
        type: TokenType.EOF,
        lexeme: "",
        literal: null,
        line: this.line,
      })
    );
    return this.tokens;
  }

  scanToken() {
    let c = this.advance();
    switch (c) {
      case "(":
        this.addToken(TokenType.LEFT_PAREN, null);
        break;
      case ")":
        this.addToken(TokenType.RIGHT_PAREN, null);
        break;
      case "{":
        this.addToken(TokenType.LEFT_BRACE, null);
        break;
      case "}":
        this.addToken(TokenType.RIGHT_BRACE, null);
        break;
      case ",":
        this.addToken(TokenType.COMMA, null);
        break;
      case ".":
        this.addToken(TokenType.DOT, null);
        break;
      case "-":
        this.addToken(TokenType.MINUS, null);
        break;
      case "+":
        this.addToken(TokenType.PLUS, null);
        break;
      case ";":
        this.addToken(TokenType.SEMICOLON, null);
        break;
      case "*":
        this.addToken(TokenType.STAR, null);
        break;
      case "!":
        this.addToken(
          this.match("=") ? TokenType.BANG_EQUAL : TokenType.BANG,
          null
        );
        break;
      case "=":
        this.addToken(
          this.match("=") ? TokenType.EQUAL_EQUAL : TokenType.EQUAL,
          null
        );
      case "<":
        this.addToken(
          this.match("=") ? TokenType.LESS_EQUAL : TokenType.LESS,
          null
        );
        break;
      case ">":
        this.addToken(
          this.match("=") ? TokenType.GREATER_EQUAL : TokenType.GREATER,
          null
        );
        break;
      case "/":
        if (this.match("/")) {
          // A comment goes until the end of the line
          while (this.peek() != "\n" && !this.isAtEnd()) {
            this.advance();
          }
        } else {
          this.addToken(TokenType.SLASH, null);
        }
        break;
      case " ":
        break;
      case "\t":
        break;
      case "\r":
        break;
      case "\n":
        this.line++;
        break;
      case '"':
        this.string();
        break;
      default:
        if (this.isDigit(c)) {
          this.number();
        } else if (this.isAlpha(c)) {
          this.identifier();
        } else {
          this.lox.error(this.line, "Unexpected character.");
        }
    }
  }

  isAtEnd(): boolean {
    return this.current >= this.source.length;
  }

  advance(): string {
    return this.source.charAt(this.current++);
  }

  addToken(type: TokenType, literal: Object | null) {
    const text = this.source.substring(this.start, this.current);
    this.tokens.push(
      new Token({ type, lexeme: text, literal, line: this.line })
    );
  }

  match(expected: string): boolean {
    if (this.isAtEnd()) {
      return false;
    }

    if (this.source[this.current] !== expected) {
      return false;
    }

    this.current++;
    return true;
  }

  peek(): string {
    if (this.isAtEnd()) {
      return "\0";
    }
    return this.source.charAt(this.current);
  }

  peekNext(): string {
    if (this.current + 1 >= this.source.length) {
      return "\0";
    }
    return this.source[this.current + 1];
  }

  string() {
    while (this.peek() !== '"' && !this.isAtEnd()) {
      if (this.peek() == "\n") {
        this.line++;
      }
      this.advance();
    }

    if (this.isAtEnd()) {
      this.lox.error(this.line, "Unterminated string");
      return;
    }

    this.advance();
    const value = this.source.substring(this.start + 1, this.current - 1);
    this.addToken(TokenType.STRING, value);
  }

  isDigit(c: string): boolean {
    try {
      const cNum = parseInt(c);
      return cNum >= 0 && cNum <= 9;
    } catch (e) {
      return false;
    }
  }

  number() {
    while (this.isDigit(this.peek())) {
      this.advance();
    }

    if (this.peek() === "." && this.isDigit(this.peekNext())) {
      this.advance();
      while (this.isDigit(this.peek())) {
        this.advance();
      }
    }
    this.addToken(
      TokenType.NUMBER,
      parseFloat(this.source.substring(this.start, this.current))
    );
  }

  identifier() {
    while (this.isAlphaNumeric(this.peek())) {
      this.advance();
    }
    const text = this.source.substring(this.start, this.current);
    let type = this.keywords.get(text);
    if (!type) {
      type = TokenType.IDENTIFIER;
    }
    this.addToken(type, null);
  }

  isAlpha(c: string): boolean {
    return !!c.match(/[a-z]/i) || c === "_";
  }

  isAlphaNumeric(c: string): boolean {
    return this.isAlpha(c) || this.isDigit(c);
  }
}
