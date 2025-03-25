import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
} from '@remix-run/react';
import { ThemeProvider } from './components/theme-provider';
import styles from './tailwind.css?url';

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const meta = () => {
  return [
    { title: 'Paul Ionut Doros | Frontend Developer' },
    {
      name: 'description',
      content:
        'Professional portfolio of Paul Ionut Doros, Frontend Developer with expertise in React, Remix, and modern web technologies',
    },
  ];
};

export default function App() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">
              <Outlet />
            </div>
          </div>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="flex h-full items-center justify-center">
          <div className="p-8 text-center">
            <h1 className="mb-4 text-4xl font-bold">
              {isRouteErrorResponse(error)
                ? `${error.status} - ${error.statusText}`
                : 'Something went wrong'}
            </h1>
            <p className="mb-6">
              {isRouteErrorResponse(error)
                ? error.data?.message || 'Unexpected error'
                : 'Please try again later or contact support if the problem persists.'}
            </p>
            <a href="/" className="text-blue-600 hover:underline">
              Go back home
            </a>
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
