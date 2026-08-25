import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/*
    O build existe só para compilar o efeito da hero (React + Three.js)
   num único módulo em assets/efeito/. */


export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'assets/efeito',
    emptyOutDir: true,
    rollupOptions: {
      input: 'src/efeito/main.jsx',
      output: {
        entryFileNames: 'hero-efeito.js',
        chunkFileNames: 'hero-efeito-[name].js',
        assetFileNames: 'hero-efeito.[ext]'
      }
    }
  }
});
