import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000, // Cổng bạn sử dụng (tuỳ chỉnh nếu cần)
  },
  build: {
    outDir: 'dist', // Thư mục build (mặc định là 'dist')
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  preview: {
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  },
})
