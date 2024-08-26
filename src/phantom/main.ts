import { Terminal } from "@xterm/xterm";
import { ClipboardAddon } from "@xterm/addon-clipboard";
import { WebLinksAddon } from "@xterm/addon-web-links";
import { FitAddon } from "@xterm/addon-fit";

import * as KeyCode from "keycode-js";

import getPrompt, { welcomePrompt } from "./prompt";
import { initFs } from "./fs";
import { handleCommand } from "./command";

import chalk from "chalk";

const fitAddon = new FitAddon();
const addons = [fitAddon, new ClipboardAddon(), new WebLinksAddon()];

export class Phantom {
  element: HTMLElement;
  terminal: Terminal;
  command: string;
  prompt: string;
  exitCode: number;

  constructor(element: HTMLElement) {
    this.element = element;
    this.terminal = new Terminal();
    this.command = "";
    this.exitCode = 0;
    this.prompt = getPrompt(this.exitCode);

    this.initialize();
  }

  private async initialize() {
    await initFs();

    addons.forEach((addon) => {
      this.terminal.loadAddon(addon);
    });
    console.debug(`Loaded ${addons.length} addons`);

    this.terminal.options = {
      fontFamily: "JetBrains Mono",
    };
    this.terminal.open(this.element);
    this.terminal.write(welcomePrompt);
    this.terminal.write(this.prompt);

    fitAddon.fit();
    this.terminal.onData(async (data) => {
      const lastKey = data.charCodeAt(data.length - 1);
      if (lastKey === KeyCode.KEY_RETURN) {
        this.exitCode = await handleCommand(this.terminal, this.command.trim());
        this.command = "";
        this.prompt = getPrompt(this.exitCode);

        if (this.exitCode !== 0) {
          this.terminal.write(
            chalk.bold(`process exited with exit code ${this.exitCode}\r\n`)
          );
        }

        this.terminal.write("\r\n" + this.prompt);
      } else if (lastKey === KeyCode.KEY_F16) {
        if (this.prompt.length + this.command.length !== this.prompt.length) {
          this.command = this.command.slice(0, -1);
          this.terminal.write("\x1b[D\x1b[P"); // Moves cursor back one space and deletes the character
        }
      } else {
        this.command += data;
        this.terminal.write(data);
      }
    });
  }
}
