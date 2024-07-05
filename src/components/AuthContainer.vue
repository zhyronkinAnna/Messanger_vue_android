<script setup lang="ts">
import { NCard } from "naive-ui"  
import { defineProps } from "vue";

interface Props {
  containerName: string;
}

const props = defineProps<Props>();

</script>

<template>
  <NCard :title="props.containerName" class="p-24px max-w-400px">
    <slot></slot>
  </NCard>
</template>

<style scoped>
</style>
