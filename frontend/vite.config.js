// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// // export default defineConfig({
// //   plugins: [react()],
// // })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,  // React 개발 서버 포트
    proxy: {
      '/api': {
        target: 'http://localhost:8002', // API 서버
        changeOrigin: true,
        secure: false
      }
    }
  }
});
