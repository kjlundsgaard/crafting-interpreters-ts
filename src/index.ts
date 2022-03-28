import { Lox } from "./Lox";

const lox = new Lox();
if (require.main === module) {
  lox.main(process.argv);
}
