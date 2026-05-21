import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Building2,
  FileText,
  Gavel,
  Landmark,
  Scale,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { Observer } from 'gsap/Observer';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(
    useGSAP,
    ScrollTrigger,
    ScrollSmoother,
    SplitText,
    Observer,
    InertiaPlugin,
    Physics2DPlugin
  );
}

export const meta: MetaFunction = () => [
  { title: 'Atlas Legal | GSAP Showcase' },
  {
    name: 'description',
    content:
      'A refined Atlas Legal professional services showcase built with GSAP ScrollSmoother, ScrollTrigger, SplitText, Observer, Inertia, and Physics2D.',
  },
];

const practiceAreas = [
  {
    id: 'corporate',
    title: 'Corporate Counsel',
    detail: 'Outside general counsel, transaction review, governance, and risk posture.',
    stat: '18 active boards',
    icon: Building2,
  },
  {
    id: 'disputes',
    title: 'Dispute Strategy',
    detail: 'Commercial litigation planning, mediation, evidence mapping, and escalation counsel.',
    stat: '42 resolved matters',
    icon: Gavel,
  },
  {
    id: 'private',
    title: 'Private Client',
    detail: 'Estate planning, succession, family offices, and cross-border asset structure.',
    stat: '$2.4B guided',
    icon: Landmark,
  },
];

const proofItems = [
  ['42', 'case wins'],
  ['$2.4B', 'client assets guided'],
  ['18', 'board advisories'],
  ['96%', 'consult clarity score'],
];

const attorneys = [
  ['Mara Ionescu', 'Corporate and governance', '22 years'],
  ['Elliot Crane', 'Commercial disputes', '17 years'],
  ['Nadia Vale', 'Private client strategy', '19 years'],
];

export default function AtlasLegalRoute() {
  const containerRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const q = gsap.utils.selector(containerRef);

      if (reduceMotion) {
        gsap.set(
          '.atlas-reveal, .atlas-proof-card, .atlas-attorney, .atlas-consult, .atlas-hero-card',
          {
            autoAlpha: 1,
            y: 0,
            x: 0,
            scale: 1,
          }
        );
        return;
      }

      const split = SplitText.create('.atlas-headline', {
        type: 'lines, words',
        mask: 'lines',
        autoSplit: true,
        aria: 'auto',
        onSplit(self) {
          return gsap.from(self.words, {
            autoAlpha: 0,
            yPercent: 100,
            duration: 0.78,
            stagger: 0.035,
            ease: 'power3.out',
          });
        },
      });

      const smoother =
        window.innerWidth >= 1024
          ? ScrollSmoother.create({
              wrapper: q('.atlas-smooth-wrapper')[0],
              content: q('.atlas-smooth-content')[0],
              smooth: 0.75,
              effects: true,
              normalizeScroll: true,
            })
          : null;

      const intro = gsap.timeline({
        defaults: { duration: 0.72, ease: 'power3.out' },
      });

      intro
        .from('.atlas-kicker', { autoAlpha: 0, y: 18 })
        .from('.atlas-copy', { autoAlpha: 0, y: 18 }, '<0.28')
        .from('.atlas-hero-card', { autoAlpha: 0, x: 28, scale: 0.96 }, '<0.08')
        .from('.atlas-practice-button', { autoAlpha: 0, y: 16, stagger: 0.08 }, '<0.16');

      ScrollTrigger.batch('.atlas-reveal', {
        start: 'top 82%',
        once: true,
        onEnter: batch => {
          gsap.fromTo(
            batch,
            { autoAlpha: 0, y: 30 },
            { autoAlpha: 1, y: 0, duration: 0.72, stagger: 0.08, ease: 'power3.out' }
          );
        },
      });

      gsap.from('.atlas-proof-card', {
        autoAlpha: 0,
        y: 26,
        stagger: 0.08,
        duration: 0.68,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.atlas-proof-grid',
          start: 'top 78%',
          once: true,
        },
      });

      const practiceButtons = gsap.utils.toArray<HTMLButtonElement>('.atlas-practice-button');
      const practicePanels = gsap.utils.toArray<HTMLElement>('.atlas-case-panel');
      let activePractice = 0;

      const setPractice = (nextIndex: number) => {
        activePractice = gsap.utils.wrap(0, practicePanels.length, nextIndex);
        practiceButtons.forEach((button, index) => {
          const active = index === activePractice;
          button.classList.toggle('is-active', active);
          button.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
        practicePanels.forEach((panel, index) => {
          const active = index === activePractice;
          panel.classList.toggle('is-active', active);
          gsap.to(panel, {
            autoAlpha: active ? 1 : 0.35,
            scale: active ? 1 : 0.96,
            y: active ? 0 : 10,
            duration: 0.36,
            ease: 'power2.out',
            overwrite: true,
          });
        });
      };

      const practiceObserver = Observer.create({
        target: q('.atlas-practice-stage')[0],
        type: 'wheel,touch,pointer',
        tolerance: 24,
        onDown: () => setPractice(activePractice + 1),
        onUp: () => setPractice(activePractice - 1),
        onLeft: () => setPractice(activePractice + 1),
        onRight: () => setPractice(activePractice - 1),
      });

      const removeButtonListeners = practiceButtons.map((button, index) => {
        const onClick = () => setPractice(index);
        button.addEventListener('click', onClick);
        return () => button.removeEventListener('click', onClick);
      });

      const proofTrack = q('.atlas-proof-track')[0];
      let proofObserver: Observer | null = null;

      if (proofTrack) {
        InertiaPlugin.track(proofTrack, 'x');
        proofObserver = Observer.create({
          target: q('.atlas-proof-rail')[0],
          type: 'wheel,touch,pointer',
          tolerance: 6,
          onChangeX(self) {
            gsap.to(proofTrack, {
              x: `+=${self.deltaX * 0.65}`,
              duration: 0.35,
              ease: 'power2.out',
              overwrite: true,
            });
          },
          onRelease() {
            gsap.to(proofTrack, {
              inertia: {
                x: {
                  velocity: 'auto',
                  min: -280,
                  max: 0,
                },
              },
            });
          },
        });
      }

      gsap.utils.toArray<HTMLElement>('.atlas-particle').forEach((particle, index) => {
        gsap.fromTo(
          particle,
          { autoAlpha: 0.42, x: 0, y: 0, scale: 0.6 },
          {
            autoAlpha: 0,
            scale: 1,
            duration: 2.4,
            repeat: -1,
            repeatDelay: 1.4 + index * 0.24,
            delay: index * 0.18,
            physics2D: {
              velocity: 38 + index * 8,
              angle: -68 + index * 16,
              gravity: 18,
              friction: 0.12,
            },
          }
        );
      });

      setPractice(0);

      return () => {
        split.revert();
        smoother?.kill();
        practiceObserver.kill();
        proofObserver?.kill();
        if (proofTrack) {
          InertiaPlugin.untrack(proofTrack, 'x');
        }
        removeButtonListeners.forEach(remove => remove());
      };
    },
    { scope: containerRef }
  );

  return (
    <main ref={containerRef} className="min-h-screen overflow-hidden bg-[#0D1016] text-[#F6F0E5]">
      <div className="atlas-smooth-wrapper">
        <div className="atlas-smooth-content">
          <section className="relative min-h-screen overflow-hidden bg-[#11151D]">
            <img
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2200&q=80"
              alt="Atlas Legal boardroom"
              className="absolute inset-0 h-full w-full object-cover opacity-[0.28]"
              data-speed="0.92"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,16,22,0.98),rgba(13,16,22,0.82)_48%,rgba(167,139,250,0.12))]" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0D1016] to-transparent" />
            <div className="pointer-events-none absolute right-[12%] top-[28%] h-28 w-28 rounded-full border border-[#E7C27D]/15" />
            {[0, 1, 2, 3, 4, 5].map(index => (
              <span
                key={index}
                className="atlas-particle pointer-events-none absolute h-2 w-2 rounded-full bg-[#E7C27D]"
                style={{
                  left: `${64 + index * 4}%`,
                  top: `${44 + (index % 3) * 6}%`,
                }}
              />
            ))}

            <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
              <Link
                to="/pantheon-demo"
                className="inline-flex items-center gap-2 rounded-full border border-[#E7C27D]/20 bg-white/[0.06] px-3 py-2 text-xs uppercase tracking-[0.18em] text-[#E7C27D] backdrop-blur transition hover:-translate-y-0.5 hover:border-[#E7C27D]/50 motion-reduce:hover:translate-y-0"
              >
                <ArrowLeft className="h-4 w-4" />
                Pantheon
              </Link>
              <div className="flex items-center gap-2 rounded-full border border-[#E7C27D]/20 bg-[#E7C27D]/10 px-3 py-2 text-sm font-bold text-[#F7DCA3]">
                <Scale className="h-4 w-4" />
                Atlas Legal
              </div>
              <a
                href="#consult"
                className="hidden rounded-full bg-[#E7C27D] px-4 py-2 text-sm font-bold text-[#11151D] transition hover:-translate-y-0.5 hover:bg-[#F7DCA3] motion-reduce:hover:translate-y-0 sm:inline-flex"
              >
                Request consult
              </a>
            </header>

            <div className="pb-18 relative z-10 mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-10 px-4 pt-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_28rem] lg:px-8">
              <div>
                <div className="atlas-kicker mb-5 inline-flex items-center gap-2 rounded-full border border-[#E7C27D]/25 bg-[#E7C27D]/10 px-3 py-2 text-xs uppercase tracking-[0.22em] text-[#F7DCA3]">
                  <Sparkles className="h-4 w-4" />
                  Evidence-led counsel
                </div>
                <h1 className="atlas-headline max-w-5xl text-5xl font-black leading-[0.94] tracking-tight text-white sm:text-7xl lg:text-8xl">
                  Clear counsel for consequential decisions.
                </h1>
                <p className="atlas-copy text-[#D8CBB8]/76 mt-6 max-w-2xl text-base leading-8 sm:text-lg">
                  Atlas Legal presents practice areas, attorney authority, case evidence, and a
                  serious consultation path with restrained GSAP motion.
                </p>
                <div className="atlas-copy mt-8 flex flex-wrap gap-3">
                  <a
                    href="#practice"
                    className="inline-flex items-center gap-2 rounded-full bg-[#E7C27D] px-6 py-3 font-bold text-[#11151D] shadow-[0_22px_60px_rgba(231,194,125,0.22)] transition hover:-translate-y-1 hover:bg-[#F7DCA3] motion-reduce:hover:translate-y-0"
                  >
                    Practice areas
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#consult"
                    className="border-white/12 inline-flex items-center gap-2 rounded-full border bg-white/[0.06] px-6 py-3 font-semibold text-[#F6F0E5] transition hover:-translate-y-1 hover:border-[#E7C27D]/35 hover:bg-white/[0.1] motion-reduce:hover:translate-y-0"
                  >
                    Confidential consult
                  </a>
                </div>
              </div>

              <aside className="atlas-hero-card border-[#E7C27D]/16 bg-[#141A24]/84 rounded-[2rem] border p-5 shadow-[0_32px_110px_rgba(0,0,0,0.44)] backdrop-blur-xl">
                <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-[#E7C27D]/70">
                        Strategy brief
                      </p>
                      <h2 className="mt-2 text-3xl font-black">Corporate Counsel</h2>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E7C27D] text-[#11151D]">
                      <Briefcase className="h-7 w-7" />
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {[
                      ['48h', 'brief turnaround'],
                      ['18', 'board advisories'],
                      ['$2.4B', 'assets guided'],
                      ['96%', 'clarity score'],
                    ].map(([value, label]) => (
                      <div
                        key={label}
                        className="rounded-2xl border border-white/10 bg-white/[0.05] p-3"
                      >
                        <div className="text-xl font-black">{value}</div>
                        <div className="text-white/42 mt-1 text-[10px] uppercase tracking-[0.18em]">
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </section>

          <section className="atlas-proof-grid mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {proofItems.map(([value, label]) => (
                <div
                  key={label}
                  className="atlas-proof-card border-[#E7C27D]/12 rounded-[1.25rem] border bg-[#141A24] p-5"
                >
                  <div className="text-3xl font-black text-[#E7C27D]">{value}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.18em] text-[#AFA795]">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section
            id="practice"
            className="atlas-practice-stage mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
          >
            <div className="atlas-reveal mb-8 max-w-3xl">
              <p className="text-xs uppercase tracking-[0.24em] text-[#E7C27D]">Practice areas</p>
              <h2 className="mt-2 text-4xl font-black tracking-tight text-white sm:text-5xl">
                Navigate the matter by direction, evidence, and urgency.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#AFA795]">
                Wheel, swipe, or click inside this stage. GSAP Observer changes the active legal
                path without turning the page into a modal.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[20rem_minmax(0,1fr)]">
              <div className="grid gap-3">
                {practiceAreas.map((practice, index) => (
                  <button
                    key={practice.id}
                    type="button"
                    aria-pressed={index === 0 ? 'true' : 'false'}
                    className={`atlas-practice-button rounded-[1.15rem] border px-4 py-4 text-left transition ${
                      index === 0 ? 'is-active' : ''
                    }`}
                  >
                    <span className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.18em]">
                      <practice.icon className="h-4 w-4" />
                      {practice.stat}
                    </span>
                    <span className="block text-lg font-black">{practice.title}</span>
                  </button>
                ))}
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {practiceAreas.map((practice, index) => (
                  <article
                    key={practice.id}
                    className={`atlas-case-panel border-[#E7C27D]/12 rounded-[1.45rem] border bg-[#141A24] p-5 ${
                      index === 0 ? 'is-active' : ''
                    }`}
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E7C27D] text-[#11151D]">
                      <practice.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-black">{practice.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#AFA795]">{practice.detail}</p>
                    <div className="mt-5 inline-flex rounded-full border border-[#E7C27D]/20 bg-[#E7C27D]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#F7DCA3]">
                      {practice.stat}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-[#F2ECE1] px-4 py-20 text-[#11151D] sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="atlas-reveal mb-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-end">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#7A5B16]">
                    Matter evidence
                  </p>
                  <h2 className="mt-2 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
                    Proof stays structured, draggable, and serious.
                  </h2>
                </div>
                <p className="text-sm leading-7 text-[#5C5143]">
                  The proof rail uses Observer and InertiaPlugin so touch or pointer movement glides
                  into place without fake content submission.
                </p>
              </div>

              <div className="atlas-proof-rail overflow-hidden rounded-[1.45rem] border border-[#CDBFAD] bg-white p-4">
                <div className="atlas-proof-track flex w-max gap-4">
                  {[
                    ['Governance map', 'Board conflicts reduced before diligence'],
                    ['Dispute brief', 'Evidence sequence ready before mediation'],
                    ['Succession plan', 'Private client transfer path clarified'],
                    ['M&A review', 'Risk issues surfaced before term sheet'],
                    ['Operating model', 'Counsel path consolidated across teams'],
                  ].map(([title, text]) => (
                    <article
                      key={title}
                      className="w-72 shrink-0 rounded-[1.15rem] border border-[#E3D8C7] bg-[#F8F5EF] p-5"
                    >
                      <FileText className="mb-5 h-6 w-6 text-[#7A5B16]" />
                      <h3 className="text-xl font-black">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#5C5143]">{text}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="atlas-reveal mb-8 max-w-3xl">
              <p className="text-xs uppercase tracking-[0.24em] text-[#E7C27D]">Attorneys</p>
              <h2 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
                Senior profiles before the consultation ask.
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {attorneys.map(([name, focus, years]) => (
                <article
                  key={name}
                  className="atlas-attorney border-[#E7C27D]/12 rounded-[1.4rem] border bg-[#141A24] p-5"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E7C27D] text-[#11151D]">
                    <Scale className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-black">{name}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#AFA795]">{focus}</p>
                  <div className="mt-5 inline-flex rounded-full border border-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#F7DCA3]">
                    {years}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="consult" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-center">
              <div className="atlas-reveal">
                <p className="text-xs uppercase tracking-[0.24em] text-[#E7C27D]">
                  Consultation path
                </p>
                <h2 className="mt-2 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
                  Direct enough for urgency, restrained enough for trust.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#AFA795]">
                  This route is static. The consultation surface demonstrates conversion intent
                  without collecting confidential information.
                </p>
                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {[
                    { Icon: ShieldCheck, label: 'Confidential' },
                    { Icon: BadgeCheck, label: 'Evidence-led' },
                    { Icon: Briefcase, label: 'Senior review' },
                  ].map(({ Icon, label }) => (
                    <div key={label} className="rounded-2xl border border-white/10 p-4">
                      <Icon className="mb-3 h-5 w-5 text-[#E7C27D]" />
                      <div className="text-sm font-bold">{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <form className="atlas-consult border-[#E7C27D]/12 rounded-[1.55rem] border bg-[#141A24] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
                <div className="mb-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-[#E7C27D]">
                    Static consult preview
                  </p>
                  <h3 className="mt-2 text-2xl font-black">Request review</h3>
                </div>
                {['Matter type', 'Timeline', 'Preferred contact'].map(label => (
                  <label key={label} className="mb-3 block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-[#AFA795]">
                      {label}
                    </span>
                    <span className="block rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-[#AFA795]">
                      Static showcase field
                    </span>
                  </label>
                ))}
                <button
                  type="button"
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#E7C27D] px-5 py-4 font-black text-[#11151D] transition hover:-translate-y-0.5 hover:bg-[#F7DCA3] motion-reduce:hover:translate-y-0"
                >
                  Simulate confidential request
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
