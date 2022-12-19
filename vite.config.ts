import { devPlugin } from './plugins/devplugin';
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
import MusicApi from './env.musicapi.development';
export default defineConfig({
  plugins: [vue(), vueJsx(), devPlugin()],
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // 引入预处理公共样式
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "./src/assets/base.less";`,
      },
    },
  },
  define: {
    VITE_MUSIC_API: { MusicApi },
  },
});
