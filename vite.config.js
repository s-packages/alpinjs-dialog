import { defineConfig } from "vite";
import copy from 'rollup-plugin-copy';
export default defineConfig({
  plugins: [
    copy({
      targets: [{ src: "./dialog.scss", dest: "dist" }],
    }),
  ],
  optimizeDeps: {
    include: ["linked-dep"],
  },
  build: {
    commonjsOptions: {
      include: [/linked-dep/, /node_modules/],
    },
  },
});
