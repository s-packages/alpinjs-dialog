import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'index.js',
      name: 'alpinjs-dialog',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['alpinejs', 'gsap'],
      output: {
        globals: {
          alpinejs: 'Alpine',
          gsap: 'gsap'
        }
      }
    }
  },
  server: {
    port: 5173
  }
});
