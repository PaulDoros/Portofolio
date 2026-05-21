import { Link, useNavigate } from '@remix-run/react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import {
  ArrowLeft,
  BrainCircuit,
  Factory,
  Menu,
  ScrollText,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import { useMemo, useState } from 'react';

import { PantheonAgentCard } from './PantheonAgentCard';
import { PantheonAgentPortrait } from './PantheonAgentPortrait';
import {
  commanderAgents,
  commanderState,
  archiveRecords,
  calendarEvents,
  calliopeStory,
  calliopeStories,
  dashboardNavItems,
  demoMessages,
  demoForgeTemplates,
  factoryProjects,
  guardrails,
  memoryRecords,
  pantheonAgents,
  productionLaneTabs,
  projectVault,
  taskColumns,
  templateBlueprints,
  type DemoTaskStatus,
  type DemoSection,
  type DemoForgeTemplate,
  type DemoSimulatedTask,
  type DemoSimulationMessage,
  type PantheonAgent,
} from '~/data/pantheon-static';

function getLaneCount(laneId: string) {
  if (laneId === 'game-order') {
    return pantheonAgents.filter(agent => agent.lane === 'The Game Order').length;
  }

  if (laneId === 'media') {
    return 0;
  }

  return pantheonAgents.filter(agent => agent.lane !== 'The Game Order').length;
}

const statusConfig: Record<DemoTaskStatus, { label: string; stage: string; className: string }> = {
  inbox: {
    label: 'Inbox',
    stage: 'Offerings',
    className: 'border-stone-400/30 bg-stone-500/10 text-stone-200',
  },
  assigned: {
    label: 'Assigned',
    stage: 'Blessed',
    className: 'border-blue-400/30 bg-blue-500/10 text-blue-200',
  },
  in_progress: {
    label: 'In Progress',
    stage: 'Forging',
    className: 'border-orange-400/30 bg-orange-500/10 text-orange-200',
  },
  testing: {
    label: 'Testing',
    stage: 'Trials',
    className: 'border-amber-500/30 bg-amber-500/10 text-amber-200',
  },
  review: {
    label: 'Review',
    stage: 'Judgment',
    className: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
  },
  done: {
    label: 'Done',
    stage: 'Ascended',
    className: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200',
  },
};

const validTransitions: Record<DemoTaskStatus, DemoTaskStatus[]> = {
  inbox: ['assigned', 'in_progress'],
  assigned: ['in_progress', 'inbox'],
  in_progress: ['testing', 'assigned'],
  testing: ['review', 'in_progress'],
  review: ['done', 'testing', 'in_progress'],
  done: ['review'],
};

const pantheonSpringTransition = {
  type: 'spring',
  stiffness: 260,
  damping: 30,
  mass: 0.9,
} as const;

const pantheonEase = [0.16, 1, 0.3, 1] as const;

function formatAgentName(agentId: string) {
  return agentId
    .split(/[-_]/)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function getAgentEmoji(agentId: string) {
  return pantheonAgents.find(agent => agent.id === agentId)?.emoji || '🤖';
}

function getPriorityDivineMark(priority: string) {
  switch (priority) {
    case 'urgent':
      return {
        color: 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]',
        mark: 'Wrath of Zeus',
        icon: '🔴',
      };
    case 'high':
      return {
        color: 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.6)]',
        mark: 'Blessing of Ares',
        icon: '🟠',
      };
    case 'medium':
      return {
        color: 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]',
        mark: 'Favor of Athena',
        icon: '🟡',
      };
    default:
      return { color: 'bg-stone-500', mark: 'Whim of Zephyr', icon: '⚪' };
  }
}

function getColumnColor(columnColor: string) {
  if (columnColor.includes('stone')) return '#78716c';
  if (columnColor.includes('blue')) return '#60a5fa';
  if (columnColor.includes('orange')) return '#f97316';
  if (columnColor.includes('emerald')) return '#10b981';
  if (columnColor.includes('amber')) return '#f59e0b';
  return '#D4AF37';
}

function getTransitionButtons(status: DemoTaskStatus) {
  return validTransitions[status].map(target => ({
    target,
    label: statusConfig[target].stage,
    icon:
      target === 'done'
        ? '👑'
        : target === 'review'
          ? '🦉'
          : target === 'testing'
            ? '⚔️'
            : target === 'in_progress'
              ? '🔥'
              : target === 'assigned'
                ? '✨'
                : '🏺',
  }));
}

function getSubtaskIcon(status: string) {
  if (status === 'in_progress') return '⏳';
  if (status === 'completed') return '✅';
  if (status === 'failed') return '❌';
  return '⭕';
}

function buildSimulationMessages(template: DemoForgeTemplate): DemoSimulationMessage[] {
  return [
    {
      speaker: 'Paul',
      text: template.prompt,
    },
    {
      speaker: 'Kronos',
      text: `${template.name} accepted. I am routing this as a ${template.niche.toLowerCase()} build with static demo boundaries locked.`,
    },
    {
      speaker: 'Zeus',
      text: `Split complete: Aphrodite owns motion and visual direction, Apollo owns responsive implementation, Hermes shapes content, and TALOS validates the preview.`,
    },
    {
      speaker: 'Hephaestus',
      text: `Forge path prepared as ${template.repoLabel}. This public route will simulate creation only; no files, agents, or deployments are touched.`,
    },
  ];
}

function buildSimulatedTask(template: DemoForgeTemplate): DemoSimulatedTask {
  return {
    id: `sim-task-${template.id}`,
    originTemplateId: template.id,
    status: 'in_progress',
    title: template.taskTitle,
    description: `Simulated workflow for ${template.name}: ${template.description}`,
    assignee: 'apollo',
    priority: template.id === 'angelica-bazar' ? 'urgent' : 'high',
    runtime: 'Simulated',
    createdAt: 'Just now',
    dueDate: 'Demo session',
    estimatedHours: 4,
    autoRun: true,
    project: template.repoLabel,
    progressPercent: 67,
    lastProgressMessage: 'Static simulator advanced through Commander and Forge',
    claimedBy: 'apollo',
    currentRunId: `sim_${template.id.replace(/-/g, '_')}`,
    preferredRunner: 'apollo',
    orchestrated: true,
    orchestrationType: 'zeus',
    transitionHistory: [
      { from: 'inbox', to: 'assigned', at: 'Now', by: 'Kronos' },
      { from: 'assigned', to: 'in_progress', at: 'Now', by: 'Zeus' },
    ],
    subtasks: [
      { title: 'Shape content and niche positioning', assignee: 'hermes', status: 'completed' },
      { title: 'Compose high-motion visual system', assignee: 'aphrodite', status: 'in_progress' },
      { title: 'Prepare deploy preview shell', assignee: 'hephaestus', status: 'queued' },
      { title: 'Validate public static boundary', assignee: 'talos', status: 'queued' },
    ],
  };
}

function ShellNav({
  activeSection,
  activeLane,
  onSectionChange,
  onLaneChange,
}: {
  activeSection: DemoSection;
  activeLane: string;
  onSectionChange: (section: DemoSection) => void;
  onLaneChange: (lane: string) => void;
}) {
  return (
    <aside className="hidden min-h-screen w-72 shrink-0 flex-col lg:flex">
      <div className="h-4 bg-gradient-to-b from-[#F5F1E8] via-[#B8941F] to-[#8B7355]" />
      <div className="column-texture relative flex flex-1 flex-col overflow-hidden text-[#1A1F2E]">
        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className="absolute bottom-0 top-0 w-px bg-gradient-to-b from-transparent via-[rgba(80,65,44,0.22)] to-transparent"
              style={{ left: `${10 + index * 10}%` }}
            />
          ))}
        </div>
        <div className="column-shimmer pointer-events-none absolute inset-0" />

        <div className="relative z-10 flex h-full flex-col">
          <div className="border-b border-[rgba(139,115,85,0.3)] p-6 text-center">
            <Link to="/" className="group flex flex-col items-center gap-2">
              <div className="divine-float mb-1 text-4xl">⚡</div>
              <span className="divine-heading text-center text-xl font-bold tracking-widest text-[#B8941F] transition-colors group-hover:text-[#D4AF37]">
                MOUNT
                <br />
                OLYMPUS
              </span>
              <span className="text-[8px] uppercase tracking-[0.3em] text-[#A09080]">
                Digital Pantheon
              </span>
            </Link>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-6">
            {dashboardNavItems.map(item => {
              const section = item.section;
              const active =
                activeSection === section &&
                (!item.lane || (section === 'pantheon' && item.lane === activeLane));
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSectionChange(section);
                    if ('lane' in item && item.lane) {
                      onLaneChange(item.lane);
                    }
                  }}
                  className={`nav-item relative mb-2 flex w-full items-center gap-3 overflow-hidden rounded-lg px-4 py-3 text-left transition-all duration-300 ${
                    active ? 'active-nav-item' : ''
                  } ${item.featured ? 'featured-nav-item' : ''}`}
                >
                  <span
                    className={`absolute left-0 top-1/2 w-1 -translate-y-1/2 rounded-r-full transition-all duration-300 ${
                      active ? 'h-8 bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.8)]' : 'h-0'
                    }`}
                  />
                  <span
                    className={`relative z-10 text-2xl transition ${
                      active ? 'scale-110 drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]' : ''
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="relative z-10 flex min-w-0 flex-col">
                    <span
                      className={`text-sm font-medium tracking-wide ${
                        active ? 'text-[#D4AF37]' : 'text-[#E8E4DC]'
                      }`}
                    >
                      {item.label}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[#A09080]">
                      Realm of {item.divine}
                    </span>
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="border-t border-[rgba(139,115,85,0.3)] p-4 text-center text-[10px] uppercase tracking-[0.2em] text-[#A09080]">
            Blessed by the Gods
          </div>
        </div>
      </div>
      <div className="h-6 bg-gradient-to-t from-[#A09080] via-[#B8941F] to-[#D4AF37]" />
    </aside>
  );
}

function MobileReplicaNav({
  open,
  activeSection,
  activeLane,
  onOpenChange,
  onSectionChange,
  onLaneChange,
}: {
  open: boolean;
  activeSection: DemoSection;
  activeLane: string;
  onOpenChange: (open: boolean) => void;
  onSectionChange: (section: DemoSection) => void;
  onLaneChange: (lane: string) => void;
}) {
  return (
    <>
      <div className="fixed left-4 right-4 top-4 z-50 flex items-center justify-between lg:hidden">
        <button
          type="button"
          onClick={() => onOpenChange(true)}
          className="flex h-11 items-center gap-2 rounded-xl border border-[rgba(212,175,55,0.3)] bg-[rgba(26,31,46,0.9)] px-3 text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.2)] backdrop-blur-xl transition hover:border-[#D4AF37]/60"
          aria-label="Open Pantheon navigation"
        >
          <Menu className="h-5 w-5" />
          <span className="font-cinzel text-xs uppercase tracking-[0.18em]">Olympus</span>
        </button>

        <Link
          to="/"
          className="flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-[rgba(7,7,12,0.82)] px-3 text-[10px] uppercase tracking-[0.18em] text-[#D7CFC0] shadow-[0_0_18px_rgba(0,0,0,0.24)] backdrop-blur-xl transition hover:border-[#D4AF37]/40 hover:text-[#F4D57A]"
        >
          <ArrowLeft className="h-4 w-4" />
          Portfolio
        </Link>
      </div>

      {open ? (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-label="Close Pantheon navigation"
            onClick={() => onOpenChange(false)}
          />
          <div className="absolute left-4 right-4 top-4 overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.3)] bg-[#1a1f2e] shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <div className="border-b border-[rgba(212,175,55,0.2)] bg-gradient-to-b from-[rgba(212,175,55,0.1)] to-transparent p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-1 flex-col items-center gap-2 text-center">
                  <span className="text-3xl">⚡</span>
                  <span className="divine-heading font-bold tracking-widest text-[#D4AF37]">
                    MOUNT OLYMPUS
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#A09080]">
                    Static Digital Pantheon
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#D7CFC0] transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
                  aria-label="Close navigation"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <nav className="max-h-[62vh] overflow-y-auto p-4">
              {dashboardNavItems.map(item => {
                const section = item.section;
                const active =
                  activeSection === section &&
                  (!item.lane || (section === 'pantheon' && item.lane === activeLane));

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onSectionChange(section);
                      if ('lane' in item && item.lane) {
                        onLaneChange(item.lane);
                      }
                      onOpenChange(false);
                    }}
                    className={`mb-2 flex w-full items-center gap-3 rounded-lg border-l-2 px-4 py-3 text-left transition-all duration-300 ${
                      active
                        ? 'border-[#D4AF37] bg-[rgba(212,175,55,0.15)]'
                        : 'border-transparent bg-[rgba(26,31,46,0.6)] hover:border-[rgba(212,175,55,0.4)] hover:bg-[rgba(26,31,46,0.9)]'
                    } ${item.featured ? 'ring-1 ring-[rgba(212,175,55,0.2)]' : ''}`}
                  >
                    <span
                      className={`text-xl transition-all duration-300 ${
                        active ? 'scale-110 drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]' : ''
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span
                        className={`text-sm font-medium tracking-wide ${
                          active ? 'text-[#D4AF37]' : 'text-[#E8E4DC]'
                        }`}
                      >
                        {item.label}
                      </span>
                      <span
                        className={`text-[10px] uppercase tracking-wider ${
                          active ? 'text-[#B8941F]' : 'text-[#A09080]'
                        }`}
                      >
                        Realm of {item.divine}
                      </span>
                    </span>
                    {item.featured ? (
                      <span className="ml-auto text-[10px] text-[#D4AF37]">✦</span>
                    ) : null}
                  </button>
                );
              })}
            </nav>

            <div className="border-t border-[rgba(212,175,55,0.1)] bg-gradient-to-t from-[rgba(212,175,55,0.05)] to-transparent p-3 text-center text-[10px] uppercase tracking-[0.2em] text-[#A09080]">
              Frontend-only demo / no live agents
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function LaneTabs({
  activeLane,
  onLaneChange,
}: {
  activeLane: string;
  onLaneChange: (lane: string) => void;
}) {
  const active = productionLaneTabs.find(lane => lane.id === activeLane) || productionLaneTabs[0];

  return (
    <section className="rounded-2xl border border-[#D4AF37]/20 bg-[linear-gradient(135deg,rgba(15,23,42,0.92),rgba(3,7,18,0.88))] p-4 shadow-[0_18px_55px_rgba(0,0,0,0.25)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#D4AF37]">
            Production Lanes
          </div>
          <h2 className="mt-1 text-xl font-bold text-[#F8F6F0]">{active.label}</h2>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-[#A09080]">{active.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-end">
          {productionLaneTabs.map(lane => {
            const selected = lane.id === activeLane;
            return (
              <button
                key={lane.id}
                type="button"
                onClick={() => onLaneChange(lane.id)}
                className={`group rounded-xl border px-3 py-2 text-left transition-all duration-300 ${
                  selected
                    ? 'border-[#D4AF37]/60 bg-[#D4AF37]/15 text-[#F8F6F0] shadow-[0_0_24px_rgba(212,175,55,0.14)]'
                    : 'border-white/10 bg-white/[0.03] text-[#A09080] hover:border-[#D4AF37]/35 hover:text-[#F8F6F0]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{lane.icon}</span>
                  <span className="text-xs font-semibold uppercase tracking-wide">
                    {lane.shortLabel}
                  </span>
                  {lane.status === 'planned' ? (
                    <span className="rounded-full bg-purple-500/15 px-1.5 py-0.5 text-[8px] uppercase tracking-wide text-purple-200">
                      later
                    </span>
                  ) : null}
                </div>
                <div className="mt-1 text-[10px] text-[#8B7355]">
                  {getLaneCount(lane.id)} agents / Lead: {lane.leader}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-black/20 p-3">
          <div className="text-[10px] uppercase tracking-[0.24em] text-[#8B7355]">Lane leader</div>
          <div className="mt-1 text-sm font-semibold text-[#F8F6F0]">{active.leader}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/20 p-3">
          <div className="text-[10px] uppercase tracking-[0.24em] text-[#8B7355]">Controller</div>
          <div className="mt-1 text-sm font-semibold text-[#F8F6F0]">{active.controller}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/20 p-3">
          <div className="text-[10px] uppercase tracking-[0.24em] text-[#8B7355]">Boundary</div>
          <div className="mt-1 text-sm font-semibold text-[#F8F6F0]">
            {active.id === 'media' ? 'Reserved lane' : 'Dedicated static lane'}
          </div>
        </div>
      </div>
    </section>
  );
}

function SourcePantheonHero() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/5 blur-3xl" />
        <div className="lightning-strike absolute left-1/4 top-0 h-32 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent" />
        <div className="lightning-strike-delayed absolute right-1/3 top-0 h-24 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/20 to-transparent" />
      </div>

      <div className="relative py-16 text-center md:py-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex justify-center"
        >
          <div className="flex items-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <div className="h-3 w-3 rotate-45 border-2 border-[#D4AF37]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 text-5xl font-black tracking-wider md:text-7xl lg:text-8xl"
        >
          <span className="text-gold-gradient">THE PANTHEON</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 text-lg uppercase tracking-[0.3em] text-[#B8941F] md:text-xl"
        >
          Divine Agents of the Digital Realm
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex justify-center"
        >
          <div className="h-px w-48 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl px-4 text-sm leading-relaxed text-gray-400 md:text-base"
        >
          Behold the Mythic Fleet - now organized into clear production lanes for core command,
          website delivery, Game Order development, and future media teams. Each agent has a defined
          chain of command so the work stays powerful without becoming tangled.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex justify-center"
        >
          <div className="flex items-center gap-3">
            <span className="text-[#D4AF37]/50">⚡</span>
            <div className="h-px w-24 bg-gradient-to-r from-[#D4AF37]/50 to-transparent" />
            <span className="text-[#D4AF37]/50">🏛️</span>
            <div className="h-px w-24 bg-gradient-to-l from-[#D4AF37]/50 to-transparent" />
            <span className="text-[#D4AF37]/50">⚡</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function TaskBoard({
  simulatedTasks,
  onSimulateOffering,
}: {
  simulatedTasks: DemoSimulatedTask[];
  onSimulateOffering: () => void;
}) {
  const visibleColumns = taskColumns.map(column => ({
    ...column,
    items: [...simulatedTasks.filter(task => task.status === column.id), ...column.items],
  }));
  const taskCount = visibleColumns.reduce((total, column) => total + column.items.length, 0);

  return (
    <section className="flex h-[calc(100vh-12rem)] min-h-[42rem] flex-col rounded-2xl border border-[#D4AF37]/15 bg-black/[0.18] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.26)]">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="hidden flex-col items-center md:flex">
            <div className="column-texture h-12 w-4 rounded-t" />
            <div className="column-capital h-2 w-6" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#8B7355]">
              Kanban task board · {taskCount} static tasks
            </p>
            <h3 className="font-cinzel text-gold-gradient mt-1 flex items-center gap-3 text-2xl font-bold tracking-[0.14em]">
              <span>📜</span>
              Scrolls of Labor
            </h3>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-[#AFA795]">
              Static copy of the original Pantheon workflow: Offerings, Blessed, Forging, Trials,
              Judgment, and Ascended.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-200">
            Mock data loaded
          </div>
          <button
            type="button"
            onClick={onSimulateOffering}
            className="inline-flex items-center gap-2 rounded-lg border border-[#D4AF37]/30 bg-gradient-to-r from-[#B8941F]/90 via-[#D4AF37] to-[#B8941F]/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0D1117] shadow-[0_0_20px_rgba(212,175,55,0.18)] transition hover:shadow-[0_0_30px_rgba(212,175,55,0.32)]"
            title="Create a local mock task in this static demo"
          >
            <span>✨</span>
            Simulate Offering
          </button>
          <ScrollText className="h-6 w-6 text-[#D4AF37]" />
        </div>
      </div>

      <div className="flex flex-1 gap-5 overflow-x-auto pb-3">
        {visibleColumns.map(column => (
          <div key={column.id} className="flex w-72 shrink-0 flex-col">
            <div
              className={`relative overflow-hidden rounded-t-lg border-x border-b-0 border-t-4 border-[rgba(212,175,55,0.2)] bg-gradient-to-br from-[rgba(26,31,46,0.95)] to-[rgba(13,17,23,0.98)] ${column.color}`}
            >
              <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.5)] to-transparent" />
              <div className="p-4">
                <div className="mb-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{column.icon}</span>
                    <h2 className="font-cinzel text-sm font-bold tracking-wider text-[#E8E4DC]">
                      {column.title}
                    </h2>
                  </div>
                  <span className="rounded-full border border-[rgba(139,115,85,0.3)] bg-[rgba(139,115,85,0.2)] px-2 py-1 text-xs text-[#A09080]">
                    {column.items.length}
                  </span>
                </div>
                <p className="text-[10px] uppercase tracking-wider text-[#A09080]">
                  {column.subtitle}
                </p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-[#B8941F]">
                  Realm of {column.divine}
                </p>
              </div>
              <div className="h-2 bg-gradient-to-r from-[rgba(212,175,55,0.1)] via-[rgba(212,175,55,0.3)] to-[rgba(212,175,55,0.1)]" />
            </div>

            <div className="relative flex-1 space-y-3 overflow-y-auto border-x border-[rgba(212,175,55,0.15)] bg-gradient-to-b from-[rgba(26,31,46,0.8)] to-[rgba(13,17,23,0.9)] p-3">
              <div className="pointer-events-none absolute inset-0 opacity-30">
                {[0, 1, 2, 3, 4].map(index => (
                  <div
                    key={index}
                    className="absolute bottom-0 top-0 w-px bg-gradient-to-b from-transparent via-[rgba(212,175,55,0.2)] to-transparent"
                    style={{ left: `${20 + index * 15}%` }}
                  />
                ))}
              </div>

              {column.items.map((item, index) => {
                const priority = getPriorityDivineMark(item.priority);
                const status = statusConfig[column.id];
                const columnColor = getColumnColor(column.color);

                return (
                  <article
                    key={item.id}
                    className="group relative overflow-hidden rounded-lg border border-[rgba(212,175,55,0.15)] bg-gradient-to-br from-[rgba(26,31,46,0.95)] to-[rgba(13,17,23,0.98)] p-4 text-xs text-[#D7CFC0] transition-all duration-300 hover:border-[rgba(212,175,55,0.4)] hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div
                      className="absolute left-0 top-0 h-full w-1 rounded-l-lg"
                      style={{ background: columnColor }}
                    />
                    <div className="pointer-events-none absolute right-0 top-0 h-16 w-16 overflow-hidden rounded-tr-lg">
                      <div
                        className={`absolute right-2 top-2 h-3 w-3 rounded-full ${priority.color}`}
                      />
                    </div>

                    <div className="pl-2 pr-4">
                      <h3 className="font-semibold leading-tight text-[#F5F1E8] transition-colors group-hover:text-[#D4AF37]">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-[11px] leading-relaxed text-[#A09080]">
                        {formatAgentName(item.assignee)} · {item.runtime} ·{' '}
                        <span className="text-[#B8941F]">{status.stage}</span>
                      </p>
                    </div>

                    <p className="mt-3 line-clamp-3 pl-2 text-xs leading-relaxed text-[#A09080]">
                      {item.description}
                    </p>

                    <div className="ml-2 mt-3 flex items-center gap-1.5 rounded border border-[rgba(74,155,155,0.2)] bg-[rgba(74,155,155,0.1)] px-2 py-1 text-[10px] text-[#4A9B9B]">
                      <span>📁</span>
                      <span className="truncate font-mono" title={item.project}>
                        {item.project}
                      </span>
                    </div>

                    <div className="ml-2 mt-3 grid grid-cols-2 gap-2 text-[10px]">
                      <div
                        className={`rounded border px-2 py-1 ${item.autoRun ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300' : 'border-stone-500/20 bg-stone-500/10 text-stone-300'}`}
                      >
                        🤖 Auto-run: {item.autoRun ? 'On' : 'Off'}
                      </div>
                      <div className="rounded border border-sky-500/20 bg-sky-500/10 px-2 py-1 text-sky-200">
                        📅 Due: {item.dueDate}
                      </div>
                      <div className="rounded border border-fuchsia-500/20 bg-fuchsia-500/10 px-2 py-1 text-fuchsia-200">
                        ⏱️ Est: {item.estimatedHours}h
                      </div>
                      <div className="rounded border border-amber-500/20 bg-amber-500/10 px-2 py-1 text-amber-200">
                        🚦 {item.runtime}
                      </div>
                      <div className="col-span-2 rounded border border-violet-500/20 bg-violet-500/10 px-2 py-1 text-violet-200">
                        📈 Progress:{' '}
                        {typeof item.progressPercent === 'number'
                          ? `${item.progressPercent}%`
                          : '-'}
                        {item.lastProgressMessage ? ` · ${item.lastProgressMessage}` : ''}
                      </div>
                      <div className="col-span-2 rounded border border-amber-500/20 bg-amber-500/10 px-2 py-1 text-amber-200">
                        🔐 Claim:{' '}
                        {item.claimedBy
                          ? `${formatAgentName(item.claimedBy)}${item.currentRunId ? ` · Run ${item.currentRunId.slice(0, 8)}` : ''}`
                          : 'Unclaimed'}
                      </div>
                    </div>

                    {item.orchestrated ? (
                      <div className="ml-2 mt-3 flex items-center gap-1.5 rounded border border-[rgba(212,175,55,0.2)] bg-[rgba(212,175,55,0.1)] px-2 py-1 text-[10px] text-[#D4AF37]">
                        <span>⚡</span>
                        <span>
                          Orchestrated by {item.orchestrationType === 'zeus' ? 'Zeus' : 'System'}
                        </span>
                        {item.subtasks.length > 0 ? (
                          <span className="ml-auto text-[#8B7355]">
                            ({item.subtasks.length} subtasks)
                          </span>
                        ) : null}
                      </div>
                    ) : null}

                    {item.transitionHistory.length > 0 ? (
                      <div className="ml-2 mt-3 rounded border border-[rgba(139,115,85,0.1)] bg-[rgba(139,115,85,0.05)] p-2">
                        <p className="mb-1 text-[10px] uppercase tracking-wider text-[#8B7355]">
                          Journey
                        </p>
                        <div className="space-y-1">
                          {item.transitionHistory.slice(-2).map((transition, transitionIndex) => (
                            <div
                              key={`${transition.at}-${transitionIndex}`}
                              className="flex items-center gap-1.5 text-[9px]"
                            >
                              <span className="text-[#6B5B4F]">
                                {statusConfig[transition.from].stage}
                              </span>
                              <span className="text-[#4A9B9B]">→</span>
                              <span className="text-[#B8941F]">
                                {statusConfig[transition.to].stage}
                              </span>
                              <span className="ml-auto text-[#6B5B4F]">{transition.at}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {item.subtasks.length > 0 ? (
                      <div className="ml-2 mt-3 rounded border border-[rgba(212,175,55,0.1)] bg-[rgba(212,175,55,0.05)] p-2">
                        <p className="mb-1 text-[10px] text-[#B8941F]">
                          ⚡ {item.subtasks.length} Delegated Subtask
                          {item.subtasks.length > 1 ? 's' : ''}
                        </p>
                        {item.subtasks.slice(0, 4).map(subtask => (
                          <div
                            key={`${item.id}-${subtask.title}`}
                            className="flex items-start gap-2 py-1 text-[10px] text-[#8B7355]"
                          >
                            <span className="mt-0.5">{getSubtaskIcon(subtask.status)}</span>
                            <div className="min-w-0 flex-1">
                              <div className="truncate text-[#D7CFC3]">{subtask.title}</div>
                              <div className="mt-0.5 flex items-center gap-2 text-[9px] text-[#8B7355]">
                                <span>Owner: {formatAgentName(subtask.assignee)}</span>
                                <span>·</span>
                                <span>
                                  Status:{' '}
                                  {subtask.status === 'in_progress' ? 'Forging' : subtask.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    <div className="mt-3 flex items-center justify-between pl-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-[rgba(212,175,55,0.2)] bg-[rgba(212,175,55,0.1)] px-2 py-1 text-xs text-[#D4AF37]">
                          {getAgentEmoji(item.assignee)} {formatAgentName(item.assignee)}
                        </span>
                        <span
                          className={`rounded-full border px-2 py-1 text-[10px] uppercase tracking-[0.15em] ${status.className}`}
                        >
                          {status.label}
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-[#A09080]">
                        {priority.icon} {priority.mark}
                      </span>
                    </div>

                    <div className="mt-3 border-t border-[rgba(139,115,85,0.2)] pl-2 pt-3">
                      <div className="mb-2 flex items-center justify-between">
                        <p className="text-[10px] uppercase tracking-wider text-[#6B5B4F]">
                          Advance to
                        </p>
                        <span className="rounded border border-sky-500/20 bg-sky-500/10 px-2 py-1 text-[9px] text-sky-200">
                          ✏️ Edit disabled
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {getTransitionButtons(column.id).map(button => (
                          <button
                            key={`${item.id}-${button.target}`}
                            type="button"
                            disabled
                            className="flex items-center gap-1 rounded border border-[rgba(212,175,55,0.2)] bg-[rgba(212,175,55,0.1)] px-2 py-1 text-[9px] text-[#B8941F] opacity-80"
                            title="Transitions are disabled in the public static demo"
                          >
                            <span>{button.icon}</span>
                            <span>{button.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </article>
                );
              })}

              {column.items.length === 0 ? (
                <div className="py-8 text-center">
                  <div className="mb-2 text-3xl opacity-30">🏛️</div>
                  <p className="text-xs uppercase tracking-wider text-[#A09080]">Empty Sanctum</p>
                </div>
              ) : null}
            </div>

            <div className="h-3 rounded-b-lg border-x border-b border-[rgba(212,175,55,0.15)] bg-gradient-to-b from-[rgba(139,115,85,0.3)] to-[rgba(139,115,85,0.1)]" />
          </div>
        ))}
      </div>
    </section>
  );
}

function FactorySurface({
  selectedTemplate,
  simulatedProjects,
  onSelectTemplate,
  onCreateProject,
  onDeployPreview,
  onPreviewTemplate,
}: {
  selectedTemplate: DemoForgeTemplate;
  simulatedProjects: DemoForgeTemplate[];
  onSelectTemplate: (template: DemoForgeTemplate) => void;
  onCreateProject: (template?: DemoForgeTemplate) => void;
  onDeployPreview: (template?: DemoForgeTemplate) => void;
  onPreviewTemplate: (template: DemoForgeTemplate) => void;
}) {
  const simulatedProjectIds = new Set(simulatedProjects.map(project => project.id));
  const activeProjects =
    factoryProjects.filter(project => project.status !== 'completed').length +
    simulatedProjects.length;
  const tasksToday = simulatedProjects.length + 6;
  const agentsWorking = new Set(factoryProjects.flatMap(project => project.agents)).size;
  const filterTabs = [
    { id: 'all', label: 'All Projects', icon: '🏭' },
    { id: 'planning', label: 'Planning', icon: '📋' },
    { id: 'in_progress', label: 'In Progress', icon: '🔥' },
    { id: 'completed', label: 'Completed', icon: '👑' },
    { id: 'paused', label: 'Paused', icon: '⏸️' },
    { id: 'archived', label: 'Archived', icon: '📦' },
  ];

  return (
    <section className="flex h-full flex-col">
      <div className="mb-8 border-b border-[#D4AF37]/30 pb-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-6">
            <div className="hidden flex-col items-center md:flex">
              <div className="column-texture h-16 w-4 rounded-t" />
              <div className="column-capital h-2 w-6" />
            </div>

            <div>
              <h1 className="divine-heading text-gold-gradient flex items-center gap-3 text-3xl font-bold tracking-[0.15em]">
                🏭 HEPHAESTUS&apos; FORGE
              </h1>
              <p className="mt-1 text-sm tracking-wide text-[#A09080]">
                Where divine projects are forged
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onCreateProject()}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#B8941F] via-[#D4AF37] to-[#B8941F] px-5 py-3 font-bold tracking-wider text-[#0D1117] transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
            >
              <span>⚒️</span>
              <span>New Project</span>
              <span>⚒️</span>
            </button>
            <button
              type="button"
              onClick={() => onDeployPreview()}
              className="flex items-center gap-2 rounded-lg border border-emerald-300/25 bg-emerald-300/10 px-4 py-3 text-sm font-semibold text-emerald-200 transition hover:border-emerald-300/50"
            >
              🚀 Deploy Preview
            </button>
          </div>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          {
            label: 'Active Projects',
            value: activeProjects,
            icon: '🔥',
            color: 'from-orange-500/20 to-amber-500/10',
          },
          {
            label: 'Tasks Today',
            value: tasksToday,
            icon: '📋',
            color: 'from-blue-500/20 to-cyan-500/10',
          },
          {
            label: 'Agents Working',
            value: agentsWorking,
            icon: '⚡',
            color: 'from-purple-500/20 to-pink-500/10',
          },
        ].map(stat => (
          <motion.div
            key={stat.label}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={pantheonSpringTransition}
            className={`pantheon-premium-transition relative overflow-hidden rounded-lg border border-[rgba(212,175,55,0.2)] bg-gradient-to-br ${stat.color} p-4`}
          >
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#A09080]">{stat.label}</p>
                <p className="mt-1 text-2xl font-bold text-[#E8E4DC]">{stat.value}</p>
              </div>
              <span className="text-3xl">{stat.icon}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        {filterTabs.map((tab, index) => (
          <motion.button
            key={tab.id}
            type="button"
            onClick={() => {
              const template = demoForgeTemplates[index % demoForgeTemplates.length];
              onSelectTemplate(template);
            }}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
              selectedTemplate.status === tab.id || (tab.id === 'all' && selectedTemplate.id)
                ? 'border border-[#D4AF37]/50 bg-[rgba(212,175,55,0.2)] text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                : 'border border-transparent bg-[rgba(26,31,46,0.6)] text-[#A09080] hover:border-[rgba(212,175,55,0.3)]'
            }`}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={pantheonSpringTransition}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </motion.button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 gap-5 pb-8 md:grid-cols-2 lg:grid-cols-3">
          {factoryProjects.map((project, index) => {
            const template =
              demoForgeTemplates.find(item => item.id === project.templateId) ||
              demoForgeTemplates[0];
            const simulated = simulatedProjectIds.has(project.templateId);

            return (
              <motion.article
                key={project.name}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ ...pantheonSpringTransition, delay: index * 0.04 }}
                className={`pantheon-premium-transition pantheon-motion-sheen group overflow-hidden rounded-2xl border bg-[linear-gradient(145deg,rgba(26,31,46,0.92),rgba(13,17,23,0.98))] ${
                  selectedTemplate.id === project.templateId
                    ? 'border-[#D4AF37]/55 shadow-[0_0_30px_rgba(212,175,55,0.13)]'
                    : 'border-[#D4AF37]/20'
                }`}
              >
                <div
                  className="h-2 w-full"
                  style={{
                    background: `linear-gradient(90deg, ${template.accent}66, ${template.accent})`,
                  }}
                />
                <div className="p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div
                      className="flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium"
                      style={{
                        borderColor: `${template.accent}66`,
                        color: template.accent,
                        backgroundColor: `${template.accent}18`,
                      }}
                    >
                      <span>{template.icon}</span>
                      <span>{project.type}</span>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-400/20 text-xs font-bold text-emerald-200">
                      {simulated ? 'SIM' : `${project.progress}%`}
                    </div>
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-[#E8E4DC] transition-colors group-hover:text-[#D4AF37]">
                    {project.name}
                  </h3>
                  <p className="mb-3 line-clamp-2 text-sm text-[#A09080]">{project.description}</p>

                  <div className="mb-3 rounded-lg border border-[rgba(212,175,55,0.12)] bg-[rgba(13,17,23,0.35)] px-3 py-2">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.18em] text-[#8B7355]">
                      Workspace
                    </p>
                    <p className="line-clamp-2 break-all text-xs text-[#D4AF37]">
                      {template.repoLabel}
                    </p>
                  </div>

                  <div className="mb-4 grid grid-cols-1 gap-2 text-xs md:grid-cols-2">
                    <div className="rounded-lg border border-[rgba(139,115,85,0.18)] bg-[rgba(26,31,46,0.45)] px-3 py-2">
                      <p className="mb-1 text-[10px] uppercase tracking-[0.18em] text-[#8B7355]">
                        Delivery
                      </p>
                      <p className="font-medium text-[#E8E4DC]">
                        {simulated ? 'Preview ready' : 'Static workspace'}
                      </p>
                      <p className="mt-1 line-clamp-2 break-all text-[#A09080]">
                        {simulated ? template.previewUrl : 'No public URL yet'}
                      </p>
                    </div>
                    <div className="rounded-lg border border-[rgba(139,115,85,0.18)] bg-[rgba(26,31,46,0.45)] px-3 py-2">
                      <p className="mb-1 text-[10px] uppercase tracking-[0.18em] text-[#8B7355]">
                        Forge run
                      </p>
                      <p className="font-medium capitalize text-[#E8E4DC]">
                        {simulated ? 'in progress' : project.status}
                      </p>
                      <p className="mt-1 line-clamp-2 text-[#A09080]">
                        Assigned to {project.agents[0]}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.agents.slice(0, 4).map(agent => (
                      <span
                        key={agent}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-[10px] text-[#D7CFC0]"
                      >
                        {agent}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      to={`/pantheon-demo/dashboard/factory/${template.id}`}
                      className="rounded-lg border border-[rgba(212,175,55,0.35)] bg-[rgba(212,175,55,0.16)] px-3 py-2 text-xs font-medium text-[#D4AF37] transition-all hover:bg-[rgba(212,175,55,0.22)]"
                    >
                      Open Forge Details
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectTemplate(template);
                        onCreateProject(template);
                      }}
                      className="rounded-lg border border-[rgba(59,130,246,0.3)] bg-[rgba(59,130,246,0.14)] px-3 py-2 text-xs font-medium text-blue-200 transition-all hover:bg-[rgba(59,130,246,0.22)]"
                    >
                      Continue build
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectTemplate(template);
                        onDeployPreview(template);
                      }}
                      className="rounded-lg border border-[rgba(168,85,247,0.3)] bg-[rgba(168,85,247,0.14)] px-3 py-2 text-xs font-medium text-purple-200 transition-all hover:bg-[rgba(168,85,247,0.22)]"
                    >
                      Chat in Commander
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-black/[0.24] p-4">
          <div className="mb-4 flex items-center gap-2">
            <Factory className="h-5 w-5 text-[#D4AF37]" />
            <h3 className="font-cinzel text-lg text-[#F8F2DF]">Template vault</h3>
          </div>
          <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
            {templateBlueprints.map(template => (
              <div
                key={template}
                className="rounded-xl border border-white/[0.08] bg-white/[0.035] px-3 py-3 text-xs leading-5 text-[#D7CFC0]"
              >
                {template}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type VaultPriority = 'P0' | 'P1' | 'P2' | 'P3';
type VaultStatus = 'active' | 'stalled' | 'archived';
type ProjectVaultRecord = (typeof projectVault)[number];

const projectPriorityMeta: Record<VaultPriority, { color: string; icon: string; label: string }> = {
  P0: { color: '#DC143C', icon: '⚡', label: 'P0 - Critical' },
  P1: { color: '#D4AF37', icon: '🔥', label: 'P1 - High' },
  P2: { color: '#1E90FF', icon: '💧', label: 'P2 - Medium' },
  P3: { color: '#228B22', icon: '🌱', label: 'P3 - Low' },
};

const projectStatusMeta: Record<VaultStatus, { color: string; label: string }> = {
  active: { color: '#228B22', label: 'Active' },
  stalled: { color: '#F59E0B', label: 'Stalled' },
  archived: { color: '#6B7280', label: 'Archived' },
};

function getVaultPriority(project: ProjectVaultRecord): VaultPriority {
  return project.priority as VaultPriority;
}

function getVaultStatus(project: ProjectVaultRecord): VaultStatus {
  return project.status as VaultStatus;
}

function getVaultProjectTemplate(project: ProjectVaultRecord) {
  return demoForgeTemplates.find(item => item.name === project.name);
}

function ProjectVaultCard({
  project,
  onPreviewTemplate,
}: {
  project: ProjectVaultRecord;
  onPreviewTemplate: (template: DemoForgeTemplate) => void;
}) {
  const template = getVaultProjectTemplate(project);
  const priority = getVaultPriority(project);
  const status = getVaultStatus(project);
  const priorityMeta = projectPriorityMeta[priority];
  const statusMeta = projectStatusMeta[status];
  const displayPath = project.path.replace('/data/repos/', '');
  const opensLivePreview =
    template?.id === 'angelica-bazar' ||
    template?.id === 'noir-table' ||
    template?.id === 'pulsefit-studio' ||
    template?.id === 'summit-realty' ||
    template?.id === 'novadent-clinic' ||
    template?.id === 'atlas-legal';

  return (
    <motion.article
      layout
      whileHover={{ y: -4 }}
      transition={pantheonSpringTransition}
      className="pantheon-premium-transition pantheon-motion-sheen group relative overflow-hidden rounded-xl bg-[rgba(26,31,46,0.8)]"
      style={{
        border: '1px solid rgba(74, 74, 90, 0.5)',
        borderTop: `3px solid ${priorityMeta.color}`,
      }}
    >
      <div
        className="absolute right-3 top-3 rounded-full px-2 py-1 text-xs font-bold uppercase tracking-wider"
        style={{
          backgroundColor: `${priorityMeta.color}20`,
          color: priorityMeta.color,
          border: `1px solid ${priorityMeta.color}40`,
        }}
      >
        {priority}
      </div>

      <div className="p-5">
        <div className="mb-3 flex items-start gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xl"
            style={{ backgroundColor: `${priorityMeta.color}15` }}
          >
            {priorityMeta.icon}
          </div>
          <div className="min-w-0 flex-1 pr-12">
            <h3 className="truncate text-lg font-semibold text-[#E8E4DC] transition-colors group-hover:text-[#D4AF37]">
              {project.name}
            </h3>
            <p className="truncate font-mono text-xs text-[#A09080]">{displayPath}</p>
          </div>
        </div>

        <p className="mb-4 line-clamp-2 min-h-[2.5rem] text-sm text-[#8A8A9A]">
          {project.description}
        </p>

        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: statusMeta.color }} />
            <span className="text-xs capitalize" style={{ color: statusMeta.color }}>
              {statusMeta.label}
            </span>
          </div>
          <span className="text-xs text-[#A09080]">{project.updated}</span>
        </div>

        <div className="flex gap-2 border-t border-[#4A4A5A]/50 pt-3">
          {template ? (
            opensLivePreview ? (
              <a
                href={template.previewUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 rounded-md border border-[#4A4A5A]/70 px-3 py-2 text-center text-xs text-[#E8E4DC] transition hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
              >
                <span className="mr-1">📝</span> Open
              </a>
            ) : (
              <button
                type="button"
                onClick={() => onPreviewTemplate(template)}
                className="flex-1 rounded-md border border-[#4A4A5A]/70 px-3 py-2 text-xs text-[#E8E4DC] transition hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
              >
                <span className="mr-1">📝</span> Open
              </button>
            )
          ) : (
            <button
              type="button"
              disabled
              className="flex-1 cursor-not-allowed rounded-md border border-[#4A4A5A]/40 px-3 py-2 text-xs text-[#6B6B75]"
            >
              <span className="mr-1">📝</span> Open
            </button>
          )}

          {template ? (
            <Link
              to={`/pantheon-demo/dashboard/factory/${template.id}`}
              className="flex-1 rounded-md border border-[#4A4A5A]/70 px-3 py-2 text-center text-xs text-[#E8E4DC] transition hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
            >
              <span className="mr-1">📄</span> README
            </Link>
          ) : (
            <button
              type="button"
              disabled
              className="flex-1 cursor-not-allowed rounded-md border border-[#4A4A5A]/40 px-3 py-2 text-xs text-[#6B6B75]"
            >
              <span className="mr-1">📄</span> README
            </button>
          )}
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${priorityMeta.color}05 0%, transparent 50%, ${priorityMeta.color}02 100%)`,
        }}
      />
    </motion.article>
  );
}

function ProjectVaultSurface({
  onPreviewTemplate,
}: {
  onPreviewTemplate: (template: DemoForgeTemplate) => void;
}) {
  const [projectSearchQuery, setProjectSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<VaultPriority | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<VaultStatus | 'all'>('all');

  const filteredProjects = useMemo(() => {
    const query = projectSearchQuery.trim().toLowerCase();

    return projectVault.filter(project => {
      const priority = getVaultPriority(project);
      const status = getVaultStatus(project);
      const matchesSearch =
        query === '' ||
        project.name.toLowerCase().includes(query) ||
        project.path.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query);
      const matchesPriority = priorityFilter === 'all' || priority === priorityFilter;
      const matchesStatus = statusFilter === 'all' || status === statusFilter;

      return matchesSearch && matchesPriority && matchesStatus;
    });
  }, [priorityFilter, projectSearchQuery, statusFilter]);

  const projectStats = useMemo(
    () => ({
      total: projectVault.length,
      p0: projectVault.filter(project => getVaultPriority(project) === 'P0').length,
      p1: projectVault.filter(project => getVaultPriority(project) === 'P1').length,
      p2: projectVault.filter(project => getVaultPriority(project) === 'P2').length,
      p3: projectVault.filter(project => getVaultPriority(project) === 'P3').length,
      active: projectVault.filter(project => getVaultStatus(project) === 'active').length,
    }),
    []
  );

  const clearProjectFilters = () => {
    setProjectSearchQuery('');
    setPriorityFilter('all');
    setStatusFilter('all');
  };

  const filtersActive = projectSearchQuery || priorityFilter !== 'all' || statusFilter !== 'all';

  return (
    <section className="mx-auto max-w-7xl">
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-3">
          <span className="text-4xl">📁</span>
          <div>
            <h1 className="divine-heading text-gold-gradient text-3xl font-bold">Project Vault</h1>
            <p className="text-sm text-[#A09080]">Realm of Mnemosyne · Memory & Archives</p>
          </div>
        </div>
        <p className="max-w-2xl text-[#8A8A9A]">
          Browse and manage all projects across the pantheon. From critical fleet management to
          learning repositories, all realms are catalogued here.
        </p>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {[
          { label: 'Total', value: projectStats.total, color: '#D4AF37', icon: '📊' },
          { label: 'P0 Critical', value: projectStats.p0, color: '#DC143C', icon: '⚡' },
          { label: 'P1 High', value: projectStats.p1, color: '#D4AF37', icon: '🔥' },
          { label: 'P2 Medium', value: projectStats.p2, color: '#1E90FF', icon: '💧' },
          { label: 'P3 Low', value: projectStats.p3, color: '#228B22', icon: '🌱' },
          { label: 'Active', value: projectStats.active, color: '#228B22', icon: '✨' },
        ].map(stat => (
          <motion.div
            key={stat.label}
            layout
            whileHover={{ y: -3, scale: 1.02 }}
            transition={pantheonSpringTransition}
            className="pantheon-premium-transition rounded-lg p-4 text-center"
            style={{
              background: 'rgba(26, 31, 46, 0.6)',
              border: `1px solid ${stat.color}30`,
            }}
          >
            <div className="mb-1 text-2xl">{stat.icon}</div>
            <div className="text-2xl font-bold" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="text-xs text-[#A09080]">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div
        className="mb-8 flex flex-col gap-4 rounded-xl p-4 md:flex-row"
        style={{
          background: 'rgba(26, 31, 46, 0.4)',
          border: '1px solid rgba(74, 74, 90, 0.3)',
        }}
      >
        <div className="flex-1">
          <label className="mb-2 block text-xs uppercase tracking-wider text-[#A09080]">
            Search Projects
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A09080]" />
            <input
              type="text"
              placeholder="Search by name, path, or description..."
              value={projectSearchQuery}
              onChange={event => setProjectSearchQuery(event.target.value)}
              className="w-full rounded-lg border border-[#D4AF37]/30 bg-[#0D0D12]/80 py-2 pl-10 pr-3 text-[#F8F6F0] outline-none transition focus:border-[#D4AF37]/60 focus:ring-1 focus:ring-[#D4AF37]/20"
            />
          </div>
        </div>

        <div className="w-full md:w-48">
          <label className="mb-2 block text-xs uppercase tracking-wider text-[#A09080]">
            Priority
          </label>
          <select
            value={priorityFilter}
            onChange={event => setPriorityFilter(event.target.value as VaultPriority | 'all')}
            className="w-full rounded-lg border border-[#D4AF37]/30 bg-[#0D0D12]/80 px-3 py-2 text-[#F8F6F0] outline-none transition focus:border-[#D4AF37]/60 focus:ring-1 focus:ring-[#D4AF37]/20"
          >
            <option value="all">All Priorities</option>
            {Object.entries(projectPriorityMeta).map(([value, meta]) => (
              <option key={value} value={value}>
                {meta.label}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-40">
          <label className="mb-2 block text-xs uppercase tracking-wider text-[#A09080]">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={event => setStatusFilter(event.target.value as VaultStatus | 'all')}
            className="w-full rounded-lg border border-[#D4AF37]/30 bg-[#0D0D12]/80 px-3 py-2 text-[#F8F6F0] outline-none transition focus:border-[#D4AF37]/60 focus:ring-1 focus:ring-[#D4AF37]/20"
          >
            <option value="all">All Status</option>
            {Object.entries(projectStatusMeta).map(([value, meta]) => (
              <option key={value} value={value}>
                {meta.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="button"
            onClick={clearProjectFilters}
            className="rounded-lg px-3 py-2 text-sm text-[#A09080] transition hover:bg-white/[0.04] hover:text-[#D4AF37]"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-[#A09080]">
          Showing <strong className="text-[#E8E4DC]">{filteredProjects.length}</strong> of{' '}
          <strong className="text-[#E8E4DC]">{projectVault.length}</strong> projects
        </span>
        {filtersActive ? (
          <span className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/20 px-2 py-1 text-xs text-[#D4AF37]">
            Filters Active
          </span>
        ) : null}
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence initial={false} mode="popLayout">
            {filteredProjects.map(project => (
              <motion.div
                key={project.name}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={pantheonSpringTransition}
              >
                <ProjectVaultCard project={project} onPreviewTemplate={onPreviewTemplate} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div
          className="rounded-xl py-16 text-center"
          style={{
            background: 'rgba(26, 31, 46, 0.4)',
            border: '1px dashed rgba(74, 74, 90, 0.5)',
          }}
        >
          <div className="mb-4 text-6xl">🏛️</div>
          <h3 className="mb-2 text-xl font-semibold text-[#E8E4DC]">No Projects Found</h3>
          <p className="text-[#A09080]">
            Try adjusting your search or filters to find what you seek.
          </p>
        </div>
      )}
    </section>
  );
}

type AssemblyTier = 'Command' | 'Olympian' | 'Specialist' | 'GameOrder' | 'Atmosphere';

type StaticAssemblyAgent = PantheonAgent & {
  tier: AssemblyTier;
  accentColor: string;
  executionStyle: 'orchestrator' | 'specialist' | 'reviewer' | 'researcher' | 'operator' | 'heavy';
  defaultRunner: string;
  defaultApprovalMode: 'supervised' | 'yolo';
  defaultElevated: boolean;
  canOrchestrate: boolean;
  canSplitTasks: boolean;
  workflow: string;
};

const assemblyTierMeta: Record<
  AssemblyTier,
  { label: string; epithet: string; motto: string; order: number }
> = {
  Command: {
    label: 'Command',
    epithet: 'Sovereign Continuity',
    motto: 'The hand that keeps the pantheon coherent across sessions.',
    order: 0,
  },
  Olympian: {
    label: 'Olympian Council',
    epithet: 'Tier II - Senior Strategists',
    motto: 'The speaking voices of the pantheon - domains of depth.',
    order: 1,
  },
  Specialist: {
    label: 'Specialist Corps',
    epithet: 'Tier III - Applied Domains',
    motto: 'Narrow blades, each forged for a single decisive pass.',
    order: 2,
  },
  GameOrder: {
    label: 'The Game Order',
    epithet: 'Mobile Game Production',
    motto: 'Playable loops, legal assets, repeatable builds, and store-ready discipline.',
    order: 3,
  },
  Atmosphere: {
    label: 'Atmosphere',
    epithet: 'Tier IV - Ambient Intelligence',
    motto: 'The breath between actions. Context, environment, flow.',
    order: 4,
  },
};

const olympianAssemblyIds = new Set([
  'zeus',
  'athena',
  'hephaestus',
  'hermes',
  'thoth',
  'aphrodite',
  'apollo',
]);

const runnerLabels: Record<string, string> = {
  openclaw: 'OpenClaw',
  'claude-cli': 'Claude CLI',
  'codex-cli': 'Codex CLI',
  'kimi-cli': 'Kimi CLI',
  'opencode-cli': 'OpenCode CLI',
};

const executionStyleLabels: Record<StaticAssemblyAgent['executionStyle'], string> = {
  orchestrator: 'Orchestrator',
  specialist: 'Specialist',
  reviewer: 'Reviewer',
  researcher: 'Researcher',
  operator: 'Operator',
  heavy: 'Heavy Processor',
};

function getAssemblyTier(agent: PantheonAgent): AssemblyTier {
  if (agent.id === 'kronos') return 'Command';
  if (agent.lane === 'The Game Order') return 'GameOrder';
  if (olympianAssemblyIds.has(agent.id)) return 'Olympian';
  return 'Specialist';
}

function getAssemblyAccent(agent: PantheonAgent) {
  if (agent.id === 'kronos' || agent.id === 'zeus') return '#D4AF37';
  if (agent.id === 'athena') return '#A09080';
  if (agent.id === 'hephaestus') return '#CD5C5C';
  if (agent.id === 'hermes') return '#87CEEB';
  if (agent.id === 'thoth') return '#DDA0DD';
  if (agent.id === 'aphrodite') return '#FFB6C1';
  if (agent.id === 'apollo') return '#FFA500';
  return agent.lane === 'The Game Order' ? '#F59E0B' : '#B8941F';
}

function getExecutionStyle(agent: PantheonAgent): StaticAssemblyAgent['executionStyle'] {
  if (agent.id === 'kronos' || agent.id === 'zeus') return 'orchestrator';
  if (agent.id === 'athena' || agent.id === 'talos' || agent.id === 'nike-game-qa')
    return 'reviewer';
  if (agent.id === 'hermes' || agent.id === 'thoth' || agent.id === 'odin') return 'researcher';
  if (agent.id === 'hephaestus' || agent.id === 'heimdall') return 'operator';
  if (agent.id === 'heracles') return 'heavy';
  return 'specialist';
}

function getDefaultRunner(agent: PantheonAgent) {
  if (agent.id === 'kronos') return 'openclaw';
  if (agent.id === 'athena' || agent.id === 'hermes' || agent.id === 'thoth') return 'claude-cli';
  if (agent.id === 'hephaestus') return 'kimi-cli';
  return 'codex-cli';
}

function buildStaticAssemblyRoster(): StaticAssemblyAgent[] {
  return pantheonAgents.map(agent => {
    const tier = getAssemblyTier(agent);
    const executionStyle = getExecutionStyle(agent);
    const canOrchestrate = agent.id === 'kronos' || agent.id === 'zeus';

    return {
      ...agent,
      tier,
      executionStyle,
      accentColor: getAssemblyAccent(agent),
      defaultRunner: getDefaultRunner(agent),
      defaultApprovalMode:
        agent.id === 'kronos' || agent.id === 'hephaestus' || agent.id === 'apollo'
          ? 'yolo'
          : 'supervised',
      defaultElevated:
        agent.id === 'kronos' ||
        agent.id === 'zeus' ||
        agent.id === 'hephaestus' ||
        agent.id === 'apollo',
      canOrchestrate,
      canSplitTasks: canOrchestrate,
      workflow:
        tier === 'GameOrder'
          ? 'Branch: game/{agent-task} -> Nike QA -> store readiness'
          : `Branch: feature/${agent.id}-{task} -> TALOS QA -> Merge`,
    };
  });
}

function groupAssemblyByTier(roster: StaticAssemblyAgent[]) {
  return (Object.keys(assemblyTierMeta) as AssemblyTier[])
    .sort((a, b) => assemblyTierMeta[a].order - assemblyTierMeta[b].order)
    .map(tier => ({
      tier,
      ...assemblyTierMeta[tier],
      agents: roster
        .filter(agent => agent.tier === tier)
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .filter(group => group.agents.length > 0);
}

function TeamSurface() {
  const roster = useMemo(() => buildStaticAssemblyRoster(), []);
  const groups = useMemo(() => groupAssemblyByTier(roster), [roster]);
  const olympians = roster.filter(agent => agent.tier === 'Olympian');
  const kronos = roster.find(agent => agent.id === 'kronos');
  const zeus = roster.find(agent => agent.id === 'zeus');

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.08),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-7xl">
        <AssemblyHero />
        <AssemblyStats roster={roster} />
        <ChainOfCommand kronos={kronos} zeus={zeus} olympians={olympians} />
        {groups.map((group, index) => (
          <TierRoster key={group.tier} group={group} index={index} />
        ))}
        <LiveActivitySlot />
      </div>
    </div>
  );
}

function AssemblyHero() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/5 blur-3xl" />
        <div className="absolute left-1/3 top-0 h-28 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/25 to-transparent" />
        <div className="absolute right-1/4 top-0 h-20 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/20 to-transparent" />
      </div>

      <div className="relative py-14 text-center md:py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex justify-center"
        >
          <div className="flex items-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <span className="text-lg text-[#D4AF37]">🦉</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="mb-3 text-[11px] uppercase tracking-[0.42em] text-[#B8941F] md:text-xs"
        >
          Realm of Athena
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 text-4xl font-black tracking-wider md:text-6xl lg:text-7xl"
        >
          <span className="text-gold-gradient">DIVINE ASSEMBLY</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex justify-center"
        >
          <div className="h-px w-48 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl px-4 text-sm leading-relaxed text-gray-400 md:text-base"
        >
          The council chamber where command descends from mortal to machine. Here the chain of
          authority is made plain, every tier sworn, every role defined. Strategy, in Athena&apos;s
          tradition, is the architecture of cooperation.
        </motion.p>
      </div>
    </div>
  );
}

function AssemblyStats({ roster }: { roster: StaticAssemblyAgent[] }) {
  const stats = [
    { label: 'Sworn Agents', value: roster.length, sublabel: 'Across 4 tiers' },
    {
      label: 'Orchestrators',
      value: roster.filter(agent => agent.canOrchestrate).length,
      sublabel: 'May split & delegate',
    },
    {
      label: 'Runtime Channels',
      value: new Set(roster.map(agent => agent.defaultRunner)).size,
      sublabel: 'Distinct CLI runners',
    },
    {
      label: 'Mythologies',
      value: new Set(roster.map(agent => agent.pantheon)).size,
      sublabel: 'Lore-backed domains',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mt-8 grid grid-cols-2 gap-3 rounded-2xl border border-[#D4AF37]/15 bg-[linear-gradient(145deg,rgba(26,26,36,0.7),rgba(13,13,20,0.9))] p-4 backdrop-blur-sm md:grid-cols-4 md:gap-4 md:p-6"
    >
      {stats.map(stat => (
        <div key={stat.label} className="flex flex-col items-start">
          <span className="text-[10px] uppercase tracking-[0.32em] text-[#B8941F]">
            {stat.label}
          </span>
          <span className="font-cinzel text-gold-gradient mt-1 bg-clip-text text-3xl">
            {stat.value}
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
            {stat.sublabel}
          </span>
        </div>
      ))}
    </motion.div>
  );
}

function ChainOfCommand({
  kronos,
  zeus,
  olympians,
}: {
  kronos?: StaticAssemblyAgent;
  zeus?: StaticAssemblyAgent;
  olympians: StaticAssemblyAgent[];
}) {
  return (
    <section className="relative mt-8">
      <header className="mb-8 text-center">
        <p className="text-[11px] uppercase tracking-[0.42em] text-[#B8941F]">
          Chapter I - Chain of Command
        </p>
        <h2 className="font-cinzel mt-2 text-2xl tracking-wide md:text-3xl">
          <span className="text-gold-gradient">The Descent of Authority</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-gray-400">
          Command flows through three sworn tiers before a single line of code is written. Every
          agent answers upward; every decision is witnessed.
        </p>
      </header>

      <ol className="relative mx-auto max-w-4xl space-y-6">
        <div
          aria-hidden="true"
          className="absolute bottom-8 left-1/2 top-8 w-px -translate-x-1/2 bg-gradient-to-b from-[#D4AF37]/60 via-[#D4AF37]/25 to-transparent"
        />

        <CommandRung
          index={0}
          icon="👑"
          rank="Sovereign"
          name="Paul Doros"
          title="Sovereign - Proprietor of the Pantheon"
          subtitle="Mortal hand from which authority descends"
          delegates={[
            'Sets strategic direction',
            'Approves pantheon-wide shifts',
            'Absolute veto authority',
          ]}
        />

        {kronos ? (
          <CommandRung
            index={1}
            icon={kronos.emoji}
            rank="Tier I - Fleet Commander"
            name={kronos.name}
            title={kronos.title}
            subtitle={kronos.description}
            delegates={kronos.abilities.slice(0, 4)}
            accentColor={kronos.accentColor}
            href={`/pantheon-demo/dashboard/pantheon/${kronos.id}`}
          />
        ) : null}

        {zeus ? (
          <CommandRung
            index={2}
            icon={zeus.emoji}
            rank="Tier II - Coding Orchestrator"
            name={zeus.name}
            title={zeus.title}
            subtitle={zeus.description}
            delegates={zeus.abilities.slice(0, 4)}
            accentColor={zeus.accentColor}
            href={`/pantheon-demo/dashboard/pantheon/${zeus.id}`}
          />
        ) : null}

        {olympians.length > 0 ? (
          <motion.li
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="border-[#D4AF37]/18 relative rounded-2xl border bg-[linear-gradient(145deg,rgba(26,26,36,0.78),rgba(13,13,20,0.94))] p-6 backdrop-blur-sm"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 flex-none items-center justify-center rounded-full border border-[#D4AF37]/25 bg-black/40 text-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                  🏛️
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.34em] text-[#B8941F]">
                    Tier II - Olympian Council
                  </p>
                  <p className="font-cinzel mt-1 text-xl text-[#F8F2DF]">Sworn Specialists</p>
                  <p className="mt-1 text-xs text-gray-400">
                    Senior domains invoked by Zeus whenever a task exceeds solo scope.
                  </p>
                </div>
              </div>

              <div className="grid flex-1 grid-cols-2 gap-2 text-[11px] sm:grid-cols-3 md:grid-cols-4">
                {olympians
                  .filter(agent => agent.id !== 'zeus')
                  .map(agent => (
                    <Link
                      key={agent.id}
                      to={`/pantheon-demo/dashboard/pantheon/${agent.id}`}
                      className="group flex items-center gap-2 rounded-lg border border-[#D4AF37]/10 bg-black/20 px-2.5 py-2 transition-colors hover:border-[#D4AF37]/40 hover:bg-black/30"
                    >
                      <span className="text-lg" style={{ color: agent.accentColor }}>
                        {agent.emoji}
                      </span>
                      <span className="flex flex-col leading-tight">
                        <span className="font-cinzel text-sm text-[#F4E4A6] group-hover:text-[#D4AF37]">
                          {agent.name}
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.18em] text-gray-500">
                          {agent.domain}
                        </span>
                      </span>
                    </Link>
                  ))}
              </div>
            </div>
          </motion.li>
        ) : null}
      </ol>
    </section>
  );
}

function CommandRung({
  index,
  icon,
  rank,
  name,
  title,
  subtitle,
  delegates,
  accentColor,
  href,
}: {
  index: number;
  icon: string;
  rank: string;
  name: string;
  title: string;
  subtitle: string;
  delegates: string[];
  accentColor?: string;
  href?: string;
}) {
  const content = (
    <>
      <div
        className="flex h-16 w-16 flex-none items-center justify-center rounded-full border border-[#D4AF37]/30 bg-black/45 text-3xl shadow-[0_4px_20px_rgba(212,175,55,0.15)]"
        style={accentColor ? { borderColor: `${accentColor}66` } : undefined}
      >
        {icon}
      </div>

      <div className="flex-1">
        <p className="text-[10px] uppercase tracking-[0.34em] text-[#B8941F]">{rank}</p>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-cinzel text-xl text-[#F8F2DF] md:text-2xl">{name}</h3>
          <p className="text-sm text-[#D4AF37]/80">{title}</p>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-gray-400 md:text-sm">{subtitle}</p>

        {delegates.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {delegates.map(item => (
              <li
                key={item}
                className="rounded-full border border-[#D4AF37]/15 bg-black/30 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-gray-300"
              >
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  );

  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: 0.08 * index, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {href ? (
        <Link
          to={href}
          className="border-[#D4AF37]/18 flex items-start gap-5 rounded-2xl border bg-[linear-gradient(145deg,rgba(26,26,36,0.78),rgba(13,13,20,0.94))] p-6 backdrop-blur-sm transition-colors hover:border-[#D4AF37]/40"
        >
          {content}
        </Link>
      ) : (
        <div className="border-[#D4AF37]/18 flex items-start gap-5 rounded-2xl border bg-[linear-gradient(145deg,rgba(26,26,36,0.78),rgba(13,13,20,0.94))] p-6 backdrop-blur-sm">
          {content}
        </div>
      )}
    </motion.li>
  );
}

function TierRoster({
  group,
  index,
}: {
  group: ReturnType<typeof groupAssemblyByTier>[number];
  index: number;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-120px' }}
      transition={{ duration: 0.7, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className="mt-14"
    >
      <header className="border-[#D4AF37]/14 mb-6 flex flex-col gap-3 border-b pb-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.42em] text-[#B8941F]">{group.epithet}</p>
          <h3 className="font-cinzel mt-1 text-2xl md:text-3xl">
            <span className="text-gold-gradient">{group.label}</span>
          </h3>
          <p className="mt-2 max-w-2xl text-xs leading-relaxed text-gray-400 md:text-sm">
            {group.motto}
          </p>
        </div>
        <div className="shrink-0 rounded-full border border-[#D4AF37]/20 bg-black/35 px-4 py-1 text-[10px] uppercase tracking-[0.3em] text-[#F4D57A] backdrop-blur-sm">
          {group.agents.length} sworn
        </div>
      </header>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {group.agents.map(agent => (
          <AssemblyAgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </motion.section>
  );
}

function AssemblyAgentCard({ agent }: { agent: StaticAssemblyAgent }) {
  return (
    <Link
      to={`/pantheon-demo/dashboard/pantheon/${agent.id}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#D4AF37]/15 bg-[linear-gradient(160deg,rgba(26,31,46,0.92),rgba(18,24,38,0.88)_55%,rgba(13,17,23,0.94))] shadow-[0_18px_42px_rgba(0,0,0,0.28)] transition-all duration-500 hover:-translate-y-1 hover:border-[#D4AF37]/45"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-yellow-200/40 to-transparent opacity-60 transition-opacity group-hover:opacity-100"
      />

      <PantheonAgentPortrait agent={agent} className="rounded-none border-0" />

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37]/70">
                {agent.domain}
              </p>
              <h3 className="font-cinzel mt-1 flex items-center gap-2 text-lg text-[#F8F2DF]">
                <span className="text-xl" style={{ color: agent.accentColor }}>
                  {agent.emoji}
                </span>
                {agent.name}
              </h3>
              <p className="mt-1 text-xs text-[#D4AF37]/80">{agent.title}</p>
            </div>

            <span className="rounded-full border border-yellow-300/25 bg-black/35 px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-[#F4D57A]">
              {agent.pantheon}
            </span>
          </div>

          <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-gray-400">
            {agent.description}
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-3 text-[11px]">
          <div className="rounded-lg border border-[#D4AF37]/10 bg-black/25 px-3 py-2">
            <dt className="text-[9px] uppercase tracking-[0.26em] text-gray-500">Execution</dt>
            <dd className="mt-0.5 font-medium text-[#F4E4A6]">
              {executionStyleLabels[agent.executionStyle]}
            </dd>
          </div>
          <div className="rounded-lg border border-[#D4AF37]/10 bg-black/25 px-3 py-2">
            <dt className="text-[9px] uppercase tracking-[0.26em] text-gray-500">Default Runner</dt>
            <dd className="mt-0.5 font-medium text-[#F4E4A6]">
              {runnerLabels[agent.defaultRunner] ?? agent.defaultRunner}
            </dd>
          </div>
          <div className="rounded-lg border border-[#D4AF37]/10 bg-black/25 px-3 py-2">
            <dt className="text-[9px] uppercase tracking-[0.26em] text-gray-500">Approval</dt>
            <dd className="mt-0.5 font-medium capitalize text-[#F4E4A6]">
              {agent.defaultApprovalMode}
            </dd>
          </div>
          <div className="rounded-lg border border-[#D4AF37]/10 bg-black/25 px-3 py-2">
            <dt className="text-[9px] uppercase tracking-[0.26em] text-gray-500">Elevated</dt>
            <dd className="mt-0.5 font-medium text-[#F4E4A6]">
              {agent.defaultElevated ? 'Yes' : 'No'}
            </dd>
          </div>
        </dl>

        <div>
          <p className="text-[9px] uppercase tracking-[0.26em] text-gray-500">Specialties</p>
          <ul className="mt-1.5 flex flex-wrap gap-1.5">
            {agent.abilities.slice(0, 4).map(specialty => (
              <li
                key={specialty}
                className="border-[#D4AF37]/14 rounded-full border bg-black/30 px-2 py-0.5 text-[10px] text-gray-300"
              >
                {specialty}
              </li>
            ))}
            {agent.abilities.length > 4 ? (
              <li className="rounded-full border border-[#D4AF37]/10 bg-black/20 px-2 py-0.5 text-[10px] text-gray-500">
                +{agent.abilities.length - 4}
              </li>
            ) : null}
          </ul>
        </div>

        {agent.canOrchestrate || agent.canSplitTasks ? (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {agent.canOrchestrate ? (
              <span className="bg-[#D4AF37]/12 rounded-full border border-[#D4AF37]/35 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]">
                Orchestrates
              </span>
            ) : null}
            {agent.canSplitTasks ? (
              <span className="bg-[#B8941F]/12 rounded-full border border-[#B8941F]/35 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-[#F4D57A]">
                Splits Tasks
              </span>
            ) : null}
          </div>
        ) : null}

        <p className="border-[#D4AF37]/8 mt-auto border-t pt-3 font-mono text-[10px] text-gray-500">
          {agent.workflow}
        </p>
      </div>
    </Link>
  );
}

function LiveActivitySlot() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mt-14 rounded-2xl border border-dashed border-[#D4AF37]/25 bg-[linear-gradient(160deg,rgba(26,26,36,0.5),rgba(13,13,20,0.75))] p-6 backdrop-blur-sm"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.42em] text-[#B8941F]">Live Duty Roster</p>
          <h3 className="font-cinzel mt-1 text-xl text-[#F4E4A6]">
            Reserved - static portfolio showcase
          </h3>
          <p className="mt-2 max-w-2xl text-xs leading-relaxed text-gray-400 md:text-sm">
            The real Pantheon wires this panel to live task claims, active runs, and heartbeat
            drift. This public copy preserves the structure without rendering fake live execution.
          </p>
        </div>

        <div className="flex flex-col items-start gap-2 rounded-xl border border-[#D4AF37]/20 bg-black/30 px-4 py-3 text-[10px] uppercase tracking-[0.3em] text-[#F4D57A] md:items-end">
          <span>Source</span>
          <span className="font-mono normal-case tracking-normal text-gray-300">
            static mock data
          </span>
          <span>Boundary</span>
          <span className="font-mono normal-case tracking-normal text-gray-300">
            no task bridge
          </span>
        </div>
      </div>
    </motion.section>
  );
}

function CommanderSurface({
  selectedTemplate,
  simulatedMessages,
  onSimulatePrompt,
}: {
  selectedTemplate: DemoForgeTemplate;
  simulatedMessages: DemoSimulationMessage[];
  onSimulatePrompt: () => void;
}) {
  const visibleMessages = [...demoMessages, ...simulatedMessages];

  return (
    <section
      className="font-inter -m-8 flex h-[calc(100vh-4rem)] overflow-hidden bg-[#0A0A0F] text-[#F5F5F0]"
      style={{
        backgroundImage:
          'radial-gradient(circle at top, rgba(212,175,55,0.08), transparent 30%), radial-gradient(circle at 20% 20%, rgba(255,255,255,0.03), transparent 20%), linear-gradient(180deg, #0A0A0F 0%, #09090D 100%)',
      }}
    >
      <aside className="hidden w-[280px] shrink-0 border-r border-[rgba(212,175,55,0.1)] bg-[linear-gradient(180deg,rgba(18,18,26,0.96)_0%,rgba(12,12,18,0.99)_100%)] md:block">
        <div className="flex h-16 items-center justify-between border-b border-[rgba(212,175,55,0.1)] px-5">
          <div className="flex items-center gap-2 text-sm tracking-[0.18em] text-[#D4AF37]">
            <span>📜</span>
            <span>History</span>
          </div>
        </div>

        <div className="border-b border-[rgba(212,175,55,0.08)] p-4">
          <label className="flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(15,15,21,0.9)] px-3 text-[#6B6B75]">
            <Search className="h-4 w-4" />
            <input
              value=""
              readOnly
              placeholder="Search..."
              className="h-10 flex-1 bg-transparent text-sm text-[#F5F5F0] outline-none placeholder:text-[#6B6B75]"
            />
          </label>
        </div>

        <div className="commander-scrollbar flex-1 overflow-y-auto px-3 py-4">
          {commanderState.sessions.map(session => (
            <button
              key={session.title}
              type="button"
              className="mb-2 w-full rounded-2xl border-l-[3px] border-transparent px-4 py-3 text-left transition first:border-[#D4AF37] first:bg-[rgba(212,175,55,0.1)] hover:bg-[rgba(255,255,255,0.03)]"
            >
              <div className="flex items-center gap-2 text-sm font-medium text-[#F5F5F0]">
                <span>⏳</span>
                <span>{session.title}</span>
              </div>
              <p className="mt-1 text-xs text-[#9A9AA3]">{session.count} messages • Now</p>
              <p className="mt-2 line-clamp-2 text-xs text-[#6B6B75]">{session.preview}</p>
            </button>
          ))}
        </div>
      </aside>

      <div className="relative flex min-w-0 flex-1 flex-col">
        <div className="mx-auto flex h-full w-full min-w-0 max-w-[1200px] flex-col">
          <div className="mx-4 my-4 flex min-h-0 flex-1 flex-col overflow-hidden rounded-[28px] border border-[rgba(212,175,55,0.18)] bg-[rgba(10,10,15,0.72)] shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm">
            <header className="flex min-h-16 flex-col gap-3 border-b border-[#D4AF37]/10 bg-[rgba(18,18,26,0.88)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="commander-avatar-glow flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[radial-gradient(circle_at_30%_30%,rgba(244,208,63,0.3),rgba(10,10,15,0.96)_72%)] text-xl">
                  ⏳
                </div>
                <div>
                  <h3 className="font-cinzel text-xl tracking-[0.08em] text-[#F5F5F0]">
                    Chamber of Time
                  </h3>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-[#9A9AA3]">
                    Keeper of Moments
                  </p>
                </div>
              </div>
              <div className="flex w-fit items-center gap-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 px-3 py-1.5 text-sm text-[#9A9AA3]">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_14px_rgba(251,191,36,0.75)]" />
                Gateway Connected
              </div>
            </header>

            <div className="relative flex-1 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.08),transparent_45%),linear-gradient(180deg,rgba(10,10,15,0.96),rgba(16,16,22,0.98))]" />
              <div className="commander-scrollbar relative h-full space-y-4 overflow-y-auto p-5">
                {visibleMessages.map((message, index) => (
                  <div
                    key={`${message.speaker}-${message.text}-${index}`}
                    className={`flex ${message.speaker === 'Paul' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-2xl rounded-2xl border px-4 py-3 ${
                        message.speaker === 'Paul'
                          ? 'border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#F8F2DF]'
                          : 'border-white/10 bg-white/[0.04] text-[#D7CFC0]'
                      }`}
                    >
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                        {message.speaker}
                      </p>
                      <p className="text-sm leading-6">{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[rgba(255,255,255,0.05)] bg-[linear-gradient(180deg,rgba(10,10,15,0.96)_0%,rgba(15,15,21,0.98)_100%)] p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#6B6B75]">
                    Composer simulator
                  </p>
                  <p className="mt-1 text-sm text-[#9A9AA3]">{selectedTemplate.prompt}</p>
                </div>
                <button
                  type="button"
                  onClick={onSimulatePrompt}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-[#D4AF37]/35 bg-[#D4AF37]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#F4D57A] transition hover:border-[#D4AF37]/60"
                >
                  <span>⏳</span>
                  Simulate Send
                </button>
              </div>
            </div>

            <div className="flex h-12 items-center gap-2 overflow-x-auto border-t border-[rgba(255,255,255,0.05)] bg-[linear-gradient(180deg,rgba(10,10,15,0.96)_0%,rgba(15,15,21,0.98)_100%)] px-5">
              <span className="mr-2 shrink-0 text-xs uppercase tracking-[0.24em] text-[#6B6B75]">
                Spawn Agent:
              </span>
              {commanderAgents.map(agent => (
                <button
                  key={agent.id}
                  type="button"
                  onClick={onSimulatePrompt}
                  title={`${agent.name} - ${agent.role}`}
                  className="group flex shrink-0 items-center gap-2 rounded-full border border-[rgba(255,255,255,0.1)] bg-transparent px-2.5 py-1.5 text-[#F5F5F0] opacity-90 transition hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/10"
                >
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(255,255,255,0.08)] text-lg"
                    style={{
                      backgroundColor: `${agent.color}22`,
                      borderColor: `${agent.color}66`,
                    }}
                  >
                    {agent.emoji}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex h-8 items-center justify-between border-t border-[rgba(255,255,255,0.05)] bg-[#0A0A0F] px-5 text-xs text-[#6B6B75]">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
                <span>Gateway Connected</span>
              </div>
              <div>{commanderState.activeAgents} Agents Active</div>
              <div className="font-mono">Last sync: {commanderState.lastSync}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArchiveSurface() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {archiveRecords.map(record => (
        <article
          key={record.title}
          className="rounded-xl border border-[#D4AF37]/20 bg-gradient-to-br from-gray-900 via-gray-900 to-black p-5 shadow-[0_0_50px_rgba(212,175,55,0.08)]"
        >
          <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">
            {record.type}
          </div>
          <h3 className="mt-3 text-xl font-bold text-white">{record.title}</h3>
          <p className="mt-2 text-sm leading-6 text-gray-400">{record.summary}</p>
          <div className="mt-4 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-[#D7CFC0]">
            Keeper: {record.owner}
          </div>
        </article>
      ))}
    </section>
  );
}

function MemorySurface() {
  return (
    <section className="grid gap-4 lg:grid-cols-[1fr_18rem]">
      <div className="rounded-xl border border-[#D4AF37]/20 bg-[#101522]/90 p-6">
        <div className="text-xs font-semibold uppercase tracking-[0.32em] text-[#D4AF37]">
          Mnemosyne's Vault
        </div>
        <h2 className="mt-2 text-2xl font-bold text-white">Continuity Without Exposure</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-400">
          The real Pantheon memory surface preserves decisions, operating doctrine, and work
          continuity. This public copy shows the shape of that vault with safe summaries only.
        </p>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {memoryRecords.map(record => (
            <article
              key={record.title}
              className="rounded-lg border border-white/10 bg-black/25 p-4"
            >
              <div className="text-[10px] uppercase tracking-[0.24em] text-[#8B7355]">
                {record.state}
              </div>
              <h3 className="mt-2 font-semibold text-[#F8F2DF]">{record.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#AFA795]">{record.note}</p>
            </article>
          ))}
        </div>
      </div>
      <aside className="rounded-xl border border-white/10 bg-black/25 p-5">
        <BrainCircuit className="mb-4 h-6 w-6 text-[#D4AF37]" />
        <div className="text-xs uppercase tracking-[0.24em] text-[#8B7355]">Public rule</div>
        <p className="mt-2 text-sm leading-6 text-[#D7CFC0]">
          The demo never reads real memory files or local session data. These cards are static
          narrative placeholders.
        </p>
      </aside>
    </section>
  );
}

function CalendarSurface() {
  return (
    <section className="rounded-xl border border-[#D4AF37]/20 bg-[#101522]/90 p-6">
      <div className="text-xs font-semibold uppercase tracking-[0.32em] text-[#D4AF37]">
        Realm of Helios
      </div>
      <h2 className="mt-2 text-2xl font-bold text-white">Celestial Cycle</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-400">
        A static version of the operating rhythm: review ideas, push work through gates, and turn
        completed effort into a portfolio chronicle.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {calendarEvents.map(event => (
          <article key={event.title} className="rounded-lg border border-white/10 bg-black/25 p-5">
            <div className="font-cinzel text-3xl text-[#F4D57A]">{event.time}</div>
            <h3 className="mt-3 font-semibold text-[#F8F2DF]">{event.title}</h3>
            <p className="mt-1 text-xs uppercase tracking-[0.24em] text-[#8B7355]">
              Realm of {event.realm}
            </p>
            <p className="mt-3 text-sm leading-6 text-[#AFA795]">{event.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function StorytellingSurface() {
  const featuredStory = calliopeStories[0] || calliopeStory;
  const supportingStories = calliopeStories.slice(1);

  return (
    <section className="space-y-8">
      <header className="rounded-xl border border-[#D4AF37]/25 bg-gradient-to-br from-gray-900 via-gray-900 to-black p-6 shadow-[0_0_50px_rgba(212,175,55,0.08)]">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.32em] text-[#D4AF37]">
              Realm of Calliope
            </div>
            <h1 className="mt-2 text-3xl font-bold text-white">Story Telling</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-400">
              Transform a completed Pantheon task, a pasted summary, or raw material into a
              structured chronicle, then send it through a narration pipeline. This public copy
              simulates the whole flow with static data.
            </p>
          </div>
          <blockquote className="max-w-xs rounded-lg border border-[#D4AF37]/20 bg-gray-950/70 p-4 text-xs italic text-gray-400">
            "Every great tale begins with a single word. Let the Muse guide your pen and weave
            stories that echo through eternity."
            <div className="mt-2 text-[10px] font-semibold uppercase not-italic tracking-wide text-[#D4AF37]">
              - Calliope
            </div>
          </blockquote>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {calliopeStories.map(story => (
          <article
            key={story.title}
            className={`rounded-xl border p-4 ${
              story.title === featuredStory.title
                ? 'border-[#D4AF37]/35 bg-[#D4AF37]/10'
                : 'border-white/10 bg-white/[0.035]'
            }`}
          >
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#D4AF37]/70">
              {story.sourceKind}
            </p>
            <h2 className="font-cinzel mt-2 text-lg font-bold text-[#F8F2DF]">{story.title}</h2>
            <p className="mt-2 min-h-[3rem] text-xs leading-5 text-gray-400">{story.subtitle}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.14em] text-gray-500">
              <span>{story.evidenceCount} entries</span>
              <span>{story.estimatedNarration}</span>
            </div>
          </article>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <article className="overflow-hidden rounded-xl border border-[#D4AF37]/30 bg-gradient-to-b from-[#161b2c] via-gray-950 to-gray-950 shadow-[0_0_50px_rgba(212,175,55,0.12)]">
          <header className="relative border-b border-gray-800 px-8 py-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.18),transparent_60%)]" />
            <div className="relative z-10">
              <span className="text-xs font-semibold uppercase tracking-[0.32em] text-[#D4AF37]">
                Realm of Calliope · Chronicle
              </span>
              <h2 className="mt-2 font-serif text-4xl leading-tight text-white">
                {featuredStory.title}
              </h2>
              <p className="mt-2 text-sm italic text-gray-400">{featuredStory.subtitle}</p>
              <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500">
                <span>
                  Source: <span className="text-gray-300">{featuredStory.sourceKind}</span>
                </span>
                <span>
                  Evidence:{' '}
                  <span className="text-gray-300">{featuredStory.evidenceCount} entries</span>
                </span>
                <span>
                  Narration:{' '}
                  <span className="text-gray-300">{featuredStory.estimatedNarration}</span>
                </span>
                <span>
                  Created: <span className="text-gray-300">{featuredStory.createdAt}</span>
                </span>
              </div>
            </div>
          </header>

          <div className="space-y-6 px-8 py-8">
            {featuredStory.sections.map(section => (
              <section
                key={section.title}
                className="rounded-lg border border-gray-800 bg-gray-950/60 bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-transparent p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-serif text-xl text-[#F6E7A8]">{section.title}</h3>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                    {section.kind.replace('_', ' ')}
                  </span>
                </div>
                <p className="mt-4 whitespace-pre-wrap font-serif text-[15px] leading-7 text-gray-200">
                  {section.text}
                </p>
              </section>
            ))}
          </div>
        </article>

        <aside className="space-y-4">
          <div className="rounded-lg border border-gray-800 bg-gray-950/80 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Speech cues
            </h3>
            <div className="mt-3 space-y-3">
              {featuredStory.sections.map(section => (
                <div
                  key={section.title}
                  className="rounded-md border border-gray-800 bg-gray-900/70 p-3 text-xs text-gray-300"
                >
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-[#D4AF37]">
                    {section.kind}
                  </div>
                  <p className="mt-1.5 line-clamp-4 leading-5">{section.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-gray-800 bg-gray-950/80 p-4 text-xs text-gray-400">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Narration disabled
            </h3>
            <p className="mt-2 leading-5 text-gray-500">
              The real Calliope pipeline can generate and persist narration. This static demo shows
              the UI and story model without calling TTS, storage, or APIs.
            </p>
          </div>
          <div className="rounded-lg border border-gray-800 bg-gray-950/80 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              More chronicles
            </h3>
            <div className="mt-3 space-y-2">
              {supportingStories.map(story => (
                <div
                  key={story.title}
                  className="rounded-md border border-gray-800 bg-gray-900/60 p-3"
                >
                  <p className="text-xs font-semibold text-[#F8F2DF]">{story.title}</p>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500">
                    {story.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export function PantheonDashboardReplica() {
  const navigate = useNavigate();
  const [activeLane, setActiveLane] = useState('core');
  const [activeSection, setActiveSection] = useState<DemoSection>('pantheon');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPantheon, setSelectedPantheon] = useState('All');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [selectedTemplateId, setSelectedTemplateId] = useState(demoForgeTemplates[0].id);
  const [simulatedMessages, setSimulatedMessages] = useState<DemoSimulationMessage[]>([]);
  const [simulatedTasks, setSimulatedTasks] = useState<DemoSimulatedTask[]>([]);
  const [simulatedProjects, setSimulatedProjects] = useState<DemoForgeTemplate[]>([]);

  const selectedTemplate = useMemo(
    () =>
      demoForgeTemplates.find(template => template.id === selectedTemplateId) ||
      demoForgeTemplates[0],
    [selectedTemplateId]
  );

  const pantheons = useMemo(
    () => ['All', ...Array.from(new Set(pantheonAgents.map(agent => agent.pantheon)))],
    []
  );
  const domains = useMemo(
    () => ['All', ...Array.from(new Set(pantheonAgents.map(agent => agent.domain)))],
    []
  );

  const filteredAgents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return pantheonAgents.filter(agent => {
      const matchesLane =
        activeLane === 'game-order'
          ? agent.lane === 'The Game Order'
          : activeLane === 'media'
            ? false
            : agent.lane !== 'The Game Order';
      const matchesSearch =
        query === '' ||
        agent.name.toLowerCase().includes(query) ||
        agent.domain.toLowerCase().includes(query) ||
        agent.title.toLowerCase().includes(query) ||
        agent.abilities.some(ability => ability.toLowerCase().includes(query));
      const matchesPantheon = selectedPantheon === 'All' || agent.pantheon === selectedPantheon;
      const matchesDomain = selectedDomain === 'All' || agent.domain === selectedDomain;

      return matchesLane && matchesSearch && matchesPantheon && matchesDomain;
    });
  }, [activeLane, searchQuery, selectedDomain, selectedPantheon]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedPantheon('All');
    setSelectedDomain('All');
  };

  const selectTemplate = (template: DemoForgeTemplate) => {
    setSelectedTemplateId(template.id);
    setSimulatedMessages([]);
  };

  const openTemplatePreview = (template: DemoForgeTemplate) => {
    navigate(`/pantheon-demo/dashboard/factory/${template.id}`);
  };

  const upsertSimulatedTask = (template: DemoForgeTemplate) => {
    setSimulatedTasks(current => [
      buildSimulatedTask(template),
      ...current.filter(task => task.originTemplateId !== template.id),
    ]);
  };

  const upsertSimulatedProject = (template: DemoForgeTemplate) => {
    setSimulatedProjects(current => [
      template,
      ...current.filter(project => project.id !== template.id),
    ]);
  };

  const simulatePrompt = () => {
    setSimulatedMessages(buildSimulationMessages(selectedTemplate));
    setActiveSection('commander');
  };

  const simulateOffering = () => {
    setSimulatedMessages(buildSimulationMessages(selectedTemplate));
    upsertSimulatedTask(selectedTemplate);
    setActiveSection('tasks');
  };

  const simulateProjectCreation = (template = selectedTemplate) => {
    setSelectedTemplateId(template.id);
    setSimulatedMessages(buildSimulationMessages(template));
    upsertSimulatedTask(template);
    upsertSimulatedProject(template);
    setActiveSection('factory');
  };

  const simulateDeployPreview = (template = selectedTemplate) => {
    setSelectedTemplateId(template.id);
    setSimulatedMessages(buildSimulationMessages(template));
    upsertSimulatedTask(template);
    upsertSimulatedProject(template);
    setActiveSection('factory');
    openTemplatePreview(template);
  };

  return (
    <MotionConfig reducedMotion="user" transition={pantheonSpringTransition}>
      <div className="marble-dark flex h-screen overflow-hidden text-[#F8F2DF]">
        <div className="flex h-screen min-w-0 flex-1">
          <ShellNav
            activeSection={activeSection}
            activeLane={activeLane}
            onSectionChange={setActiveSection}
            onLaneChange={setActiveLane}
          />

          <main className="relative min-w-0 flex-1 overflow-hidden">
            <MobileReplicaNav
              open={mobileNavOpen}
              activeSection={activeSection}
              activeLane={activeLane}
              onOpenChange={setMobileNavOpen}
              onSectionChange={setActiveSection}
              onLaneChange={setActiveLane}
            />

            <div className="pointer-events-none absolute left-0 right-0 top-0 h-96">
              <div className="absolute left-1/2 top-[-200px] h-[400px] w-[800px] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(212,175,55,0.15)_0%,transparent_70%)]" />
            </div>

            <div className="relative z-10 h-full overflow-auto p-4 pt-20 sm:p-6 sm:pt-24 lg:p-8">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={`${activeSection}-${activeSection === 'pantheon' ? activeLane : 'panel'}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.28, ease: pantheonEase }}
                >
                  {activeSection === 'pantheon' ? (
                    <div className="mx-auto max-w-7xl pb-16">
                      <SourcePantheonHero />
                      <LaneTabs activeLane={activeLane} onLaneChange={setActiveLane} />
                    </div>
                  ) : null}

                  {activeSection === 'pantheon' ? (
                    <section className="mx-auto max-w-7xl space-y-8 pb-16">
                      <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#1a1f2e]/80 p-6 backdrop-blur-sm">
                        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_12rem_14rem]">
                          <label>
                            <span className="mb-2 block text-xs uppercase tracking-wider text-[#B8941F]">
                              Search Agents
                            </span>
                            <span className="relative block">
                              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#D4AF37]/50" />
                              <input
                                type="text"
                                value={searchQuery}
                                onChange={event => setSearchQuery(event.target.value)}
                                placeholder="Search by name, domain, or ability..."
                                className="w-full rounded-lg border border-[#D4AF37]/30 bg-[#0D1117] px-4 py-3 pl-10 text-[#F4E4A6] outline-none transition placeholder:text-gray-500 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50"
                              />
                            </span>
                          </label>

                          <label>
                            <span className="mb-2 block text-xs uppercase tracking-wider text-[#B8941F]">
                              Pantheon
                            </span>
                            <select
                              value={selectedPantheon}
                              onChange={event => setSelectedPantheon(event.target.value)}
                              className="w-full rounded-lg border border-[#D4AF37]/30 bg-[#0D1117] px-4 py-3 text-[#F4E4A6] outline-none transition focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50"
                            >
                              {pantheons.map(pantheon => (
                                <option key={pantheon} value={pantheon}>
                                  {pantheon}
                                </option>
                              ))}
                            </select>
                          </label>

                          <label>
                            <span className="mb-2 block text-xs uppercase tracking-wider text-[#B8941F]">
                              Domain
                            </span>
                            <select
                              value={selectedDomain}
                              onChange={event => setSelectedDomain(event.target.value)}
                              className="w-full rounded-lg border border-[#D4AF37]/30 bg-[#0D1117] px-4 py-3 text-[#F4E4A6] outline-none transition focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50"
                            >
                              {domains.map(domain => (
                                <option key={domain} value={domain}>
                                  {domain}
                                </option>
                              ))}
                            </select>
                          </label>
                        </div>

                        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <p className="text-sm text-gray-400">
                            Showing{' '}
                            <span className="font-bold text-[#D4AF37]">
                              {filteredAgents.length}
                            </span>{' '}
                            static agents out of {pantheonAgents.length} copied roster cards.
                          </p>
                          {searchQuery || selectedPantheon !== 'All' || selectedDomain !== 'All' ? (
                            <button
                              type="button"
                              onClick={clearFilters}
                              className="w-fit text-xs text-[#D4AF37] underline transition hover:text-[#F4E4A6]"
                            >
                              Clear filters
                            </button>
                          ) : null}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                        <AnimatePresence initial={false} mode="popLayout">
                          {filteredAgents.map((agent, index) => (
                            <motion.div
                              key={agent.id}
                              layout
                              initial={{ opacity: 0, y: 14 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{
                                ...pantheonSpringTransition,
                                delay: Math.min(index * 0.025, 0.16),
                              }}
                            >
                              <PantheonAgentCard
                                agent={agent}
                                href={`/pantheon-demo/dashboard/pantheon/${agent.id}`}
                              />
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>

                      {filteredAgents.length === 0 ? (
                        <div className="rounded-2xl border border-purple-300/20 bg-purple-300/5 p-10 text-center">
                          <div className="mb-4 text-5xl">🎬</div>
                          <h3 className="text-xl font-bold text-[#F4E4A6]">
                            No agents in this lane yet
                          </h3>
                          <p className="mt-2 text-gray-400">
                            The Media Forge is intentionally reserved for future creative production
                            agents.
                          </p>
                          <button
                            type="button"
                            onClick={clearFilters}
                            className="mt-6 rounded-lg border border-[#D4AF37]/50 bg-[#D4AF37]/20 px-6 py-3 text-[#D4AF37] transition hover:bg-[#D4AF37]/30"
                          >
                            Clear Filters
                          </button>
                        </div>
                      ) : null}
                    </section>
                  ) : null}

                  {activeSection === 'tasks' ? (
                    <TaskBoard
                      simulatedTasks={simulatedTasks}
                      onSimulateOffering={simulateOffering}
                    />
                  ) : null}
                  {activeSection === 'factory' ? (
                    <FactorySurface
                      selectedTemplate={selectedTemplate}
                      simulatedProjects={simulatedProjects}
                      onSelectTemplate={selectTemplate}
                      onCreateProject={simulateProjectCreation}
                      onDeployPreview={simulateDeployPreview}
                      onPreviewTemplate={openTemplatePreview}
                    />
                  ) : null}
                  {activeSection === 'content' ? <ArchiveSurface /> : null}
                  {activeSection === 'memory' ? <MemorySurface /> : null}
                  {activeSection === 'projects' ? (
                    <ProjectVaultSurface onPreviewTemplate={openTemplatePreview} />
                  ) : null}
                  {activeSection === 'calendar' ? <CalendarSurface /> : null}
                  {activeSection === 'team' ? <TeamSurface /> : null}
                  {activeSection === 'commander' ? (
                    <CommanderSurface
                      selectedTemplate={selectedTemplate}
                      simulatedMessages={simulatedMessages}
                      onSimulatePrompt={simulatePrompt}
                    />
                  ) : null}
                  {activeSection === 'storytelling' ? <StorytellingSurface /> : null}
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 hidden" aria-hidden="true">
                {guardrails.join(', ')}
                {commanderState.gatewayStatus}
              </div>
            </div>

            <div className="pointer-events-none absolute right-4 top-20 h-16 w-16 border-r-2 border-t-2 border-[rgba(212,175,55,0.2)]" />
            <div className="pointer-events-none absolute bottom-4 left-4 h-16 w-16 border-b-2 border-l-2 border-[rgba(212,175,55,0.2)]" />
          </main>
        </div>
      </div>
    </MotionConfig>
  );
}
