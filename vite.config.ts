import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url))
      },
      {
        find: '@components',
        replacement: fileURLToPath(new URL('./src/components', import.meta.url))
      },
      {
        find: '@views',
        replacement: fileURLToPath(new URL('./src/views', import.meta.url))
      },
      {
        find: '@stores',
        replacement: fileURLToPath(new URL('./src/stores', import.meta.url))
      },
      {
        find: '@images',
        replacement: fileURLToPath(new URL('./src/assets/images', import.meta.url))
      }
    ]
  }
});
