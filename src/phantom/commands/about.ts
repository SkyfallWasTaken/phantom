import type { Command } from "../command.ts";
import chalk from "chalk";

const command: Command = {
  meta: {
    name: "about",
    description: "info about phantom",
    version: "1.0.0",
  },
  args: {},
  run: async (term) => {
    term.write(
      `${chalk.bold.bgCyan("phantom")} - a fantasy os written in typescript\r\n`
    );
    term.write("made with <3 by skyfall\r\n\r\n");
    term.write(
      `${chalk.bold("github:")} https://github.com/skyfallwastaken/phantom\r\n`
    );

    return 0;
  },
};

export default command;
