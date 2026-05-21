import type { MetaFunction } from '@remix-run/node';
import { Link, useParams } from '@remix-run/react';
import { MotionConfig, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Code2, ExternalLink, Rocket, Sparkles } from 'lucide-react';

import {
  demoForgeTemplates,
  simulatorDeployLogLines,
  type DemoForgeTemplate,
} from '~/data/pantheon-static';

const previewSpringTransition = {
  type: 'spring',
  stiffness: 260,
  damping: 30,
  mass: 0.9,
} as const;

const previewEase = [0.16, 1, 0.3, 1] as const;

export const meta: MetaFunction<typeof loader> = ({ params }) => {
  const template = demoForgeTemplates.find(item => item.id === params.id);

  return [
    {
      title: template
        ? `${template.name} Preview | Pantheon Demo`
        : 'Website Preview | Pantheon Demo',
    },
    {
      name: 'description',
      content: template
        ? `Static generated website preview for ${template.name}.`
        : 'Static generated website preview in the Pantheon demo.',
    },
  ];
};

export function loader() {
  return null;
}

const previewStories: Record<
  string,
  {
    audience: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    showcase: string[];
    sections: string[];
    timeline: string[];
  }
> = {
  'angelica-bazar': {
    audience: 'Boutique shoppers and store operators',
    lead: 'Editorial commerce with a polished catalog, calm conversion flow, and a staff-ready admin story.',
    primaryCta: 'Shop collection',
    secondaryCta: 'View lookbook',
    showcase: ['Silk Capsule', 'Ceramic Rituals', 'Evening Edits'],
    sections: ['Animated collection rail', 'Product trust band', 'Admin launch checklist'],
    timeline: ['Brand mood extracted', 'Catalog cards generated', 'Checkout confidence pass'],
  },
  'noir-table': {
    audience: 'Dinner guests, private dining leads, and event planners',
    lead: 'A cinematic restaurant page with reservation intent, menu drama, chef narrative, and location clarity.',
    primaryCta: 'Reserve a table',
    secondaryCta: 'Explore menu',
    showcase: ['Chef Tasting', 'Cellar Pairing', 'Private Room'],
    sections: ['Signature dish reveal', 'Reservation strip', 'Chef and cellar story'],
    timeline: ['Atmosphere direction chosen', 'Menu cards composed', 'Reservation path rehearsed'],
  },
  'pulsefit-studio': {
    audience: 'Fitness members, trial visitors, and studio staff',
    lead: 'A kinetic studio site with schedule discovery, trainer proof, membership paths, and mobile-first booking.',
    primaryCta: 'Book trial class',
    secondaryCta: 'See schedule',
    showcase: ['HIIT Dawn', 'Mobility Lab', 'Strength Circuit'],
    sections: ['Live-feeling class board', 'Trainer spotlight', 'Membership comparison'],
    timeline: ['Class data shaped', 'Trainer modules placed', 'Booking intent optimized'],
  },
  'summit-realty': {
    audience: 'Home buyers, sellers, and neighborhood researchers',
    lead: 'A listing-led real estate experience with rich property cards, neighborhood context, and agent credibility.',
    primaryCta: 'View listings',
    secondaryCta: 'Book consult',
    showcase: ['Hillcrest Loft', 'Garden Row Home', 'Harbor View'],
    sections: ['Featured property rail', 'Neighborhood cards', 'Mortgage consultation CTA'],
    timeline: ['Listings imported', 'Neighborhood copy drafted', 'Lead paths connected'],
  },
  'novadent-clinic': {
    audience: 'Patients comparing care options and appointment availability',
    lead: 'A calm healthcare website that balances trust, service discovery, reviews, and appointment intent.',
    primaryCta: 'Request appointment',
    secondaryCta: 'View services',
    showcase: ['Cosmetic Care', 'Family Dentistry', 'Emergency Visit'],
    sections: ['Service pathway cards', 'Review proof band', 'Insurance and care notes'],
    timeline: ['Trust signals gathered', 'Services grouped', 'Booking path softened'],
  },
  'atlas-legal': {
    audience: 'Professional service buyers making consequential decisions',
    lead: 'A restrained authority site with practice areas, attorney proof, case evidence, and consultation conversion.',
    primaryCta: 'Request consult',
    secondaryCta: 'Practice areas',
    showcase: ['Corporate Counsel', 'Dispute Strategy', 'Estate Planning'],
    sections: ['Practice matrix', 'Case result highlights', 'Attorney authority cards'],
    timeline: ['Proof points organized', 'Practice paths mapped', 'Consult drawer drafted'],
  },
};

type ShowcaseContent = {
  nav: string[];
  heroKicker: string;
  visualTitle: string;
  visualSubtitle: string;
  spotlightTitle: string;
  spotlightMeta: string;
  proofTitle: string;
  proofText: string;
  featureCards: Array<{ title: string; text: string; value: string }>;
  galleryCards: Array<{ title: string; meta: string; value: string }>;
  bottomStrip: string[];
};

const showcaseContent: Record<string, ShowcaseContent> = {
  'angelica-bazar': {
    nav: ['Collections', 'Lookbook', 'Journal', 'Admin'],
    heroKicker: 'Limited editorial drop',
    visualTitle: 'Silk, stone, and statement pieces in one calm storefront.',
    visualSubtitle:
      'Product storytelling, collection rails, trust cues, and staff-ready catalog control.',
    spotlightTitle: 'Evening Edit',
    spotlightMeta: 'Animated product rail',
    proofTitle: 'Launch-ready commerce',
    proofText:
      'The storefront presents a boutique catalog with high-touch product cards, delivery reassurance, and a clean admin story.',
    featureCards: [
      {
        title: 'Editorial catalog',
        text: 'Collection cards reveal copy, material, price, and intent without crowding mobile.',
        value: '128 SKUs',
      },
      {
        title: 'Checkout confidence',
        text: 'Shipping, return, and payment cues sit close to purchase decisions.',
        value: '94 score',
      },
      {
        title: 'Staff workflow',
        text: 'Admin handoff notes show how products, collections, and launches stay organized.',
        value: '9 drops',
      },
    ],
    galleryCards: [
      { title: 'Ceramic Rituals', meta: 'Home capsule', value: '$42' },
      { title: 'Silk Capsule', meta: 'New arrivals', value: '$86' },
      { title: 'Evening Edits', meta: 'Statement set', value: '$128' },
    ],
    bottomStrip: ['Free returns', 'Curated drops', 'Staff-ready admin'],
  },
  'noir-table': {
    nav: ['Menu', 'Cellar', 'Private dining', 'Reserve'],
    heroKicker: 'Dinner after dark',
    visualTitle: 'A reservation-first restaurant site with real atmosphere.',
    visualSubtitle:
      'Menu rhythm, chef narrative, private dining leads, and a booking strip that stays visible.',
    spotlightTitle: 'Chef Tasting',
    spotlightMeta: 'Seven-course menu',
    proofTitle: 'Cinematic hospitality',
    proofText:
      'Guests move from mood to menu to reservation without losing the restaurant premium tone.',
    featureCards: [
      {
        title: 'Signature menu',
        text: 'Dish cards reveal courses with restrained motion and strong visual hierarchy.',
        value: '6 menus',
      },
      {
        title: 'Reservation path',
        text: 'Date, party size, and private dining intent are staged as a focused conversion flow.',
        value: '+38%',
      },
      {
        title: 'Chef story',
        text: 'Editorial sections make the restaurant feel specific rather than generic.',
        value: '14 cues',
      },
    ],
    galleryCards: [
      { title: 'Truffle Ribeye', meta: 'Chef tasting', value: '02' },
      { title: 'Cellar Pairing', meta: 'Sommelier pick', value: '11' },
      { title: 'Private Room', meta: 'Events', value: '24' },
    ],
    bottomStrip: ['Open tonight', 'Chef tasting', 'Private dining'],
  },
  'pulsefit-studio': {
    nav: ['Classes', 'Trainers', 'Plans', 'Book'],
    heroKicker: 'Train with momentum',
    visualTitle: 'A high-energy studio site that feels fast on mobile.',
    visualSubtitle:
      'Class discovery, trial booking, trainer proof, and membership comparison in one flow.',
    spotlightTitle: 'HIIT Dawn',
    spotlightMeta: '6:30 AM - 8 spots',
    proofTitle: 'Booking without friction',
    proofText:
      'The preview makes classes scannable, trainers credible, and trial booking obvious for first-time visitors.',
    featureCards: [
      {
        title: 'Class board',
        text: 'Schedules are organized by intensity and availability for quick mobile scanning.',
        value: '32 classes',
      },
      {
        title: 'Trainer trust',
        text: 'Coach cards combine specialty, proof, and personality.',
        value: '8 trainers',
      },
      {
        title: 'Trial path',
        text: 'The CTA reduces the first visit to a focused two-step action.',
        value: '2 steps',
      },
    ],
    galleryCards: [
      { title: 'Mobility Lab', meta: 'Recovery', value: '42m' },
      { title: 'Strength Circuit', meta: 'Intermediate', value: '55m' },
      { title: 'Pulse Ride', meta: 'Cardio', value: '38m' },
    ],
    bottomStrip: ['Trial class', 'Live schedule', 'Mobile booking'],
  },
  'summit-realty': {
    nav: ['Listings', 'Neighborhoods', 'Agents', 'Valuation'],
    heroKicker: 'Find the next address',
    visualTitle: 'A property experience with polished listing discovery.',
    visualSubtitle:
      'Featured homes, neighborhood proof, consultation CTAs, and buyer/seller paths.',
    spotlightTitle: 'Hillcrest Loft',
    spotlightMeta: '3 bed - skyline view',
    proofTitle: 'Listing-led conversion',
    proofText:
      'Searchers get rich property context first, then clear paths to tours, mortgage help, or seller valuation.',
    featureCards: [
      {
        title: 'Property rail',
        text: 'Premium cards show price, highlights, and location at a glance.',
        value: '24 homes',
      },
      {
        title: 'Neighborhoods',
        text: 'Area cards give buyers confidence before booking a tour.',
        value: '7 areas',
      },
      {
        title: 'Lead paths',
        text: 'Buyer, seller, and consult CTAs are separated so intent stays clean.',
        value: '5 paths',
      },
    ],
    galleryCards: [
      { title: 'Harbor View', meta: '4 bed - water', value: '$1.4M' },
      { title: 'Garden Row', meta: 'Townhome', value: '$820K' },
      { title: 'Cedar House', meta: 'Family lot', value: '$960K' },
    ],
    bottomStrip: ['Book a tour', 'Mortgage consult', 'Seller valuation'],
  },
  'novadent-clinic': {
    nav: ['Services', 'Reviews', 'Insurance', 'Appointments'],
    heroKicker: 'Care that feels calm',
    visualTitle: 'A clinic site built around trust, clarity, and access.',
    visualSubtitle:
      'Services, patient proof, appointment intent, insurance cues, and accessible motion.',
    spotlightTitle: 'Smile Design',
    spotlightMeta: 'Consultation pathway',
    proofTitle: 'Trust-first healthcare',
    proofText:
      'The preview softens appointment friction while keeping service discovery and credibility visible.',
    featureCards: [
      {
        title: 'Service paths',
        text: 'Care options are grouped by patient need, not internal clinic structure.',
        value: '12 services',
      },
      {
        title: 'Review proof',
        text: 'Ratings and patient comfort notes sit near decision points.',
        value: '4.9 rating',
      },
      {
        title: 'Appointment CTA',
        text: 'The booking flow feels simple without pretending to schedule real care.',
        value: '1 min',
      },
    ],
    galleryCards: [
      { title: 'Family Care', meta: 'Preventive', value: 'Today' },
      { title: 'Cosmetic Care', meta: 'Smile design', value: 'New' },
      { title: 'Emergency Visit', meta: 'Priority', value: '24h' },
    ],
    bottomStrip: ['Insurance friendly', 'Patient reviews', 'Fast appointment intent'],
  },
  'atlas-legal': {
    nav: ['Practice', 'Attorneys', 'Results', 'Consult'],
    heroKicker: 'Counsel with evidence',
    visualTitle: 'A professional services site that earns trust quickly.',
    visualSubtitle:
      'Practice areas, attorney authority, proof points, and a restrained consultation path.',
    spotlightTitle: 'Corporate Counsel',
    spotlightMeta: 'Strategy brief',
    proofTitle: 'Authority without noise',
    proofText:
      'The page keeps legal proof structured: clear practice paths, case evidence, and attorney credibility.',
    featureCards: [
      {
        title: 'Practice matrix',
        text: 'Complex services are divided into readable paths for high-intent visitors.',
        value: '8 areas',
      },
      {
        title: 'Case evidence',
        text: 'Result cards support credibility without overloading the hero.',
        value: '42 wins',
      },
      {
        title: 'Consult flow',
        text: 'The CTA stays serious, direct, and appropriate for consequential decisions.',
        value: '3 CTAs',
      },
    ],
    galleryCards: [
      { title: 'Dispute Strategy', meta: 'Commercial', value: 'Brief' },
      { title: 'Estate Planning', meta: 'Private client', value: 'Guide' },
      { title: 'M&A Counsel', meta: 'Corporate', value: 'Deal' },
    ],
    bottomStrip: ['Confidential consult', 'Evidence-led', 'Senior attorneys'],
  },
};

function getPreviewStory(template: DemoForgeTemplate) {
  return (
    previewStories[template.id] || {
      audience: template.niche,
      lead: template.description,
      primaryCta: 'Start preview',
      secondaryCta: 'View details',
      showcase: template.features,
      sections: template.features,
      timeline: ['Prompt parsed', 'Layout generated', 'Preview deployed'],
    }
  );
}

function getShowcaseContent(
  template: DemoForgeTemplate,
  story: ReturnType<typeof getPreviewStory>
): ShowcaseContent {
  return (
    showcaseContent[template.id] || {
      nav: ['Overview', 'Services', 'Proof', 'Contact'],
      heroKicker: template.niche,
      visualTitle: template.heroTitle,
      visualSubtitle: template.heroSubtitle,
      spotlightTitle: story.showcase[0] || template.name,
      spotlightMeta: template.description,
      proofTitle: 'Generated preview',
      proofText: story.lead,
      featureCards: template.features.map((feature, index) => ({
        title: feature,
        text: 'Generated section with responsive layout, clear copy hierarchy, and static-safe interactions.',
        value: template.metrics[index]?.value || `${index + 1}`,
      })),
      galleryCards: story.showcase.map((item, index) => ({
        title: item,
        meta: story.sections[index] || template.niche,
        value: template.metrics[index]?.value || `${index + 1}`,
      })),
      bottomStrip: template.features,
    }
  );
}

function getImplementationProof(template: DemoForgeTemplate) {
  if (template.id === 'pulsefit-studio') {
    return {
      stack: 'Motion + Motion MCP CSS spring',
      route: 'app/routes/pulsefit-studio.tsx',
      code: `<MotionConfig reducedMotion="user" transition={springTransition}>
  <motion.article layout whileHover={{ y: -6 }}>
    Class booking card
  </motion.article>
</MotionConfig>`,
    };
  }

  if (template.id === 'noir-table') {
    return {
      stack: 'GSAP + useGSAP + ScrollTrigger',
      route: 'app/routes/noir-table.tsx',
      code: `useGSAP(() => {
  const intro = gsap.timeline({ defaults: { ease: "power3.out" } })
  intro.from(".noir-title-line", { autoAlpha: 0, y: 44, stagger: 0.08 })
  ScrollTrigger.batch(".noir-reveal", { start: "top 82%", once: true })
}, { scope: containerRef })`,
    };
  }

  return null;
}

function GeneratedWebsiteShowcase({
  template,
  story,
}: {
  template: DemoForgeTemplate;
  story: ReturnType<typeof getPreviewStory>;
}) {
  const showcase = getShowcaseContent(template, story);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.42, ease: previewEase }}
      className="overflow-hidden rounded-2xl border border-white/10 bg-[#080B12] shadow-[0_30px_90px_rgba(0,0,0,0.45)]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/[0.04] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-amber-300" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
        </div>
        <div className="min-w-0 truncate rounded-full border border-white/10 bg-black/30 px-3 py-1 text-center font-mono text-[10px] text-[#AFA795]">
          {template.previewUrl.replace('https://', '')}
        </div>
        <span className="hidden text-[10px] uppercase tracking-[0.22em] text-[#8B7355] sm:inline">
          Generated site
        </span>
      </div>

      <div
        className="relative overflow-hidden p-4 sm:p-6"
        style={{
          background: `linear-gradient(135deg, ${template.accent}26 0%, rgba(8,11,18,0.98) 34%, ${template.secondaryAccent}1f 100%)`,
        }}
      >
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[rgba(4,6,12,0.58)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1"
            style={{
              background: `linear-gradient(90deg, ${template.accent}, ${template.secondaryAccent})`,
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.08),transparent_34%,rgba(255,255,255,0.04)_74%,transparent)]" />

          <div className="relative p-5 sm:p-7">
            <nav className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 text-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                  style={{ backgroundColor: `${template.accent}24` }}
                >
                  {template.icon}
                </span>
                <div>
                  <div className="text-base font-bold text-white">{template.name}</div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-white/45">
                    {template.niche}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.16em] text-white/60">
                {showcase.nav.map(item => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 transition hover:border-white/20 hover:bg-white/[0.08]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </nav>

            <section className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_24rem] xl:items-center">
              <div>
                <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-white/45">
                  {showcase.heroKicker}
                </p>
                <h2 className="font-cinzel max-w-3xl text-4xl font-black leading-tight text-white sm:text-6xl">
                  {template.heroTitle}
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70">
                  {showcase.visualSubtitle}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <span
                    className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-[#090B11] shadow-[0_18px_42px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-0.5 hover:brightness-110 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                    style={{ backgroundColor: template.accent }}
                  >
                    {story.primaryCta}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-5 py-3 text-sm text-white transition hover:-translate-y-0.5 hover:bg-white/[0.09] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                    {story.secondaryCta}
                  </span>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {template.metrics.map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ ...previewSpringTransition, delay: index * 0.06 }}
                      className="pantheon-premium-transition rounded-2xl border border-white/10 bg-black/25 p-4"
                    >
                      <div className="text-2xl font-bold text-white">{metric.value}</div>
                      <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/45">
                        {metric.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease: previewEase }}
                className="relative min-h-[25rem] overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/30 p-4 shadow-[0_28px_70px_rgba(0,0,0,0.35)]"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-24"
                  style={{
                    background: `linear-gradient(180deg, ${template.accent}24, transparent)`,
                  }}
                />
                <div className="relative grid h-full gap-4">
                  <div
                    className="rounded-2xl border border-white/10 p-5"
                    style={{
                      background: `linear-gradient(145deg, ${template.accent}22, rgba(255,255,255,0.045))`,
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">
                          {showcase.spotlightMeta}
                        </p>
                        <h3 className="font-cinzel mt-2 text-2xl font-bold text-white">
                          {showcase.spotlightTitle}
                        </h3>
                      </div>
                      <span
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl"
                        style={{ backgroundColor: `${template.secondaryAccent}30` }}
                      >
                        {template.icon}
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-white/65">{showcase.visualTitle}</p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {showcase.galleryCards.map((card, index) => (
                      <motion.article
                        key={card.title}
                        whileHover={{ y: -5 }}
                        transition={previewSpringTransition}
                        className="pantheon-premium-transition group min-h-[8rem] rounded-2xl border border-white/10 bg-white/[0.055] p-3 hover:bg-white/[0.08] motion-reduce:hover:translate-y-0"
                      >
                        <div
                          className="mb-4 h-16 rounded-xl border border-white/10"
                          style={{
                            background: `linear-gradient(${130 + index * 18}deg, ${template.accent}55, ${template.secondaryAccent}28 52%, rgba(255,255,255,0.08))`,
                          }}
                        />
                        <p className="text-sm font-semibold text-white">{card.title}</p>
                        <div className="mt-2 flex items-center justify-between gap-2 text-[10px] uppercase tracking-[0.14em] text-white/45">
                          <span>{card.meta}</span>
                          <span
                            style={{
                              color: index % 2 ? template.secondaryAccent : template.accent,
                            }}
                          >
                            {card.value}
                          </span>
                        </div>
                      </motion.article>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">
                          {showcase.proofTitle}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-white/70">{showcase.proofText}</p>
                      </div>
                      <div
                        className="hidden h-16 w-16 shrink-0 rounded-2xl border border-white/10 sm:block"
                        style={{ backgroundColor: `${template.accent}20` }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            <section className="mt-8 grid gap-4 md:grid-cols-3">
              {showcase.featureCards.map((card, index) => (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  viewport={{ once: true }}
                  transition={{ ...previewSpringTransition, delay: index * 0.08 }}
                  className="pantheon-premium-transition group rounded-2xl border border-white/10 bg-black/[0.28] p-5 hover:border-white/20 motion-reduce:hover:translate-y-0"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <Sparkles className="h-4 w-4" style={{ color: template.accent }} />
                    <span
                      className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em]"
                      style={{ color: index % 2 ? template.secondaryAccent : template.accent }}
                    >
                      {card.value}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-white">{card.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-white/50">{card.text}</p>
                </motion.article>
              ))}
            </section>

            <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5">
              {showcase.bottomStrip.map(item => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-white/55"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function PantheonSitePreviewRoute() {
  const params = useParams();
  const template = demoForgeTemplates.find(item => item.id === params.id);

  if (!template) {
    return (
      <main className="min-h-screen bg-[#090B11] px-6 py-10 text-[#F8F2DF]">
        <div className="mx-auto max-w-3xl rounded-2xl border border-[#D4AF37]/20 bg-black/30 p-8">
          <Link
            to="/pantheon-demo"
            className="inline-flex items-center gap-2 text-sm text-[#D4AF37]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Pantheon
          </Link>
          <h1 className="font-cinzel mt-8 text-3xl font-bold">Preview not found</h1>
        </div>
      </main>
    );
  }

  const currentIndex = demoForgeTemplates.findIndex(item => item.id === template.id);
  const prevTemplate =
    currentIndex > 0
      ? demoForgeTemplates[currentIndex - 1]
      : demoForgeTemplates[demoForgeTemplates.length - 1];
  const nextTemplate =
    currentIndex >= 0 && currentIndex < demoForgeTemplates.length - 1
      ? demoForgeTemplates[currentIndex + 1]
      : demoForgeTemplates[0];
  const relatedTemplates = demoForgeTemplates.filter(item => item.id !== template.id).slice(0, 3);
  const story = getPreviewStory(template);
  const implementationProof = getImplementationProof(template);
  const previewHref = template.previewUrl;

  return (
    <MotionConfig reducedMotion="user" transition={previewSpringTransition}>
      <main className="marble-dark min-h-screen bg-[#090B11] text-[#F8F2DF]">
        <div className="sticky top-0 z-20 border-b border-[#D4AF37]/15 bg-[#090B11]/95 px-4 py-3 backdrop-blur-xl sm:px-6">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <Link
              to="/pantheon-demo"
              className="inline-flex w-fit items-center gap-3 rounded-full pr-2 text-left transition hover:text-[#D4AF37]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-yellow-300/15 bg-white/[0.03]">
                <ArrowLeft className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-[10px] uppercase tracking-[0.28em] text-[#D4AF37]/60">
                  Hephaestus Forge
                </span>
                <span className="text-sm text-gray-200">Back to demo</span>
              </span>
            </Link>

            <div className="border-yellow-300/12 flex items-center justify-between gap-2 rounded-full border bg-black/25 p-1.5">
              <Link
                to={`/pantheon-demo/dashboard/factory/${prevTemplate.id}`}
                className="inline-flex h-10 items-center gap-2 rounded-full px-3 text-gray-300 transition hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
                aria-label={`Previous preview: ${prevTemplate.name}`}
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden max-w-[8rem] truncate text-sm sm:inline">
                  {prevTemplate.name}
                </span>
              </Link>
              <Link
                to={`/pantheon-demo/dashboard/factory/${nextTemplate.id}`}
                className="inline-flex h-10 items-center gap-2 rounded-full px-3 text-gray-300 transition hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
                aria-label={`Next preview: ${nextTemplate.name}`}
              >
                <span className="hidden max-w-[8rem] truncate text-sm sm:inline">
                  {nextTemplate.name}
                </span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36, ease: previewEase }}
            className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]"
          >
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 text-3xl"
                  style={{ backgroundColor: `${template.accent}24` }}
                >
                  {template.icon}
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37]/70">
                    Static Vercel Preview
                  </p>
                  <h1 className="font-cinzel text-gold-gradient text-4xl font-black sm:text-5xl">
                    {template.name}
                  </h1>
                </div>
              </div>
              <p className="max-w-3xl text-sm leading-7 text-gray-300">{story.lead}</p>
            </div>

            <motion.aside
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: previewEase, delay: 0.08 }}
              className="rounded-2xl border border-[#D4AF37]/15 bg-black/30 p-5"
            >
              <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#D4AF37]">
                <Rocket className="h-4 w-4" />
                Simulated deploy
              </div>
              <div className="rounded-xl border border-white/10 bg-black/35 px-3 py-2 font-mono text-xs text-[#F4D57A]">
                {template.previewUrl}
              </div>
              <p className="mt-3 text-xs leading-5 text-gray-500">
                This showcase route mirrors the Forge detail page without calling a backend or
                running agents. Open the live route to inspect the generated site.
              </p>
              <a
                href={previewHref}
                target="_blank"
                rel="noreferrer"
                className="pantheon-premium-transition mt-4 inline-flex items-center gap-2 rounded-lg border border-emerald-300/25 bg-emerald-300/[0.10] px-3 py-2 text-xs font-semibold text-emerald-100 hover:-translate-y-0.5 hover:border-emerald-300/45 hover:bg-emerald-300/[0.16] motion-reduce:hover:translate-y-0"
              >
                <ExternalLink className="h-4 w-4" />
                Open live preview
              </a>
            </motion.aside>
          </motion.section>

          <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
            <GeneratedWebsiteShowcase template={template} story={story} />

            <aside className="space-y-5">
              {implementationProof ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.34, ease: previewEase }}
                  className="rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.045] p-5"
                >
                  <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-cyan-100">
                    <Code2 className="h-4 w-4" />
                    Real source route
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-cyan-100">
                    {implementationProof.route}
                  </div>
                  <p className="mt-3 text-sm text-[#D7CFC0]">{implementationProof.stack}</p>
                  <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-[#05070B] p-4 text-[11px] leading-5 text-[#D9F8FF]">
                    <code>{implementationProof.code}</code>
                  </pre>
                </motion.div>
              ) : null}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.34, ease: previewEase }}
                className="rounded-2xl border border-white/10 bg-black/[0.28] p-5"
              >
                <h2 className="font-cinzel text-xl font-bold text-[#F8F2DF]">Forge Prompt</h2>
                <p className="mt-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-gray-300">
                  {template.prompt}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {template.agents.map(agent => (
                    <span
                      key={agent}
                      className="rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-3 py-1 text-xs text-[#F4D57A]"
                    >
                      {agent}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.34, ease: previewEase, delay: 0.06 }}
                className="rounded-2xl border border-[#D4AF37]/15 bg-[#D4AF37]/[0.045] p-5"
              >
                <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#F4D57A]">
                  <Sparkles className="h-4 w-4" />
                  Motion recipe
                </div>
                <div className="space-y-2">
                  {template.motion.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ ...previewSpringTransition, delay: index * 0.05 }}
                      className="pantheon-premium-transition rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm text-[#F8F2DF] hover:border-[#D4AF37]/30"
                    >
                      <span
                        className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-[#090B11]"
                        style={{
                          backgroundColor: index % 2 ? template.secondaryAccent : template.accent,
                        }}
                      >
                        {index + 1}
                      </span>
                      {item}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.34, ease: previewEase, delay: 0.12 }}
                className="rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.04] p-5"
              >
                <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-emerald-200">
                  <ExternalLink className="h-4 w-4" />
                  Vercel log simulation
                </div>
                <div className="space-y-2 font-mono text-xs text-emerald-100">
                  {simulatorDeployLogLines.map((line, index) => (
                    <div
                      key={line}
                      className="rounded-lg border border-emerald-300/10 bg-black/25 px-3 py-2"
                    >
                      <span className="text-emerald-300/45">
                        {String(index + 1).padStart(2, '0')}
                      </span>{' '}
                      {line}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.34, ease: previewEase, delay: 0.18 }}
                className="rounded-2xl border border-white/10 bg-black/[0.28] p-5"
              >
                <h2 className="font-cinzel text-xl font-bold text-[#F8F2DF]">Workflow Story</h2>
                <div className="mt-4 space-y-3">
                  {story.timeline.map((item, index) => (
                    <div
                      key={item}
                      className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-3"
                    >
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-[#090B11]"
                        style={{
                          backgroundColor: index % 2 ? template.secondaryAccent : template.accent,
                        }}
                      >
                        {index + 1}
                      </span>
                      <span className="text-sm leading-6 text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </aside>
          </section>

          <section className="mt-8">
            <h2 className="font-cinzel mb-4 text-xl font-bold text-[#F4D57A]">
              More Generated Niches
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {relatedTemplates.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                  viewport={{ once: true }}
                  transition={{ ...previewSpringTransition, delay: index * 0.06 }}
                >
                  <Link
                    to={`/pantheon-demo/dashboard/factory/${item.id}`}
                    className="pantheon-premium-transition block rounded-2xl border border-yellow-400/10 bg-[linear-gradient(160deg,rgba(10,10,18,0.92),rgba(20,22,34,0.88))] p-4 hover:border-[#D4AF37]/40"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 text-2xl"
                        style={{ backgroundColor: `${item.accent}24` }}
                      >
                        {item.icon}
                      </span>
                      <div>
                        <h3 className="font-cinzel font-bold text-white">{item.name}</h3>
                        <p className="text-xs text-[#AFA795]">{item.niche}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </MotionConfig>
  );
}
