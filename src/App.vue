<script setup lang="ts">
import { NConfigProvider, NGlobalStyle, NNotificationProvider, NThemeEditor } from 'naive-ui';
import { themeOverrides } from '../src/theme/theme';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const router = useRouter();

onMounted(() => {
  console.log(`Current route: ${router.currentRoute.value.fullPath}`);
});
</script>

<template>
  <NThemeEditor>
    <NConfigProvider :theme-overrides="themeOverrides">
      <NGlobalStyle />
      <n-notification-provider>
        <router-view />
      </n-notification-provider>
    </NConfigProvider>
  </NThemeEditor>
</template>

<style>

</style>
