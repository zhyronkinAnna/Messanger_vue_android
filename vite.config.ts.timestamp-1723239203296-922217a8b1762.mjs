// vite.config.ts
import fs from "node:fs";
import { defineConfig } from "file:///C:/Users/Comp/source/repos/NewMessanger/Front/electron-vite-vue/node_modules/.pnpm/vite@5.3.1_@types+node@20.14.6/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/Comp/source/repos/NewMessanger/Front/electron-vite-vue/node_modules/.pnpm/@vitejs+plugin-vue@5.0.5_vite@5.3.1_@types+node@20.14.6__vue@3.4.29_typescript@5.5.2_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import electron from "file:///C:/Users/Comp/source/repos/NewMessanger/Front/electron-vite-vue/node_modules/.pnpm/vite-plugin-electron@0.28.7_vite-plugin-electron-renderer@0.14.5/node_modules/vite-plugin-electron/dist/simple.mjs";

// package.json
var package_default = {
  name: "electron-vue-vite",
  version: "28.1.0",
  main: "dist-electron/main/index.js",
  description: "Really simple Electron + Vue + Vite boilerplate.",
  author: "\u8349\u978B\u6CA1\u53F7 <308487730@qq.com>",
  license: "MIT",
  private: true,
  keywords: [
    "electron",
    "rollup",
    "vite",
    "vue3",
    "vue"
  ],
  debug: {
    env: {
      VITE_DEV_SERVER_URL: "http://127.0.0.1:3344/"
    }
  },
  type: "module",
  scripts: {
    dev: "vite",
    build: "vue-tsc --noEmit && vite build && electron-builder",
    preview: "vite preview"
  },
  devDependencies: {
    "@types/crypto-js": "^4.2.2",
    "@vitejs/plugin-vue": "^5.0.4",
    electron: "^29.1.1",
    "electron-builder": "^24.13.3",
    typescript: "^5.4.2",
    unocss: "^0.60.4",
    vite: "^5.1.5",
    "vite-plugin-electron": "^0.28.4",
    "vite-plugin-electron-renderer": "^0.14.5",
    "vite-svg-loader": "^5.1.0",
    vue: "^3.4.21",
    "vue-tsc": "^2.0.6"
  },
  dependencies: {
    "@heroicons/vue": "^2.1.5",
    "crypto-js": "^4.2.0",
    glob: "7.2.3 inflight@1.0.6",
    "naive-ui": "^2.38.2",
    pinia: "^2.1.7",
    "vue-router": "^4.3.3",
    ws: "^8.18.0"
  }
};

// vite.config.ts
import UnoCSS from "file:///C:/Users/Comp/source/repos/NewMessanger/Front/electron-vite-vue/node_modules/.pnpm/unocss@0.60.4_postcss@8.4.38_rollup@4.18.0_vite@5.3.1_@types+node@20.14.6_/node_modules/unocss/dist/vite.mjs";
import svgLoader from "file:///C:/Users/Comp/source/repos/NewMessanger/Front/electron-vite-vue/node_modules/.pnpm/vite-svg-loader@5.1.0_vue@3.4.29_typescript@5.5.2_/node_modules/vite-svg-loader/index.js";
var vite_config_default = defineConfig(({ command }) => {
  fs.rmSync("dist-electron", { recursive: true, force: true });
  const isServe = command === "serve";
  const isBuild = command === "build";
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG;
  return {
    plugins: [
      vue(),
      UnoCSS(),
      svgLoader(),
      electron({
        main: {
          entry: "electron/main/index.ts",
          onstart({ startup }) {
            if (process.env.VSCODE_DEBUG) {
              console.log("[startup] Electron App");
            } else {
              startup();
            }
          },
          vite: {
            build: {
              sourcemap,
              minify: isBuild,
              outDir: "dist-electron/main",
              rollupOptions: {
                external: Object.keys(package_default.dependencies || {})
              }
            }
          }
        },
        preload: {
          input: "electron/preload/index.ts",
          vite: {
            build: {
              sourcemap: sourcemap ? "inline" : void 0,
              minify: isBuild,
              outDir: "dist-electron/preload",
              rollupOptions: {
                external: Object.keys(package_default.dependencies || {})
              }
            }
          }
        },
        renderer: {}
      })
    ],
    server: process.env.VSCODE_DEBUG && (() => {
      const url = new URL(package_default.debug.env.VITE_DEV_SERVER_URL);
      return {
        host: url.hostname,
        port: +url.port
      };
    })(),
    clearScreen: false,
    resolve: {
      alias: {
        "@": "/src"
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcQ29tcFxcXFxzb3VyY2VcXFxccmVwb3NcXFxcTmV3TWVzc2FuZ2VyXFxcXEZyb250XFxcXGVsZWN0cm9uLXZpdGUtdnVlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxDb21wXFxcXHNvdXJjZVxcXFxyZXBvc1xcXFxOZXdNZXNzYW5nZXJcXFxcRnJvbnRcXFxcZWxlY3Ryb24tdml0ZS12dWVcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0NvbXAvc291cmNlL3JlcG9zL05ld01lc3Nhbmdlci9Gcm9udC9lbGVjdHJvbi12aXRlLXZ1ZS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCBmcyBmcm9tICdub2RlOmZzJztcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcclxuaW1wb3J0IGVsZWN0cm9uIGZyb20gJ3ZpdGUtcGx1Z2luLWVsZWN0cm9uL3NpbXBsZSc7XHJcbmltcG9ydCBwa2cgZnJvbSAnLi9wYWNrYWdlLmpzb24nO1xyXG5pbXBvcnQgVW5vQ1NTIGZyb20gJ3Vub2Nzcy92aXRlJztcclxuaW1wb3J0IHN2Z0xvYWRlciBmcm9tICd2aXRlLXN2Zy1sb2FkZXInO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQgfSkgPT4ge1xyXG4gIGZzLnJtU3luYygnZGlzdC1lbGVjdHJvbicsIHsgcmVjdXJzaXZlOiB0cnVlLCBmb3JjZTogdHJ1ZSB9KTtcclxuXHJcbiAgY29uc3QgaXNTZXJ2ZSA9IGNvbW1hbmQgPT09ICdzZXJ2ZSc7XHJcbiAgY29uc3QgaXNCdWlsZCA9IGNvbW1hbmQgPT09ICdidWlsZCc7XHJcbiAgY29uc3Qgc291cmNlbWFwID0gaXNTZXJ2ZSB8fCAhIXByb2Nlc3MuZW52LlZTQ09ERV9ERUJVRztcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgdnVlKCksXHJcbiAgICAgIFVub0NTUygpLFxyXG4gICAgICBzdmdMb2FkZXIoKSxcclxuICAgICAgZWxlY3Ryb24oe1xyXG4gICAgICAgIG1haW46IHtcclxuICAgICAgICAgIGVudHJ5OiAnZWxlY3Ryb24vbWFpbi9pbmRleC50cycsXHJcbiAgICAgICAgICBvbnN0YXJ0KHsgc3RhcnR1cCB9KSB7XHJcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5WU0NPREVfREVCVUcpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnW3N0YXJ0dXBdIEVsZWN0cm9uIEFwcCcpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHN0YXJ0dXAoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHZpdGU6IHtcclxuICAgICAgICAgICAgYnVpbGQ6IHtcclxuICAgICAgICAgICAgICBzb3VyY2VtYXAsXHJcbiAgICAgICAgICAgICAgbWluaWZ5OiBpc0J1aWxkLFxyXG4gICAgICAgICAgICAgIG91dERpcjogJ2Rpc3QtZWxlY3Ryb24vbWFpbicsXHJcbiAgICAgICAgICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgZXh0ZXJuYWw6IE9iamVjdC5rZXlzKHBrZy5kZXBlbmRlbmNpZXMgfHwge30pLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcHJlbG9hZDoge1xyXG4gICAgICAgICAgaW5wdXQ6ICdlbGVjdHJvbi9wcmVsb2FkL2luZGV4LnRzJyxcclxuICAgICAgICAgIHZpdGU6IHtcclxuICAgICAgICAgICAgYnVpbGQ6IHtcclxuICAgICAgICAgICAgICBzb3VyY2VtYXA6IHNvdXJjZW1hcCA/ICdpbmxpbmUnIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgIG1pbmlmeTogaXNCdWlsZCxcclxuICAgICAgICAgICAgICBvdXREaXI6ICdkaXN0LWVsZWN0cm9uL3ByZWxvYWQnLFxyXG4gICAgICAgICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIGV4dGVybmFsOiBPYmplY3Qua2V5cyhwa2cuZGVwZW5kZW5jaWVzIHx8IHt9KSxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbmRlcmVyOiB7fSxcclxuICAgICAgfSksXHJcbiAgICBdLFxyXG4gICAgc2VydmVyOiBwcm9jZXNzLmVudi5WU0NPREVfREVCVUcgJiYgKCgpID0+IHtcclxuICAgICAgY29uc3QgdXJsID0gbmV3IFVSTChwa2cuZGVidWcuZW52LlZJVEVfREVWX1NFUlZFUl9VUkwpO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGhvc3Q6IHVybC5ob3N0bmFtZSxcclxuICAgICAgICBwb3J0OiArdXJsLnBvcnQsXHJcbiAgICAgIH07XHJcbiAgICB9KSgpLFxyXG4gICAgY2xlYXJTY3JlZW46IGZhbHNlLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgICdAJzogJy9zcmMnLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9O1xyXG59KTtcclxuIiwgIntcbiAgXCJuYW1lXCI6IFwiZWxlY3Ryb24tdnVlLXZpdGVcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMjguMS4wXCIsXG4gIFwibWFpblwiOiBcImRpc3QtZWxlY3Ryb24vbWFpbi9pbmRleC5qc1wiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiUmVhbGx5IHNpbXBsZSBFbGVjdHJvbiArIFZ1ZSArIFZpdGUgYm9pbGVycGxhdGUuXCIsXG4gIFwiYXV0aG9yXCI6IFwiXHU4MzQ5XHU5NzhCXHU2Q0ExXHU1M0Y3IDwzMDg0ODc3MzBAcXEuY29tPlwiLFxuICBcImxpY2Vuc2VcIjogXCJNSVRcIixcbiAgXCJwcml2YXRlXCI6IHRydWUsXG4gIFwia2V5d29yZHNcIjogW1xuICAgIFwiZWxlY3Ryb25cIixcbiAgICBcInJvbGx1cFwiLFxuICAgIFwidml0ZVwiLFxuICAgIFwidnVlM1wiLFxuICAgIFwidnVlXCJcbiAgXSxcbiAgXCJkZWJ1Z1wiOiB7XG4gICAgXCJlbnZcIjoge1xuICAgICAgXCJWSVRFX0RFVl9TRVJWRVJfVVJMXCI6IFwiaHR0cDovLzEyNy4wLjAuMTozMzQ0L1wiXG4gICAgfVxuICB9LFxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImRldlwiOiBcInZpdGVcIixcbiAgICBcImJ1aWxkXCI6IFwidnVlLXRzYyAtLW5vRW1pdCAmJiB2aXRlIGJ1aWxkICYmIGVsZWN0cm9uLWJ1aWxkZXJcIixcbiAgICBcInByZXZpZXdcIjogXCJ2aXRlIHByZXZpZXdcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAdHlwZXMvY3J5cHRvLWpzXCI6IFwiXjQuMi4yXCIsXG4gICAgXCJAdml0ZWpzL3BsdWdpbi12dWVcIjogXCJeNS4wLjRcIixcbiAgICBcImVsZWN0cm9uXCI6IFwiXjI5LjEuMVwiLFxuICAgIFwiZWxlY3Ryb24tYnVpbGRlclwiOiBcIl4yNC4xMy4zXCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuNC4yXCIsXG4gICAgXCJ1bm9jc3NcIjogXCJeMC42MC40XCIsXG4gICAgXCJ2aXRlXCI6IFwiXjUuMS41XCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1lbGVjdHJvblwiOiBcIl4wLjI4LjRcIixcbiAgICBcInZpdGUtcGx1Z2luLWVsZWN0cm9uLXJlbmRlcmVyXCI6IFwiXjAuMTQuNVwiLFxuICAgIFwidml0ZS1zdmctbG9hZGVyXCI6IFwiXjUuMS4wXCIsXG4gICAgXCJ2dWVcIjogXCJeMy40LjIxXCIsXG4gICAgXCJ2dWUtdHNjXCI6IFwiXjIuMC42XCJcbiAgfSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGhlcm9pY29ucy92dWVcIjogXCJeMi4xLjVcIixcbiAgICBcImNyeXB0by1qc1wiOiBcIl40LjIuMFwiLFxuICAgIFwiZ2xvYlwiOiBcIjcuMi4zIGluZmxpZ2h0QDEuMC42XCIsXG4gICAgXCJuYWl2ZS11aVwiOiBcIl4yLjM4LjJcIixcbiAgICBcInBpbmlhXCI6IFwiXjIuMS43XCIsXG4gICAgXCJ2dWUtcm91dGVyXCI6IFwiXjQuMy4zXCIsXG4gICAgXCJ3c1wiOiBcIl44LjE4LjBcIlxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQStYLE9BQU8sUUFBUTtBQUM5WSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxjQUFjOzs7QUNIckI7QUFBQSxFQUNFLE1BQVE7QUFBQSxFQUNSLFNBQVc7QUFBQSxFQUNYLE1BQVE7QUFBQSxFQUNSLGFBQWU7QUFBQSxFQUNmLFFBQVU7QUFBQSxFQUNWLFNBQVc7QUFBQSxFQUNYLFNBQVc7QUFBQSxFQUNYLFVBQVk7QUFBQSxJQUNWO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQVM7QUFBQSxJQUNQLEtBQU87QUFBQSxNQUNMLHFCQUF1QjtBQUFBLElBQ3pCO0FBQUEsRUFDRjtBQUFBLEVBQ0EsTUFBUTtBQUFBLEVBQ1IsU0FBVztBQUFBLElBQ1QsS0FBTztBQUFBLElBQ1AsT0FBUztBQUFBLElBQ1QsU0FBVztBQUFBLEVBQ2I7QUFBQSxFQUNBLGlCQUFtQjtBQUFBLElBQ2pCLG9CQUFvQjtBQUFBLElBQ3BCLHNCQUFzQjtBQUFBLElBQ3RCLFVBQVk7QUFBQSxJQUNaLG9CQUFvQjtBQUFBLElBQ3BCLFlBQWM7QUFBQSxJQUNkLFFBQVU7QUFBQSxJQUNWLE1BQVE7QUFBQSxJQUNSLHdCQUF3QjtBQUFBLElBQ3hCLGlDQUFpQztBQUFBLElBQ2pDLG1CQUFtQjtBQUFBLElBQ25CLEtBQU87QUFBQSxJQUNQLFdBQVc7QUFBQSxFQUNiO0FBQUEsRUFDQSxjQUFnQjtBQUFBLElBQ2Qsa0JBQWtCO0FBQUEsSUFDbEIsYUFBYTtBQUFBLElBQ2IsTUFBUTtBQUFBLElBQ1IsWUFBWTtBQUFBLElBQ1osT0FBUztBQUFBLElBQ1QsY0FBYztBQUFBLElBQ2QsSUFBTTtBQUFBLEVBQ1I7QUFDRjs7O0FENUNBLE9BQU8sWUFBWTtBQUNuQixPQUFPLGVBQWU7QUFFdEIsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxRQUFRLE1BQU07QUFDM0MsS0FBRyxPQUFPLGlCQUFpQixFQUFFLFdBQVcsTUFBTSxPQUFPLEtBQUssQ0FBQztBQUUzRCxRQUFNLFVBQVUsWUFBWTtBQUM1QixRQUFNLFVBQVUsWUFBWTtBQUM1QixRQUFNLFlBQVksV0FBVyxDQUFDLENBQUMsUUFBUSxJQUFJO0FBRTNDLFNBQU87QUFBQSxJQUNMLFNBQVM7QUFBQSxNQUNQLElBQUk7QUFBQSxNQUNKLE9BQU87QUFBQSxNQUNQLFVBQVU7QUFBQSxNQUNWLFNBQVM7QUFBQSxRQUNQLE1BQU07QUFBQSxVQUNKLE9BQU87QUFBQSxVQUNQLFFBQVEsRUFBRSxRQUFRLEdBQUc7QUFDbkIsZ0JBQUksUUFBUSxJQUFJLGNBQWM7QUFDNUIsc0JBQVEsSUFBSSx3QkFBd0I7QUFBQSxZQUN0QyxPQUFPO0FBQ0wsc0JBQVE7QUFBQSxZQUNWO0FBQUEsVUFDRjtBQUFBLFVBQ0EsTUFBTTtBQUFBLFlBQ0osT0FBTztBQUFBLGNBQ0w7QUFBQSxjQUNBLFFBQVE7QUFBQSxjQUNSLFFBQVE7QUFBQSxjQUNSLGVBQWU7QUFBQSxnQkFDYixVQUFVLE9BQU8sS0FBSyxnQkFBSSxnQkFBZ0IsQ0FBQyxDQUFDO0FBQUEsY0FDOUM7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLFNBQVM7QUFBQSxVQUNQLE9BQU87QUFBQSxVQUNQLE1BQU07QUFBQSxZQUNKLE9BQU87QUFBQSxjQUNMLFdBQVcsWUFBWSxXQUFXO0FBQUEsY0FDbEMsUUFBUTtBQUFBLGNBQ1IsUUFBUTtBQUFBLGNBQ1IsZUFBZTtBQUFBLGdCQUNiLFVBQVUsT0FBTyxLQUFLLGdCQUFJLGdCQUFnQixDQUFDLENBQUM7QUFBQSxjQUM5QztBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0EsVUFBVSxDQUFDO0FBQUEsTUFDYixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsUUFBUSxRQUFRLElBQUksaUJBQWlCLE1BQU07QUFDekMsWUFBTSxNQUFNLElBQUksSUFBSSxnQkFBSSxNQUFNLElBQUksbUJBQW1CO0FBQ3JELGFBQU87QUFBQSxRQUNMLE1BQU0sSUFBSTtBQUFBLFFBQ1YsTUFBTSxDQUFDLElBQUk7QUFBQSxNQUNiO0FBQUEsSUFDRixHQUFHO0FBQUEsSUFDSCxhQUFhO0FBQUEsSUFDYixTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLO0FBQUEsTUFDUDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
