import type { Command } from "../command.ts";
import fs from "indexeddb-fs";
import { join } from "pathe";
import { getCwd } from "../fs.ts";

const command: Command = {
  meta: {
    name: "touch",
    description: "create a new file",
    version: "1.0.0",
  },
  args: {},
  run: async (term, args) => {
    const newFileName = args._[1];
    const path = join(getCwd(), newFileName);
    if (await fs.exists(path)) {
      term.write("touch: file already exists\r\n");
      return 1;
    }
    try {
      await fs.writeFile(path, "");
      return 0;
    } catch (e) {
      term.write(`touch: failed to create file: ${e}`);
      return 1;
    }
  },
};

export default command;
