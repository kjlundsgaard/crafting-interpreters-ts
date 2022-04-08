import { Token } from "./Token";

export interface ExpressionInterface {
  accept: (visitor: Visitor) => void;
}

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
  visitBinary: () => void;
  visitGrouping: () => void;
  visitLiteral: () => void;
  visitUnary: () => void;
};

export class Expression {
  type: string;
  constructor() {
    // is this really necessary? unclear yet
    this.type = "Expression";
  }
}

export class Binary extends Expression implements ExpressionInterface {
  left: Expression;
  operator: Token;
  right: Expression;

  constructor(input: BinaryInput) {
    super();
    this.left = input.left;
    this.operator = input.operator;
    this.right = input.right;
  }

  accept(visitor: Visitor) {
    visitor.visitBinary();
  }
}

export class Grouping extends Expression {
  expression: Expression;

  constructor(expression: Expression) {
    super();
    this.expression = expression;
  }

  accept(visitor: Visitor) {
    visitor.visitGrouping();
  }
}

export class Literal extends Expression implements ExpressionInterface {
  value: Token;

  constructor(value: Token) {
    super();
    this.value = value;
  }

  accept(visitor: Visitor) {
    visitor.visitLiteral();
  }
}

export class Unary extends Expression implements ExpressionInterface {
  operator: Token;
  right: Expression;

  constructor(input: UnaryInput) {
    super();
    this.operator = input.operator;
    this.right = input.right;
  }

  accept(visitor: Visitor) {
    visitor.visitUnary;
  }
}
