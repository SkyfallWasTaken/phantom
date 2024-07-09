import type { Command } from "../command.ts";
import { vendor, renderer } from "./gpu.ts";
import chalk from "chalk";

const command: Command = {
  meta: {
    name: "ghostfetch",
    description: "show system information",
    version: "1.0.0",
  },
  run: async (term, args) => {
    term.write("\r\n");

    term.write(
      `\r\n${chalk.bold("Concurrency:")} ${navigator.hardwareConcurrency}`,
    );
    term.write(`\r\n${chalk.bold("GPU:")} ${renderer}`);

    term.write("\r\n");
    return 0;
  },
};

export default command;
