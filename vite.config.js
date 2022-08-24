import { defineConfig } from 'vite'
export default defineConfig({
    optimizeDeps: {
      include: ['linked-dep']
    },
    build: {
      commonjsOptions: {
        include: [/linked-dep/, /node_modules/]
      }
    }
  })
  