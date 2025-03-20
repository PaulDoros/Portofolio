import { Link } from "@remix-run/react";

import { ThemeToggle } from "~/components/theme-toggle";
import { Button } from "~/components/ui/button";

import { Footer } from "./footer";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Paul Doros</span>
          </Link>
          <nav className="flex flex-1 items-center justify-between space-x-6 text-sm font-medium">
            <div className="flex items-center space-x-6">
              <Link to="/#about" className="transition-colors hover:text-foreground/80">About</Link>
              <Link to="/#projects" className="transition-colors hover:text-foreground/80">Projects</Link>
              <Link to="/#skills" className="transition-colors hover:text-foreground/80">Skills</Link>
              <Link to="/#contact" className="transition-colors hover:text-foreground/80">Contact</Link>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button asChild>
                <a href="/resume.pdf" download>Download Resume</a>
              </Button>
            </div>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  );
} 