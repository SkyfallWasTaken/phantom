import type { Command } from "../../command.ts";
import { vendor, renderer } from "./gpu.ts";
import { findLongestStringLength } from "../../utils.ts";
import chalk from "chalk";

const command: Command = {
  meta: {
    name: "ghostfetch",
    description: "show system information",
    version: "1.0.0",
  },
  args: {},
  run: async (term, args) => {
    const info = {
      GPU: [
        `${chalk.cyan.bold("Vendor:")} ${vendor}`,
        `${chalk.cyan.bold("Renderer:")} ${renderer}`,
      ],
      CPU: [
        `${chalk.cyan.bold("Concurrency:")} ${navigator.hardwareConcurrency}`,
      ],
    };
    const keys = Object.keys(info);
    const divider = chalk.bold("-".repeat(findLongestStringLength(keys)));

    keys.forEach((key) => {
      const section = info[key];
      term.write(`${chalk.bold(key)}\r\n`);
      term.write(`${divider}\r\n`);

      section.forEach((item) => {
        term.write(`${item}\r\n`);
      });
      term.write("\r\n");
    });

    return 0;
  },
};

export default command;
