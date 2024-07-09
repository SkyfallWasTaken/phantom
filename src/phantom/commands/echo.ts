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
  run: async (term, args) => {
    term.write(args._.slice(1).join(" "));
    term.write("\r\n");
    return 0;
  },
};

export default command;
