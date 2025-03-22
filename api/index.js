// This is a custom server adapter for Vercel
import * as path from 'path';
import { fileURLToPath } from 'url';
import { createRequestHandler } from '@remix-run/express';
import { installGlobals } from '@remix-run/node';
import express from 'express';

// Install Remix globals
installGlobals();

// Get directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BUILD_DIR = path.join(process.cwd(), 'build');

// Create an express app
const app = express();

// Handle asset requests
app.use(express.static('public', { maxAge: '1h' }));

// Use build output for SSR
app.all(
  '*',
  createRequestHandler({
    build: await import(BUILD_DIR),
    mode: process.env.NODE_ENV,
  })
);

// Export for Vercel
export default app;
