import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
  MetaFunction,
} from '@remix-run/react';

import { ThemeProvider } from './components/theme-provider';

import styles from './tailwind.css?url';

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const meta: MetaFunction = () => {
  return [
    { title: 'Paul Doros - Portfolio' },
    { name: 'description', content: 'Paul Doros - Portfolio Website' },
  ];
};

// Common head component to ensure consistency
function Document({
  children,
  className = 'min-h-screen bg-background font-sans antialiased',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className={className}>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <ThemeProvider>
        <div className="relative flex min-h-screen flex-col overflow-x-hidden">
          {/* Global Theme-Aware Background */}
          <div className="fixed inset-0 -z-50">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 dark:from-slate-950 dark:via-blue-950/30 dark:to-indigo-950/30" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.05),transparent_50%)]" />
          </div>
          <div className="relative z-0 flex-1">
            <Outlet />
          </div>
        </div>
      </ThemeProvider>
    </Document>
  );
}

export const ErrorBoundaryMeta: MetaFunction = ({ error }) => {
  if (isRouteErrorResponse(error)) {
    return [
      { title: `Error ${error.status}` },
      { name: 'description', content: `${error.statusText}` },
    ];
  }

  return [{ title: 'Error' }, { name: 'description', content: 'Something went wrong' }];
};

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Document className="flex h-full items-center justify-center">
        <div className="p-8 text-center">
          <h1 className="mb-4 text-4xl font-bold">
            {error.status} - {error.statusText}
          </h1>
          <p className="mb-6">{error.data.message || 'Something went wrong'}</p>
          <a href="/" className="text-blue-600 hover:underline">
            Go back home
          </a>
        </div>
      </Document>
    );
  }

  return (
    <Document className="flex h-full items-center justify-center">
      <div className="p-8 text-center">
        <h1 className="mb-4 text-4xl font-bold">Something went wrong</h1>
        <p className="mb-6">Please try again later or contact support if the problem persists.</p>
        <a href="/" className="text-blue-600 hover:underline">
          Go back home
        </a>
      </div>
    </Document>
  );
}
