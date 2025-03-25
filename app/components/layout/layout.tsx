import { Footer } from './footer';
import { NavBar } from './nav-bar';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <NavBar />
      </div>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
