import { createRequestHandler } from '@vercel/remix';
import * as build from '@remix-run/dev/server-build';

// Log the environment to help with debugging
console.log(`[Remix Server] NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`[Remix Server] Initializing server...`);

export default createRequestHandler({
  build,
  mode: process.env.NODE_ENV,
  getLoadContext(req, res) {
    return {
      req,
      res,
    };
  },
});
