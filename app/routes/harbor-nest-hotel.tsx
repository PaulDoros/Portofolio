import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { MotionCopyButton, MotionLoadingProgress } from '~/components/showcase-motion-patterns';
import {
  ArrowLeft,
  Bath,
  BedDouble,
  CalendarDays,
  Camera,
  Car,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Coffee,
  Compass,
  Heart,
  KeyRound,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Utensils,
  Users,
  Waves,
  Wifi,
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
} from 'motion/react';

export const meta: MetaFunction = () => [
  { title: 'Harbor Nest Hotel | Design.md Showcase' },
  {
    name: 'description',
    content:
      'A boutique hotel website demo generated from local DESIGN.md references with booking, rooms, amenities, location, policies, and Motion interactions.',
  },
];

const rooms = [
  {
    id: 'terrace-suite',
    name: 'Terrace Suite',
    price: '$268',
    size: '42 sqm',
    guests: '2 guests',
    view: 'Harbor terrace',
    image:
      'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1400&q=80',
    detail:
      'A top-floor room with a private breakfast terrace, rain shower, and a reading corner facing the marina.',
    perks: ['Private terrace', 'Rain shower', 'Evening tea service'],
  },
  {
    id: 'garden-room',
    name: 'Garden Room',
    price: '$186',
    size: '31 sqm',
    guests: '2 guests',
    view: 'Courtyard garden',
    image:
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=80',
    detail:
      'A quiet courtyard room for long weekends, remote work stays, and guests who want softer mornings.',
    perks: ['Garden outlook', 'Work desk', 'Filtered water'],
  },
  {
    id: 'family-loft',
    name: 'Family Loft',
    price: '$312',
    size: '58 sqm',
    guests: '4 guests',
    view: 'Two-level loft',
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80',
    detail:
      'A two-level suite with separate sleeping areas, blackout curtains, and an easy stroller path from lift to room.',
    perks: ['Two sleeping zones', 'Blackout curtains', 'Crib on request'],
  },
];

const amenities = [
  { icon: Wifi, label: 'Fiber Wi-Fi', detail: 'Reliable work calls from every room and lounge.' },
  { icon: Coffee, label: 'Breakfast room', detail: 'Seasonal plates from 07:00 to 10:30.' },
  {
    icon: Car,
    label: 'Parking nearby',
    detail: 'Reserved paid spaces two minutes from reception.',
  },
  { icon: Waves, label: 'Harbor access', detail: 'Walk to the quay, ferry stop, and promenade.' },
  { icon: Utensils, label: 'Dinner partners', detail: 'Concierge tables at nearby seafood rooms.' },
  {
    icon: ShieldCheck,
    label: 'Clear policies',
    detail: 'Transparent check-in, cancellation, and deposit rules.',
  },
];

const attractions = [
  {
    name: 'Old Port Promenade',
    time: '4 min walk',
    image:
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'North Pier Market',
    time: '9 min walk',
    image:
      'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Museum Quarter',
    time: '12 min tram',
    image:
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1000&q=80',
  },
];

const policies = [
  ['Check-in', '15:00-22:00, late arrivals by message'],
  ['Check-out', 'Until 11:00, luggage storage available'],
  ['Cancellation', 'Free until 72 hours before arrival'],
  ['Families', 'Cribs and family rooms available on request'],
];

const reviews = [
  ['4.9', 'Guest rating'],
  ['312', 'Direct bookings'],
  ['8 min', 'Walk to ferry'],
  ['24h', 'Message support'],
];

const gallery = [
  {
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80',
    label: 'Lobby lounge',
  },
  {
    image:
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=80',
    label: 'Suite morning',
  },
  {
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80',
    label: 'Quiet pool',
  },
];

const dateTabs = ['This weekend', 'May 28-31', 'June 6-9'];

export default function HarborNestHotelRoute() {
  const heroRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const [activeRoom, setActiveRoom] = useState(rooms[0]);
  const [activeDate, setActiveDate] = useState(dateTabs[0]);
  const [guests, setGuests] = useState(2);
  const [savedRooms, setSavedRooms] = useState<string[]>(['terrace-suite']);
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.7 });
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImageScale = useTransform(heroProgress, [0, 1], [1, 1.08]);
  const heroCopyY = useTransform(heroProgress, [0, 1], ['0%', '-10%']);
  const heroPanelY = useTransform(heroProgress, [0, 1], ['0%', '9%']);

  const bookingScore = activeRoom.id === 'family-loft' && guests < 3 ? 78 : 94;
  const savedActive = savedRooms.includes(activeRoom.id);

  const toggleSavedRoom = () => {
    setSavedRooms(current =>
      current.includes(activeRoom.id)
        ? current.filter(roomId => roomId !== activeRoom.id)
        : [...current, activeRoom.id]
    );
  };

  return (
    <MotionConfig reducedMotion="user" transition={{ type: 'spring', stiffness: 260, damping: 30 }}>
      <main className="min-h-screen overflow-hidden bg-white text-[#222222]">
        <motion.div
          className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-[#ff385c]"
          style={{ scaleX: progressScale }}
        />

        <section ref={heroRef} className="relative min-h-screen overflow-hidden">
          <motion.img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=80"
            alt="Harbor sunrise near Harbor Nest Hotel"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ scale: reduceMotion ? 1 : heroImageScale }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.70),rgba(0,0,0,0.34)_46%,rgba(0,0,0,0.08))]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />

          <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
            <Link
              to="/pantheon-demo"
              className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#222222] shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Pantheon
            </Link>
            <div className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#222222] shadow-sm sm:flex">
              <KeyRound className="h-4 w-4 text-[#ff385c]" />
              Harbor Nest Hotel
            </div>
            <nav className="hidden rounded-full bg-white/95 p-1 text-sm font-semibold text-[#6a6a6a] shadow-sm lg:flex">
              {[
                ['Rooms', '#rooms'],
                ['Amenities', '#amenities'],
                ['Gallery', '#gallery'],
                ['Location', '#location'],
                ['Policies', '#policies'],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="rounded-full px-4 py-2 transition hover:bg-[#f7f7f7] hover:text-[#222222]"
                >
                  {label}
                </a>
              ))}
            </nav>
            <a
              href="#booking"
              className="rounded-full bg-[#ff385c] px-5 py-3 text-sm font-bold text-white shadow-[0_18px_60px_rgba(255,56,92,0.28)] transition hover:-translate-y-0.5 hover:bg-[#e00b41]"
            >
              Check dates
            </a>
          </header>

          <div className="relative z-10 mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-8 px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_27rem] lg:px-8">
            <motion.div style={{ y: reduceMotion ? 0 : heroCopyY }} className="max-w-4xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#222222]">
                <Sparkles className="h-4 w-4 text-[#ff385c]" />
                Design.md inspired hospitality site
              </div>
              <h1 className="max-w-4xl text-5xl font-semibold leading-[1.04] tracking-[-0.02em] text-white sm:text-7xl">
                Wake up between the old port and the morning light.
              </h1>
              <p className="text-white/82 mt-6 max-w-2xl text-lg leading-8">
                Harbor Nest is a boutique hotel template with real booking intent: rooms, rates,
                amenities, policies, location, nearby attractions, reviews, and direct inquiry.
              </p>
            </motion.div>

            <motion.aside
              id="booking"
              style={{ y: reduceMotion ? 0 : heroPanelY }}
              className="rounded-[2rem] bg-white p-4 shadow-[0_28px_100px_rgba(0,0,0,0.28)]"
            >
              <div className="rounded-[1.55rem] border border-[#dddddd] p-4">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6a6a6a]">
                      Direct booking
                    </p>
                    <h2 className="mt-1 text-2xl font-bold">Find your stay</h2>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ff385c] text-white">
                    <Search className="h-5 w-5" />
                  </div>
                </div>

                <div className="grid gap-3">
                  <div className="rounded-[1.25rem] border border-[#dddddd] px-4 py-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#6a6a6a]">
                      <CalendarDays className="h-4 w-4 text-[#ff385c]" />
                      Dates
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {dateTabs.map(tab => {
                        const active = activeDate === tab;

                        return (
                          <motion.button
                            key={tab}
                            type="button"
                            layout
                            onClick={() => setActiveDate(tab)}
                            className={`relative rounded-full px-3 py-2 text-sm font-semibold ${
                              active ? 'text-white' : 'bg-[#f7f7f7] text-[#222222]'
                            }`}
                          >
                            {active ? (
                              <motion.span
                                layoutId="harbor-date-pill"
                                className="absolute inset-0 rounded-full bg-[#ff385c]"
                              />
                            ) : null}
                            <span className="relative z-10">{tab}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setGuests(value => Math.max(1, value - 1))}
                      className="rounded-[1.25rem] border border-[#dddddd] px-4 py-3 text-left"
                    >
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#6a6a6a]">
                        <Users className="h-4 w-4 text-[#ff385c]" />
                        Guests
                      </div>
                      <div className="mt-2 text-2xl font-bold">{guests}</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setGuests(value => Math.min(4, value + 1))}
                      className="rounded-[1.25rem] border border-[#dddddd] px-4 py-3 text-left"
                    >
                      <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#6a6a6a]">
                        Best room
                      </div>
                      <div className="mt-2 text-sm font-bold">{activeRoom.name}</div>
                    </button>
                  </div>

                  <MotionLoadingProgress
                    label={`Match score ${bookingScore}%`}
                    tone="amber"
                    resetKey={`${activeRoom.id}-${activeDate}-${guests}`}
                    className="border-[#dddddd] bg-[#222222] text-white"
                  />

                  <a
                    href="#rooms"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ff385c] px-5 py-4 font-bold text-white transition hover:bg-[#e00b41]"
                  >
                    View available rooms
                    <ChevronRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.aside>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {reviews.map(([value, label]) => (
              <div
                key={label}
                className="rounded-[1.25rem] border border-[#dddddd] bg-[#f7f7f7] p-5"
              >
                <div className="text-3xl font-bold tracking-[-0.02em]">{value}</div>
                <div className="mt-1 text-sm text-[#6a6a6a]">{label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="rooms" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff385c]">
                Rooms and rates
              </p>
              <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
                Pick a room like a guest would, not like a brochure reader.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-[#6a6a6a]">
              The room page includes price, guests, size, views, perks, and booking state so the
              template can become a real hospitality site later.
            </p>
          </div>

          <LayoutGroup>
            <div className="grid gap-5 lg:grid-cols-[23rem_minmax(0,1fr)]">
              <div className="grid gap-3">
                {rooms.map(room => {
                  const active = activeRoom.id === room.id;

                  return (
                    <motion.button
                      key={room.id}
                      type="button"
                      layout
                      onClick={() => setActiveRoom(room)}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative overflow-hidden rounded-[1.5rem] border p-4 text-left ${
                        active
                          ? 'border-[#ff385c] bg-[#fff5f7]'
                          : 'border-[#dddddd] bg-white hover:bg-[#f7f7f7]'
                      }`}
                    >
                      {active ? (
                        <motion.span
                          layoutId="harbor-room-active"
                          className="absolute inset-y-3 left-3 w-1 rounded-full bg-[#ff385c]"
                        />
                      ) : null}
                      <div className="pl-4">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="text-xl font-bold">{room.name}</h3>
                          <span className="font-bold text-[#ff385c]">{room.price}</span>
                        </div>
                        <p className="mt-2 text-sm text-[#6a6a6a]">
                          {room.size} / {room.guests} / {room.view}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <motion.article
                layout
                className="overflow-hidden rounded-[2rem] border border-[#dddddd] bg-[#f7f7f7]"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeRoom.id}
                    initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
                    transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <img
                      src={activeRoom.image}
                      alt={activeRoom.name}
                      className="h-[28rem] w-full object-cover"
                    />
                    <div className="grid gap-5 p-6 md:grid-cols-[minmax(0,1fr)_18rem]">
                      <div>
                        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#6a6a6a]">
                          <Star className="h-4 w-4 fill-[#222222] text-[#222222]" />
                          4.9 guest favorite
                        </div>
                        <h3 className="text-4xl font-semibold tracking-[-0.02em]">
                          {activeRoom.name}
                        </h3>
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#6a6a6a]">
                          {activeRoom.detail}
                        </p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {activeRoom.perks.map(perk => (
                            <span
                              key={perk}
                              className="rounded-full border border-[#dddddd] bg-white px-3 py-2 text-sm font-semibold"
                            >
                              {perk}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-[1.5rem] bg-white p-5">
                        <div className="text-sm text-[#6a6a6a]">From</div>
                        <div className="mt-1 text-4xl font-bold">
                          {activeRoom.price}
                          <span className="text-base font-normal text-[#6a6a6a]"> / night</span>
                        </div>
                        <button
                          type="button"
                          onClick={toggleSavedRoom}
                          className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 font-bold transition ${
                            savedActive
                              ? 'bg-[#222222] text-white'
                              : 'bg-[#ff385c] text-white hover:bg-[#e00b41]'
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${savedActive ? 'fill-white' : ''}`} />
                          {savedActive ? 'Saved room' : 'Save room'}
                        </button>
                        <MotionCopyButton
                          value={`https://harbor-nest.example/rooms/${activeRoom.id}`}
                          copiedLabel="Room link copied"
                          className="mt-3 w-full border-[#dddddd] bg-[#f7f7f7] text-[#222222] hover:bg-white"
                        >
                          Copy room link
                        </MotionCopyButton>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.article>
            </div>
          </LayoutGroup>
        </section>

        <section id="amenities" className="bg-[#f7f7f7] px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 grid gap-4 lg:grid-cols-[minmax(0,1fr)_28rem] lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff385c]">
                  Amenities
                </p>
                <h2 className="mt-3 text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
                  Everything a hotel owner actually needs to show.
                </h2>
              </div>
              <p className="text-sm leading-7 text-[#6a6a6a]">
                Useful hotel pages include more than a hero: amenity details, policies, direct
                booking trust, transport notes, and local recommendations.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {amenities.map(({ icon: Icon, label, detail }, index) => (
                <motion.article
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: index * 0.04 }}
                  whileHover={{ y: -5 }}
                  className="rounded-[1.5rem] bg-white p-5 shadow-sm"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#ff385c] text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold">{label}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#6a6a6a]">{detail}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0066cc]">
                Photography-first
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
                Apple-inspired calm, Airbnb-inspired warmth.
              </h2>
            </div>
            <Camera className="hidden h-10 w-10 text-[#0066cc] sm:block" />
          </div>
          <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
            {gallery.map((item, index) => (
              <motion.figure
                key={item.label}
                whileHover={{ scale: 0.99 }}
                className={`overflow-hidden rounded-[2rem] bg-[#f7f7f7] ${
                  index === 0 ? 'lg:row-span-2' : ''
                }`}
              >
                <img
                  src={item.image}
                  alt={item.label}
                  className={`w-full object-cover ${index === 0 ? 'h-[42rem]' : 'h-[20.5rem]'}`}
                />
                <figcaption className="flex items-center justify-between px-5 py-4 text-sm font-semibold">
                  {item.label}
                  <ChevronRight className="h-4 w-4 text-[#0066cc]" />
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </section>

        <section
          id="location"
          className="mx-auto grid max-w-7xl gap-5 px-4 py-20 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8"
        >
          <div className="rounded-[2rem] bg-[#222222] p-6 text-white lg:p-8">
            <MapPin className="mb-6 h-8 w-8 text-[#ff385c]" />
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">Location</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.02em]">
              Old Port, ferry side, close enough to walk everywhere.
            </h2>
            <p className="mt-5 text-sm leading-7 text-white/65">
              18 Quay Lane, North Harbor. The real template would connect this area to a map,
              directions, airport transfer notes, and local partner content.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {attractions.map(item => (
                <div key={item.name} className="rounded-[1.25rem] bg-white/10 p-3">
                  <img
                    src={item.image}
                    alt=""
                    className="h-28 w-full rounded-[1rem] object-cover"
                  />
                  <div className="mt-3 font-bold">{item.name}</div>
                  <div className="mt-1 text-sm text-white/55">{item.time}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-[2rem] border border-[#dddddd] bg-white p-6">
              <Compass className="mb-5 h-7 w-7 text-[#0066cc]" />
              <h3 className="text-3xl font-semibold tracking-[-0.02em]">Travel notes</h3>
              <div className="mt-5 grid gap-3">
                {[
                  ['Airport', '28 min taxi or 41 min direct train'],
                  ['Ferry', '8 min walk to the morning ferry'],
                  ['Parking', 'Reserved spaces at Pier Garage'],
                ].map(([label, detail]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-4 rounded-[1.25rem] bg-[#f7f7f7] px-4 py-3"
                  >
                    <span className="font-bold">{label}</span>
                    <span className="text-right text-sm text-[#6a6a6a]">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
            <div id="policies" className="rounded-[2rem] border border-[#dddddd] bg-[#f7f7f7] p-6">
              <Clock3 className="mb-5 h-7 w-7 text-[#ff385c]" />
              <h3 className="text-3xl font-semibold tracking-[-0.02em]">Policies guests ask for</h3>
              <div className="mt-5 grid gap-3">
                {policies.map(([label, detail]) => (
                  <div
                    key={label}
                    className="flex items-start gap-3 rounded-[1.25rem] bg-white p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#ff385c]" />
                    <span>
                      <span className="block font-bold">{label}</span>
                      <span className="mt-1 block text-sm text-[#6a6a6a]">{detail}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#f7f7f7] lg:grid lg:grid-cols-[1fr_24rem]">
            <div className="p-6 lg:p-10">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#6a6a6a]">
                <BedDouble className="h-4 w-4 text-[#ff385c]" />
                Direct inquiry
              </div>
              <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
                A hotel template should convert through booking, not just contact.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#6a6a6a]">
                This static showcase simulates the direct-booking experience: room choice, date fit,
                guest count, room link sharing, policies, and travel details.
              </p>
            </div>
            <div className="border-t border-[#dddddd] bg-white p-6 lg:border-l lg:border-t-0">
              <div className="rounded-[1.5rem] border border-[#dddddd] p-5">
                <Bath className="mb-5 h-7 w-7 text-[#0066cc]" />
                <div className="text-3xl font-bold">12 rooms</div>
                <p className="mt-3 text-sm leading-6 text-[#6a6a6a]">
                  Boutique scale, direct-booking flow, and owner-managed content ready.
                </p>
                <a
                  href="#booking"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#222222] px-5 py-3 font-bold text-white transition hover:bg-[#ff385c]"
                >
                  Simulate booking
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </MotionConfig>
  );
}
