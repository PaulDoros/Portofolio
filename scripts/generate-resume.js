import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');
const resumePath = path.join(publicDir, 'resume.md');

const resume = {
  name: 'Paul Ionut Doros',
  title: 'Full-Stack Developer',
  summary:
    'Full-stack developer specializing in React, TypeScript, Remix/Next.js, Supabase, PostgreSQL, AI/RAG product features, subscriptions, analytics, and production-ready web applications.',
  links: ['adhistly.se', 'netpagecraft.com', 'dev-journey-five.vercel.app'],
  experience: [
    {
      company: 'WE AS WEB',
      role: 'Web Developer',
      period: 'Nov 2025 - Present',
      location: 'Remote',
      bullets: [
        'Currently building and maintaining modern web experiences for clients, with a focus on responsive interfaces, performance, and production-ready delivery.',
        'Developing responsive web applications and landing pages with React, TypeScript, Tailwind CSS, Remix/Next.js, Git/GitHub, and Vercel workflows.',
      ],
    },
    {
      company: 'ADHISTLY',
      role: 'Full-Stack AI Engineer',
      period: 'Nov 2025 - Present',
      location: 'Remote',
      website: 'https://adhistly.se',
      bullets: [
        'Built a production AI SaaS platform from scratch using React, TypeScript, Supabase, PostgreSQL, Edge Functions, Stripe, Resend, PostHog, and Vercel.',
        'Engineered a RAG-based AI chat assistant with embeddings, vector search, semantic retrieval, reranking, profile-aware prompting, streaming responses, voice input, and contextual article recommendations.',
        'Designed AI safeguards including clarification-before-recommendation flows, relevance ranking, low-confidence fallback questions, result limits, safety messaging, and prompt-controlled behavior.',
      ],
    },
  ],
  skills: [
    'React',
    'TypeScript',
    'Remix',
    'Next.js',
    'Supabase',
    'PostgreSQL',
    'Supabase Edge Functions',
    'Vector Search',
    'Embeddings',
    'Stripe',
    'Resend',
    'PostHog',
    'Vercel',
    'AI/RAG',
    'i18n',
    'Git/GitHub',
  ],
};

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

const lines = [];
lines.push(`# ${resume.name}`);
lines.push(`**${resume.title}**`);
lines.push('');
lines.push(resume.summary);
lines.push('');
lines.push(`Links: ${resume.links.join(' | ')}`);
lines.push('');
lines.push('## Experience');

for (const job of resume.experience) {
  lines.push(`### ${job.role} — ${job.company}`);
  lines.push(`${job.period} | ${job.location}${job.website ? ` | ${job.website}` : ''}`);
  for (const bullet of job.bullets) lines.push(`- ${bullet}`);
  lines.push('');
}

lines.push('## Technical Skills');
lines.push(resume.skills.join(' | '));
lines.push('');

fs.writeFileSync(resumePath, `${lines.join('\n')}\n`);
console.log(`Resume generated at ${resumePath}`);
