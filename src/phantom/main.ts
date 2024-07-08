import { Terminal } from "@xterm/xterm";
import { ClipboardAddon } from "@xterm/addon-clipboard";
import { WebLinksAddon } from "@xterm/addon-web-links";
import { FitAddon } from "@xterm/addon-fit";

import * as KeyCode from "keycode-js";

import getPrompt from "./prompt";
import { handleCommand } from "./command";

const fitAddon = new FitAddon();
const addons = [fitAddon, new ClipboardAddon(), new WebLinksAddon()];

export class Phantom {
  element: HTMLElement;
  terminal: Terminal;
  command: string;
  prompt: string;

  constructor(element: HTMLElement) {
    this.element = element;
    this.terminal = new Terminal();
    this.command = "";
    this.prompt = getPrompt();

    addons.forEach((addon) => {
      this.terminal.loadAddon(addon);
    });
    console.debug(`Loaded ${addons.length} addons`);

    this.terminal.open(element);
    this.terminal.write(this.prompt);

    fitAddon.fit();
    this.terminal.onData((data) => {
      const lastKey = data.charCodeAt(data.length - 1);
      if (lastKey === KeyCode.KEY_RETURN) {
        handleCommand(this.terminal, this.command.trim());
        this.command = "";
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
