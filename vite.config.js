import { defineConfig } from 'vite';

export default defineConfig({
  // other config...
  preview: {
    host: true,
    port: 5173,
    allowedHosts: ['tagora.online'],
    preview.allowedHosts: ['tagora.online'],
  },
});
