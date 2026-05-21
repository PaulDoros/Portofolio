import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Bookmark,
  Building2,
  CalendarDays,
  Calculator,
  Clock3,
  Compass,
  Crosshair,
  GripVertical,
  Home,
  LocateFixed,
  Map,
  MapPin,
  MoveRight,
  Radar,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  Reorder,
  motion,
  useAnimate,
  useDragControls,
  useMotionTemplate,
  useMotionValue,
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
      'A map-first Summit Realty showcase built with Motion Reorder, layout transitions, scroll-linked SVG drawing, and pointer-driven Motion values.',
  },
];

const springTransition = {
  type: 'spring',
  stiffness: 280,
  damping: 32,
  mass: 0.9,
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
    priceValue: 1180,
    score: 94,
    commute: '16m downtown',
    tourWindow: '10:15 AM',
    pin: [68, 24],
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
    priceValue: 820,
    score: 89,
    commute: '23m downtown',
    tourWindow: '11:40 AM',
    pin: [28, 54],
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
    priceValue: 1420,
    score: 97,
    commute: '19m downtown',
    tourWindow: '1:05 PM',
    pin: [76, 70],
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    color: '#14B8A6',
  },
];

const neighborhoods = [
  ['Marina Ridge', 'Waterfront walks, top schools, sunset dining', '17 listings', '#14B8A6'],
  ['Northline District', 'Converted warehouses, skyline views, transit', '9 listings', '#38BDF8'],
  ['Westerly Village', 'Tree-lined blocks, garden homes, family parks', '14 listings', '#F59E0B'],
];

const trustStats = [
  ['24', 'featured homes'],
  ['7', 'neighborhood guides'],
  ['4.9', 'buyer rating'],
  ['31d', 'avg close time'],
];

const initialPriorities = [
  'Walkable streets',
  'Strong schools',
  'Light-filled kitchen',
  'Fast commute',
];

const tourSignals = [
  ['Route density', '3 homes / 2.8 miles'],
  ['Best school fit', 'Westerly Village'],
  ['Fastest close', 'Northline District'],
];

function PriorityItem({ item }: { item: string }) {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={item}
      dragListener={false}
      dragControls={controls}
      className="relative flex items-center justify-between gap-3 rounded-2xl border border-[#D9D0BF] bg-white px-3 py-3 text-sm font-bold text-[#13221F] shadow-[0_12px_32px_rgba(19,34,31,0.08)]"
    >
      <span>{item}</span>
      <button
        type="button"
        onPointerDown={event => controls.start(event)}
        className="touch-none rounded-xl bg-[#E8E1D2] p-2 text-[#5F6B66]"
        aria-label={`Reorder ${item}`}
      >
        <GripVertical className="h-4 w-4" />
      </button>
    </Reorder.Item>
  );
}

export default function SummitRealtyRoute() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [selectedListing, setSelectedListing] = useState(listings[0]);
  const [priorities, setPriorities] = useState(initialPriorities);
  const [tourOrder, setTourOrder] = useState(listings);
  const [savedListingIds, setSavedListingIds] = useState([listings[0].id]);
  const [budget, setBudget] = useState(1120);
  const reduceMotion = useReducedMotion();
  const [mapScope, animate] = useAnimate();

  const pointerX = useMotionValue(520);
  const pointerY = useMotionValue(320);
  const spotlight = useMotionTemplate`radial-gradient(680px circle at ${pointerX}px ${pointerY}px, rgba(56,189,248,0.22), transparent 42%)`;

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
  const mapY = useTransform(heroProgress, [0, 1], ['0%', '9%']);
  const interfaceY = useTransform(heroProgress, [0, 1], ['0%', '-5%']);
  const pathLength = useSpring(useTransform(heroProgress, [0.06, 0.88], [0.18, 1]), {
    stiffness: 80,
    damping: 18,
  });
  const savedListings = listings.filter(listing => savedListingIds.includes(listing.id));
  const savedActive = savedListingIds.includes(selectedListing.id);
  const budgetProgress = ((budget - 700) / 850) * 100;
  const selectedBudgetDelta = budget - selectedListing.priceValue;
  const monthlySignal = Math.round((budget * 5.65) / 10) * 10;

  const toggleSavedListing = (listingId: string) => {
    setSavedListingIds(current =>
      current.includes(listingId) ? current.filter(id => id !== listingId) : [...current, listingId]
    );
  };

  useEffect(() => {
    if (reduceMotion || !mapScope.current) return;

    animate(
      '.summit-map-pin',
      { opacity: [0, 1], scale: [0.4, 1], y: [18, 0] },
      { duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }
    );
  }, [animate, mapScope, reduceMotion]);

  return (
    <MotionConfig reducedMotion="user" transition={springTransition}>
      <main className="min-h-screen overflow-hidden bg-[#F4EFE4] text-[#13221F]">
        <motion.div
          className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-[#0F766E]"
          style={{ scaleX: progressScale }}
        />

        <section ref={heroRef} className="relative min-h-screen overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#F4EFE4_0%,#E6DDCA_44%,#D6E9E7_100%)]" />
          <div className="absolute left-[-10vw] top-[-16rem] h-[34rem] w-[34rem] rounded-full bg-sky-200/45 blur-3xl" />
          <div className="absolute bottom-[-20rem] right-[-10vw] h-[38rem] w-[38rem] rounded-full bg-teal-300/35 blur-3xl" />

          <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
            <Link
              to="/pantheon-demo"
              className="summit-motion-card inline-flex items-center gap-2 rounded-full border border-[#13221F]/10 bg-white/70 px-3 py-2 text-xs uppercase tracking-[0.18em] text-[#41514D] shadow-sm backdrop-blur hover:-translate-y-0.5 hover:text-[#13221F] motion-reduce:hover:translate-y-0"
            >
              <ArrowLeft className="h-4 w-4" />
              Pantheon
            </Link>
            <div className="flex items-center gap-2 rounded-full border border-[#13221F]/10 bg-[#13221F] px-3 py-2 text-sm font-bold text-white shadow-[0_18px_45px_rgba(19,34,31,0.18)]">
              <Home className="h-4 w-4" />
              Summit Realty
            </div>
            <a
              href="#seller"
              className="summit-motion-card hidden rounded-full bg-white px-4 py-2 text-sm font-bold text-[#13221F] shadow-sm hover:-translate-y-0.5 hover:bg-sky-100 motion-reduce:hover:translate-y-0 sm:inline-flex"
            >
              Seller path
            </a>
          </header>

          <div className="relative z-10 mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl gap-5 px-4 pb-10 pt-2 sm:px-6 lg:grid-cols-[22rem_minmax(0,1fr)] lg:px-8">
            <motion.aside
              style={{ y: reduceMotion ? 0 : interfaceY }}
              className="relative z-10 flex flex-col gap-4 lg:py-8"
            >
              <div className="bg-white/82 rounded-[1.55rem] border border-[#D1C4AD] p-5 shadow-[0_22px_70px_rgba(19,34,31,0.10)] backdrop-blur-xl">
                <div className="mb-5 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#0F766E]">
                  <Search className="h-4 w-4" />
                  Buyer command
                </div>
                <h1 className="text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl">
                  Map the move before booking the tour.
                </h1>
                <p className="mt-4 text-sm leading-7 text-[#5F6B66]">
                  A real estate interface should feel like search, comparison, and confidence, not a
                  generic landing page.
                </p>
                <div className="mt-6 grid gap-2">
                  {['Budget $800K-$1.4M', '3+ bedrooms', 'Transit under 20m'].map(item => (
                    <div
                      key={item}
                      className="summit-search-row flex items-center justify-between rounded-2xl border border-[#D9D0BF] bg-[#F8F5EF] px-3 py-3 text-sm font-bold"
                    >
                      {item}
                      <SlidersHorizontal className="h-4 w-4 text-[#0F766E]" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.55rem] border border-[#D1C4AD] bg-[#13221F] p-4 text-white shadow-[0_22px_70px_rgba(19,34,31,0.16)]">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-sky-200">
                      Drag priorities
                    </p>
                    <h2 className="mt-1 text-xl font-black">Buyer stack</h2>
                  </div>
                  <LocateFixed className="h-5 w-5 text-sky-200" />
                </div>
                <Reorder.Group
                  axis="y"
                  values={priorities}
                  onReorder={setPriorities}
                  className="grid gap-2"
                >
                  {priorities.map(item => (
                    <PriorityItem key={item} item={item} />
                  ))}
                </Reorder.Group>
              </div>
            </motion.aside>

            <motion.div
              ref={mapScope}
              style={{ y: reduceMotion ? 0 : mapY, background: spotlight }}
              onPointerMove={event => {
                const rect = event.currentTarget.getBoundingClientRect();
                pointerX.set(event.clientX - rect.left);
                pointerY.set(event.clientY - rect.top);
              }}
              className="relative min-h-[44rem] overflow-hidden rounded-[2rem] border border-white/70 bg-[#13221F] p-3 shadow-[0_34px_120px_rgba(19,34,31,0.22)] lg:min-h-[calc(100vh-8.5rem)]"
            >
              <div className="absolute inset-0 opacity-45">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:64px_64px]" />
                <img
                  src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1800&q=80"
                  alt=""
                  className="h-full w-full object-cover opacity-35 mix-blend-luminosity"
                />
              </div>

              <div className="relative h-full min-h-[42rem] overflow-hidden rounded-[1.6rem] border border-white/10">
                <div className="text-white/72 absolute left-5 top-5 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-2 text-xs uppercase tracking-[0.18em] backdrop-blur">
                  <Radar className="h-4 w-4 text-sky-200" />
                  Live map simulator
                </div>
                <div className="absolute right-5 top-5 z-20 rounded-full border border-white/10 bg-white/90 px-4 py-2 text-sm font-black text-[#13221F]">
                  {selectedListing.price}
                </div>

                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 100 100"
                  aria-hidden="true"
                >
                  <path
                    d="M20 74 C 31 48, 45 62, 58 38 S 73 30, 84 18"
                    fill="none"
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  <motion.path
                    d="M20 74 C 31 48, 45 62, 58 38 S 73 30, 84 18"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="1"
                    strokeLinecap="round"
                    style={{ pathLength: reduceMotion ? 1 : pathLength }}
                  />
                </svg>

                {listings.map(listing => {
                  const active = listing.id === selectedListing.id;

                  return (
                    <motion.button
                      key={listing.id}
                      type="button"
                      layout
                      onClick={() => setSelectedListing(listing)}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.94 }}
                      className="summit-map-pin absolute z-20 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-white/15 bg-white px-3 py-2 text-xs font-black text-[#13221F] shadow-[0_18px_45px_rgba(0,0,0,0.28)]"
                      style={{ left: `${listing.pin[0]}%`, top: `${listing.pin[1]}%` }}
                    >
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: listing.color }}
                      />
                      {active ? listing.price : listing.area}
                    </motion.button>
                  );
                })}

                <LayoutGroup>
                  <AnimatePresence mode="wait">
                    <motion.article
                      key={selectedListing.id}
                      layout
                      initial={{ opacity: 0, y: 24, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -14, scale: 0.98 }}
                      transition={springTransition}
                      className="absolute bottom-5 left-5 right-5 z-30 grid overflow-hidden rounded-[1.4rem] border border-white/10 bg-white text-[#13221F] shadow-[0_24px_80px_rgba(0,0,0,0.30)] md:left-auto md:w-[28rem]"
                    >
                      <motion.div layoutId={`summit-image-${selectedListing.id}`} className="h-52">
                        <img
                          src={selectedListing.image}
                          alt={selectedListing.name}
                          className="h-full w-full object-cover"
                        />
                      </motion.div>
                      <div className="p-5">
                        <div className="mb-4 flex items-center justify-between gap-3">
                          <span className="rounded-full bg-[#E8E1D2] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#5F6B66]">
                            {selectedListing.tag}
                          </span>
                          <span className="text-2xl font-black">{selectedListing.price}</span>
                        </div>
                        <motion.h2
                          layoutId={`summit-title-${selectedListing.id}`}
                          className="text-3xl font-black"
                        >
                          {selectedListing.name}
                        </motion.h2>
                        <div className="mt-2 flex items-center gap-2 text-sm text-[#5F6B66]">
                          <MapPin className="h-4 w-4" />
                          {selectedListing.area}
                        </div>
                        <div className="mt-5 grid grid-cols-3 gap-2 text-xs font-bold text-[#44524D]">
                          {[selectedListing.beds, selectedListing.baths, selectedListing.size].map(
                            item => (
                              <span key={item} className="rounded-xl bg-[#F5F4EE] px-2 py-2">
                                {item}
                              </span>
                            )
                          )}
                        </div>
                        <div className="mt-5 grid gap-2 sm:grid-cols-2">
                          <motion.button
                            type="button"
                            layout
                            onClick={() => toggleSavedListing(selectedListing.id)}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            className={`summit-save-button inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-black transition ${
                              savedActive ? 'is-active' : ''
                            }`}
                          >
                            <Bookmark className="h-4 w-4" />
                            {savedActive ? 'Saved' : 'Save'}
                          </motion.button>
                          <a
                            href="#tour-plan"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#13221F] px-4 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#0F766E] motion-reduce:hover:translate-y-0"
                          >
                            Compare
                            <ArrowRight className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </motion.article>
                  </AnimatePresence>
                </LayoutGroup>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-18 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {trustStats.map(([value, label], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true }}
                transition={{ ...springTransition, delay: index * 0.05 }}
                className="summit-motion-card rounded-[1.35rem] border border-[#D9D0BF] bg-white p-5 shadow-[0_18px_52px_rgba(19,34,31,0.08)] motion-reduce:hover:translate-y-0"
              >
                <div className="text-3xl font-black text-[#0F766E]">{value}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.18em] text-[#5F6B66]">
                  {label}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="tour-plan" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 grid gap-4 lg:grid-cols-[minmax(0,1fr)_28rem] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[#0F766E]">
                Dynamic buyer simulator
              </p>
              <h2 className="mt-2 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
                Save homes, reorder a tour, and see the budget story change.
              </h2>
            </div>
            <p className="text-sm leading-7 text-[#5F6B66]">
              The page stays showcase-only, but the interface behaves like a real client workspace:
              Motion handles the layout changes, drag affordance, and saved-state transitions.
            </p>
          </div>

          <LayoutGroup>
            <div className="grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
              <motion.div
                layout
                className="rounded-[1.65rem] border border-[#D9D0BF] bg-white p-5 shadow-[0_22px_70px_rgba(19,34,31,0.08)]"
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-[#0F766E]">
                      Affordability lens
                    </p>
                    <h3 className="mt-2 text-3xl font-black">{selectedListing.name}</h3>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#13221F] text-sky-200">
                    <Calculator className="h-6 w-6" />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    ['Match score', `${selectedListing.score}%`],
                    ['Commute', selectedListing.commute],
                    ['Tour window', selectedListing.tourWindow],
                  ].map(([label, value]) => (
                    <motion.div
                      key={label}
                      layout
                      className="rounded-2xl border border-[#D9D0BF] bg-[#F8F5EF] p-4"
                    >
                      <div className="text-[10px] uppercase tracking-[0.18em] text-[#7A847F]">
                        {label}
                      </div>
                      <div className="mt-2 text-xl font-black text-[#13221F]">{value}</div>
                    </motion.div>
                  ))}
                </div>

                <label className="mt-6 block">
                  <span className="mb-3 flex items-center justify-between gap-3 text-sm font-black">
                    Buyer ceiling
                    <span className="rounded-full bg-[#E8E1D2] px-3 py-1 text-[#0F766E]">
                      ${(budget / 1000).toFixed(2)}M
                    </span>
                  </span>
                  <div
                    className="relative h-5 cursor-pointer rounded-full bg-[#E8E1D2]"
                    onPointerDown={event => {
                      const rect = event.currentTarget.getBoundingClientRect();
                      const next = 700 + ((event.clientX - rect.left) / rect.width) * 850;
                      setBudget(Math.round(next / 10) * 10);
                    }}
                  >
                    <input
                      type="range"
                      min="700"
                      max="1550"
                      value={budget}
                      onChange={event => setBudget(Number(event.target.value))}
                      aria-label="Buyer budget ceiling"
                      className="absolute inset-0 z-20 h-full w-full cursor-pointer opacity-0"
                    />
                    <motion.div
                      layout
                      className="absolute inset-y-0 left-0 rounded-full bg-[#0F766E]"
                      style={{ width: `${Math.min(100, Math.max(0, budgetProgress))}%` }}
                    />
                    <motion.div
                      layout
                      className="absolute top-1/2 h-9 w-9 -translate-y-1/2 rounded-full border-4 border-white bg-[#13221F] shadow-[0_12px_28px_rgba(19,34,31,0.24)]"
                      style={{
                        left: `calc(${Math.min(100, Math.max(0, budgetProgress))}% - 18px)`,
                      }}
                    />
                  </div>
                </label>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-[#D9D0BF] bg-[#F5F4EE] p-4">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[#7A847F]">
                      <Compass className="h-4 w-4 text-[#0F766E]" />
                      Selected delta
                    </div>
                    <div className="mt-2 text-2xl font-black">
                      {selectedBudgetDelta >= 0 ? '+' : '-'}$
                      {Math.abs(selectedBudgetDelta).toLocaleString()}K
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[#5F6B66]">
                      Compared with the active budget ceiling.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[#D9D0BF] bg-[#F5F4EE] p-4">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[#7A847F]">
                      <Clock3 className="h-4 w-4 text-[#0F766E]" />
                      Payment signal
                    </div>
                    <div className="mt-2 text-2xl font-black">${monthlySignal}/mo</div>
                    <p className="mt-2 text-sm leading-6 text-[#5F6B66]">
                      Simulated only, useful for showing calculator UX.
                    </p>
                  </div>
                </div>
              </motion.div>

              <div className="grid gap-5">
                <motion.div
                  layout
                  className="rounded-[1.65rem] border border-[#D9D0BF] bg-[#13221F] p-5 text-white shadow-[0_22px_70px_rgba(19,34,31,0.14)]"
                >
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-sky-200">
                        Drag tour order
                      </p>
                      <h3 className="mt-2 text-3xl font-black">Saturday route</h3>
                    </div>
                    <MapPin className="h-7 w-7 text-sky-200" />
                  </div>
                  <Reorder.Group
                    axis="y"
                    values={tourOrder}
                    onReorder={setTourOrder}
                    className="grid gap-3"
                  >
                    {tourOrder.map((listing, index) => (
                      <Reorder.Item
                        key={listing.id}
                        value={listing}
                        whileDrag={{ scale: 1.02, zIndex: 2 }}
                        className="grid cursor-grab gap-3 rounded-2xl border border-white/10 bg-white/[0.08] p-4 active:cursor-grabbing sm:grid-cols-[3rem_minmax(0,1fr)_6.5rem] sm:items-center"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#13221F]">
                          <span className="text-sm font-black">0{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-black">{listing.name}</h4>
                          <p className="mt-1 text-sm text-white/55">
                            {listing.area} · {listing.commute}
                          </p>
                        </div>
                        <div className="bg-black/22 rounded-xl px-3 py-2 text-center text-sm font-black text-sky-200">
                          {listing.tourWindow}
                        </div>
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>
                </motion.div>

                <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_16rem]">
                  <motion.div
                    layout
                    className="rounded-[1.35rem] border border-[#D9D0BF] bg-white p-4"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-xs uppercase tracking-[0.2em] text-[#0F766E]">
                        Saved shortlist
                      </p>
                      <span className="rounded-full bg-[#E8E1D2] px-3 py-1 text-xs font-black">
                        {savedListings.length}
                      </span>
                    </div>
                    <AnimatePresence initial={false}>
                      {savedListings.length > 0 ? (
                        <div className="grid gap-2">
                          {savedListings.map(listing => (
                            <motion.button
                              key={listing.id}
                              type="button"
                              layout
                              initial={{ opacity: 0, y: 14, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.98 }}
                              onClick={() => setSelectedListing(listing)}
                              className="flex items-center justify-between rounded-2xl bg-[#F5F4EE] px-3 py-3 text-left text-sm font-black"
                            >
                              <span>{listing.name}</span>
                              <span className="text-[#0F766E]">{listing.price}</span>
                            </motion.button>
                          ))}
                        </div>
                      ) : (
                        <motion.p
                          key="empty"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-sm leading-6 text-[#5F6B66]"
                        >
                          Save listings from the map to populate the shortlist.
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <div className="rounded-[1.35rem] border border-[#D9D0BF] bg-white p-4">
                    <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#0F766E]">
                      <Sparkles className="h-4 w-4" />
                      Signals
                    </div>
                    <div className="grid gap-2">
                      {tourSignals.map(([label, value]) => (
                        <div key={label} className="rounded-2xl bg-[#F5F4EE] p-3">
                          <div className="text-[10px] uppercase tracking-[0.18em] text-[#7A847F]">
                            {label}
                          </div>
                          <div className="mt-1 text-sm font-black">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </LayoutGroup>
        </section>

        <section id="listings" className="bg-[#13221F] px-4 py-20 text-white sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div className="lg:sticky lg:top-10">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-300 text-[#13221F]">
                <Map className="h-7 w-7" />
              </div>
              <p className="text-xs uppercase tracking-[0.24em] text-sky-200">
                Neighborhood intelligence
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">
                The second screen is not another hero. It is the buyer&apos;s evidence board.
              </h2>
            </div>

            <div className="grid gap-4">
              {neighborhoods.map(([name, detail, count, color], index) => (
                <motion.article
                  key={name}
                  initial={{ opacity: 0, x: index % 2 ? 32 : -32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ x: 8 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ ...springTransition, delay: index * 0.07 }}
                  className="summit-motion-card grid gap-5 rounded-[1.45rem] border border-white/10 bg-white/[0.06] p-5 motion-reduce:hover:translate-x-0 md:grid-cols-[12rem_minmax(0,1fr)_8rem] md:items-center"
                >
                  <div
                    className="flex h-44 items-end rounded-[1.1rem] p-4"
                    style={{
                      background: `linear-gradient(145deg, ${color}88, rgba(255,255,255,0.08))`,
                    }}
                  >
                    <Building2 className="h-9 w-9 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black">{name}</h3>
                    <p className="text-white/62 mt-2 text-sm leading-7">{detail}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-center">
                    <div className="text-2xl font-black" style={{ color }}>
                      {count}
                    </div>
                    <div className="text-white/42 mt-1 text-[10px] uppercase tracking-[0.18em]">
                      active
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="seller" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[#0F766E]">Seller path</p>
              <h2 className="mt-2 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
                Valuation is framed as a decision workflow, not a contact form.
              </h2>
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
              initial={{ opacity: 0, rotate: -1.5, y: 24 }}
              whileInView={{ opacity: 1, rotate: 0, y: 0 }}
              viewport={{ once: true }}
              transition={springTransition}
              className="rounded-[1.55rem] border border-[#D9D0BF] bg-white p-5 shadow-[0_24px_80px_rgba(19,34,31,0.10)]"
            >
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-[#0F766E]">
                    Valuation simulator
                  </p>
                  <h3 className="mt-2 text-2xl font-black">Address readiness</h3>
                </div>
                <Crosshair className="h-8 w-8 text-[#0F766E]" />
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
                <CalendarDays className="h-4 w-4" />
              </button>
            </motion.form>
          </div>
        </section>
      </main>
    </MotionConfig>
  );
}
