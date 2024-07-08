<script setup lang="ts">
import "@xterm/xterm/css/xterm.css";
import "./style.css";

import { Terminal } from "@xterm/xterm";
import { onMounted, ref } from "vue";

const terminalElement = ref<HTMLElement>();

onMounted(() => {
  const term = new Terminal();
  term.open(terminalElement.value!);
  term.write("Hello from Phantom! $ ");
});
</script>

<template>
  <div>
    <div ref="terminalElement" />
  </div>
</template>
