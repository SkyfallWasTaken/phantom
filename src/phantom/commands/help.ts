import { type Command, commands } from "../command.ts";

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
  run: (term, args) => {
    term.write("\r\n");
    commands.forEach((command) => {
      term.write(`${command.meta.name} - ${command.meta.description}\r\n`);
    });
  },
};

export default command;
