import { Link } from '@remix-run/react';

import type { PantheonAgent } from '~/data/pantheon-static';
import { PantheonAgentArtwork } from './PantheonAgentArtwork';
import { PantheonAgentPortrait } from './PantheonAgentPortrait';

const pantheonColors: Record<string, string> = {
  Greek: 'from-blue-500/[0.18] via-purple-500/[0.16] to-pink-500/[0.16]',
  Roman: 'from-red-500/[0.18] via-orange-500/[0.16] to-yellow-500/[0.16]',
  Norse: 'from-cyan-500/[0.18] via-blue-500/[0.16] to-indigo-500/[0.16]',
  Egyptian: 'from-yellow-500/[0.18] via-orange-500/[0.16] to-red-500/[0.16]',
  Literary: 'from-emerald-500/[0.18] via-teal-500/[0.16] to-cyan-500/[0.16]',
  'The Game Order': 'from-amber-500/20 via-rose-500/[0.16] to-violet-500/[0.16]',
};

export function PantheonAgentCard({
  agent,
  onOpen,
  href,
}: {
  agent: PantheonAgent;
  onOpen?: (agent: PantheonAgent) => void;
  href?: string;
}) {
  const accent = pantheonColors[agent.pantheon] || pantheonColors.Greek;
  const card = (
    <article className="pantheon-card pantheon-premium-transition pantheon-motion-sheen relative h-full overflow-hidden rounded-[2rem] border border-yellow-400/[0.22] bg-[linear-gradient(160deg,rgba(26,31,46,0.92),rgba(18,24,38,0.88)_55%,rgba(13,17,23,0.94))] shadow-[0_18px_42px_rgba(0,0,0,0.28)] group-hover:-translate-y-1.5 group-hover:scale-[1.01] motion-reduce:group-hover:translate-y-0 motion-reduce:group-hover:scale-100">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
      />
      <div className="absolute inset-0 rounded-[inherit] border border-yellow-400/0 transition-colors duration-300 group-hover:border-yellow-400/30" />
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-yellow-200/50 to-transparent" />

      <div className="relative flex h-full flex-col p-5 sm:p-6">
        <div className="mb-5 space-y-3">
          <div className="relative rounded-[1.55rem]">
            <div className="absolute inset-0 rounded-[inherit] border border-yellow-400/[0.14] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.18),rgba(26,31,46,0.78)_68%,rgba(13,17,23,0.9)_100%)]" />
            <div className="absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.12),transparent_45%)]" />

            <div className="relative px-3 py-4 transition-transform duration-500 group-hover:scale-[1.02]">
              <PantheonAgentArtwork agent={agent} />
            </div>
          </div>

          <PantheonAgentPortrait agent={agent} className="shadow-[0_14px_35px_rgba(0,0,0,0.22)]" />
        </div>

        <div className="flex flex-1 flex-col text-center">
          <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
            <p className="text-[11px] uppercase tracking-[0.34em] text-[#D4AF37]/70">
              {agent.domain}
            </p>
            <span className="rounded-full border border-yellow-300/[0.24] bg-[linear-gradient(135deg,rgba(28,23,12,0.92),rgba(53,38,16,0.82))] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[#F4D57A] shadow-[0_10px_24px_rgba(0,0,0,0.28)] backdrop-blur-md">
              {agent.pantheon}
            </span>
          </div>

          <div className="mb-2 flex items-center justify-center gap-2">
            <span className="text-xl">{agent.emoji}</span>
            <h3 className="font-cinzel text-xl font-bold text-[#F8F2DF] transition-colors group-hover:text-[#D4AF37]">
              {agent.name}
            </h3>
          </div>

          <p className="text-sm text-[#D4AF37]/80">{agent.title}</p>
          <p className="mt-2 min-h-[2.5rem] text-xs uppercase tracking-[0.2em] text-[#8B7355]">
            {agent.tagline}
          </p>
          <p className="mt-3 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-[#AFA795]">
            {agent.description}
          </p>

          <div className="mx-auto my-4 h-px w-24 bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent" />

          <div className="mb-4 flex flex-wrap justify-center gap-2">
            {agent.abilities.slice(0, 3).map(ability => (
              <span
                key={ability}
                className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-[#D7CFC0]"
              >
                {ability}
              </span>
            ))}
          </div>

          <div className="mt-auto grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
            {Object.entries(agent.stats).map(([label, value]) => (
              <div key={label}>
                <div className="font-cinzel text-lg font-bold text-white">{value}</div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-gray-500">{label}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-full border border-[#D4AF37]/15 bg-black/25 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-[#AFA795]">
            {agent.status} · Load {agent.load}%
          </div>

          <div className="mt-3 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-3 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-[#F4D57A] transition group-hover:border-[#D4AF37]/50 group-hover:bg-[#D4AF37]/15">
            View agent details
          </div>
        </div>
      </div>
    </article>
  );

  if (href) {
    return (
      <Link
        to={href}
        className="group block h-full w-full rounded-[2rem] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0E14]"
        aria-label={`Open details for ${agent.name}`}
      >
        {card}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onOpen?.(agent)}
      className="group block h-full w-full rounded-[2rem] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0E14]"
      aria-label={`Open details for ${agent.name}`}
    >
      {card}
    </button>
  );
}
