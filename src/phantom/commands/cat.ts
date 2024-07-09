import type { Command } from "../command.ts";
import fs from "indexeddb-fs";
import { join } from "pathe";
import { getCwd } from "../fs.ts";

const command: Command = {
  meta: {
    name: "cat",
    description: "print file to standard output",
    version: "1.0.0",
  },
  args: {},
  run: async (term, args) => {
    const newFileName = args._[1];
    const path = join(getCwd(), newFileName);
    if (!(await fs.exists(path))) {
      term.write("cat: file does not exist\r\n");
      return 1;
    } else if (await fs.isDirectory(path)) {
      term.write("cat: not a file\r\n");
      return 1;
    }
    try {
      term.write(await fs.readFile(path));
      return 0;
    } catch (e) {
      term.write(`cat: failed to read file: ${e}`);
      return 1;
    }
  },
};

export default command;
