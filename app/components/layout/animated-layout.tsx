import { motion } from 'framer-motion';
import { Footer } from './footer';
import { NavBar } from './nav-bar';

interface AnimatedLayoutProps {
  children: React.ReactNode;
}

export function AnimatedLayout({ children }: AnimatedLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <motion.header
        className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <NavBar />
      </motion.header>
      <main>{children}</main>
      <motion.footer
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
      >
        <Footer />
      </motion.footer>
    </div>
  );
}
