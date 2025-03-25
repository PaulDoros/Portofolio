import { createContext, useContext, useEffect, useState, useMemo } from 'react';

export type Theme = 'dark' | 'light' | 'system';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: Theme;
};

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
  resolvedTheme: 'system',
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = window.localStorage.getItem(storageKey) as Theme;
        if (stored && (stored === 'light' || stored === 'dark')) {
          return stored;
        }

        const systemPreference = window.matchMedia('(prefers-color-scheme: light)').matches
          ? 'light'
          : 'dark';
        return defaultTheme === 'system' ? systemPreference : defaultTheme;
      } catch {
        return defaultTheme;
      }
    }

    return defaultTheme;
  });

  const resolvedTheme = useMemo(() => {
    if (theme === 'system' && typeof window !== 'undefined') {
      const systemPreference = window.matchMedia('(prefers-color-scheme: light)').matches
        ? 'light'
        : 'dark';
      return systemPreference;
    }

    return theme;
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (resolvedTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches
        ? 'light'
        : 'dark';

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(resolvedTheme);
  }, [resolvedTheme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      setTheme(theme);
      try {
        window.localStorage.setItem(storageKey, theme);
      } catch {
        // Ignore error
      }
    },
    resolvedTheme,
  } as const;

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');

  return {
    theme: context.theme,
    setTheme: context.setTheme,
    resolvedTheme: context.resolvedTheme,
    // Helper functions
    isLight: context.resolvedTheme === 'light',
    isDark: context.resolvedTheme === 'dark',
  };
}
