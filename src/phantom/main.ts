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
  history: string[];
  historyCursor: number;

  constructor(element: HTMLElement) {
    this.element = element;
    this.terminal = new Terminal();
    this.command = "";
    this.exitCode = 0;
    this.prompt = getPrompt(this.exitCode);
    this.history = [];
    this.historyCursor = 0;

    this.initialize();
  }

  private async initialize() {
    await initFs();

    addons.forEach((addon) => {
      this.terminal.loadAddon(addon);
    });
    console.debug(`Loaded ${addons.length} addons`);

    this.terminal.options = {
      fontFamily: "JetBrains Mono, monospace",
    };
    this.terminal.open(this.element);
    this.terminal.write(welcomePrompt);
    this.terminal.write(this.prompt);

    fitAddon.fit();
    this.terminal.onData(async (data) => {
      const lastKey = data.charCodeAt(data.length - 1);
      if (lastKey === KeyCode.KEY_RETURN) {
        this.exitCode = await handleCommand(this.terminal, this.command.trim());
        this.history.push(this.command.trim());
        this.historyCursor = this.history.length;
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
      } else if (lastKey === 65 && data === "\x1b[A") {
        // Up arrow
        if (this.historyCursor > 0) {
          this.historyCursor--;
          this.command = this.history[this.historyCursor];

          this.writeHistoryUpdate();
        }
      } else if (lastKey === 66 && data === "\x1b[B") {
        // Down arrow
        if (this.historyCursor < this.history.length - 1) {
          this.historyCursor++;
          this.command = this.history[this.historyCursor];

          this.writeHistoryUpdate();
        } else {
          // Reset to an empty command if cursor is at the end
          this.historyCursor = this.history.length;
          this.command = "";

          this.writeHistoryUpdate();
        }
      } else {
        this.command += data;
        this.terminal.write(data);
      }
    });
  }

  private writeHistoryUpdate() {
    this.terminal.write("\r\x1b[K");
    this.terminal.write(this.prompt + this.command);
  }
}
