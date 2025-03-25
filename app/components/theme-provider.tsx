import { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light' | 'system';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'light'; // Default for SSR
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // Only run once on mount to handle initial setup
  useEffect(() => {
    setMounted(true);
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    // During SSR and initial client render, we don't want any theme flashes
    // So we hide the content until client-side JS sets up the proper theme
    if (typeof document !== 'undefined') {
      document.body.classList.remove('hidden');
    }

    let initialTheme: Theme;
    try {
      const stored = window.localStorage.getItem(storageKey) as Theme;
      if (stored && ['light', 'dark', 'system'].includes(stored)) {
        initialTheme = stored;
      } else {
        initialTheme = defaultTheme;
      }
    } catch (e) {
      initialTheme = defaultTheme;
    }

    setTheme(initialTheme);

    const resolvedTheme = initialTheme === 'system' ? getSystemTheme() : initialTheme;
    root.classList.add(resolvedTheme);
  }, [defaultTheme, storageKey]);

  // Effect for theme changes after mount
  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    const resolvedTheme = theme === 'system' ? getSystemTheme() : theme;
    root.classList.add(resolvedTheme);

    try {
      localStorage.setItem(storageKey, theme);
    } catch (e) {
      // Ignore localStorage errors
    }
  }, [theme, mounted, storageKey]);

  // Handle system theme changes
  useEffect(() => {
    if (!mounted) return;
    if (theme !== 'system') return;

    const media = window.matchMedia('(prefers-color-scheme: dark)');

    function handleChange() {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(getSystemTheme());
    }

    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, [theme, mounted]);

  // For SSR, return early with default theme
  if (!mounted) {
    return (
      <ThemeProviderContext.Provider {...props} value={{ ...initialState, theme }}>
        {children}
      </ThemeProviderContext.Provider>
    );
  }

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return {
    ...context,
    // Helper functions
    isLight:
      context.theme === 'light' || (context.theme === 'system' && getSystemTheme() === 'light'),
    isDark: context.theme === 'dark' || (context.theme === 'system' && getSystemTheme() === 'dark'),
  };
}
