import type { MetaFunction } from '@remix-run/node';
import type { MouseEvent } from 'react';
import { useState } from 'react';

import { AdultContentModal } from '~/components/adult-content-modal';
import { Layout } from '~/components/layout/layout';
import { ProjectCard } from '~/components/projects/project-card';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';
import { portfolioProjects, portfolioStats, projectCategories } from '~/data/portfolio-projects';

export const meta: MetaFunction = () => {
  return [
    { title: 'Projects | Paul Ionut Doros' },
    {
      name: 'description',
      content:
        'A showcase of Paul Doros projects across AI SaaS, Pantheon automation, agent systems, games, templates, and production deployments.',
    },
  ];
};

export default function Projects() {
  const [showAdultWarning, setShowAdultWarning] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);
  const [pendingSiteName, setPendingSiteName] = useState<string>('');

  const handleAdultLinkClick = (url: string, siteName: string) => (event: MouseEvent) => {
    event.preventDefault();
    setPendingUrl(url);
    setPendingSiteName(siteName);
    setShowAdultWarning(true);
  };

  const handleConfirmAdultContent = () => {
    if (pendingUrl) {
      window.open(pendingUrl, '_blank');
      setShowAdultWarning(false);
      setPendingUrl(null);
      setPendingSiteName('');
    }
  };

  return (
    <Layout>
      <section className="pb-20 pt-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-14 max-w-4xl text-center">
            <Badge className="mb-4">Portfolio Systems</Badge>
            <h1 className="mb-6 w-full max-w-full text-3xl font-bold leading-tight tracking-normal sm:text-4xl md:text-6xl">
              <span className="block">Products & agents,</span>
              <span className="block">games &</span>
              <span className="block">automation,</span>
              <span className="block">built end to end.</span>
            </h1>
            <Separator className="mx-auto mb-6 w-24" />
            <p className="mx-auto max-w-[18rem] text-base leading-7 text-muted-foreground sm:max-w-3xl md:text-lg">
              <span className="block sm:hidden">
                <span className="block">Shipped SaaS.</span>
                <span className="block">Pantheon agents.</span>
                <span className="block">Games, templates,</span>
                <span className="block">deployments, and safe demos.</span>
              </span>
              <span className="hidden sm:inline">
                This portfolio now shows the full range: shipped SaaS products, the Pantheon agent
                operating system, game pipelines, reusable templates, client deployments, and safe
                demos of automation that would normally run locally.
              </span>
            </p>
          </div>

          <div className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {portfolioStats.map(stat => (
              <div
                key={stat.label}
                className="rounded-lg border bg-background/90 p-5 text-center shadow-sm"
              >
                <div className="text-2xl font-bold sm:text-3xl">{stat.value}</div>
                <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="mb-14 rounded-lg border bg-muted/35 p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
              <div>
                <Badge variant="outline" className="mb-3">
                  Safe showcase
                </Badge>
                <h2 className="mb-3 text-2xl font-semibold md:text-3xl">
                  Pantheon demo is visual only.
                </h2>
                <p className="text-sm leading-6 text-muted-foreground md:text-base">
                  The demo page mimics creating projects, routing work to agents, tracking quality
                  gates, and chatting through a build plan. It is intentionally hard-coded: no
                  credentials, no local filesystem calls, no Supabase access, and no agent spawning.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
                <Button asChild>
                  <a href="/pantheon-demo">Open Pantheon Demo</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/#contact">Discuss a Project</a>
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-20">
            {projectCategories.map(category => {
              const categoryProjects = portfolioProjects.filter(
                project => project.category === category
              );

              if (categoryProjects.length === 0) {
                return null;
              }

              return (
                <section key={category} aria-labelledby={`${category}-heading`}>
                  <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                      <Badge variant="outline" className="mb-3">
                        {categoryProjects.length} projects
                      </Badge>
                      <h2 id={`${category}-heading`} className="text-2xl font-semibold md:text-3xl">
                        {category}
                      </h2>
                    </div>
                    <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                      {category === 'Pantheon & Automation'
                        ? 'The operating systems, agents, safety gates, and automation layers behind the builds.'
                        : category === 'Games & Interactive'
                          ? 'Mobile game prototypes, asset pipelines, engine validation, and store-readiness work.'
                          : category === 'AI Products & SaaS'
                            ? 'Products with real user flows, subscriptions, data, and AI-powered workflows.'
                            : category === 'Client & Commercial'
                              ? 'Client-facing deployments and reusable business systems.'
                              : 'Research, starter systems, and repeatable foundations for faster builds.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {categoryProjects.map(project => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onAdultLinkClick={handleAdultLinkClick}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>

        <AdultContentModal
          isOpen={showAdultWarning}
          onClose={() => {
            setShowAdultWarning(false);
            setPendingUrl(null);
            setPendingSiteName('');
          }}
          onConfirm={handleConfirmAdultContent}
          siteName={pendingSiteName}
        />
      </section>
    </Layout>
  );
}
