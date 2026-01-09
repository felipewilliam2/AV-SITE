import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // Carregar variáveis de ambiente do arquivo .env e do sistema
    // O segundo parâmetro '.' significa o diretório atual (raiz do projeto)
    const env = loadEnv(mode, '.', '');
    
    // Base path: '/' para Netlify/Vercel, ou '/repo-name/' para GitHub Pages
    // Para GitHub Pages, defina a variável de ambiente VITE_BASE_PATH
    const base = env.VITE_BASE_PATH || '/';
    
    // Logs de debug (apenas em desenvolvimento)
    if (mode === 'development') {
      console.log(`🔧 Building with base path: ${base}`);
      console.log(`🔧 Mode: ${mode}`);
    }
    
    return {
      base,
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        minify: 'esbuild',
        rollupOptions: {
          output: {
            manualChunks: {
              'react-vendor': ['react', 'react-dom', 'react-router-dom'],
              'ai-vendor': ['@google/genai'],
            }
          }
        },
        chunkSizeWarningLimit: 1000,
      },
      preview: {
        port: 4173,
        host: true,
      }
    };
});
