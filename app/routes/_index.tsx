import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Github, ExternalLink, Mail, Send, Download } from 'lucide-react';
import { useState } from 'react';

import { AdultContentModal } from '~/components/adult-content-modal';
import { Layout } from '~/components/layout/layout';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Progress } from '~/components/ui/progress';
import { Separator } from '~/components/ui/separator';

export const meta: MetaFunction = () => {
  return [
    { title: 'Paul Ionut Doros | Frontend Developer' },
    { name: 'description', content: 'Professional portfolio of Paul Ionut Doros, Frontend Developer with expertise in React, Remix, and modern web technologies' },
  ];
};

export default function Index() {
  const [showAdultWarning, setShowAdultWarning] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);
  const [pendingSiteName, setPendingSiteName] = useState<string>("");

  const handleAdultLinkClick = (url: string, siteName: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setPendingUrl(url);
    setPendingSiteName(siteName);
    setShowAdultWarning(true);
  };

  const handleConfirmAdultContent = () => {
    if (pendingUrl) {
      window.open(pendingUrl, '_blank');
      setShowAdultWarning(false);
      setPendingUrl(null);
      setPendingSiteName("");
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-small-black/[0.05] -z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background -z-10" />
        
        <div className="container mx-auto px-4 py-20 md:py-32 flex flex-col items-center justify-center text-center">
          <Badge className="mb-4">Available for Work</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Paul Ionut Doros</h1>
          <p className="text-2xl font-medium mb-2">Frontend Developer</p>
          <p className="text-xl text-muted-foreground max-w-2xl mb-10">
            I build modern, responsive web applications with React, Remix, and TypeScript. 
            Let&apos;s work together to bring your ideas to life.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg">
              <a href="/#contact">Contact Me</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/resume.pdf" download>
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-16">
            <Badge className="mb-4">About Me</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">My Background</h2>
            <Separator className="w-24 mb-6" />
            <p className="text-muted-foreground max-w-2xl">
              Learn more about my journey, experience, and what drives me as a developer.
            </p>
          </div>
          
          <div className="flex flex-col gap-12 justify-center items-center">
            <div className="w-64 h-64 relative border rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-primary/5" />
              <div className="absolute inset-0 flex items-center justify-center">
                  <img src="/img.jpg" alt="Paul Ionut Doros" className="w-full h-full object-cover" />
              </div>
            </div>
            
            <div className="flex flex-col justify-center text-center">
              <h3 className="text-2xl font-bold mb-4">Hi, I&apos;m Paul Ionut Doros</h3>
              <p className="text-muted-foreground mb-6">
                As a front-end developer, I don&apos;t just write code I create solutions. Over the past couple of years, 
                I&apos;ve worked on a wide range of tasks, from building responsive, user-friendly features to troubleshooting 
                complex issues. But what truly sets me apart is my adaptability and willingness to step outside of my role 
                whenever necessary.
              </p>
              <p className="text-muted-foreground mb-6">
                My expertise lies in JavaScript/TypeScript, React, Remix, and React Native. I&apos;m experienced in UI/UX 
                improvements, implementing animations and transitions, and building reusable component libraries for 
                optimized development workflows.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                <Button asChild>
                  <a href="/#contact">Get In Touch</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/#projects">View Projects</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-16">
            <Badge className="mb-4">My Work</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Featured Projects</h2>
            <Separator className="w-24 mb-6" />
            <p className="text-muted-foreground max-w-2xl">
              A collection of my recent projects demonstrating my skills and capabilities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
              <div className="aspect-video bg-muted relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img src="/images/devjourney.png" alt="Dev Journey Project Screenshot" className="w-full h-full object-cover" />
                </div>
              </div>
              <CardHeader>
                <CardTitle>Dev Journey</CardTitle>
                <CardDescription>Personal learning and portfolio website</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground mb-4">
                  A personal learning and portfolio website with authentication, gamification, and dynamic UI components.
                  Features include themes, user achievements, and interactive UI components.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="secondary">Remix</Badge>
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Tailwind CSS</Badge>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between mt-auto">
                <Button variant="outline" size="sm" asChild>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </a>
                </Button>
                <Button size="sm" asChild>
                  <a href="https://dev-journey-five.vercel.app" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Demo
                  </a>
                </Button>
              </CardFooter>
            </Card>

            {/* Project 2 */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
              <div className="aspect-video bg-muted relative">
                <div className="absolute inset-0 flex items-center justify-center blur-xl">
                  <img src="/images/ai.png" alt="Kinky AI Chat Project Screenshot" className="w-full h-full object-cover" />
                </div>
              </div>
              <CardHeader>
                <CardTitle>Kinky AI Chat</CardTitle>
                <CardDescription>Real-Time AI Chat System</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground mb-4">
                  A real-time AI-powered chat platform with message filtering, smart auto-suggestions, and user tagging.
                  Built with WebSockets for instant message delivery.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="secondary">React.js</Badge>
                  <Badge variant="secondary">Next.js</Badge>
                  <Badge variant="secondary">WebSockets</Badge>
                  <Badge variant="secondary">AI Integration</Badge>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between mt-auto">
                <Button variant="outline" size="sm" asChild>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </a>
                </Button>
                <Button size="sm" asChild>
                  <a 
                    href="https://chat.kink.ai" 
                    onClick={handleAdultLinkClick('https://chat.kink.ai', 'Kinky AI Chat')}
                    className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Demo
                  </a>
                </Button>
              </CardFooter>
            </Card>

            {/* Project 3 */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
              <div className="aspect-video bg-muted relative">
                <div className="absolute inset-0 flex items-center justify-center blur-xl">
                  <img src="/images/clips.png" alt="KinkyClips Project Screenshot" className="w-full h-full object-cover" />
                </div>
              </div>
              <CardHeader>
                <CardTitle>KinkyClips</CardTitle>
                <CardDescription>Mobile & Web Application</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground mb-4">
                  Developed a React Native mobile app for both Google Play Store & Apple App Store with advanced
                  video processing, adaptive streaming, and admin dashboard.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="secondary">React Native</Badge>
                  <Badge variant="secondary">Mobile Apps</Badge>
                  <Badge variant="secondary">Video Processing</Badge>
                  <Badge variant="secondary">Payments</Badge>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between mt-auto">
                <Button variant="outline" size="sm" asChild>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </a>
                </Button>
                <Button size="sm" asChild>
                  <a 
                    href="https://kinkyclips.com" 
                    onClick={handleAdultLinkClick('https://kinkyclips.com', 'KinkyClips')}
                    className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Demo
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="flex justify-center mt-12">
            <Button variant="outline" asChild>
              <Link to="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-16">
            <Badge className="mb-4">Expertise</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">My Skills</h2>
            <Separator className="w-24 mb-6" />
            <p className="text-muted-foreground max-w-2xl">
              A comprehensive overview of my technical skills and proficiencies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-6">Frontend Development</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">React/Remix</span>
                    <span>95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">TypeScript</span>
                    <span>90%</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Tailwind CSS</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">React Native</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-6">Additional Skills</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">UI/UX Implementation</span>
                    <span>90%</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Animations & Effects</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">State Management</span>
                    <span>80%</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Performance Optimization</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16">
            <h3 className="text-xl font-semibold mb-6 text-center">Technologies I Work With</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="py-2 px-4">JavaScript</Badge>
              <Badge className="py-2 px-4">TypeScript</Badge>
              <Badge className="py-2 px-4">React.js</Badge>
              <Badge className="py-2 px-4">Next.js</Badge>
              <Badge className="py-2 px-4">Remix</Badge>
              <Badge className="py-2 px-4">React Native</Badge>
              <Badge className="py-2 px-4">Vue.js</Badge>
              <Badge className="py-2 px-4">Tailwind CSS</Badge>
              <Badge className="py-2 px-4">Framer Motion</Badge>
              <Badge className="py-2 px-4">Zustand</Badge>
              <Badge className="py-2 px-4">Redux</Badge>
              <Badge className="py-2 px-4">JWT/OAuth</Badge>
              <Badge className="py-2 px-4">Figma</Badge>
              <Badge className="py-2 px-4">Git</Badge>
              <Badge className="py-2 px-4">Vercel</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-16">
            <Badge className="mb-4">Get In Touch</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact Me</h2>
            <Separator className="w-24 mb-6" />
            <p className="text-muted-foreground max-w-2xl">
              Have a project in mind or just want to say hello? Feel free to reach out!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-6">Send Me a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      placeholder="Your email"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      placeholder="Subject of your message"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      placeholder="Your message"
                      required
                    ></textarea>
                  </div>
                </div>
                <Button className="w-full" type="submit">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
        </div>

            <div>
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
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
                <h3 className="text-xl font-semibold mb-6">Available For</h3>
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

      <AdultContentModal
        isOpen={showAdultWarning}
        onClose={() => {
          setShowAdultWarning(false);
          setPendingUrl(null);
          setPendingSiteName("");
        }}
        onConfirm={handleConfirmAdultContent}
        siteName={pendingSiteName}
      />
    </Layout>
  );
}


