import type { Command } from "../command.ts";
import { say as cowsay } from "cowsay";

const command: Command = {
  meta: {
    name: "cowsay",
    description: "cow says moo!",
    version: "1.0.0",
  },
  args: {},
  run: async (term, args) => {
    const text = args._.slice(1).join(" ");
    console.log(cowsay({ text }));
    term.write("\r\n");
    return 0;
  },
};

export default command;
