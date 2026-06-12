import type { MetaFunction } from '@remix-run/node';

import type { MouseEvent } from 'react';
import { useEffect, useState } from 'react';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';

import { AdultContentModal } from '~/components/adult-content-modal';
import { ClassicPortfolio } from '~/components/portfolios/classic-portfolio';
import { EditorialPortfolioHome } from '~/components/sections/editorial-portfolio-home';
import { useAnimationMode } from '~/root';

export const meta: MetaFunction = () => {
  return [
    { title: 'Paul Ionut Doros | Full-Stack Developer' },
    {
      name: 'description',
      content:
        'Professional portfolio of Paul Ionut Doros, Full-Stack Developer with expertise in React, Remix, and modern web technologies',
    },
  ];
};

type PortfolioExperience = 'classic' | 'animated';

const experienceOptions = [
  {
    mode: 'classic' as const,
    name: 'Classic',
    eyebrow: 'Current live style',
    description:
      'The clean deployed-style portfolio with familiar sections, lighter motion, and direct navigation.',
    icon: Clock,
    cta: 'Enter Classic',
  },
  {
    mode: 'animated' as const,
    name: 'Motion Lab',
    eyebrow: 'Local cinematic build',
    description:
      'The new local version with scroll storytelling, 3D accents, richer project proof, and stronger visual energy.',
    icon: Sparkles,
    cta: 'Enter Motion Lab',
  },
];

function PortfolioExperienceGate({
  currentMode,
  onSelect,
}: {
  currentMode: PortfolioExperience;
  onSelect: (mode: PortfolioExperience) => void;
}) {
  return (
    <main className="min-h-screen bg-[#050507] text-white">
      <section className="relative flex min-h-screen items-center overflow-hidden px-4 py-14">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(245,78,0,0.18),transparent_30%),radial-gradient(circle_at_82%_28%,rgba(0,212,255,0.14),transparent_32%)]" />

        <div className="container relative z-10 mx-auto">
          <div className="mb-10 border-b border-white/10 pb-5 text-[11px] font-black uppercase tracking-[0.28em] text-white/50">
            Paul Doros Portfolio
          </div>

          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#f54e00]/35 bg-[#f54e00]/10 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#ffb18d]">
                <Sparkles className="h-3.5 w-3.5" />
                Choose your entry
              </p>
              <h1 className="max-w-4xl text-[clamp(3.1rem,8.5vw,7rem)] font-black leading-[0.9] tracking-normal">
                Classic or Motion Lab.
              </h1>
              <p className="text-white/62 mt-6 max-w-2xl text-base leading-8 md:text-lg">
                The deployed-style portfolio stays available as Classic. The current local work
                lives in Motion Lab, where the animated systems showcase can keep evolving.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {experienceOptions.map(option => {
                const Icon = option.icon;
                const isActive = currentMode === option.mode;

                return (
                  <button
                    key={option.mode}
                    type="button"
                    onClick={() => onSelect(option.mode)}
                    className={`group flex min-h-[22rem] flex-col justify-between rounded-lg border p-5 text-left transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f7c46a] ${
                      isActive
                        ? 'border-[#f7c46a]/65 bg-white/[0.085]'
                        : 'border-white/12 bg-white/[0.035] hover:border-white/30 hover:bg-white/[0.07]'
                    }`}
                  >
                    <div>
                      <div className="mb-5 flex items-center justify-between gap-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.22em] text-white/45">
                          {option.eyebrow}
                        </span>
                        <span
                          className={`flex h-10 w-10 items-center justify-center rounded-md border ${
                            option.mode === 'animated'
                              ? 'border-[#00d4ff]/35 bg-[#00d4ff]/10 text-[#86ecff]'
                              : 'border-[#f7c46a]/35 bg-[#f7c46a]/10 text-[#f7c46a]'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                      </div>

                      <h2 className="text-3xl font-black tracking-normal">{option.name}</h2>
                      <p className="text-white/58 mt-4 text-sm leading-7">{option.description}</p>
                    </div>

                    <span className="mt-8 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-white transition group-hover:text-[#f7c46a]">
                      {option.cta}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function Index() {
  const { mode, setMode } = useAnimationMode();
  const [hasSelectedExperience, setHasSelectedExperience] = useState(false);
  const [showAdultWarning, setShowAdultWarning] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);
  const [pendingSiteName, setPendingSiteName] = useState<string>('');

  useEffect(() => {
    const savedMode = window.localStorage.getItem('selectedMode');
    const hasSavedChoice =
      window.localStorage.getItem('portfolioExperienceSelected') === 'true' ||
      savedMode === 'classic' ||
      savedMode === 'animated';

    setHasSelectedExperience(hasSavedChoice);
  }, []);

  const handleAdultLinkClick = (url: string, siteName: string) => (e: MouseEvent) => {
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

  const handleSelectExperience = (nextMode: PortfolioExperience) => {
    setMode(nextMode);
    window.localStorage.setItem('portfolioExperienceSelected', 'true');
    setHasSelectedExperience(true);
  };

  const selectedPortfolio =
    mode === 'classic' ? (
      <ClassicPortfolio onAdultLinkClick={handleAdultLinkClick} />
    ) : (
      <EditorialPortfolioHome onAdultLinkClick={handleAdultLinkClick} />
    );

  return (
    <>
      {hasSelectedExperience ? (
        <div id="portfolio-home">{selectedPortfolio}</div>
      ) : (
        <PortfolioExperienceGate currentMode={mode} onSelect={handleSelectExperience} />
      )}

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
