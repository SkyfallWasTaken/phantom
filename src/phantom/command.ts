import mri from "mri";

import echo from "./commands/echo.ts";
import help from "./commands/help.ts";
import cd from "./commands/cd.ts";
import mkdir from "./commands/mkdir.ts";
import ls from "./commands/ls.ts";
import clear from "./commands/clear.ts";
import ghostfetch from "./commands/ghostfetch/main.ts";

import { type Terminal } from "@xterm/xterm";

export const commands = [echo, help, cd, mkdir, ls, clear, ghostfetch];

interface CommandArgs {
  _: string[];
  [key: string]: string | boolean | string[];
}

export type Command = {
  meta: {
    name: string;
    version: string;
    description: string;
  };
  args: {
    [key: string]: {
      type: "positional" | "option";
      description: string;
      required: boolean;
    };
  };
  run: (terminal: Terminal, args: CommandArgs) => Promise<number>;
};

export async function handleCommand(
  terminal: Terminal,
  unparsedCommand: string | undefined,
): number {
  if (!unparsedCommand) {
    return terminal.write("\r\n");
  }

  const parts = unparsedCommand.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
  const command = mri(parts);

  // Find command to run
  const commandToRun = commands.find((c) => c.meta.name === command._[0]);
  if (!commandToRun) {
    terminal.write(`\r\nerror: command not found: \`${command._[0]}\`\r\n`);
    return 1;
  }
  try {
    return await commandToRun.run(terminal, command);
  } catch (e) {
    terminal.write(`\r\ncommand failed: ${e}\r\n`);
    // FIXME: return right one
    return 1;
  }
}
