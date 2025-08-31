'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { Button } from '~/components/ui/button';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          transition={{
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="fixed bottom-6 right-6 z-50"
        >
          {/* Outer glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Main button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{
              scale: 1.05,
              y: -3,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 17,
            }}
            className="group relative h-14 w-14 overflow-hidden rounded-2xl 
                     border border-white/20 
                     bg-gray-900/50 shadow-2xl shadow-black/10
                     backdrop-blur-xl transition-all duration-300
                     ease-out hover:border-white/30
                     hover:bg-gray-900/70 hover:shadow-2xl
                     hover:shadow-primary/20 dark:border-white/10
                     dark:bg-black/20 dark:shadow-black/30 dark:hover:border-white/20
                     dark:hover:bg-black/30"
          >
            {/* Inner gradient overlay */}
            <div
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 
                          to-transparent dark:from-white/10 dark:to-transparent"
            />

            {/* Animated background shine */}
            <motion.div
              className="absolute inset-0 translate-x-[-100%] -skew-x-12 bg-gradient-to-r from-transparent
                       via-white/20 to-transparent transition-transform duration-700
                       ease-out group-hover:translate-x-[200%] dark:via-white/10"
            />

            {/* Icon */}
            <div className="relative flex h-full w-full items-center justify-center">
              <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.2 }}>
                <ChevronUp
                  className="h-6 w-6 text-foreground/80 drop-shadow-sm
                                   transition-all duration-200 group-hover:text-foreground"
                />
              </motion.div>
            </div>

            {/* Bottom highlight */}
            <div
              className="absolute bottom-0 left-1/2 h-px w-8 -translate-x-1/2 
                          bg-gradient-to-r from-transparent via-white/40 to-transparent
                          dark:via-white/20"
            />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
