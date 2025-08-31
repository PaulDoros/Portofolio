import { RemixBrowser } from '@remix-run/react';
import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';

/**
 * By using document as the hydration target and ensuring we don't
 * try to render an HTML structure inside another HTML structure,
 * we should avoid the hydration mismatch errors.
 */
hydrateRoot(
  document,
  <StrictMode>
    <RemixBrowser />
  </StrictMode>
);
