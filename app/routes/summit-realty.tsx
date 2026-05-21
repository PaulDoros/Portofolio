import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  Compass,
  Home,
  MapPin,
  MoveRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useRef, useState } from 'react';
import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

export const meta: MetaFunction = () => [
  { title: 'Summit Realty | Motion Showcase' },
  {
    name: 'description',
    content:
      'A premium Summit Realty showcase built with Motion layout transitions, scroll-linked animation, SVG path drawing, and property discovery interactions.',
  },
];

const springTransition = {
  type: 'spring',
  stiffness: 280,
  damping: 32,
  mass: 0.9,
} as const;

const revealTransition = {
  duration: 0.62,
  ease: [0.16, 1, 0.3, 1],
} as const;

const listings = [
  {
    id: 'hillcrest-loft',
    name: 'Hillcrest Loft',
    area: 'Northline District',
    price: '$1.18M',
    beds: '3 bed',
    baths: '2.5 bath',
    size: '2,140 sqft',
    tag: 'Skyline terrace',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    color: '#38BDF8',
  },
  {
    id: 'garden-row',
    name: 'Garden Row Home',
    area: 'Westerly Village',
    price: '$820K',
    beds: '4 bed',
    baths: '3 bath',
    size: '2,480 sqft',
    tag: 'Courtyard living',
    image:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
    color: '#F59E0B',
  },
  {
    id: 'harbor-view',
    name: 'Harbor View House',
    area: 'Marina Ridge',
    price: '$1.42M',
    beds: '4 bed',
    baths: '3.5 bath',
    size: '2,920 sqft',
    tag: 'Waterfront light',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    color: '#14B8A6',
  },
];

const neighborhoods = [
  ['Marina Ridge', 'Waterfront walks, top schools, sunset dining', '17 listings'],
  ['Northline District', 'Converted warehouses, skyline views, transit', '9 listings'],
  ['Westerly Village', 'Tree-lined blocks, garden homes, family parks', '14 listings'],
];

const trustStats = [
  ['24', 'featured homes'],
  ['7', 'neighborhood guides'],
  ['4.9', 'buyer rating'],
  ['31d', 'avg close time'],
];

export default function SummitRealtyRoute() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [selectedListing, setSelectedListing] = useState(listings[0]);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.6,
  });
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImageY = useTransform(heroProgress, [0, 1], ['0%', '14%']);
  const heroCopyY = useTransform(heroProgress, [0, 1], ['0%', '-8%']);
  const mapPathLength = useSpring(useTransform(heroProgress, [0.08, 0.84], [0.12, 1]), {
    stiffness: 80,
    damping: 18,
  });

  return (
    <MotionConfig reducedMotion="user" transition={springTransition}>
      <main className="min-h-screen overflow-hidden bg-[#F5F4EE] text-[#13221F]">
        <motion.div
          className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-[#0F766E]"
          style={{ scaleX: progressScale }}
        />

        <section ref={heroRef} className="relative min-h-screen overflow-hidden bg-[#13221F]">
          <motion.img
            src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=2400&q=80"
            alt="Modern Summit Realty home interior"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.48]"
            style={{ y: reduceMotion ? 0 : heroImageY }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(19,34,31,0.98),rgba(19,34,31,0.74)_46%,rgba(56,189,248,0.18))]" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#F5F4EE] via-[#F5F4EE]/40 to-transparent" />

          <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
            <Link
              to="/pantheon-demo"
              className="summit-motion-card text-white/78 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3 py-2 text-xs uppercase tracking-[0.18em] backdrop-blur hover:-translate-y-0.5 hover:border-sky-200/45 hover:text-white motion-reduce:hover:translate-y-0"
            >
              <ArrowLeft className="h-4 w-4" />
              Pantheon
            </Link>
            <div className="flex items-center gap-2 rounded-full border border-sky-200/25 bg-sky-200/10 px-3 py-2 text-sm font-bold text-sky-50">
              <Home className="h-4 w-4" />
              Summit Realty
            </div>
            <a
              href="#listings"
              className="summit-motion-card hidden rounded-full bg-white px-4 py-2 text-sm font-bold text-[#13221F] hover:-translate-y-0.5 hover:bg-sky-100 motion-reduce:hover:translate-y-0 sm:inline-flex"
            >
              View listings
            </a>
          </header>

          <div className="relative z-10 mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-10 px-4 pb-20 pt-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_28rem] lg:px-8">
            <motion.div style={{ y: reduceMotion ? 0 : heroCopyY }}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={revealTransition}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-200/25 bg-sky-200/10 px-3 py-2 text-xs uppercase tracking-[0.22em] text-sky-100"
              >
                <Sparkles className="h-4 w-4" />
                Listing discovery with Motion
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...revealTransition, delay: 0.08 }}
                className="max-w-5xl text-5xl font-black leading-[0.94] tracking-tight text-white sm:text-7xl lg:text-8xl"
              >
                Find the address that fits the next chapter.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...revealTransition, delay: 0.16 }}
                className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg"
              >
                Summit Realty turns listings, neighborhood proof, agent trust, and consultation
                intent into one polished real estate experience.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...revealTransition, delay: 0.24 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <a
                  href="#listings"
                  className="summit-motion-card inline-flex items-center gap-2 rounded-full bg-sky-300 px-6 py-3 font-bold text-[#13221F] shadow-[0_22px_60px_rgba(56,189,248,0.24)] hover:-translate-y-1 hover:bg-sky-200 motion-reduce:hover:translate-y-0"
                >
                  Explore homes
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#valuation"
                  className="summit-motion-card inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-6 py-3 font-semibold text-white/85 backdrop-blur hover:-translate-y-1 hover:border-teal-200/40 hover:bg-white/[0.12] motion-reduce:hover:translate-y-0"
                >
                  Seller valuation
                </a>
              </motion.div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, x: 34, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ ...springTransition, delay: 0.14 }}
              className="border-white/12 rounded-[2rem] border bg-white/[0.08] p-4 shadow-[0_32px_110px_rgba(0,0,0,0.35)] backdrop-blur-xl"
            >
              <div className="overflow-hidden rounded-[1.55rem] bg-[#F5F4EE] text-[#13221F]">
                <div className="relative h-56">
                  <img
                    src={selectedListing.image}
                    alt={selectedListing.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-sm uppercase tracking-[0.18em] text-sky-100">
                      Featured listing
                    </div>
                    <div className="mt-1 flex items-end justify-between gap-4">
                      <h2 className="text-3xl font-black">{selectedListing.name}</h2>
                      <span className="rounded-full bg-white px-3 py-1 text-sm font-black text-[#13221F]">
                        {selectedListing.price}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 p-4 text-sm">
                  {[selectedListing.beds, selectedListing.baths, selectedListing.size].map(item => (
                    <div key={item} className="rounded-2xl bg-[#E8E1D2] px-3 py-3 font-bold">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.aside>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-6 lg:px-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {trustStats.map(([value, label], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...springTransition, delay: index * 0.05 }}
                className="summit-motion-card rounded-[1.35rem] border border-[#D9D0BF] bg-white p-5 shadow-[0_18px_52px_rgba(19,34,31,0.08)] hover:-translate-y-1 motion-reduce:hover:translate-y-0"
              >
                <div className="text-3xl font-black text-[#0F766E]">{value}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.18em] text-[#5F6B66]">
                  {label}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="listings" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 grid gap-4 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[#0F766E]">Featured homes</p>
              <h2 className="mt-2 max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">
                Listing cards that move like a real search experience.
              </h2>
            </div>
            <p className="text-sm leading-7 text-[#5F6B66]">
              Motion layout transitions connect the selected listing, card rail, and detail panel
              without opening a modal or blocking the page.
            </p>
          </div>

          <LayoutGroup>
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_25rem]">
              <motion.div layoutScroll className="overflow-x-auto pb-4">
                <motion.div
                  drag={reduceMotion ? false : 'x'}
                  dragConstraints={{ left: -220, right: 0 }}
                  dragElastic={0.08}
                  className="grid min-w-[52rem] grid-cols-3 gap-4 xl:min-w-0"
                >
                  {listings.map((listing, index) => {
                    const selected = selectedListing.id === listing.id;

                    return (
                      <motion.button
                        key={listing.id}
                        type="button"
                        layout
                        onClick={() => setSelectedListing(listing)}
                        whileHover={{ y: -6 }}
                        whileTap={{ scale: 0.98 }}
                        transition={springTransition}
                        className={`summit-motion-card group overflow-hidden rounded-[1.55rem] border bg-white text-left shadow-[0_20px_70px_rgba(19,34,31,0.08)] motion-reduce:hover:translate-y-0 ${
                          selected ? 'border-[#0F766E]' : 'border-[#D9D0BF]'
                        }`}
                      >
                        <motion.div layoutId={`summit-image-${listing.id}`} className="h-64">
                          <img
                            src={listing.image}
                            alt={listing.name}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                          />
                        </motion.div>
                        <div className="p-5">
                          <div className="mb-4 flex items-center justify-between gap-3">
                            <span className="rounded-full bg-[#E8E1D2] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#5F6B66]">
                              {listing.tag}
                            </span>
                            <span className="text-xl font-black text-[#13221F]">
                              {listing.price}
                            </span>
                          </div>
                          <motion.h3
                            layoutId={`summit-title-${listing.id}`}
                            className="text-2xl font-black"
                          >
                            {listing.name}
                          </motion.h3>
                          <div className="mt-2 flex items-center gap-2 text-sm text-[#5F6B66]">
                            <MapPin className="h-4 w-4" />
                            {listing.area}
                          </div>
                          <div className="mt-5 grid grid-cols-3 gap-2 text-xs font-bold text-[#44524D]">
                            {[listing.beds, listing.baths, listing.size].map(item => (
                              <span key={item} className="rounded-xl bg-[#F5F4EE] px-2 py-2">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </motion.div>
              </motion.div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.aside
                  key={selectedListing.id}
                  layout
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={springTransition}
                  className="rounded-[1.55rem] border border-[#D9D0BF] bg-[#13221F] p-5 text-white shadow-[0_24px_80px_rgba(19,34,31,0.18)]"
                >
                  <motion.div layoutId={`summit-image-${selectedListing.id}`} className="h-48">
                    <img
                      src={selectedListing.image}
                      alt={selectedListing.name}
                      className="h-full w-full rounded-[1.2rem] object-cover"
                    />
                  </motion.div>
                  <div className="mt-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-sky-200">
                      Selected tour
                    </p>
                    <motion.h3
                      layoutId={`summit-title-${selectedListing.id}`}
                      className="mt-2 text-3xl font-black"
                    >
                      {selectedListing.name}
                    </motion.h3>
                    <p className="mt-3 text-sm leading-7 text-white/65">
                      {selectedListing.area} pairs strong neighborhood fundamentals with a clear
                      tour path, buyer proof, and mortgage readiness cues.
                    </p>
                    <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                      {[
                        ['Tour slot', 'Sat 11:30'],
                        ['Offer guide', 'Included'],
                        ['Mortgage', 'Pre-check'],
                        ['Agent', 'Mira Chen'],
                      ].map(([label, value]) => (
                        <div key={label} className="rounded-2xl border border-white/10 p-3">
                          <div className="text-white/42 text-[10px] uppercase tracking-[0.18em]">
                            {label}
                          </div>
                          <div className="mt-1 font-bold">{value}</div>
                        </div>
                      ))}
                    </div>
                    <a
                      href="#valuation"
                      className="summit-motion-card mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-300 px-5 py-4 font-black text-[#13221F] hover:-translate-y-0.5 hover:bg-sky-200 motion-reduce:hover:translate-y-0"
                    >
                      Book private tour
                      <CalendarDays className="h-4 w-4" />
                    </a>
                  </div>
                </motion.aside>
              </AnimatePresence>
            </div>
          </LayoutGroup>
        </section>

        <section className="bg-[#E8E1D2] px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[24rem_minmax(0,1fr)] lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={revealTransition}
              className="rounded-[1.75rem] border border-[#D1C4AD] bg-[#F5F4EE] p-6 shadow-[0_20px_70px_rgba(19,34,31,0.08)]"
            >
              <div className="mb-5 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#0F766E]">
                <Compass className="h-4 w-4" />
                Neighborhood path
              </div>
              <svg viewBox="0 0 320 280" className="h-72 w-full" aria-hidden="true">
                <path
                  d="M42 224 C 82 168, 122 196, 148 138 S 224 94, 270 46"
                  fill="none"
                  stroke="#C9BCA4"
                  strokeWidth="16"
                  strokeLinecap="round"
                />
                <motion.path
                  d="M42 224 C 82 168, 122 196, 148 138 S 224 94, 270 46"
                  fill="none"
                  stroke="#0F766E"
                  strokeWidth="8"
                  strokeLinecap="round"
                  style={{ pathLength: reduceMotion ? 1 : mapPathLength }}
                />
                {[
                  [42, 224, '#38BDF8'],
                  [148, 138, '#F59E0B'],
                  [270, 46, '#14B8A6'],
                ].map(([cx, cy, color], index) => (
                  <motion.circle
                    key={`${cx}-${cy}`}
                    cx={cx}
                    cy={cy}
                    r="13"
                    fill={String(color)}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ ...springTransition, delay: 0.2 + index * 0.1 }}
                  />
                ))}
              </svg>
            </motion.div>

            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[#0F766E]">Neighborhoods</p>
              <h2 className="mt-2 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
                Buyers compare places before they compare paint colors.
              </h2>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {neighborhoods.map(([name, detail, count], index) => (
                  <motion.article
                    key={name}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5 }}
                    viewport={{ once: true }}
                    transition={{ ...springTransition, delay: index * 0.07 }}
                    className="summit-motion-card rounded-[1.35rem] border border-[#D1C4AD] bg-[#F5F4EE] p-5 hover:-translate-y-1 motion-reduce:hover:translate-y-0"
                  >
                    <Building2 className="h-7 w-7 text-[#0F766E]" />
                    <h3 className="mt-4 text-xl font-black">{name}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#5F6B66]">{detail}</p>
                    <div className="mt-5 inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#0F766E]">
                      {count}
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="valuation" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[#0F766E]">Seller path</p>
              <h2 className="mt-2 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
                Tour, mortgage, or valuation - the intent stays clear.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5F6B66]">
                This is a static showcase. The form is staged to demonstrate the generated website
                flow without sending leads or collecting data.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {[
                  { Icon: ShieldCheck, label: 'Pre-list audit' },
                  { Icon: BadgeCheck, label: 'Agent proof' },
                  { Icon: MoveRight, label: 'Clear next step' },
                ].map(({ Icon, label }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-[#D9D0BF] bg-white p-4 text-sm font-bold"
                  >
                    <Icon className="mb-3 h-5 w-5 text-[#0F766E]" />
                    {label}
                  </div>
                ))}
              </div>
            </div>

            <motion.form
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={springTransition}
              className="rounded-[1.55rem] border border-[#D9D0BF] bg-white p-5 shadow-[0_24px_80px_rgba(19,34,31,0.10)]"
            >
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-[#0F766E]">
                    Valuation preview
                  </p>
                  <h3 className="mt-2 text-2xl font-black">Estimate request</h3>
                </div>
                <MapPin className="h-8 w-8 text-[#0F766E]" />
              </div>
              {['Property address', 'Timeline', 'Preferred contact'].map(label => (
                <label key={label} className="mb-3 block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-[#5F6B66]">
                    {label}
                  </span>
                  <span className="block rounded-2xl border border-[#D9D0BF] bg-[#F5F4EE] px-4 py-3 text-sm text-[#7A847F]">
                    Static showcase field
                  </span>
                </label>
              ))}
              <button
                type="button"
                className="summit-motion-card mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#13221F] px-5 py-4 font-black text-white hover:-translate-y-0.5 hover:bg-[#0F766E] motion-reduce:hover:translate-y-0"
              >
                Simulate valuation request
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.form>
          </div>
        </section>
      </main>
    </MotionConfig>
  );
}
