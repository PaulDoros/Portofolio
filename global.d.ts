// This file helps with TypeScript module resolution in Vercel
declare module '@remix-run/dev/server-build' {
  export * from '@remix-run/dev/server-build';
}

declare module '@vercel/remix' {
  import type { RequestHandler } from '@vercel/node';
  export function createRequestHandler(options: any): RequestHandler;
}
