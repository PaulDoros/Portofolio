/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/docs/en/main/file-conventions/entry.client
 */

import { RemixBrowser } from '@remix-run/react';
import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';

if (typeof window !== 'undefined') {
  // Skip hydration and do a full client render in development
  // This is more robust when browser extensions modify the DOM
  if (process.env.NODE_ENV === 'development') {
    // Wait for any browser extension DOM modifications to complete
    window.addEventListener('DOMContentLoaded', () => {
      // Give extensions a moment to finish their work
      setTimeout(() => {
        const root = document.getElementById('root');
        if (root) {
          // Create fresh DOM for React to render into
          root.innerHTML = '';
          const appRoot = document.createElement('div');
          appRoot.id = 'app-root';
          root.appendChild(appRoot);

          import('react-dom/client').then(({ createRoot }) => {
            createRoot(appRoot).render(
              <StrictMode>
                <RemixBrowser />
              </StrictMode>
            );
          });
        } else {
          // Fallback to normal hydration if no root element found
          startTransition(() => {
            hydrateRoot(
              document,
              <StrictMode>
                <RemixBrowser />
              </StrictMode>
            );
          });
        }
      }, 50);
    });
  } else {
    // Use normal hydration in production
    startTransition(() => {
      hydrateRoot(
        document,
        <StrictMode>
          <RemixBrowser />
        </StrictMode>
      );
    });
  }
}
