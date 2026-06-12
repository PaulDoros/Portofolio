import { Footer } from './footer';
import { NavBar } from './nav-bar';
import { ScrollToTop } from '~/components/ui/scroll-to-top';
import { ClientOnly } from '~/utils/client-only';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <NavBar />
      <main className="relative z-10">{children}</main>
      <Footer />

      {/* Scroll to Top Button */}
      <ClientOnly>
        <ScrollToTop />
      </ClientOnly>
    </div>
  );
}
