import { Download } from 'lucide-react';

import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';

export function ClassicHero() {
  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="bg-grid-small-black/[0.05] absolute inset-0 -z-10" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/20 via-background/60 to-background" />

      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-20 text-center md:py-32">
        <Badge className="mb-4">Available for Work</Badge>
        <h1 className="mb-6 text-4xl font-bold md:text-6xl">Paul Ionut Doros</h1>
        <p className="mb-2 text-2xl font-medium">Frontend Developer</p>
        <p className="mb-10 max-w-2xl text-xl text-muted-foreground">
          I build modern, responsive web applications with React, Remix, and TypeScript. Let&apos;s
          work together to bring your ideas to life.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <a href="/#contact">Contact Me</a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="/resume.pdf" download>
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
