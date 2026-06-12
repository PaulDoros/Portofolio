import { Link } from '@remix-run/react';
import {
  AnimatePresence,
  MotionConfig,
  Reorder,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react';
import { Cursor, ScrambleText, Ticker, usePointerPosition } from 'motion-plus/react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Boxes,
  BrainCircuit,
  CheckCircle2,
  CircuitBoard,
  FileDown,
  Gamepad2,
  GripVertical,
  Github,
  Layers3,
  Linkedin,
  Mail,
  Rocket,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
} from 'lucide-react';
import type { CSSProperties, MouseEvent, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

import { ContactForm } from '~/components/contact-form';
import { Button } from '~/components/ui/button';
import { featuredProjects, portfolioProjects, portfolioStats } from '~/data/portfolio-projects';
import type { PortfolioProject } from '~/data/portfolio-projects';
import { ClientOnly } from '~/utils/client-only';
import { Layout } from '../layout/layout';
import {
  CyberPortraitSequence,
  PortfolioProjectOrbitCanvas,
  PortfolioThreeHeroCanvas,
} from './portfolio-three-effects';

interface EditorialPortfolioHomeProps {
  onAdultLinkClick: (url: string, siteName: string) => (event: MouseEvent) => void;
}

const capabilityGroups = [
  {
    number: '01',
    title: 'Agent operating systems',
    short: 'Pantheon',
    description:
      'AI fleets, task routing, memory, demo-safe dashboards, agent pages, project vaults, and production gates that make delegated work visible.',
    icon: Bot,
    tags: ['Fleet design', 'Task routing', 'Static simulations'],
    proof: ['Pantheon demo', 'Agent pages', 'Workflow simulator'],
  },
  {
    number: '02',
    title: 'AI product surfaces',
    short: 'SaaS',
    description:
      'Onboarding, subscriptions, RAG flows, admin tooling, analytics, usage limits, and support experiences shaped as real products.',
    icon: BrainCircuit,
    tags: ['RAG flows', 'Supabase', 'Stripe'],
    proof: ['ADHISTLY', 'NetPageCraft', 'Factory demos'],
  },
  {
    number: '03',
    title: 'Game production tracks',
    short: 'Games',
    description:
      'Unity and Unreal prototypes, Android packaging, asset ledgers, QA notes, store-readiness loops, and repeatable game build systems.',
    icon: Gamepad2,
    tags: ['Unity', 'Unreal', 'Android'],
    proof: ['MobileRogueArena', 'Rogue Routes', 'Brainrot Protocol'],
  },
  {
    number: '04',
    title: 'Automation and launch craft',
    short: 'Launch',
    description:
      'Build scripts, validation checks, deployment setup, smoke testing, production runbooks, and clean handoff documentation.',
    icon: Workflow,
    tags: ['Codex', 'Vercel', 'QA gates'],
    proof: ['Typecheck', 'Build passes', 'Smoke tests'],
  },
  {
    number: '05',
    title: 'Template factories',
    short: 'Forge',
    description:
      'Research-backed starter systems for commerce, dashboards, local businesses, clinics, hotels, real estate, SaaS, and AI showcases.',
    icon: Boxes,
    tags: ['Motion+', 'GSAP', 'Design MD'],
    proof: ['Noir Table', 'PulseFit', 'Harbor Nest'],
  },
  {
    number: '06',
    title: 'Visual systems',
    short: 'Motion',
    description:
      'Motion-first interaction design with cursor effects, scroll-linked storytelling, layout transitions, overlays, and carousel previews.',
    icon: Rocket,
    tags: ['Motion+', 'Interaction', 'Accessibility'],
    proof: ['Cursor', 'Carousel', 'Parallax'],
  },
];

const designReferences = [
  {
    label: 'Cursor',
    value: 'Warm developer-tool editorial canvas, code surfaces, and one sharp action color.',
  },
  {
    label: 'Framer',
    value: 'Dark artboard energy, white CTAs, bold motion, and showcase panels that feel alive.',
  },
  {
    label: 'Linear',
    value: 'Quiet luxury, dense proof, clean product UI previews, and exact operational language.',
  },
  {
    label: 'Runway',
    value: 'Cinematic media grids where the image is the interface, not decoration.',
  },
  {
    label: 'Apple',
    value: 'Product-tile restraint, confident spacing, and chrome that gets out of the way.',
  },
];

const processStages = [
  {
    title: 'Frame',
    body: 'Define the business model, conversion path, user workflow, proof needed, and what must stay static or simulated.',
  },
  {
    title: 'Forge',
    body: 'Build the interface, workflow, content, data model, animation system, and simulation boundaries as one coherent product surface.',
  },
  {
    title: 'Validate',
    body: 'Typecheck, build, smoke test, browser inspect, fix hydration and interaction issues, then document the limit of the demo.',
  },
  {
    title: 'Launch',
    body: 'Ship to preview or production with routes, metadata, responsive polish, and a handoff that explains how to keep moving.',
  },
];

const stackItems = [
  'React',
  'Remix',
  'TypeScript',
  'Tailwind',
  'Motion+',
  'GSAP',
  'Supabase',
  'PostgreSQL',
  'Convex',
  'Stripe',
  'OpenAI',
  'Codex',
  'Claude',
  'Unity',
  'Unreal',
  'Blender',
  'Vercel',
  'Android',
];

const stackGroups = [
  {
    label: 'Interface',
    title: 'Product surfaces',
    description:
      'Typed React routes, responsive Tailwind systems, accessible controls, and real interaction states for dashboards, websites, and demos.',
    icon: Layers3,
    tools: ['React', 'Remix', 'TypeScript', 'Tailwind'],
    proof: 'Portfolio home, Pantheon demo, SaaS surfaces, and generated niche templates.',
  },
  {
    label: 'AI + Data',
    title: 'Intelligent products',
    description:
      'RAG flows, subscriptions, profiles, admin operations, usage limits, and database-backed product behavior.',
    icon: BrainCircuit,
    tools: ['OpenAI', 'Supabase', 'PostgreSQL', 'Stripe'],
    proof: 'ADHISTLY, factory demos, recommendation flows, and static-safe agent simulations.',
  },
  {
    label: 'Motion',
    title: 'Interaction systems',
    description:
      'Motion, GSAP, scroll-linked storytelling, cursor effects, carousels, overlays, and Three.js accents used only where they clarify the work.',
    icon: Sparkles,
    tools: ['Motion+', 'GSAP', 'Three.js', 'Canvas'],
    proof: 'Project lanes, cyber sequence, proof wall, motion lab, and live demo templates.',
  },
  {
    label: 'Game Ops',
    title: 'Playable pipelines',
    description:
      'Unity, Unreal, Android packaging, Blender assets, asset ledgers, QA notes, and store-readiness planning.',
    icon: Gamepad2,
    tools: ['Unity', 'Unreal', 'Blender', 'Android'],
    proof: 'MobileRogueArena, Rogue Routes, Brainrot Protocol, and reusable game order workflows.',
  },
  {
    label: 'Agents',
    title: 'Automation loops',
    description:
      'Codex, Claude, task routing, memory rules, project vaults, validation gates, and reviewable agent handoffs.',
    icon: Bot,
    tools: ['Codex', 'Claude', 'Pantheon', 'QA gates'],
    proof: '37 simulated agents, task creation flow, project vault, and demo-safe workflows.',
  },
  {
    label: 'Launch',
    title: 'Production proof',
    description:
      'Vercel deployments, build scripts, smoke checks, content handoff, analytics intent, and clean route boundaries.',
    icon: ShieldCheck,
    tools: ['Vercel', 'Convex', 'Build checks', 'Runbooks'],
    proof: 'Live routes, client delivery, custom domains, typecheck, build, and browser QA.',
  },
];

const stackProofRows = [
  {
    value: 'Motion + GSAP',
    label: 'chosen per surface',
  },
  {
    value: 'Static-safe',
    label: 'demos never call private agents',
  },
  {
    value: 'QA first',
    label: 'typecheck, build, browser pass',
  },
];

const projectRail = [
  'Pantheon',
  'AI SaaS',
  'Agent fleets',
  'Game builds',
  'Static demos',
  'Motion systems',
  'Launch QA',
  'Client work',
];

const signalTickerItems = [
  { label: 'Pantheon dashboard', detail: 'static agent command center' },
  { label: 'Project vault', detail: 'case-study proof' },
  { label: 'Website forge', detail: 'templates by niche' },
  { label: 'Game prototypes', detail: 'mobile and Unreal loops' },
  { label: 'Launch QA', detail: 'typecheck, build, smoke test' },
  { label: 'Client systems', detail: 'routes, content, handoff' },
];

const signalStats = [
  { value: '10', label: 'portfolio sections' },
  { value: '37', label: 'simulated agents' },
  { value: '0', label: 'live agent calls' },
];

const selectedWorkStats = [
  { value: '6', label: 'featured builds' },
  { value: '5', label: 'delivery lanes' },
  { value: '3', label: 'live routes' },
];

const motionTrailImages = [
  { label: 'Pantheon', image: '/images/pantheon-demo.png', color: '#f7c46a' },
  { label: 'Agent fleet', image: '/images/agent-fleet.png', color: '#00d4ff' },
  { label: 'ADHISTLY', image: '/images/adhistly.png', color: '#f54e00' },
  { label: 'Rogue Arena', image: '/images/mobile-rogue-arena.png', color: '#8b7cff' },
  { label: 'Brainrot', image: '/images/brainrot-protocol.png', color: '#6ee7b7' },
];

const motionPriorityItems = [
  { label: 'Business model', detail: 'conversion path', color: '#f7c46a' },
  { label: 'Interface system', detail: 'routes and states', color: '#00d4ff' },
  { label: 'Motion language', detail: 'scroll and gestures', color: '#f54e00' },
  { label: 'Launch proof', detail: 'build and smoke tests', color: '#8b7cff' },
];

const proofStages = [
  {
    key: 'brief',
    eyebrow: '01 / Frame',
    title: 'Brief to blueprint',
    badge: 'Brief locked',
    body: 'Translate a loose idea into pages, roles, conversion paths, demo limits, and proof that the build should exist.',
    accent: '#f7c46a',
    image: '/images/pantheon-demo.png',
    tasks: ['Audience and goal', 'Routes and data', 'Demo boundaries'],
    metric: '92% clarity',
  },
  {
    key: 'forge',
    eyebrow: '02 / Forge',
    title: 'Interface to system',
    badge: 'Motion pass',
    body: 'Turn the plan into a usable surface: navigation, state, project data, transitions, and a visual rhythm that supports the workflow.',
    accent: '#00d4ff',
    image: '/images/adhistly.png',
    tasks: ['Screen states', 'Motion rules', 'Responsive layout'],
    metric: '14 surfaces',
  },
  {
    key: 'validate',
    eyebrow: '03 / Validate',
    title: 'Build to confidence',
    badge: 'QA sweep',
    body: 'Run the boring checks: type safety, production build, browser smoke tests, route clicks, hydration warnings, and mobile overflow.',
    accent: '#f54e00',
    image: '/images/agent-fleet.png',
    tasks: ['Typecheck', 'Production build', 'Browser smoke'],
    metric: '0 console errors',
  },
  {
    key: 'launch',
    eyebrow: '04 / Launch',
    title: 'Preview to handoff',
    badge: 'Live preview',
    body: 'Ship the demo, document what is simulated, connect the live routes, and leave the project ready for the next iteration.',
    accent: '#6ee7b7',
    image: '/images/mobile-rogue-arena.png',
    tasks: ['Preview route', 'Handoff notes', 'Next actions'],
    metric: 'Ready to show',
  },
];

const dotsMorphPaths = [
  {
    dot: 'M27.75 27.75L27.7499 27.7499',
    line: 'M15.75 15.75L27.75 27.75',
  },
  {
    dot: 'M27.75 3.75L27.7499 3.75007',
    line: 'M15.75 15.75L27.75 3.75',
  },
  {
    dot: 'M3.75 27.75L3.75007 27.7499',
    line: 'M15.75 15.75L3.75 27.75',
  },
  {
    dot: 'M3.75 3.75L3.75007 3.75007',
    line: 'M3.75 3.75L14.75 14.75',
  },
];

const showcaseProjects = featuredProjects.slice(0, 6);
const carouselProjects = portfolioProjects.slice(0, 9);
const revealViewport = { once: true, amount: 0.22 };
type ProofStage = (typeof proofStages)[number];

const clampNumber = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

function MotionReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
}) {
  const reduceMotion = useReducedMotion();
  const initialOffset =
    direction === 'left'
      ? { x: -58, y: 0 }
      : direction === 'right'
        ? { x: 58, y: 0 }
        : { x: 0, y: 42 };

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...initialOffset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={revealViewport}
      transition={{
        duration: reduceMotion ? 0 : 0.62,
        delay: reduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function PortfolioMotionProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[75] h-[3px] origin-left bg-[linear-gradient(90deg,#f54e00,#5e6ad2,#00d4ff,#f7c46a)]"
      style={{ scaleX }}
    />
  );
}

function PortfolioCursorLayer() {
  return (
    <ClientOnly>
      <Cursor
        style={{
          width: 4,
          height: 4,
          backgroundColor: '#f7c46a',
          mixBlendMode: 'difference',
        }}
      />
      <Cursor
        follow
        center={{ x: 0.5, y: 0.5 }}
        spring={{ stiffness: 900, damping: 58 }}
        magnetic={{ snap: 0.88, padding: 3 }}
        style={{
          width: 26,
          height: 26,
          borderRadius: 999,
          border: '1px solid rgba(247, 196, 106, 0.44)',
          backgroundColor: 'rgba(247, 196, 106, 0.02)',
          boxShadow: '0 0 26px rgba(94, 106, 210, 0.16)',
        }}
        variants={{ magnetic: { opacity: 0.1, scale: 1.18 } }}
      />
    </ClientOnly>
  );
}

function usePortfolioPointerReaction(
  axis: 'x' | 'y',
  measurement: 'innerWidth' | 'innerHeight',
  intensity = 34
) {
  const pointer = usePointerPosition();
  const [viewportSize, setViewportSize] = useState(1);
  const [hasMoved, setHasMoved] = useState(false);

  useEffect(() => {
    const updateSize = () => setViewportSize(window[measurement]);
    const markMoved = () => setHasMoved(true);

    updateSize();
    window.addEventListener('resize', updateSize);
    window.addEventListener('pointermove', markMoved, { passive: true, once: true });

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('pointermove', markMoved);
    };
  }, [measurement]);

  const reaction = useTransform(() => {
    if (!viewportSize || !hasMoved) return 0;
    return intensity - (pointer[axis].get() / viewportSize) * intensity * 2;
  });

  return useSpring(reaction, {
    stiffness: 210,
    damping: 74,
    mass: 0.65,
  });
}

function ScrollTextLines() {
  const { scrollY } = useScroll();
  const topOffset = useTransform(() => scrollY.get() * 0.18);
  const bottomOffset = useTransform(() => scrollY.get() * -0.24);
  const reversedSignalItems = [...signalTickerItems].reverse();

  return (
    <section className="portfolio-signal-band" aria-label="Portfolio signal map">
      <div className="container mx-auto px-4">
        <div className="portfolio-signal-band-inner">
          <MotionReveal direction="left" className="portfolio-signal-band-header">
            <span>Signal map</span>
            <h2>What the portfolio proves before the case studies.</h2>
            <p>
              The first pass should answer three questions: what is real, what is simulated, and
              where a buyer can inspect the work without touching production systems.
            </p>
          </MotionReveal>

          <div className="portfolio-signal-stat-grid">
            {signalStats.map((stat, index) => (
              <MotionReveal key={stat.label} delay={index * 0.06} className="portfolio-signal-stat">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </MotionReveal>
            ))}
          </div>
        </div>
      </div>

      <div className="portfolio-signal-ticker-wrap">
        <Ticker
          className="portfolio-signal-ticker"
          offset={topOffset}
          gap={12}
          items={signalTickerItems.map(item => (
            <span key={item.label} className="portfolio-signal-pill">
              <strong>{item.label}</strong>
              <span>{item.detail}</span>
            </span>
          ))}
        />
        <Ticker
          className="portfolio-signal-ticker portfolio-signal-ticker-muted"
          offset={bottomOffset}
          gap={12}
          items={reversedSignalItems.map(item => (
            <span key={item.label} className="portfolio-signal-pill">
              <strong>{item.label}</strong>
              <span>{item.detail}</span>
            </span>
          ))}
        />
      </div>
    </section>
  );
}

function MotionDotsGlyph({ active }: { active: boolean }) {
  return (
    <motion.span
      className="flex h-6 w-6 items-center justify-center"
      animate={{ rotate: active ? 90 : 0 }}
      transition={{ type: 'spring', stiffness: 190, damping: 24 }}
      aria-hidden="true"
    >
      <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
        {dotsMorphPaths.map((path, index) => (
          <motion.path
            key={index}
            d={path.dot}
            stroke="currentColor"
            strokeLinecap="round"
            initial={false}
            animate={{
              d: active ? path.line : path.dot,
              strokeWidth: active ? 5.4 : 8.5,
            }}
            transition={{ type: 'spring', stiffness: 170, damping: 26 }}
          />
        ))}
      </svg>
    </motion.span>
  );
}

function PortfolioFloatingTarget() {
  const reduceMotion = useReducedMotion();
  const x = usePortfolioPointerReaction('x', 'innerWidth', 30);
  const y = usePortfolioPointerReaction('y', 'innerHeight', 30);
  const originX = useTransform(x, [30, -30], [0, 1]);
  const originY = useTransform(y, [30, -30], [0, 1]);
  const ringText = 'Open Pantheon demo • Open Pantheon demo • ';

  return (
    <motion.div
      className="portfolio-floating-target-wrap"
      style={{ x: reduceMotion ? 0 : x, y: reduceMotion ? 0 : y }}
    >
      <Link
        to="/pantheon-demo"
        className="portfolio-floating-target group"
        aria-label="Open Pantheon demo"
      >
        <motion.span
          className="absolute inset-3 rounded-full bg-cover bg-center"
          style={{
            originX,
            originY,
            backgroundImage:
              'linear-gradient(rgba(5,5,7,0.05), rgba(5,5,7,0.2)), url(/images/pantheon-demo.png)',
            willChange: 'transform',
          }}
          variants={{
            idle: { scale: 0 },
            hover: { scale: 1.08 },
          }}
          initial="idle"
          whileHover="hover"
          transition={{ type: 'spring', stiffness: 230, damping: 24 }}
        />
        <motion.span
          className="portfolio-floating-target-text"
          animate={reduceMotion ? undefined : { transform: ['rotate(0deg)', 'rotate(360deg)'] }}
          transition={reduceMotion ? undefined : { duration: 16, ease: 'linear', repeat: Infinity }}
        >
          {ringText.split('').map((char, index, array) => (
            <span
              key={`${char}-${index}`}
              style={{
                transform: `rotate(${(index * 360) / array.length}deg) translateY(-78px)`,
                transformOrigin: '0 0',
              }}
            >
              {char}
            </span>
          ))}
        </motion.span>
        <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#f7c46a] text-xs font-black uppercase tracking-[0.12em] text-[#050507]">
          Open
        </span>
      </Link>
    </motion.div>
  );
}

type TrailItem = {
  id: number;
  x: number;
  y: number;
  imageIndex: number;
  velocityX: number;
  velocityY: number;
};

function PortfolioCursorTrailField({ stage }: { stage: (typeof proofStages)[number] }) {
  const reduceMotion = useReducedMotion();
  const pointer = usePointerPosition();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInside = useRef(false);
  const distance = useRef<number | undefined>(undefined);
  const imageIndex = useRef(0);
  const idCounter = useRef(0);
  const timers = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  const [trailItems, setTrailItems] = useState<TrailItem[]>([]);
  const imageSize = 142;

  const pointerDistance = useTransform(() => {
    const x = pointer.x.get();
    const y = pointer.y.get();
    const previousX = pointer.x.getPrevious() ?? x;
    const previousY = pointer.y.getPrevious() ?? y;
    const deltaX = x - previousX;
    const deltaY = y - previousY;

    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  });

  useEffect(
    () => () => {
      timers.current.forEach(timer => clearTimeout(timer));
    },
    []
  );

  useMotionValueEvent(pointerDistance, 'change', latest => {
    if (reduceMotion || !isInside.current) return;

    if (distance.current === undefined) {
      distance.current = 0;
      return;
    }

    distance.current += latest;
    if (distance.current < 86) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const localX = pointer.x.get() - rect.left;
    const localY = pointer.y.get() - rect.top;

    if (localX < 0 || localY < 0 || localX > rect.width || localY > rect.height) return;

    const nextItem: TrailItem = {
      id: idCounter.current++,
      x: localX - imageSize / 2,
      y: localY - imageSize / 2,
      imageIndex: imageIndex.current,
      velocityX: clampNumber(pointer.x.getVelocity(), -2200, 2200),
      velocityY: clampNumber(pointer.y.getVelocity(), -2200, 2200),
    };

    setTrailItems(current => [...current.slice(-8), nextItem]);
    imageIndex.current = (imageIndex.current + 1) % motionTrailImages.length;
    distance.current = 0;

    const timer = setTimeout(() => {
      setTrailItems(current => current.filter(item => item.id !== nextItem.id));
    }, 920);

    timers.current.push(timer);
  });

  return (
    <motion.div
      ref={containerRef}
      className="portfolio-motion-trail relative isolate min-h-[31rem] overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#08080b]"
      onPointerEnter={() => {
        isInside.current = true;
      }}
      onPointerLeave={() => {
        isInside.current = false;
        distance.current = undefined;
      }}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:58px_58px] opacity-35" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(245,78,0,0.18),transparent_26%),radial-gradient(circle_at_82%_8%,rgba(0,212,255,0.14),transparent_24%)]" />
      <div className="relative z-20 max-w-2xl p-6 sm:p-8">
        <p
          className="text-xs font-black uppercase tracking-[0.24em]"
          style={{ color: stage.accent }}
        >
          Evidence board / {stage.eyebrow}
        </p>
        <h3 className="mt-4 text-4xl font-black leading-[0.96] text-white sm:text-6xl">
          {stage.title}
        </h3>
        <p className="mt-5 max-w-md text-sm leading-7 text-white/60">{stage.body}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {stage.tasks.map(task => (
            <span
              key={task}
              className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-white/70"
            >
              {task}
            </span>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {trailItems.map(item => {
          const source = motionTrailImages[item.imageIndex];

          return (
            <motion.figure
              key={item.id}
              className="pointer-events-none absolute z-10 overflow-hidden rounded-[1rem] border border-white/20 bg-white shadow-[0_24px_70px_rgba(0,0,0,0.28)]"
              style={{
                left: item.x,
                top: item.y,
                width: imageSize,
                willChange: 'transform, opacity',
              }}
              initial={{ opacity: 0, scale: 0.72, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.72, rotate: 5 }}
              transition={{
                duration: 0.12,
                x: { type: 'inertia', velocity: item.velocityX * 0.064 },
                y: { type: 'inertia', velocity: item.velocityY * 0.064 },
                opacity: { duration: 0.22 },
              }}
            >
              <img src={source.image} alt="" className="h-24 w-full object-cover" />
              <figcaption className="px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#111113]">
                <span
                  className="mr-2 inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: source.color }}
                />
                {source.label}
              </figcaption>
            </motion.figure>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
}

function MotionStateBadge({ stage }: { stage: (typeof proofStages)[number] }) {
  return (
    <motion.div
      layout
      className="inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full px-5 text-sm font-black uppercase tracking-[0.12em] text-[#050507]"
      style={{ backgroundColor: stage.accent }}
      transition={{ type: 'spring', stiffness: 460, damping: 32 }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={stage.key}
          className="inline-flex items-center gap-2"
          initial={{ y: -18, opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: 18, opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.18, ease: 'easeInOut' }}
        >
          {stage.key === 'launch' ? (
            <motion.svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <motion.path
                d="M4 12l5 5L20 6"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              />
            </motion.svg>
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          {stage.badge}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
}

function SkeletonLine({
  className,
  reduceMotion,
}: {
  className: string;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.div
      className={`rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.07)_25%,rgba(255,255,255,0.17)_50%,rgba(255,255,255,0.07)_75%)] bg-[length:220%_100%] ${className}`}
      animate={reduceMotion ? undefined : { backgroundPosition: ['-180% 0', '180% 0'] }}
      transition={
        reduceMotion ? undefined : { duration: 1.45, ease: 'easeInOut', repeat: Infinity }
      }
    />
  );
}

function MotionSkeletonPreview({ stage }: { stage: (typeof proofStages)[number] }) {
  const [loaded, setLoaded] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setLoaded(false);
  }, [stage.key]);

  return (
    <motion.div layout className="portfolio-motion-lab-panel min-h-[18rem]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-white/50">
            Stage preview
          </p>
          <h3 className="mt-2 text-2xl font-black text-white">{stage.badge}</h3>
        </div>
        <button
          type="button"
          onClick={() => setLoaded(value => !value)}
          className="rounded-full border border-white/10 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#050507]"
        >
          {loaded ? 'Reset' : 'Reveal'}
        </button>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {loaded ? (
          <motion.div
            key="loaded"
            className="mt-6 grid gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
          >
            {stage.tasks.map((item, index) => (
              <motion.div
                key={item}
                layout
                className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-[1rem] border border-white/10 bg-white/[0.06] p-3"
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-black text-[#050507]"
                  style={{ backgroundColor: stage.accent }}
                >
                  0{index + 1}
                </span>
                <span className="text-sm font-bold text-white">{item}</span>
                <CheckCircle2 className="h-4 w-4 text-[#6ee7b7]" />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="loading"
            className="mt-7 space-y-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
          >
            <SkeletonLine reduceMotion={reduceMotion} className="h-24 rounded-[1.1rem]" />
            <SkeletonLine reduceMotion={reduceMotion} className="h-4 w-11/12" />
            <SkeletonLine reduceMotion={reduceMotion} className="h-4 w-8/12" />
            <div className="grid grid-cols-3 gap-3">
              <SkeletonLine reduceMotion={reduceMotion} className="h-16 rounded-[0.9rem]" />
              <SkeletonLine reduceMotion={reduceMotion} className="h-16 rounded-[0.9rem]" />
              <SkeletonLine reduceMotion={reduceMotion} className="h-16 rounded-[0.9rem]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function MotionPriorityQueue({ stage }: { stage: ProofStage }) {
  const [order, setOrder] = useState(motionPriorityItems);

  useEffect(() => {
    setOrder(motionPriorityItems);
  }, [stage.key]);

  return (
    <motion.div layout className="portfolio-motion-lab-panel">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-white/50">
            Build order
          </p>
          <h3 className="mt-2 text-2xl font-black text-white">Drag priority queue</h3>
        </div>
        <span
          className="rounded-full px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#050507]"
          style={{ backgroundColor: stage.accent }}
        >
          {stage.badge}
        </span>
      </div>

      <Reorder.Group axis="y" values={order} onReorder={setOrder} className="mt-6 grid gap-2">
        {order.map(item => (
          <Reorder.Item
            key={item.label}
            value={item}
            layout
            className="portfolio-reorder-item"
            style={{ '--item-color': item.color } as CSSProperties}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            whileHover={{ x: 4 }}
            whileDrag={{ scale: 1.035 }}
          >
            <span className="portfolio-reorder-handle" aria-hidden="true">
              <GripVertical className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-sm font-black text-white">{item.label}</span>
              <span className="mt-1 block text-xs font-bold uppercase tracking-[0.15em] text-white/40">
                {item.detail}
              </span>
            </span>
          </Reorder.Item>
        ))}
      </Reorder.Group>
      <p className="mt-4 text-xs font-semibold leading-6 text-white/45">
        The order is draggable, so the proof stack behaves like a real planning surface instead of a
        static card.
      </p>
    </motion.div>
  );
}

function ProjectHoverFollowList({
  projects,
  stage,
}: {
  projects: PortfolioProject[];
  stage: ProofStage;
}) {
  const [hoveredProject, setHoveredProject] = useState<PortfolioProject | null>(null);
  const pointer = usePointerPosition();
  const velocityX = useVelocity(pointer.x);
  const velocityY = useVelocity(pointer.y);
  const rotate = useSpring(useTransform(velocityX, [-1800, 0, 1800], [-9, 0, 9]), {
    stiffness: 210,
    damping: 26,
  });
  const scaleY = useSpring(useTransform(velocityY, [-1800, 0, 1800], [0.96, 1, 1.04]), {
    stiffness: 210,
    damping: 28,
  });

  return (
    <motion.div layout className="portfolio-motion-lab-panel portfolio-hover-preview-list">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-white/50">
            Case browser
          </p>
          <h3 className="mt-2 text-2xl font-black text-white">Cursor preview index</h3>
        </div>
        <span
          className="h-3 w-3 rounded-full shadow-[0_0_28px_currentColor]"
          style={{ color: stage.accent, backgroundColor: stage.accent }}
        />
      </div>

      <div className="mt-5 grid gap-2">
        {projects.map((project, index) => {
          const destination = project.demoUrl?.startsWith('/') ? project.demoUrl : '/projects';

          return (
            <Link
              key={project.id}
              to={destination}
              className="group block"
              onPointerEnter={() => setHoveredProject(project)}
              onPointerLeave={() => setHoveredProject(null)}
              onFocus={() => setHoveredProject(project)}
              onBlur={() => setHoveredProject(null)}
            >
              <motion.span
                className="portfolio-hover-preview-row"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.985 }}
                transition={{ type: 'spring', stiffness: 360, damping: 30 }}
              >
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/35">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-black text-white">
                    {project.title}
                  </span>
                  <span className="mt-1 block truncate text-xs font-bold uppercase tracking-[0.12em] text-white/40">
                    {project.category}
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-white/35 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </motion.span>
            </Link>
          );
        })}
      </div>

      <ClientOnly>
        <AnimatePresence>
          {hoveredProject ? (
            <Cursor
              key="portfolio-project-preview"
              follow
              offset={{ x: -300, y: 24 }}
              spring={{ stiffness: 760, damping: 45 }}
              className="portfolio-hover-preview-cursor"
              variants={{ exit: { opacity: 0, scale: 0.92 } }}
            >
              <motion.figure style={{ rotate, scaleY }} className="portfolio-hover-preview-card">
                <img
                  src={hoveredProject.image}
                  alt=""
                  className={hoveredProject.isAdult ? 'blur-md' : undefined}
                />
                <figcaption>
                  <span>{hoveredProject.status}</span>
                  <strong>{hoveredProject.title}</strong>
                </figcaption>
              </motion.figure>
            </Cursor>
          ) : null}
        </AnimatePresence>
      </ClientOnly>
    </motion.div>
  );
}

function MotionLineGraph({ stageIndex }: { stageIndex: number }) {
  const data = [26, 41, 34, 58, 72, 66, 88];
  const points = data.map((value, index) => ({
    x: 34 + index * 50,
    y: 178 - value * 1.42,
    value,
  }));
  const pathD = points.reduce(
    (path, point, index) =>
      index === 0 ? `M ${point.x},${point.y}` : `${path} L ${point.x},${point.y}`,
    ''
  );
  const [activePoint, setActivePoint] = useState(points.length - 1);

  useEffect(() => {
    setActivePoint(Math.min(points.length - 1, stageIndex + 3));
  }, [points.length, stageIndex]);

  return (
    <div className="portfolio-motion-lab-panel overflow-hidden">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-white/50">
            Launch signal
          </p>
          <h3 className="mt-2 text-2xl font-black text-white">Proof curve</h3>
        </div>
        <motion.span
          key={activePoint}
          className="rounded-full bg-[#6ee7b7] px-3 py-1.5 text-xs font-black text-[#04110c]"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {points[activePoint].value}%
        </motion.span>
      </div>

      <svg viewBox="0 0 360 190" className="mt-6 h-56 w-full overflow-visible">
        <defs>
          <linearGradient id="portfolioGraphArea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#6ee7b7" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[42, 76, 110, 144].map(y => (
          <line
            key={y}
            x1="24"
            y1={y}
            x2="338"
            y2={y}
            stroke="rgba(255,255,255,0.1)"
            strokeDasharray="5 7"
          />
        ))}
        <motion.path
          d={`${pathD} L ${points[points.length - 1].x},176 L ${points[0].x},176 Z`}
          fill="url(#portfolioGraphArea)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={revealViewport}
          transition={{ duration: 0.6 }}
        />
        <motion.path
          d={pathD}
          fill="none"
          stroke="#6ee7b7"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={revealViewport}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
        {points.map((point, index) => (
          <g key={`${point.x}-${point.y}`}>
            <rect
              x={point.x - 22}
              y="0"
              width="44"
              height="190"
              fill="transparent"
              onPointerEnter={() => setActivePoint(index)}
            />
            <motion.circle
              cx={point.x}
              cy={point.y}
              r={activePoint === index ? 7 : 4.5}
              fill="#08080b"
              stroke={activePoint === index ? '#f7c46a' : '#6ee7b7'}
              strokeWidth="2"
              initial={{ scale: 0.4, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={revealViewport}
              transition={{ type: 'spring', stiffness: 320, damping: 22, delay: index * 0.04 }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

function MotionPathLedger({ stage }: { stage: (typeof proofStages)[number] }) {
  const reduceMotion = useReducedMotion();
  const path = 'M 24 132 C 70 28 129 208 183 95 C 237 -18 284 158 340 54 C 398 -53 446 122 498 38';
  const offsetPath = `path("${path}")`;

  return (
    <div className="portfolio-motion-lab-panel overflow-hidden">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-white/50">
        Route map / {stage.eyebrow}
      </p>
      <h3 className="mt-2 text-2xl font-black text-white">{stage.title}</h3>
      <div className="relative mt-6 h-56">
        <svg viewBox="0 0 520 190" className="absolute inset-0 h-full w-full overflow-visible">
          <motion.path
            d={path}
            fill="none"
            stroke={stage.accent}
            opacity="0.22"
            strokeWidth="18"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={revealViewport}
            transition={{ duration: reduceMotion ? 0 : 1.4, ease: 'easeInOut' }}
          />
          <motion.path
            d={path}
            fill="none"
            stroke={stage.accent}
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={revealViewport}
            transition={{ duration: reduceMotion ? 0 : 1.4, ease: 'easeInOut' }}
          />
        </svg>
        <motion.div
          className="absolute left-0 top-0 h-12 w-12 rounded-[0.9rem] border border-white/20 bg-[#f54e00] shadow-[0_18px_50px_rgba(245,78,0,0.35)]"
          style={
            {
              offsetPath,
              offsetRotate: '0deg',
              offsetDistance: reduceMotion ? '76%' : undefined,
              backgroundColor: stage.accent,
            } as CSSProperties
          }
          initial={{ offsetDistance: '0%', scale: 0.86 }}
          whileInView={{ offsetDistance: '100%', scale: 1 }}
          viewport={revealViewport}
          transition={{
            duration: reduceMotion ? 0 : 4.4,
            repeat: reduceMotion ? 0 : Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      </div>
    </div>
  );
}

function ParallaxProofCard({ stage, index }: { stage: ProofStage; index: number }) {
  const ref = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ['0%', '0%'] : ['-10%', '10%']
  );
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.52, 1],
    reduceMotion ? [1, 1, 1] : [1.1, 1.02, 1.08]
  );
  const contentY = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [24, 0, -24]);
  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.28, 0.74, 0.9], [0, 1, 1, 0]);

  return (
    <motion.article
      ref={ref}
      className="portfolio-proof-wall-card"
      style={{ '--proof-accent': stage.accent } as CSSProperties}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{
        duration: reduceMotion ? 0 : 0.62,
        delay: reduceMotion ? 0 : index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.div className="portfolio-proof-wall-media" style={{ y: imageY, scale: imageScale }}>
        <img src={stage.image} alt="" />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,7,0.08),rgba(5,5,7,0.84))]" />
      <motion.div
        className="portfolio-proof-wall-copy"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <span>{stage.eyebrow}</span>
        <h3>{stage.title}</h3>
        <p>{stage.body}</p>
        <div>
          {stage.tasks.map(task => (
            <small key={task}>{task}</small>
          ))}
        </div>
      </motion.div>
      <motion.div
        className="portfolio-proof-wall-metric"
        initial={{ opacity: 0, scale: 0.82 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={revealViewport}
        transition={{ type: 'spring', stiffness: 260, damping: 24, delay: index * 0.08 }}
      >
        {stage.metric}
      </motion.div>
    </motion.article>
  );
}

function ParallaxProofWall() {
  return (
    <section
      id="proof-wall"
      className="portfolio-section portfolio-themed-section portfolio-proof-wall border-y border-white/10 bg-[#09090d] text-white"
    >
      <div className="container mx-auto px-4">
        <MotionReveal className="portfolio-section-heading portfolio-section-heading-dark">
          <span>06 Scroll Proof Wall</span>
          <h2>Scroll-linked evidence panels with real project imagery.</h2>
        </MotionReveal>

        <div className="grid gap-4 lg:grid-cols-2">
          {proofStages.map((stage, index) => (
            <ParallaxProofCard key={stage.key} stage={stage} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProofConsoleSection() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const activeStage = proofStages[activeStageIndex];

  return (
    <section
      id="motion-lab"
      className="portfolio-section portfolio-themed-section border-y border-white/10 bg-[#050507] text-white"
    >
      <div className="container mx-auto px-4">
        <MotionReveal className="portfolio-section-heading portfolio-section-heading-dark">
          <span>05 Motion Lab</span>
          <h2>Useful interactions mapped to how work actually moves.</h2>
        </MotionReveal>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.04fr)_minmax(25rem,0.96fr)]">
          <div className="grid gap-4">
            <div className="portfolio-proof-stage-grid">
              {proofStages.map((stage, index) => {
                const isActive = index === activeStageIndex;

                return (
                  <motion.button
                    key={stage.key}
                    type="button"
                    layout
                    onClick={() => setActiveStageIndex(index)}
                    className="relative overflow-hidden rounded-[1.15rem] border border-white/10 bg-white/[0.035] p-4 text-left"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="portfolio-proof-stage"
                        className="absolute inset-0 rounded-[1.15rem]"
                        style={{ backgroundColor: stage.accent }}
                        transition={{ type: 'spring', stiffness: 360, damping: 34 }}
                      />
                    ) : null}
                    <span className="relative z-10 block">
                      <span
                        className={`text-[11px] font-black uppercase tracking-[0.2em] ${
                          isActive ? 'text-[#050507]/70' : 'text-white/45'
                        }`}
                      >
                        {stage.eyebrow}
                      </span>
                      <span
                        className={`mt-2 block text-lg font-black leading-none ${
                          isActive ? 'text-[#050507]' : 'text-white'
                        }`}
                      >
                        {stage.title}
                      </span>
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <PortfolioCursorTrailField stage={activeStage} />
          </div>

          <div className="grid gap-4">
            <motion.div
              layout
              className="portfolio-motion-lab-panel grid min-h-[18rem] gap-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center"
            >
              <PortfolioFloatingTarget />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-white/50">
                  Active build stage
                </p>
                <h3 className="mt-3 text-3xl font-black leading-none text-white">
                  {activeStage.metric}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/60">{activeStage.body}</p>
                <div className="mt-5">
                  <MotionStateBadge stage={activeStage} />
                </div>
              </div>
            </motion.div>

            <MotionSkeletonPreview stage={activeStage} />
          </div>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
          <MotionLineGraph stageIndex={activeStageIndex} />
          <MotionPriorityQueue stage={activeStage} />
          <MotionPathLedger stage={activeStage} />
          <ProjectHoverFollowList projects={carouselProjects.slice(0, 5)} stage={activeStage} />
        </div>
      </div>
    </section>
  );
}

function CapabilityLab() {
  const [active, setActive] = useState(0);
  const activeCapability = capabilityGroups[active];
  const Icon = activeCapability.icon;

  return (
    <section
      id="capabilities"
      className="portfolio-section portfolio-themed-section border-y border-white/10 bg-[#08080b] text-white"
    >
      <div className="container mx-auto px-4">
        <MotionReveal className="portfolio-section-heading portfolio-section-heading-dark">
          <span>02 Interactive Capability Lab</span>
          <h2>Switch lanes and watch the operating model recompose.</h2>
        </MotionReveal>

        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="grid gap-2">
            {capabilityGroups.map((group, index) => {
              const ButtonIcon = group.icon;
              const isActive = index === active;

              return (
                <button
                  key={group.title}
                  type="button"
                  onClick={() => setActive(index)}
                  className="relative overflow-hidden rounded-[1.15rem] border border-white/10 bg-white/[0.035] p-4 text-left transition-colors hover:border-white/20"
                >
                  {isActive ? (
                    <motion.span
                      layoutId="portfolio-capability-active"
                      className="absolute inset-0 rounded-[1.15rem] bg-[linear-gradient(120deg,rgba(245,78,0,0.22),rgba(94,106,210,0.16),rgba(0,212,255,0.12))]"
                      transition={{ type: 'spring', stiffness: 360, damping: 36 }}
                    />
                  ) : null}
                  <span className="relative z-10 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/25">
                      <ButtonIcon className="h-4 w-4 text-[#f7c46a]" />
                    </span>
                    <span>
                      <span className="block text-xs font-black uppercase tracking-[0.2em] text-white/40">
                        {group.number} / {group.short}
                      </span>
                      <span className="mt-1 block text-base font-black text-white">
                        {group.title}
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <motion.div layout className="portfolio-lab-panel">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[#f7c46a]">
                  Selected lane
                </p>
                <h3 className="mt-4 max-w-2xl text-4xl font-black leading-[0.94] md:text-6xl">
                  {activeCapability.title}
                </h3>
              </div>
              <motion.div
                key={activeCapability.title}
                initial={{ opacity: 0, rotate: -18, scale: 0.82 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="hidden h-16 w-16 items-center justify-center rounded-[1.2rem] border border-white/10 bg-white/[0.06] text-[#f7c46a] sm:flex"
              >
                <Icon className="h-7 w-7" />
              </motion.div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCapability.title}
                initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -18, filter: 'blur(8px)' }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
                  {activeCapability.description}
                </p>
                <div className="mt-8 grid gap-3 md:grid-cols-3">
                  {activeCapability.proof.map(item => (
                    <div
                      key={item}
                      className="rounded-[1rem] border border-white/10 bg-black/20 p-4 text-sm font-bold text-white/80"
                    >
                      <CheckCircle2 className="mb-5 h-4 w-4 text-[#00d4ff]" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                  {activeCapability.tags.map(tag => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#f7c46a]/20 bg-[#f7c46a]/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-[#f7c46a]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProjectCarouselSection({
  projects,
  onSelect,
}: {
  projects: PortfolioProject[];
  onSelect: (project: PortfolioProject) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const thumbsRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const activeProject = projects[activeIndex] ?? projects[0];
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const mediaScale = useTransform(
    scrollYProgress,
    [0, 0.35, 1],
    reduceMotion ? [1, 1, 1] : [1.04, 1, 1.03]
  );
  const previousProject = () =>
    setActiveIndex(current => (current === 0 ? projects.length - 1 : current - 1));
  const nextProject = () =>
    setActiveIndex(current => (current === projects.length - 1 ? 0 : current + 1));
  const progress = projects.length > 0 ? ((activeIndex + 1) / projects.length) * 100 : 0;

  useMotionValueEvent(scrollYProgress, 'change', latest => {
    if (reduceMotion || projects.length < 2) return;

    const nextIndex = clampNumber(
      Math.round(latest * (projects.length - 1)),
      0,
      projects.length - 1
    );
    setActiveIndex(current => (current === nextIndex ? current : nextIndex));
  });

  useEffect(() => {
    const container = thumbsRef.current;
    const activeThumb = container?.children[activeIndex] as HTMLElement | undefined;
    if (!container || !activeThumb) return;

    const left = activeThumb.offsetLeft - (container.clientWidth - activeThumb.clientWidth) / 2;
    container.scrollTo({ left, behavior: reduceMotion ? 'auto' : 'smooth' });
  }, [activeIndex, reduceMotion]);

  if (!activeProject) return null;

  return (
    <section
      ref={sectionRef}
      id="motion-index"
      className="portfolio-clean-carousel-section border-y"
      style={
        {
          '--portfolio-carousel-scroll': reduceMotion
            ? '0px'
            : `${Math.max(projects.length - 1, 1) * 54}vh`,
        } as CSSProperties
      }
    >
      <div className="portfolio-clean-carousel-sticky">
        <div className="container mx-auto px-4">
          <div className="portfolio-showcase-content">
            <div className="portfolio-showcase-heading">
              <MotionReveal
                className="portfolio-section-heading portfolio-section-heading-light"
                direction="left"
              >
                <span>03 Project Showcase</span>
                <h2>Project lanes with visible scope, proof, and next action.</h2>
                <p>
                  A guided index for the portfolio archive: each lane shows what was built, why it
                  matters, and whether the viewer should inspect a case study, open a safe demo, or
                  visit a live route.
                </p>
              </MotionReveal>

              <MotionReveal className="portfolio-showcase-summary" delay={0.08}>
                <span>Active lane</span>
                <strong>
                  {String(activeIndex + 1).padStart(2, '0')} /{' '}
                  {String(projects.length).padStart(2, '0')}
                </strong>
                <p>{activeProject.category}</p>
                <small>{activeProject.status}</small>
              </MotionReveal>
            </div>

            <motion.div className="portfolio-clean-carousel">
              <div className="portfolio-clean-carousel-media">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeProject.id}
                    initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 34, scale: 0.98 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -34, scale: 0.98 }}
                    transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
                    className="relative h-full"
                  >
                    <motion.img
                      src={activeProject.image}
                      alt=""
                      className={`h-full w-full object-cover ${
                        activeProject.isAdult ? 'blur-xl' : ''
                      }`}
                      style={{ scale: mediaScale }}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_20%,rgba(5,5,7,0.76))]" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-[#f7c46a]">
                        {String(activeIndex + 1).padStart(2, '0')} / {activeProject.category}
                      </p>
                      <h3 className="mt-3 max-w-2xl text-4xl font-black leading-none md:text-5xl">
                        {activeProject.title}
                      </h3>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="portfolio-clean-carousel-copy">
                <div className="portfolio-carousel-control-row">
                  <span className="portfolio-carousel-status-pill">{activeProject.status}</span>
                  <span className="portfolio-carousel-counter">
                    {String(activeIndex + 1).padStart(2, '0')} /{' '}
                    {String(projects.length).padStart(2, '0')}
                  </span>
                  <div className="portfolio-carousel-control-group">
                    <button type="button" aria-label="Previous project" onClick={previousProject}>
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <button type="button" aria-label="Next project" onClick={nextProject}>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeProject.id}
                    initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
                    transition={{ duration: reduceMotion ? 0 : 0.24, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h3 className="mt-6 text-3xl font-black leading-none md:text-4xl">
                      {activeProject.title}
                    </h3>
                    <p className="portfolio-carousel-description">{activeProject.description}</p>
                    <p className="portfolio-carousel-impact">{activeProject.impact}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {activeProject.technologies.slice(0, 4).map(tech => (
                        <span key={tech} className="portfolio-carousel-tech">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => onSelect(activeProject)}
                      className="portfolio-carousel-primary"
                    >
                      Inspect case study
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            <div className="portfolio-clean-carousel-progress" aria-hidden="true">
              <motion.span
                animate={{ width: `${progress}%` }}
                transition={{ type: 'spring', stiffness: 220, damping: 34 }}
              />
            </div>

            <div
              ref={thumbsRef}
              className="portfolio-clean-carousel-thumbs"
              aria-label="Project carousel thumbnails"
            >
              {projects.map((project, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className="portfolio-clean-carousel-thumb"
                    aria-pressed={isActive}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="portfolio-carousel-thumb"
                        className="absolute inset-0 rounded-[1rem] border-2 border-[#f54e00]"
                      />
                    ) : null}
                    <span className="relative z-10 grid grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-3">
                      <img
                        src={project.image}
                        alt=""
                        className={`h-14 w-full rounded-[0.65rem] object-cover ${
                          project.isAdult ? 'blur-md' : ''
                        }`}
                      />
                      <span>
                        <span className="portfolio-clean-carousel-thumb-index">
                          {String(index + 1).padStart(2, '0')} / {project.category}
                        </span>
                        <span className="portfolio-clean-carousel-thumb-title">
                          {project.title}
                        </span>
                        <span className="portfolio-clean-carousel-thumb-status">
                          {project.status}
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectSpotlightCard({
  project,
  index,
  onSelect,
}: {
  project: PortfolioProject;
  index: number;
  onSelect: (project: PortfolioProject) => void;
}) {
  const cardRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });
  const side = index % 2 === 0 ? -1 : 1;
  const cardX = useTransform(
    scrollYProgress,
    [0, 0.34, 0.82, 1],
    reduceMotion ? [0, 0, 0, 0] : [side * 58, 0, 0, side * -20]
  );
  const cardOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.86, 1],
    reduceMotion ? [1, 1, 1, 1] : [0.25, 1, 1, 0.74]
  );
  const imageClipPath = useTransform(
    scrollYProgress,
    [0, 0.36, 1],
    reduceMotion
      ? ['inset(0% 0% 0% 0%)', 'inset(0% 0% 0% 0%)', 'inset(0% 0% 0% 0%)']
      : side < 0
        ? ['inset(0% 0% 0% 38%)', 'inset(0% 0% 0% 0%)', 'inset(0% 16% 0% 0%)']
        : ['inset(0% 38% 0% 0%)', 'inset(0% 0% 0% 0%)', 'inset(0% 0% 0% 16%)']
  );
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.46, 1],
    reduceMotion ? [1, 1, 1] : [1.18, 1.02, 1.08]
  );

  return (
    <motion.article
      ref={cardRef}
      layout
      className="portfolio-spotlight-card group"
      style={{ x: cardX, opacity: cardOpacity }}
      initial={reduceMotion ? { y: 0 } : { y: 24 }}
      whileInView={{ y: 0 }}
      whileHover={reduceMotion ? undefined : { y: -6, scale: 1.01 }}
      viewport={revealViewport}
      transition={{
        duration: reduceMotion ? 0 : 0.5,
        delay: reduceMotion ? 0 : Math.min(index * 0.05, 0.22),
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="relative aspect-[1.32/1] overflow-hidden rounded-[1.35rem] bg-[#101014]">
        <motion.img
          src={project.image}
          alt=""
          className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
            project.isAdult ? 'blur-xl' : ''
          }`}
          style={{ clipPath: imageClipPath, scale: imageScale }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,7,0.04),rgba(5,5,7,0.82))]" />
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
          <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/70 backdrop-blur">
            {project.status}
          </span>
          {project.demoUrl?.startsWith('/pantheon-demo') ? (
            <span className="flex items-center gap-1 rounded-full border border-[#f7c46a]/40 bg-[#f7c46a]/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#f7c46a]">
              <ShieldCheck className="h-3 w-3" />
              safe demo
            </span>
          ) : null}
        </div>
      </div>
      <div className="mt-5">
        <div className="portfolio-spotlight-card-kicker">
          <span>0{index + 1}</span>
          <span>{project.category}</span>
        </div>
        <h3 className="portfolio-spotlight-title">{project.title}</h3>
        <p className="portfolio-spotlight-body line-clamp-3">{project.content}</p>
        <p className="portfolio-spotlight-impact">{project.impact}</p>
        <ul className="portfolio-spotlight-feature-list">
          {project.keyFeatures.slice(0, 2).map(feature => (
            <li key={feature}>
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.slice(0, 5).map(tech => (
            <span key={tech} className="portfolio-spotlight-tech">
              {tech}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onSelect(project)}
          className="portfolio-spotlight-button"
        >
          Inspect case study
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </motion.article>
  );
}

function ProjectCta({
  project,
  onAdultLinkClick,
}: {
  project: PortfolioProject;
  onAdultLinkClick: EditorialPortfolioHomeProps['onAdultLinkClick'];
}) {
  if (!project.demoUrl) return null;

  const className =
    'inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-[#050507] transition-transform hover:-translate-y-0.5';

  if (project.isAdult) {
    return (
      <a href="#" onClick={onAdultLinkClick(project.demoUrl, project.title)} className={className}>
        Open preview
        <ArrowUpRight className="h-4 w-4" />
      </a>
    );
  }

  if (project.demoUrl.startsWith('/')) {
    return (
      <Link to={project.demoUrl} className={className}>
        Open preview
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    );
  }

  return (
    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={className}>
      Visit live project
      <ArrowUpRight className="h-4 w-4" />
    </a>
  );
}

function ProjectOverlay({
  project,
  onClose,
  onAdultLinkClick,
}: {
  project: PortfolioProject | null;
  onClose: () => void;
  onAdultLinkClick: EditorialPortfolioHomeProps['onAdultLinkClick'];
}) {
  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center bg-black/70 p-3 backdrop-blur-xl sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} case study`}
            className="relative grid max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-[1.8rem] border border-white/10 bg-[#08080b] text-white shadow-[0_34px_120px_rgba(0,0,0,0.55)] lg:grid-cols-[0.92fr_1.08fr]"
            initial={{ y: 60, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 250, damping: 28 }}
            onClick={event => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close case study"
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative min-h-[20rem] overflow-hidden rounded-t-[1.8rem] lg:rounded-l-[1.8rem] lg:rounded-tr-none">
              <img
                src={project.image}
                alt=""
                className={`absolute inset-0 h-full w-full object-cover ${
                  project.isAdult ? 'blur-xl' : ''
                }`}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,7,0.05),rgba(5,5,7,0.82))]" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f7c46a]">
                  {project.category}
                </p>
                <h3 className="mt-3 text-4xl font-black leading-none md:text-6xl">
                  {project.title}
                </h3>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-white/60">
                  {project.status}
                </span>
                <span className="rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-[#8be7ff]">
                  {project.impact}
                </span>
              </div>

              <p className="mt-6 text-lg leading-8 text-white/70">{project.content}</p>

              <div className="mt-8 grid gap-3">
                {project.keyFeatures.map(feature => (
                  <div
                    key={feature}
                    className="flex gap-3 rounded-[1rem] border border-white/10 bg-white/[0.035] p-4 text-sm leading-6 text-white/70"
                  >
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#f7c46a]" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs font-bold text-white/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ProjectCta project={project} onAdultLinkClick={onAdultLinkClick} />
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  <Link to="/projects">
                    Full archive
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function DesignReferenceBand() {
  return (
    <section className="border-y border-black/10 bg-[#f6f3ec] py-16 text-[#111113] dark:border-white/10 dark:bg-[#f4efe6]">
      <div className="container mx-auto px-4">
        <MotionReveal className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#f54e00]">
              Design MD references
            </span>
            <h2 className="mt-4 text-4xl font-black leading-[0.95] md:text-6xl">
              The page now borrows systems, not skins.
            </h2>
          </div>
          <p className="max-w-3xl text-lg leading-8 text-[#45413a]">
            The main portfolio blends a developer-tool editorial base with cinematic media,
            disciplined product proof, and Motion+ interactions. The goal is a portfolio that reads
            like a capable operating system, not a static resume.
          </p>
        </MotionReveal>

        <div className="mt-10 grid gap-px overflow-hidden rounded-[1.35rem] border border-black/10 bg-black/10 md:grid-cols-5">
          {designReferences.map((reference, index) => (
            <MotionReveal key={reference.label} delay={index * 0.05} className="bg-white p-5">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#f54e00]">
                {reference.label}
              </p>
              <p className="mt-5 text-sm font-semibold leading-6 text-[#302d28]">
                {reference.value}
              </p>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="process"
      className="portfolio-section portfolio-themed-section border-y border-white/10 bg-[#050507] text-white"
    >
      <div className="container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <MotionReveal>
            <span className="text-xs font-black uppercase tracking-[0.26em] text-[#f7c46a]">
              06 Method
            </span>
            <h2 className="mt-5 max-w-3xl text-5xl font-black leading-[0.92] md:text-7xl">
              Build the proof while building the thing.
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-8 text-white/60">
              Every project becomes a usable surface with routes, interaction states, owner-managed
              content, and a validation path.
            </p>
          </MotionReveal>

          <div className="grid gap-3">
            {processStages.map((stage, index) => {
              const isActive = index === active;

              return (
                <motion.button
                  key={stage.title}
                  type="button"
                  layout
                  onClick={() => setActive(index)}
                  onViewportEnter={() => setActive(index)}
                  viewport={{ amount: 0.8 }}
                  className="relative overflow-hidden rounded-[1.2rem] border border-white/10 bg-white/[0.035] p-5 text-left"
                  whileHover={{ y: -2 }}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="portfolio-process-active"
                      className="absolute inset-0 rounded-[1.2rem] bg-white"
                      transition={{ type: 'spring', stiffness: 300, damping: 32 }}
                    />
                  ) : null}
                  <span className="relative z-10 grid gap-3 md:grid-cols-[4rem_9rem_minmax(0,1fr)] md:items-start">
                    <span
                      className={`text-xs font-black uppercase tracking-[0.2em] ${
                        isActive ? 'text-[#f54e00]' : 'text-[#f7c46a]'
                      }`}
                    >
                      0{index + 1}
                    </span>
                    <strong
                      className={`text-2xl font-black leading-none ${
                        isActive ? 'text-[#050507]' : 'text-white'
                      }`}
                    >
                      {stage.title}
                    </strong>
                    <span
                      className={`text-sm leading-7 ${
                        isActive ? 'text-[#3b3832]' : 'text-white/60'
                      }`}
                    >
                      {stage.body}
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingActionDock() {
  const [open, setOpen] = useState(false);
  const actions = [
    { label: 'Work', href: '#selected-work', icon: Layers3 },
    { label: 'Pantheon', href: '/pantheon-demo', icon: Bot },
    { label: 'Contact', href: '#contact', icon: Mail },
    { label: 'Resume', href: '/resume.md', icon: FileDown, download: true },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-[60] hidden md:block">
      <div className="relative h-14 w-14">
        <AnimatePresence>
          {open
            ? actions.map((action, index) => {
                const Icon = action.icon;
                const y = -((index + 1) * 60);
                const item = (
                  <motion.a
                    key={action.label}
                    href={action.href}
                    download={action.download}
                    className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-[#08080b]/90 text-white shadow-[0_16px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl"
                    aria-label={action.label}
                    initial={{ y: 0, opacity: 0, scale: 0.4 }}
                    animate={{ y, opacity: 1, scale: 1 }}
                    exit={{ y: 0, opacity: 0, scale: 0.4 }}
                    transition={{
                      type: 'spring',
                      stiffness: 420,
                      damping: 28,
                      delay: index * 0.035,
                    }}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="absolute right-[calc(100%+0.65rem)] rounded-full border border-white/10 bg-[#08080b]/90 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-white/70 opacity-0 backdrop-blur-xl transition-opacity group-hover:opacity-100">
                      {action.label}
                    </span>
                  </motion.a>
                );

                if (action.href.startsWith('/pantheon')) {
                  return (
                    <motion.div key={action.label} className="group">
                      <Link to={action.href} className="sr-only">
                        {action.label}
                      </Link>
                      {item}
                    </motion.div>
                  );
                }

                return (
                  <motion.div key={action.label} className="group">
                    {item}
                  </motion.div>
                );
              })
            : null}
        </AnimatePresence>

        <motion.button
          type="button"
          aria-label={open ? 'Close quick actions' : 'Open quick actions'}
          onClick={() => setOpen(value => !value)}
          className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#050507] shadow-[0_18px_70px_rgba(247,196,106,0.25)]"
          animate={{ rotate: open ? 45 : 0 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          <MotionDotsGlyph active={open} />
        </motion.button>
      </div>
    </div>
  );
}

export function EditorialPortfolioHome({ onAdultLinkClick }: EditorialPortfolioHomeProps) {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollY: pageScrollY } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const { scrollYProgress: portraitProgress } = useScroll({
    target: portraitRef,
    offset: ['start end', 'center center'],
  });
  const heroTitleY = useTransform(heroProgress, [0, 1], reduceMotion ? [0, 0] : [0, -98]);
  const heroHeaderOpacity = useTransform(heroProgress, [0, 0.45], [1, 0.22]);
  const heroGridY = useTransform(heroProgress, [0, 1], reduceMotion ? [0, 0] : [0, 130]);
  const portraitScale = useTransform(portraitProgress, [0, 1], reduceMotion ? [1, 1] : [1.16, 1]);
  const portraitY = useTransform(portraitProgress, [0, 1], reduceMotion ? [0, 0] : [38, -20]);
  const stackTickerX = useTransform(
    pageScrollY,
    [0, 4600],
    reduceMotion ? ['0%', '0%'] : ['0%', '-24%'],
    { clamp: false }
  );

  useMotionValueEvent(pageScrollY, 'change', () => {
    // Keeps Motion subscribed for the sticky command UI without rendering on every frame.
  });

  return (
    <Layout>
      <MotionConfig reducedMotion="user">
        <div className="portfolio-epic">
          <PortfolioMotionProgress />
          <PortfolioCursorLayer />
          <FloatingActionDock />

          <section
            ref={heroRef}
            id="hero"
            className="portfolio-epic-hero relative min-h-[92svh] overflow-hidden border-b border-white/10 pt-24"
          >
            <div className="portfolio-ambient-grid" />
            <PortfolioThreeHeroCanvas className="portfolio-three-hero-canvas" />
            <motion.div className="portfolio-hero-glow" style={{ y: heroGridY }} />

            <div className="container relative z-10 mx-auto px-4 pb-16 pt-8 md:pb-24">
              <motion.div
                className="portfolio-enter portfolio-enter-1 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5 text-[11px] uppercase tracking-[0.28em] text-white/50"
                style={{ opacity: heroHeaderOpacity }}
              >
                <span>Independent systems studio</span>
                <span>Sibiu / Remote / 2026</span>
              </motion.div>

              <div className="grid max-w-6xl gap-10 py-10 lg:items-center">
                <motion.div style={{ y: heroTitleY }}>
                  <p className="portfolio-enter portfolio-enter-2 mb-5 inline-flex items-center gap-2 rounded-full border border-[#f54e00]/30 bg-[#f54e00]/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#ffb18d]">
                    <Sparkles className="h-3.5 w-3.5" />
                    AI systems portfolio
                  </p>
                  <h1 className="portfolio-enter portfolio-enter-3 max-w-5xl text-[clamp(3.25rem,8.8vw,7.2rem)] font-black leading-[0.9] tracking-normal">
                    Paul Doros
                    <span className="block">
                      builds{' '}
                      <span className="bg-[linear-gradient(90deg,#f54e00,#f7c46a,#00d4ff)] bg-clip-text text-transparent">
                        systems.
                      </span>
                    </span>
                  </h1>

                  <div className="portfolio-enter portfolio-enter-4 mt-7 grid gap-6 border-y border-white/10 py-6 md:grid-cols-[0.92fr_1.08fr]">
                    <p className="text-xl font-black leading-tight md:text-3xl">
                      AI products, agent operations, game prototypes, and launch automation with a
                      visible trail of proof.
                    </p>
                    <p className="max-w-2xl text-base leading-8 text-white/60 md:text-lg">
                      Each section has a job: show the operating system, show the work, prove the
                      process, and make the next action obvious without hiding the canvas behind
                      decorative panels.
                    </p>
                  </div>

                  <div className="portfolio-enter portfolio-enter-5 mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button
                      asChild
                      size="lg"
                      className="portfolio-action rounded-full bg-white px-7 text-[#050507] hover:bg-[#f4efe6]"
                    >
                      <a href="#selected-work">
                        View selected work
                        <ArrowDown className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="portfolio-action rounded-full border-white/20 bg-white/[0.035] px-7 text-white hover:bg-white/10 hover:text-white"
                    >
                      <Link to="/pantheon-demo">Open Pantheon demo</Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="portfolio-action rounded-full border-white/20 bg-transparent px-7 text-white hover:bg-white/10 hover:text-white"
                    >
                      <a href="/resume.md" download>
                        Resume
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </motion.div>
              </div>

              <div className="portfolio-enter portfolio-enter-6 portfolio-epic-rail">
                {projectRail.map(item => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </section>

          <ScrollTextLines />

          <CyberPortraitSequence />

          <section
            id="about"
            className="portfolio-section portfolio-themed-section border-b border-white/10 bg-[#09090d] text-white"
          >
            <div className="container mx-auto px-4">
              <MotionReveal className="portfolio-section-heading portfolio-section-heading-dark">
                <span>01 About</span>
                <h2>I design the operating layer around ambitious builds.</h2>
              </MotionReveal>

              <div className="grid gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:items-start">
                <motion.div
                  ref={portraitRef}
                  className="portfolio-epic-portrait"
                  style={{ y: portraitY }}
                  initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={revealViewport}
                  transition={{
                    duration: reduceMotion ? 0 : 0.68,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <motion.img
                    src="/img.png"
                    alt="Paul Ionut Doros"
                    style={{ scale: portraitScale }}
                  />
                  <div className="absolute bottom-5 left-5 right-5 rounded-[1.1rem] border border-white/10 bg-black/40 p-4 backdrop-blur-xl">
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f7c46a]">
                      Current mode
                    </p>
                    <p className="mt-2 text-lg font-black">
                      Product systems, AI agents, game paths.
                    </p>
                  </div>
                </motion.div>

                <div>
                  <MotionReveal className="max-w-4xl text-3xl font-black leading-[0.98] md:text-6xl">
                    The work sits between engineering, product taste, strategy, and automation. I
                    make the system visible, then make it shippable.
                  </MotionReveal>

                  <div className="mt-10 grid gap-4 md:grid-cols-3">
                    {portfolioStats.slice(0, 3).map((stat, index) => (
                      <MotionReveal
                        key={stat.label}
                        delay={index * 0.08}
                        className="rounded-[1.2rem] border border-white/10 bg-white/[0.035] p-5"
                      >
                        <span className="text-4xl font-black text-white">{stat.value}</span>
                        <p className="mt-3 text-xs font-black uppercase tracking-[0.2em] text-white/50">
                          {stat.label}
                        </p>
                      </MotionReveal>
                    ))}
                  </div>

                  <MotionReveal className="mt-10 max-w-3xl space-y-5 text-base leading-8 text-white/60">
                    <p>
                      I started with frontend and mobile interfaces, then kept moving toward the
                      missing pieces around the work: backend wiring, deployment, QA, agent
                      handoffs, game builds, admin operations, and clean proof that a thing actually
                      works.
                    </p>
                    <p>
                      Pantheon shows how I organize agents. The game tracks show how I prototype
                      playable loops. The AI SaaS and template work show how I turn abstract
                      requests into usable product architecture.
                    </p>
                  </MotionReveal>
                </div>
              </div>
            </div>
          </section>

          <CapabilityLab />

          <ProjectCarouselSection projects={carouselProjects} onSelect={setSelectedProject} />

          <section
            id="selected-work"
            className="portfolio-section portfolio-themed-section relative overflow-hidden bg-[#09090d] text-white"
          >
            <PortfolioProjectOrbitCanvas className="portfolio-project-orbit-canvas" />
            <div className="container relative z-10 mx-auto px-4">
              <div className="portfolio-selected-header">
                <MotionReveal
                  className="portfolio-section-heading portfolio-section-heading-dark"
                  direction="right"
                >
                  <span>04 Selected Work</span>
                  <h2>Case-study cards for the work worth inspecting.</h2>
                  <p>
                    A tighter set of builds across AI SaaS, Pantheon operations, game production,
                    client delivery, and template research. Each card keeps the outcome, stack, and
                    inspection path close to the image.
                  </p>
                </MotionReveal>

                <MotionReveal className="portfolio-selected-proof-grid" delay={0.08}>
                  {selectedWorkStats.map(stat => (
                    <span key={stat.label}>
                      <strong>{stat.value}</strong>
                      <small>{stat.label}</small>
                    </span>
                  ))}
                </MotionReveal>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {showcaseProjects.map((project, index) => (
                  <ProjectSpotlightCard
                    key={project.id}
                    project={project}
                    index={index}
                    onSelect={setSelectedProject}
                  />
                ))}
              </div>

              <MotionReveal className="mt-10 grid gap-5 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                <div>
                  <p className="text-lg font-black leading-7">
                    The full archive includes AI SaaS, Pantheon automation, game prototypes,
                    templates, commerce systems, invitation deployments, and event platforms.
                  </p>
                  <p className="mt-3 text-sm leading-6 text-white/60">
                    Featured cards now reveal from the side on scroll and keep the project image as
                    the primary signal, with the orbit canvas only reinforcing the systems theme.
                  </p>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  <Link to="/projects">
                    View all projects
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </MotionReveal>
            </div>
          </section>

          <ProofConsoleSection />

          <ProcessSection />

          <section
            id="skills"
            className="portfolio-section portfolio-themed-section portfolio-stack-section border-b border-white/10 bg-[#09090d] text-white"
          >
            <div className="container mx-auto px-4">
              <div className="portfolio-stack-header">
                <MotionReveal className="portfolio-section-heading portfolio-section-heading-dark">
                  <span>07 Stack</span>
                  <h2>Tools grouped by the job they do.</h2>
                  <p>
                    The stack is organized by delivery lane: interface, AI data, motion systems,
                    game production, agent operations, and launch proof.
                  </p>
                </MotionReveal>

                <MotionReveal className="portfolio-stack-rule" delay={0.08}>
                  <span>Stack rule</span>
                  <strong>Use the tool that makes the workflow clearer.</strong>
                  <p>
                    Motion for React state and layout. GSAP for timeline-heavy scroll scenes.
                    Three.js only when the canvas reinforces the system.
                  </p>
                </MotionReveal>
              </div>

              <div className="portfolio-motion-strip" aria-hidden="true">
                <motion.div className="portfolio-motion-strip-track" style={{ x: stackTickerX }}>
                  {[...projectRail, ...projectRail, ...projectRail].map((item, index) => (
                    <span key={`${item}-${index}`}>{item}</span>
                  ))}
                </motion.div>
              </div>

              <div className="portfolio-stack-layout">
                <MotionReveal className="portfolio-stack-command">
                  <span>Operating stack</span>
                  <h3>Build, simulate, validate, ship.</h3>
                  <p>
                    Each tool is mapped to a real delivery concern so the portfolio reads like an
                    operating system, not a random list of logos.
                  </p>
                  <div className="portfolio-stack-proof-list">
                    {stackProofRows.map(row => (
                      <div key={row.value}>
                        <strong>{row.value}</strong>
                        <span>{row.label}</span>
                      </div>
                    ))}
                  </div>
                </MotionReveal>

                <div className="portfolio-stack-group-grid">
                  {stackGroups.map((group, index) => {
                    const Icon = group.icon;

                    return (
                      <MotionReveal key={group.title} delay={index * 0.04}>
                        <motion.article
                          className="portfolio-stack-group"
                          whileHover={reduceMotion ? undefined : { y: -4 }}
                          transition={{ type: 'spring', stiffness: 360, damping: 34 }}
                        >
                          <div className="portfolio-stack-group-top">
                            <span>{group.label}</span>
                            <Icon className="h-5 w-5" />
                          </div>
                          <h3>{group.title}</h3>
                          <p>{group.description}</p>
                          <div className="portfolio-stack-group-tools">
                            {group.tools.map(tool => (
                              <span key={tool}>{tool}</span>
                            ))}
                          </div>
                          <small>{group.proof}</small>
                        </motion.article>
                      </MotionReveal>
                    );
                  })}
                </div>
              </div>

              <MotionReveal className="portfolio-stack portfolio-stack-dark">
                {stackItems.map(tool => (
                  <span key={tool}>{tool}</span>
                ))}
              </MotionReveal>
            </div>
          </section>

          <section
            id="contact"
            className="portfolio-section portfolio-themed-section bg-[#050507] text-white"
          >
            <div className="container mx-auto px-4">
              <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr]">
                <MotionReveal>
                  <span className="text-xs font-black uppercase tracking-[0.26em] text-[#f7c46a]">
                    08 Contact
                  </span>
                  <h2 className="mt-5 max-w-2xl text-5xl font-black leading-[0.9] tracking-normal md:text-8xl">
                    <ScrambleText as="span" active chars="PANTHEON0123456789#$%&">
                      Let&apos;s build the next system.
                    </ScrambleText>
                  </h2>
                  <p className="mt-8 max-w-xl text-lg leading-8 text-white/60">
                    Product, automation, AI systems, game prototypes, static demos, and production
                    launches. Send the shape of the work and I&apos;ll respond with the cleanest
                    next move.
                  </p>

                  <div className="mt-10 grid gap-3 text-sm">
                    {[
                      {
                        href: 'mailto:dorospaul26@gmail.com',
                        label: 'dorospaul26@gmail.com',
                        icon: Mail,
                      },
                      {
                        href: 'https://github.com/PaulDoros',
                        label: 'github.com/PaulDoros',
                        icon: Github,
                      },
                      {
                        href: 'https://www.linkedin.com/in/paul-doros-3468a2177',
                        label: 'linkedin.com/in/paul-doros',
                        icon: Linkedin,
                      },
                    ].map(item => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={item.href}
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="portfolio-contact-link portfolio-contact-link-dark"
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                          <ArrowUpRight className="ml-auto h-4 w-4" />
                        </a>
                      );
                    })}
                  </div>
                </MotionReveal>

                <MotionReveal className="portfolio-contact-panel portfolio-contact-panel-dark">
                  <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f7c46a]">
                        Start here
                      </p>
                      <h3 className="mt-2 text-2xl font-black">Project signal</h3>
                    </div>
                    <CircuitBoard className="h-6 w-6 text-[#f7c46a]" />
                  </div>
                  <ContactForm />
                </MotionReveal>
              </div>
            </div>
          </section>

          <ProjectOverlay
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onAdultLinkClick={onAdultLinkClick}
          />
        </div>
      </MotionConfig>
    </Layout>
  );
}
