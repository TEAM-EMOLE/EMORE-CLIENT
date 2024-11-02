import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://3.34.102.168:8080', // 서버 URL
        changeOrigin: true,
        secure: false, // HTTPS가 아닌 경우 필요
      },
    },
  },
  plugins: [
    react(),
    checker({
      typescript: {
        tsconfigPath: 'tsconfig.app.json',
      },
    }),
  ],
});