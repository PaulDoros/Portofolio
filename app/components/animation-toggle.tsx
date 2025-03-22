'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAnimationMode } from '~/root';
import { ArrowLeftRight, Sparkles } from 'lucide-react';
import { useNavigate, useLocation } from '@remix-run/react';

export function AnimationToggle() {
  const { mode, setMode } = useAnimationMode();
  const [isFlipping, setIsFlipping] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleToggle = () => {
    if (isHomePage) {
      // If on homepage, show the comparison UI
      window.dispatchEvent(new CustomEvent('toggle-comparison'));
      return;
    }

    // On other pages, toggle the style
    setIsFlipping(true);
    setTimeout(() => {
      const newMode = mode === 'classic' ? 'animated' : 'classic';
      setMode(newMode);
      setIsFlipping(false);
      localStorage.setItem('selectedMode', newMode);

      // Show comparison option message
      showComparisonMessage();
    }, 400);
  };

  const showComparisonMessage = () => {
    // Display a comparison message
    const comparisonMessage = document.createElement('div');
    comparisonMessage.className =
      'fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-background/80 backdrop-blur rounded-md shadow-lg p-3 text-sm flex items-center';
    comparisonMessage.innerHTML = `
      <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16 16v-8M8 8v8M12 12v-8M20 20H4"/>
      </svg>
      <span>Would you like to compare both styles?</span>
      <button id="compare-btn" class="ml-3 bg-primary text-primary-foreground px-3 py-1 rounded text-xs">
        Compare Now
      </button>
    `;

    document.body.appendChild(comparisonMessage);

    // Add event listener to the button
    const compareBtn = document.getElementById('compare-btn');
    if (compareBtn) {
      compareBtn.addEventListener('click', () => {
        navigate('/');
        // Trigger comparison mode after navigation
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('toggle-comparison'));
        }, 500);
      });
    }

    // Remove the message after 5 seconds
    setTimeout(() => {
      comparisonMessage.classList.add('opacity-0');
      comparisonMessage.style.transition = 'opacity 0.5s';
      setTimeout(() => {
        if (document.body.contains(comparisonMessage)) {
          document.body.removeChild(comparisonMessage);
        }
      }, 500);
    }, 5000);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <motion.div
        className="relative h-12 w-12 cursor-pointer rounded-full bg-primary p-0 text-primary-foreground shadow-lg"
        animate={{
          rotateY: isFlipping ? 180 : 0,
          scale: isFlipping ? 1.1 : 1,
        }}
        transition={{
          duration: 0.8,
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleToggle}
        title={
          isHomePage
            ? 'Compare Styles'
            : mode === 'classic'
              ? 'Switch to Animated Style'
              : 'Switch to Classic Style'
        }
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {isHomePage ? (
            <ArrowLeftRight className="h-5 w-5" />
          ) : mode === 'classic' ? (
            <Sparkles className="h-5 w-5" />
          ) : (
            <ArrowLeftRight className="h-5 w-5" />
          )}
        </div>
      </motion.div>

      {/* Tooltip */}
      <div className="pointer-events-none absolute bottom-full right-0 mb-2 w-max rounded-lg bg-background p-2 text-xs font-medium opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
        {isHomePage
          ? 'Compare Styles'
          : mode === 'classic'
            ? 'Switch to Animated Style'
            : 'Switch to Classic Style'}
      </div>
    </div>
  );
}
