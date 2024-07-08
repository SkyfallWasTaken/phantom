<script setup lang="ts">
import "@xterm/xterm/css/xterm.css";
import "./style.css";
import { onMounted, ref } from "vue";

import { Terminal } from "@xterm/xterm";
import { ClipboardAddon } from "@xterm/addon-clipboard";
import { WebLinksAddon } from "@xterm/addon-web-links";
import { FitAddon } from "@xterm/addon-fit";

import * as KeyCode from "keycode-js";

const terminalElement = ref<HTMLElement>();

onMounted(() => {
  const term = new Terminal();
  const fitAddon = new FitAddon();
  const addons = [fitAddon, new ClipboardAddon(), new WebLinksAddon()];
  addons.forEach((addon) => {
    term.loadAddon(addon);
  });
  console.debug(`Loaded ${addons.length} addons`);

  term.open(terminalElement.value!);

  fitAddon.fit();
  term.write("Hello from Phantom! $ ");

  term.onData((data) => {
    if (data.charCodeAt(data.length - 1) === KeyCode.KEY_RETURN) {
      alert("Enter");
    } else {
      term.write(data);
    }
  });
});
</script>

<template>
  <div>
    <div ref="terminalElement" />
  </div>
</template>
