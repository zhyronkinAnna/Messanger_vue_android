import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';
import svgLoader from 'vite-svg-loader';

export default defineConfig(({ command }) => {
  const isServe = command === 'serve';
  const isBuild = command === 'build';
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG;

  return {
    plugins: [
      vue(),
      UnoCSS(),
      svgLoader(),
    ],
    server: {
      host: true, // Доступ к серверу с других устройств в сети
      port: 3000, // Измените порт при необходимости
      open: true, // Автоматическое открытие браузера при старте сервера
      https: undefined,
    },
    clearScreen: false,
    resolve: {
      alias: {
        '@': '/src', // Проверьте корректность пути
      },
    },
    build: {
      outDir: 'dist', // Директория для сборки
      rollupOptions: {
        input: 'index.html', // Указание основного HTML-файла
      },
      sourcemap: sourcemap, // Включение source maps во время разработки или отладки в VSCode
      base: './', // Это важно для корректного работы в Capacitor — все пути должны быть относительными
    },
  };
});
