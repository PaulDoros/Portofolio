/** @type {import('@remix-run/dev').AppConfig} */
export default {
  serverBuildTarget: 'vercel',
  server: process.env.NODE_ENV === 'development' ? undefined : './server.js',
  cacheDirectory: './node_modules/.cache/remix',
  ignoredRouteFiles: ['**/.*', '**/*.test.{ts,tsx}'],
  serverModuleFormat: 'esm',
  future: {
    v3_fetcherPersist: true,
    v3_lazyRouteDiscovery: true,
    v3_relativeSplatPath: true,
    v3_throwAbortReason: true,
  },
};
