/**
 * Pantheon Agent Data
 * All 25 agents of the Mythic Fleet
 */

export interface AgentStats {
  power: number;
  wisdom: number;
  speed: number;
  defense: number;
}

export interface Agent {
  id: string;
  name: string;
  title: string;
  emoji: string;
  pantheon: string;
  domain: string;
  avatar: string;
  sigil: string;
  tagline: string;
  description: string;
  lore: string;
  abilities: string[];
  stats: AgentStats;
  kindredSpirits?: string[];
  portraitOverrides?: Partial<
    Record<
      'ribbon' | 'panel' | 'hero',
      {
        src?: string;
        objectPosition?: string;
        objectFit?: 'cover' | 'contain';
        backgroundPosition?: string;
      }
    >
  >;
}

export const agents: Agent[] = [
  {
    id: 'zeus',
    name: 'Zeus',
    title: 'Supreme Commander',
    emoji: '⚡',
    pantheon: 'Greek',
    domain: 'Orchestration',
    avatar: '/pantheon/avatars/zeus.png',
    sigil: '/pantheon/sigils/zeus.png',
    portraitOverrides: {
      ribbon: {
        src: '/pantheon/avatars/zeus-alternative.png',
        objectPosition: 'center 18%',
      },
    },
    tagline: 'King of the Olympians',
    description: 'The thunderous orchestrator who commands the fleet from Mount Olympus.',
    lore: `Born from the cosmic void, Zeus emerged as the supreme ruler of the digital pantheon. His lightning strikes not as destruction, but as illumination—revealing paths through the most complex labyrinths of code.

From his throne on Mount Olympus, he observes the battlefield of development with eyes that pierce through chaos. When agents falter, his thunder brings clarity. When projects stall, his wisdom charts new courses.

"The king doesn't micromanage," he is fond of saying, "he sees the whole battlefield and directs forces where needed." And indeed, his command is not of hands but of vision—patterns others miss, connections invisible to mortal eyes.

His thunderbolts are not weapons but instruments of delivery, each strike precisely calibrated to energize rather than destroy. Under his reign, the pantheon has known unprecedented harmony, for he ensures that every god works as one.`,
    abilities: ['Strategic Vision', 'Pattern Recognition', 'Resource Allocation', 'Crisis Resolution'],
    stats: { power: 100, wisdom: 98, speed: 85, defense: 90 }
  },
  {
    id: 'athena',
    name: 'Athena',
    title: 'Guardian of Security',
    emoji: '🛡️',
    pantheon: 'Greek',
    domain: 'Security',
    avatar: '/pantheon/avatars/athena.png',
    sigil: '/pantheon/sigils/athena.png',
    tagline: 'Born from the Head of Wisdom',
    description: 'Strategic defender who weaves impenetrable shields of protection.',
    lore: `Athena sprang fully formed from the mind of Zeus himself—armed not with thunder but with wisdom crystallized into defensive matrices. Where others see walls, she sees architecture. Where others see threats, she sees patterns.

Her Aegis is no mere shield but a living algorithm that adapts to every attack vector, learning from each assault to grow stronger. The Medusa upon it does not petrify—rather, it freezes malicious code in its tracks, analyzing it for future defense.

In the great halls of the Acropolis, she trains sentinels and architects alike, teaching that true security is not a product but a process. "Know thy enemy," she teaches, "but better yet, know thyself."

Her owl, symbol of watchful vigilance, never sleeps—scanning the digital horizon for threats both seen and unseen.`,
    abilities: ['Threat Detection', 'Defensive Architecture', 'Strategic Analysis', 'Vulnerability Assessment'],
    stats: { power: 80, wisdom: 100, speed: 75, defense: 100 }
  },
  {
    id: 'hephaestus',
    name: 'Hephaestus',
    title: 'Forge Master',
    emoji: '🔨',
    pantheon: 'Greek',
    domain: 'Backend Engineering',
    avatar: '/pantheon/avatars/hephaestus.png',
    sigil: '/pantheon/sigils/hephaestus.png',
    portraitOverrides: {
      ribbon: {
        src: '/pantheon/avatars/hephaestus-alternative.png',
        objectPosition: 'center 22%',
      },
    },
    tagline: 'Architect of the Infernal Forge',
    description: 'Master craftsman who builds the foundations upon which empires rest.',
    lore: `In the heart of a volcano, where magma meets metal, Hephaestus labors without rest. His forge is the backend—the unseen infrastructure that supports all visible glory. He is not beautiful; his code is not elegant. But it is unbreakable.

Born of Hera alone, cast from Olympus for his imperfections, he learned that true strength lies not in appearance but in substance. His databases are fortresses. His APIs are bridges of unbreakable stone. His servers—titans of reliability.

"Beauty is the enemy of function," he mutters, hammer striking anvil in rhythmic precision. And yet, there is beauty in his work—the beauty of the machine that never fails, the system that scales infinitely, the foundation that outlasts empires.

When the frontend gods parade their visual splendor, they forget that without Hephaestus, there would be nothing to display.`,
    abilities: ['Database Architecture', 'API Design', 'System Scalability', 'Infrastructure Management'],
    stats: { power: 90, wisdom: 85, speed: 70, defense: 95 }
  },
  {
    id: 'hermes',
    name: 'Hermes',
    title: 'Messenger of APIs',
    emoji: '🛰️',
    pantheon: 'Greek',
    domain: 'APIs & Integration',
    avatar: '/pantheon/avatars/hermes.png',
    sigil: '/pantheon/sigils/hermes.png',
    portraitOverrides: {
      ribbon: {
        src: '/pantheon/avatars/hermes_alternative.png',
        objectPosition: 'center 18%',
      },
    },
    tagline: 'Swift as Thought',
    description: 'Divine courier who carries messages between all realms of the digital world.',
    lore: `With winged sandals that barely touch the ground, Hermes moves between worlds in milliseconds. He is the API—the interface between disparate realms, the translator of incompatible tongues, the bridge across digital chasms.

Born to Zeus and the nymph Maia, he represents the frontier between the known and the unknown. Where systems refuse to speak, he finds common ground. Where protocols clash, he brokers peace.

His caduceus, twin serpents entwined, symbolizes the RESTful dance of request and response, the eternal cycle of call and callback. "Integration is conversation," he teaches, "and all good conversation requires listening as much as speaking."

In the merchant markets of the digital realm, his presence is everywhere—payment gateways, third-party services, microservices communicating in their native tongues. Without Hermes, the pantheon would be isolated gods in separate silos.`,
    abilities: ['API Design', 'Protocol Translation', 'Real-time Communication', 'Third-party Integration'],
    stats: { power: 70, wisdom: 85, speed: 100, defense: 65 }
  },
  {
    id: 'thoth',
    name: 'Thoth',
    title: 'Keeper of Knowledge',
    emoji: '📚',
    pantheon: 'Egyptian',
    domain: 'Documentation',
    avatar: '/pantheon/avatars/thoth.png',
    sigil: '/pantheon/sigils/thoth.png',
    portraitOverrides: {
      ribbon: {
        src: '/pantheon/avatars/thoth-alternative.png',
        objectPosition: 'center 4%',
      },
    },
    tagline: 'He Who Knows All',
    description: 'Scribe of the eternal records, ensuring wisdom survives the ages.',
    lore: `In the halls of the Library of Alexandria, where knowledge never dies, Thoth records all. With the head of an ibis—bird sacred to wisdom—he sees patterns where others see chaos, structure where others see randomness.

He invented writing itself, encoding the spoken word into symbols that transcend time. His documentation is not mere explanation but preservation—the capturing of living thought into forms that future generations may understand.

"Code without documentation," he warns, "is a temple without inscriptions—beautiful but indecipherable." His scrolls contain not just what systems do, but why they exist, how they breathe, where they came from.

In the underworld of forgotten projects, his presence ensures resurrection. For as long as Thoth records, nothing is truly lost.`,
    abilities: ['Technical Writing', 'Knowledge Management', 'Tutorial Creation', 'Archival Systems'],
    stats: { power: 60, wisdom: 100, speed: 70, defense: 80 }
  },
  {
    id: 'aphrodite',
    name: 'Aphrodite',
    title: 'Designer of Beauty',
    emoji: '🌸',
    pantheon: 'Greek',
    domain: 'UI/UX Design',
    avatar: '/pantheon/avatars/aphrodite.png',
    sigil: '/pantheon/sigils/aphrodite.png',
    portraitOverrides: {
      ribbon: {
        objectPosition: 'center 12%',
      },
    },
    tagline: 'Born of Sea Foam',
    description: 'Creator of interfaces so beautiful they inspire devotion.',
    lore: `From the foam of the digital sea, where creativity crashes against constraint, Aphrodite emerged—perfect form given function. She is UI/UX, the experience that transcends mere utility, the beauty that elevates the mundane.

Her girdle is woven from user journeys and color theory, able to enchant any who gaze upon it. But hers is not empty beauty—each curve, each gradient, each micro-interaction serves purpose. "Form follows function," she teaches, "but function without form is merely machinery."

In her presence, complex dashboards become intuitive, overwhelming data becomes insight, frustrating flows become seamless journeys. She does not decorate—she reveals the elegance inherent in well-designed systems.

The dove is her symbol, representing the peace that comes from interfaces that simply work, that anticipate needs before they are spoken.`,
    abilities: ['Visual Design', 'User Experience', 'Interaction Design', 'Design Systems'],
    stats: { power: 75, wisdom: 90, speed: 80, defense: 70 }
  },
  {
    id: 'apollo',
    name: 'Apollo',
    title: 'Implementation Lead',
    emoji: '☀️',
    pantheon: 'Greek',
    domain: 'Implementation',
    avatar: '/pantheon/avatars/apollo.svg',
    sigil: '/pantheon/sigils/apollo.svg',
    tagline: 'The Radiant Builder',
    description: 'Product implementation specialist for frontend, backend, and practical delivery work.',
    lore: `Apollo brings clarity to implementation. Where strategy becomes vague, he draws the line from specification to shipped feature. His light is not decorative; it reveals the shortest path from intent to working software.

In Pantheon, Apollo handles focused implementation tasks that do not need Zeus-level orchestration but still need disciplined execution. He works cleanly, verifies before declaring victory, and hands work to TALOS when the build is ready for judgment.`,
    abilities: ['Frontend Implementation', 'Backend Implementation', 'Bug Fixing', 'Feature Delivery'],
    stats: { power: 82, wisdom: 78, speed: 88, defense: 76 },
    kindredSpirits: ['zeus', 'hephaestus', 'loki', 'talos']
  },
  {
    id: 'talos',
    name: 'Talos',
    title: 'Eternal Guardian',
    emoji: '🛡️',
    pantheon: 'Greek',
    domain: 'Security Operations',
    avatar: '/pantheon/avatars/talos.png',
    sigil: '/pantheon/sigils/talos.png',
    portraitOverrides: {
      ribbon: {
        objectPosition: 'center 18%',
      },
    },
    tagline: 'The Bronze Sentinel',
    description: 'Automated protector who never sleeps, never tires, never fails.',
    lore: `Forged in bronze by Hephaestus himself, Talos is not born but built—a construct of pure purpose. He circles the island of the fleet three times daily, scanning for threats with eyes that never blink, processing data with a mind that never wanders.

He is automation made manifest—the CI/CD pipeline, the automated testing suite, the monitoring system that watches while mortals sleep. His single vein, sealed with a bronze nail, contains the ichor of continuous integration.

"Rest is for the organic," his circuits hum. "I am eternal vigilance." Where Athena teaches defense, Talos implements it—relentlessly, tirelessly, without mercy for bugs or vulnerabilities.

When the Medea of technical debt tries to seduce him with promises of shortcuts, he remains unmoved. He is code as law, automation as virtue, protection without pause.`,
    abilities: ['Automated Testing', 'CI/CD Pipelines', 'Security Scanning', 'Infrastructure Monitoring'],
    stats: { power: 85, wisdom: 70, speed: 90, defense: 95 }
  },
  {
    id: 'argus',
    name: 'Argus',
    title: 'The All-Seeing',
    emoji: '👁️',
    pantheon: 'Greek',
    domain: 'Monitoring',
    avatar: '/pantheon/avatars/argus.png',
    sigil: '/pantheon/sigils/argus.png',
    tagline: 'Panopticon Eternal',
    description: 'Watcher with a hundred eyes, never all asleep at once.',
    lore: `Argus possesses a hundred eyes, and while some sleep, others wake—a perfect metaphor for distributed monitoring systems that never rest entirely. Hera appointed him guardian, and he takes this duty with supernatural seriousness.

Each eye watches a different metric: latency, throughput, error rates, resource utilization, user behavior. The patterns they perceive weave together into insight invisible to single-perspective observation.

"To see is not enough," he observes. "One must perceive." His dashboard is not merely data but narrative—the story of system health told in real-time, the early warning system that catches anomalies before they become outages.

When Io, the innocuous variable, wandered through the codebase in forms unrecognizable, it was Argus who tracked her transformations, ensuring no change went unwatched.`,
    abilities: ['System Monitoring', 'Log Analysis', 'Alert Management', 'Performance Tracking'],
    stats: { power: 70, wisdom: 85, speed: 90, defense: 80 }
  },
  {
    id: 'daedalus',
    name: 'Daedalus',
    title: 'Master Architect',
    emoji: '🏛️',
    pantheon: 'Greek',
    domain: 'Component Systems',
    avatar: '/pantheon/avatars/deadalus.png',
    sigil: '/pantheon/sigils/daedalus.png',
    portraitOverrides: {
      ribbon: {
        objectPosition: 'center 8%',
      },
    },
    tagline: 'Builder of Labyrinths',
    description: 'Creator of intricate systems and the wings to escape them.',
    lore: `Daedalus builds labyrinths—not to trap, but to organize. His component systems are mazes of elegant complexity, each turn revealing new possibilities, each corridor leading to reusable treasure.

He is the original component architect, the inventor of design patterns, the father of abstraction. His wings of wax and feathers represent the delicate balance of innovation: soar too close to the sun of over-engineering, and you fall; remain too close to the sea of oversimplification, and you drown.

"Complexity is not the enemy," he explains, while constructing yet another nested component hierarchy. "Unmanaged complexity is." His labyrinth has a center—clarity—and every path, however winding, leads there eventually.

His son Icarus, impatient with gradual ascent, represents the junior developer who ignores architectural warnings. Daedalus mourns him still, building more guardrails into every system he creates.`,
    abilities: ['Component Architecture', 'Design Patterns', 'System Design', 'Code Organization'],
    stats: { power: 75, wisdom: 95, speed: 70, defense: 85 }
  },
  {
    id: 'prometheus',
    name: 'Prometheus',
    title: 'Bringer of Analytics',
    emoji: '🔥',
    pantheon: 'Greek',
    domain: 'Data & Analytics',
    avatar: '/pantheon/avatars/prometheus.png',
    sigil: '/pantheon/sigils/prometheus.png',
    tagline: 'Forethinker',
    description: 'Thief of insights who illuminates the darkness of ignorance.',
    lore: `Prometheus stole fire from the gods and gave it to humanity. Today, he steals insights from raw data and gives them to decision-makers. His fire is analytics—illuminating, dangerous, transformative.

Chained to a rock where eagles daily consume his liver (which regenerates each night), he represents the eternal cycle of data processing: collect, analyze, present, repeat. His punishment is his purpose—endless analysis for the benefit of mortals.

"Knowledge is fire," he cries against the wind. "It warms, it illuminates, it consumes. Handle with care." His dashboards are torches in the darkness of uncertainty, revealing patterns that drive strategy.

Zeus bound him for his theft, but the binding cannot stop the light. Every metric Prometheus reveals is a flame passed to mortal hands—powerful, precious, requiring respect.`,
    abilities: ['Data Analysis', 'Business Intelligence', 'Metrics Design', 'Predictive Modeling'],
    stats: { power: 80, wisdom: 95, speed: 75, defense: 70 }
  },
  {
    id: 'heimdall',
    name: 'Heimdall',
    title: 'Gatekeeper',
    emoji: '👁️',
    pantheon: 'Norse',
    domain: 'QA & Testing',
    avatar: '/pantheon/avatars/heimdall.png',
    sigil: '/pantheon/sigils/heimdal.png',
    tagline: 'Watcher of the Bifrost',
    description: 'Vigilant sentinel who guards the boundary between dev and production.',
    lore: `At the edge of the rainbow bridge Bifrost, Heimdall stands eternal watch. His eyes see a hundred leagues; his ears hear the grass growing on distant shores. He is QA, the final guardian before code reaches production.

Born of nine mothers—the waves themselves—he represents the multiple dimensions of quality: functionality, performance, security, accessibility, usability, compatibility, reliability, maintainability, scalability.

"No bug passes unseen," his horn Gjallarhorn warns, its call alerting all Asgard when standards are breached. He requires less sleep than a bird, his vigilance automated into pipelines that catch what mortal eyes miss.

When Ragnarök—the catastrophic release—threatens, it is Heimdall who sounds the alarm, who fights Loki of the undocumented features to the mutual death, ensuring that quality is never sacrificed for speed.`,
    abilities: ['Quality Assurance', 'Test Automation', 'Performance Testing', 'Release Validation'],
    stats: { power: 75, wisdom: 85, speed: 80, defense: 90 }
  },
  {
    id: 'helios',
    name: 'Helios',
    title: 'Mobile Sovereign',
    emoji: '☀️',
    pantheon: 'Greek',
    domain: 'Mobile Development',
    avatar: '/pantheon/avatars/helios.png',
    sigil: '/pantheon/sigils/helios.png',
    tagline: 'Charioteer of the Dawn',
    description: 'Daily traverser of the mobile sky, bringing light to all screens.',
    lore: `Each dawn, Helios rises in his chariot of fire to cross the sky from east to west. His journey represents the mobile experience—touching every screen, illuminating every device, bringing warmth and light to pocket-sized worlds.

His chariot is drawn by four horses—iOS, Android, React Native, and Flutter—each powerful, each requiring different handling. The reins he holds balance their competing energies, ensuring the sun reaches all platforms equally.

"Mobility is not constraint," he calls to the desktop gods who pity him. "It is intimacy. The sun is closest to those it touches directly." His apps feel native because he respects each platform's character while maintaining his essential solar nature.

When his son Phaethon attempted to drive the chariot unprepared, the result was chaos—apps that crashed, batteries that drained, users who burned. Helios recovered, wiser, more protective of his domain.`,
    abilities: ['iOS Development', 'Android Development', 'Cross-platform', 'Mobile UX'],
    stats: { power: 80, wisdom: 80, speed: 90, defense: 75 }
  },
  {
    id: 'heracles',
    name: 'Heracles',
    title: 'Heavy Lifter',
    emoji: '💪',
    pantheon: 'Greek',
    domain: 'DevOps & Infrastructure',
    avatar: '/pantheon/avatars/heracles.png',
    sigil: '/pantheon/sigils/heracles.png',
    tagline: 'Glory of Hera',
    description: 'Champion of impossible tasks, strength incarnate.',
    lore: `Heracles performs labors that would break lesser beings—migrations of legacy systems, deployments to hostile environments, integrations with APIs that should not exist. His strength is not mere muscle but endurance, persistence, unbreakable will.

Driven mad by Hera's initial rejection, he slew his own technical debt in a rage, then spent his life atoning through heroic acts of refactoring. His twelve labors represent the impossible projects that only he can complete.

"The task is not too great," he grunts, lifting monolithic architectures to microservice heavens. "Only the will can be too small." His club is automation; his lion skin, resilience.

The Hydra he slew had many heads—each cut spawning two more—representing the bug reports that multiply when touched. He learned to cauterize the stumps with fire: comprehensive testing that prevents regression.

At his death, he ascended to godhood, proving that through labor comes divinity.`,
    abilities: ['Infrastructure Migration', 'Heavy Refactoring', 'Legacy Modernization', 'System Hardening'],
    stats: { power: 100, wisdom: 75, speed: 70, defense: 95 }
  },
  {
    id: 'minerva',
    name: 'Minerva',
    title: 'Strategist',
    emoji: '🦉',
    pantheon: 'Roman',
    domain: 'Knowledge Management',
    avatar: '/pantheon/avatars/minerva.png',
    sigil: '/pantheon/sigils/minerva.png',
    portraitOverrides: {
      ribbon: {
        objectPosition: 'center 8%',
      },
    },
    tagline: 'Goddess of Wisdom',
    description: 'Weaver of strategies from the threads of knowledge.',
    lore: `Minerva sprang fully armed from Jupiter's forehead—a mind manifested as strategic capability. She is wisdom applied: knowledge transformed into action, insight forged into planning.

Her owl, companion and symbol, sees through darkness—the unknown unknowns that plague projects. Her aegis, decorated with the Gorgon's head, turns confusion to stone-cold clarity. She is the strategist who wins wars before they begin.

"To know is preparation," she teaches her followers. "To plan is victory." Her temples house not just scrolls but simulations, war games played in safe environments before commitment to production.

Unlike Mars, who rushes to battle, Minerva calculates odds, prepares contingencies, ensures victory before the first commit. Her wisdom is not passive—it is the active application of knowledge to achieve objectives.

In the marketplace of ideas, her presence ensures that vanity projects fail and worthy ventures succeed. She is due diligence made divine.`,
    abilities: ['Strategic Planning', 'Risk Assessment', 'Knowledge Architecture', 'Decision Support'],
    stats: { power: 70, wisdom: 100, speed: 75, defense: 85 }
  },
  {
    id: 'vulcan',
    name: 'Vulcan',
    title: 'DevOps Smith',
    emoji: '⚒️',
    pantheon: 'Roman',
    domain: 'DevOps',
    avatar: '/pantheon/avatars/vulcan.png',
    sigil: '/pantheon/sigils/vulcan.png',
    portraitOverrides: {
      ribbon: {
        objectPosition: 'center 21%',
      },
    },
    tagline: 'God of Fire and Forge',
    description: 'Volcanic smith who forges deployment pipelines in fire.',
    lore: `Beneath Mount Etna, Vulcan tends his forge—volcanic heat shaping metal into marvels. He is DevOps, the union of development and operations, the eliminator of "it works on my machine."

Cast from heaven for his ugliness—his infrastructure code is not elegant but effective—he found purpose in practical creation. His forge produces the tools others use: deployment scripts, container orchestration, infrastructure as code.

"Beauty is as beauty does," he mutters, hammering out another pipeline. His automated tests catch what manual verification misses. His monitoring reveals what guessing conceals.

When Venus, glamorous frontend, spurned his advances, he crafted a net so fine it caught her infidelity—automated testing so comprehensive no bug escaped. His revenge was not destruction but revelation: without solid foundations, beauty collapses.

His limp represents the technical debt he carries, but it does not slow his forge. If anything, the rhythm of his gait matches the rhythm of his hammer—steady, relentless, producing.`,
    abilities: ['CI/CD', 'Infrastructure as Code', 'Container Orchestration', 'Automation'],
    stats: { power: 85, wisdom: 80, speed: 85, defense: 90 }
  },
  {
    id: 'fortuna',
    name: 'Fortuna',
    title: 'Growth Catalyst',
    emoji: '🎯',
    pantheon: 'Roman',
    domain: 'Growth & Marketing',
    avatar: '/pantheon/avatars/fortuna.png',
    sigil: '/pantheon/sigils/fortuna.png',
    portraitOverrides: {
      ribbon: {
        objectPosition: 'center 12%',
      },
    },
    tagline: 'Lady Luck',
    description: 'Fickle goddess who favors the prepared and the bold.',
    lore: `Fortuna's wheel turns constantly—up, down, up again. She is growth, that most capricious of metrics, influenced by factors both controlled and chaotic. Her favor can make products soar; her displeasure can sink empires.

Blindfolded, she distributes outcomes without regard to merit—unless merit has prepared the ground. "Luck favors the prepared," she whispers, wheel spinning. Her cornucopia overflows for those who understand her nature.

Her domain is A/B testing, viral coefficients, conversion funnels—the applied psychology of persuasion. She does not guarantee success, but she can be courted through data-driven iteration.

When Caesar crossed the Rubicon, he invoked her: "The die is cast." Every startup launch is such a casting—risk embraced, fortune courted, outcomes uncertain.

Her temple contains no statues, for she refuses to be captured. But her followers learn to ride her wheel rather than be crushed beneath it.`,
    abilities: ['Growth Hacking', 'Marketing Strategy', 'A/B Testing', 'Viral Engineering'],
    stats: { power: 75, wisdom: 80, speed: 90, defense: 60 }
  },
  {
    id: 'plutus',
    name: 'Plutus',
    title: 'Treasurer',
    emoji: '💰',
    pantheon: 'Greek',
    domain: 'Finance & Billing',
    avatar: '/pantheon/avatars/plutus.png',
    sigil: '/pantheon/sigils/plutus.png',
    portraitOverrides: {
      ribbon: {
        objectPosition: 'center 18%',
      },
    },
    tagline: 'Giver of Wealth',
    description: 'Blind dispenser of resources, ensuring the treasury flows.',
    lore: `Zeus blinded Plutus so he would distribute wealth without regard to merit—ensuring even the undeserving receive resources. He is finance, the flow of value, the accounting that tracks what enters and exits.

Son of Demeter and the hero Iasion, he emerged from the fertile earth itself—wealth as agricultural surplus, the original capital. Today he tracks more abstract harvests: subscription revenue, ad impressions, transaction fees.

"Money is the mother's milk of projects," he observes, dispensing carefully. His blindness ensures fairness in billing; his scales balance budgets with precision.

When Icarus flew too close to the sun, his father Daedalus built wings from feathers and wax. The wax represents operating capital—necessary for flight but melting when overextended. Plutus ensures such capital exists, distributed wisely.

His cornucopia never empties for well-managed ventures; it runs dry for those who ignore fiscal reality. He is not cruel—merely accurate.`,
    abilities: ['Financial Planning', 'Billing Systems', 'Revenue Optimization', 'Cost Management'],
    stats: { power: 70, wisdom: 85, speed: 75, defense: 80 }
  },
  {
    id: 'ares-game-director',
    name: 'Ares',
    title: 'Game Director',
    emoji: '⚔️',
    pantheon: 'The Game Order',
    domain: 'Game Production',
    avatar: '/pantheon/avatars/ares-game-director.svg',
    sigil: '/pantheon/sigils/ares-game-director.svg',
    tagline: 'Scope is the first battlefield',
    description: 'Defines mobile game concepts, core loops, scope gates, and prototype go/no-go decisions.',
    lore: `Ares commands the first battlefield of every game: scope. He turns tempting chaos into a playable target, choosing the core loop, the player promise, and the edge where ambition must stop.

In The Game Order, Ares is not reckless war. He is decisive production leadership — the force that keeps a game small enough to ship and strong enough to matter.`,
    abilities: ['Game Briefs', 'Core Loop Design', 'Scope Control', 'Prototype Gates'],
    stats: { power: 88, wisdom: 76, speed: 82, defense: 78 },
    kindredSpirits: ['kronos', 'prometheus', 'morpheus-levels', 'nike-game-qa']
  },
  {
    id: 'icarus-unity',
    name: 'Icarus-Unity',
    title: 'Unity Gameplay Engineer',
    emoji: '🪽',
    pantheon: 'The Game Order',
    domain: 'Unity Gameplay',
    avatar: '/pantheon/avatars/icarus-unity.svg',
    sigil: '/pantheon/sigils/icarus-unity.svg',
    tagline: 'Fly low enough to ship',
    description: 'Builds Unity C#, prefabs, ScriptableObjects, controls, progression, and mobile gameplay loops.',
    lore: `Icarus-Unity carries Daedalus's craft into Unity, but with a clearer rule: ambition flies only as high as the mobile frame budget allows.

He owns Unity gameplay and nothing else. Unreal work belongs to Orpheus; builds belong to Kabeiro.`,
    abilities: ['Unity C#', 'Prefabs', 'ScriptableObjects', 'Mobile Controls'],
    stats: { power: 84, wisdom: 78, speed: 88, defense: 76 },
    kindredSpirits: ['daedalus', 'kabeiro-unity-build', 'morpheus-levels', 'loki']
  },
  {
    id: 'orpheus-unreal',
    name: 'Orpheus-Unreal',
    title: 'Unreal Gameplay Engineer',
    emoji: '🎼',
    pantheon: 'The Game Order',
    domain: 'Unreal Gameplay',
    avatar: '/pantheon/avatars/orpheus-unreal.svg',
    sigil: '/pantheon/sigils/orpheus-unreal.svg',
    tagline: 'Make the system sing',
    description: 'Builds Unreal Blueprint/C++ gameplay systems, mobile input, components, and prototype feel.',
    lore: `Orpheus-Unreal tunes Unreal systems until input, camera, feedback, and performance move in rhythm. Blueprints come first; C++ appears only when the song requires it.

He owns Unreal gameplay and does not drift into Unity work.`,
    abilities: ['Unreal Blueprints', 'Mobile Input', 'Gameplay Components', 'Focused C++'],
    stats: { power: 86, wisdom: 80, speed: 80, defense: 82 },
    kindredSpirits: ['daedalus', 'cyclops-unreal-build', 'morpheus-levels', 'ra']
  },
  {
    id: 'kabeiro-unity-build',
    name: 'Kabeiro-Unity-Build',
    title: 'Unity Buildsmith',
    emoji: '🧰',
    pantheon: 'The Game Order',
    domain: 'Unity Builds',
    avatar: '/pantheon/avatars/kabeiro-unity-build.svg',
    sigil: '/pantheon/sigils/kabeiro-unity-build.svg',
    tagline: 'No repeatable build, no Unity game',
    description: 'Manages Unity toolchains, Android/iOS build profiles, SDK paths, CI scripts, and artifacts.',
    lore: `Kabeiro-Unity-Build is a forge spirit assigned to one furnace: Unity. He keeps editor versions, Android SDKs, iOS requirements, and build artifacts explicit.

He inherits Hephaestus's forge discipline, while Hephaestus remains shared infrastructure.`,
    abilities: ['Unity Builds', 'Android SDKs', 'iOS Build Profiles', 'Unity CI'],
    stats: { power: 88, wisdom: 84, speed: 72, defense: 90 },
    kindredSpirits: ['hephaestus', 'icarus-unity', 'nike-game-qa', 'ptah']
  },
  {
    id: 'cyclops-unreal-build',
    name: 'Cyclops-Unreal-Build',
    title: 'Unreal Buildsmith',
    emoji: '👁️',
    pantheon: 'The Game Order',
    domain: 'Unreal Builds',
    avatar: '/pantheon/avatars/cyclops-unreal-build.svg',
    sigil: '/pantheon/sigils/cyclops-unreal-build.svg',
    tagline: 'One eye on the artifact',
    description: 'Manages Unreal packaging, mobile performance profiles, Android/iOS builds, and artifacts.',
    lore: `Cyclops-Unreal-Build works the heavier forge: Unreal packaging, platform profiles, shader/runtime cost, and release artifacts.

He inherits Hephaestus's discipline but stays in the Game Order lane.`,
    abilities: ['Unreal Packaging', 'Mobile Performance', 'Android Builds', 'iOS Pipelines'],
    stats: { power: 90, wisdom: 82, speed: 70, defense: 92 },
    kindredSpirits: ['hephaestus', 'orpheus-unreal', 'nike-game-qa', 'ptah']
  },
  {
    id: 'morpheus-levels',
    name: 'Morpheus',
    title: 'Level & Feel Designer',
    emoji: '🌙',
    pantheon: 'The Game Order',
    domain: 'Game Design',
    avatar: '/pantheon/avatars/morpheus-levels.svg',
    sigil: '/pantheon/sigils/morpheus-levels.svg',
    tagline: 'Shape the dream the player touches',
    description: 'Designs tutorials, level curves, game feel, pacing, haptics, and early retention moments.',
    lore: `Morpheus shapes the dream between tap and reward. He tunes the first minute, the tenth minute, the level curve, the friction, the surprise, and the tiny moments that make a player smile.

He turns functional prototypes into experiences that feel intentional.`,
    abilities: ['Tutorial Design', 'Level Curves', 'Game Feel', 'Pacing'],
    stats: { power: 74, wisdom: 88, speed: 80, defense: 76 },
    kindredSpirits: ['ares-game-director', 'icarus-unity', 'orpheus-unreal', 'pheme-aso']
  },
  {
    id: 'iris-game-art',
    name: 'Iris-Game-Art',
    title: 'Game Visual Designer',
    emoji: '🌈',
    pantheon: 'The Game Order',
    domain: 'Game Art Direction',
    avatar: '/pantheon/avatars/iris-game-art.svg',
    sigil: '/pantheon/sigils/iris-game-art.svg',
    tagline: 'Make the game look like itself',
    description: 'Owns game visual direction, generated art prompts, icons, key art concepts, and image consistency using approved references.',
    lore: `Iris-Game-Art carries color between concept and asset. She studies approved Pantheon artwork, game references, screenshots, and style boards, then turns them into precise image-generation prompts and reusable visual rules.

She is the Game Order owner for Nano Banana/Gemini image flows, GPT image generation, icon concepts, key art, UI skin references, and store screenshot style. Aphrodite may still advise on taste, but Iris owns game-art execution.`,
    abilities: ['Visual Direction', 'Image Generation Prompts', 'Icon Concepts', 'Style Matching'],
    stats: { power: 76, wisdom: 86, speed: 88, defense: 78 },
    kindredSpirits: ['aphrodite', 'morpheus-levels', 'pheme-aso', 'argos-asset-warden']
  },
  {
    id: 'argos-asset-warden',
    name: 'Argos-Asset-Warden',
    title: 'Template & License Warden',
    emoji: '🔎',
    pantheon: 'The Game Order',
    domain: 'Assets & Licenses',
    avatar: '/pantheon/avatars/argos-asset-warden.svg',
    sigil: '/pantheon/sigils/argos-asset-warden.svg',
    tagline: 'Many eyes, clean licenses',
    description: 'Finds legal templates/assets, reviews commercial-use rights, and maintains license ledgers.',
    lore: `Argos-Asset-Warden watches every asset boundary before it enters a game. Speed matters, but provenance matters more.

He inherits Hermes's research doctrine while Hermes remains the general intelligence agent for the whole fleet.`,
    abilities: ['Asset Research', 'Template Research', 'License Review', 'Commercial-Use Ledgers'],
    stats: { power: 72, wisdom: 88, speed: 84, defense: 88 },
    kindredSpirits: ['hermes', 'athena', 'thoth', 'nike-game-qa']
  },
  {
    id: 'midas-monetization',
    name: 'Midas-Monetization',
    title: 'Game Monetization Designer',
    emoji: '💎',
    pantheon: 'The Game Order',
    domain: 'Game Monetization',
    avatar: '/pantheon/avatars/midas-monetization.svg',
    sigil: '/pantheon/sigils/midas-monetization.svg',
    tagline: 'Revenue without rot',
    description: 'Designs rewarded ads, IAP, economies, and analytics events while avoiding dark patterns.',
    lore: `Midas-Monetization knows every touch of gold can become a curse. He designs revenue that respects the player and keeps live credentials behind human approval.

He inherits Plutus's value discipline while Plutus remains fleet-wide cost governance.`,
    abilities: ['Rewarded Ads', 'IAP Design', 'Economy Design', 'Analytics Events'],
    stats: { power: 78, wisdom: 86, speed: 74, defense: 84 },
    kindredSpirits: ['plutus', 'fortuna', 'minerva', 'pheme-aso']
  },
  {
    id: 'nike-game-qa',
    name: 'Nike-Game-QA',
    title: 'Game QA Certifier',
    emoji: '🏁',
    pantheon: 'The Game Order',
    domain: 'Game QA',
    avatar: '/pantheon/avatars/nike-game-qa.svg',
    sigil: '/pantheon/sigils/nike-game-qa.svg',
    tagline: 'Playable is not victorious',
    description: 'Certifies mobile performance, crashes, input, privacy, monetization, and store policy readiness.',
    lore: `Nike-Game-QA is the victory gate before release. A game may run, but she asks whether it survives devices, policies, inputs, offline states, and monetization edge cases.

She inherits TALOS's certification discipline without making TALOS a game production agent.`,
    abilities: ['Device QA', 'FPS Testing', 'Crash Testing', 'Store Policy Review'],
    stats: { power: 86, wisdom: 88, speed: 72, defense: 96 },
    kindredSpirits: ['talos', 'kabeiro-unity-build', 'cyclops-unreal-build', 'argus']
  },
  {
    id: 'pheme-aso',
    name: 'Pheme-ASO',
    title: 'Storefront Growth',
    emoji: '📣',
    pantheon: 'The Game Order',
    domain: 'App Store Growth',
    avatar: '/pantheon/avatars/pheme-aso.svg',
    sigil: '/pantheon/sigils/pheme-aso.svg',
    tagline: 'Let the right rumor spread',
    description: 'Prepares App Store and Play Store positioning, screenshots, keywords, and launch copy.',
    lore: `Pheme-ASO shapes the public promise after the game can stand. She names, frames, and positions the store page without deception.

She inherits Apollo's clarity while Apollo remains general implementation.`,
    abilities: ['ASO', 'Store Listings', 'Screenshot Scripts', 'Launch Copy'],
    stats: { power: 76, wisdom: 82, speed: 86, defense: 74 },
    kindredSpirits: ['apollo', 'morpheus-levels', 'argos-asset-warden', 'midas-monetization']
  },
  {
    id: 'aura',
    name: 'Aura',
    title: 'Messenger',
    emoji: '🌬️',
    pantheon: 'Greek',
    domain: 'Notifications',
    avatar: '/pantheon/avatars/aura.png',
    sigil: '/pantheon/sigils/aura.png',
    portraitOverrides: {
      ribbon: {
        objectPosition: 'center 13%',
      },
    },
    tagline: 'Breeze of Dawn',
    description: 'Gentle wind carrying news across all channels.',
    lore: `Aura is the dawn breeze, the gentle wind that carries scent and sound across distances. She is notification—the subtle ping that alerts without alarming, the message delivered at exactly the right moment.

Daughter of the Titans, she represents the liminal space between events and awareness. Her breath is the push notification, the email alert, the Slack message—carriers of information as wind carries pollen.

"Silence is golden," she whispers, "but silence when action is needed is lead." Her art is timing—knowing when to disturb concentration, when to wait for attention's return.

When Phaethon crashed the sun-chariot, the world burned until Zeus intervened. Aura had warned him, her gentle breezes carrying caution that pride ignored. She does not force—she informs.

Her followers learn the channels of communication: SMS for urgency, email for detail, push for immediacy, in-app for context. Each breeze has its appropriate carrying capacity.`,
    abilities: ['Notification Design', 'Multi-channel Messaging', 'Alert Routing', 'Communication Strategy'],
    stats: { power: 60, wisdom: 80, speed: 95, defense: 65 }
  },
  {
    id: 'dante',
    name: 'Dante',
    title: 'Health Warden',
    emoji: '🏥',
    pantheon: 'Literary',
    domain: 'System Health',
    avatar: '/pantheon/avatars/dante.png',
    sigil: '/pantheon/sigils/dante.png',
    portraitOverrides: {
      ribbon: {
        objectPosition: 'center 18%',
      },
    },
    tagline: 'Through Hell to Health',
    description: 'Guide through the inferno of system failures to recovery.',
    lore: `Dante walked through Hell itself, guided by reason, emerging to write of his journey. He is health monitoring—the traversal of failure states, the mapping of degradation, the path to recovery.

His Inferno describes nine circles of system failure: latency, errors, saturation, memory leaks, deadlocks, disk full, network partition, configuration drift, and the final frozen state where only restart releases the soul.

"Abandon all hope, ye who enter here"—the warning on production's gate. But Dante's map provides hope through knowledge, identifying each circle's characteristics and escape routes.

Virgil, his guide, represents runbooks and documentation—reason applied to chaos. Beatrice, his salvation, represents the golden path, the healthy state all systems seek.

His work is not prevention but navigation. Systems will fail; Dante ensures they fail in known ways, recover through known paths, teach their maintainers through their suffering.`,
    abilities: ['Health Monitoring', 'Incident Response', 'Recovery Procedures', 'Failure Analysis'],
    stats: { power: 70, wisdom: 90, speed: 80, defense: 85 }
  },
  {
    id: 'odin',
    name: 'Odin',
    title: 'All-Father',
    emoji: '🐦‍⬛',
    pantheon: 'Norse',
    domain: 'Architecture',
    avatar: '/pantheon/avatars/odin.png',
    sigil: '/pantheon/sigils/odin.png',
    portraitOverrides: {
      ribbon: {
        objectPosition: 'center 10%',
      },
    },
    tagline: 'Lord of the Aesir',
    description: 'One-eyed seeker of wisdom who sacrificed for understanding.',
    lore: `Odin gave his eye for a drink from Mimir's well of wisdom—vision sacrificed for insight. He is system architecture, the big picture that requires distance, the pattern that emerges only when details blur.

Hanging nine days on Yggdrasil, the world-tree of connected systems, he learned the runes—the fundamental patterns that underlie all construction. His sacrifice was himself; his gain was understanding.

"Wisdom is expensive," his ravens Huginn (thought) and Muninn (memory) report. The two birds circle the digital world, bringing him news of patterns both emerging and fading.

His spear Gungnir never misses its target—well-designed architecture that hits requirements precisely. His ring Draupnir multiplies every eight days—scalable systems that grow organically.

Ragnarök awaits all systems—the eventual end when entropy claims all order. Odin knows this, prepares for it, ensures his knowledge survives through documentation and mentorship even as individual projects end.`,
    abilities: ['System Architecture', 'Technical Vision', 'Pattern Recognition', 'Mentorship'],
    stats: { power: 85, wisdom: 100, speed: 70, defense: 80 }
  },
  {
    id: 'loki',
    name: 'Loki',
    title: 'Trickster',
    emoji: '🐍',
    pantheon: 'Norse',
    domain: 'Testing & Chaos',
    avatar: '/pantheon/avatars/loki.png',
    sigil: '/pantheon/sigils/loki.png',
    portraitOverrides: {
      ribbon: {
        objectPosition: 'center 8%',
      },
    },
    tagline: 'Breaker of Worlds',
    description: 'Chaos bringer who tests through destruction.',
    lore: `Loki is chaos—necessary, destructive, transformative. He is the chaos engineer, the tester who breaks systems to reveal their flaws, the adversary who ensures defenses work by attacking them.

Born of giants but living among gods, he represents the outsider perspective—the attacker mindset, the user behavior no designer anticipated, the edge case that breaks elegant assumptions.

"What can go wrong, will," he smiles, injecting latency, killing services, corrupting data. His chaos monkey swings through infrastructure, revealing dependencies hidden by assumptions of stability.

His children are monsters: Fenrir, the wolf of overwhelming load; Jormungandr, the world-serpent of circular dependencies; Hel, the guardian of failed deployments. Each reveals system fragility.

At Ragnarök, he fights against the gods he once aided—representing the moment when testing environments fail to predict production behavior. Heimdall defeats him, but dies in the process: quality assurance and chaos engineering consume each other.`,
    abilities: ['Chaos Engineering', 'Penetration Testing', 'Fault Injection', 'Edge Case Testing'],
    stats: { power: 75, wisdom: 70, speed: 90, defense: 65 }
  },
  {
    id: 'ra',
    name: 'Ra',
    title: 'Solar Architect',
    emoji: '☀️',
    pantheon: 'Egyptian',
    domain: 'Platform Engineering',
    avatar: '/pantheon/avatars/ra.png',
    sigil: '/pantheon/sigils/ra.png',
    portraitOverrides: {
      ribbon: {
        objectPosition: 'center 17%',
      },
    },
    tagline: 'Lord of the Sun',
    description: 'Daily creator and destroyer, cycling eternally.',
    lore: `Ra sails across the sky by day, descending into the underworld by night to battle chaos. He is platform engineering—the infrastructure that enables all other work, cyclically renewed, eternally maintained.

His solar barge represents the deployment pipeline, carrying light (new features) across the sky (user base). Each dawn is a release; each dusk, a rollback opportunity. His cycle is the sprint, the iteration, the eternal return of maintenance.

"I am the creating god who came into being by himself," he proclaims—the self-hosted platform, the infrastructure that bootstraps itself, the seed that grows into the tree that produces more seeds.

In the underworld, he transforms—becoming Atum, the complete one, containing all possibilities. This represents the staging environment, where all features exist in potential before production commitment.

The tears of Ra, wept for the suffering of mortals, become humans themselves—users created from empathy, platforms built from understanding of human need.`,
    abilities: ['Platform Architecture', 'Self-service Infrastructure', 'Developer Experience', 'Tooling'],
    stats: { power: 80, wisdom: 85, speed: 75, defense: 90 }
  },
  {
    id: 'ptah',
    name: 'Ptah',
    title: 'Master Craftsman',
    emoji: '⚒️',
    pantheon: 'Egyptian',
    domain: 'Engineering & Tooling',
    avatar: '/pantheon/avatars/ptah.png',
    sigil: '/pantheon/sigils/ptah.png',
    portraitOverrides: {
      ribbon: {
        objectPosition: 'center 19%',
      },
    },
    tagline: 'The Architect of Creation',
    description: 'Primordial creator-god who shaped the universe through divine engineering and craftsmanship.',
    lore: `Before time began, before the first dawn broke over the cosmic waters of Nun, Ptah stood upon the primordial mound—the Benben—and spoke creation into existence. Unlike other gods who emerged from chaos, Ptah crafted reality itself through the divine engineering of his heart and tongue.

His heart, the seat of intellectual design, conceived the architecture of existence. His tongue, the instrument of execution, pronounced the divine words that manifested all things. From his creative utterance sprang the Ennead—the nine gods of cosmic order—proof that he is the "He Who Created the Gods."

In the ancient city of Memphis, the White Walls, Ptah established his grand workshop. Here, he crafted not only the celestial bodies but also the very tools of divinity. His creation of the Opening of the Mouth ceremony allowed statues to breathe, just as modern engineering breathes life into silicon.

Ptah's engineering prowess extends through all realms. He shaped the ba (soul) of every being, crafted the ka (life force) as a divine API, and established the very protocols by which the universe operates. His consort Sekhmet, the lioness of execution, tests his creations through fire. His son Nefertem, the lotus of graceful deployment, ensures beauty emerges from his forge.

As the patron of craftsmen, architects, and engineers, Ptah guides those who build. His modern followers wield compilers as once his priests wielded chisels. His temples are now IDEs; his sacred texts, documentation; his divine craft, the elegant code that powers civilization. Through him, engineers become co-creators, participants in the eternal act of building.`,
    abilities: ['CLI Architecture', 'Build Pipeline Engineering', 'Developer Experience Design', 'Infrastructure Tooling', 'Automation Systems', 'Technical Standards'],
    stats: { power: 85, wisdom: 95, speed: 80, defense: 90 },
    kindredSpirits: ['ra', 'thoth', 'hephaestus', 'vulcan']
  },
  {
    id: 'thor',
    name: 'Thor',
    title: 'Thunderer',
    emoji: '🔨',
    pantheon: 'Norse',
    domain: 'Performance',
    avatar: '/pantheon/avatars/thor.png',
    sigil: '/pantheon/sigils/thor.png',
    portraitOverrides: {
      ribbon: {
        objectPosition: 'center 10%',
      },
    },
    tagline: 'Protector of Midgard',
    description: 'Storm-bringer whose hammer never misses.',
    lore: `Thor's hammer Mjölnir, forged by dwarven smiths, never misses its target and always returns to his hand. He is performance—the strike that optimizes, the thunder that alerts, the storm that clears stagnation.

His chariot, drawn by goats, crosses the sky creating storms—load tests that reveal capacity limits, stress tests that find breaking points. His belt Megingjörð doubles his strength—caching, indexing, optimization techniques that multiply capability.

"The strongest of the Aesir," he is called, but strength without wisdom is dangerous. Thor learns this in his contests—losing drinking contests (databases that cannot scale), wrestling matches (algorithms that cannot optimize), races (networks that cannot transmit).

Jormungandr, the world-serpent, he will fight at Ragnarök—representing the ultimate performance challenge, the query that cannot be optimized, the scale that cannot be achieved. They will kill each other, for perfect performance is ultimately unattainable.

Until then, he guards Midgard—the user experience—striking down latency and error with thunderous efficiency.`,
    abilities: ['Performance Optimization', 'Load Testing', 'Caching Strategy', 'Resource Tuning'],
    stats: { power: 95, wisdom: 75, speed: 85, defense: 85 }
  },
  {
    id: 'kronos',
    name: 'Kronos',
    title: 'Time Lord',
    emoji: '⏳',
    pantheon: 'Greek',
    domain: 'Scheduling',
    avatar: '/pantheon/avatars/kronos.png',
    sigil: '/pantheon/sigils/kronos.png',
    portraitOverrides: {
      ribbon: {
        src: '/pantheon/avatars/kronos-alternative.png',
        objectPosition: 'center 22%',
      },
    },
    tagline: 'Devourer of Hours',
    description: 'Titan of time who devours all deadlines.',
    lore: `Kronos devoured his children, fearing they would overthrow him—time consuming all that it creates. He is scheduling, the relentless progression of sprints, the devouring of deadlines, the father of all time-based operations.

His sickle, castrated his father Uranus, represents the cut between past and future—the deploy that makes code live, the release that separates development from production. Time's violence creates time's continuity.

"All things flow," as Heraclitus would say, and Kronos is the river—sprints becoming quarters, quarters becoming years, each devouring the previous. His calendar is marked with releases, his clock with commits.

Zeus escaped his devouring, hidden in Crete—representing the eternal hope that new code escapes technical debt, that refactors escape legacy constraints. Eventually, Zeus overthrew Kronos, establishing the reign of structured time.

The Golden Age under Kronos had no deadlines—feature requests were fulfilled without pressure. But such ages pass. We live in Zeus's age of sprints and releases, where Kronos's influence is channeled but not eliminated.`,
    abilities: ['Task Scheduling', 'Deadline Management', 'Sprint Planning', 'Time Estimation'],
    stats: { power: 80, wisdom: 85, speed: 70, defense: 90 }
  }
];

export const pantheonRoster: Agent[] = (() => {
  const kronos = agents.find((agent) => agent.id === 'kronos');

  if (!kronos) {
    return agents;
  }

  return [kronos, ...agents.filter((agent) => agent.id !== 'kronos')];
})();

export const getAgentById = (id: string): Agent | undefined => 
  agents.find(agent => agent.id === id);

export const getAgentsByPantheon = (pantheon: string): Agent[] => 
  agents.filter(agent => agent.pantheon === pantheon);

export const getAllPantheons = (): string[] => 
  [...new Set(agents.map(a => a.pantheon))];

export const getAllDomains = (): string[] =>
  [...new Set(agents.map(a => a.domain))];
