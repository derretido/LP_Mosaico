import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


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
