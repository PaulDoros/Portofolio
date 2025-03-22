'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { Compare } from '~/components/ui/compare';
import { useAnimationMode } from '~/root';
import { ClassicHero } from '~/components/sections/classic-hero';
import { AnimatedHero } from '~/components/sections/animated-hero';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeftRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface StyleSelectorProps {
  onStyleSelected?: () => void;
}

export function StyleSelector({ onStyleSelected }: StyleSelectorProps) {
  const { mode, setMode } = useAnimationMode();
  const [sliderPosition, setSliderPosition] = useState(50);
  const [showingComparison, setShowingComparison] = useState(true);

  // Set the mode based on the slider position when user makes a selection
  const handleSelectStyle = (selectedMode: 'classic' | 'animated') => {
    setMode(selectedMode);
    setShowingComparison(false);

    // Animate the slider to the appropriate position
    if (selectedMode === 'classic') {
      setSliderPosition(0);
    } else {
      setSliderPosition(100);
    }

    // Notify parent component that a style has been selected
    if (onStyleSelected) {
      onStyleSelected();
    }
  };

  // Reset to comparison view
  const handleResetComparison = () => {
    setShowingComparison(true);
    setSliderPosition(50);
  };

  // Handle slider movement
  const handleSliderChange = useCallback((position: number) => {
    setSliderPosition(position);
  }, []);

  return (
    <div className="relative">
      {/* Style badges at the top */}
      <div className="absolute left-0 right-0 top-4 z-50 flex justify-between px-8">
        <div className="flex items-center gap-2">
          <Badge
            variant={mode === 'classic' && !showingComparison ? 'default' : 'outline'}
            className="bg-background/70 backdrop-blur"
          >
            Classic
            {mode === 'classic' && !showingComparison && <Check className="ml-1 h-3 w-3" />}
          </Badge>
          {mode === 'classic' && !showingComparison && (
            <span className="text-xs text-muted-foreground">Selected</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {mode === 'animated' && !showingComparison && (
            <span className="text-xs text-muted-foreground">Selected</span>
          )}
          <Badge
            variant={mode === 'animated' && !showingComparison ? 'default' : 'outline'}
            className="bg-background/70 backdrop-blur"
          >
            Animated
            {mode === 'animated' && !showingComparison && <Check className="ml-1 h-3 w-3" />}
          </Badge>
        </div>
      </div>

      {/* The comparison slider */}
      <Compare
        firstContent={
          <div className="h-full w-full overflow-auto">
            <ClassicHero />
          </div>
        }
        secondContent={
          <div className="h-full w-full overflow-auto">
            <AnimatedHero />
          </div>
        }
        className="h-[600px] w-full rounded-lg border shadow-lg"
        slideMode={showingComparison ? 'hover' : 'drag'}
        initialSliderPercentage={sliderPosition}
        autoplay={!showingComparison}
        autoplayDuration={8000}
      />

      {/* Action buttons */}
      <AnimatePresence>
        {showingComparison ? (
          <motion.div
            className="absolute bottom-8 left-0 right-0 z-50 flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              onClick={() => handleSelectStyle('classic')}
              variant="secondary"
              className="bg-background/70 backdrop-blur"
            >
              Choose Classic
            </Button>
            <Button
              onClick={() => handleSelectStyle('animated')}
              className="bg-primary/90 backdrop-blur"
            >
              Choose Animated
            </Button>
          </motion.div>
        ) : (
          <motion.div
            className="absolute bottom-8 left-0 right-0 z-50 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              onClick={handleResetComparison}
              variant="outline"
              className="bg-background/70 backdrop-blur"
            >
              <ArrowLeftRight className="mr-2 h-4 w-4" />
              Compare Styles
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
