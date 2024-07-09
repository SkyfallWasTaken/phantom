import type { Command } from "../command.ts";
import fs from "indexeddb-fs";
import { join } from "pathe";
import { getCwd } from "../fs.ts";

const command: Command = {
  meta: {
    name: "mkdir",
    description: "create a new directory",
    version: "1.0.0",
  },
  args: {
    dir: {
      type: "positional",
      description: "the directory to create",
      required: true,
    },
  },
  run: async (term, args) => {
    const dir = args._[1];
    const finishedPath = join(getCwd(), dir);
    console.log(finishedPath);
    const exists = await fs.exists(finishedPath);

    if (exists) {
      term.write("\r\nmkdir: directory already exists\r\n");
      return 1;
    } else {
      try {
        await fs.createDirectory(finishedPath);
      } catch (e) {
        term.write(`\r\nmkdir: failed to create directory: ${e}`)
        return 1;
      }
    }

    term.write("\r\n");
    return 0;
  },
};

export default command;
