import { readFileSync } from "fs";
import { createInterface } from "readline";
import { red } from "cli-color";
import { Scanner } from "./Scanner";

export class Lox {
  hadError: boolean;

  constructor() {
    this.hadError = false;
  }

  main(args: string[]): void {
    if (args.length > 3) {
      console.log(`Usage: npm run jlox [script]`);
      process.exit(1);
    } else if (args.length === 3) {
      console.log(args[2]);
      this.runFile(args[2]);
    } else {
      this.runPrompt();
    }
  }

  runFile(path: string) {
    const contents = readFileSync(path);
    this.run(contents);

    if (this.hadError) {
      process.exit(1);
    }
  }

  runPrompt() {
    const readline = createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: true,
    });

    process.stdout.write("> ");
    readline.on("line", (line) => {
      this.run(line);
      this.hadError = false;
      process.stdout.write("> ");
    });
  }

  run(source: string | Buffer) {
    const scanner = new Scanner(source.toString(), this);
    const tokens = scanner.scanTokens();
    tokens.forEach((token) => {
      console.log(token.toString());
    });
  }

  error(line: number, message: string) {
    this.report(line, "", message);
  }

  report(line: number, where: string, message: string) {
    process.stderr.write(red(`[line ${line}] Error ${where}: ${message}\n`));
    this.hadError = true;
  }
}
