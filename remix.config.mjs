/** @type {import('@remix-run/dev').AppConfig} */
export default {
  cacheDirectory: './node_modules/.cache/remix',
  ignoredRouteFiles: ['**/.*'],
  serverModuleFormat: 'esm',
  server: process.env.NODE_ENV === 'production' ? './server.js' : undefined,
  serverBuildPath: 'build/index.js',
  serverPlatform: 'node',
  future: {
    v3_fetcherPersist: true,
    v3_lazyRouteDiscovery: true,
    v3_relativeSplatPath: true,
    v3_throwAbortReason: true,
    v3_singleFetch: true,
  },
};
