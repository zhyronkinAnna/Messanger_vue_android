<script setup lang="ts">
import { NConfigProvider, NGlobalStyle, NNotificationProvider, NThemeEditor, NText, NSpin, NFlex, NMessageProvider } from 'naive-ui';
import { themeOverrides } from '../src/theme/theme';
import { useRouter } from 'vue-router';
import { onMounted, onUnmounted } from 'vue';
import { useStore } from './stores/store';
import { useWsService, initializeWebSocketService } from './services/wsServiceManager';
import Loader from './components/Loader.vue'

const router = useRouter();
const store = useStore();
const wsService = useWsService();


onMounted(() => {
  store.router = router;
  initializeWebSocketService(store);
});

onUnmounted(() => {
  wsService?.close();
});

</script>

<template>
  <!-- <NThemeEditor> -->
    <NConfigProvider :theme-overrides="themeOverrides">
      <NGlobalStyle />
      <NMessageProvider>
        <NNotificationProvider>
          <router-view />
          <Loader v-if="store.loading"/>
          <NFlex v-if="!store.isConnected" style="position: absolute; bottom: 20px; z-index: 1000; left: 20px; padding: 10px">
            <NSpin size="small"/>
            <NText strong>Connecting to the server</NText>
          </NFlex>
        </NNotificationProvider>
      </NMessageProvider>
    </NConfigProvider>
  <!-- </NThemeEditor> -->
</template>

<style>
</style>
