import { Link } from '@remix-run/react';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Experience', href: '/experience' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3 md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-4 text-lg font-semibold">Paul Doros</h3>
            <p className="max-w-xs text-muted-foreground">
              Frontend Developer specializing in React, Remix, and modern web technologies.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <Button variant="ghost" size="icon" aria-label="GitHub" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" aria-label="LinkedIn" asChild>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" aria-label="Twitter" asChild>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" aria-label="Email" asChild>
                <a href="mailto:dorospaul26@gmail.com">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-4 text-lg font-semibold">Navigation</h3>
            <nav className="flex flex-col items-center gap-2 md:items-start">
              {footerLinks.map(link => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>
            <address className="not-italic text-muted-foreground">
              <p>Email: dorospaul26@gmail.com</p>
              <p className="mt-2">Phone: +40 756 436 531</p>
              <p className="mt-2">Location: Sibiu, Romania</p>
            </address>
            <Button asChild className="mt-4">
              <a href="/#contact">Get in Touch</a>
            </Button>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Paul Doros. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/privacy" className="transition-colors hover:text-foreground">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
