import { defineConfig } from 'vite';

export default defineConfig({
  base: '/emojiurl.github.io/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        encode: 'encode.html',
      },
    },
  },
});