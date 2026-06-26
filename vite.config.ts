import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@modules': path.resolve(__dirname, './src/modules'),
      '@services': path.resolve(__dirname, './src/common/services'),
      '@components': path.resolve(__dirname, './src/common/components'),
      '@schemas': path.resolve(__dirname, './src/common/schemas'),
    },
  },
})
