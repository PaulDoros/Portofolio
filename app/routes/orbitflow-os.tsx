import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { MotionCopyButton, MotionLoadingProgress } from '~/components/showcase-motion-patterns';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BellRing,
  BookOpen,
  Boxes,
  CalendarClock,
  CheckCircle2,
  Cloud,
  Code2,
  CreditCard,
  DatabaseZap,
  Gauge,
  Headphones,
  LockKeyhole,
  MessagesSquare,
  MousePointer2,
  Network,
  PanelTopOpen,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Workflow,
} from 'lucide-react';
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from 'react';

export const meta: MetaFunction = () => [
  { title: 'OrbitFlow OS | Motion Showcase' },
  {
    name: 'description',
    content:
      'A Motion-powered SaaS website template with scroll text lines, iOS-style app folder transitions, pricing, docs, integrations, and support flows.',
  },
];

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

type FolderItem = {
  key: string;
  name: string;
  icon: string;
  color: string;
  layoutId?: string;
};

const folderItems: FolderItem[] = [
  { key: 'briefs', name: 'Briefs', icon: 'B', color: '#38BDF8' },
  { key: 'roadmap', name: 'Roadmap', icon: 'R', color: '#A78BFA' },
  { key: 'qa', name: 'QA', icon: 'Q', color: '#2DD4BF' },
  { key: 'alerts', name: 'Alerts', icon: 'A', color: '#F97316' },
  { key: 'automate', name: 'Automate', icon: 'W', color: '#22C55E', layoutId: 'orbit-app-1' },
  { key: 'insights', name: 'Insights', icon: 'I', color: '#FACC15', layoutId: 'orbit-app-2' },
  { key: 'docs', name: 'Docs', icon: 'D', color: '#60A5FA', layoutId: 'orbit-app-3' },
  { key: 'support', name: 'Support', icon: 'S', color: '#F472B6', layoutId: 'orbit-app-4' },
];

const textLines = [
  { text: 'Plan launches', reverse: false },
  { text: 'Ship workflows', reverse: true },
  { text: 'Sync teams', reverse: false },
  { text: 'Support users', reverse: true },
];

const productModules = [
  {
    icon: Workflow,
    title: 'Workflow builder',
    detail: 'Model intake, approval, release, and support paths with reusable automation blocks.',
    metric: '42 live flows',
  },
  {
    icon: Network,
    title: 'Integration mesh',
    detail:
      'Connect GitHub, Slack, Stripe, Jira, Linear, and custom webhooks from one owner console.',
    metric: '28 connectors',
  },
  {
    icon: Gauge,
    title: 'Ops command center',
    detail:
      'Track launch readiness, escalation risk, SLA pressure, and team load without spreadsheet drift.',
    metric: '94 score',
  },
];

const useCases = [
  ['Product teams', 'Turn feature requests into scoped work, release notes, and QA checks.'],
  ['Agencies', 'Give every client a branded portal with clear status and next actions.'],
  ['Support ops', 'Route tickets through triage, engineering review, and customer follow-up.'],
  ['Founders', 'Keep roadmap, billing, launch, and docs decisions visible in one workspace.'],
];

const integrations = [
  ['GitHub', 'Deployment evidence'],
  ['Stripe', 'Billing triggers'],
  ['Slack', 'Team alerts'],
  ['Jira', 'Delivery sync'],
  ['Vercel', 'Preview links'],
  ['Notion', 'Docs handoff'],
];

const pricing: Array<[string, string, string, string[]]> = [
  [
    'Starter',
    '$29',
    'For a small team validating one workflow',
    ['3 workspaces', '8 automations', 'Email support'],
  ],
  [
    'Scale',
    '$89',
    'For agencies and product teams shipping every week',
    ['15 workspaces', 'Unlimited workflows', 'SLA dashboard'],
  ],
  [
    'Enterprise',
    'Custom',
    'For regulated teams with advanced controls',
    ['SSO', 'Audit export', 'Private onboarding'],
  ],
];

const pageNavItems = [
  {
    id: 'features',
    label: 'Features',
    menu: ['Workflow builder', 'Command center', 'Release readiness'],
  },
  {
    id: 'use-cases',
    label: 'Use cases',
    menu: ['Product teams', 'Agencies', 'Support ops'],
  },
  {
    id: 'pricing',
    label: 'Pricing',
    menu: ['Starter', 'Scale', 'Enterprise'],
  },
  {
    id: 'docs',
    label: 'Docs',
    menu: ['SDK install', 'Flow templates', 'Support center'],
  },
];

const pageNavIds = pageNavItems.map(item => item.id);

const saasFaqs = [
  [
    'Can this template support a real SaaS signup flow?',
    'Yes. The static page already includes the expected product, pricing, docs, support, login, and signup intent sections so the owner can replace simulated content with real routes.',
  ],
  [
    'Where do integrations live?',
    'The connector directory is structured as owner-managed cards. Each card can become a real detail page with auth scopes, setup steps, and webhook status.',
  ],
  [
    'Is the animation decorative or functional?',
    'The Motion interactions are tied to navigation, page state, product module switching, folder expansion, scroll-linked text, and FAQ disclosure.',
  ],
];

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) return;
  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.history.replaceState(null, '', `#${id}`);
}

function useActiveSection(ids: string[]) {
  const [activeSection, setActiveSection] = useState(ids[0] ?? '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: '-28% 0px -58% 0px',
        threshold: [0.12, 0.32, 0.56],
      }
    );

    ids.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [ids]);

  return activeSection;
}

function OrbitNav() {
  const activeSection = useActiveSection(pageNavIds);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <div
      className="relative"
      onMouseLeave={() => setOpenMenu(null)}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpenMenu(null);
        }
      }}
    >
      <nav className="text-white/64 flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-white/10 bg-white/[0.06] p-1 text-xs font-bold">
        {pageNavItems.map(item => {
          const isActive = activeSection === item.id || openMenu === item.id;

          return (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              onHoverStart={() => setOpenMenu(item.id)}
              onFocus={() => setOpenMenu(item.id)}
              whileTap={{ scale: 0.96 }}
              className={`relative shrink-0 rounded-full px-4 py-2 transition ${
                isActive ? 'text-[#07111F]' : 'hover:text-white'
              }`}
            >
              {isActive ? (
                <motion.span
                  layoutId="orbit-nav-active"
                  className="absolute inset-0 rounded-full bg-cyan-200"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              ) : null}
              <span className="relative z-10">{item.label}</span>
            </motion.button>
          );
        })}
      </nav>

      <AnimatePresence>
        {openMenu ? (
          <motion.div
            key={openMenu}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 8, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            className="absolute left-1/2 top-full z-30 hidden w-[24rem] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-[#07111F]/95 p-4 shadow-[0_26px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:block"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={openMenu}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                className="grid gap-2"
              >
                {pageNavItems
                  .find(item => item.id === openMenu)
                  ?.menu.map((entry, index) => (
                    <motion.button
                      key={entry}
                      type="button"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.035 }}
                      onClick={() => {
                        scrollToSection(openMenu);
                        setOpenMenu(null);
                      }}
                      className="text-white/82 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-sm font-semibold transition hover:bg-white/[0.08]"
                    >
                      {entry}
                      <ArrowRight className="h-4 w-4 text-cyan-200" />
                    </motion.button>
                  ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function MotionActionLink({
  href,
  children,
  variant = 'primary',
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}) {
  return (
    <motion.a
      href={href}
      onClick={event => {
        if (href.startsWith('#')) {
          event.preventDefault();
          scrollToSection(href.slice(1));
        }
      }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      className={`group inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 font-black transition ${
        variant === 'primary'
          ? 'bg-cyan-300 text-[#07111F] shadow-[0_24px_70px_rgba(34,211,238,0.22)] hover:bg-white'
          : 'border border-white/15 bg-white/[0.06] text-white hover:bg-white/[0.1]'
      }`}
    >
      <span className="relative flex h-5 flex-col overflow-hidden">
        <motion.span className="leading-5" layout>
          {children}
        </motion.span>
        <motion.span aria-hidden className="leading-5 text-current opacity-70" layout>
          {children}
        </motion.span>
      </span>
      <motion.span
        aria-hidden="true"
        className="flex h-5 w-5 items-center justify-center"
        whileHover={{ x: 2 }}
      >
        <ArrowRight className="h-4 w-4" />
      </motion.span>
    </motion.a>
  );
}

function AppTile({ item, layoutId }: { item: FolderItem; layoutId?: string }) {
  return (
    <motion.div
      layoutId={layoutId}
      aria-label={item.name}
      className="flex h-full w-full items-center justify-center rounded-[1.05rem] text-sm font-black text-[#07111F] shadow-[0_16px_34px_rgba(0,0,0,0.22)]"
      style={{
        background: `linear-gradient(135deg, ${item.color}, #F7FAFC)`,
        willChange: 'transform',
      }}
    >
      {item.icon}
    </motion.div>
  );
}

function OpenFolderItem({
  item,
  index,
  items,
  itemRefs,
  itemOffsets,
  offsetsReady,
}: {
  item: FolderItem;
  index: number;
  items: FolderItem[];
  itemRefs: MutableRefObject<Record<string, HTMLDivElement | null>>;
  itemOffsets: Record<string, { x: number; y: number }>;
  offsetsReady: boolean;
}) {
  const offset = itemOffsets[item.key] ?? { x: 0, y: 0 };
  const hasLayout = Boolean(item.layoutId);
  const nonLayoutTotal = items.filter(candidate => !candidate.layoutId).length;
  const nonLayoutIndex = items.slice(0, index).filter(candidate => !candidate.layoutId).length;

  return (
    <motion.div
      ref={node => {
        itemRefs.current[item.key] = node;
      }}
      className="flex min-w-0 flex-col items-center"
      initial={
        hasLayout
          ? { opacity: 1 }
          : offsetsReady
            ? { opacity: 0, scale: 0.2, x: offset.x, y: offset.y }
            : { opacity: 0 }
      }
      animate={
        hasLayout
          ? { opacity: 1 }
          : offsetsReady
            ? { opacity: 1, scale: 1, x: 0, y: 0 }
            : { opacity: 0 }
      }
      exit={
        hasLayout
          ? { opacity: 1 }
          : {
              opacity: 0,
              scale: 0.2,
              x: offset.x,
              y: offset.y,
              transition: {
                type: 'spring',
                stiffness: 220,
                damping: 24,
                delay: -0.09 + (nonLayoutTotal - 1 - nonLayoutIndex) * 0.025,
              },
            }
      }
      transition={{
        type: 'spring',
        stiffness: 220,
        damping: 24,
        delay: hasLayout ? 0 : -0.02 + nonLayoutIndex * 0.025,
      }}
    >
      <div className="h-16 w-16 sm:h-20 sm:w-20">
        <AppTile item={item} layoutId={item.layoutId} />
      </div>
      {hasLayout ? (
        <motion.div
          layoutId={`orbit-label-${item.layoutId}`}
          className="text-white/82 mt-2 max-w-[6.5rem] truncate text-xs font-semibold"
        >
          {item.name}
        </motion.div>
      ) : (
        <div className="text-white/82 mt-2 max-w-[6.5rem] truncate text-xs font-semibold">
          {item.name}
        </div>
      )}
    </motion.div>
  );
}

function OrbitAppFolder({ items = folderItems }: { items?: FolderItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const miniGridRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);
  const [itemOffsets, setItemOffsets] = useState<Record<string, { x: number; y: number }>>({});

  const openFolder = useCallback(() => {
    const rect = miniGridRef.current?.getBoundingClientRect();
    if (rect) {
      setOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    }
    setIsOpen(true);
  }, []);

  const closeFolder = useCallback(() => setIsOpen(false), []);

  useIsomorphicLayoutEffect(() => {
    if (!isOpen || !origin) return;

    const nextOffsets: Record<string, { x: number; y: number }> = {};
    for (const item of items) {
      const node = itemRefs.current[item.key];
      if (!node) continue;
      const rect = node.getBoundingClientRect();
      nextOffsets[item.key] = {
        x: origin.x - (rect.left + rect.width / 2),
        y: origin.y - (rect.top + rect.height / 2),
      };
    }

    setItemOffsets(nextOffsets);
  }, [isOpen, origin, items]);

  const offsetsReady = Boolean(
    isOpen && origin && Object.keys(itemOffsets).length === items.length
  );

  return (
    <div className="relative flex min-h-[25rem] items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-[#0A1220] p-6 shadow-[0_34px_110px_rgba(0,0,0,0.36)]">
      <div className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent" />
      <AnimatePresence
        mode="popLayout"
        initial={false}
        onExitComplete={() => {
          if (!isOpen) {
            setOrigin(null);
            setItemOffsets({});
          }
        }}
      >
        {!isOpen ? (
          <motion.button
            key="closed"
            type="button"
            onClick={openFolder}
            className="group flex flex-col items-center gap-3 text-center"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="border-white/12 rounded-[1.7rem] border bg-white/[0.14] p-3 shadow-[0_24px_60px_rgba(0,0,0,0.3)] backdrop-blur-xl">
              <div className="grid grid-cols-2 gap-2">
                {items
                  .filter(item => !item.layoutId)
                  .slice(0, 3)
                  .map(item => (
                    <div key={item.key} className="h-14 w-14">
                      <AppTile item={item} />
                    </div>
                  ))}
                <div ref={miniGridRef} className="grid h-14 w-14 grid-cols-2 gap-1">
                  {items
                    .filter(item => item.layoutId)
                    .slice(0, 4)
                    .map(item => (
                      <div key={item.key} className="relative">
                        <AppTile item={item} layoutId={item.layoutId} />
                        <motion.div layoutId={`orbit-label-${item.layoutId}`} className="sr-only">
                          {item.name}
                        </motion.div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <span className="text-sm font-bold text-white/80">Open workspace folder</span>
            <span className="text-xs text-white/45">Motion layoutId + AnimatePresence</span>
          </motion.button>
        ) : (
          <motion.div
            key="open"
            className="bg-[#07111F]/92 absolute inset-0 z-20 flex items-center justify-center p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.02 } }}
            onClick={closeFolder}
          >
            <motion.div
              className="border-white/12 w-full max-w-xl rounded-[2rem] border bg-white/[0.08] p-6 shadow-[0_34px_110px_rgba(0,0,0,0.45)]"
              onClick={event => event.stopPropagation()}
            >
              <motion.div
                className="text-center text-xl font-black text-white"
                initial={{ opacity: 0, y: 22, scale: 0.86 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 22, scale: 0.86 }}
              >
                OrbitFlow Command Apps
              </motion.div>
              <div className="mt-6 grid grid-cols-4 gap-5">
                {items.map((item, index) => (
                  <OpenFolderItem
                    key={
                      item.layoutId ? item.key : `${item.key}-${offsetsReady ? 'ready' : 'wait'}`
                    }
                    item={item}
                    index={index}
                    items={items}
                    itemRefs={itemRefs}
                    itemOffsets={itemOffsets}
                    offsetsReady={offsetsReady}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={closeFolder}
                className="mt-7 w-full rounded-2xl bg-white px-5 py-3 text-sm font-black text-[#07111F]"
              >
                Close folder
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ScrollTextLines() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const lineOne = useTransform(scrollY, [0, 1400], ['0%', '-22%']);
  const lineTwo = useTransform(scrollY, [0, 1400], ['-18%', '10%']);
  const lineThree = useTransform(scrollY, [0, 1400], ['3%', '-16%']);
  const lineFour = useTransform(scrollY, [0, 1400], ['-12%', '18%']);
  const offsets = [lineOne, lineTwo, lineThree, lineFour];

  return (
    <section className="overflow-hidden bg-[#07111F] py-20">
      <div className="mx-auto mb-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/70">Scroll text lines</p>
        <h2 className="mt-3 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl">
          The product promise moves with the page instead of fading in again.
        </h2>
      </div>
      <div className="flex flex-col gap-3">
        {textLines.map((line, index) => (
          <motion.div
            key={line.text}
            className="flex w-[180vw] gap-6 whitespace-nowrap"
            style={{ x: shouldReduceMotion ? 0 : offsets[index], willChange: 'transform' }}
          >
            {Array.from({ length: 6 }).map((_, repeatIndex) => (
              <span
                key={`${line.text}-${repeatIndex}`}
                className={`text-5xl font-black uppercase leading-none sm:text-7xl lg:text-8xl ${
                  repeatIndex % 2
                    ? 'text-transparent [-webkit-text-stroke:1px_rgba(219,234,254,0.44)]'
                    : 'text-white'
                }`}
              >
                {line.text}
              </span>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ProductModuleTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const activeModule = productModules[activeIndex];
  const ActiveIcon = activeModule.icon;

  const selectModule = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  return (
    <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.08)]">
      <div className="flex flex-wrap gap-2 border-b border-slate-200 bg-slate-50 p-3">
        {productModules.map((module, index) => {
          const isActive = activeIndex === index;

          return (
            <motion.button
              key={module.title}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => selectModule(index)}
              whileTap={{ scale: 0.96 }}
              className={`relative rounded-2xl px-4 py-3 text-sm font-black transition ${
                isActive ? 'text-[#07111F]' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {isActive ? (
                <motion.span
                  layoutId="orbit-module-tab"
                  className="absolute inset-0 rounded-2xl bg-cyan-200"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              ) : null}
              <span className="relative z-10">{module.title}</span>
            </motion.button>
          );
        })}
      </div>

      <div className="relative min-h-[20rem] overflow-hidden p-6">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={activeModule.title}
            custom={direction}
            initial={{ opacity: 0, x: direction * 42, filter: 'blur(4px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: direction * -42, filter: 'blur(4px)' }}
            transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
            className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-center"
          >
            <div>
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#07111F] text-cyan-200">
                <ActiveIcon className="h-7 w-7" />
              </div>
              <h3 className="text-3xl font-black">{activeModule.title}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                {activeModule.detail}
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {['Owner', 'Automation', activeModule.metric].map((label, index) => (
                  <div key={label} className="rounded-2xl bg-slate-100 px-4 py-3">
                    <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                      {index === 2 ? 'Signal' : `Layer ${index + 1}`}
                    </div>
                    <div className="mt-1 font-black">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              layout
              className="rounded-[1.4rem] border border-slate-200 bg-[#07111F] p-5 text-white"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">
                  Live preview
                </span>
                <span className="h-3 w-3 rounded-full bg-emerald-300" />
              </div>
              <div className="space-y-3">
                {[0, 1, 2].map(index => (
                  <motion.div
                    key={index}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                    className="h-10 origin-left rounded-xl bg-white/[0.08]"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function SupportAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mt-6 overflow-hidden rounded-[1.4rem] border border-white/60 bg-white/55">
      {saasFaqs.map(([question, answer], index) => {
        const isOpen = openIndex === index;

        return (
          <motion.section
            key={question}
            initial={false}
            animate={isOpen ? 'open' : 'closed'}
            className="border-b border-slate-200 last:border-b-0"
          >
            <h4>
              <motion.button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                whileTap={{ scale: 0.99 }}
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-sm font-black text-[#07111F]"
              >
                <span>{question}</span>
                <motion.span
                  variants={{ open: { rotate: 180 }, closed: { rotate: 0 } }}
                  className="text-cyan-800"
                >
                  <ArrowRight className="h-4 w-4 rotate-90" />
                </motion.span>
              </motion.button>
            </h4>
            <motion.div
              variants={{
                open: { height: 'auto', opacity: 1 },
                closed: { height: 0, opacity: 0 },
              }}
              className="overflow-hidden"
            >
              <p className="px-4 pb-4 text-sm leading-7 text-slate-700">{answer}</p>
            </motion.div>
          </motion.section>
        );
      })}
    </div>
  );
}

export default function OrbitFlowOsRoute() {
  const heroRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const [headerHidden, setHeaderHidden] = useState(false);
  const progressScale = useSpring(useTransform(scrollYProgress, [0, 1], [0.08, 1]), {
    stiffness: 120,
    damping: 24,
    mass: 0.6,
  });
  const { scrollYProgress: heroZoomProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroSceneScale = useTransform(heroZoomProgress, [0, 1], [1, 1.24]);
  const heroSceneOpacity = useTransform(heroZoomProgress, [0, 0.82, 1], [1, 0.9, 0]);
  const heroSceneFilter = useTransform(heroZoomProgress, [0, 1], ['blur(0px)', 'blur(9px)']);
  const heroContentY = useTransform(heroZoomProgress, [0, 1], ['0%', '-18%']);
  const heroContentOpacity = useTransform(heroZoomProgress, [0, 0.7, 1], [1, 1, 0]);

  useMotionValueEvent(scrollY, 'change', current => {
    const previous = scrollY.getPrevious() ?? 0;
    setHeaderHidden(current > previous && current > 150);
  });

  return (
    <MotionConfig reducedMotion="user" transition={{ type: 'spring', stiffness: 220, damping: 24 }}>
      <main className="min-h-screen overflow-hidden bg-[#F5F8FB] text-[#07111F]">
        <motion.div
          aria-hidden="true"
          className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-cyan-400"
          style={{ scaleX: progressScale }}
        />

        <section ref={heroRef} className="relative h-[150vh] bg-[#07111F] text-white">
          <div className="sticky top-0 h-screen overflow-hidden">
            <motion.div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                scale: reduceMotion ? 1 : heroSceneScale,
                opacity: reduceMotion ? 1 : heroSceneOpacity,
                filter: reduceMotion ? 'blur(0px)' : heroSceneFilter,
                willChange: 'transform, opacity, filter',
              }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(120deg,#07111F,#0A1E35_55%,#132B46)]" />
              <div className="absolute left-[6%] top-[18%] h-56 w-80 rounded-[2rem] border border-cyan-200/15 bg-white/[0.08] shadow-[0_30px_120px_rgba(34,211,238,0.12)]" />
              <div className="absolute right-[8%] top-[14%] h-48 w-72 rounded-[2rem] border border-violet-200/15 bg-white/[0.07] shadow-[0_30px_120px_rgba(167,139,250,0.14)]" />
              <div className="absolute bottom-[10%] left-[22%] h-64 w-[32rem] rounded-[2rem] border border-white/10 bg-white/[0.05]" />
            </motion.div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-5 sm:px-6 lg:px-8">
              <motion.header
                animate={{ y: headerHidden ? -92 : 0, opacity: headerHidden ? 0 : 1 }}
                transition={{ duration: 0.28, ease: 'easeInOut' }}
                className="flex items-center justify-between gap-4"
              >
                <Link
                  to="/pantheon-demo"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-xs uppercase tracking-[0.18em] text-cyan-100 transition hover:-translate-y-0.5 hover:bg-white/[0.1]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Pantheon
                </Link>
                <div className="flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-2 text-sm font-black text-cyan-100">
                  <Cloud className="h-4 w-4" />
                  OrbitFlow OS
                </div>
                <OrbitNav />
                <a
                  href="#pricing"
                  className="hidden rounded-full bg-cyan-300 px-4 py-2 text-sm font-black text-[#07111F] transition hover:-translate-y-0.5 hover:bg-white sm:inline-flex"
                >
                  Start trial
                </a>
              </motion.header>

              <motion.div
                className="grid gap-10 py-16 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:items-center lg:py-20"
                style={{
                  y: reduceMotion ? 0 : heroContentY,
                  opacity: reduceMotion ? 1 : heroContentOpacity,
                }}
              >
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-2 text-xs uppercase tracking-[0.22em] text-cyan-100"
                  >
                    <Sparkles className="h-4 w-4" />
                    SaaS template with real product paths
                  </motion.div>
                  <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 }}
                    className="max-w-5xl text-5xl font-black leading-[0.94] tracking-tight sm:text-7xl"
                  >
                    Run product launches from one animated command space.
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.16 }}
                    className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg"
                  >
                    OrbitFlow OS is a full SaaS website template with feature modules, use cases,
                    integrations, pricing, docs, support, signup intent, and product UI previews.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.24 }}
                    className="mt-8 flex flex-wrap gap-3"
                  >
                    <MotionActionLink href="#features">Explore product</MotionActionLink>
                    <MotionActionLink href="#docs" variant="secondary">
                      Read docs
                    </MotionActionLink>
                  </motion.div>
                </div>

                <OrbitAppFolder />
              </motion.div>
            </div>
          </div>
        </section>

        <ScrollTextLines />

        <section id="features" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 grid gap-4 lg:grid-cols-[minmax(0,1fr)_28rem] lg:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-cyan-700">Features</p>
                <h2 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
                  Product pages, not placeholder sections.
                </h2>
              </div>
              <p className="text-sm leading-7 text-slate-600">
                The template includes concrete SaaS modules an owner can swap for real product data:
                workflows, integrations, dashboards, docs, support, and billing.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {productModules.map(({ icon: Icon, title, detail, metric }, index) => (
                <motion.article
                  key={title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: index * 0.06 }}
                  whileHover={{ y: -8 }}
                  className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_22px_70px_rgba(15,23,42,0.08)]"
                >
                  <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#07111F] text-cyan-200">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-black">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{detail}</p>
                  <div className="mt-6 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-black text-[#0A1E35]">
                    {metric}
                  </div>
                </motion.article>
              ))}
            </div>
            <ProductModuleTabs />
          </div>
        </section>

        <section id="use-cases" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[22rem_minmax(0,1fr)]">
            <aside>
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-700">Use cases</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight">
                Role-specific pages for real buying intent.
              </h2>
              <div className="mt-7 space-y-3">
                {['Signup', 'Login', 'Docs', 'Support'].map(item => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-cyan-600" />
                    <span className="font-bold">{item} route placeholder</span>
                  </div>
                ))}
              </div>
            </aside>
            <div className="grid gap-4 md:grid-cols-2">
              {useCases.map(([title, detail], index) => (
                <motion.article
                  key={title}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-[1.4rem] border border-slate-200 bg-[#F5F8FB] p-5"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800">
                    {index === 0 ? (
                      <Rocket className="h-6 w-6" />
                    ) : index === 1 ? (
                      <UsersRound className="h-6 w-6" />
                    ) : index === 2 ? (
                      <Headphones className="h-6 w-6" />
                    ) : (
                      <PanelTopOpen className="h-6 w-6" />
                    )}
                  </div>
                  <h3 className="text-2xl font-black">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{detail}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-cyan-700">Integrations</p>
                <h2 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
                  A connector directory with useful owner-managed data.
                </h2>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600">
                <Search className="h-4 w-4" />
                Search connectors
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {integrations.map(([name, detail], index) => (
                <motion.article
                  key={name}
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                  whileHover={{ y: -5, borderColor: '#22D3EE' }}
                  className="rounded-[1.25rem] border border-slate-200 bg-white p-5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#07111F] text-cyan-200">
                      <Boxes className="h-6 w-6" />
                    </div>
                    <BadgeCheck className="h-5 w-5 text-cyan-600" />
                  </div>
                  <h3 className="mt-5 text-xl font-black">{name}</h3>
                  <p className="mt-2 text-sm text-slate-600">{detail}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-[#07111F] px-4 py-20 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl">
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/70">Pricing</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                Pricing that makes the signup path visible.
              </h2>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {pricing.map(([name, price, detail, list], index) => (
                <motion.article
                  key={name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className={`rounded-[1.5rem] border p-6 ${
                    index === 1
                      ? 'border-cyan-200 bg-cyan-200 text-[#07111F]'
                      : 'border-white/10 bg-white/[0.06]'
                  }`}
                >
                  <h3 className="text-2xl font-black">{name}</h3>
                  <div className="mt-4 text-5xl font-black">{price}</div>
                  <p
                    className={`mt-4 text-sm leading-7 ${index === 1 ? 'text-slate-800' : 'text-slate-300'}`}
                  >
                    {detail}
                  </p>
                  <div className="mt-7 space-y-3">
                    {(list as string[]).map(item => (
                      <div key={item} className="flex items-center gap-2 text-sm font-bold">
                        <CheckCircle2 className="h-4 w-4" />
                        {item}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className={`mt-7 w-full rounded-2xl px-5 py-3 font-black ${
                      index === 1 ? 'bg-[#07111F] text-white' : 'bg-white text-[#07111F]'
                    }`}
                  >
                    {index === 2 ? 'Book demo' : 'Start trial'}
                  </button>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="docs" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[minmax(0,1fr)_26rem]">
            <div className="rounded-[1.6rem] border border-slate-200 bg-white p-6">
              <div className="mb-6 flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-cyan-700" />
                <h2 className="text-3xl font-black">Docs and onboarding</h2>
              </div>
              <div className="grid gap-3">
                {[
                  ['Install SDK', 'Copy environment keys and verify workspace permissions.'],
                  ['Create first flow', 'Pick intake, approval, launch, or support templates.'],
                  ['Invite team', 'Assign owners, escalation windows, and notification channels.'],
                ].map(([title, detail]) => (
                  <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="font-black">{title}</div>
                    <div className="mt-1 text-sm text-slate-600">{detail}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                <MotionLoadingProgress
                  label="Workspace bootstrap"
                  tone="cyan"
                  resetKey="orbit-docs"
                  className="bg-slate-950 text-white"
                />
                <MotionCopyButton
                  value="npm create orbitflow-workspace@latest"
                  copiedLabel="Command copied"
                  className="border-slate-200 bg-slate-950 text-white hover:bg-cyan-950"
                >
                  Copy install command
                </MotionCopyButton>
              </div>
            </div>
            <aside className="rounded-[1.6rem] border border-slate-200 bg-[#E9F8FB] p-6">
              <MessagesSquare className="mb-5 h-7 w-7 text-cyan-800" />
              <h3 className="text-3xl font-black">Support center</h3>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                Real SaaS templates need support intent: help articles, billing questions, status,
                security, and escalation rules.
              </p>
              <div className="mt-6 grid gap-3">
                {[
                  { icon: BellRing, label: 'Status alerts' },
                  { icon: CreditCard, label: 'Billing help' },
                  { icon: LockKeyhole, label: 'Security review' },
                  { icon: Code2, label: 'API examples' },
                  { icon: CalendarClock, label: 'Onboarding call' },
                  { icon: DatabaseZap, label: 'Data export' },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-2xl bg-white/70 px-4 py-3"
                  >
                    <Icon className="h-5 w-5 text-cyan-800" />
                    <span className="font-bold">{label}</span>
                  </div>
                ))}
              </div>
              <SupportAccordion />
            </aside>
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[1.75rem] bg-[#07111F] p-6 text-white shadow-[0_30px_100px_rgba(15,23,42,0.24)] lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/70">
                  Conversion flow
                </p>
                <h2 className="mt-3 text-4xl font-black tracking-tight">
                  Trial, docs, support, and demo paths are all represented.
                </h2>
              </div>
              <motion.button
                type="button"
                onClick={() => scrollToSection('pricing')}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-300 px-6 py-4 font-black text-[#07111F] transition hover:bg-white"
              >
                Simulate signup
                <MousePointer2 className="h-5 w-5" />
              </motion.button>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { icon: ShieldCheck, label: 'SOC2-ready copy' },
                { icon: Rocket, label: 'Launch checklist' },
                { icon: Headphones, label: 'Support playbook' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <Icon className="mb-3 h-5 w-5 text-cyan-200" />
                  <div className="font-bold">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </MotionConfig>
  );
}
