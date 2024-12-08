import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias per accedere facilmente alla cartella src
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'], // Escludi lucide-react dall'ottimizzazione
  },
  build: {
    outDir: 'dist', // Directory di output per la build
    sourcemap: false, // Disabilita le mappe dei sorgenti per ridurre la dimensione del build finale (modifica in base alle necessità)
    assetsInlineLimit: 4096, // Inline assets fino a 4 KB (opzionale)
  },
  server: {
    host: '0.0.0.0', // Consenti l'accesso da altri dispositivi nella rete
    port: 3000, // Porta del server di sviluppo
    open: true, // Apri automaticamente il browser all'avvio
    strictPort: true, // Solleva un errore se la porta è già in uso
  },
  base: '/', // Percorso base per il progetto, importante per il deploy su server con SPA
});
