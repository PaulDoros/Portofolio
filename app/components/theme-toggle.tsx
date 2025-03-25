import { Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

import { useTheme } from '~/components/theme-provider';
import { Button } from '~/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Once mounted, we can show the toggle
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-9 w-16" />; // Empty placeholder with same dimensions
  }

  const resolvedTheme =
    theme === 'system'
      ? typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : theme;

  return (
    <Button
      variant="outline"
      size="icon"
      className={`relative h-9 w-16 rounded-full transition-colors ${
        resolvedTheme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'
      }`}
      onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
      aria-label="Toggle theme"
    >
      <div
        className={`absolute left-1 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-200 ${
          resolvedTheme === 'dark' ? 'translate-x-[1.75rem]' : 'translate-x-0'
        }`}
      >
        {resolvedTheme === 'dark' ? (
          <Moon className="h-4 w-4 text-slate-800" />
        ) : (
          <Sun className="h-4 w-4 text-yellow-500" />
        )}
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
