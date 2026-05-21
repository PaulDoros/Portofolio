import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Dumbbell,
  Flame,
  HeartPulse,
  Sparkles,
  Users,
} from 'lucide-react';
import { MotionConfig, motion } from 'framer-motion';

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
    title: 'HIIT Dawn',
    time: '06:30',
    coach: 'Mara',
    intensity: 'Explosive',
    spots: '8 spots',
    color: '#22C55E',
  },
  {
    title: 'Mobility Lab',
    time: '12:15',
    coach: 'Eli',
    intensity: 'Recovery',
    spots: '14 spots',
    color: '#38BDF8',
  },
  {
    title: 'Strength Circuit',
    time: '18:00',
    coach: 'Nia',
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
    name: 'Starter',
    price: '$79',
    detail: '4 classes monthly',
    features: ['Class booking', 'Coach check-in', 'Recovery guide'],
  },
  {
    name: 'Studio',
    price: '$149',
    detail: 'Unlimited classes',
    features: ['Priority booking', 'Progress dashboard', 'Guest pass'],
    featured: true,
  },
  {
    name: 'Performance',
    price: '$229',
    detail: 'Training plus coaching',
    features: ['Unlimited classes', 'Monthly assessment', 'Custom plan'],
  },
];

export default function PulseFitStudioRoute() {
  return (
    <MotionConfig reducedMotion="user" transition={springTransition}>
      <main className="min-h-screen overflow-hidden bg-[#07110E] text-white">
        <section className="relative min-h-screen overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=2200&q=80"
            alt="PulseFit Studio training floor"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.34]"
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
              className="bg-[#07110E]/72 rounded-[2rem] border border-white/10 p-4 shadow-[0_32px_100px_rgba(0,0,0,0.42)] backdrop-blur-xl"
            >
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
              </div>
            </motion.aside>
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

          <div className="grid gap-4 md:grid-cols-3">
            {classes.map((item, index) => (
              <motion.article
                key={item.title}
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ ...springTransition, delay: index * 0.07 }}
                className="pulse-motion-card rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.18)]"
              >
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
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
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
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                viewport={{ once: true, margin: '-80px' }}
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
            {plans.map((plan, index) => (
              <motion.article
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ ...springTransition, delay: index * 0.08 }}
                className={`pulse-motion-card rounded-[1.5rem] border p-6 ${
                  plan.featured
                    ? 'border-emerald-300/35 bg-emerald-300/[0.12] shadow-[0_24px_80px_rgba(34,197,94,0.16)]'
                    : 'border-white/10 bg-white/[0.045]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-black">{plan.name}</h3>
                    <p className="mt-1 text-sm text-white/55">{plan.detail}</p>
                  </div>
                  {plan.featured ? (
                    <span className="rounded-full bg-emerald-300 px-3 py-1 text-xs font-black text-[#07110E]">
                      Best fit
                    </span>
                  ) : null}
                </div>
                <div className="mt-6 text-5xl font-black">
                  {plan.price}
                  <span className="text-base font-medium text-white/45">/mo</span>
                </div>
                <div className="mt-6 space-y-3">
                  {plan.features.map(feature => (
                    <div key={feature} className="text-white/72 flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-emerald-300" />
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
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
              </div>
            </div>
          </div>
        </section>
      </main>
    </MotionConfig>
  );
}
