import type { Command } from "../command.ts";
import fs from "indexeddb-fs";
import { join } from "pathe";
import { setCwd, getCwd } from "../fs.ts";

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
    const dir = args._[1];
    const finishedPath = join(getCwd(), dir);
    const exists = await fs.exists(finishedPath);

    if (exists && (await fs.isDirectory(finishedPath))) {
      setCwd(finishedPath);
    } else if (exists) {
      term.write("cd: not a directory\r\n");
      return;
    } else {
      term.write("cd: path not found\r\n");
      return;
    }

    term.write("\r\n");
    return 0;
  },
};

export default command;
