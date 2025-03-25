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
  },
  css: {
    postcss: './postcss.config.cjs',
  },
  resolve: {
    alias: {
      '~': '/app',
    },
    dedupe: [
      '@radix-ui/react-slot',
      '@radix-ui/react-avatar',
      '@radix-ui/react-dialog',
      '@radix-ui/react-hover-card',
      '@radix-ui/react-progress',
      '@radix-ui/react-separator',
      '@radix-ui/react-tabs',
      'react',
      'react-dom',
    ],
  },
  build: {
    sourcemap: process.env.NODE_ENV === 'development',
    rollupOptions: {
      output: {
        sourcemapExcludeSources: true,
      },
      external: [
        '@radix-ui/react-separator',
        /^@radix-ui\/.*/,
        'class-variance-authority',
        'clsx',
        'tailwind-merge',
        'tailwindcss-animate',
      ],
    },
  },
  optimizeDeps: {
    include: [
      '@radix-ui/react-slot',
      '@radix-ui/react-avatar',
      '@radix-ui/react-dialog',
      '@radix-ui/react-hover-card',
      '@radix-ui/react-progress',
      '@radix-ui/react-separator',
      '@radix-ui/react-tabs',
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
      'tailwindcss-animate',
    ],
  },
});
