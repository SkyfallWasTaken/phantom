import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import { Terminal } from "@xterm/xterm";
import { ClipboardAddon } from "@xterm/addon-clipboard";
import { WebLinksAddon } from "@xterm/addon-web-links";
import { FitAddon } from "@xterm/addon-fit";

import * as KeyCode from "keycode-js";

const fitAddon = new FitAddon();
const addons = [fitAddon, new ClipboardAddon(), new WebLinksAddon()];

export class Phantom {
  element: HTMLElement;
  terminal: Terminal;
  command: string;

  constructor(element: HTMLElement) {
    this.element = element;
    this.terminal = new Terminal();
    this.command = "";

    addons.forEach((addon) => {
      this.terminal.loadAddon(addon);
    });
    console.debug(`Loaded ${addons.length} addons`);

    this.terminal.open(element);

    fitAddon.fit();
    this.terminal.write("Hello from Phantom! $ ");

    this.terminal.onData((data) => {
      const lastKey = data.charCodeAt(data.length - 1);
      if (lastKey === KeyCode.KEY_RETURN) {
        alert(this.command);
      } else if (lastKey === KeyCode.KEY_F16) {
        this.command = this.command.slice(0, -1);
        this.terminal.write("\x1b[D\x1b[P"); // Moves cursor back one space and deletes the character
      } else {
        this.command += data;
        this.terminal.write(data);
      }
    });
  }
}

createApp(App).mount("#app");
