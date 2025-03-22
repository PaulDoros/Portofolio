import { vitePlugin as remix } from '@remix-run/dev';
import { vercelPreset } from '@vercel/remix/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    remix({
      ignoredRouteFiles: ['**/.*'],
      serverModuleFormat: 'esm',
    }),
    tsconfigPaths(),
    vercelPreset(),
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
});
