import type { Command } from "../command.ts";

const command: Command = {
  meta: {
    name: "echo",
    description: "displays some text",
    version: "1.0.0",
  },
  args: {
    text: {
      type: "positional",
      description: "the text to display",
      required: true,
    },
  },
  run: (args) => {
    console.log(args._.slice(1).join(" "));
  },
};

export default command;
