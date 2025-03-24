import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import {
  ArrowRight,
  ArrowLeftRight,
  Eye,
  Github,
  Mail,
  ExternalLink,
  Download,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { json } from '@remix-run/node';

import { AdultContentModal } from '~/components/adult-content-modal';
import { ContactForm } from '~/components/contact-form';
import { ClassicHero } from '~/components/sections/classic-hero';
import { AnimatedHero } from '~/components/sections/animated-hero';
import { ClassicAbout } from '~/components/sections/classic-about';
import { AnimatedAbout } from '~/components/sections/animated-about';

import { useAnimationMode } from '~/root';
import { AnimationSwitch, useAnimationLayout } from '~/utils/animation-utils';
import { Compare } from '~/components/ui/compare';

import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Progress } from '~/components/ui/progress';
import { Separator } from '~/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';

// Import the separated portfolio components
import { ClassicPortfolio } from '~/components/portfolios/classic-portfolio';
import { AnimatedPortfolio } from '~/components/portfolios/animated-portfolio';

export const meta: MetaFunction = () => {
  return [
    { title: 'Paul Ionut Doros | Frontend Developer' },
    {
      name: 'description',
      content:
        'Professional portfolio of Paul Ionut Doros, Frontend Developer with expertise in React, Remix, and modern web technologies',
    },
  ];
};

export const loader = async () => {
  return json({});
};

export default function Index() {
  const { mode, setMode } = useAnimationMode();
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isComparing, setIsComparing] = useState(false);
  const [slidingTo, setSlidingTo] = useState<'classic' | 'animated' | null>(null);

  const [showAdultWarning, setShowAdultWarning] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);
  const [pendingSiteName, setPendingSiteName] = useState<string>('');

  // Refs for scroll synchronization
  const classicSideRef = useRef<HTMLDivElement>(null);
  const animatedSideRef = useRef<HTMLDivElement>(null);
  const isScrollingSynced = useRef(false);

  const PageLayout = useAnimationLayout();

  // Always synchronize scrolling between sides, regardless of comparison state
  useEffect(() => {
    const classicSide = classicSideRef.current;
    const animatedSide = animatedSideRef.current;

    if (!classicSide || !animatedSide) return;

    const syncScroll = (source: Element, target: Element) => {
      const handleScroll = () => {
        if (isScrollingSynced.current) return;

        isScrollingSynced.current = true;
        target.scrollTop = source.scrollTop;

        // Reset the flag after a short delay
        setTimeout(() => {
          isScrollingSynced.current = false;
        }, 50);
      };

      source.addEventListener('scroll', handleScroll);
      return () => source.removeEventListener('scroll', handleScroll);
    };

    const cleanupClassic = syncScroll(classicSide, animatedSide);
    const cleanupAnimated = syncScroll(animatedSide, classicSide);

    return () => {
      cleanupClassic();
      cleanupAnimated();
    };
  }, []);

  // Listen for toggle-comparison event
  useEffect(() => {
    const handleToggleComparison = () => {
      setSliderPosition(50);
      setIsComparing(true);
      setSlidingTo(null);
    };

    window.addEventListener('toggle-comparison', handleToggleComparison);

    return () => {
      window.removeEventListener('toggle-comparison', handleToggleComparison);
    };
  }, []);

  // Animate slider position when a style is selected
  useEffect(() => {
    if (slidingTo === 'classic') {
      const timer = setTimeout(() => {
        setMode('classic');
        setSliderPosition(0);
        localStorage.setItem('selectedMode', 'classic');
        setSlidingTo(null);
      }, 400);
      return () => clearTimeout(timer);
    } else if (slidingTo === 'animated') {
      const timer = setTimeout(() => {
        setMode('animated');
        setSliderPosition(100);
        localStorage.setItem('selectedMode', 'animated');
        setSlidingTo(null);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [slidingTo, setMode]);

  const handleAdultLinkClick = (url: string, siteName: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setPendingUrl(url);
    setPendingSiteName(siteName);
    setShowAdultWarning(true);
  };

  const handleConfirmAdultContent = () => {
    if (pendingUrl) {
      window.open(pendingUrl, '_blank');
      setShowAdultWarning(false);
      setPendingUrl(null);
      setPendingSiteName('');
    }
  };

  const handleSelectStyle = (selectedMode: 'classic' | 'animated') => {
    setSlidingTo(selectedMode);
    // Animation will finish in the useEffect to set the actual mode
  };

  const handleToggleCompare = () => {
    setSliderPosition(50);
    setIsComparing(true);
    setSlidingTo(null);
  };

  return (
    <>
      <ClassicPortfolio onAdultLinkClick={handleAdultLinkClick} />

      <AdultContentModal
        isOpen={showAdultWarning}
        onClose={() => {
          setShowAdultWarning(false);
          setPendingUrl(null);
          setPendingSiteName('');
        }}
        onConfirm={handleConfirmAdultContent}
        siteName={pendingSiteName}
      />
    </>
  );
}
