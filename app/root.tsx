import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
} from '@remix-run/react';
import { createContext, useContext, useState } from 'react';

import { ThemeProvider } from './components/theme-provider';
import tailwindStyles from './tailwind.css';
// import { AnimationToggle } from './components/animation-toggle';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: tailwindStyles },
  { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export const loader = async () => {
  return json({});
};

// Animation mode context
type AnimationMode = 'classic' | 'animated';
type AnimationContextType = {
  mode: AnimationMode;
  setMode: (mode: AnimationMode) => void;
};

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function useAnimationMode() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimationMode must be used within an AnimationProvider');
  }
  return context;
}

// This script runs before your app to prevent theme flashing
function ThemeInit() {
  const themeScript = `
    (function() {
      function getTheme() {
        try {
          const stored = localStorage.getItem('theme');
          if (stored && (stored === 'light' || stored === 'dark' || stored === 'system')) {
            return stored;
          }
        } catch {}
        return 'light';
      }
      
      function getResolved() {
        const theme = getTheme();
        if (theme === 'system') {
          return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return theme;
      }
      
      const resolved = getResolved();
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(resolved);
      document.documentElement.style.setProperty('color-scheme', resolved);
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}

export default function App() {
  const [mode, setMode] = useState<AnimationMode>('classic');

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Professional portfolio showcasing my projects, skills, and experience"
        />
        <meta name="keywords" content="portfolio, developer, web development, projects" />
        <ThemeInit />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <AnimationContext.Provider value={{ mode, setMode }}>
          <ThemeProvider defaultTheme="light">
            <div className="relative flex min-h-screen flex-col">
              <div className="flex-1">
                <Outlet />
                {/* <AnimationToggle /> */}
              </div>
            </div>
          </ThemeProvider>
        </AnimationContext.Provider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <html lang="en" className="h-full">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <ThemeInit />
          <title>{`Oops! ${error.status}`}</title>
          <Meta />
          <Links />
        </head>
        <body className="flex h-full items-center justify-center">
          <div className="p-8 text-center">
            <h1 className="mb-4 text-4xl font-bold">
              {error.status} - {error.statusText}
            </h1>
            <p className="mb-6">{error.data.message || 'Something went wrong'}</p>
            <a href="/" className="text-blue-600 hover:underline">
              Go back home
            </a>
          </div>
          <Scripts />
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <ThemeInit />
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body className="flex h-full items-center justify-center">
        <div className="p-8 text-center">
          <h1 className="mb-4 text-4xl font-bold">Something went wrong</h1>
          <p className="mb-6">Please try again later or contact support if the problem persists.</p>
          <a href="/" className="text-blue-600 hover:underline">
            Go back home
          </a>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
