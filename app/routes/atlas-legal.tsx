import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Briefcase,
  FileWarning,
  FileSearch,
  FileText,
  Fingerprint,
  Gavel,
  Landmark,
  LockKeyhole,
  Network,
  PanelLeft,
  Scale,
  ScanLine,
  ScrollText,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { Flip } from 'gsap/Flip';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { Observer } from 'gsap/Observer';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(
    useGSAP,
    ScrollTrigger,
    ScrollSmoother,
    Flip,
    SplitText,
    Observer,
    InertiaPlugin,
    Physics2DPlugin,
    ScrambleTextPlugin,
    DrawSVGPlugin
  );
}

export const meta: MetaFunction = () => [
  { title: 'Atlas Legal | GSAP Showcase' },
  {
    name: 'description',
    content:
      'A legal dossier showcase built with GSAP ScrollSmoother, ScrollTrigger, SplitText, ScrambleText, DrawSVG, Observer, Inertia, and Physics2D.',
  },
];

const practiceAreas = [
  {
    id: 'corporate',
    title: 'Corporate Counsel',
    detail: 'Outside general counsel, transaction review, governance, and risk posture.',
    stat: '18 board advisories',
    icon: Briefcase,
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
  ['48h', 'brief turnaround'],
];

const briefStages = [
  ['Intake', 'Facts separated from interpretation before a recommendation is made.'],
  ['Evidence', 'Risk, documents, counterparties, and timeline are mapped as a working dossier.'],
  ['Strategy', 'The attorney path becomes a clear set of decisions and next actions.'],
  ['Consult', 'The static request surface shows intent without collecting confidential details.'],
];

const attorneys = [
  ['Mara Ionescu', 'Corporate and governance', '22 years'],
  ['Elliot Crane', 'Commercial disputes', '17 years'],
  ['Nadia Vale', 'Private client strategy', '19 years'],
];

const riskMatrix = [
  {
    id: 'governance',
    label: 'Governance',
    level: 'Elevated',
    score: '74',
    issue: 'Board approvals and delegation gaps need to be cleaned before a financing event.',
    action: 'Prepare consent package, authority memo, and officer certificate checklist.',
    icon: BarChart3,
  },
  {
    id: 'evidence',
    label: 'Evidence',
    level: 'Contested',
    score: '61',
    issue: 'Key communications exist across email, SMS, and shared drives with weak chronology.',
    action: 'Build a privilege-aware timeline and isolate documents for counsel review.',
    icon: ScanLine,
  },
  {
    id: 'exposure',
    label: 'Exposure',
    level: 'High',
    score: '88',
    issue: 'Contract language creates meaningful fee-shifting and injunctive risk.',
    action: 'Model settlement posture, preservation duties, and early motion leverage.',
    icon: ShieldAlert,
  },
];

export default function AtlasLegalRoute() {
  const containerRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const q = gsap.utils.selector(containerRef);

      if (reduceMotion) {
        gsap.set(
          '.atlas-reveal, .atlas-proof-card, .atlas-attorney, .atlas-consult, .atlas-dossier, .atlas-stage-card, .atlas-risk-token, .atlas-risk-panel',
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

      const split = SplitText.create('.atlas-dossier-title', {
        type: 'lines, words',
        mask: 'lines',
        autoSplit: true,
        aria: 'auto',
        onSplit(self) {
          return gsap.from(self.words, {
            autoAlpha: 0,
            yPercent: 110,
            duration: 0.82,
            stagger: 0.034,
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
        .from('.atlas-index-row', { autoAlpha: 0, x: -18, stagger: 0.07 })
        .from('.atlas-dossier', { autoAlpha: 0, y: 30, rotate: -1.2 }, '<0.12')
        .from('.atlas-live-panel', { autoAlpha: 0, x: 26, scale: 0.96 }, '<0.16')
        .to(
          '.atlas-classified',
          {
            duration: 1.1,
            scrambleText: { text: 'CONFIDENTIAL MATTER', chars: 'upperCase' },
          } as gsap.TweenVars,
          '<0.2'
        )
        .from(
          '.atlas-brief-line',
          { drawSVG: '0% 0%', duration: 0.9, stagger: 0.08 } as gsap.TweenVars,
          '<0.16'
        );

      const dossierTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.atlas-dossier-pin',
          start: 'top top',
          end: '+=1500',
          scrub: 0.8,
          pin: true,
        },
      });

      dossierTimeline
        .to('.atlas-stage-card', { xPercent: -112, stagger: 0.18, ease: 'none' })
        .to(
          '.atlas-case-line',
          { drawSVG: '0% 100%', stagger: 0.08, ease: 'none' } as gsap.TweenVars,
          0
        )
        .to('.atlas-dossier-seal', { rotate: 32, scale: 1.05, ease: 'none' }, 0);

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
            autoAlpha: active ? 1 : 0.28,
            scale: active ? 1 : 0.94,
            y: active ? 0 : 14,
            duration: 0.36,
            ease: 'power2.out',
            overwrite: true,
          });
        });
      };

      const practiceObserver = Observer.create({
        target: '.atlas-practice-deck',
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

      const riskButtons = gsap.utils.toArray<HTMLButtonElement>('.atlas-risk-token');
      const riskPanels = gsap.utils.toArray<HTMLElement>('.atlas-risk-panel');
      const riskDeck = q('.atlas-risk-matrix')[0];
      let activeRisk = 0;
      let riskObserver: Observer | null = null;

      const setRisk = (nextIndex: number) => {
        if (!riskButtons.length || !riskPanels.length) return;

        activeRisk = gsap.utils.wrap(0, riskPanels.length, nextIndex);
        const state = Flip.getState([...riskButtons, ...riskPanels]);

        riskButtons.forEach((button, index) => {
          const active = index === activeRisk;
          button.classList.toggle('is-active', active);
          button.setAttribute('aria-pressed', active ? 'true' : 'false');
        });

        riskPanels.forEach((panel, index) => {
          panel.classList.toggle('is-active', index === activeRisk);
        });

        Flip.from(state, {
          duration: 0.52,
          ease: 'power3.inOut',
          nested: true,
          scale: true,
        });

        gsap.fromTo(
          riskPanels[activeRisk].querySelectorAll('.atlas-risk-line'),
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: 'left center',
            duration: 0.46,
            stagger: 0.08,
            ease: 'power2.out',
          }
        );
      };

      const removeRiskListeners = riskButtons.map((button, index) => {
        const onClick = () => setRisk(index);
        button.addEventListener('click', onClick);
        return () => button.removeEventListener('click', onClick);
      });

      if (riskDeck && riskButtons.length) {
        riskObserver = Observer.create({
          target: riskDeck,
          type: 'wheel,touch,pointer',
          tolerance: 20,
          onDown: () => setRisk(activeRisk + 1),
          onUp: () => setRisk(activeRisk - 1),
          onLeft: () => setRisk(activeRisk + 1),
          onRight: () => setRisk(activeRisk - 1),
        });
      }

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
                  min: -360,
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
            duration: 2.3,
            repeat: -1,
            repeatDelay: 1.2 + index * 0.2,
            delay: index * 0.16,
            physics2D: {
              velocity: 36 + index * 7,
              angle: -70 + index * 14,
              gravity: 16,
              friction: 0.12,
            },
          }
        );
      });

      setPractice(0);
      setRisk(0);

      return () => {
        split.revert();
        smoother?.kill();
        practiceObserver.kill();
        riskObserver?.kill();
        proofObserver?.kill();
        if (proofTrack) {
          InertiaPlugin.untrack(proofTrack, 'x');
        }
        removeButtonListeners.forEach(remove => remove());
        removeRiskListeners.forEach(remove => remove());
      };
    },
    { scope: containerRef }
  );

  return (
    <main ref={containerRef} className="min-h-screen overflow-hidden bg-[#0C0D10] text-[#F6F0E5]">
      <div className="atlas-smooth-wrapper">
        <div className="atlas-smooth-content">
          <section className="relative min-h-screen overflow-hidden bg-[#0C0D10]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_18%,rgba(231,194,125,0.13),transparent_28%),linear-gradient(135deg,#0C0D10,#151923_58%,#0C0D10)]" />
            <img
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1800&q=80"
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-[0.12] mix-blend-luminosity"
              data-speed="0.92"
            />
            {[0, 1, 2, 3, 4, 5].map(index => (
              <span
                key={index}
                className="atlas-particle pointer-events-none absolute h-2 w-2 rounded-full bg-[#E7C27D]"
                style={{
                  left: `${58 + index * 5}%`,
                  top: `${35 + (index % 3) * 8}%`,
                }}
              />
            ))}

            <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
              <Link
                to="/pantheon-demo"
                className="inline-flex items-center gap-2 rounded-full border border-[#E7C27D]/20 bg-white/[0.05] px-3 py-2 text-xs uppercase tracking-[0.18em] text-[#E7C27D] backdrop-blur transition hover:-translate-y-0.5 hover:border-[#E7C27D]/50 motion-reduce:hover:translate-y-0"
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

            <div className="relative z-10 mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl gap-5 px-4 pb-10 pt-4 sm:px-6 lg:grid-cols-[15rem_minmax(0,1fr)_22rem] lg:px-8">
              <aside className="hidden flex-col gap-3 lg:flex">
                <div className="atlas-index-row border-[#E7C27D]/16 rounded-[1.2rem] border bg-white/[0.05] p-4">
                  <PanelLeft className="mb-4 h-5 w-5 text-[#E7C27D]" />
                  <div className="text-[10px] uppercase tracking-[0.22em] text-[#AFA795]">
                    Matter index
                  </div>
                </div>
                {['Facts', 'Risk', 'Evidence', 'Counsel'].map((item, index) => (
                  <div
                    key={item}
                    className="atlas-index-row rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-4"
                  >
                    <div className="text-xs uppercase tracking-[0.2em] text-[#E7C27D]">
                      0{index + 1}
                    </div>
                    <div className="mt-2 font-bold">{item}</div>
                  </div>
                ))}
              </aside>

              <article className="atlas-dossier relative overflow-hidden rounded-[2rem] border border-[#D8C6A5] bg-[#F2ECE1] p-6 text-[#11151D] shadow-[0_34px_120px_rgba(0,0,0,0.36)] lg:p-9">
                <div className="absolute right-8 top-8 rounded-full border border-[#7A5B16]/25 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[#7A5B16]">
                  <span className="atlas-classified">Classified</span>
                </div>
                <div className="mb-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#11151D] text-[#E7C27D]">
                  <Fingerprint className="h-7 w-7" />
                </div>
                <p className="text-xs uppercase tracking-[0.26em] text-[#7A5B16]">
                  Dossier website, not a generic hero
                </p>
                <h1 className="atlas-dossier-title mt-4 max-w-4xl text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl">
                  Clear counsel for consequential decisions.
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-[#5C5143]">
                  Atlas Legal is staged as a working brief: matter index, evidence rail, practice
                  navigator, and a restrained consultation request.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {proofItems.slice(0, 3).map(([value, label]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-[#D2C5AE] bg-white/55 p-4"
                    >
                      <div className="text-2xl font-black">{value}</div>
                      <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[#7A6A54]">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
                <svg className="mt-10 h-20 w-full" viewBox="0 0 520 80" aria-hidden="true">
                  <path
                    className="atlas-brief-line"
                    d="M4 58 C 82 12, 140 68, 212 34 S 356 18, 512 48"
                    fill="none"
                    stroke="#7A5B16"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    className="atlas-brief-line"
                    d="M18 70 C 122 40, 190 78, 286 46 S 412 38, 502 18"
                    fill="none"
                    stroke="#11151D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.42"
                  />
                </svg>
              </article>

              <aside className="atlas-live-panel border-[#E7C27D]/16 bg-[#141A24]/88 rounded-[2rem] border p-5 shadow-[0_32px_110px_rgba(0,0,0,0.42)] backdrop-blur-xl">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-[#E7C27D]/70">
                      Strategy brief
                    </p>
                    <h2 className="mt-2 text-2xl font-black">Corporate Counsel</h2>
                  </div>
                  <LockKeyhole className="h-7 w-7 text-[#E7C27D]" />
                </div>
                <div className="grid gap-3">
                  {practiceAreas.map((practice, index) => (
                    <button
                      key={practice.id}
                      type="button"
                      aria-pressed={index === 0 ? 'true' : 'false'}
                      className={`atlas-practice-button rounded-[1.1rem] border px-4 py-4 text-left transition ${
                        index === 0 ? 'is-active' : ''
                      }`}
                    >
                      <practice.icon className="mb-3 h-5 w-5" />
                      <span className="block text-sm font-black">{practice.title}</span>
                      <span className="mt-1 block text-xs opacity-70">{practice.stat}</span>
                    </button>
                  ))}
                </div>
              </aside>
            </div>
          </section>

          <section className="atlas-dossier-pin relative min-h-screen overflow-hidden bg-[#11151D] px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="mb-10 grid gap-4 lg:grid-cols-[22rem_minmax(0,1fr)] lg:items-end">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#E7C27D]">
                    Pinned case strategy
                  </p>
                  <h2 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
                    Scroll through the legal work like a brief.
                  </h2>
                </div>
                <p className="text-sm leading-7 text-[#AFA795]">
                  GSAP pins this section and draws the case lines while cards move horizontally.
                </p>
              </div>

              <div className="border-[#E7C27D]/14 relative overflow-hidden rounded-[1.6rem] border bg-[#0C0D10] p-5">
                <div className="atlas-dossier-seal absolute right-8 top-8 flex h-24 w-24 items-center justify-center rounded-full border border-[#E7C27D]/25 text-[#E7C27D]">
                  <Scale className="h-10 w-10" />
                </div>
                <svg
                  className="absolute inset-0 h-full w-full opacity-50"
                  viewBox="0 0 900 380"
                  aria-hidden="true"
                >
                  <path
                    className="atlas-case-line"
                    d="M80 260 C 210 90, 354 300, 480 160 S 702 72, 836 214"
                    fill="none"
                    stroke="#E7C27D"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    className="atlas-case-line"
                    d="M64 310 C 238 230, 312 96, 512 236 S 704 292, 852 126"
                    fill="none"
                    stroke="#A78BFA"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                </svg>
                <div className="relative flex min-h-[24rem] gap-5">
                  {briefStages.map(([title, detail], index) => (
                    <article
                      key={title}
                      className="atlas-stage-card w-[24rem] shrink-0 rounded-[1.35rem] border border-white/10 bg-white/[0.06] p-5"
                    >
                      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E7C27D] text-[#11151D]">
                        {index === 0 ? (
                          <FileSearch className="h-6 w-6" />
                        ) : index === 1 ? (
                          <Network className="h-6 w-6" />
                        ) : index === 2 ? (
                          <ScrollText className="h-6 w-6" />
                        ) : (
                          <Scale className="h-6 w-6" />
                        )}
                      </div>
                      <div className="text-xs uppercase tracking-[0.22em] text-[#E7C27D]/70">
                        Stage {index + 1}
                      </div>
                      <h3 className="mt-2 text-3xl font-black">{title}</h3>
                      <p className="mt-4 text-sm leading-7 text-[#AFA795]">{detail}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="atlas-practice-deck mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="atlas-reveal mb-8 max-w-3xl">
              <p className="text-xs uppercase tracking-[0.24em] text-[#E7C27D]">Practice deck</p>
              <h2 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
                Wheel, swipe, or click to change counsel paths.
              </h2>
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
          </section>

          <section
            id="risk-matrix"
            className="atlas-risk-matrix bg-[#0F1118] px-4 py-20 sm:px-6 lg:px-8"
          >
            <div className="mx-auto max-w-7xl">
              <div className="atlas-reveal mb-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_28rem] lg:items-end">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#E7C27D]">
                    Interactive risk matrix
                  </p>
                  <h2 className="mt-2 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl">
                    Counsel can change the matter lens without leaving the page.
                  </h2>
                </div>
                <p className="text-sm leading-7 text-[#AFA795]">
                  GSAP Observer powers wheel and swipe changes while Flip preserves spatial context
                  between the risk tokens and analysis panels.
                </p>
              </div>

              <div className="grid gap-5 lg:grid-cols-[20rem_minmax(0,1fr)]">
                <div className="grid gap-3">
                  {riskMatrix.map((risk, index) => (
                    <button
                      key={risk.id}
                      type="button"
                      aria-pressed={index === 0 ? 'true' : 'false'}
                      className={`atlas-risk-token rounded-[1.25rem] border p-4 text-left transition ${
                        index === 0 ? 'is-active' : ''
                      }`}
                    >
                      <risk.icon className="mb-5 h-6 w-6" />
                      <span className="block text-xl font-black">{risk.label}</span>
                      <span className="mt-2 block text-sm text-[#AFA795]">
                        {risk.level} · score {risk.score}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {riskMatrix.map((risk, index) => (
                    <article
                      key={risk.id}
                      className={`atlas-risk-panel rounded-[1.45rem] border p-5 ${
                        index === 0 ? 'is-active' : ''
                      }`}
                    >
                      <div className="mb-5 flex items-center justify-between gap-4">
                        <div>
                          <div className="text-xs uppercase tracking-[0.2em] text-[#E7C27D]/70">
                            {risk.level}
                          </div>
                          <h3 className="mt-2 text-2xl font-black">{risk.label} review</h3>
                        </div>
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E7C27D] text-[#11151D]">
                          {risk.id === 'governance' ? (
                            <UserCheck className="h-7 w-7" />
                          ) : risk.id === 'evidence' ? (
                            <FileWarning className="h-7 w-7" />
                          ) : (
                            <ShieldAlert className="h-7 w-7" />
                          )}
                        </div>
                      </div>

                      <div className="mb-5 h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="atlas-risk-line h-full rounded-full bg-[#E7C27D]"
                          style={{ width: `${risk.score}%` }}
                        />
                      </div>
                      <p className="text-sm leading-7 text-[#AFA795]">{risk.issue}</p>
                      <div className="atlas-risk-line mt-5 h-px w-full bg-[#E7C27D]/35" />
                      <p className="mt-5 text-sm font-bold leading-7 text-[#F6F0E5]">
                        {risk.action}
                      </p>
                    </article>
                  ))}
                </div>
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
                    Proof moves like an evidence rail, not a stats grid.
                  </h2>
                </div>
                <p className="text-sm leading-7 text-[#5C5143]">
                  Observer and InertiaPlugin give the rail a touch-friendly glide.
                </p>
              </div>

              <div className="atlas-proof-rail overflow-hidden rounded-[1.45rem] border border-[#CDBFAD] bg-white p-4">
                <div className="atlas-proof-track flex w-max gap-4">
                  {proofItems.map(([value, label]) => (
                    <article
                      key={label}
                      className="atlas-proof-card w-72 shrink-0 rounded-[1.15rem] border border-[#E3D8C7] bg-[#F8F5EF] p-5"
                    >
                      <FileText className="mb-5 h-6 w-6 text-[#7A5B16]" />
                      <div className="text-3xl font-black">{value}</div>
                      <p className="mt-2 text-sm font-bold uppercase tracking-[0.16em] text-[#5C5143]">
                        {label}
                      </p>
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
