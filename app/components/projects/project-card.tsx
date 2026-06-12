import { Link } from '@remix-run/react';
import { ExternalLink, Github, ShieldCheck } from 'lucide-react';
import { forwardRef } from 'react';
import type { AnchorHTMLAttributes, MouseEvent } from 'react';

import type { PortfolioProject } from '~/data/portfolio-projects';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';

interface ProjectCardProps {
  project: PortfolioProject;
  compact?: boolean;
  onAdultLinkClick?: (url: string, siteName: string) => (event: MouseEvent) => void;
}

interface ProjectLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

const ProjectLink = forwardRef<HTMLAnchorElement, ProjectLinkProps>(
  ({ href, children, ...props }, ref) => {
    if (href.startsWith('/')) {
      return (
        <Link to={href} ref={ref} {...props}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} target="_blank" rel="noopener noreferrer" ref={ref} {...props}>
        {children}
      </a>
    );
  }
);

ProjectLink.displayName = 'ProjectLink';

function getDemoHref(project: PortfolioProject) {
  if (project.isAdult) {
    return '#';
  }

  return project.demoUrl ?? '#';
}

export function ProjectCard({ project, compact = false, onAdultLinkClick }: ProjectCardProps) {
  const features = compact ? project.keyFeatures.slice(0, 3) : project.keyFeatures;
  const technologies = compact ? project.technologies.slice(0, 6) : project.technologies;
  const demoClick =
    project.isAdult && project.demoUrl && onAdultLinkClick
      ? onAdultLinkClick(project.demoUrl, project.title)
      : undefined;

  return (
    <Card className="portfolio-project-card group flex h-full flex-col overflow-hidden rounded-lg border-black/10 bg-[#fbf7ee]/95 shadow-none backdrop-blur-sm motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:-translate-y-1 hover:border-[#9d6b25]/50 hover:shadow-[0_26px_80px_rgba(23,21,18,0.16)] dark:border-white/10 dark:bg-[#11100e]/95">
      <div className="relative aspect-[1.35/1] overflow-hidden bg-[#ded5c6] dark:bg-[#1b1915]">
        <img
          src={project.image}
          alt={`${project.title} project preview`}
          className={`h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.045] ${
            project.isAdult ? 'blur-xl' : ''
          }`}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-80" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <Badge className="rounded-full border-white/20 bg-black/55 text-[#fbf4e7] shadow-sm backdrop-blur">
            {project.status}
          </Badge>
        </div>
        {project.demoUrl?.startsWith('/pantheon-demo') ? (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-md border border-amber-300/50 bg-black/70 px-2.5 py-1 text-xs font-medium text-amber-100 backdrop-blur">
            <ShieldCheck className="h-3.5 w-3.5" />
            Static safe demo
          </div>
        ) : null}
      </div>

      <CardHeader className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge
            variant="outline"
            className="rounded-full border-[#9d6b25]/25 text-[11px] uppercase tracking-[0.18em] text-[#7a4d11] dark:text-[#f1c46b]"
          >
            {project.category}
          </Badge>
        </div>
        <div>
          <CardTitle className="text-2xl font-black leading-tight tracking-normal">
            {project.title}
          </CardTitle>
          <CardDescription className="mt-2 leading-relaxed text-[#645b50] dark:text-[#bfb3a1]">
            {project.description}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="mb-4 text-sm leading-6 text-[#5f574d] dark:text-[#cabfaa]">
          {project.content}
        </p>
        <p className="mb-4 rounded-md border border-[#9d6b25]/25 bg-[#9d6b25]/10 px-3 py-2 text-xs font-semibold leading-5 text-[#5f4015] dark:text-[#f1d89e]">
          {project.impact}
        </p>
        <div className="mb-4 space-y-2">
          <h4 className="text-sm font-semibold uppercase tracking-[0.16em]">Key Features</h4>
          <ul className="space-y-1.5 text-sm leading-5 text-[#5f574d] dark:text-[#cabfaa]">
            {features.map(feature => (
              <li key={feature} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9d6b25]/70" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-2">
          {technologies.map(tech => (
            <Badge
              key={tech}
              variant="secondary"
              className="rounded-full bg-[#171512]/[0.07] text-[#30291f] hover:bg-[#171512]/10 dark:bg-white/10 dark:text-[#efe3d0] dark:hover:bg-white/15"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="mt-auto flex justify-between gap-3">
        {project.codeUrl ? (
          <Button variant="outline" size="sm" asChild className="rounded-full">
            <ProjectLink href={project.codeUrl}>
              <Github className="h-4 w-4" />
              Code
            </ProjectLink>
          </Button>
        ) : (
          <span />
        )}

        {project.demoUrl ? (
          <Button size="sm" asChild className="rounded-full">
            <ProjectLink href={getDemoHref(project)} onClick={demoClick}>
              <ExternalLink className="h-4 w-4" />
              {project.demoUrl.startsWith('/') ? 'Open Demo' : 'Visit'}
            </ProjectLink>
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}
