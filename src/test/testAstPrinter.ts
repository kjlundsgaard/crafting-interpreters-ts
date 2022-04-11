import { Binary, Literal, Grouping, Unary } from "../Expr";
import { Token } from "../Token";
import { TokenType } from "../TokenType";
import { AstPrinter } from "../AstPrinter";

const expression = new Binary(
  new Unary(
    new Token({
      type: TokenType.MINUS,
      lexeme: "-",
      literal: null,
      line: -1,
    }),
    new Literal(123)
  ),
  new Token({ type: TokenType.STAR, lexeme: "*", literal: null, line: 1 }),
  new Grouping(new Literal(45.67))
);
console.log(new AstPrinter().print(expression));
