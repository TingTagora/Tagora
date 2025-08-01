import { defineConfig } from 'vite';

export default defineConfig({
  preview: {
    host: true,
    port: 5173,
    allowedHosts: ['tagora.online'], 
  },
});