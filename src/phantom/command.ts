import mri from "mri";

import echo from "./commands/echo.ts";
import help from "./commands/help.ts";
import { type Terminal } from "@xterm/xterm";

export const commands = [echo, help];

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
  run: (terminal: Terminal, args: CommandArgs) => Promise<void>;
};

export async function handleCommand(
  terminal: Terminal,
  unparsedCommand: string
) {
  const parts = unparsedCommand.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
  const command = mri(parts);

  // Find command to run
  const commandToRun = commands.find((c) => c.meta.name === command._[0]);
  if (!commandToRun) {
    console.error(`Command not found: ${command._[0]}`);
    return;
  }
  await commandToRun.run(terminal, command);
}
