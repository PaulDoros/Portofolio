import { Link } from '@remix-run/react';
import { Github, Mail } from 'lucide-react';
import type { MouseEvent } from 'react';

import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { ContactForm } from '~/components/contact-form';
import { ClassicAbout } from '~/components/sections/classic-about';
import { ProjectCard } from '~/components/projects/project-card';
import { Progress } from '~/components/ui/progress';
import { Separator } from '~/components/ui/separator';
import { Layout } from '../layout/layout';
import { AnimatedHero } from '../sections/animated-hero';
import { featuredProjects } from '~/data/portfolio-projects';

interface AnimatedPortfolioProps {
  onAdultLinkClick: (url: string, siteName: string) => (e: MouseEvent) => void;
}

export function AnimatedPortfolio({ onAdultLinkClick }: AnimatedPortfolioProps) {
  return (
    <Layout>
      <div className="classic-version">
        <AnimatedHero />
        <ClassicAbout />

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-16 flex flex-col items-center text-center">
              <Badge className="mb-4">My Work</Badge>
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">Featured Systems and Products</h2>
              <Separator className="mb-6 w-24" />
              <p className="max-w-3xl leading-7 text-muted-foreground">
                SaaS products, Pantheon automation, agent orchestration, game pipelines, and safe
                demos of the systems behind the builds.
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

        {/* Skills Section */}
        <section id="skills" className="bg-muted/50 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-16 flex flex-col items-center text-center">
              <Badge className="mb-4">Expertise</Badge>
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">My Skills</h2>
              <Separator className="mb-6 w-24" />
              <p className="max-w-2xl text-muted-foreground">
                A comprehensive overview of my technical skills and proficiencies.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <div>
                <h3 className="mb-6 text-xl font-semibold">Frontend Development</h3>
                <div className="space-y-6">
                  <div>
                    <div className="mb-2 flex justify-between">
                      <span className="font-medium">React/Remix</span>
                      <span>95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-2 flex justify-between">
                      <span className="font-medium">TypeScript</span>
                      <span>90%</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-2 flex justify-between">
                      <span className="font-medium">Tailwind CSS</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-2 flex justify-between">
                      <span className="font-medium">React Native</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-6 text-xl font-semibold">Additional Skills</h3>
                <div className="space-y-6">
                  <div>
                    <div className="mb-2 flex justify-between">
                      <span className="font-medium">UI/UX Implementation</span>
                      <span>90%</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-2 flex justify-between">
                      <span className="font-medium">Animations & Effects</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-2 flex justify-between">
                      <span className="font-medium">State Management</span>
                      <span>80%</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-2 flex justify-between">
                      <span className="font-medium">Performance Optimization</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <h3 className="mb-6 text-center text-xl font-semibold">Technologies I Work With</h3>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                <div className="space-y-4">
                  <h4 className="font-medium">Frontend</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="px-4 py-2">JavaScript</Badge>
                    <Badge className="px-4 py-2">TypeScript</Badge>
                    <Badge className="px-4 py-2">React.js</Badge>
                    <Badge className="px-4 py-2">Next.js</Badge>
                    <Badge className="px-4 py-2">Remix</Badge>
                    <Badge className="px-4 py-2">React Native</Badge>
                    <Badge className="px-4 py-2">Vue.js</Badge>
                    <Badge className="px-4 py-2">Tailwind CSS</Badge>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">UI/UX</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="px-4 py-2">Framer Motion</Badge>
                    <Badge className="px-4 py-2">GSAP</Badge>
                    <Badge className="px-4 py-2">Chakra UI</Badge>
                    <Badge className="px-4 py-2">Bootstrap</Badge>
                    <Badge className="px-4 py-2">SASS</Badge>
                    <Badge className="px-4 py-2">Styled Components</Badge>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">State & Data</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="px-4 py-2">Zustand</Badge>
                    <Badge className="px-4 py-2">Redux</Badge>
                    <Badge className="px-4 py-2">JWT/OAuth</Badge>
                    <Badge className="px-4 py-2">GraphQL</Badge>
                    <Badge className="px-4 py-2">WebSockets</Badge>
                    <Badge className="px-4 py-2">REST APIs</Badge>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Tools & DevOps</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="px-4 py-2">Git</Badge>
                    <Badge className="px-4 py-2">Figma</Badge>
                    <Badge className="px-4 py-2">Vercel</Badge>
                    <Badge className="px-4 py-2">Firebase</Badge>
                    <Badge className="px-4 py-2">AWS Lambda</Badge>
                    <Badge className="px-4 py-2">Jira</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-16 flex flex-col items-center text-center">
              <Badge className="mb-4">Get In Touch</Badge>
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">Contact Me</h2>
              <Separator className="mb-6 w-24" />
              <p className="max-w-2xl text-muted-foreground">
                Have a project in mind or just want to say hello? Feel free to reach out!
              </p>
            </div>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <ContactForm />

              <div>
                <h3 className="mb-6 text-xl font-semibold">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-muted-foreground">dorospaul26@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Github className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">GitHub</h4>
                      <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        github.com/PaulDoros
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <svg
                        className="h-5 w-5 text-primary"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">LinkedIn</h4>
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        www.linkedin.com/in/paul-doros-3468a2177
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <svg
                        className="h-5 w-5 text-primary"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" />
                        <path d="M9 22V12h6v10" />
                        <path d="M2 10.6L12 2l10 8.6" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Location</h4>
                      <p className="text-muted-foreground">Sibiu, Romania</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <svg
                        className="h-5 w-5 text-primary"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <p className="text-muted-foreground">+40 756 436 531</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <h3 className="mb-6 text-xl font-semibold">Available For</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span>Full-time positions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span>Freelance projects</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span>Consulting</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span>Remote work</span>
                    </li>
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
