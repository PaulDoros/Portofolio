import type { MetaFunction } from '@remix-run/node';
import { Github, ExternalLink } from 'lucide-react';
import { useState } from 'react';

import { Layout } from '~/components/layout/layout';
import { AdultContentModal } from '~/components/adult-content-modal';
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
import { Separator } from '~/components/ui/separator';

export const meta: MetaFunction = () => {
  return [
    { title: 'Projects | Paul Ionut Doros' },
    {
      name: 'description',
      content: 'A showcase of my development projects and work as a Frontend Developer',
    },
  ];
};

export default function Projects() {
  const [showAdultWarning, setShowAdultWarning] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);
  const [pendingSiteName, setPendingSiteName] = useState<string>('');

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
      setPendingSiteName('');
    }
  };

  // This could be loaded from a backend source in a real application
  const projects = [
    {
      id: 1,
      title: 'Dev Journey',
      image: '/images/devjourney.png',
      description: 'Personal learning and portfolio website',
      content:
        'A comprehensive learning platform that combines portfolio showcasing with interactive learning features. Built with modern web technologies and a focus on user engagement.',
      keyFeatures: [
        'User authentication and profile management',
        'Interactive learning modules and progress tracking',
        'Gamification system with achievements and badges',
        'Responsive design with dark/light mode',
        'Dynamic UI components and animations',
      ],
      technologies: [
        'Remix',
        'React',
        'TypeScript',
        'Tailwind CSS',
        'Prisma',
        'PostgreSQL',
        'Framer Motion',
      ],
      codeUrl: 'https://github.com',
      demoUrl: 'https://dev-journey-five.vercel.app',
      isAdult: false,
    },
    {
      id: 2,
      title: 'Kinky AI Chat',
      image: '/images/ai.png',
      description: 'Real-Time AI Chat System',
      content:
        'An advanced AI-powered chat platform featuring real-time communication, intelligent message filtering, and personalized user interactions.',
      keyFeatures: [
        'Real-time messaging with WebSocket integration',
        'AI-powered message filtering and moderation',
        'Smart auto-suggestions and context awareness',
        'User tagging and notification system',
        'Responsive mobile-first design',
      ],
      technologies: [
        'React.js',
        'Next.js',
        'WebSockets',
        'AI Integration',
        'TypeScript',
        'Tailwind CSS',
        'Node.js',
      ],
      codeUrl: 'https://github.com',
      demoUrl: 'https://chat.kink.ai',
      isAdult: true,
    },
    {
      id: 3,
      title: 'KinkyClips',
      image: '/images/clips.png',
      description: 'Mobile & Web Application',
      content:
        'A cross-platform mobile application with advanced video processing capabilities, available on both iOS and Android platforms.',
      keyFeatures: [
        'Cross-platform mobile app (iOS & Android)',
        'Advanced video processing and editing',
        'Adaptive streaming for optimal performance',
        'Secure payment integration',
        'Admin dashboard for content management',
      ],
      technologies: [
        'React Native',
        'Mobile Apps',
        'Video Processing',
        'Payments',
        'Firebase',
        'AWS',
        'Stripe',
      ],
      codeUrl: 'https://github.com',
      demoUrl: 'https://kinkyclips.com',
      isAdult: true,
    },
    {
      id: 4,
      title: 'Admin Dashboard for KinkyClips',
      image: '/images/dashboard.png',
      description: 'Content Moderation & Analytics Platform',
      content:
        'A comprehensive admin panel designed for efficient content management, user administration, and financial oversight of the KinkyClips platform.',
      keyFeatures: [
        'Real-time content moderation tools',
        'Advanced analytics and reporting',
        'User management and role control',
        'Financial transaction monitoring',
        'Automated content filtering',
      ],
      technologies: [
        'React.js',
        'TypeScript',
        'Analytics',
        'Stripe API',
        'Content Moderation',
        'Tailwind CSS',
      ],
      codeUrl: 'https://github.com',
      demoUrl: '#',
      isAdult: false,
    },
    {
      id: 5,
      title: 'Secure User Database',
      image: '/images/secure.png',
      description: 'User Management System',
      content:
        'A robust and secure user management system with advanced security features and comprehensive user data handling capabilities.',
      keyFeatures: [
        'End-to-end encryption for sensitive data',
        'Role-based access control (RBAC)',
        'OAuth 2.0 authentication',
        'Session management and security',
        'Advanced search and filtering',
      ],
      technologies: [
        'Node.js',
        'TypeScript',
        'Two-Factor Auth',
        'OAuth',
        'Session Management',
        'PostgreSQL',
      ],
      codeUrl: 'https://github.com',
      demoUrl: '#',
      isAdult: false,
    },
    {
      id: 6,
      title: 'NPM Component Library',
      image: '/images/npm.png',
      description: 'Reusable UI Components',
      content:
        'A comprehensive UI component library designed for seamless integration across React, Remix, and React Native applications.',
      keyFeatures: [
        'Cross-framework compatibility',
        'Customizable theming system',
        'Accessibility compliance',
        'Comprehensive documentation',
        'TypeScript support',
      ],
      technologies: [
        'React.js',
        'TypeScript',
        'Tailwind CSS',
        'NPM Package',
        'Design System',
        'Storybook',
      ],
      codeUrl: 'https://github.com',
      demoUrl: '#',
      isAdult: false,
    },
  ];

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 flex flex-col items-center text-center">
            <Badge className="mb-4">Portfolio</Badge>
            <h1 className="mb-6 text-3xl font-bold md:text-5xl">My Projects</h1>
            <Separator className="mb-6 w-24" />
            <p className="max-w-2xl text-muted-foreground">
              A comprehensive collection of my development work, showcasing a variety of
              technologies and problem-solving approaches.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map(project => (
              <Card key={project.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                <div className="relative aspect-video bg-muted">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`h-full w-full object-cover ${project.isAdult ? 'blur-xl' : ''}`}
                    />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">{project.content}</p>
                  <div className="mb-4 space-y-2">
                    <h4 className="text-sm font-medium">Key Features:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {project.keyFeatures.map((feature, index) => (
                        <li key={index}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map(tech => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
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
                    onClick={
                      project.isAdult
                        ? handleAdultLinkClick(project.demoUrl, project.title)
                        : undefined
                    }
                  >
                    <a
                      href={project.isAdult ? '#' : project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Demo
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
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
            setPendingSiteName('');
          }}
          onConfirm={handleConfirmAdultContent}
          siteName={pendingSiteName}
        />
      </section>
    </Layout>
  );
}
