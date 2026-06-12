import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import {
  FloatingTargetButton,
  HoldToConfirmButton,
  MotionLoadingProgress,
} from '~/components/showcase-motion-patterns';
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CalendarDays,
  Check,
  Clock3,
  Dumbbell,
  Flame,
  HeartPulse,
  MapPin,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Target,
  Users,
  Zap,
} from 'lucide-react';
import { useRef, useState } from 'react';
import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react';

export const meta: MetaFunction = () => [
  { title: 'PulseFit Studio | Motion Showcase' },
  {
    name: 'description',
    content:
      'A real PulseFit Studio website showcase built with Motion, premium CSS spring easing, class scheduling, trainers, memberships, and mobile-first booking.',
  },
];

const springTransition = {
  type: 'spring',
  stiffness: 260,
  damping: 30,
  mass: 0.9,
} as const;

const revealTransition = {
  duration: 0.55,
  ease: [0.16, 1, 0.3, 1],
} as const;

const classes = [
  {
    id: 'hiit-dawn',
    title: 'HIIT Dawn',
    time: '06:30',
    coach: 'Mara',
    room: 'Engine room',
    duration: '42m',
    track: 'Conditioning',
    bestFor: 'Members who want a sharp cardio and strength block before work.',
    intensity: 'Explosive',
    spots: '8 spots',
    color: '#22C55E',
  },
  {
    id: 'mobility-lab',
    title: 'Mobility Lab',
    time: '12:15',
    coach: 'Eli',
    room: 'Recovery deck',
    duration: '35m',
    track: 'Recovery',
    bestFor: 'Desk-heavy members who need hips, shoulders, and breathing reset.',
    intensity: 'Recovery',
    spots: '14 spots',
    color: '#38BDF8',
  },
  {
    id: 'strength-circuit',
    title: 'Strength Circuit',
    time: '18:00',
    coach: 'Nia',
    room: 'Rack bay',
    duration: '55m',
    track: 'Strength',
    bestFor: 'Intermediate lifters who want structured progression without a private plan.',
    intensity: 'Progressive',
    spots: '6 spots',
    color: '#F97316',
  },
];

const trainers = [
  {
    name: 'Mara Voss',
    focus: 'HIIT and conditioning',
    proof: '12k coached sessions',
    image:
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Eli Moreno',
    focus: 'Mobility and recovery',
    proof: 'Movement specialist',
    image:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Nia Brooks',
    focus: 'Strength programming',
    proof: 'Precision coaching',
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80',
  },
];

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$79',
    detail: '4 classes monthly',
    fit: 'Best for testing the studio before committing.',
    features: ['Class booking', 'Coach check-in', 'Recovery guide'],
  },
  {
    id: 'studio',
    name: 'Studio',
    price: '$149',
    detail: 'Unlimited classes',
    fit: 'Best for members training two or more times per week.',
    features: ['Priority booking', 'Progress dashboard', 'Guest pass'],
    featured: true,
  },
  {
    id: 'performance',
    name: 'Performance',
    price: '$229',
    detail: 'Training plus coaching',
    fit: 'Best for members who want programming and monthly testing.',
    features: ['Unlimited classes', 'Monthly assessment', 'Custom plan'],
  },
];

const bookingSteps = [
  {
    title: 'Pick class',
    detail: 'Choose the room, coach, and intensity that match the trial visitor.',
  },
  {
    title: 'Confirm contact',
    detail: 'Show the lightweight contact step without pretending to submit a booking.',
  },
  {
    title: 'Arrive 10m early',
    detail: 'Set expectations for coach intro, equipment setup, and class fit check.',
  },
];

const memberGoals = [
  {
    id: 'first-week',
    title: 'First week',
    metric: '3 classes',
    detail:
      'A trial member path that starts with one conditioning class, one mobility class, and one coach check-in.',
    steps: ['Book trial', 'Meet coach', 'Choose plan'],
    color: '#22C55E',
  },
  {
    id: 'performance',
    title: 'Performance',
    metric: '6 weeks',
    detail:
      'A structured performance track with strength baselines, recovery windows, and weekly progression.',
    steps: ['Assess', 'Train', 'Review'],
    color: '#F97316',
  },
  {
    id: 'recovery',
    title: 'Recovery',
    metric: '4 resets',
    detail:
      'A calmer path for members who need guided mobility, lower intensity, and habit rebuilding.',
    steps: ['Screen', 'Reset', 'Maintain'],
    color: '#38BDF8',
  },
];

const studioDetails = [
  {
    title: 'Opening hours',
    value: 'Mon-Fri 06:00-21:30',
    detail: 'Weekend recovery blocks and private coaching run from 08:00-14:00.',
  },
  {
    title: 'Location',
    value: '14 Meridian Street',
    detail: 'Two blocks from the tram stop, with bike racks and paid parking nearby.',
  },
  {
    title: 'First visit',
    value: 'Arrive 10m early',
    detail: 'Trial members get a coach intro, equipment setup, and a class fit check.',
  },
];

const studioFaqs = [
  ['Do I need experience?', 'No. Trial members are placed into a class path by goal and comfort.'],
  ['Can I change plans?', 'Yes. The membership preview shows upgrade and downgrade paths clearly.'],
  ['What should I bring?', 'Training shoes, water, and a towel. Recovery tools are provided.'],
];

export default function PulseFitStudioRoute() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [selectedClass, setSelectedClass] = useState(classes[0]);
  const [selectedPlan, setSelectedPlan] = useState(plans[1]);
  const [selectedGoal, setSelectedGoal] = useState(memberGoals[0]);
  const [bookingStep, setBookingStep] = useState(0);
  const [trialConfirmed, setTrialConfirmed] = useState(false);
  const boardX = useMotionValue(0);
  const boardY = useMotionValue(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollYProgress);
  const pageProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.6 });
  const classRailX = useTransform(scrollYProgress, [0, 1], ['0%', '-26%']);
  const classRailTilt = useSpring(useTransform(scrollVelocity, [-1.4, 1.4], [-5, 5]), {
    stiffness: 180,
    damping: 22,
  });
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImageScale = useTransform(heroProgress, [0, 1], [1, 1.08]);
  const heroCopyY = useTransform(heroProgress, [0, 1], ['0%', '-8%']);
  const heroCardY = useTransform(heroProgress, [0, 1], ['0%', '10%']);
  const classBoardSpotlight = useMotionTemplate`radial-gradient(520px circle at ${boardX}px ${boardY}px, rgba(34, 197, 94, 0.18), transparent 62%)`;
  const bookingProgress = (bookingStep + 1) / bookingSteps.length;

  return (
    <MotionConfig reducedMotion="user" transition={springTransition}>
      <main className="min-h-screen overflow-hidden bg-[#07110E] text-white">
        <motion.div
          className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-emerald-300"
          style={{ scaleX: pageProgress }}
        />

        <section ref={heroRef} className="relative min-h-screen overflow-hidden">
          <motion.img
            src="https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=2200&q=80"
            alt="PulseFit Studio training floor"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.34]"
            style={{ scale: reduceMotion ? 1 : heroImageScale }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,17,14,0.98),rgba(7,17,14,0.82)_44%,rgba(7,17,14,0.38))]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#07110E] to-transparent" />

          <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
            <Link
              to="/pantheon-demo"
              className="pulse-motion-card inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-xs uppercase tracking-[0.18em] text-white/70 hover:-translate-y-0.5 hover:border-emerald-300/40 hover:text-white motion-reduce:hover:translate-y-0"
            >
              <ArrowLeft className="h-4 w-4" />
              Pantheon
            </Link>
            <div className="flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-sm font-bold text-emerald-100">
              <HeartPulse className="h-4 w-4" />
              PulseFit Studio
            </div>
            <nav className="text-white/62 hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] p-1 text-xs font-bold lg:flex">
              {[
                ['Classes', '#schedule'],
                ['Trainers', '#trainers'],
                ['Plans', '#plans'],
                ['Details', '#details'],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="rounded-full px-3 py-2 transition hover:bg-white/[0.08] hover:text-white"
                >
                  {label}
                </a>
              ))}
            </nav>
            <a
              href="#book"
              className="pulse-motion-card hidden rounded-full bg-white px-4 py-2 text-sm font-bold text-[#07110E] hover:-translate-y-0.5 hover:bg-emerald-200 motion-reduce:hover:translate-y-0 sm:inline-flex"
            >
              Book trial
            </a>
          </header>

          <div className="relative z-10 mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-10 px-4 pb-14 pt-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_26rem] lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={revealTransition}
              style={{ y: reduceMotion ? 0 : heroCopyY }}
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-2 text-xs uppercase tracking-[0.2em] text-emerald-100">
                <Sparkles className="h-4 w-4" />
                Mobile-first booking studio
              </div>
              <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl">
                Book the class that changes your week.
              </h1>
              <p className="text-white/72 mt-6 max-w-2xl text-base leading-8 sm:text-lg">
                PulseFit combines live-feeling schedules, coach proof, membership clarity, and
                Motion-powered interactions tuned for fast mobile conversion.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#schedule"
                  className="pulse-motion-card inline-flex items-center gap-2 rounded-full bg-emerald-300 px-6 py-3 font-bold text-[#07110E] shadow-[0_22px_60px_rgba(34,197,94,0.28)] hover:-translate-y-1 hover:bg-emerald-200 motion-reduce:hover:translate-y-0"
                >
                  See today&apos;s classes
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#plans"
                  className="pulse-motion-card border-white/12 text-white/82 inline-flex items-center gap-2 rounded-full border bg-white/[0.07] px-6 py-3 font-semibold hover:-translate-y-1 hover:border-cyan-200/30 hover:bg-white/[0.11] motion-reduce:hover:translate-y-0"
                >
                  Compare plans
                </a>
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ ...springTransition, delay: 0.1 }}
              style={{ y: reduceMotion ? 0 : heroCardY }}
              className="bg-[#07110E]/72 relative rounded-[2rem] border border-white/10 p-4 shadow-[0_32px_100px_rgba(0,0,0,0.42)] backdrop-blur-xl"
            >
              <div className="absolute -right-4 -top-8 hidden lg:block">
                <FloatingTargetButton
                  href="#book"
                  text="book trial"
                  image="https://images.unsplash.com/photo-1571019613914-85f342c6a11e?auto=format&fit=crop&w=900&q=80"
                  accent="#6EE7B7"
                />
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-emerald-200/70">
                      Next class
                    </p>
                    <h2 className="mt-2 text-3xl font-black">HIIT Dawn</h2>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-300 text-[#07110E]">
                    <Flame className="h-7 w-7" />
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    ['06:30', 'Start'],
                    ['42m', 'Length'],
                    ['8', 'Spots'],
                  ].map(([value, label]) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-black/25 p-3">
                      <div className="text-xl font-black">{value}</div>
                      <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/45">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: '24%' }}
                    animate={{ width: '72%' }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-300 via-cyan-300 to-orange-300"
                  />
                </div>
                <div className="mt-4">
                  <MotionLoadingProgress
                    label="App slot sync"
                    tone="emerald"
                    resetKey={selectedClass.id}
                  />
                </div>
              </div>
            </motion.aside>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/70">
                Scroll velocity reel
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                A fitness template should feel kinetic before the schedule starts.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-white/55">
              The class strip links horizontal movement and tilt to page velocity, so PulseFit feels
              like a training product instead of a static brochure.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-4">
            <motion.div
              className="flex w-max gap-4"
              style={{
                x: reduceMotion ? 0 : classRailX,
                rotate: reduceMotion ? 0 : classRailTilt,
                willChange: 'transform',
              }}
            >
              {[...classes, ...classes].map((item, index) => (
                <motion.button
                  key={`${item.id}-${index}`}
                  type="button"
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedClass(item)}
                  className="pulse-motion-card grid h-36 w-64 shrink-0 content-between rounded-[1.4rem] border border-white/10 bg-black/20 p-4 text-left hover:border-emerald-300/30"
                >
                  <span className="flex items-center justify-between">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-2xl text-[#07110E]"
                      style={{ backgroundColor: item.color }}
                    >
                      <Zap className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-bold text-white/50">{item.duration}</span>
                  </span>
                  <span>
                    <span className="block text-xl font-black">{item.title}</span>
                    <span className="mt-1 block text-xs uppercase tracking-[0.16em] text-white/45">
                      {item.track} / {item.spots}
                    </span>
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="schedule" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-emerald-200/70">Schedule</p>
              <h2 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
                Today&apos;s class board
              </h2>
            </div>
            <div className="text-white/64 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm">
              Updated live in the real product. Static for this showcase.
            </div>
          </div>

          <LayoutGroup>
            <motion.div
              onPointerMove={event => {
                const rect = event.currentTarget.getBoundingClientRect();
                boardX.set(event.clientX - rect.left);
                boardY.set(event.clientY - rect.top);
              }}
              className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.035] p-2"
            >
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{ background: reduceMotion ? 'transparent' : classBoardSpotlight }}
              />
              <div className="relative grid gap-4 md:grid-cols-3">
                {classes.map((item, index) => (
                  <motion.article
                    key={item.title}
                    layout
                    whileHover={{ y: -6 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedClass(item)}
                    transition={{ ...springTransition, delay: index * 0.07 }}
                    className={`pulse-motion-card relative cursor-pointer overflow-hidden rounded-[1.5rem] border p-5 shadow-[0_18px_60px_rgba(0,0,0,0.18)] ${
                      selectedClass.id === item.id
                        ? 'border-emerald-300/45 bg-emerald-300/[0.12]'
                        : 'border-white/10 bg-white/[0.055]'
                    }`}
                  >
                    {selectedClass.id === item.id ? (
                      <motion.span
                        layoutId="pulse-active-class"
                        className="pointer-events-none absolute inset-0 rounded-[1.5rem] bg-emerald-300/[0.08] shadow-[inset_0_0_0_1px_rgba(110,231,183,0.18)]"
                      />
                    ) : null}
                    <div className="relative">
                      <div className="mb-5 flex items-center justify-between gap-3">
                        <span
                          className="flex h-12 w-12 items-center justify-center rounded-2xl text-[#07110E]"
                          style={{ backgroundColor: item.color }}
                        >
                          <Activity className="h-6 w-6" />
                        </span>
                        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">
                          {item.spots}
                        </span>
                      </div>
                      <h3 className="text-2xl font-black">{item.title}</h3>
                      <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-white/65">
                        <span className="inline-flex items-center gap-2">
                          <Clock3 className="h-4 w-4" />
                          {item.time}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          {item.coach}
                        </span>
                      </div>
                      <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-sm">
                        {item.intensity} intensity
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>

            <motion.div
              layout
              className="mt-5 grid gap-5 rounded-[1.75rem] border border-white/10 bg-white/[0.055] p-5 lg:grid-cols-[minmax(0,1fr)_22rem]"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedClass.id}
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-emerald-200/70">
                    <Smartphone className="h-4 w-4" />
                    Member app preview
                  </div>
                  <h3 className="text-4xl font-black">{selectedClass.title}</h3>
                  <p className="text-white/62 mt-3 max-w-2xl text-sm leading-7">
                    {selectedClass.bestFor}
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-4">
                    {[
                      ['Coach', selectedClass.coach],
                      ['Room', selectedClass.room],
                      ['Length', selectedClass.duration],
                      ['Track', selectedClass.track],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="rounded-2xl border border-white/10 bg-black/20 p-4"
                      >
                        <div className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                          {label}
                        </div>
                        <div className="mt-2 font-black">{value}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="rounded-[1.35rem] border border-emerald-300/20 bg-emerald-300/[0.08] p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-emerald-100/70">
                      Booking state
                    </p>
                    <h4 className="mt-1 text-2xl font-black">{selectedClass.spots}</h4>
                  </div>
                  <BarChart3 className="h-7 w-7 text-emerald-200" />
                </div>
                <div className="space-y-3">
                  {bookingSteps.map((step, index) => {
                    const active = index <= bookingStep;

                    return (
                      <motion.div
                        key={step.title}
                        animate={{
                          opacity: active ? 1 : 0.48,
                          x: active ? 0 : 6,
                        }}
                        className="flex items-start gap-3 rounded-2xl bg-black/20 p-3"
                      >
                        <motion.span
                          animate={{
                            scale: active ? 1 : 0.88,
                            backgroundColor: active ? '#6EE7B7' : 'rgba(255,255,255,0.14)',
                          }}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black text-[#07110E]"
                        >
                          {active ? <Check className="h-4 w-4" /> : index + 1}
                        </motion.span>
                        <span>
                          <span className="text-white/86 block text-sm font-bold">
                            {step.title}
                          </span>
                          <span className="mt-1 block text-xs leading-5 text-white/50">
                            {step.detail}
                          </span>
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={false}
                    animate={{ scaleX: bookingProgress }}
                    style={{ transformOrigin: 'left center' }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-300 via-cyan-300 to-orange-300"
                  />
                </div>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setBookingStep(step => (step + 1) % bookingSteps.length)}
                  className="pulse-motion-card mt-5 w-full rounded-2xl bg-emerald-300 px-4 py-3 text-sm font-black text-[#07110E] hover:bg-emerald-200"
                >
                  Simulate next booking step
                </motion.button>
                <div className="mt-4">
                  <MotionLoadingProgress
                    label="Coach availability check"
                    tone="cyan"
                    resetKey={`${selectedClass.id}-${bookingStep}`}
                  />
                </div>
              </div>
            </motion.div>
          </LayoutGroup>
        </section>

        <section
          id="trainers"
          className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/70">Trainers</p>
            <h2 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
              Coach proof before the booking tap.
            </h2>
            <p className="text-white/64 mt-5 text-sm leading-7">
              The site surfaces coach specialty, credibility, and class fit directly beside the
              conversion flow, so new members know who they are booking with.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {trainers.map((trainer, index) => (
              <motion.article
                key={trainer.name}
                whileHover={{ y: -6 }}
                transition={{ ...springTransition, delay: index * 0.08 }}
                className="pulse-motion-card overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.055]"
              >
                <img src={trainer.image} alt={trainer.name} className="h-44 w-full object-cover" />
                <div className="p-4">
                  <h3 className="font-bold">{trainer.name}</h3>
                  <p className="mt-1 text-sm text-emerald-100/70">{trainer.focus}</p>
                  <p className="text-white/42 mt-3 text-xs uppercase tracking-[0.18em]">
                    {trainer.proof}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="plans" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.24em] text-orange-200/70">Memberships</p>
            <h2 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
              Simple plans, no membership fog.
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {plans.map((plan, index) => {
              const active = selectedPlan.id === plan.id;

              return (
                <motion.button
                  key={plan.name}
                  type="button"
                  layout
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPlan(plan)}
                  transition={{ ...springTransition, delay: index * 0.08 }}
                  className={`pulse-motion-card relative overflow-hidden rounded-[1.5rem] border p-6 text-left ${
                    active
                      ? 'border-emerald-300/40 bg-emerald-300/[0.12] shadow-[0_24px_80px_rgba(34,197,94,0.16)]'
                      : 'border-white/10 bg-white/[0.045]'
                  }`}
                >
                  {active ? (
                    <motion.span
                      layoutId="pulse-plan-active"
                      className="pointer-events-none absolute inset-0 rounded-[1.5rem] bg-[radial-gradient(circle_at_50%_0%,rgba(110,231,183,0.2),transparent_58%)]"
                    />
                  ) : null}
                  <span className="relative block">
                    <span className="flex items-start justify-between gap-3">
                      <span>
                        <span className="block text-2xl font-black">{plan.name}</span>
                        <span className="mt-1 block text-sm text-white/55">{plan.detail}</span>
                      </span>
                      {plan.featured ? (
                        <span className="rounded-full bg-emerald-300 px-3 py-1 text-xs font-black text-[#07110E]">
                          Best fit
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-6 block text-5xl font-black">
                      {plan.price}
                      <span className="text-base font-medium text-white/45">/mo</span>
                    </span>
                    <span className="text-white/58 mt-5 block text-sm leading-6">{plan.fit}</span>
                    <span className="mt-6 block space-y-3">
                      {plan.features.map(feature => (
                        <span
                          key={feature}
                          className="text-white/72 flex items-center gap-2 text-sm"
                        >
                          <Check className="h-4 w-4 text-emerald-300" />
                          {feature}
                        </span>
                      ))}
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </div>

          <motion.div
            layout
            className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-5"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPlan.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="grid gap-4 md:grid-cols-[minmax(0,1fr)_18rem] md:items-center"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-emerald-200/70">
                    Selected membership
                  </p>
                  <h3 className="mt-2 text-3xl font-black">
                    {selectedPlan.name} gives the trial visitor a clear next step.
                  </h3>
                  <p className="text-white/62 mt-3 text-sm leading-7">{selectedPlan.fit}</p>
                </div>
                <div className="rounded-[1.2rem] border border-emerald-300/20 bg-emerald-300/[0.08] p-4">
                  <div className="text-4xl font-black text-emerald-200">{selectedPlan.price}</div>
                  <div className="mt-2 text-sm text-white/60">Static membership preview</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/70">Member journey</p>
              <h2 className="mt-2 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl">
                A fitness template should include the product loop after signup.
              </h2>
            </div>
            <p className="text-white/62 text-sm leading-7">
              Motion layout transitions keep the app-like goal selector clean while the page remains
              a frontend-only showcase.
            </p>
          </div>

          <LayoutGroup>
            <div className="grid gap-4 lg:grid-cols-[20rem_minmax(0,1fr)]">
              <div className="grid gap-3">
                {memberGoals.map(goal => {
                  const active = selectedGoal.id === goal.id;

                  return (
                    <motion.button
                      key={goal.id}
                      type="button"
                      layout
                      onClick={() => setSelectedGoal(goal)}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`rounded-[1.25rem] border p-4 text-left transition ${
                        active
                          ? 'border-cyan-300/40 bg-cyan-300/[0.12] text-white'
                          : 'border-white/10 bg-white/[0.045] text-white/65'
                      }`}
                    >
                      <Target className="mb-4 h-5 w-5" style={{ color: goal.color }} />
                      <span className="block text-xl font-black">{goal.title}</span>
                      <span className="mt-2 block text-sm">{goal.metric}</span>
                    </motion.button>
                  );
                })}
              </div>

              <motion.article
                layout
                className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.055]"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedGoal.id}
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="grid gap-5 p-5 md:grid-cols-[minmax(0,1fr)_18rem]"
                  >
                    <div>
                      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-2 text-xs uppercase tracking-[0.2em] text-white/55">
                        <Zap className="h-4 w-4" style={{ color: selectedGoal.color }} />
                        Goal path
                      </div>
                      <h3 className="text-4xl font-black">{selectedGoal.title}</h3>
                      <p className="text-white/64 mt-4 max-w-2xl text-sm leading-7">
                        {selectedGoal.detail}
                      </p>
                    </div>
                    <div className="rounded-[1.35rem] border border-white/10 bg-black/20 p-4">
                      <div className="text-white/42 text-[10px] uppercase tracking-[0.18em]">
                        Target
                      </div>
                      <div
                        className="mt-2 text-4xl font-black"
                        style={{ color: selectedGoal.color }}
                      >
                        {selectedGoal.metric}
                      </div>
                      <div className="mt-5 grid gap-2">
                        {selectedGoal.steps.map((step, index) => (
                          <div
                            key={step}
                            className="flex items-center gap-3 rounded-2xl bg-white/[0.06] p-3"
                          >
                            <span
                              className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-black text-[#07110E]"
                              style={{ backgroundColor: selectedGoal.color }}
                            >
                              {index + 1}
                            </span>
                            <span className="text-sm font-bold">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.article>
            </div>
          </LayoutGroup>
        </section>

        <section id="details" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-emerald-200/70">
                Studio details
              </p>
              <h2 className="mt-2 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl">
                The useful business pages are baked into the template.
              </h2>
            </div>
            <p className="text-white/62 text-sm leading-7">
              A real fitness website needs more than hype: hours, location, first-visit notes,
              policies, and questions that reduce booking anxiety.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {studioDetails.map((detail, index) => (
              <motion.article
                key={detail.title}
                whileHover={{ y: -5 }}
                transition={{ ...springTransition, delay: index * 0.07 }}
                className="pulse-motion-card rounded-[1.45rem] border border-white/10 bg-white/[0.055] p-5"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-300 text-[#07110E]">
                  {index === 0 ? (
                    <Clock3 className="h-6 w-6" />
                  ) : index === 1 ? (
                    <MapPin className="h-6 w-6" />
                  ) : (
                    <ShieldCheck className="h-6 w-6" />
                  )}
                </div>
                <p className="text-white/42 text-xs uppercase tracking-[0.2em]">{detail.title}</p>
                <h3 className="mt-2 text-2xl font-black">{detail.value}</h3>
                <p className="text-white/62 mt-3 text-sm leading-7">{detail.detail}</p>
              </motion.article>
            ))}
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_24rem]">
            <motion.div
              transition={springTransition}
              className="rounded-[1.65rem] border border-white/10 bg-white/[0.055] p-5"
            >
              <div className="mb-5 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-cyan-200/70">
                <Smartphone className="h-4 w-4" />
                Owner-managed content
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {['Class capacity', 'Coach availability', 'Trial member notes'].map(item => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <Check className="mb-3 h-5 w-5 text-emerald-300" />
                    <p className="font-bold">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="rounded-[1.65rem] border border-emerald-300/20 bg-emerald-300/[0.08] p-5">
              <div className="mb-5 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-emerald-100/70">
                <Dumbbell className="h-4 w-4" />
                Quick FAQ
              </div>
              <div className="space-y-3">
                {studioFaqs.map(([question, answer]) => (
                  <div key={question} className="rounded-2xl bg-black/20 p-4">
                    <h3 className="font-black">{question}</h3>
                    <p className="text-white/62 mt-2 text-sm leading-6">{answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="book" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <div className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] lg:grid-cols-[1fr_24rem]">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-2 text-xs uppercase tracking-[0.2em] text-white/55">
                <CalendarDays className="h-4 w-4" />
                Trial class preview
              </div>
              <h2 className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
                A booking flow that feels finished before backend wiring.
              </h2>
              <p className="text-white/62 mt-4 max-w-2xl text-sm leading-7">
                This page is a real route in the portfolio deployment. The booking UI is static, but
                the motion system, responsive layout, visual direction, and conversion path are
                production-shaped.
              </p>
            </div>
            <div className="border-t border-white/10 bg-black/20 p-6 lg:border-l lg:border-t-0">
              <div className="rounded-[1.5rem] border border-emerald-300/20 bg-emerald-300/[0.08] p-5">
                <Dumbbell className="mb-5 h-8 w-8 text-emerald-200" />
                <div className="text-3xl font-black">2-step trial</div>
                <p className="text-white/62 mt-3 text-sm leading-6">
                  Choose class, confirm contact. No dead-end marketing page.
                </p>
                <div className="mt-6">
                  <HoldToConfirmButton
                    label="Hold to reserve"
                    confirmedLabel="Reserved"
                    onConfirm={() => setTrialConfirmed(true)}
                  />
                </div>
                <AnimatePresence initial={false}>
                  {trialConfirmed ? (
                    <motion.p
                      initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                      className="mt-5 rounded-2xl border border-emerald-300/20 bg-black/20 px-4 py-3 text-sm font-bold text-emerald-100"
                    >
                      Static confirmation created for the showcase.
                    </motion.p>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>
      </main>
    </MotionConfig>
  );
}
