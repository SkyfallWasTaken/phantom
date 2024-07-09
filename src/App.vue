<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Phantom } from "./phantom/main";

const terminalElement = ref<HTMLElement>();
onMounted(() => {
  new Phantom(terminalElement.value!);
});
</script>

<template>
  <div>
    <div ref="terminalElement" />
  </div>
</template>
