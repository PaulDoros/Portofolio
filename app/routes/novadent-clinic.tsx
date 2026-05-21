import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  HeartPulse,
  ShieldCheck,
  Smile,
  Sparkles,
  Star,
  Stethoscope,
} from 'lucide-react';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, Flip);
}

export const meta: MetaFunction = () => [
  { title: 'NovaDent Clinic | GSAP Showcase' },
  {
    name: 'description',
    content:
      'A calm dental clinic website showcase built with GSAP, SplitText, ScrollTrigger, and Flip for accessible service discovery.',
  },
];

const services = [
  {
    id: 'family',
    title: 'Family Dentistry',
    detail: 'Preventive care, cleanings, and gentle yearly plans for the whole household.',
    time: 'Today',
    accent: '#2DD4BF',
  },
  {
    id: 'cosmetic',
    title: 'Smile Design',
    detail:
      'Whitening, veneers, aligner planning, and a consultation path with clear expectations.',
    time: 'New',
    accent: '#60A5FA',
  },
  {
    id: 'urgent',
    title: 'Emergency Visit',
    detail: 'Triage-first urgent care, pain relief guidance, and priority appointment intent.',
    time: '24h',
    accent: '#F59E0B',
  },
];

const reviews = [
  ['4.9', 'patient rating'],
  ['12', 'care pathways'],
  ['98%', 'comfort score'],
  ['1 min', 'request flow'],
];

const careSteps = [
  ['Tell us what hurts', 'The intake path starts with patient language, not clinic jargon.'],
  [
    'Choose a care path',
    'Services are grouped around prevention, cosmetic care, and urgent needs.',
  ],
  ['Confirm the request', 'The static form demonstrates intent without scheduling real care.'],
];

export default function NovaDentClinicRoute() {
  const containerRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reduceMotion) {
        gsap.set(
          '.nova-reveal, .nova-service-card, .nova-review, .nova-appointment, .nova-hero-visual',
          {
            autoAlpha: 1,
            y: 0,
            x: 0,
            scale: 1,
          }
        );
        return;
      }

      const split = SplitText.create('.nova-headline', {
        type: 'lines, words',
        mask: 'lines',
        autoSplit: true,
        aria: 'auto',
        onSplit(self) {
          return gsap.from(self.words, {
            autoAlpha: 0,
            yPercent: 90,
            duration: 0.72,
            stagger: 0.035,
            ease: 'power3.out',
          });
        },
      });

      const intro = gsap.timeline({
        defaults: { duration: 0.72, ease: 'power3.out' },
      });

      intro
        .from('.nova-kicker', { autoAlpha: 0, y: 18 })
        .from('.nova-copy', { autoAlpha: 0, y: 18 }, '<0.28')
        .from('.nova-hero-visual', { autoAlpha: 0, x: 28, scale: 0.96 }, '<0.08')
        .from('.nova-review', { autoAlpha: 0, y: 18, stagger: 0.08 }, '<0.22');

      ScrollTrigger.batch('.nova-reveal', {
        start: 'top 82%',
        once: true,
        onEnter: batch => {
          gsap.fromTo(
            batch,
            { autoAlpha: 0, y: 32 },
            { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out' }
          );
        },
      });

      ScrollTrigger.batch('.nova-service-card', {
        start: 'top 84%',
        once: true,
        onEnter: batch => {
          gsap.fromTo(
            batch,
            { autoAlpha: 0, y: 28, scale: 0.97 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.62, stagger: 0.08, ease: 'power3.out' }
          );
        },
      });

      gsap.to('.nova-care-progress', {
        scaleX: 1,
        transformOrigin: 'left center',
        ease: 'none',
        scrollTrigger: {
          trigger: '.nova-care-path',
          start: 'top 75%',
          end: 'bottom 55%',
          scrub: 0.6,
        },
      });

      const serviceTabs = gsap.utils.toArray<HTMLButtonElement>('.nova-service-tab');
      const serviceCards = gsap.utils.toArray<HTMLElement>('.nova-service-card');

      const activateService = (serviceId: string) => {
        const state = Flip.getState('.nova-service-tab, .nova-service-card');

        serviceTabs.forEach(tab => {
          const active = tab.dataset.service === serviceId;
          tab.classList.toggle('is-active', active);
          tab.setAttribute('aria-pressed', active ? 'true' : 'false');
        });

        serviceCards.forEach(card => {
          card.classList.toggle('is-active', card.dataset.service === serviceId);
        });

        Flip.from(state, {
          targets: '.nova-service-tab, .nova-service-card',
          duration: 0.48,
          ease: 'power3.inOut',
          absolute: false,
          nested: true,
          scale: true,
        });
      };

      const removeListeners = serviceTabs.map(tab => {
        const onClick = () => activateService(tab.dataset.service || 'family');
        tab.addEventListener('click', onClick);
        return () => tab.removeEventListener('click', onClick);
      });

      return () => {
        split.revert();
        removeListeners.forEach(remove => remove());
      };
    },
    { scope: containerRef }
  );

  return (
    <main ref={containerRef} className="min-h-screen overflow-hidden bg-[#F7FBFA] text-[#102321]">
      <section className="relative min-h-screen overflow-hidden bg-[#DFF6F1]">
        <img
          src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=2200&q=80"
          alt="NovaDent Clinic treatment room"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.24]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,251,250,0.98),rgba(247,251,250,0.88)_50%,rgba(37,99,235,0.12))]" />

        <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <Link
            to="/pantheon-demo"
            className="inline-flex items-center gap-2 rounded-full border border-[#102321]/10 bg-white/70 px-3 py-2 text-xs uppercase tracking-[0.18em] text-[#39615C] shadow-sm transition hover:-translate-y-0.5 hover:border-teal-400/40 hover:text-[#102321] motion-reduce:hover:translate-y-0"
          >
            <ArrowLeft className="h-4 w-4" />
            Pantheon
          </Link>
          <div className="flex items-center gap-2 rounded-full border border-teal-400/25 bg-white/75 px-3 py-2 text-sm font-bold text-[#0F766E] shadow-sm">
            <Smile className="h-4 w-4" />
            NovaDent Clinic
          </div>
          <a
            href="#appointment"
            className="hidden rounded-full bg-[#102321] px-4 py-2 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#0F766E] motion-reduce:hover:translate-y-0 sm:inline-flex"
          >
            Request visit
          </a>
        </header>

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-10 px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_27rem] lg:px-8">
          <div>
            <div className="nova-kicker mb-5 inline-flex items-center gap-2 rounded-full border border-teal-400/25 bg-white/70 px-3 py-2 text-xs uppercase tracking-[0.22em] text-[#0F766E]">
              <Sparkles className="h-4 w-4" />
              Calm care, clear motion
            </div>
            <h1 className="nova-headline max-w-5xl text-5xl font-black leading-[0.96] tracking-tight text-[#102321] sm:text-7xl lg:text-8xl">
              Calm care, brighter appointments.
            </h1>
            <p className="nova-copy mt-6 max-w-2xl text-base leading-8 text-[#48615D] sm:text-lg">
              NovaDent turns services, trust signals, patient reviews, and appointment intent into a
              calm healthcare website with GSAP-powered clarity.
            </p>
            <div className="nova-copy mt-8 flex flex-wrap gap-3">
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full bg-[#2DD4BF] px-6 py-3 font-bold text-[#102321] shadow-[0_22px_60px_rgba(45,212,191,0.24)] transition hover:-translate-y-1 hover:bg-[#5EEAD4] motion-reduce:hover:translate-y-0"
              >
                View services
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#appointment"
                className="inline-flex items-center gap-2 rounded-full border border-[#102321]/10 bg-white/80 px-6 py-3 font-semibold text-[#102321] transition hover:-translate-y-1 hover:border-blue-300 hover:bg-white motion-reduce:hover:translate-y-0"
              >
                Request appointment
              </a>
            </div>
          </div>

          <aside className="nova-hero-visual bg-white/78 rounded-[2rem] border border-white p-5 shadow-[0_32px_90px_rgba(16,35,33,0.14)] backdrop-blur-xl">
            <div className="rounded-[1.5rem] border border-[#D3E7E3] bg-[#F7FBFA] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-[#0F766E]">
                    Next availability
                  </p>
                  <h2 className="mt-2 text-3xl font-black">Smile Design consult</h2>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2DD4BF] text-[#102321]">
                  <CalendarDays className="h-7 w-7" />
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  ['Today', 'Slots'],
                  ['45m', 'Visit'],
                  ['4.9', 'Rating'],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-[#D3E7E3] bg-white p-3">
                    <div className="text-xl font-black">{value}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[#71908B]">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl bg-[#102321] p-4 text-white">
                <div className="mb-3 flex items-center gap-2 text-sm font-bold">
                  <HeartPulse className="h-4 w-4 text-[#2DD4BF]" />
                  Comfort plan included
                </div>
                <p className="text-white/68 text-sm leading-6">
                  Static appointment preview. The page does not collect health information or book
                  real care.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map(([value, label]) => (
            <div
              key={label}
              className="nova-review rounded-[1.25rem] border border-[#D3E7E3] bg-white p-5 shadow-[0_18px_50px_rgba(16,35,33,0.06)]"
            >
              <div className="text-3xl font-black text-[#0F766E]">{value}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.18em] text-[#71908B]">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="nova-reveal mb-8 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.24em] text-[#0F766E]">Service pathways</p>
          <h2 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
            Patients choose needs, not departments.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#48615D]">
            The tabs use GSAP Flip to keep the service selection smooth while preserving a simple
            healthcare layout.
          </p>
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          {services.map((service, index) => (
            <button
              key={service.id}
              type="button"
              data-service={service.id}
              aria-pressed={index === 0 ? 'true' : 'false'}
              className={`nova-service-tab rounded-full border px-4 py-2 text-sm font-bold transition ${
                index === 0 ? 'is-active' : ''
              }`}
            >
              {service.title}
            </button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.id}
              data-service={service.id}
              className={`nova-service-card rounded-[1.45rem] border border-[#D3E7E3] bg-white p-5 shadow-[0_18px_55px_rgba(16,35,33,0.06)] ${
                index === 0 ? 'is-active' : ''
              }`}
            >
              <div
                className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-[#102321]"
                style={{ backgroundColor: service.accent }}
              >
                <Stethoscope className="h-6 w-6" />
              </div>
              <div className="mb-3 flex items-start justify-between gap-3">
                <h3 className="text-2xl font-black">{service.title}</h3>
                <span className="rounded-full bg-[#EFF8F6] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#0F766E]">
                  {service.time}
                </span>
              </div>
              <p className="text-sm leading-7 text-[#48615D]">{service.detail}</p>
              <div className="mt-5 flex items-center gap-2 text-sm font-bold text-[#0F766E]">
                Learn pathway
                <ArrowRight className="h-4 w-4" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="nova-care-path bg-[#102321] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_28rem] lg:items-center">
          <div className="nova-reveal">
            <p className="text-xs uppercase tracking-[0.24em] text-[#5EEAD4]">Care path</p>
            <h2 className="mt-2 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
              A visit flow that feels composed before the first call.
            </h2>
            <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="nova-care-progress h-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-[#2DD4BF] via-[#60A5FA] to-[#F59E0B]" />
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {careSteps.map(([title, detail], index) => (
                <div key={title} className="rounded-[1.25rem] border border-white/10 p-5">
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#2DD4BF] text-sm font-black text-[#102321]">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-black">{title}</h3>
                  <p className="text-white/62 mt-2 text-sm leading-6">{detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="nova-reveal rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-5">
            <div className="grid gap-3">
              {[
                { Icon: Star, text: '4.9 from 620 patient reviews' },
                { Icon: ShieldCheck, text: 'Insurance friendly intake' },
                { Icon: BadgeCheck, text: 'Transparent treatment planning' },
              ].map(({ Icon, text }) => (
                <div key={text} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <Icon className="mb-3 h-5 w-5 text-[#5EEAD4]" />
                  <p className="font-bold">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="appointment" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-center">
          <div className="nova-reveal">
            <p className="text-xs uppercase tracking-[0.24em] text-[#0F766E]">Appointment intent</p>
            <h2 className="mt-2 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
              A static booking surface for a real clinic website feel.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#48615D]">
              This form intentionally does not submit. It demonstrates how the generated site could
              guide a patient from concern to appointment request.
            </p>
          </div>

          <form className="nova-appointment rounded-[1.55rem] border border-[#D3E7E3] bg-white p-5 shadow-[0_24px_75px_rgba(16,35,33,0.10)]">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[#0F766E]">
                  Request preview
                </p>
                <h3 className="mt-2 text-2xl font-black">Start a visit</h3>
              </div>
              <CalendarDays className="h-8 w-8 text-[#0F766E]" />
            </div>
            {['Care need', 'Preferred day', 'Contact method'].map(label => (
              <label key={label} className="mb-3 block">
                <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-[#71908B]">
                  {label}
                </span>
                <span className="block rounded-2xl border border-[#D3E7E3] bg-[#F7FBFA] px-4 py-3 text-sm text-[#71908B]">
                  Static showcase field
                </span>
              </label>
            ))}
            <button
              type="button"
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#102321] px-5 py-4 font-black text-white transition hover:-translate-y-0.5 hover:bg-[#0F766E] motion-reduce:hover:translate-y-0"
            >
              Simulate request
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
