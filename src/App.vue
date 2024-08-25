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
    <div
      ref="terminalElement"
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%"
    />
  </div>
</template>
