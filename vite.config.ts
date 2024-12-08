import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      external: ['lucide-react'], // Avoid including lucide-react in the bundle
    },
  },
  esbuild: {
    jsxInject: `import React from 'react'`, // Ensures React is injected for JSX
  },
});
