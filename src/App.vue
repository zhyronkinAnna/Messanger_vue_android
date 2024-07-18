<script setup lang="ts">
import { NConfigProvider, NGlobalStyle, NNotificationProvider, NThemeEditor, NText, NSpin, NFlex } from 'naive-ui';
import { themeOverrides } from '../src/theme/theme';
import { useRouter } from 'vue-router';
import { onMounted, onUnmounted } from 'vue';
import { useStore } from './stores/store';
import { useWsService, initializeWebSocketService } from './services/wsServiceManager';

const router = useRouter();
const store = useStore();
const wsService = useWsService();
// initializeWebSocketService(store);

onMounted(() => {
  console.log(`Current route: ${router.currentRoute.value.fullPath}`);
});

onUnmounted(() => {
  wsService?.close();
});

</script>

<template>
  <NThemeEditor>
    <NConfigProvider :theme-overrides="themeOverrides">
      <NGlobalStyle />
      <NNotificationProvider>
        <router-view />
        <NFlex v-if="!store.isConected" style="position: absolute; bottom: 20px; z-index: 1000; left: 20px; padding: 10px">
          <NSpin size="Tiny"/>
          <NText strong>Connecting to the server</NText>
        </NFlex>
      </NNotificationProvider>
    </NConfigProvider>
  </NThemeEditor>
</template>

<style>

</style>
