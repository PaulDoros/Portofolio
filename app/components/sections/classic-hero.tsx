import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { BackgroundPaths } from '~/components/ui/background-paths';

function FloatingPaths({ position, isMobile }: { position: number; isMobile?: boolean }) {
  const pathCount = isMobile ? 12 : 36; // Reduce paths on mobile
  const paths = Array.from({ length: pathCount }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(15,23,42,${0.1 + i * 0.03})`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg
        className="h-full w-full text-slate-600/40 dark:text-white/30"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map(path => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.2 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.7, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function ClassicHero() {
  const title = 'Paul Ionut Doros';
  const words = title.split(' ');

  // Check if mobile for performance optimization
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background Paths Animation - Conditionally render for mobile */}
      {!isMobile && (
        <div className="absolute inset-0 -z-10">
          <FloatingPaths position={1} isMobile={isMobile} />
          <FloatingPaths position={-1} isMobile={isMobile} />
        </div>
      )}

      {/* Background Effects - Static on mobile for better performance */}
      <div
        className={`absolute inset-0 -z-20 ${isMobile ? 'bg-gradient-to-b from-background via-background/95 to-background' : 'bg-grid-small-black/[0.02]'}`}
      />
      {!isMobile && (
        <div className="absolute inset-0 -z-20 bg-gradient-to-b from-background/40 via-background/80 to-background" />
      )}

      <div className="container relative z-10 mx-auto flex flex-col items-center justify-center px-4 py-20 text-center md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge className="mb-4">Available for Work</Badge>
        </motion.div>

        {/* Animated Name with Letter-by-Letter Animation */}
        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
          {words.map((word, wordIndex) => (
            <span key={wordIndex} className="mr-4 inline-block last:mr-0">
              {word.split('').map((letter, letterIndex) => (
                <motion.span
                  key={`${wordIndex}-${letterIndex}`}
                  initial={{ y: isMobile ? 20 : 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: isMobile
                      ? wordIndex * 0.05 + letterIndex * 0.02
                      : wordIndex * 0.1 + letterIndex * 0.05,
                    type: 'spring',
                    stiffness: isMobile ? 200 : 100,
                    damping: isMobile ? 15 : 10,
                  }}
                  style={{
                    transform: 'translateZ(0)',
                    willChange: 'transform',
                  }}
                  className="inline-block bg-gradient-to-r from-foreground 
                    to-foreground/80 bg-clip-text text-transparent"
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        <motion.p
          className="mb-2 text-2xl font-medium"
          initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0.4 : 0.8, delay: isMobile ? 0.3 : 0.5 }}
          style={{
            transform: 'translateZ(0)',
            willChange: 'transform',
          }}
        >
          Full-Stack Developer
        </motion.p>

        <motion.p
          className="mb-10 max-w-2xl text-xl text-muted-foreground"
          initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0.4 : 0.8, delay: isMobile ? 0.4 : 0.7 }}
          style={{
            transform: 'translateZ(0)',
            willChange: 'transform',
          }}
        >
          I build modern, responsive web applications with React, Remix, and TypeScript. Let&apos;s
          work together to bring your ideas to life.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0.4 : 0.8, delay: isMobile ? 0.5 : 0.9 }}
          style={{
            transform: 'translateZ(0)',
            willChange: 'transform',
          }}
        >
          <Button asChild size="lg" className="group">
            <a href="/#contact">
              <span className="transition-transform group-hover:scale-110">Contact Me</span>
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild className="group">
            <a href="/resume.md" download>
              <Download className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              Download Resume
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
