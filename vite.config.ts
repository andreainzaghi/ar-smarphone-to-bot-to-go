import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Imposta l'alias per "@" su "./src"
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'], // Escludi dipendenze non necessarie dall'ottimizzazione
  },
  build: {
    outDir: 'dist', // Directory di output per la build
    sourcemap: true, // Opzione utile per il debug
  },
  server: {
    host: true, // Permette l'accesso da altri dispositivi sulla rete
    port: 3000, // Porta del server di sviluppo
    open: true, // Apre automaticamente il browser
  },
  base: '/', // Imposta il base path per il deploy
});
