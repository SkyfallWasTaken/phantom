import type { Command } from "../command.ts";

const command: Command = {
  meta: {
    name: "clear",
    description: "clear the terminal",
    version: "1.0.0",
  },
  args: {},
  run: async (term, args) => {
    term.clear();
    return 0;
  },
};

export default command;
