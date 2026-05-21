import type { MetaFunction } from '@remix-run/node';
import { Link, useParams } from '@remix-run/react';
import { MotionConfig, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BrainCircuit, Gauge, Sparkles } from 'lucide-react';

import { PantheonAgentArtwork } from '~/components/pantheon-static/PantheonAgentArtwork';
import { PantheonAgentPortrait } from '~/components/pantheon-static/PantheonAgentPortrait';
import { pantheonAgents } from '~/data/pantheon-static';

const agentSpringTransition = {
  type: 'spring',
  stiffness: 260,
  damping: 30,
  mass: 0.9,
} as const;

const agentEase = [0.16, 1, 0.3, 1] as const;

export const meta: MetaFunction<typeof loader> = ({ params }) => {
  const agent = pantheonAgents.find(item => item.id === params.agentId);

  return [
    { title: agent ? `${agent.name} | Pantheon Demo` : 'Agent | Pantheon Demo' },
    {
      name: 'description',
      content: agent
        ? `${agent.name}, ${agent.title}, in the static Pantheon demo.`
        : 'Static Pantheon agent detail page.',
    },
  ];
};

export function loader() {
  return null;
}

export default function PantheonAgentDetailRoute() {
  const params = useParams();
  const agent = pantheonAgents.find(item => item.id === params.agentId);

  if (!agent) {
    return (
      <main className="min-h-screen bg-[#090B11] px-6 py-10 text-[#F8F2DF]">
        <div className="mx-auto max-w-3xl rounded-2xl border border-[#D4AF37]/20 bg-black/30 p-8">
          <Link
            to="/pantheon-demo"
            className="inline-flex items-center gap-2 text-sm text-[#D4AF37]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Pantheon
          </Link>
          <h1 className="font-cinzel mt-8 text-3xl font-bold">Agent not found</h1>
        </div>
      </main>
    );
  }

  const currentIndex = pantheonAgents.findIndex(item => item.id === agent.id);
  const prevAgent =
    currentIndex > 0 ? pantheonAgents[currentIndex - 1] : pantheonAgents[pantheonAgents.length - 1];
  const nextAgent =
    currentIndex >= 0 && currentIndex < pantheonAgents.length - 1
      ? pantheonAgents[currentIndex + 1]
      : pantheonAgents[0];
  const relatedAgents = pantheonAgents
    .filter(item => item.pantheon === agent.pantheon && item.id !== agent.id)
    .slice(0, 3);

  return (
    <MotionConfig reducedMotion="user" transition={agentSpringTransition}>
      <main className="marble-dark min-h-screen bg-[#090B11] text-[#F8F2DF]">
        <div className="sticky top-0 z-20 border-b border-[#D4AF37]/15 bg-[#090B11]/95 px-4 py-3 backdrop-blur-xl sm:px-6">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <Link
              to="/pantheon-demo"
              className="inline-flex w-fit items-center gap-3 rounded-full pr-2 text-left transition hover:text-[#D4AF37]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-yellow-300/15 bg-white/[0.03]">
                <ArrowLeft className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-[10px] uppercase tracking-[0.28em] text-[#D4AF37]/60">
                  Pantheon
                </span>
                <span className="text-sm text-gray-200">Back to agents</span>
              </span>
            </Link>

            <div className="border-yellow-300/12 flex items-center justify-between gap-2 rounded-full border bg-black/25 p-1.5">
              <Link
                to={`/pantheon-demo/dashboard/pantheon/${prevAgent.id}`}
                className="inline-flex h-10 items-center gap-2 rounded-full px-3 text-gray-300 transition hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
                aria-label={`Previous agent: ${prevAgent.name}`}
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden max-w-[8rem] truncate text-sm sm:inline">
                  {prevAgent.name}
                </span>
              </Link>
              <div className="flex h-10 min-w-[4.8rem] flex-col items-center justify-center rounded-full border border-yellow-300/10 bg-white/[0.03] px-3 text-center">
                <span className="text-[9px] uppercase tracking-[0.24em] text-[#D4AF37]/45">
                  Agent
                </span>
                <span className="text-sm font-medium text-[#F3E2B0]">
                  {currentIndex + 1}
                  <span className="px-1.5 text-[#D4AF37]/40">/</span>
                  {pantheonAgents.length}
                </span>
              </div>
              <Link
                to={`/pantheon-demo/dashboard/pantheon/${nextAgent.id}`}
                className="inline-flex h-10 items-center gap-2 rounded-full px-3 text-gray-300 transition hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
                aria-label={`Next agent: ${nextAgent.name}`}
              >
                <span className="hidden max-w-[8rem] truncate text-sm sm:inline">
                  {nextAgent.name}
                </span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36, ease: agentEase }}
            className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.42, ease: agentEase }}
              className="relative mx-auto w-full max-w-[38rem]"
            >
              <div className="absolute inset-4 rounded-[2.5rem] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.18),rgba(6,6,12,0.08)_52%,transparent_72%)] blur-2xl" />
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={agentSpringTransition}
                className="pantheon-premium-transition border-yellow-300/14 relative overflow-hidden rounded-[2rem] border bg-[linear-gradient(180deg,rgba(18,16,12,0.92),rgba(6,6,12,0.98))] p-3 shadow-[0_32px_90px_rgba(0,0,0,0.5)]"
              >
                <PantheonAgentPortrait
                  agent={agent}
                  className="border-yellow-300/12 rounded-[1.6rem] shadow-[inset_0_1px_0_rgba(255,248,214,0.08)]"
                />
              </motion.div>

              <div className="absolute bottom-5 right-5 w-[8.75rem] sm:w-[10rem]">
                <div className="border-yellow-300/18 rounded-[1.5rem] border bg-[linear-gradient(180deg,rgba(11,11,18,0.94),rgba(6,6,12,0.9))] p-3 shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur-md">
                  <p className="mb-2 text-center text-[10px] uppercase tracking-[0.3em] text-[#D4AF37]/60">
                    Divine Sigil
                  </p>
                  <PantheonAgentArtwork agent={agent} />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: agentEase, delay: 0.08 }}
              className="pt-1"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="text-5xl">{agent.emoji}</span>
                <span className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-sm text-[#D4AF37]">
                  {agent.pantheon}
                </span>
              </div>
              <p className="font-cinzel mb-2 text-sm uppercase tracking-[0.2em] text-[#D4AF37]/80">
                {agent.domain}
              </p>
              <h1 className="font-cinzel text-gold-gradient text-4xl font-black sm:text-5xl">
                {agent.name}
              </h1>
              <p className="font-cinzel mt-2 text-xl text-[#D4AF37]/80">{agent.tagline}</p>
              <p className="mt-2 text-lg text-gray-400">{agent.title}</p>
              <p className="mt-6 text-sm leading-7 text-gray-300">{agent.description}</p>

              <div className="mt-6 rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-4 py-3 text-sm text-[#F4D57A]">
                Summon is disabled in this portfolio demo. The detail view is static and cannot
                create tasks or spawn agents.
              </div>
            </motion.div>
          </motion.section>

          <section className="mt-8 grid gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.34, ease: agentEase }}
              className="rounded-2xl border border-yellow-400/10 bg-[#0a0a12]/80 p-5"
            >
              <div className="mb-5 flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-[#D4AF37]" />
                <h2 className="font-cinzel text-xl font-bold text-white">Divine Abilities</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {agent.abilities.map(ability => (
                  <div
                    key={ability}
                    className="pantheon-premium-transition rounded-xl border border-white/10 bg-white/[0.04] p-3 text-center text-sm text-gray-300 hover:-translate-y-0.5 hover:border-[#D4AF37]/25 motion-reduce:hover:translate-y-0"
                  >
                    {ability}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.34, ease: agentEase, delay: 0.06 }}
              className="rounded-2xl border border-yellow-400/10 bg-[#0a0a12]/80 p-5"
            >
              <div className="mb-5 flex items-center gap-3">
                <Gauge className="h-5 w-5 text-[#D4AF37]" />
                <h2 className="font-cinzel text-xl font-bold text-white">Divine Attributes</h2>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {Object.entries(agent.stats).map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-white/10 bg-black/25 p-3 text-center"
                  >
                    <div className="font-cinzel text-2xl font-bold text-white">{value}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-gray-500">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-[#D4AF37]/15 bg-black/25 px-3 py-2 text-xs uppercase tracking-[0.18em] text-[#AFA795]">
                {agent.status} · Load {agent.load}% · {agent.lane}
              </div>
            </motion.div>
          </section>

          <motion.section
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.34, ease: agentEase }}
            className="mt-8 rounded-2xl border border-yellow-400/10 bg-[#0a0a12]/80 p-6"
          >
            <div className="mb-5 flex items-center gap-3">
              <BrainCircuit className="h-5 w-5 text-[#D4AF37]" />
              <h2 className="font-cinzel text-xl font-bold text-white">Ancient Lore</h2>
            </div>
            {agent.lore.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-5 text-sm leading-7 text-gray-300 last:mb-0">
                {paragraph}
              </p>
            ))}
          </motion.section>

          {relatedAgents.length > 0 ? (
            <section className="mt-8">
              <h2 className="font-cinzel mb-4 flex items-center gap-2 text-xl font-bold text-[#F4D57A]">
                <Sparkles className="h-5 w-5 text-[#D4AF37]" />
                Kindred Spirits of {agent.pantheon}
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {relatedAgents.map((related, index) => (
                  <motion.div
                    key={related.id}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -4 }}
                    viewport={{ once: true }}
                    transition={{ ...agentSpringTransition, delay: index * 0.06 }}
                  >
                    <Link
                      to={`/pantheon-demo/dashboard/pantheon/${related.id}`}
                      className="pantheon-premium-transition block rounded-2xl border border-yellow-400/10 bg-[linear-gradient(160deg,rgba(10,10,18,0.92),rgba(20,22,34,0.88))] p-4 text-center hover:border-[#D4AF37]/40"
                    >
                      <div className="mb-3 rounded-[1.2rem] border border-yellow-400/10 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12),rgba(10,10,18,0.96)_72%)] px-3 py-4">
                        <PantheonAgentArtwork agent={related} />
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span>{related.emoji}</span>
                        <h3 className="font-cinzel font-bold text-white">{related.name}</h3>
                      </div>
                      <p className="mt-2 text-sm text-[#D4AF37]/80">{related.title}</p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </main>
    </MotionConfig>
  );
}
