import type { MetaFunction } from '@remix-run/node';
import { Github, ExternalLink } from 'lucide-react';
import { useState } from 'react';

import { Layout } from '~/components/layout/layout';
import { AdultContentModal } from '~/components/adult-content-modal';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';

export const meta: MetaFunction = () => {
  return [
    { title: 'Projects | Paul Ionut Doros' },
    { name: 'description', content: 'A showcase of my development projects and work as a Frontend Developer' },
  ];
};

export default function Projects() {
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

  // This could be loaded from a backend source in a real application
  const projects = [
    {
      id: 1,
      title: 'Dev Journey',
      image: '/images/devjourney.png',
      description: 'Personal learning and portfolio website',
      content: 'A personal learning and portfolio website, created to experiment with modern frontend development techniques and improve hands-on experience with Remix, React, and TypeScript. Features include authentication, gamification, and dynamic UI components.',
      technologies: ['Remix', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Framer Motion'],
      codeUrl: 'https://github.com',
      demoUrl: 'https://dev-journey-five.vercel.app',
    },
    {
      id: 2,
      title: 'Kinky AI Chat',
      image: '/images/ai.png',
      description: 'Real-Time AI Chat System',
      content: 'A real-time AI-powered chat platform, designed for seamless user interactions, message filtering, and smart auto-suggestions. Built with React.js & Next.js, utilizing WebSockets for instant message delivery.',
      technologies: ['React.js', 'Next.js', 'WebSockets', 'AI Integration', 'TypeScript'],
      codeUrl: 'https://github.com',
      demoUrl: 'https://chat.kink.ai',
    },
    {
      id: 3,
      title: 'KinkyClips',
      image: '/images/clips.png',
      description: 'Mobile & Web Application',
      content: 'Developed a React Native mobile app for both Google Play Store & Apple App Store. Features include advanced video processing, adaptive streaming, secure payment gateways, and immersive UI effects.',
      technologies: ['React Native', 'Mobile Apps', 'Video Processing', 'Payments'],
      codeUrl: 'https://github.com',
      demoUrl: 'https://kinkyclips.com',
    },
    {
      id: 4,
      title: 'Admin Dashboard for KinkyClips',
      image: '/images/dashboard.png',
      description: 'Content Moderation & Analytics Platform',
      content: 'A dedicated admin panel built to manage content, users, and financial transactions for the KinkyClips platform. Includes advanced analytics and automation tools for efficient moderation.',
      technologies: ['React.js', 'Analytics', 'Stripe API', 'Content Moderation'],
      codeUrl: 'https://github.com',
      demoUrl: '#',
    },
    {
      id: 5,
      title: 'Secure User Database',
      image: '/images/secure.png',
      description: 'User Management System',
      content: 'Designed and built a secure user database with encrypted storage, role-based permissions, and API authentication. Features include advanced search and filtering with pagination.',
      technologies: ['Node.js', 'Two-Factor Auth', 'OAuth', 'Session Management'],
      codeUrl: 'https://github.com',
      demoUrl: '#',
    },
    {
      id: 6,
      title: 'NPM Component Library',
      image: '/images/npm.png',
      description: 'Reusable UI Components',
      content: 'Built and maintained an NPM dependency containing reusable UI components like modals, sliders, input fields, forms, and notifications. Optimized for React, Remix, and React Native.',
      technologies: ['React.js', 'Tailwind CSS', 'NPM Package', 'Design System'],
      codeUrl: 'https://github.com',
      demoUrl: '#',
    },
  ];

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-16">
            <Badge className="mb-4">Portfolio</Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">My Projects</h1>
            <Separator className="w-24 mb-6" />
            <p className="text-muted-foreground max-w-2xl">
              A comprehensive collection of my development work, showcasing a variety of technologies and problem-solving approaches.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-muted relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className={`w-full h-full object-cover ${[2,3].includes(project.id) ? 'blur-xl' : ''}`}
                    />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {project.content}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </a>
                  </Button>
                  <Button 
                    size="sm" 
                    asChild
                    onClick={[2,3].includes(project.id) ? handleAdultLinkClick(project.demoUrl, project.title) : undefined}
                  >
                    <a href={[2,3].includes(project.id) ? '#' : project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Demo
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <Button asChild>
              <a href="/#contact">Let&apos;s Work Together</a>
            </Button>
          </div>
        </div>

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
      </section>
    </Layout>
  );
} 