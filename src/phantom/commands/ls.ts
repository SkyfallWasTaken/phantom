import type { Command } from "../command.ts";
import fs from "indexeddb-fs";
import { join } from "pathe";
import { setCwd, getCwd } from "../fs.ts";

const command: Command = {
  meta: {
    name: "ls",
    description: "list info about files",
    version: "1.0.0",
  },
  args: {
    dir: {
      type: "positional",
      description: "the directory to look at",
      required: true,
    },
  },
  run: async (term, args) => {
    let details = await fs.readDirectory(
      getCwd() === "/root" ? "root" : getCwd(),
    );
    try {
      [...details.files, ...details.directories].forEach((file) => {
        term.write(`\r\n${file.name}`);
      });
    } catch (e) {
      term.write(`\r\nls: failed to get files: ${e}\r\n`);
      return 1;
    }
    term.write("\r\n");

    return 0;
  },
};

export default command;
