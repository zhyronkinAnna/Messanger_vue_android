<script setup lang="ts">
import { NFlex } from "naive-ui";
import { defineProps } from "vue";
import AuthContainer from "../components/AuthContainer.vue";

interface Props {
  containerName: string;
}

const props = defineProps<Props>();

</script>

<template>
  <NFlex vertical align="center" justify="center" class="w-screen h-screen">
    <AuthContainer :container-name="props.containerName">
      <slot></slot>
    </AuthContainer>
  </NFlex>
</template>

<style scoped>
</style>
