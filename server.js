import { createRequestHandler } from '@vercel/remix';
import * as build from '@remix-run/dev/server-build';

console.log('[Remix Server] Starting server handler...');

export default createRequestHandler({
  build,
  mode: process.env.NODE_ENV,
});
