import { Footer } from "./footer";
import { NavBar } from "./nav-bar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <NavBar />
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  );
}
