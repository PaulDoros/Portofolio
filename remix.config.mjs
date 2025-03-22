/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ['**/.*'],
  serverModuleFormat: 'esm',
  future: {
    v3_fetcherPersist: true,
    v3_lazyRouteDiscovery: true,
    v3_relativeSplatPath: true,
    v3_throwAbortReason: true,
    v3_singleFetch: true,
    v3_staticApiRoutes: true,
    v3_headersInLoader: true,
  },
  serverBuildPath: 'api/index.js',
  serverPlatform: 'node',
  serverDependenciesToBundle: [/^remix-utils.*/, /^framer-motion.*/, 'react', 'react-dom'],
};
