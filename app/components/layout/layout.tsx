import { Link } from "@remix-run/react";
import { Menu, X } from "lucide-react";

import { ContentColors } from "../content-colors";
import { ThemeColors } from "../theme-colors";
import { useTheme } from "../theme-provider";
import { ThemeToggle } from "../theme-toggle";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

import { Footer } from "./footer";

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/#projects" },
  { name: "Skills", href: "/#skills" },
  { name: "Contact", href: "/#contact" },
];

export function Layout({ children }: LayoutProps) {
  const { theme } = useTheme();
  const isLightMode = theme === "light";

  return (
    <div className="min-h-screen bg-background font-sans antialiased flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold">Paul Doros</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm font-medium transition-colors hover:text-foreground/80"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* Theme Controls and Resume Button */}
          <div className="flex items-center space-x-4">
            {isLightMode ? <div className="hidden md:flex items-center gap-2">
                <ContentColors />
                <ThemeColors />
                <Separator orientation="vertical" className="h-6" />
              </div> : null}
            <ThemeToggle />
            <Button asChild className="hidden md:inline-flex">
              <a href="/resume.pdf" download>Download Resume</a>
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between border-b pb-4">
                    <span className="font-bold">Menu</span>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                    </SheetTrigger>
                  </div>
                  <nav className="flex flex-col gap-4 mt-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="text-base font-medium px-2 py-2 rounded-md hover:bg-muted transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                    <Separator className="my-4" />
                    <div className="flex flex-col gap-4">
                      {isLightMode ? <div className="flex items-center justify-between px-2">
                          <span className="text-sm font-medium">Appearance</span>
                          <div className="flex items-center gap-2">
                            <ContentColors />
                            <ThemeColors />
                          </div>
                        </div> : null}
                      <Button asChild className="w-full">
                        <a href="/resume.pdf" download>Download Resume</a>
                      </Button>
                    </div>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
} 