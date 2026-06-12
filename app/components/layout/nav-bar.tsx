import { Link } from '@remix-run/react';
import { Menu } from 'lucide-react';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useState } from 'react';

import { Button } from '~/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '~/components/ui/sheet';
import { ModeToggle } from '~/components/mode-toggle';
import { useAnimationMode } from '~/root';
import { ThemeToggle } from '../theme-toggle';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/#about' },
  { name: 'Experience', href: '/experience' },
  { name: 'Projects', href: '/projects' },
  { name: 'Pantheon Demo', href: '/pantheon-demo' },
  { name: 'Skills', href: '/#skills' },
  // { name: 'Compare', href: '/compare' },
  { name: 'Contact', href: '/#contact' },
];

export function NavBar() {
  const { mode } = useAnimationMode();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const shouldUseLightHeader = mode === 'classic' && !isScrolled;

  useMotionValueEvent(scrollY, 'change', current => {
    const previous = scrollY.getPrevious() ?? 0;
    setIsScrolled(current > 50);
    setHidden(current > previous && current > 150);
  });

  return (
    <motion.header
      animate={{ y: hidden ? -96 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed left-0 right-0 top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? 'border-black/10 bg-[#fbfaf7]/90 text-[#111113] shadow-[0_10px_34px_rgba(17,17,19,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-[#050507]/90 dark:text-white dark:shadow-[0_10px_34px_rgba(0,0,0,0.28)]'
          : shouldUseLightHeader
            ? 'bg-[#f4f0e8]/78 border-black/10 text-[#111113] backdrop-blur-xl'
            : 'bg-[#050507]/78 border-white/10 text-white backdrop-blur-xl'
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="group flex items-center gap-3 text-sm font-black uppercase tracking-[0.18em] text-current transition-colors hover:text-[#a14719] dark:hover:text-[#f1c46b]"
          >
            <span className="border-current/20 bg-current/[0.03] flex h-9 w-9 items-center justify-center border text-xs">
              PD
            </span>
            <span>Paul Doros</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="hidden items-center space-x-4 md:flex">
              <div className="flex items-center gap-6">
                {navItems.map(item => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group relative text-xs font-bold uppercase tracking-[0.12em] transition-colors ${
                      isScrolled || shouldUseLightHeader
                        ? 'text-[#5f574d] hover:text-[#a14719] dark:text-white/70 dark:hover:text-[#f1c46b]'
                        : 'text-white/70 hover:text-[#f1c46b]'
                    }`}
                  >
                    {item.name}
                    <span className="absolute -bottom-2 left-0 h-px w-0 bg-[#a14719] transition-all group-hover:w-full dark:bg-[#f1c46b]" />
                  </Link>
                ))}
              </div>
              <ModeToggle />
              <ThemeToggle />
            </nav>
            <Button
              className="hidden rounded-md bg-[#111113] text-white hover:bg-[#2d2d32] dark:bg-white dark:text-[#050507] dark:hover:bg-[#f4efe6] sm:flex sm:items-center sm:justify-center"
              asChild
              size="sm"
            >
              <a href="/#contact">Let&apos;s Talk</a>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="h-full md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5 text-[#050507]" />
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
                        <ModeToggle />
                        <ThemeToggle />
                      </div>
                    </div>

                    <div className="px-4">
                      <Button variant="outline" asChild className="w-full">
                        <a
                          href="/resume.md"
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
    </motion.header>
  );
}
