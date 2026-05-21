import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  CircleDot,
  ClipboardCheck,
  HeartPulse,
  MousePointer2,
  ShieldCheck,
  Smile,
  Sparkles,
  Star,
  Stethoscope,
} from 'lucide-react';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Draggable } from 'gsap/Draggable';
import { Flip } from 'gsap/Flip';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { Observer } from 'gsap/Observer';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, Flip, Observer, Draggable, InertiaPlugin);
}

export const meta: MetaFunction = () => [
  { title: 'NovaDent Clinic | GSAP Showcase' },
  {
    name: 'description',
    content:
      'A calm dental clinic website showcase built with GSAP SplitText, pinned ScrollTrigger journeys, Flip, Observer, Draggable, and Inertia.',
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
  ['Concern', 'Tell us what is happening in patient language.'],
  ['Pathway', 'Choose prevention, cosmetic, or urgent care without jargon.'],
  ['Comfort', 'Set visit expectations before the patient reaches the chair.'],
  ['Request', 'Demonstrate appointment intent without booking real care.'],
];

export default function NovaDentClinicRoute() {
  const containerRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reduceMotion) {
        gsap.set(
          '.nova-reveal, .nova-service-card, .nova-review, .nova-appointment, .nova-checkin-card, .nova-stage-card',
          {
            autoAlpha: 1,
            y: 0,
            x: 0,
            scale: 1,
            rotate: 0,
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
            yPercent: 92,
            rotate: 1.6,
            duration: 0.78,
            stagger: 0.032,
            ease: 'power3.out',
          });
        },
      });

      const intro = gsap.timeline({
        defaults: { duration: 0.72, ease: 'power3.out' },
      });

      intro
        .addLabel('open')
        .from('.nova-kicker', { autoAlpha: 0, y: 18 }, 'open')
        .from('.nova-copy', { autoAlpha: 0, y: 18 }, 'open+=0.24')
        .from('.nova-checkin-card', { autoAlpha: 0, y: 34, rotate: -1.4 }, 'open+=0.14')
        .from('.nova-flow-step', { autoAlpha: 0, x: -18, stagger: 0.08 }, 'open+=0.34')
        .from('.nova-orbit-dot', { autoAlpha: 0, scale: 0.3, stagger: 0.08 }, 'open+=0.42');

      const journey = gsap.timeline({
        scrollTrigger: {
          trigger: '.nova-journey-pin',
          start: 'top top',
          end: '+=1600',
          scrub: 0.8,
          pin: true,
        },
      });

      journey
        .to('.nova-journey-progress', { scaleX: 1, ease: 'none' })
        .to('.nova-stage-card', { y: -24, stagger: 0.12, ease: 'power2.out' }, '<')
        .to('.nova-orbit-ring', { rotate: 120, ease: 'none' }, 0)
        .to('.nova-orbit-dot', { rotate: -120, ease: 'none' }, 0);

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

      gsap.from('.nova-review', {
        autoAlpha: 0,
        y: 26,
        stagger: 0.08,
        duration: 0.68,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.nova-review-grid',
          start: 'top 80%',
          once: true,
        },
      });

      const serviceTabs = gsap.utils.toArray<HTMLButtonElement>('.nova-service-tab');
      const serviceCards = gsap.utils.toArray<HTMLElement>('.nova-service-card');
      let activeService = 0;

      const activateService = (nextIndex: number) => {
        activeService = gsap.utils.wrap(0, serviceCards.length, nextIndex);
        const state = Flip.getState('.nova-service-tab, .nova-service-card');

        serviceTabs.forEach((tab, index) => {
          const active = index === activeService;
          tab.classList.toggle('is-active', active);
          tab.setAttribute('aria-pressed', active ? 'true' : 'false');
        });

        serviceCards.forEach((card, index) => {
          card.classList.toggle('is-active', index === activeService);
        });

        Flip.from(state, {
          targets: '.nova-service-tab, .nova-service-card',
          duration: 0.52,
          ease: 'power3.inOut',
          nested: true,
          scale: true,
        });
      };

      const removeListeners = serviceTabs.map((tab, index) => {
        const onClick = () => activateService(index);
        tab.addEventListener('click', onClick);
        return () => tab.removeEventListener('click', onClick);
      });

      const serviceObserver = Observer.create({
        target: '.nova-service-orbit',
        type: 'wheel,touch,pointer',
        tolerance: 18,
        onLeft: () => activateService(activeService + 1),
        onRight: () => activateService(activeService - 1),
        onDown: () => activateService(activeService + 1),
        onUp: () => activateService(activeService - 1),
      });

      const comfortDraggables = Draggable.create('.nova-comfort-knob', {
        type: 'x',
        bounds: '.nova-comfort-track',
        inertia: true,
        edgeResistance: 0.85,
      });

      activateService(0);

      return () => {
        split.revert();
        serviceObserver.kill();
        comfortDraggables.forEach(instance => instance.kill());
        removeListeners.forEach(remove => remove());
      };
    },
    { scope: containerRef }
  );

  return (
    <main ref={containerRef} className="min-h-screen overflow-hidden bg-[#F7FBFA] text-[#102321]">
      <section className="relative min-h-screen overflow-hidden bg-[#F7FBFA]">
        <div className="absolute inset-0 bg-[linear-gradient(110deg,#F7FBFA_0%,#E7F8F4_42%,#C8E2EA_100%)]" />
        <div className="absolute right-0 top-0 h-full w-[42vw] bg-[url('https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center opacity-20" />

        <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <Link
            to="/pantheon-demo"
            className="inline-flex items-center gap-2 rounded-full border border-[#102321]/10 bg-white/75 px-3 py-2 text-xs uppercase tracking-[0.18em] text-[#39615C] shadow-sm transition hover:-translate-y-0.5 hover:text-[#102321] motion-reduce:hover:translate-y-0"
          >
            <ArrowLeft className="h-4 w-4" />
            Pantheon
          </Link>
          <div className="flex items-center gap-2 rounded-full border border-teal-400/25 bg-white/85 px-3 py-2 text-sm font-bold text-[#0F766E] shadow-sm">
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

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl gap-8 px-4 pb-14 pt-8 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:px-8">
          <div className="flex flex-col justify-center">
            <div className="nova-kicker mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-teal-400/25 bg-white/70 px-3 py-2 text-xs uppercase tracking-[0.22em] text-[#0F766E]">
              <Sparkles className="h-4 w-4" />
              Triage-led clinic UX
            </div>
            <h1 className="nova-headline max-w-4xl text-5xl font-black leading-[0.94] tracking-tight text-[#102321] sm:text-7xl">
              A dental visit that starts with less uncertainty.
            </h1>
            <p className="nova-copy mt-6 max-w-2xl text-base leading-8 text-[#48615D] sm:text-lg">
              This page is intentionally structured like patient check-in: concern, pathway,
              comfort, and request. The motion supports clarity instead of spectacle.
            </p>
            <div className="nova-copy mt-8 flex flex-wrap gap-3">
              <a
                href="#journey"
                className="inline-flex items-center gap-2 rounded-full bg-[#2DD4BF] px-6 py-3 font-bold text-[#102321] shadow-[0_22px_60px_rgba(45,212,191,0.24)] transition hover:-translate-y-1 hover:bg-[#5EEAD4] motion-reduce:hover:translate-y-0"
              >
                Start care path
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border border-[#102321]/10 bg-white/80 px-6 py-3 font-semibold text-[#102321] transition hover:-translate-y-1 hover:border-blue-300 hover:bg-white motion-reduce:hover:translate-y-0"
              >
                Compare services
              </a>
            </div>
          </div>

          <div className="nova-checkin-card relative flex min-h-[38rem] items-center justify-center">
            <div className="absolute inset-6 rounded-[3rem] border border-teal-300/25 bg-white/40" />
            <div className="nova-orbit-ring absolute h-[24rem] w-[24rem] rounded-full border border-dashed border-[#2DD4BF]/45">
              {services.map((service, index) => (
                <span
                  key={service.id}
                  className="nova-orbit-dot absolute flex h-16 w-16 items-center justify-center rounded-2xl border border-white bg-white text-[#102321] shadow-[0_18px_45px_rgba(16,35,33,0.12)]"
                  style={{
                    left: `${50 + Math.cos((index / services.length) * Math.PI * 2) * 44}%`,
                    top: `${50 + Math.sin((index / services.length) * Math.PI * 2) * 44}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <Stethoscope className="h-6 w-6" style={{ color: service.accent }} />
                </span>
              ))}
            </div>

            <div className="bg-white/88 relative w-full max-w-md rounded-[2rem] border border-white p-5 shadow-[0_34px_100px_rgba(16,35,33,0.16)] backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-[#0F766E]">
                    Check-in preview
                  </p>
                  <h2 className="mt-2 text-3xl font-black">Visit pathway</h2>
                </div>
                <ClipboardCheck className="h-9 w-9 text-[#0F766E]" />
              </div>
              <div className="grid gap-3">
                {careSteps.map(([title, detail], index) => (
                  <div
                    key={title}
                    className="nova-flow-step rounded-2xl border border-[#D3E7E3] bg-[#F7FBFA] p-4"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2DD4BF] text-xs font-black">
                        {index + 1}
                      </span>
                      <h3 className="font-black">{title}</h3>
                    </div>
                    <p className="text-sm leading-6 text-[#48615D]">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="journey"
        className="nova-journey-pin relative min-h-screen overflow-hidden bg-[#102321] px-4 py-20 text-white sm:px-6 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[22rem_minmax(0,1fr)] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#5EEAD4]">Pinned journey</p>
            <h2 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
              Scroll turns care into visible steps.
            </h2>
            <p className="text-white/62 mt-4 text-sm leading-7">
              GSAP pins this section and scrubs the progress so the clinic story feels different
              from the real estate search interface.
            </p>
            <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="nova-journey-progress h-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-[#2DD4BF] via-[#60A5FA] to-[#F59E0B]" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {careSteps.map(([title, detail], index) => (
              <article
                key={title}
                className="nova-stage-card min-h-[14rem] rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5"
              >
                <CircleDot className="mb-6 h-8 w-8 text-[#5EEAD4]" />
                <div className="text-xs uppercase tracking-[0.22em] text-white/45">
                  Stage {index + 1}
                </div>
                <h3 className="mt-2 text-2xl font-black">{title}</h3>
                <p className="text-white/62 mt-3 text-sm leading-7">{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="services"
        className="nova-service-orbit mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="nova-reveal mb-8 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.24em] text-[#0F766E]">Service pathways</p>
          <h2 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
            Swipe, wheel, or click to change the care focus.
          </h2>
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          {services.map((service, index) => (
            <button
              key={service.id}
              type="button"
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
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#E9F8F4] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-center">
          <div className="nova-review-grid grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {reviews.map(([value, label]) => (
              <div
                key={label}
                className="nova-review rounded-[1.25rem] border border-[#D3E7E3] bg-white p-5 shadow-[0_18px_50px_rgba(16,35,33,0.06)]"
              >
                <div className="text-3xl font-black text-[#0F766E]">{value}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.18em] text-[#71908B]">
                  {label}
                </div>
              </div>
            ))}
          </div>

          <div className="nova-reveal rounded-[1.75rem] border border-[#D3E7E3] bg-white p-5">
            <div className="mb-5 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#0F766E]">
              <MousePointer2 className="h-4 w-4" />
              Drag comfort level
            </div>
            <div className="nova-comfort-track relative h-16 rounded-full bg-[#102321] p-2">
              <div className="absolute inset-y-0 left-8 right-8 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-white/40">
                <span>Low</span>
                <span>Calm</span>
              </div>
              <button
                type="button"
                className="nova-comfort-knob absolute left-2 top-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#2DD4BF] text-[#102321] shadow-[0_14px_32px_rgba(45,212,191,0.32)]"
                aria-label="Drag comfort level"
              >
                <HeartPulse className="h-6 w-6" />
              </button>
            </div>
            <p className="mt-4 text-sm leading-7 text-[#48615D]">
              Draggable and InertiaPlugin make the comfort control feel physical without submitting
              health data.
            </p>
          </div>
        </div>
      </section>

      <section id="appointment" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-center">
          <div className="nova-reveal">
            <p className="text-xs uppercase tracking-[0.24em] text-[#0F766E]">Appointment intent</p>
            <h2 className="mt-2 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
              The final action feels like intake, not checkout.
            </h2>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                { Icon: Star, text: '4.9 from 620 reviews' },
                { Icon: ShieldCheck, text: 'Insurance friendly' },
                { Icon: BadgeCheck, text: 'Transparent planning' },
              ].map(({ Icon, text }) => (
                <div key={text} className="rounded-2xl border border-[#D3E7E3] bg-white p-4">
                  <Icon className="mb-3 h-5 w-5 text-[#0F766E]" />
                  <p className="font-bold">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <form className="nova-appointment rounded-[1.55rem] border border-[#D3E7E3] bg-white p-5 shadow-[0_24px_75px_rgba(16,35,33,0.10)]">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[#0F766E]">Static request</p>
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
              <CheckCircle2 className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
