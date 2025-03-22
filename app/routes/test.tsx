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
import { useState, useEffect } from 'react';
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
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';

// Import the separated portfolio components
import { ClassicPortfolio } from '~/components/portfolios/classic-portfolio';
import { AnimatedPortfolio } from '~/components/portfolios/animated-portfolio';

export const meta: MetaFunction = () => {
  return [
    { title: 'Paul Ionut Doros | Portfolio Comparison' },
    {
      name: 'description',
      content:
        "Compare classic and animated versions of Paul Ionut Doros's frontend developer portfolio",
    },
  ];
};

export const loader = async () => {
  return json({});
};

export default function TestPage() {
  const [showAdultWarning, setShowAdultWarning] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);
  const [pendingSiteName, setPendingSiteName] = useState<string>('');
  const [activeView, setActiveView] = useState<'classic' | 'animated'>('classic');
  const [showComparison, setShowComparison] = useState(false);

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

  // Always render both portfolios but control visibility with CSS
  return (
    <>
      <div className="relative w-full">
        <div
          className="classic-portfolio"
          style={{
            display: 'block',
            visibility: !showComparison && activeView !== 'classic' ? 'hidden' : 'visible',
            ...(showComparison
              ? {
                  WebkitMaskImage:
                    'linear-gradient(to right, black 0%, black 50%, transparent 50%, transparent 100%)',
                  maskImage:
                    'linear-gradient(to right, black 0%, black 50%, transparent 50%, transparent 100%)',
                }
              : {}),
          }}
        >
          <ClassicPortfolio key="classic" onAdultLinkClick={handleAdultLinkClick} />
        </div>

        <div
          className={`animated-portfolio ${showComparison ? 'absolute left-0 top-0 w-full' : ''}`}
          style={{
            display: 'block',
            visibility: !showComparison && activeView !== 'animated' ? 'hidden' : 'visible',
            ...(showComparison
              ? {
                  WebkitMaskImage:
                    'linear-gradient(to right, transparent 0%, transparent 50%, black 50%, black 100%)',
                  maskImage:
                    'linear-gradient(to right, transparent 0%, transparent 50%, black 50%, black 100%)',
                }
              : {}),
          }}
        >
          <AnimatedPortfolio key="animated" onAdultLinkClick={handleAdultLinkClick} />
        </div>

        {/* Only render comparison UI when in comparison mode */}
        {showComparison && (
          <>
            {/* Divider line */}
            <div className="fixed bottom-0 left-1/2 top-0 z-10 w-1 bg-white shadow-lg" />

            {/* Labels */}
            <div className="pointer-events-none fixed inset-0 z-20">
              <div className="flex h-full">
                <div className="flex w-1/2 items-center justify-center">
                  <span className="rounded-lg border-2 border-white bg-black/10 px-8 py-4 text-3xl font-bold text-white shadow-lg backdrop-blur-sm">
                    CLASSIC
                  </span>
                </div>
                <div className="flex w-1/2 items-center justify-center">
                  <span className="rounded-lg border-2 border-white bg-black/10 px-8 py-4 text-3xl font-bold text-white shadow-lg backdrop-blur-sm">
                    ANIMATED
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Style change button - fixed at bottom */}
      <div className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 transform">
        <Button
          variant={showComparison ? 'secondary' : 'default'}
          className="rounded-full px-6 shadow-lg"
          onClick={() => setShowComparison(!showComparison)}
        >
          {showComparison ? 'Close' : 'Change Style'}
        </Button>
      </div>

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
