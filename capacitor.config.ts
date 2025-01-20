import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'vue.vite.app',
  appName: 'Talkify',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'http',
  },
};

export default config;
