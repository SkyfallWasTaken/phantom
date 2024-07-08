<script setup lang="ts">
import "@xterm/xterm/css/xterm.css";
import { onMounted, ref } from "vue";
import { runPhantom } from "./main";

const terminalElement = ref<HTMLElement>();

onMounted(() => {
  runPhantom(terminalElement.value!);
});
</script>

<template>
  <div>
    <div ref="terminalElement" />
  </div>
</template>
