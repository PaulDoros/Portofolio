import { Bot, Download, Gamepad2, ShieldCheck, Sparkles } from 'lucide-react';

import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';

const heroStats = [
  { label: 'AI SaaS', value: 'Production' },
  { label: 'Agent fleet', value: '37 roles' },
  { label: 'Games', value: 'Unity + Unreal' },
];

const focusAreas = [
  { label: 'AI products', icon: Sparkles },
  { label: 'Automation systems', icon: Bot },
  { label: 'Mobile games', icon: Gamepad2 },
  { label: 'Quality gates', icon: ShieldCheck },
];

export function ClassicHero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[92vh] items-center overflow-hidden border-b border-stone-300/30 bg-[#f4f0e8] pt-24 text-[#11110f] dark:border-white/10 dark:bg-[#080807] dark:text-[#f4f0e8]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,15,0.06)_1px,transparent_1px),linear-gradient(180deg,rgba(17,17,15,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-50 dark:bg-[linear-gradient(90deg,rgba(244,240,232,0.06)_1px,transparent_1px),linear-gradient(180deg,rgba(244,240,232,0.04)_1px,transparent_1px)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#9d6b25] to-transparent" />

      <div className="container relative z-10 mx-auto px-4 py-16">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 text-[11px] uppercase tracking-[0.32em] text-[#7a6b58] dark:text-[#aaa092]">
          <Badge className="rounded-full border-[#9d6b25]/30 bg-[#9d6b25]/10 text-[#5f4015] dark:text-[#f0d796]">
            Available for Work
          </Badge>
          <span>Strategy / Interfaces / Automation / Games</span>
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-end">
          <div>
            <h1 className="max-w-6xl text-[clamp(4rem,13vw,10.5rem)] font-black leading-[0.82] tracking-normal">
              Paul
              <span className="block text-[#9d6b25] dark:text-[#f0d796]">Doros</span>
            </h1>
            <div className="mt-8 grid gap-8 border-y border-[#11110f]/15 py-6 dark:border-white/15 md:grid-cols-[0.72fr_1fr]">
              <p className="text-2xl font-semibold leading-tight md:text-3xl">
                Full-stack systems, AI agents, and game prototypes with production discipline.
              </p>
              <p className="max-w-2xl text-base leading-8 text-[#5d554b] dark:text-[#c8c0b2] md:text-lg">
                I build complete systems: product strategy, frontend, backend, AI flows, admin
                tools, deployment, QA gates, and the automation layer that keeps work moving.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-full">
                <a href="/projects">View Portfolio</a>
              </Button>
              <Button variant="outline" size="lg" asChild className="rounded-full">
                <a href="/pantheon-demo">Open Pantheon Demo</a>
              </Button>
              <Button variant="outline" size="lg" asChild className="rounded-full">
                <a href="/resume.md" download>
                  <Download className="mr-2 h-4 w-4" />
                  Resume
                </a>
              </Button>
            </div>
          </div>

          <aside className="border-l border-[#11110f]/15 pl-6 dark:border-white/15">
            <div className="grid grid-cols-3 gap-3">
              {heroStats.map(stat => (
                <div key={stat.label} className="border-t border-current/20 pt-3">
                  <div className="text-lg font-bold">{stat.value}</div>
                  <div className="mt-1 text-xs text-[#7a6b58] dark:text-[#aaa092]">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              {focusAreas.map(area => {
                const Icon = area.icon;
                return (
                  <div
                    key={area.label}
                    className="flex items-center justify-between border-b border-[#11110f]/10 py-3 dark:border-white/10"
                  >
                    <span className="text-sm font-medium uppercase tracking-[0.2em]">
                      {area.label}
                    </span>
                    <Icon className="h-4 w-4 text-[#9d6b25] dark:text-[#f0d796]" />
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
