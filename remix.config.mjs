/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ['**/.*'],
  serverModuleFormat: 'esm',
  server: process.env.NODE_ENV === 'development' ? undefined : './server.js',
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
