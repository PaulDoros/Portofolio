import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import { vercelPreset } from '@vercel/remix/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    remix({
      ignoredRouteFiles: ['**/.*'],
      serverModuleFormat: 'esm',
      presets: [vercelPreset()],
    }),
    tsconfigPaths(),
  ],
  css: {
    transformer: 'lightningcss',
  },
  optimizeDeps: {
    include: ['tailwindcss', 'react', 'react-dom', 'framer-motion'],
  },
  resolve: {
    alias: {
      '~': '/app',
    },
  },
  build: {
    rollupOptions: {
      // Make sure to bundle React at build time
      external: [],
    },
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
});
