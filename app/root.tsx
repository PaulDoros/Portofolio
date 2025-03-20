import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";

import { ThemeProvider } from "./components/theme-provider";
import type { Theme } from "./components/theme-provider";
import tailwindStyles from "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStyles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async () => {
  return json({});
};

function getInitialTheme(): Theme {
  // On the server, return system as default
  if (typeof window === "undefined") return "system";

  try {
    // Check localStorage
    const stored = window.localStorage.getItem("theme") as Theme;
    if (
      stored &&
      (stored === "light" || stored === "dark" || stored === "system")
    ) {
      return stored;
    }

    // Check system preference
    const systemPreference = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return systemPreference ? "dark" : "light";
  } catch {
    return "system";
  }
}

export default function App() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Professional portfolio showcasing my projects, skills, and experience"
        />
        <meta
          name="keywords"
          content="portfolio, developer, web development, projects"
        />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider defaultTheme={getInitialTheme()}>
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">
              <Outlet />
            </div>
          </div>
        </ThemeProvider>
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
          <Meta />
          <Links />
          <title>Oops! {error.status}</title>
        </head>
        <body className="flex h-full items-center justify-center">
          <div className="p-8 text-center">
            <h1 className="mb-4 text-4xl font-bold">
              {error.status} - {error.statusText}
            </h1>
            <p className="mb-6">
              {error.data.message || "Something went wrong"}
            </p>
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
        <Meta />
        <Links />
        <title>Oh no!</title>
      </head>
      <body className="flex h-full items-center justify-center">
        <div className="p-8 text-center">
          <h1 className="mb-4 text-4xl font-bold">Something went wrong</h1>
          <p className="mb-6">
            Please try again later or contact support if the problem persists.
          </p>
          <a href="/" className="text-blue-600 hover:underline">
            Go back home
          </a>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
