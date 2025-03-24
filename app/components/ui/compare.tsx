'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SparklesCore } from './sparkles';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '~/lib/utils';
import { MoreVertical } from 'lucide-react';

interface CompareProps {
  firstContent?: React.ReactNode;
  secondContent?: React.ReactNode;
  className?: string;
  firstContentClassName?: string;
  secondContentClassName?: string;
  initialSliderPercentage?: number;
  slideMode?: 'hover' | 'drag';
  showHandlebar?: boolean;
  autoplay?: boolean;
  autoplayDuration?: number;
  interactive?: boolean;
}

export const Compare = ({
  firstContent,
  secondContent,
  className,
  firstContentClassName,
  secondContentClassName,
  initialSliderPercentage = 50,
  slideMode = 'drag',
  showHandlebar = true,
  autoplay = false,
  autoplayDuration = 5000,
  interactive = true,
}: CompareProps) => {
  const [width, setWidth] = useState(0);
  const [sliderPercentage, setSliderPercentage] = useState(initialSliderPercentage);
  const [dragging, setDragging] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [autoplaying, setAutoplaying] = useState(autoplay);
  const [sparklesDisabled, setSparklesDisabled] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderWidth = width * (sliderPercentage / 100);

  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = useCallback(() => {
    if (!autoplay) return;

    const startTime = Date.now();
    const animate = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = (elapsedTime % (autoplayDuration * 2)) / autoplayDuration;
      const percentage = progress <= 1 ? progress * 100 : (2 - progress) * 100;

      setSliderPercentage(percentage);
      autoplayRef.current = setTimeout(animate, 16); // ~60fps
    };

    animate();
  }, [autoplay, autoplayDuration]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  useEffect(() => {
    setSliderPercentage(initialSliderPercentage);
  }, [initialSliderPercentage]);

  useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current) {
        setWidth(sliderRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!autoplaying) return;

    const interval = setInterval(() => {
      setSliderPercentage(prev => {
        if (prev >= 95) return 5;
        if (prev <= 5) return 95;
        return prev > 50 ? prev + 1 : prev - 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [autoplaying]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;

    setDragging(true);
    setSparklesDisabled(true);
    if (autoplaying) setAutoplaying(false);
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setSliderPercentage((x / width) * 100);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;

    if (dragging && sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setSliderPercentage(Math.max(0, Math.min(100, (x / width) * 100)));
    } else if (slideMode === 'hover' && sliderRef.current && hovering) {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setSliderPercentage(Math.max(0, Math.min(100, (x / width) * 100)));
    }
  };

  const handleMouseUp = () => {
    if (!interactive) return;

    setDragging(false);
    setTimeout(() => {
      setSparklesDisabled(false);
    }, 500);
  };

  const handleMouseEnter = () => {
    if (!interactive) return;

    setHovering(true);
    if (autoplaying) setAutoplaying(false);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;

    setHovering(false);
    setDragging(false);
    if (autoplay) setAutoplaying(true);
    setTimeout(() => {
      setSparklesDisabled(false);
    }, 500);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!interactive) return;

    setDragging(true);
    setSparklesDisabled(true);
    if (autoplaying) setAutoplaying(false);
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      setSliderPercentage((x / width) * 100);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!interactive) return;

    if (dragging && sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      setSliderPercentage(Math.max(0, Math.min(100, (x / width) * 100)));
    }
  };

  const handleTouchEnd = () => {
    if (!interactive) return;

    setDragging(false);
    setTimeout(() => {
      setSparklesDisabled(false);
    }, 500);
  };

  // Prevent page scrolling when dragging on mobile
  useEffect(() => {
    const preventScroll = (e: TouchEvent) => {
      if (dragging) {
        e.preventDefault();
      }
    };

    const options = { passive: false };
    document.addEventListener('touchmove', preventScroll, options);
    return () => document.removeEventListener('touchmove', preventScroll);
  }, [dragging]);

  return (
    <div
      ref={sliderRef}
      className={`relative h-full w-full overflow-hidden ${className} ${
        dragging || (slideMode === 'hover' && hovering)
          ? 'cursor-col-resize'
          : interactive
            ? 'cursor-pointer'
            : 'cursor-default'
      }`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* First Content (Left Side) */}
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <AnimatePresence initial={false}>
          {firstContent ? (
            <motion.div
              className={cn(
                'absolute inset-0 z-20 h-full w-full flex-shrink-0 select-none overflow-hidden',
                firstContentClassName
              )}
              style={{
                clipPath: `inset(0 ${100 - sliderPercentage}% 0 0)`,
              }}
              transition={{ duration: 0 }}
            >
              <div
                className={cn(
                  'absolute inset-0 z-20 h-full w-full flex-shrink-0',
                  firstContentClassName
                )}
              >
                {firstContent}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Second Content (Right Side) with Clip Path */}
      <div
        className="absolute inset-0 h-full w-full overflow-hidden"
        style={{
          clipPath: `inset(0 0 0 ${sliderPercentage}%)`,
        }}
      >
        <AnimatePresence initial={false}>
          {secondContent ? (
            <motion.div
              className={cn(
                'absolute inset-0 z-[19] h-full w-full select-none',
                secondContentClassName
              )}
            >
              {secondContent}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Slider Bar */}
      {showHandlebar && (
        <div
          className={`absolute top-0 z-20 h-full w-0.5 cursor-col-resize bg-background shadow-[0_0_10px_2px_rgba(0,0,0,0.3)] transition-none ${
            interactive ? '' : 'pointer-events-none'
          }`}
          style={{ left: `${sliderPercentage}%` }}
        >
          {/* Slider Handle */}
          <div
            className={`absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background shadow-md ${
              interactive ? 'hover:scale-110' : ''
            }`}
          >
            {!sparklesDisabled && (
              <MemoizedSparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={1200}
                className="h-full w-full"
                particleColor="#FFFFFF"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <MoreVertical className="h-3 w-3 text-muted-foreground" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MemoizedSparklesCore = React.memo(SparklesCore);
