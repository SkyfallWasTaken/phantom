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
    const text = args._.slice(1).join(" ") || "moo!";
    term.write(cowsay({ text }).replace(/\n/g, "\r\n"));
    term.write("\r\n");
    return 0;
  },
};

export default command;
