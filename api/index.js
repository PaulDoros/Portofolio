// This is a custom server adapter for Vercel
const path = require('path');
const { createRequestHandler } = require('@remix-run/express');
const { installGlobals } = require('@remix-run/node');
const express = require('express');

// Install Remix globals
installGlobals();

// Create an express app
const app = express();

// Handle asset requests
app.use(express.static('public', { maxAge: '1h' }));

// Use build output for SSR
app.all(
  '*',
  createRequestHandler({
    build: require(path.join(process.cwd(), 'build')),
    mode: process.env.NODE_ENV,
  })
);

// For Vercel, we need to export a request handler
module.exports = app;
