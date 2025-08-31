import { vitePlugin as remix } from '@remix-run/dev';
import { installGlobals } from '@remix-run/node';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// Install global Node polyfills
installGlobals();

declare module '@remix-run/node' {
  interface Future {
    v3_singleFetch: true;
    v3_fetcherPersist: true;
    v3_relativeSplatPath: true;
    v3_throwAbortReason: true;
    v3_lazyRouteDiscovery: true;
  }
}

export default defineConfig({
  plugins: [
    remix({
      ignoredRouteFiles: ['**/.*'],
      serverModuleFormat: 'esm',
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    tsconfigPaths(),
  ],
  server: {
    port: 3000,
    strictPort: false,
  },
  css: {
    postcss: './postcss.config.cjs',
  },
  resolve: {
    alias: {
      '~': '/app',
    },
  },
  build: {
    // Turn off sourcemaps in production to prevent message channel issues
    sourcemap: false,
    minify: true,
    cssMinify: true,
    rollupOptions: {
      output: {
        format: 'es',
        entryFileNames: '[name]-[hash].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash][extname]',
      },
    },
  },
  optimizeDeps: {
    include: [
      'tailwindcss',
      'simplex-noise',
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
      'tailwindcss-animate',
      '@radix-ui/react-slot',
      '@radix-ui/react-dialog',
      '@radix-ui/react-avatar',
      '@radix-ui/react-hover-card',
      '@radix-ui/react-progress',
      '@radix-ui/react-separator',
      '@radix-ui/react-tabs',
    ],
    exclude: ['@remix-run/node', '@remix-run/react'],
  },
});
