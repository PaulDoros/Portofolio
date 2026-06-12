export interface PortfolioProject {
  id: string;
  title: string;
  image: string;
  description: string;
  content: string;
  keyFeatures: string[];
  technologies: string[];
  category: ProjectCategory;
  status: string;
  impact: string;
  demoUrl?: string;
  codeUrl?: string;
  isAdult?: boolean;
  featured?: boolean;
}

export type ProjectCategory =
  | 'AI Products & SaaS'
  | 'Pantheon & Automation'
  | 'Games & Interactive'
  | 'Client & Commercial'
  | 'Templates & R&D';

export const projectCategories: ProjectCategory[] = [
  'AI Products & SaaS',
  'Pantheon & Automation',
  'Games & Interactive',
  'Client & Commercial',
  'Templates & R&D',
];

export const portfolioStats = [
  { label: 'Shipped systems', value: '20+' },
  { label: 'Fleet agents designed', value: '37' },
  { label: 'Game pipelines built', value: '10+' },
  { label: 'Automation layers', value: 'End-to-end' },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'adhistly',
    title: 'ADHISTLY',
    image: '/images/adhistly.png',
    description: 'AI SaaS platform for NPF/NDD family support',
    content:
      'A production-ready AI SaaS product for families looking for understandable, localized support around NPF/NDD-related needs. The platform combines onboarding, child profiles, recommendation flows, AI assistance, subscriptions, analytics, and operational admin tooling.',
    keyFeatures: [
      'Profile-aware AI assistant with semantic retrieval, recommendations, streaming responses, and safety fallbacks',
      'Supabase Edge Functions for chat, embeddings, speech, prompt operations, quota tracking, and provider abstraction',
      'Full SaaS surface with auth, onboarding, profiles, Stripe subscriptions, Resend email, PostHog analytics, RLS, and deployments',
    ],
    technologies: [
      'React',
      'TypeScript',
      'Supabase',
      'PostgreSQL',
      'Vector Search',
      'Stripe',
      'Edge Functions',
      'AI/RAG',
    ],
    category: 'AI Products & SaaS',
    status: 'Production product',
    impact: 'Built independently from product idea to deployed SaaS.',
    demoUrl: 'https://adhistly.se',
    featured: true,
  },
  {
    id: 'pantheon-command-center',
    title: 'Pantheon Command Center',
    image: '/images/pantheon-demo.png',
    description: 'AI fleet management dashboard and task pipeline',
    content:
      'A local AI operations control plane for creating tasks, routing work to specialized agents, monitoring progress, maintaining memory, and running a six-stage production pipeline from idea to shipped artifact.',
    keyFeatures: [
      'Six-stage kanban workflow: Offerings, Blessed, Forging, Trials, Judgment, and Ascended',
      'Agent dashboards, team structure, task creation, memory vault, calendar, and production lane concepts',
      'Portfolio-safe static demo that mimics the flow without live APIs, secrets, agent spawning, or local machine access',
    ],
    technologies: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Supabase',
      'OpenClaw',
      'Agent Orchestration',
    ],
    category: 'Pantheon & Automation',
    status: 'Static demo included',
    impact: 'Shows the operating system behind the work without exposing the real system.',
    demoUrl: '/pantheon-demo',
    featured: true,
  },
  {
    id: 'fleet-agents',
    title: 'Pantheon Agent Fleet',
    image: '/images/agent-fleet.png',
    description: 'Specialized AI agents for engineering, research, QA, design, and operations',
    content:
      'A structured fleet of domain agents with clear roles, escalation paths, memory standards, certification gates, and production responsibilities across software, infrastructure, games, documentation, and automation.',
    keyFeatures: [
      'Council agents for code, security, infrastructure, design, documentation, research, and strategy',
      'Specialists for QA gates, monitoring, analytics, cost, migrations, refactoring, risk, and ambient context',
      'Game Order division with Unity, Unreal, asset, monetization, QA, and store-readiness roles',
    ],
    technologies: ['OpenClaw', 'Codex', 'Claude', 'Kimi', 'Agent Protocols', 'Automation'],
    category: 'Pantheon & Automation',
    status: 'Operational system',
    impact: 'Turns repeated work into delegated, reviewable production workflows.',
    demoUrl: '/pantheon-demo',
    featured: true,
  },
  {
    id: 'game-order',
    title: 'The Game Order',
    image: '/images/rogue-routes.png',
    description: 'Mobile game production pipeline for Unity and Unreal',
    content:
      'A repeatable game studio workflow for researching, prototyping, building, testing, monetizing, and preparing mobile games for store release using legal templates, license ledgers, QA gates, and build artifacts.',
    keyFeatures: [
      'Concept-to-store workflow with build requirements, privacy notes, monetization plans, QA checklists, and license ledgers',
      'Dedicated Unity and Unreal paths with Android packaging, asset import automation, and validation reports',
      'Reusable template research and free asset pipelines for faster game prototyping',
    ],
    technologies: [
      'Unity',
      'Unreal Engine',
      'Android SDK',
      'Blender',
      'Kenney Assets',
      'QA Automation',
    ],
    category: 'Games & Interactive',
    status: 'Production pipeline',
    impact: 'Creates reusable infrastructure for building multiple legally safe mobile games.',
    demoUrl: '/pantheon-demo',
    featured: true,
  },
  {
    id: 'mobile-rogue-arena',
    title: 'MobileRogueArena',
    image: '/images/mobile-rogue-arena.png',
    description: 'Unreal mobile roguelike arena prototype',
    content:
      'A native Unreal prototype with generated arenas, mobile-friendly player controls, enemy waves, XP upgrades, story operations, Rift Shards economy hooks, boss waves, and Android packaging.',
    keyFeatures: [
      'Generated Training, Foundry, and Rooftop maps with MapCheck passing cleanly',
      'Mobile-focused loop with virtual movement, auto-fire, enemy archetypes, upgrade drafts, and HUD panels',
      'Validated Android debug APK pipeline with package metadata, target SDK, and reproducible build scripts',
    ],
    technologies: ['Unreal Engine', 'C++', 'Android', 'Blueprints', 'Vulkan', 'Kenney Assets'],
    category: 'Games & Interactive',
    status: 'Playable prototype',
    impact: 'Proves a survivor-like mobile loop and Android build path.',
    featured: true,
  },
  {
    id: 'brainrot-protocol',
    title: 'Brainrot Protocol',
    image: '/images/brainrot-protocol.png',
    description: 'Stylized Unreal/Blender game asset and prototype track',
    content:
      'A game prototype track combining Unreal project setup, Blender-generated placeholder assets, character proxies, props, and mobile gameplay planning for a stylized action experience.',
    keyFeatures: [
      'Generated character, enemy, pickup, prop, and billboard preview assets',
      'Unreal mobile MVP planning with Niagara and performance considerations',
      'License and asset-source tracking for store-safe production',
    ],
    technologies: ['Unreal Engine', 'Blender', 'GLB', 'Python Automation', 'Mobile Game Design'],
    category: 'Games & Interactive',
    status: 'Prototype track',
    impact: 'Shows asset generation and game prototyping working together.',
    featured: true,
  },
  {
    id: 'rogue-routes',
    title: 'Rogue Routes',
    image: '/images/rogue-routes.png',
    description: 'Unity mobile roguelike prototype with city and dungeon asset packs',
    content:
      'A Unity mobile roguelike direction with imported free asset packs, neon city and dungeon dressing, build validation, and a repeatable asset-import strategy.',
    keyFeatures: [
      'Kenney City Kit, Mini Dungeon, and mobile control assets integrated into the scene builder',
      'Unity validation workflow with temp-copy testing and asset import documentation',
      'Design dossier and asset shortlist for continued mobile prototype development',
    ],
    technologies: ['Unity', 'C#', 'Kenney Assets', 'Mobile Controls', 'Asset Automation'],
    category: 'Games & Interactive',
    status: 'Prototype',
    impact: 'Builds reusable Unity game systems and import patterns.',
  },
  {
    id: 'sticker-quest',
    title: '67 Sticker Quest',
    image: '/images/sticker-quest.png',
    description: 'Unity collection prototype with camera, obstacle, and sticker mechanics',
    content:
      'A mobile Unity prototype focused on collecting stickers, navigating obstacles, using simple readable mechanics, and building toward a lightweight store-ready loop.',
    keyFeatures: [
      'Unity scene validation with runtime captures and QA notes',
      'Prototype mechanics for collection, obstacles, camera framing, and mobile-friendly readability',
      'Asset intake, package inventory, story plan, and license ledger documentation',
    ],
    technologies: ['Unity', 'C#', 'Mobile Prototype', 'QA Notes', 'Asset Intake'],
    category: 'Games & Interactive',
    status: 'MVP prototype',
    impact: 'Demonstrates fast mobile game iteration and validation.',
  },
  {
    id: 'lucas-invitation',
    title: 'Lucas 1 Year Invitation',
    image: '/images/dashboard.png',
    description: 'Production invitation site with RSVP admin workflow',
    content:
      'A deployed event invitation with production Convex backend, RSVP confirmations, secure admin sessions, custom domain deployment, sharing previews, and mobile dark-mode hardening.',
    keyFeatures: [
      'Convex production functions for RSVP submission, admin session login, list, logout, and deletion',
      'Vercel deployment with custom domains, environment variables, social preview images, and cache fixes',
      'Android Chrome color-scheme fix to preserve the light invitation design',
    ],
    technologies: ['React', 'Convex', 'Vercel', 'TypeScript', 'Custom Domains', 'Admin Sessions'],
    category: 'Client & Commercial',
    status: 'Live deployment',
    impact:
      'A complete small-business style delivery with backend, admin, and production deployment.',
    demoUrl: 'https://lucas-doros.online',
  },
  {
    id: 'angelica-bazar',
    title: 'Angelica Bazar Commerce System',
    image: '/images/dashboard.png',
    description: 'Commerce template and admin operations architecture',
    content:
      'A commerce project family with operational audits, AI implementation planning, catalog schema work, saved-items contracts, production launch runbooks, and mobile parity planning.',
    keyFeatures: [
      'Reusable commerce template base with product, catalog, auth, admin, saved items, and deployment planning',
      'AI/RAG and compliance planning for future customer support and product discovery flows',
      'Parallel-agent execution boards and production launch runbooks for repeatable delivery',
    ],
    technologies: ['Next.js', 'TypeScript', 'Commerce', 'Admin UX', 'AI Planning', 'Runbooks'],
    category: 'Client & Commercial',
    status: 'Template system',
    impact: 'Turns a client commerce build into a reusable production pattern.',
  },
  {
    id: 'netpagecraft',
    title: 'NetPageCraft',
    image: '/images/netpagecraft.png',
    description: 'Website builder platform with QR menus',
    content:
      'A no-code website builder platform for professional websites, QR menus, and digital experiences, with admin tooling, analytics, theming, media management, and subscription concepts.',
    keyFeatures: [
      'Drag-and-drop website builder with live preview and mobile-first output',
      'Admin and super-admin workflows with role-based operations and analytics',
      'Stripe subscription concepts, Redis caching, themes, SEO tools, and QR menu generation',
    ],
    technologies: ['React Router 7', 'Radix UI', 'Supabase', 'TypeScript', 'Stripe', 'Redis'],
    category: 'AI Products & SaaS',
    status: 'Platform build',
    impact: 'A full builder product surface built with production SaaS patterns.',
    demoUrl: 'https://www.netpagecraft.com',
  },
  {
    id: 'template-forge',
    title: 'Template Forge & AI Factory',
    image: '/images/npm.png',
    description: 'Catalog of vetted app templates and factory workflows',
    content:
      'A research and implementation system for selecting high-quality templates, validating stacks, designing automation workflows, and turning repeated app builds into controlled reusable tracks.',
    keyFeatures: [
      '55+ researched templates across full-stack, mobile, ecommerce, admin dashboards, AI apps, and testing systems',
      'Selection criteria for stars, maintenance, documentation, security posture, TypeScript, and testing',
      'Factory workflow concepts for task planning, template selection, implementation gates, and QA automation',
    ],
    technologies: ['Next.js', 'React Native', 'Supabase', 'Testing Templates', 'Automation', 'QA'],
    category: 'Templates & R&D',
    status: 'Research vault',
    impact: 'Speeds up new builds without sacrificing quality or security.',
  },
  {
    id: 'midas-research-agent',
    title: 'Midas Market Research Agent',
    image: '/images/secure.png',
    description: 'Research-only trading agent with dry-run safety controls',
    content:
      'A safety-first market research agent concept with paper-trading infrastructure, explicit no-financial-advice posture, dry-run wallet, no live exchange keys, and milestone-based risk discipline.',
    keyFeatures: [
      'Freqtrade dry-run setup with virtual wallet, no exchange API keys, and no live execution',
      'Research-first rule: current data required before market opinions or pilot decisions',
      'Certification gate posture before any live activation or external account access',
    ],
    technologies: ['Freqtrade', 'Docker', 'Risk Controls', 'Research Automation', 'Dry Run'],
    category: 'Pantheon & Automation',
    status: 'Research pilot',
    impact: 'Shows automation with clear boundaries and safety gates.',
  },
  {
    id: 'dev-journey',
    title: 'Dev Journey',
    image: '/images/devjourney.png',
    description: 'Learning and portfolio platform',
    content:
      'A learning-focused platform combining portfolio presentation, interactive modules, progress tracking, gamification concepts, and modern frontend architecture.',
    keyFeatures: [
      'Profile and learning-module concepts with progress tracking',
      'Gamification elements including achievements, badges, and engagement loops',
      'Responsive Remix/React implementation with dynamic UI components',
    ],
    technologies: ['Remix', 'React', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL'],
    category: 'Templates & R&D',
    status: 'Learning platform',
    impact: 'Connects portfolio storytelling with developer learning loops.',
    demoUrl: 'https://dev-journey-five.vercel.app',
  },
  {
    id: 'neon-pulse-events',
    title: 'Neon Pulse Events',
    image: '/images/vounder.png',
    description: 'Event registration and landing platform',
    content:
      'A modern event experience for underground music and cultural gatherings with event registration, approval workflows, immersive visuals, and responsive mobile design.',
    keyFeatures: [
      'Event registration and approval workflow concepts',
      'Event detail pages with poster-led presentation and location information',
      'Mobile-responsive visual style for nightlife and culture events',
    ],
    technologies: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Event UX'],
    category: 'Client & Commercial',
    status: 'Event platform',
    impact: 'A focused event product surface for conversion and operations.',
    demoUrl: 'https://events.vounder.network',
  },
];

export const featuredProjects = portfolioProjects.filter(project => project.featured);
