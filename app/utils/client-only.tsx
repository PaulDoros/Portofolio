import { useEffect, useState, type ReactNode } from 'react';

type ClientOnlyProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

/**
 * Client-only component that renders only on the client side, not during SSR.
 * This helps prevent hydration mismatches for components that rely on browser APIs.
 */
export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <>{children}</> : <>{fallback}</>;
}
