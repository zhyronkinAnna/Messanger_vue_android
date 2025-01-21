<script setup lang="ts">
import { NCard } from "naive-ui";
import { defineProps } from "vue";

// Define the properties that the component accepts
interface Props {
  containerName: string;
}

// Use defineProps to define the props for the component
const props = defineProps<Props>();

</script>

<template>
  <!-- Use the NCard component from naive-ui and bind the title to the containerName prop -->
  <NCard :title="props.containerName" class="p-24px max-w-400px">
    <!-- Render any content passed to the component inside the slot -->
    <slot></slot>
  </NCard>
</template>