import path from 'path';
import { createRequestHandler } from '@vercel/remix';
import * as build from '@remix-run/dev/server-build';
import { fileURLToPath } from 'url';

// Get directory name in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default createRequestHandler({
  build,
  mode: process.env.NODE_ENV,
  getLoadContext(req, res) {
    // Log the URL in production for debugging
    if (process.env.NODE_ENV === 'production') {
      console.log(`Handling request for: ${req.url}`);
    }
    return {};
  },
});
