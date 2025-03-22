// This is a custom server adapter for Vercel
const path = require('path');
const { createRequestHandler } = require('@remix-run/express');
const { broadcastDevReady, installGlobals } = require('@remix-run/node');
const express = require('express');

// Install Remix globals
installGlobals();

// Our build directory
const BUILD_DIR = path.join(process.cwd(), 'build');

// Create an express app
const app = express();

// Handle asset requests
app.use(express.static('public', { maxAge: '1h' }));

// Handle data requests
app.all(
  '*',
  createRequestHandler({
    build: require(BUILD_DIR),
    mode: process.env.NODE_ENV,
  })
);

// Get port from env or use default
const port = process.env.PORT || 3000;

// Start the server if not in production (for local dev)
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);

    if (process.env.NODE_ENV === 'development') {
      broadcastDevReady(require(BUILD_DIR));
    }
  });
}

// For Vercel, we need to export a request handler
module.exports = app;
