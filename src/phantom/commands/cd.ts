import type { Command } from "../command.ts";
import fs from "indexeddb-fs";

const command: Command = {
  meta: {
    name: "cd",
    description: "change the shell working directory",
    version: "1.0.0",
  },
  args: {
    dir: {
      type: "positional",
      description: "the directory to change to",
      required: true,
    },
  },
  run: async (term, args) => {
    term.write("\r\n");

    const dir = args._[0];
    if (await fs.isDirectory(dir)) {
        
    }

    term.write("\r\n");
  },
};

export default command;
