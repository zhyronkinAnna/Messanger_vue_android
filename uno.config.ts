import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno()
],
  preflights: [
    {
      getCSS: () => `
        html, body {
          margin: 0;
          padding: 0;
          overflow: hidden; 
          height: 100%;   
          width: 100%;  
        }
      `,
    },
],
})