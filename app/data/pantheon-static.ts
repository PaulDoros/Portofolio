import { pantheonRoster, type Agent } from './pantheon-agents-source';

export type DemoSection =
  | 'commander'
  | 'tasks'
  | 'factory'
  | 'content'
  | 'memory'
  | 'projects'
  | 'calendar'
  | 'pantheon'
  | 'team'
  | 'storytelling';

export type ProductionLaneId = 'core' | 'game-order' | 'media';

export type DemoTaskStatus = 'inbox' | 'assigned' | 'in_progress' | 'testing' | 'review' | 'done';
export type DemoTaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface DemoTaskItem {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: DemoTaskPriority;
  runtime: string;
  createdAt: string;
  dueDate: string;
  estimatedHours: number;
  autoRun: boolean;
  project: string;
  progressPercent?: number;
  lastProgressMessage?: string;
  claimedBy?: string;
  currentRunId?: string;
  preferredRunner: string;
  orchestrated?: boolean;
  orchestrationType?: string;
  transitionHistory: Array<{ from: DemoTaskStatus; to: DemoTaskStatus; at: string; by: string }>;
  subtasks: Array<{
    title: string;
    assignee: string;
    status: 'queued' | 'in_progress' | 'completed' | 'failed';
  }>;
}

export interface DemoTaskColumn {
  id: DemoTaskStatus;
  title: string;
  subtitle: string;
  color: string;
  icon: string;
  divine: string;
  description: string;
  items: DemoTaskItem[];
}

export interface DemoSimulatedTask extends DemoTaskItem {
  status: DemoTaskStatus;
  originTemplateId: string;
}

export interface DemoForgeTemplate {
  id: string;
  name: string;
  niche: string;
  type: string;
  status: 'planning' | 'in_progress' | 'completed';
  progress: number;
  icon: string;
  accent: string;
  secondaryAccent: string;
  repoLabel: string;
  agents: string[];
  description: string;
  command: string;
  prompt: string;
  taskTitle: string;
  heroTitle: string;
  heroSubtitle: string;
  previewUrl: string;
  metrics: Array<{ label: string; value: string }>;
  features: string[];
  motion: string[];
}

export interface DemoSimulationMessage {
  speaker: string;
  text: string;
}

export interface PantheonAgent extends Agent {
  lane: 'Core Pantheon' | 'The Game Order';
  status: string;
  load: number;
  brief: string;
}

export const gameOrderAgentIds = new Set([
  'ares-game-director',
  'icarus-unity',
  'orpheus-unreal',
  'kabeiro-unity-build',
  'cyclops-unreal-build',
  'morpheus-levels',
  'iris-game-art',
  'argos-asset-warden',
  'midas-monetization',
  'nike-game-qa',
  'pheme-aso',
]);

const staticAgentState: Record<string, { status: string; load: number }> = {
  kronos: { status: 'Commanding portfolio demo', load: 42 },
  zeus: { status: 'Splitting SaaS scaffold', load: 68 },
  athena: { status: 'Reviewing demo isolation', load: 37 },
  hephaestus: { status: 'Preparing deployment track', load: 54 },
  hermes: { status: 'Collecting design evidence', load: 49 },
  thoth: { status: 'Drafting portfolio narrative', load: 31 },
  aphrodite: { status: 'Polishing interface language', load: 46 },
  talos: { status: 'Scoring release evidence', load: 81 },
  argus: { status: 'Watching static telemetry', load: 26 },
  daedalus: { status: 'Planning reusable template base', load: 58 },
  prometheus: { status: 'Forecasting portfolio roadmap', load: 35 },
  heimdall: { status: 'Holding access closed', load: 29 },
  helios: { status: 'Rendering demo metrics', load: 44 },
  apollo: { status: 'Ready for focused build', load: 39 },
  heracles: { status: 'Holding migration lane', load: 61 },
  minerva: { status: 'Mapping decision paths', load: 33 },
  vulcan: { status: 'Reworking template forge', load: 52 },
  fortuna: { status: 'Scoring product odds', load: 28 },
  plutus: { status: 'Checking spend model', load: 24 },
  aura: { status: 'Quiet channel watch', load: 19 },
  dante: { status: 'Watching recovery paths', load: 22 },
  odin: { status: 'Reviewing design risks', load: 41 },
  loki: { status: 'Spiking safe mockups', load: 47 },
  ra: { status: 'Surveying monorepo paths', load: 56 },
  ptah: { status: 'Forging toolchain docs', load: 48 },
  thor: { status: 'Hammering latency path', load: 45 },
  'ares-game-director': { status: 'Directing roguelike roadmap', load: 64 },
  'icarus-unity': { status: 'Preparing Unity prototype', load: 51 },
  'orpheus-unreal': { status: 'Tuning MobileRogueArena', load: 72 },
  'argos-asset-warden': { status: 'Checking asset ledger', load: 34 },
  'kabeiro-unity-build': { status: 'Checking Unity toolchain', load: 43 },
  'cyclops-unreal-build': { status: 'Guarding APK pipeline', load: 59 },
  'morpheus-levels': { status: 'Tuning first minute', load: 36 },
  'iris-game-art': { status: 'Drafting icon direction', load: 32 },
  'midas-monetization': { status: 'Modeling shard economy', load: 38 },
  'nike-game-qa': { status: 'Scoring device readiness', load: 63 },
  'pheme-aso': { status: 'Preparing store promise', load: 27 },
};

export const pantheonAgents: PantheonAgent[] = pantheonRoster.map(agent => {
  const state = staticAgentState[agent.id] || { status: 'Standing by in static mode', load: 20 };

  return {
    ...agent,
    lane: gameOrderAgentIds.has(agent.id) ? 'The Game Order' : 'Core Pantheon',
    status: state.status,
    load: state.load,
    brief: agent.description,
  };
});

export const productionLaneTabs = [
  {
    id: 'core' as const,
    label: 'Core Pantheon',
    shortLabel: 'Core',
    icon: '🏛️',
    leader: 'Kronos',
    controller: 'Kronos',
    status: 'active',
    description:
      'The original working Pantheon team: command, coding, research, design, infrastructure, QA, and orchestration.',
  },
  {
    id: 'game-order' as const,
    label: 'The Game Order',
    shortLabel: 'Games',
    icon: '🎮',
    leader: 'Ares',
    controller: 'Kronos',
    status: 'active',
    description:
      'Dedicated mobile-game creation division for Unity/Unreal production. Ares leads; Kronos controls escalation.',
  },
  {
    id: 'media' as const,
    label: 'Media Forge',
    shortLabel: 'Media',
    icon: '🎬',
    leader: 'Unassigned',
    controller: 'Kronos',
    status: 'planned',
    description:
      'Reserved for future video editing, music, voice, creative production, and content agents.',
  },
];

export const dashboardNavItems = [
  {
    id: 'commander',
    section: 'commander',
    label: "Commander's Chamber",
    icon: '⏳',
    divine: 'Kronos',
  },
  { id: 'tasks', section: 'tasks', label: 'Scrolls of Labor', icon: '📜', divine: 'Hephaestus' },
  {
    id: 'factory',
    section: 'factory',
    label: "Hephaestus' Forge",
    icon: '🏭',
    divine: 'Hephaestus',
  },
  { id: 'content', section: 'content', label: "Oracle's Archives", icon: '📚', divine: 'Clio' },
  { id: 'memory', section: 'memory', label: "Mnemosyne's Vault", icon: '💭', divine: 'Mnemosyne' },
  { id: 'projects', section: 'projects', label: 'Project Vault', icon: '📁', divine: 'Mnemosyne' },
  { id: 'calendar', section: 'calendar', label: 'Celestial Cycle', icon: '☀️', divine: 'Helios' },
  {
    id: 'pantheon',
    section: 'pantheon',
    label: 'The Pantheon',
    icon: '🏛️',
    divine: 'Zeus',
    featured: true,
    lane: 'core' as ProductionLaneId,
  },
  {
    id: 'game-order',
    section: 'pantheon',
    label: 'Game Order',
    icon: '🎮',
    divine: 'Ares',
    lane: 'game-order' as ProductionLaneId,
  },
  { id: 'team', section: 'team', label: 'Divine Assembly', icon: '👑', divine: 'Athena' },
  {
    id: 'storytelling',
    section: 'storytelling',
    label: 'Story Telling',
    icon: '📖',
    divine: 'Calliope',
  },
] satisfies Array<{
  id: string;
  section: DemoSection;
  label: string;
  icon: string;
  divine: string;
  featured?: boolean;
  lane?: ProductionLaneId;
}>;

export const commandStats = [
  { label: 'Sworn agents', value: String(pantheonAgents.length) },
  { label: 'Live calls', value: '0' },
  { label: 'Workflow gates', value: '6' },
  { label: 'Demo safety', value: 'Static' },
];

export const taskColumns: DemoTaskColumn[] = [
  {
    id: 'inbox',
    title: 'Offerings',
    subtitle: 'Gifts to the Gods',
    color: 'border-stone-400',
    icon: '🏺',
    divine: 'Hermes',
    description: 'New tasks await divine blessing',
    items: [
      {
        id: 'demo-task-saas-intake',
        title: 'New SaaS idea intake',
        description:
          'Clarify the user promise, target customer, feature spine, and first deployable dashboard slice.',
        assignee: 'zeus',
        priority: 'medium',
        runtime: 'Manual',
        createdAt: '12m ago',
        dueDate: 'None',
        estimatedHours: 2,
        autoRun: false,
        project: '/data/repos/factory-repos/saas-launch-template',
        preferredRunner: 'zeus',
        transitionHistory: [],
        subtasks: [],
      },
      {
        id: 'demo-task-roguelike-intake',
        title: 'Mobile roguelike concept',
        description:
          'Turn the Android arena prototype into a clear store-facing loop with stage modes and economy hooks.',
        assignee: 'ares-game-director',
        priority: 'high',
        runtime: 'Queued for Bridge',
        createdAt: '28m ago',
        dueDate: 'Today',
        estimatedHours: 4,
        autoRun: true,
        project: '/data/repos/game-order/projects/unreal-mobile-roguelike',
        preferredRunner: 'ares-game-director',
        progressPercent: 8,
        lastProgressMessage: 'Awaiting direction split',
        transitionHistory: [],
        subtasks: [],
      },
      {
        id: 'demo-task-commerce-template',
        title: 'Commerce template intake',
        description:
          'Collect reference flows, billing constraints, and admin requirements before blessing the work.',
        assignee: 'hermes',
        priority: 'low',
        runtime: 'Manual',
        createdAt: '1h ago',
        dueDate: 'Tomorrow',
        estimatedHours: 1,
        autoRun: false,
        project: '/data/repos/factory-repos/commerce-template',
        preferredRunner: 'hermes',
        transitionHistory: [],
        subtasks: [],
      },
    ],
  },
  {
    id: 'assigned',
    title: 'Blessed',
    subtitle: 'Divine Assignment',
    color: 'border-blue-400',
    icon: '✨',
    divine: 'Apollo',
    description: 'Assigned and ready for work',
    items: [
      {
        id: 'demo-task-template-selected',
        title: 'Template selected',
        description:
          'Apollo has the implementation lane and a selected Next/Supabase template for the first slice.',
        assignee: 'apollo',
        priority: 'medium',
        runtime: 'Claimed',
        createdAt: '2h ago',
        dueDate: 'Today',
        estimatedHours: 3,
        autoRun: true,
        project: '/data/repos/projects/Portofolio',
        progressPercent: 18,
        claimedBy: 'apollo',
        currentRunId: 'run_apollo_1024',
        preferredRunner: 'apollo',
        transitionHistory: [{ from: 'inbox', to: 'assigned', at: '1h ago', by: 'Kronos' }],
        subtasks: [
          { title: 'Confirm static-only constraints', assignee: 'athena', status: 'completed' },
          { title: 'Map component copy points', assignee: 'thoth', status: 'in_progress' },
        ],
      },
      {
        id: 'demo-task-risk-notes',
        title: 'Risk notes approved',
        description:
          'Security boundary is explicit: portfolio demo must never call Supabase, OpenClaw, files, or agents.',
        assignee: 'athena',
        priority: 'high',
        runtime: 'Claimed',
        createdAt: '2h ago',
        dueDate: 'Today',
        estimatedHours: 1,
        autoRun: false,
        project: '/data/repos/projects/Portofolio',
        progressPercent: 30,
        claimedBy: 'athena',
        preferredRunner: 'athena',
        transitionHistory: [{ from: 'inbox', to: 'assigned', at: '90m ago', by: 'Kronos' }],
        subtasks: [],
      },
    ],
  },
  {
    id: 'in_progress',
    title: 'Forging',
    subtitle: "Hephaestus' Fire",
    color: 'border-orange-500',
    icon: '🔥',
    divine: 'Hephaestus',
    description: 'Actively being crafted',
    items: [
      {
        id: 'demo-task-build-first-screen',
        title: 'Build first screen',
        description:
          'Aphrodite is tightening the static Pantheon visual pass after the gate opens.',
        assignee: 'aphrodite',
        priority: 'high',
        runtime: 'Running',
        createdAt: '3h ago',
        dueDate: 'Today',
        estimatedHours: 5,
        autoRun: true,
        project: '/data/repos/projects/Portofolio',
        progressPercent: 64,
        lastProgressMessage: 'Compact header replacing oversized hero',
        claimedBy: 'aphrodite',
        currentRunId: 'run_aphrodite_2048',
        preferredRunner: 'aphrodite',
        orchestrated: true,
        orchestrationType: 'zeus',
        transitionHistory: [
          { from: 'inbox', to: 'assigned', at: '3h ago', by: 'Kronos' },
          { from: 'assigned', to: 'in_progress', at: '2h ago', by: 'Zeus' },
        ],
        subtasks: [
          { title: 'Restore agent detail flow', assignee: 'aphrodite', status: 'in_progress' },
          { title: 'Port static task board shell', assignee: 'hephaestus', status: 'in_progress' },
          { title: 'Check mobile chrome density', assignee: 'talos', status: 'queued' },
        ],
      },
      {
        id: 'demo-task-wire-static-data',
        title: 'Wire static project data',
        description:
          'Thoth is keeping the public data safe while preserving the original dashboard structure.',
        assignee: 'thoth',
        priority: 'medium',
        runtime: 'Running',
        createdAt: '4h ago',
        dueDate: 'Today',
        estimatedHours: 2,
        autoRun: true,
        project: '/data/repos/projects/Portofolio',
        progressPercent: 72,
        lastProgressMessage: 'Mock board data enriched',
        claimedBy: 'thoth',
        currentRunId: 'run_thoth_4096',
        preferredRunner: 'thoth',
        transitionHistory: [
          { from: 'inbox', to: 'assigned', at: '4h ago', by: 'Kronos' },
          { from: 'assigned', to: 'in_progress', at: '3h ago', by: 'Apollo' },
        ],
        subtasks: [
          { title: 'Copy roster lore fields', assignee: 'thoth', status: 'completed' },
          { title: 'Add mock Kanban evidence', assignee: 'thoth', status: 'in_progress' },
        ],
      },
    ],
  },
  {
    id: 'testing',
    title: 'Trials',
    subtitle: 'Forge of Testing',
    color: 'border-amber-500',
    icon: '⚔️',
    divine: 'Talos',
    description: 'Quality trials in progress',
    items: [
      {
        id: 'demo-task-typecheck',
        title: 'Typecheck',
        description:
          'Run the smallest meaningful validation before calling the portfolio demo repaired.',
        assignee: 'talos',
        priority: 'high',
        runtime: 'Queued',
        createdAt: '45m ago',
        dueDate: 'Today',
        estimatedHours: 1,
        autoRun: false,
        project: '/data/repos/projects/Portofolio',
        progressPercent: 0,
        preferredRunner: 'talos',
        transitionHistory: [{ from: 'in_progress', to: 'testing', at: '20m ago', by: 'Kronos' }],
        subtasks: [],
      },
      {
        id: 'demo-task-responsive-pass',
        title: 'Responsive pass',
        description:
          'Inspect that the side rail, mobile menu, task board, and detail panel remain usable.',
        assignee: 'aphrodite',
        priority: 'medium',
        runtime: 'Manual',
        createdAt: '1h ago',
        dueDate: 'Today',
        estimatedHours: 1,
        autoRun: false,
        project: '/data/repos/projects/Portofolio',
        progressPercent: 40,
        preferredRunner: 'aphrodite',
        transitionHistory: [{ from: 'in_progress', to: 'testing', at: '30m ago', by: 'TALOS' }],
        subtasks: [],
      },
    ],
  },
  {
    id: 'review',
    title: 'Judgment',
    subtitle: "Athena's Wisdom",
    color: 'border-amber-400',
    icon: '🦉',
    divine: 'Athena',
    description: 'Awaiting final approval',
    items: [
      {
        id: 'demo-task-talos-score',
        title: 'TALOS score 96/100',
        description:
          'Evidence package is ready for judgment: static copy, no live calls, and source-matched workflows.',
        assignee: 'talos',
        priority: 'high',
        runtime: 'Review',
        createdAt: '5h ago',
        dueDate: 'Today',
        estimatedHours: 1,
        autoRun: false,
        project: '/data/repos/projects/Portofolio',
        progressPercent: 96,
        claimedBy: 'talos',
        preferredRunner: 'talos',
        transitionHistory: [{ from: 'testing', to: 'review', at: '12m ago', by: 'TALOS' }],
        subtasks: [
          { title: 'Static-only review', assignee: 'athena', status: 'completed' },
          { title: 'Visual parity check', assignee: 'aphrodite', status: 'completed' },
        ],
      },
      {
        id: 'demo-task-human-approval',
        title: 'Human approval gate',
        description:
          'Kronos holds the final decision until the user confirms the public portfolio route feels right.',
        assignee: 'kronos',
        priority: 'urgent',
        runtime: 'Manual',
        createdAt: '8m ago',
        dueDate: 'Today',
        estimatedHours: 1,
        autoRun: false,
        project: '/data/repos/projects/Portofolio',
        progressPercent: 90,
        preferredRunner: 'kronos',
        transitionHistory: [{ from: 'testing', to: 'review', at: '8m ago', by: 'Kronos' }],
        subtasks: [],
      },
    ],
  },
  {
    id: 'done',
    title: 'Ascended',
    subtitle: 'Elysian Fields',
    color: 'border-emerald-500',
    icon: '👑',
    divine: 'Zeus',
    description: 'Completed and celebrated',
    items: [
      {
        id: 'demo-task-portfolio-showcase',
        title: 'Portfolio showcase',
        description:
          'The portfolio already carries a public Pantheon route, project gallery, and safe static assets.',
        assignee: 'kronos',
        priority: 'medium',
        runtime: 'Complete',
        createdAt: 'Yesterday',
        dueDate: 'Done',
        estimatedHours: 6,
        autoRun: false,
        project: '/data/repos/projects/Portofolio',
        progressPercent: 100,
        claimedBy: 'kronos',
        preferredRunner: 'kronos',
        transitionHistory: [{ from: 'review', to: 'done', at: 'Yesterday', by: 'Kronos' }],
        subtasks: [
          { title: 'Gate intro copied safely', assignee: 'aphrodite', status: 'completed' },
          { title: 'Build passed', assignee: 'talos', status: 'completed' },
        ],
      },
      {
        id: 'demo-task-deployment-candidate',
        title: 'Deployment candidate',
        description:
          'Hephaestus has the public build shape ready once the static demo fidelity pass is accepted.',
        assignee: 'hephaestus',
        priority: 'medium',
        runtime: 'Complete',
        createdAt: 'Yesterday',
        dueDate: 'Done',
        estimatedHours: 2,
        autoRun: true,
        project: '/data/repos/projects/Portofolio',
        progressPercent: 100,
        claimedBy: 'hephaestus',
        preferredRunner: 'hephaestus',
        transitionHistory: [{ from: 'review', to: 'done', at: 'Yesterday', by: 'Hephaestus' }],
        subtasks: [],
      },
    ],
  },
];

export const demoForgeTemplates: DemoForgeTemplate[] = [
  {
    id: 'angelica-bazar',
    name: 'Angelica Bazar',
    niche: 'Ecommerce and admin',
    type: 'ecommerce',
    status: 'in_progress',
    progress: 86,
    icon: '🛍️',
    accent: '#F472B6',
    secondaryAccent: '#7C3AED',
    repoLabel: 'projects/angelica-bazar',
    agents: ['Aphrodite', 'Apollo', 'Athena', 'Hephaestus'],
    description:
      'Boutique commerce showcase with product storytelling, staff-only admin, launch checks, and polished storefront motion.',
    command: 'simulate forge --template ecommerce-custom',
    prompt:
      'Create a premium boutique ecommerce site for Angelica Bazar with product storytelling, admin confidence, smooth motion, and a deploy-ready preview.',
    taskTitle: 'Forge Angelica Bazar ecommerce showcase',
    heroTitle: 'Curated pieces for modern rituals',
    heroSubtitle:
      'A boutique storefront with animated product rails, editorial collections, and a calm admin-ready foundation.',
    previewUrl: 'https://angelica-bazar.vercel.app/',
    metrics: [
      { label: 'Products', value: '128' },
      { label: 'Collections', value: '9' },
      { label: 'Launch score', value: '94' },
    ],
    features: ['Editorial product cards', 'Admin-ready catalog', 'Trust and delivery bands'],
    motion: ['Magnetic product rail', 'Reveal-on-scroll collections', 'Glowing checkout CTA'],
  },
  {
    id: 'noir-table',
    name: 'Noir Table',
    niche: 'Restaurant landing page',
    type: 'landing',
    status: 'planning',
    progress: 42,
    icon: '🍽️',
    accent: '#EAB308',
    secondaryAccent: '#DC2626',
    repoLabel: 'templates/noir-table',
    agents: ['Aphrodite', 'Hermes', 'Apollo', 'TALOS'],
    description:
      'Restaurant landing page with cinematic reservations, menu highlights, chef story, location, and private dining sections.',
    command: 'simulate forge --template restaurant-motion',
    prompt:
      'Generate a cinematic restaurant website for Noir Table with reservation flow, menu highlights, chef story, wine program, and dramatic motion.',
    taskTitle: 'Forge Noir Table restaurant landing page',
    heroTitle: 'Dinner after dark, plated in gold',
    heroSubtitle:
      'A high-motion dining experience with reservation intent, signature dishes, and an atmospheric chef narrative.',
    previewUrl: '/noir-table',
    metrics: [
      { label: 'Reservations', value: '+38%' },
      { label: 'Menu sections', value: '6' },
      { label: 'Motion cues', value: '14' },
    ],
    features: ['Reservation CTA', 'Animated menu tasting', 'Chef and cellar story'],
    motion: ['Parallax dish reveals', 'Candlelight hover states', 'Animated booking timeline'],
  },
  {
    id: 'pulsefit-studio',
    name: 'PulseFit Studio',
    niche: 'Fitness and wellness',
    type: 'web',
    status: 'planning',
    progress: 36,
    icon: '💪',
    accent: '#22C55E',
    secondaryAccent: '#06B6D4',
    repoLabel: 'templates/pulsefit-studio',
    agents: ['Apollo', 'Aphrodite', 'Hermes', 'Plutus'],
    description:
      'Fitness studio site with class schedule, trainer cards, membership pricing, and a mobile booking preview.',
    command: 'simulate forge --template fitness-booking',
    prompt:
      'Create a kinetic fitness studio website with class schedules, trainers, membership tiers, social proof, and mobile-first booking.',
    taskTitle: 'Forge PulseFit Studio wellness site',
    heroTitle: 'Book the class that changes your week',
    heroSubtitle:
      'A punchy fitness site with live-feeling schedules, trainer spotlights, and membership conversion paths.',
    previewUrl: '/pulsefit-studio',
    metrics: [
      { label: 'Classes', value: '32' },
      { label: 'Trainers', value: '8' },
      { label: 'Trial CTA', value: '2-step' },
    ],
    features: ['Class schedule grid', 'Trainer profile cards', 'Membership comparison'],
    motion: ['Pulse meter hero', 'Swipeable class cards', 'Animated pricing selector'],
  },
  {
    id: 'summit-realty',
    name: 'Summit Realty',
    niche: 'Real estate',
    type: 'web',
    status: 'planning',
    progress: 31,
    icon: '🏘️',
    accent: '#38BDF8',
    secondaryAccent: '#0F766E',
    repoLabel: 'templates/summit-realty',
    agents: ['Hermes', 'Aphrodite', 'Apollo', 'Athena'],
    description:
      'Real estate landing page with featured listings, neighborhood cards, mortgage CTA, and agent profile storytelling.',
    command: 'simulate forge --template real-estate-gallery',
    prompt:
      'Generate a premium real estate website for Summit Realty with listings, neighborhoods, agent trust, mortgage CTA, and motion-rich property previews.',
    taskTitle: 'Forge Summit Realty listing showcase',
    heroTitle: 'Find the address that fits the next chapter',
    heroSubtitle:
      'A listing-led real estate experience with neighborhood context, agent credibility, and smooth property discovery.',
    previewUrl: 'https://summit-realty-demo.vercel.app',
    metrics: [
      { label: 'Listings', value: '24' },
      { label: 'Neighborhoods', value: '7' },
      { label: 'Lead paths', value: '5' },
    ],
    features: ['Featured property rail', 'Neighborhood cards', 'Agent consultation CTA'],
    motion: ['Map pin choreography', 'Listing card tilt', 'Mortgage CTA slide-in'],
  },
  {
    id: 'novadent-clinic',
    name: 'NovaDent Clinic',
    niche: 'Healthcare clinic',
    type: 'web',
    status: 'planning',
    progress: 28,
    icon: '🦷',
    accent: '#2DD4BF',
    secondaryAccent: '#2563EB',
    repoLabel: 'templates/novadent-clinic',
    agents: ['Athena', 'Aphrodite', 'Apollo', 'Hermes'],
    description:
      'Clinic website with services, appointment CTA, patient testimonials, trust badges, and accessible content structure.',
    command: 'simulate forge --template clinic-trust',
    prompt:
      'Create a polished dental clinic website with services, appointment booking CTA, testimonials, insurance trust signals, and accessible motion.',
    taskTitle: 'Forge NovaDent Clinic appointment site',
    heroTitle: 'Calm care, brighter appointments',
    heroSubtitle:
      'A healthcare landing page balancing trust, clarity, service discovery, and frictionless appointment intent.',
    previewUrl: 'https://novadent-clinic-demo.vercel.app',
    metrics: [
      { label: 'Services', value: '12' },
      { label: 'Reviews', value: '4.9' },
      { label: 'Booking', value: '1 min' },
    ],
    features: ['Appointment CTA', 'Service pathway cards', 'Trust and review badges'],
    motion: ['Soft service reveals', 'Trust badge cascade', 'Appointment progress rail'],
  },
  {
    id: 'atlas-legal',
    name: 'Atlas Legal',
    niche: 'Professional services',
    type: 'landing',
    status: 'planning',
    progress: 34,
    icon: '⚖️',
    accent: '#A78BFA',
    secondaryAccent: '#F59E0B',
    repoLabel: 'templates/atlas-legal',
    agents: ['Athena', 'Hermes', 'Thoth', 'Aphrodite'],
    description:
      'Law firm site with practice areas, case results, attorney profiles, and a consultation conversion path.',
    command: 'simulate forge --template legal-authority',
    prompt:
      'Build a refined law firm website for Atlas Legal with practice areas, proof, attorney profiles, consultation CTA, and restrained premium motion.',
    taskTitle: 'Forge Atlas Legal professional services site',
    heroTitle: 'Clear counsel for consequential decisions',
    heroSubtitle:
      'A trust-first professional services site with evidence, attorney authority, and a focused consultation path.',
    previewUrl: 'https://atlas-legal-demo.vercel.app',
    metrics: [
      { label: 'Practice areas', value: '8' },
      { label: 'Case wins', value: '42' },
      { label: 'Consult CTA', value: '3' },
    ],
    features: ['Practice area matrix', 'Attorney profiles', 'Case result highlights'],
    motion: ['Evidence counter reveal', 'Practice card sweep', 'Consultation drawer motion'],
  },
];

export const factoryProjects = demoForgeTemplates.map(template => ({
  name: template.name,
  type: template.type,
  status: template.status,
  progress: template.progress,
  agents: template.agents,
  description: template.description,
  command: template.command,
  templateId: template.id,
}));

export const templateBlueprints = [
  'Boutique ecommerce with admin-ready catalog',
  'Cinematic restaurant landing page and reservations',
  'Fitness studio classes, trainers, and memberships',
  'Real estate listings and neighborhood lead capture',
  'Healthcare clinic appointment and trust system',
  'Professional services authority and consultation flow',
];

export const projectVault = [
  {
    name: 'Angelica Bazar',
    priority: 'P0',
    status: 'active',
    path: '/data/repos/projects/angelica-bazar',
    description: 'Featured ecommerce/admin showcase created from a real Forge project pattern.',
    updated: 'Today',
  },
  {
    name: 'Noir Table',
    priority: 'P1',
    status: 'active',
    path: '/data/repos/projects/noir-table',
    description: 'Real GSAP restaurant route with reservations, menu story, and cinematic motion.',
    updated: 'Today',
  },
  {
    name: 'PulseFit Studio',
    priority: 'P1',
    status: 'active',
    path: '/data/repos/projects/pulsefit-studio',
    description: 'Real Motion-powered fitness route with booking, memberships, and high-energy UI.',
    updated: 'Today',
  },
  {
    name: 'Summit Realty',
    priority: 'P2',
    status: 'active',
    path: '/data/repos/projects/summit-realty',
    description: 'Real estate listing showcase with neighborhoods, agent trust, and lead capture.',
    updated: 'This week',
  },
  {
    name: 'NovaDent Clinic',
    priority: 'P2',
    status: 'active',
    path: '/data/repos/projects/novadent-clinic',
    description: 'Healthcare clinic website with services, reviews, and appointment intent.',
    updated: 'This week',
  },
  {
    name: 'Atlas Legal',
    priority: 'P2',
    status: 'active',
    path: '/data/repos/projects/atlas-legal',
    description: 'Professional services site with practice areas, attorneys, and consultation CTA.',
    updated: 'This week',
  },
];

export const teamRoster = [
  {
    tier: 'Command',
    label: 'Command',
    epithet: 'Sovereign Continuity',
    motto: 'The hand that keeps the pantheon coherent across sessions.',
    members: ['Kronos'],
  },
  {
    tier: 'Olympian',
    label: 'Olympian Council',
    epithet: 'Tier II - Senior Strategists',
    motto: 'The speaking voices of the pantheon - domains of depth.',
    members: ['Zeus', 'Athena', 'Hephaestus', 'Hermes', 'Thoth', 'Aphrodite'],
  },
  {
    tier: 'Specialist',
    label: 'Specialist Corps',
    epithet: 'Tier III - Applied Domains',
    motto: 'Narrow blades, each forged for a single decisive purpose.',
    members: ['TALOS', 'Argus', 'Daedalus', 'Prometheus', 'Heimdall', 'Helios'],
  },
  {
    tier: 'GameOrder',
    label: 'The Game Order',
    epithet: 'Mobile Game Production',
    motto: 'Playable loops, legal assets, repeatable builds, and store-ready discipline.',
    members: ['Ares', 'Icarus-Unity', 'Orpheus-Unreal', 'Kabeiro', 'Cyclops', 'Nike'],
  },
  {
    tier: 'CLI',
    label: 'CLI Harness',
    epithet: 'Tier V - Direct Execution Runtimes',
    motto: 'Where intent becomes machine instruction, without intermediaries.',
    members: ['Odin', 'Loki', 'Ra', 'Ptah', 'Thor'],
  },
  {
    tier: 'Atmosphere',
    label: 'Atmosphere',
    epithet: 'Tier IV - Ambient Intelligence',
    motto: 'The breath between actions. Context, environment, flow.',
    members: ['Aura', 'Dante'],
  },
];

export const contentStages = [
  { id: 'ideas', title: 'Ideas', description: 'Brainstorm concepts', icon: '💡' },
  { id: 'script', title: 'Script', description: 'Full copy and scripts', icon: '📝' },
  { id: 'visuals', title: 'Visuals', description: 'Images and designs', icon: '🎨' },
  { id: 'review', title: 'Review', description: 'Approval workflow', icon: '👀' },
  { id: 'publish', title: 'Publish', description: 'Final output', icon: '🚀' },
];

export const archiveRecords = [
  {
    title: 'Ideas',
    type: 'Pipeline Stage',
    owner: 'Clio',
    summary: 'Brainstorm concepts and collect raw creative material before a formal offering.',
  },
  {
    title: 'Script',
    type: 'Pipeline Stage',
    owner: 'Calliope',
    summary: 'Turn rough intent into full copy, scripts, and narrative beats ready for review.',
  },
  {
    title: 'Visuals',
    type: 'Pipeline Stage',
    owner: 'Aphrodite',
    summary: 'Shape image direction, layouts, and visual assets for public-facing output.',
  },
  {
    title: 'Review',
    type: 'Pipeline Stage',
    owner: 'Athena',
    summary: 'Hold approval workflow, safety review, and final clarity checks before publishing.',
  },
  {
    title: 'Publish',
    type: 'Pipeline Stage',
    owner: 'Hermes',
    summary: 'Package the final artifact and prepare it for the right delivery channel.',
  },
];

export const memoryRecords = [
  {
    title: 'Digital Pantheon Architecture',
    state: 'Architecture',
    note: 'The local dashboard is the visible command layer over task, factory, memory, and agent surfaces.',
  },
  {
    title: 'Fleet Command Protocol',
    state: 'Protocol',
    note: 'Kronos controls routing, Zeus splits implementation, and TALOS blocks unsafe releases.',
  },
  {
    title: 'Security Audit Complete',
    state: 'Security',
    note: 'Public demos stay static: no backend calls, no live agents, no tokens, and no private files.',
  },
  {
    title: 'Supermemory Integration',
    state: 'Memory',
    note: 'The real app can search durable memory; this portfolio route only displays safe mock summaries.',
  },
];

export const calendarEvents = [
  {
    time: '09:00',
    title: 'Dawn Review',
    realm: 'Helios',
    note: 'Scan active work, confirm priorities, and pull the next offering into motion.',
  },
  {
    time: '14:00',
    title: 'Forge Checkpoint',
    realm: 'Hephaestus',
    note: 'Inspect builds, tasks, and validation evidence before sending work to trials.',
  },
  {
    time: '18:00',
    title: 'Chronicle Window',
    realm: 'Calliope',
    note: 'Convert completed work into reports, stories, demos, and portfolio artifacts.',
  },
];

export const calliopeStory = {
  title: 'The Gate Before the Fleet',
  subtitle: 'A static chronicle of the public Pantheon replica.',
  sourceKind: 'Completed Pantheon task',
  evidenceCount: 6,
  estimatedNarration: '2m 40s',
  createdAt: 'Static snapshot',
  sections: [
    {
      title: 'Invocation',
      kind: 'opening',
      text: 'Before the dashboard appears, the golden gate claims the whole viewport. It opens only when the visitor acts, then disappears completely so the dashboard can mount cleanly.',
    },
    {
      title: 'The Assembly',
      kind: 'body',
      text: 'The copied roster carries the real Pantheon names, domains, lore, sigils, avatars, and emblem components. Game Order remains a separate lane under Ares, while Kronos controls escalation.',
    },
    {
      title: 'The Boundary',
      kind: 'closing',
      text: 'The public realm shows the shape of command without touching Supabase, OpenClaw, local files, credentials, or live agent execution.',
    },
  ],
};

export const calliopeStories = [
  calliopeStory,
  {
    title: 'Angelica Bazar Receives a Storefront',
    subtitle: 'A boutique ecommerce request becomes a launch-ready preview.',
    sourceKind: 'Forge website prompt',
    evidenceCount: 9,
    estimatedNarration: '3m 15s',
    createdAt: 'Static snapshot',
    sections: [
      {
        title: 'The Brief',
        kind: 'opening',
        text: 'Angelica Bazar arrives as a simple request: make a premium boutique storefront that feels editorial, confident, and ready for a real catalog.',
      },
      {
        title: 'The Making',
        kind: 'body',
        text: 'Aphrodite shapes the product mood, Apollo tunes the interaction rhythm, Athena checks the trust path, and Hephaestus turns the pieces into a clean deploy preview.',
      },
      {
        title: 'The Showcase',
        kind: 'closing',
        text: 'The final public page is only a simulation, but it shows the useful illusion: a visitor can see product rails, launch checks, and the kind of commerce polish the forge can create.',
      },
    ],
  },
  {
    title: 'Noir Table Opens the Night',
    subtitle: 'A restaurant landing page becomes a cinematic reservation story.',
    sourceKind: 'Restaurant template run',
    evidenceCount: 7,
    estimatedNarration: '2m 55s',
    createdAt: 'Static snapshot',
    sections: [
      {
        title: 'The Atmosphere',
        kind: 'opening',
        text: 'The prompt asks for candlelight, chef presence, signature dishes, and a reservation flow that feels decisive without becoming loud.',
      },
      {
        title: 'The Menu',
        kind: 'body',
        text: 'Hermes clarifies the booking path while Apollo makes the dish reveals feel alive. The story turns menu sections into reasons to reserve.',
      },
      {
        title: 'The Table',
        kind: 'closing',
        text: 'The preview does not take real bookings. It demonstrates how a restaurant can move from mood to menu to action in one polished page.',
      },
    ],
  },
  {
    title: 'NovaDent Makes the Visit Feel Calm',
    subtitle: 'A clinic site balances trust, service clarity, and appointment intent.',
    sourceKind: 'Healthcare template run',
    evidenceCount: 8,
    estimatedNarration: '3m 05s',
    createdAt: 'Static snapshot',
    sections: [
      {
        title: 'The Concern',
        kind: 'opening',
        text: 'A healthcare visitor needs clarity before beauty: services, reviews, insurance signals, and a route to an appointment that does not feel pushy.',
      },
      {
        title: 'The Care Path',
        kind: 'body',
        text: 'Athena organizes the trust hierarchy, Aphrodite softens the visual system, and Hermes keeps every call to action close to the next patient question.',
      },
      {
        title: 'The Promise',
        kind: 'closing',
        text: 'The static preview cannot schedule care, but it shows how the forge can make a clinic site feel credible, accessible, and composed.',
      },
    ],
  },
  {
    title: 'Summit Realty Finds the Next Chapter',
    subtitle: 'A real estate prompt becomes listings, neighborhoods, and lead paths.',
    sourceKind: 'Real estate template run',
    evidenceCount: 7,
    estimatedNarration: '2m 50s',
    createdAt: 'Static snapshot',
    sections: [
      {
        title: 'The Search',
        kind: 'opening',
        text: 'The visitor is not just looking for a property. They need a sense of neighborhood, confidence in the agent, and a way to compare without friction.',
      },
      {
        title: 'The Map',
        kind: 'body',
        text: 'Hermes gives the listings a path, Aphrodite makes the cards memorable, and Athena keeps proof visible where a buyer starts to hesitate.',
      },
      {
        title: 'The Lead',
        kind: 'closing',
        text: 'The route is a simulation, yet it shows a full niche story: discovery, comparison, trust, and consultation all on one generated website.',
      },
    ],
  },
];

export const demoMessages = [
  {
    speaker: 'Kronos',
    text: 'The fleet awaits your command. All systems operational.',
  },
  {
    speaker: 'Paul',
    text: 'Deploy Athena to scout the perimeter.',
  },
  {
    speaker: 'Athena',
    text: 'Boundary confirmed: this portfolio demo is static. No gateway calls, no tokens, no local machine actions.',
  },
  {
    speaker: 'TALOS',
    text: 'Gate condition set: typecheck passes, responsive UI checked, no secrets present, and release score above 95.',
  },
];

export const commanderState = {
  gatewayStatus: 'Gateway Connected (mock)',
  activeAgents: 3,
  lastSync: '2s ago',
  sessions: [
    {
      title: 'Fleet Status',
      preview: 'All systems operational.',
      count: 3,
      section: 'Today',
      unread: true,
    },
    {
      title: 'Temple Watch',
      preview: 'Athena secured the perimeter.',
      count: 8,
      section: 'Pinned',
      unread: false,
    },
    {
      title: 'Dawn Dispatch',
      preview: 'Hermes delivered the relay.',
      count: 12,
      section: 'Previous Sessions',
      unread: false,
    },
  ],
};

export const simulatorDeployLogLines = [
  'pantheon-demo: receiving static website brief',
  'kronos: splitting intent into design, content, frontend, and QA tracks',
  'hephaestus: scaffolding isolated project shell',
  'aphrodite: applying high-motion visual system',
  'apollo: composing responsive sections and conversion paths',
  'talos: checking accessibility, mobile layout, and static safety',
  'vercel: building preview artifact',
  'vercel: preview ready - static simulator only',
];

export const commanderAgents = [
  { id: 'kronos', name: 'Kronos', emoji: '⏳', role: 'Chamber keeper', color: '#D4AF37' },
  { id: 'zeus', name: 'Zeus', emoji: '🌩', role: 'Command', color: '#FFD700' },
  { id: 'hermes', name: 'Hermes', emoji: '⚡', role: 'Messaging', color: '#00D4AA' },
  { id: 'athena', name: 'Athena', emoji: '🦉', role: 'Security', color: '#8B5CF6' },
  { id: 'aphrodite', name: 'Aphrodite', emoji: '🌸', role: 'Design', color: '#F472B6' },
  { id: 'hephaestus', name: 'Hephaestus', emoji: '🔥', role: 'DevOps', color: '#EF4444' },
  { id: 'prometheus', name: 'Prometheus', emoji: '📊', role: 'Monitoring', color: '#3B82F6' },
  { id: 'auth', name: 'Auth', emoji: '🔒', role: 'Authentication', color: '#64748B' },
  { id: 'more', name: 'More', emoji: '+⋯', role: 'Overflow menu', color: '#9A9AA3' },
];

export const guardrails = [
  'No live OpenClaw calls',
  'No Supabase connection',
  'No local filesystem access',
  'No agent spawning',
  'No tokens or private data',
  'All content is hard-coded demo data',
];
