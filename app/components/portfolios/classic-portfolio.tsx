import { Link } from '@remix-run/react';
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import type { MouseEvent } from 'react';

import { ContactForm } from '~/components/contact-form';
import { ProjectCard } from '~/components/projects/project-card';
import { ClassicAbout } from '~/components/sections/classic-about';
import { ClassicHero } from '~/components/sections/classic-hero';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Progress } from '~/components/ui/progress';
import { Separator } from '~/components/ui/separator';
import { featuredProjects } from '~/data/portfolio-projects';
import { Layout } from '../layout/layout';

interface ClassicPortfolioProps {
  onAdultLinkClick: (url: string, siteName: string) => (e: MouseEvent) => void;
}

const skillGroups = [
  {
    title: 'Product Engineering',
    skills: [
      { name: 'React / Remix / Next.js', value: 100 },
      { name: 'TypeScript', value: 100 },
      { name: 'Supabase / PostgreSQL', value: 95 },
      { name: 'Stripe / SaaS Workflows', value: 92 },
    ],
  },
  {
    title: 'Systems and Automation',
    skills: [
      { name: 'Agent Orchestration', value: 100 },
      { name: 'AI/RAG Product Flows', value: 96 },
      { name: 'Game Pipelines', value: 92 },
      { name: 'Performance Optimization', value: 95 },
    ],
  },
];

const technologyGroups = [
  {
    title: 'Frontend',
    items: ['React', 'TypeScript', 'Remix', 'Next.js', 'React Native', 'Tailwind CSS'],
  },
  {
    title: 'AI and Data',
    items: ['Supabase', 'PostgreSQL', 'Vector Search', 'OpenAI APIs', 'RAG', 'Analytics'],
  },
  {
    title: 'Automation',
    items: ['OpenClaw', 'Codex', 'Claude', 'Kimi', 'Agent Protocols', 'QA Gates'],
  },
  {
    title: 'Games and Delivery',
    items: ['Unity', 'Unreal Engine', 'Android', 'Blender', 'Vercel', 'Runbooks'],
  },
];

const contactItems = [
  {
    label: 'Email',
    value: 'dorospaul26@gmail.com',
    href: 'mailto:dorospaul26@gmail.com',
    icon: Mail,
  },
  {
    label: 'GitHub',
    value: 'github.com/PaulDoros',
    href: 'https://github.com/PaulDoros',
    icon: Github,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/paul-doros-3468a2177',
    href: 'https://www.linkedin.com/in/paul-doros-3468a2177',
    icon: Linkedin,
  },
  {
    label: 'Location',
    value: 'Sibiu, Romania',
    icon: MapPin,
  },
  {
    label: 'Phone',
    value: '+40 756 436 531',
    icon: Phone,
  },
];

export function ClassicPortfolio({ onAdultLinkClick }: ClassicPortfolioProps) {
  return (
    <Layout>
      <div className="classic-version">
        <ClassicHero />
        <ClassicAbout />

        <section id="projects" className="pantheon-static-section py-20">
          <div className="container mx-auto px-4">
            <div className="mb-16 flex flex-col items-center text-center">
              <Badge className="mb-4">My Work</Badge>
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">Featured Systems and Products</h2>
              <Separator className="mb-6 w-24" />
              <p className="max-w-3xl leading-7 text-muted-foreground">
                A focused look at the strongest work: shipped SaaS, Pantheon automation, agent
                orchestration, game pipelines, and safe demos of the systems behind the builds.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  compact
                  onAdultLinkClick={onAdultLinkClick}
                />
              ))}
            </div>

            <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild>
                <Link to="/pantheon-demo">Open Pantheon Demo</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/projects">View All Projects</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="skills" className="pantheon-static-section bg-muted/50 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-16 flex flex-col items-center text-center">
              <Badge className="mb-4">Expertise</Badge>
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">My Skills</h2>
              <Separator className="mb-6 w-24" />
              <p className="max-w-2xl text-muted-foreground">
                Product engineering, AI automation, game prototyping, and the operating discipline
                needed to ship complete systems.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              {skillGroups.map(group => (
                <div key={group.title}>
                  <h3 className="mb-6 text-xl font-semibold">{group.title}</h3>
                  <div className="space-y-6">
                    {group.skills.map(skill => (
                      <div key={skill.name}>
                        <div className="mb-2 flex justify-between gap-4">
                          <span className="font-medium">{skill.name}</span>
                          <span>{skill.value}%</span>
                        </div>
                        <Progress value={skill.value} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16">
              <h3 className="mb-6 text-center text-xl font-semibold">Technologies I Work With</h3>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {technologyGroups.map(group => (
                  <div key={group.title} className="space-y-4">
                    <h4 className="font-medium">{group.title}</h4>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map(item => (
                        <Badge key={item} className="px-4 py-2">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="pantheon-static-section py-20">
          <div className="container mx-auto px-4">
            <div className="mb-16 flex flex-col items-center text-center">
              <Badge className="mb-4">Get In Touch</Badge>
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">Contact Me</h2>
              <Separator className="mb-6 w-24" />
              <p className="max-w-2xl text-muted-foreground">
                Have a project in mind or want to talk about product, automation, games, or AI
                systems? Reach out.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <ContactForm />

              <div>
                <h3 className="mb-6 text-xl font-semibold">Contact Information</h3>
                <div className="space-y-6">
                  {contactItems.map(item => {
                    const Icon = item.icon;
                    const content = (
                      <>
                        <h4 className="font-medium">{item.label}</h4>
                        <p className="break-words text-muted-foreground">{item.value}</p>
                      </>
                    );

                    return (
                      <div key={item.label} className="flex items-start gap-4">
                        <div className="rounded-full bg-primary/10 p-3">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          {item.href ? (
                            <a
                              href={item.href}
                              target={item.href.startsWith('http') ? '_blank' : undefined}
                              rel={
                                item.href.startsWith('http') ? 'noopener noreferrer' : undefined
                              }
                              className="hover:text-primary"
                            >
                              {content}
                            </a>
                          ) : (
                            content
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-12">
                  <h3 className="mb-6 text-xl font-semibold">Available For</h3>
                  <ul className="space-y-3">
                    {['Full-time positions', 'Freelance projects', 'Consulting', 'Remote work'].map(
                      item => (
                        <li key={item} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                          <span>{item}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
