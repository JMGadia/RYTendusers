import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: { // 👈 You KEEP this section for your path aliases
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  optimizeDeps: { // 👈 You ADD this new section to fix the error
    exclude: ['@aws-amplify/ui-vue'],
  },
})