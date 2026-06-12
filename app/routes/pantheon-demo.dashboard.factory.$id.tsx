import type { MetaFunction } from '@remix-run/node';
import { Link, useParams } from '@remix-run/react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Code2, ExternalLink, Rocket, Sparkles } from 'lucide-react';
import { useState } from 'react';

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
    lead: 'A cinematic restaurant website with reservation intent, menu categories, gallery moments, private dining, opening hours, and location clarity.',
    primaryCta: 'Reserve a table',
    secondaryCta: 'Explore menu',
    showcase: ['Chef Tasting', 'Cellar Pairing', 'Private Room'],
    sections: [
      'Menu categories with prices',
      'Reservation simulator',
      'Gallery, hours, and private dining',
    ],
    timeline: [
      'Atmosphere direction chosen',
      'Menu architecture composed',
      'Reservation path rehearsed',
    ],
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
    lead: 'A calm healthcare website that balances service pathways, doctors, insurance trust, emergency guidance, FAQs, reviews, and appointment intent.',
    primaryCta: 'Request appointment',
    secondaryCta: 'View services',
    showcase: ['Cosmetic Care', 'Family Dentistry', 'Emergency Visit'],
    sections: ['Service pathway cards', 'Doctors and insurance trust', 'Emergency and FAQ notes'],
    timeline: ['Trust signals gathered', 'Services grouped', 'Patient pathways softened'],
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
  'ionut-love-motorcycle': {
    audience: 'Visitors following a personal story, event details, and photo-led moments',
    lead: 'A live motorcycle story website with emotional pacing, road-trip sections, gallery moments, and event-ready information.',
    primaryCta: 'Open live story',
    secondaryCta: 'View timeline',
    showcase: ['Open Road', 'Photo Moments', 'Event Details'],
    sections: ['Story timeline', 'Gallery route', 'Contact and event notes'],
    timeline: ['Live site linked', 'Story beats mapped', 'External deploy added to Pantheon'],
  },
  'orbitflow-os': {
    audience: 'SaaS buyers, operators, product teams, and founders comparing workflow tools',
    lead: 'A Motion-rich SaaS site with product modules, use cases, pricing, integrations, docs, support, and signup intent.',
    primaryCta: 'Start trial',
    secondaryCta: 'Read docs',
    showcase: ['App Folder', 'Scroll Lines', 'Pricing'],
    sections: ['Product modules', 'Use-case pages', 'Integrations, pricing, docs, and support'],
    timeline: ['Motion examples researched', 'SaaS architecture expanded', 'Preview route added to Forge'],
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
  'ionut-love-motorcycle': {
    nav: ['Story', 'Gallery', 'Timeline', 'Event'],
    heroKicker: 'Live external showcase',
    visualTitle: 'A personal story site with road-trip emotion and event clarity.',
    visualSubtitle:
      'The deployed preview carries a cinematic motorcycle theme with photo-led pacing and useful event information.',
    spotlightTitle: 'Open Road',
    spotlightMeta: 'Live Vercel preview',
    proofTitle: 'External deploy connected',
    proofText:
      'Pantheon can showcase live generated work even when the project lives outside this repository.',
    featureCards: [
      {
        title: 'Story timeline',
        text: 'Narrative beats organize the page so visitors understand the relationship and event context.',
        value: '8 beats',
      },
      {
        title: 'Photo moments',
        text: 'Gallery sections carry the atmosphere instead of relying on generic copy blocks.',
        value: '18 shots',
      },
      {
        title: 'Event-ready details',
        text: 'The site keeps location, timing, and contact intent easy to find.',
        value: 'Live',
      },
    ],
    galleryCards: [
      { title: 'First Ride', meta: 'Story beat', value: '01' },
      { title: 'Golden Hour', meta: 'Gallery', value: '18' },
      { title: 'Event Note', meta: 'Details', value: 'Live' },
    ],
    bottomStrip: ['Live Vercel site', 'Motorcycle story', 'Photo-led sections'],
  },
  'orbitflow-os': {
    nav: ['Features', 'Use cases', 'Pricing', 'Docs'],
    heroKicker: 'Motion SaaS system',
    visualTitle: 'A product website with actual SaaS buying paths.',
    visualSubtitle:
      'Feature modules, workflow use cases, connector directory, pricing, docs, support, and signup intent are all represented.',
    spotlightTitle: 'Command Apps',
    spotlightMeta: 'iOS folder transition',
    proofTitle: 'Motion Plus-informed build',
    proofText:
      'The route adapts Scroll Text Lines and iOS App Folder example patterns with repo-safe Motion code.',
    featureCards: [
      {
        title: 'Product modules',
        text: 'Workflow builder, integration mesh, and command center cards explain the SaaS surface clearly.',
        value: '3 modules',
      },
      {
        title: 'Conversion paths',
        text: 'Trial, demo, docs, support, pricing, and signup intent are visible instead of implied.',
        value: '6 paths',
      },
      {
        title: 'Motion examples',
        text: 'Scroll-linked text lines and layoutId folder transitions make the template visually distinct.',
        value: '2 advanced',
      },
    ],
    galleryCards: [
      { title: 'Automate', meta: 'Folder app', value: 'W' },
      { title: 'Insights', meta: 'Dashboard', value: '94' },
      { title: 'Scale plan', meta: 'Pricing', value: '$89' },
    ],
    bottomStrip: ['Feature pages', 'Docs/support', 'Motion layout'],
  },
};

const siteArchitecture: Record<
  string,
  {
    pages: string[];
    conversion: string[];
    ownerTools: string[];
  }
> = {
  'angelica-bazar': {
    pages: ['Home', 'Collections', 'Product detail', 'Lookbook', 'Cart', 'Admin'],
    conversion: ['Browse collection', 'Inspect product trust', 'Add to cart', 'Checkout intent'],
    ownerTools: ['Catalog status', 'Launch checklist', 'Delivery/returns bands'],
  },
  'noir-table': {
    pages: ['Home', 'Menu', 'Reservations', 'Gallery', 'Private dining', 'Contact'],
    conversion: ['Choose date', 'Pick party size', 'Confirm dining intent', 'Request table'],
    ownerTools: ['Opening hours', 'Dish prices/tags', 'Private event inquiry'],
  },
  'pulsefit-studio': {
    pages: ['Home', 'Classes', 'Trainers', 'Memberships', 'Book trial', 'Studio details'],
    conversion: ['Find class', 'Check coach fit', 'Compare plan', 'Book trial'],
    ownerTools: ['Schedule board', 'Capacity status', 'Membership tiers'],
  },
  'summit-realty': {
    pages: ['Home', 'Listings', 'Neighborhoods', 'Tours', 'Seller valuation', 'Agents'],
    conversion: ['Filter homes', 'Save listing', 'Plan tour route', 'Request consult'],
    ownerTools: ['Listing inventory', 'Buyer priorities', 'Valuation and tour CTAs'],
  },
  'novadent-clinic': {
    pages: ['Home', 'Services', 'Doctors', 'Appointments', 'Insurance', 'Emergency', 'FAQ'],
    conversion: ['Choose concern', 'Review pathway', 'Check trust cues', 'Request visit'],
    ownerTools: ['Doctor cards', 'Insurance notes', 'Emergency triage'],
  },
  'atlas-legal': {
    pages: ['Home', 'Practice areas', 'Attorneys', 'Results', 'Resources', 'Consult'],
    conversion: ['Select practice', 'Review evidence', 'Prepare intake', 'Request consult'],
    ownerTools: ['Practice matrix', 'Case proof', 'Confidential intake checklist'],
  },
  'ionut-love-motorcycle': {
    pages: ['Home', 'Story', 'Gallery', 'Timeline', 'Event details', 'Contact'],
    conversion: ['Enter story', 'Explore moments', 'Find event info', 'Open live site'],
    ownerTools: ['Photo moments', 'Story beats', 'External deploy link'],
  },
  'orbitflow-os': {
    pages: ['Home', 'Features', 'Use cases', 'Pricing', 'Integrations', 'Docs', 'Support', 'Signup'],
    conversion: ['Explore modules', 'Compare plans', 'Check docs/support', 'Start trial'],
    ownerTools: ['Workflow modules', 'Connector directory', 'Pricing tiers and support paths'],
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

function getSiteArchitecture(template: DemoForgeTemplate) {
  return (
    siteArchitecture[template.id] || {
      pages: ['Home', 'Services', 'Proof', 'Contact'],
      conversion: ['Land on offer', 'Review proof', 'Choose CTA', 'Contact owner'],
      ownerTools: ['Content sections', 'Lead capture', 'Preview deployment'],
    }
  );
}

function getImplementationProof(template: DemoForgeTemplate) {
  if (template.id === 'pulsefit-studio') {
    return {
      stack: 'Motion + Motion MCP CSS spring',
      route: 'app/routes/pulsefit-studio.tsx',
      code: `const pageProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
const spotlight = useMotionTemplate\`radial-gradient(520px circle at \${x}px \${y}px, ...)\`
<MotionConfig reducedMotion="user" transition={springTransition}>
  <motion.button layout whileTap={{ scale: 0.98 }} onClick={advanceBookingStep}>
    Class booking state + membership selector
  </motion.button>
</MotionConfig>`,
    };
  }

  if (template.id === 'noir-table') {
    return {
      stack: 'GSAP + React effect + gsap.context + ScrollTrigger',
      route: 'app/routes/noir-table.tsx',
      code: `useEffect(() => {
  const intro = gsap.timeline({ defaults: { ease: "power3.out" } })
  intro.from(".noir-title-line", { autoAlpha: 0, y: 44, stagger: 0.08 })
  ScrollTrigger.batch(".noir-reveal", { start: "top 82%", once: true })
  gsap.matchMedia().add("(min-width: 900px)", () => {
    gsap.timeline({ scrollTrigger: { trigger: ".noir-private-pin", start: "top 76%" } })
  })
}, [])`,
    };
  }

  if (template.id === 'summit-realty') {
    return {
      stack: 'Motion + useVelocity 3D planes + Reorder + useAnimate + useMotionTemplate',
      route: 'app/routes/summit-realty.tsx',
      code: `const scrollVelocity = useVelocity(scrollX)
const transform = useTransform(() => {
  const centered = wrap(-totalWidth / 2, totalWidth / 2, startPosition + scrollX.get())
  return \`translate3d(\${centered}px, \${centered * -0.24}px, \${centered * -0.88}px) rotateY(-44deg)\`
})

const spotlight = useMotionTemplate\`radial-gradient(680px circle at \${x}px \${y}px, ...)\`
const [mapScope, animate] = useAnimate()

<Reorder.Group values={priorities} onReorder={setPriorities}>
  <PriorityItem />
</Reorder.Group>

<motion.article layoutId={\`summit-image-\${selectedListing.id}\`} />`,
    };
  }

  if (template.id === 'novadent-clinic') {
    return {
      stack: 'GSAP + scroll-linked ScrollTrigger + SplitText + Flip + Observer + Draggable/Inertia',
      route: 'app/routes/novadent-clinic.tsx',
      code: `const journey = gsap.timeline({
  scrollTrigger: { trigger: ".nova-journey-pin", scrub: 0.8 }
})

Observer.create({ target: ".nova-service-orbit", onLeft: next, onRight: prev })
Draggable.create(".nova-comfort-knob", { type: "x", bounds: ".nova-comfort-track", inertia: true })
ScrollTrigger.batch(".nova-clinician-card, .nova-faq-card", { start: "top 84%", once: true })`,
    };
  }

  if (template.id === 'atlas-legal') {
    return {
      stack: 'GSAP + ScrollTrigger + ScrambleText + DrawSVG + Observer + Inertia + Physics2D',
      route: 'app/routes/atlas-legal.tsx',
      code: `gsap.timeline({ scrollTrigger: { trigger: ".atlas-dossier-pin", scrub: 0.8 } })
gsap.to(".atlas-classified", { scrambleText: { text: "CONFIDENTIAL MATTER" } })
gsap.from(".atlas-brief-line", { drawSVG: "0% 0%" })
InertiaPlugin.track(proofTrack, "x")
gsap.to(".atlas-particle", { physics2D: { velocity: 42, angle: -60 } })`,
    };
  }

  if (template.id === 'orbitflow-os') {
    return {
      stack: 'Motion + Scroll Text Lines + AnimatePresence + layoutId app folder',
      route: 'app/routes/orbitflow-os.tsx',
      code: `const { scrollY } = useScroll()
const lineOffset = useTransform(scrollY, [0, 1400], ["0%", "-22%"])

<AnimatePresence mode="popLayout" initial={false}>
  <motion.div layoutId="orbit-app-1" />
  <motion.div style={{ x: lineOffset }} />
</AnimatePresence>`,
    };
  }

  return null;
}

function TemplateMotionScene({
  template,
  showcase,
}: {
  template: DemoForgeTemplate;
  showcase: ShowcaseContent;
}) {
  const surfaceStyle = {
    background: `linear-gradient(145deg, ${template.accent}24, rgba(255,255,255,0.045))`,
  };

  if (template.id === 'summit-realty') {
    return (
      <div className="relative h-56 overflow-hidden rounded-2xl border border-white/10 bg-[#07110F]">
        <div className="absolute left-4 top-4 z-10 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-sky-100">
          velocity planes
        </div>
        <div className="absolute inset-0 flex items-center justify-center [perspective:900px]">
          {showcase.galleryCards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={false}
              animate={{
                x: (index - 1) * 92,
                y: index === 1 ? -12 : 18,
                rotateY: -34,
                rotateZ: index === 1 ? 0 : index ? 4 : -4,
                z: index === 1 ? 80 : -40,
              }}
              whileHover={{ y: -24, z: 120 }}
              transition={previewSpringTransition}
              className="absolute h-40 w-36 rounded-[1.1rem] border border-white/10 bg-white p-3 text-[#13221F] shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                className="mb-3 h-16 rounded-xl"
                style={{
                  background: `linear-gradient(135deg, ${template.accent}, ${template.secondaryAccent})`,
                }}
              />
              <h3 className="text-sm font-black">{card.title}</h3>
              <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[#5F6B66]">
                {card.value}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    );
  }

  if (template.id === 'pulsefit-studio') {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.08] p-5">
        <div className="absolute right-4 top-4 h-24 w-24 rounded-full border border-emerald-300/20" />
        <div className="absolute right-8 top-8 h-16 w-16 rounded-full border border-cyan-300/20" />
        <p className="text-[10px] uppercase tracking-[0.22em] text-emerald-100/70">
          class pulse console
        </p>
        <div className="mt-5 grid gap-3">
          {showcase.galleryCards.map((card, index) => (
            <motion.div
              key={card.title}
              animate={{ scaleX: [0.68, 1, 0.82] }}
              transition={{
                duration: 2.2 + index * 0.3,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
              }}
              className="origin-left rounded-2xl border border-white/10 bg-black/25 p-3"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-black text-white">{card.title}</span>
                <span className="text-xs text-emerald-200">{card.value}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (template.id === 'noir-table') {
    return (
      <div className="rounded-2xl border border-[#E7C27D]/20 bg-[#120B09] p-5">
        <p className="text-[10px] uppercase tracking-[0.22em] text-[#E7C27D]/70">
          reservation theater
        </p>
        <div className="mt-5 grid gap-3">
          {['20:30 table', 'Cellar pairing', 'Private note'].map((item, index) => (
            <motion.div
              key={item}
              initial={{ x: index % 2 ? 18 : -18, opacity: 0.72 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-[#E7C27D]/15 bg-black/25 p-4"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E7C27D] text-xs font-black text-[#160A08]">
                  {index + 1}
                </span>
                <span className="font-bold text-[#F7DCA3]">{item}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (template.id === 'novadent-clinic') {
    return (
      <div className="rounded-2xl border border-teal-300/20 bg-teal-50 p-5 text-[#102321]">
        <p className="text-[10px] uppercase tracking-[0.22em] text-[#0F766E]">
          appointment pathway
        </p>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {['Concern', 'Pathway', 'Request'].map((item, index) => (
            <motion.div
              key={item}
              whileHover={{ y: -5 }}
              className="rounded-2xl border border-[#D3E7E3] bg-white p-3"
            >
              <motion.div
                className="mb-4 h-2 rounded-full bg-[#2DD4BF]"
                initial={{ scaleX: 0.35 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ ...previewSpringTransition, delay: index * 0.08 }}
                style={{ transformOrigin: 'left center' }}
              />
              <h3 className="text-sm font-black">{item}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (template.id === 'atlas-legal') {
    return (
      <div className="rounded-2xl border border-[#E7C27D]/20 bg-[#11151D] p-5">
        <p className="text-[10px] uppercase tracking-[0.22em] text-[#E7C27D]">dossier stack</p>
        <div className="relative mt-5 h-36">
          {showcase.galleryCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ rotate: -4 + index * 3, y: index * 12, x: index * 18 }}
              whileHover={{ y: index * 6 - 8, rotate: 0 }}
              className="absolute left-0 right-0 rounded-2xl border border-[#D8C6A5]/20 bg-[#F2ECE1] p-4 text-[#11151D]"
            >
              <div className="text-[10px] uppercase tracking-[0.18em] text-[#7A5B16]">
                {card.meta}
              </div>
              <h3 className="mt-1 font-black">{card.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (template.id === 'ionut-love-motorcycle') {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-red-300/20 bg-[#160708] p-5">
        <p className="text-[10px] uppercase tracking-[0.22em] text-red-200/70">road timeline</p>
        <div className="mt-8 h-2 rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-red-400 via-orange-300 to-white"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: previewEase }}
            style={{ transformOrigin: 'left center' }}
          />
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {showcase.galleryCards.map(card => (
            <div
              key={card.title}
              className="rounded-2xl border border-white/10 bg-white/[0.06] p-3"
            >
              <div className="text-sm font-black text-white">{card.title}</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-white/45">
                {card.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (template.id === 'orbitflow-os') {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-cyan-200/20 bg-[#07111F] p-5">
        <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-100/70">
          motion app folder
        </p>
        <div className="mt-5 grid grid-cols-[1fr_1.2fr] gap-4">
          <motion.div
            className="rounded-[1.35rem] border border-white/10 bg-white/[0.08] p-3"
            whileHover={{ scale: 1.03, rotate: -1 }}
          >
            <div className="grid grid-cols-2 gap-2">
              {['B', 'R', 'Q', 'W'].map((item, index) => (
                <motion.div
                  key={item}
                  className="flex aspect-square items-center justify-center rounded-2xl text-sm font-black text-[#07111F]"
                  style={{
                    background: `linear-gradient(135deg, ${index % 2 ? template.secondaryAccent : template.accent}, #F7FAFC)`,
                  }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, delay: index * 0.08 }}
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
          <div className="min-w-0 space-y-3">
            {['Plan launches', 'Ship workflows', 'Support users'].map((line, index) => (
              <motion.div
                key={line}
                className="w-max rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white"
                animate={{ x: index % 2 ? [0, -18, 0] : [0, 18, 0] }}
                transition={{ duration: 3 + index * 0.25, repeat: Infinity, ease: 'easeInOut' }}
              >
                {line}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 p-5" style={surfaceStyle}>
      <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">commerce shelf</p>
      <div className="mt-5 grid grid-cols-3 gap-3">
        {showcase.galleryCards.map((card, index) => (
          <motion.article
            key={card.title}
            whileHover={{ y: -8, rotate: index % 2 ? 1.5 : -1.5 }}
            className="rounded-2xl border border-white/10 bg-white/[0.06] p-3"
          >
            <div
              className="mb-3 aspect-square rounded-xl"
              style={{
                background: `linear-gradient(135deg, ${template.accent}, ${template.secondaryAccent})`,
              }}
            />
            <h3 className="text-xs font-bold text-white">{card.title}</h3>
            <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-white/45">
              {card.value}
            </p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

function GeneratedWebsiteShowcase({
  template,
  story,
}: {
  template: DemoForgeTemplate;
  story: ReturnType<typeof getPreviewStory>;
}) {
  const showcase = getShowcaseContent(template, story);
  const architecture = getSiteArchitecture(template);
  const navPanels = showcase.nav.map((label, index) => {
    const panelSources = [
      {
        eyebrow: 'Site page',
        title: `${label} page structure`,
        items: architecture.pages.slice(index, index + 4),
      },
      {
        eyebrow: 'Conversion',
        title: `${label} user path`,
        items: architecture.conversion,
      },
      {
        eyebrow: 'Owner tools',
        title: `${label} management surface`,
        items: architecture.ownerTools,
      },
      {
        eyebrow: 'Story section',
        title: `${label} content plan`,
        items: story.sections,
      },
    ];
    const source = panelSources[index % panelSources.length];

    return {
      label,
      ...source,
      items: source.items.length ? source.items : story.timeline,
    };
  });
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const [navDirection, setNavDirection] = useState(1);
  const activeNavPanel = navPanels[activeNavIndex] ?? navPanels[0];
  const previewIsExternal = template.previewUrl.startsWith('http');

  const selectPreviewNav = (index: number) => {
    setNavDirection(index > activeNavIndex ? 1 : -1);
    setActiveNavIndex(index);
  };

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
                {navPanels.map((item, index) => {
                  const isActive = activeNavIndex === index;

                  return (
                    <motion.button
                      key={item.label}
                      type="button"
                      onClick={() => selectPreviewNav(index)}
                      whileTap={{ scale: 0.96 }}
                      className={`relative rounded-full border px-3 py-1.5 transition ${
                        isActive
                          ? 'border-transparent text-[#090B11]'
                          : 'border-white/10 bg-white/[0.045] hover:border-white/20 hover:bg-white/[0.08]'
                      }`}
                      aria-pressed={isActive}
                    >
                      {isActive ? (
                        <motion.span
                          layoutId={`preview-nav-${template.id}`}
                          className="absolute inset-0 rounded-full"
                          style={{ backgroundColor: template.accent }}
                          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        />
                      ) : null}
                      <span className="relative z-10">{item.label}</span>
                    </motion.button>
                  );
                })}
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
                  <motion.a
                    href={template.previewUrl}
                    target={previewIsExternal ? '_blank' : undefined}
                    rel={previewIsExternal ? 'noreferrer' : undefined}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-[#090B11] shadow-[0_18px_42px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-0.5 hover:brightness-110 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                    style={{ backgroundColor: template.accent }}
                  >
                    {story.primaryCta}
                    <ArrowRight className="h-4 w-4" />
                  </motion.a>
                  <motion.button
                    type="button"
                    onClick={() => selectPreviewNav((activeNavIndex + 1) % navPanels.length)}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-5 py-3 text-sm text-white transition hover:bg-white/[0.09]"
                  >
                    {story.secondaryCta}
                  </motion.button>
                </div>

                <div className="mt-6 min-h-[10rem] overflow-hidden rounded-2xl border border-white/10 bg-black/25 p-4">
                  <AnimatePresence mode="wait" custom={navDirection} initial={false}>
                    <motion.div
                      key={activeNavPanel.label}
                      custom={navDirection}
                      initial={{ opacity: 0, x: navDirection * 28, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, x: navDirection * -28, filter: 'blur(4px)' }}
                      transition={{ duration: 0.26, ease: previewEase }}
                    >
                      <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">
                        {activeNavPanel.eyebrow}
                      </p>
                      <h3 className="mt-2 text-lg font-black text-white">{activeNavPanel.title}</h3>
                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        {activeNavPanel.items.slice(0, 4).map(item => (
                          <div
                            key={item}
                            className="rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2 text-xs leading-5 text-white/68"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
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

                  <TemplateMotionScene template={template} showcase={showcase} />

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

            <section className="mt-8 grid gap-4 lg:grid-cols-3">
              {[
                ['Site map', architecture.pages],
                ['Conversion flow', architecture.conversion],
                ['Owner tools', architecture.ownerTools],
              ].map(([title, items], index) => (
                <motion.article
                  key={title as string}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...previewSpringTransition, delay: index * 0.06 }}
                  className="pantheon-premium-transition rounded-2xl border border-white/10 bg-white/[0.045] p-5"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h3 className="font-cinzel text-lg font-bold text-white">{title}</h3>
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-black text-[#090B11]"
                      style={{
                        backgroundColor: index % 2 ? template.secondaryAccent : template.accent,
                      }}
                    >
                      {index + 1}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {(items as string[]).map(item => (
                      <div
                        key={item}
                        className="text-white/68 rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-xs leading-5"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
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
