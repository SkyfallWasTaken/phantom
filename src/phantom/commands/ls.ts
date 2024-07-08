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
    fs.readDirectory(join(getCwd(), args._[1] ?? "")).then((files) => {
      [...files.files, ...files.directories].forEach((file) => {
        term.write(`${file.name}`);
      });
    });
    term.write("\r\n");
  },
};

export default command;
