import { type Command, commands } from "../command.ts";
import chalk from "chalk";

const command: Command = {
  meta: {
    name: "help",
    description: "displays information about builtin commands",
    version: "1.0.0",
  },
  args: {
    text: {
      type: "positional",
      description: "the text to display",
      required: true,
    },
  },
  run: async (term, args) => {
    term.write("\r\n");
    const longestCommandLength = findLongestStringLength(
      commands.map((c) => c.meta.name),
    );
    commands.forEach((command) => {
      const paddingLength = longestCommandLength - command.meta.name.length;
      const padding = paddingLength > 0 ? " ".repeat(paddingLength) : "";

      term.write(
        `${paddingLength > 0 ? padding : ""}${chalk.bold(
          command.meta.name,
        )} - ${command.meta.description}\r\n`,
      );
    });

    return 0;
  },
};

function findLongestStringLength(arr: string[]): number {
  let maxLength = 0;

  for (let str of arr) {
    if (str.length > maxLength) {
      maxLength = str.length;
    }
  }

  return maxLength;
}

export default command;
