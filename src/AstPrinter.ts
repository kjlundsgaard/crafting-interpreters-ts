import { Binary, Literal, Grouping, Unary, Expression, Visitor } from "./Expr";
export class AstPrinter implements Visitor {
  print(expr: Expression): string {
    return expr.accept(this);
  }

  visitBinary(expr: Binary) {
    return this.parenthesize(expr.operator.lexeme, expr.left, expr.right);
  }

  visitGrouping(expr: Grouping) {
    return this.parenthesize("group", expr);
  }

  visitLiteral(expr: Literal) {
    if (expr.value === null) {
      return "nil";
    }
    return expr.value.toString();
  }

  visitUnary(expr: Unary) {
    return this.parenthesize(expr.operator.lexeme, expr.right);
  }

  parenthesize(name: string, ...exprs: Expression[]) {
    let builder = [];
    builder.push("(");
    builder.push(name);
    exprs.forEach((expr) => {
      builder.push(" ");
      builder.push(expr.accept(this));
    });
    builder.push(")");

    return builder.join("");
  }
}
