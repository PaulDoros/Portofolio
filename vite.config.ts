import { vitePlugin as remix } from '@remix-run/dev';
import { vercelPreset } from '@vercel/remix/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    remix({
      ignoredRouteFiles: ['**/.*'],
      serverModuleFormat: 'esm',
    }),
    vercelPreset(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  css: {
    transformer: 'lightningcss',
  },
  optimizeDeps: {
    include: ['tailwindcss'],
  },
  resolve: {
    alias: {
      '~': '/app',
    },
  },
  publicDir: 'public',
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]',
      },
    },
  },
  server: {
    port: 3000,
  },
});
