import { Token } from "./Token";

export type Expression = {
  accept: (visitor: Visitor) => any;
};

export type Visitor = {
  visitBinary: (expr: Binary) => void;
  visitGrouping: (expr: Grouping) => void;
  visitLiteral: (expr: Literal) => void;
  visitUnary: (expr: Unary) => void;
};

type LiteralType = number | string | boolean | null;

export class Binary implements Expression {
  left: Expression;
  operator: Token;
  right: Expression;

  constructor(left: Expression, operator: Token, right: Expression) {
    this.left = left;
    this.operator = operator;
    this.right = right;
  }

  accept(visitor: Visitor) {
    return visitor.visitBinary(this);
  }
}

export class Grouping implements Expression {
  expression: Expression;

  constructor(expression: Expression) {
    this.expression = expression;
  }

  accept(visitor: Visitor) {
    return visitor.visitGrouping(this);
  }
}

export class Literal implements Expression {
  value: LiteralType;

  constructor(value: LiteralType) {
    this.value = value;
  }

  accept(visitor: Visitor) {
    return visitor.visitLiteral(this);
  }
}

export class Unary implements Expression {
  operator: Token;
  right: Expression;

  constructor(operator: Token, right: Expression) {
    this.operator = operator;
    this.right = right;
  }

  accept(visitor: Visitor) {
    return visitor.visitUnary(this);
  }
}
