import { Token } from "./Token";

export type Expression = {
  accept: (visitor: Visitor) => any;
};

export type BinaryInput = {
  left: Expression;
  operator: Token;
  right: Expression;
};

export type UnaryInput = {
  operator: Token;
  right: Expression;
};

export type Visitor = {
  visitBinary: (expr: Binary) => void;
  visitGrouping: (expr: Grouping) => void;
  visitLiteral: (expr: Literal) => void;
  visitUnary: (expr: Unary) => void;
};

export class Binary implements Expression {
  left: Expression;
  operator: Token;
  right: Expression;

  constructor(input: BinaryInput) {
    this.left = input.left;
    this.operator = input.operator;
    this.right = input.right;
  }

  accept(visitor: Visitor) {
    visitor.visitBinary(this);
  }
}

export class Grouping implements Expression {
  expression: Expression;

  constructor(expression: Expression) {
    this.expression = expression;
  }

  accept(visitor: Visitor) {
    visitor.visitGrouping(this);
  }
}

export class Literal implements Expression {
  value: Token;

  constructor(value: Token) {
    this.value = value;
  }

  accept(visitor: Visitor) {
    visitor.visitLiteral(this);
  }
}

export class Unary implements Expression {
  operator: Token;
  right: Expression;

  constructor(input: UnaryInput) {
    this.operator = input.operator;
    this.right = input.right;
  }

  accept(visitor: Visitor) {
    visitor.visitUnary(this);
  }
}
