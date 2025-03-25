import { Link } from '@remix-run/react';
import { Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

import { Button } from '~/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '~/components/ui/sheet';
import { ThemeToggle } from '../theme-toggle';
import { ModeToggle } from '~/components/mode-toggle';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/#about' },
  { name: 'Experience', href: '/experience' },
  { name: 'Projects', href: '/projects' },
  { name: 'Skills', href: '/#skills' },
  // { name: 'Compare', href: '/compare' },
  { name: 'Contact', href: '/#contact' },
];

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/90 shadow-sm backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold transition-colors hover:text-primary">
            Paul Doros
          </Link>

          {/* Desktop Navigation */}
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="hidden items-center space-x-4 md:flex">
              <div className="flex items-center gap-6">
                {navItems.map(item => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="group relative text-sm font-medium transition-colors hover:text-primary"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full" />
                  </Link>
                ))}
              </div>
              {/* <ModeToggle /> */}
              <ThemeToggle />
            </nav>
            <Button className="hidden sm:flex sm:items-center sm:justify-center" asChild size="sm">
              <a href="/#contact">Let&apos;s Talk</a>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="h-full md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <div className="flex h-full flex-col">
                  <nav className="flex-1 space-y-4 py-4">
                    {navItems.map(item => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="flex items-center rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-muted"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>

                  <div className="space-y-4 border-t py-4">
                    <div className="flex items-center justify-between px-4">
                      <span className="text-sm font-medium">Appearance</span>
                      <div className="flex gap-2">
                        {/* <ModeToggle /> */}
                        <ThemeToggle />
                      </div>
                    </div>

                    <div className="px-4">
                      <Button variant="outline" asChild className="w-full">
                        <a
                          href="/resume.pdf"
                          download
                          className="flex items-center justify-center gap-2"
                        >
                          <span>Download Resume</span>
                        </a>
                      </Button>
                    </div>

                    <div className="px-4">
                      <Button asChild className="w-full">
                        <a href="/#contact" className="flex items-center justify-center gap-2">
                          Let&apos;s Talk
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
