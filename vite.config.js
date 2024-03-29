import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    // 为了提高打包速度，我们可以使用 optimizeDeps 配置项来指定抽离的公共依赖
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue'],
          'markdown-it': ['markdown-it'],
          'element-plus': ['element-plus']
        }
      }
    }
  },
  optimizeDeps: {
    entries: [
      // 指定抽离的公共依赖
      'vue',
      'markdown-it',
      'element-plus'
    ]
  }
})
