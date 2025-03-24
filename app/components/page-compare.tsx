'use client';
import React from 'react';
import { Compare } from '~/components/ui/compare';
import { Badge } from '~/components/ui/badge';
import { ClassicHero } from '~/components/sections/classic-hero';
import { AnimatedHero } from '~/components/sections/animated-hero';
import { ClassicAbout } from '~/components/sections/classic-about';
import { AnimatedAbout } from '~/components/sections/animated-about';

interface PageCompareProps {
  section: 'hero' | 'about';
  className?: string;
  height?: string;
}

export function PageCompare({ section, className, height = 'h-[600px]' }: PageCompareProps) {
  // Select the appropriate components based on the section
  const classicComponent = section === 'hero' ? <ClassicHero /> : <ClassicAbout />;
  const animatedComponent = section === 'about' ? <AnimatedAbout /> : <AnimatedHero />;

  return (
    <div className="relative w-full">
      <div className="absolute left-0 top-4 z-50 flex gap-4 px-4">
        <Badge variant="outline" className="bg-background/50 backdrop-blur">
          Classic
        </Badge>
        <Badge variant="outline" className="bg-background/50 backdrop-blur">
          Animated
        </Badge>
      </div>

      <Compare
        firstContent={<div className="h-full w-full overflow-auto">{classicComponent}</div>}
        secondContent={<div className="h-full w-full overflow-auto">{animatedComponent}</div>}
        className={`w-full ${height} rounded-lg border shadow-lg ${className}`}
        slideMode="hover"
        initialSliderPercentage={50}
      />
    </div>
  );
}
