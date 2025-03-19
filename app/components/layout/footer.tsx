import { Link } from '@remix-run/react';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Paul Doros</h3>
            <p className="text-muted-foreground max-w-xs">
              Frontend Developer specializing in React, Remix, and modern web technologies.
            </p>
            <div className="flex items-center gap-3 mt-4">
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
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link to="/#about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link to="/#projects" className="text-muted-foreground hover:text-foreground transition-colors">
                Projects
              </Link>
              <Link to="/#skills" className="text-muted-foreground hover:text-foreground transition-colors">
                Skills
              </Link>
              <Link to="/#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </nav>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
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
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Paul Doros. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 