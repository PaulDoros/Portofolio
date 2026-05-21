import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  GlassWater,
  MapPin,
  Sparkles,
  Utensils,
} from 'lucide-react';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const meta: MetaFunction = () => [
  { title: 'Noir Table | GSAP Showcase' },
  {
    name: 'description',
    content:
      'A cinematic Noir Table restaurant website showcase built with GSAP timelines, ScrollTrigger, reservations, menu storytelling, and private dining conversion.',
  },
];

const dishes = [
  {
    title: 'Charred Ribeye',
    detail: 'Black garlic, marrow jus, smoked sea salt',
    price: '$48',
    image:
      'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Saffron Scallops',
    detail: 'Citrus beurre blanc, fennel, bronze herbs',
    price: '$36',
    image:
      'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Midnight Torte',
    detail: 'Cocoa glaze, espresso cream, salted cherry',
    price: '$16',
    image:
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80',
  },
];

const cellar = [
  ['Barolo Riserva', 'Piedmont, 2017'],
  ['Etna Bianco', 'Sicily, 2021'],
  ['Grower Champagne', 'Montagne de Reims'],
];

const events = ['Chef counter for six', 'Private cellar dinners', 'Late-service tasting menu'];

export default function NoirTableRoute() {
  const containerRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reduceMotion) {
        gsap.set('.noir-reveal, .noir-dish, .noir-hero-copy, .noir-reservation', {
          autoAlpha: 1,
          y: 0,
          x: 0,
          scale: 1,
        });
        return;
      }

      const intro = gsap.timeline({
        defaults: { duration: 0.82, ease: 'power3.out' },
      });

      intro
        .from('.noir-kicker', { autoAlpha: 0, y: 18 })
        .from('.noir-title-line', { autoAlpha: 0, y: 44, stagger: 0.08 }, '<0.08')
        .from('.noir-copy', { autoAlpha: 0, y: 18 }, '<0.24')
        .from('.noir-reservation', { autoAlpha: 0, x: 26, scale: 0.96 }, '<0.12');

      gsap.from('.noir-floating-card', {
        y: 18,
        autoAlpha: 0,
        stagger: 0.09,
        duration: 0.7,
        ease: 'power2.out',
        delay: 0.35,
      });

      ScrollTrigger.batch('.noir-reveal', {
        start: 'top 82%',
        once: true,
        onEnter: batch => {
          gsap.fromTo(
            batch,
            { autoAlpha: 0, y: 34 },
            { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.72, ease: 'power3.out' }
          );
        },
      });

      gsap.utils.toArray<HTMLElement>('.noir-dish').forEach((dish, index) => {
        gsap.fromTo(
          dish,
          { autoAlpha: 0, y: 36, rotation: index % 2 ? 1.4 : -1.4 },
          {
            autoAlpha: 1,
            y: 0,
            rotation: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: dish,
              start: 'top 78%',
              once: true,
            },
          }
        );
      });

      const parallax = gsap.timeline({
        scrollTrigger: {
          trigger: '.noir-atmosphere',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      parallax.to('.noir-atmosphere-image', { yPercent: -10, scale: 1.06, ease: 'none' });
    },
    { scope: containerRef }
  );

  return (
    <main ref={containerRef} className="min-h-screen overflow-hidden bg-[#080706] text-[#F7EFE2]">
      <section className="relative min-h-screen overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2200&q=80"
          alt="Noir Table dining room"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.45]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,7,6,0.98),rgba(8,7,6,0.76)_48%,rgba(49,10,16,0.42))]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#080706] to-transparent" />

        <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <Link
            to="/pantheon-demo"
            className="inline-flex items-center gap-2 rounded-full border border-[#E7C27D]/20 bg-black/30 px-3 py-2 text-xs uppercase tracking-[0.18em] text-[#E7C27D] transition hover:-translate-y-0.5 hover:border-[#E7C27D]/45 motion-reduce:hover:translate-y-0"
          >
            <ArrowLeft className="h-4 w-4" />
            Pantheon
          </Link>
          <div className="flex items-center gap-2 rounded-full border border-[#E7C27D]/20 bg-[#E7C27D]/10 px-3 py-2 text-sm font-bold text-[#F7DCA3]">
            <Utensils className="h-4 w-4" />
            Noir Table
          </div>
          <a
            href="#reserve"
            className="hidden rounded-full bg-[#E7C27D] px-4 py-2 text-sm font-bold text-[#160A08] transition hover:-translate-y-0.5 hover:bg-[#F7DCA3] motion-reduce:hover:translate-y-0 sm:inline-flex"
          >
            Reserve
          </a>
        </header>

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-10 px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_25rem] lg:px-8">
          <div className="noir-hero-copy">
            <div className="noir-kicker mb-5 inline-flex items-center gap-2 rounded-full border border-[#E7C27D]/25 bg-[#E7C27D]/10 px-3 py-2 text-xs uppercase tracking-[0.2em] text-[#F7DCA3]">
              <Sparkles className="h-4 w-4" />
              Dinner after dark
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.92] tracking-tight text-[#FFF8EB] sm:text-7xl lg:text-8xl">
              <span className="noir-title-line block">Dinner after dark,</span>
              <span className="noir-title-line block text-[#E7C27D]">plated in gold.</span>
            </h1>
            <p className="noir-copy text-[#E8D8C1]/76 mt-6 max-w-2xl text-base leading-8 sm:text-lg">
              Noir Table is a cinematic reservation site with menu drama, cellar storytelling,
              private dining paths, and GSAP choreography built for scroll, sequence, and
              atmosphere.
            </p>
            <div className="noir-copy mt-8 flex flex-wrap gap-3">
              <a
                href="#menu"
                className="inline-flex items-center gap-2 rounded-full bg-[#E7C27D] px-6 py-3 font-bold text-[#160A08] transition hover:-translate-y-1 hover:bg-[#F7DCA3] motion-reduce:hover:translate-y-0"
              >
                Explore menu
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#private"
                className="border-[#E7C27D]/18 hover:border-[#E7C27D]/38 inline-flex items-center gap-2 rounded-full border bg-black/30 px-6 py-3 font-semibold text-[#F7DCA3] transition hover:-translate-y-1 motion-reduce:hover:translate-y-0"
              >
                Private dining
              </a>
            </div>
          </div>

          <aside
            id="reserve"
            className="noir-reservation border-[#E7C27D]/18 bg-[#120B09]/82 rounded-[2rem] border p-5 shadow-[0_32px_110px_rgba(0,0,0,0.55)] backdrop-blur-xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[#E7C27D]/70">Reservation</p>
                <h2 className="mt-2 text-3xl font-black">Tonight</h2>
              </div>
              <CalendarDays className="h-8 w-8 text-[#E7C27D]" />
            </div>
            <div className="grid gap-3">
              {[
                ['Date', 'May 21'],
                ['Party', '2 guests'],
                ['Time', '20:30'],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="border-[#E7C27D]/12 rounded-2xl border bg-black/25 px-4 py-3"
                >
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[#B99C69]">
                    {label}
                  </div>
                  <div className="mt-1 text-lg font-bold">{value}</div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="mt-5 w-full rounded-2xl bg-[#E7C27D] px-5 py-4 font-black text-[#160A08] transition hover:-translate-y-0.5 hover:bg-[#F7DCA3] motion-reduce:hover:translate-y-0"
            >
              Request table
            </button>
            <p className="mt-3 text-center text-xs leading-5 text-[#BFAF97]">
              Static reservation preview. No booking is submitted.
            </p>
          </aside>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        {[
          ['Open tonight', '18:00 - 00:30'],
          ['Chef tasting', 'Seven-course menu'],
          ['Cellar depth', '220 bottle list'],
        ].map(([title, text]) => (
          <div
            key={title}
            className="noir-floating-card border-[#E7C27D]/12 rounded-[1.4rem] border bg-[#120B09] p-5"
          >
            <div className="text-xs uppercase tracking-[0.22em] text-[#E7C27D]/60">{title}</div>
            <div className="mt-2 text-xl font-black">{text}</div>
          </div>
        ))}
      </section>

      <section id="menu" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="noir-reveal mb-10 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.24em] text-[#E7C27D]/70">Signature menu</p>
          <h2 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
            Courses staged like scenes.
          </h2>
          <p className="text-[#D7C7AF]/72 mt-4 text-sm leading-7">
            Menu cards use transform and opacity reveals, keeping the page smooth while preserving
            the restaurant&apos;s theatrical tone.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {dishes.map(dish => (
            <article
              key={dish.title}
              className="noir-dish border-[#E7C27D]/12 overflow-hidden rounded-[1.6rem] border bg-[#120B09]"
            >
              <img src={dish.image} alt={dish.title} className="h-64 w-full object-cover" />
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-black">{dish.title}</h3>
                    <p className="text-[#D7C7AF]/68 mt-2 text-sm leading-6">{dish.detail}</p>
                  </div>
                  <span className="rounded-full border border-[#E7C27D]/20 px-3 py-1 text-sm text-[#F7DCA3]">
                    {dish.price}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="noir-atmosphere relative overflow-hidden py-24">
        <img
          src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=2200&q=80"
          alt="Noir Table cocktail bar"
          className="noir-atmosphere-image absolute inset-0 h-[120%] w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,7,6,0.96),rgba(8,7,6,0.65),rgba(8,7,6,0.96))]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div className="noir-reveal">
            <p className="text-xs uppercase tracking-[0.24em] text-[#E7C27D]/70">Cellar</p>
            <h2 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
              The wine story is part of the booking flow.
            </h2>
          </div>
          <div className="grid gap-3">
            {cellar.map(([name, origin]) => (
              <div
                key={name}
                className="noir-reveal border-[#E7C27D]/12 rounded-[1.25rem] border bg-black/35 p-4 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <GlassWater className="h-5 w-5 text-[#E7C27D]" />
                  <div>
                    <div className="font-bold">{name}</div>
                    <div className="text-[#D7C7AF]/64 text-sm">{origin}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="private" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="border-[#E7C27D]/12 grid overflow-hidden rounded-[2rem] border bg-[#120B09] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="noir-reveal p-6 sm:p-8 lg:p-10">
            <p className="text-xs uppercase tracking-[0.24em] text-[#E7C27D]/70">Private dining</p>
            <h2 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
              Special nights should not hide behind a contact form.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#D7C7AF]/70">
              Event paths are presented as clear productized experiences with enough detail to
              invite an inquiry without pretending to run a live booking backend.
            </p>
          </div>
          <div className="border-[#E7C27D]/12 border-t p-6 sm:p-8 lg:border-l lg:border-t-0">
            <div className="space-y-3">
              {events.map(item => (
                <div
                  key={item}
                  className="noir-reveal border-[#E7C27D]/12 rounded-[1.25rem] border bg-black/25 p-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E7C27D] text-[#160A08]">
                      <Sparkles className="h-4 w-4" />
                    </span>
                    <span className="font-bold">{item}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="noir-reveal text-[#D7C7AF]/68 mt-5 flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-[#E7C27D]" />
              18 Crescent Lane, Old Town
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
