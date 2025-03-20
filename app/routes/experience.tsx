import type { MetaFunction } from "@remix-run/node";
import { ArrowLeft, Building2, Calendar, MapPin } from "lucide-react";

import { Layout } from "~/components/layout/layout";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";

export const meta: MetaFunction = () => {
  return [
    { title: "Experience | Paul Ionut Doros" },
    {
      name: "description",
      content:
        "Professional experience and work history of Paul Ionut Doros as a Frontend Developer",
    },
  ];
};

export default function Experience() {
  const experiences = [
    {
      company: "Cybernet Entertainment",
      role: "Frontend Developer",
      location: "Remote",
      period: "Jan 2023 - Jan 2025",
      description:
        "Leading frontend development for multiple projects, focusing on React and modern web technologies.",
      achievements: [
        "Developed and optimized UI/UX features, ensuring smooth navigation, modern visual effects, and engaging user interactions",
        "UI/UX improvements, introducing scroll-based animations, hover effects, skeleton loaders, lazy loading, and dynamic layouts",
        "Designed and implemented high-quality animations and transitions, enhancing user experience",
        "Built and maintained an NPM component library containing reusable UI components (Modals, Sliders, Custom Buttons, Form Elements)",
        "Designed and developed category-based filtering, sorting, and tagging systems for content organization",
        "Implemented real-time messaging features, ensuring seamless in-app communication",
        "Developed React Native applications for KinkyClips, launching on both Google Play Store and Apple App Store",
        "Optimized AWS Lambda functions for automatic video preview generation",
        "Led UI improvements with advanced CSS and Tailwind effects",
        "Worked on application performance improvements and complex pagination with infinite scrolling",
      ],
      technologies: [
        "React.js",
        "Next.js",
        "Remix",
        "React Native",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "Zustand",
        "Redux",
        "WebSockets",
        "REST APIs",
        "GraphQL",
        "OAuth",
        "JWT",
        "Two-Factor Authentication",
        "AWS Lambda",
        "Vercel",
        "Notion",
        "Jira",
        "Figma",
        "Git/GitHub",
      ],
    },
    {
      company: "SMEDIX Inc",
      role: "Software Developer",
      location: "Remote",
      period: "Sep 2022 - Dec 2022",
      description:
        "Contributed to the development of healthcare-related web applications and platforms.",
      achievements: [
        "Developed and optimized applications using React.js and TypeScript",
        "Implemented reusable UI components, enhancing application scalability",
        "Closely collaborated with backend teams to integrate RESTful APIs",
        "Debugged and resolved UI/UX issues, improving responsiveness and accessibility",
        "Followed Agile methodologies, participating in daily standups and code reviews",
        "Implemented complex form handling with validation using React Hook Form",
        "Analyzed Delphi codebase as part of a migration strategy to C++",
      ],
      technologies: [
        "React.js",
        "TypeScript",
        ".NET",
        "Delphi",
        "REST APIs",
        "Git",
        "Agile (Scrum)",
      ],
    },
    {
      company: "Advartes",
      role: "Junior Fullstack Developer",
      location: "Remote",
      period: "Jun 2022 - Sep 2022",
      description:
        "Worked on full-stack web applications, developing frontend interfaces and integrating backend APIs.",
      achievements: [
        "Worked on full-stack web applications, developing frontend interfaces and integrating backend APIs",
        "Implemented dynamic UI elements using HTML, JavaScript, and Tailwind CSS",
        "Gained experience with Node.js, working on server-side logic and API development",
        "Utilized Git for version control and team collaboration",
        "Enhanced debugging skills, resolving JavaScript errors and optimizing performance",
      ],
      technologies: [
        "HTML",
        "JavaScript",
        "CSS",
        "Tailwind CSS",
        "Node.js",
        "Git/GitHub",
        "Agile Development",
      ],
    },
    {
      company: "Fluid Trends",
      role: "Frontend Developer",
      location: "Remote",
      period: "Jan 2022 - Jun 2022",
      description:
        "Developed and integrated UI/UX interfaces, ensuring seamless user experiences and responsive designs.",
      achievements: [
        "Developed and integrated UI/UX interfaces with responsive designs",
        "Worked with multiple JavaScript frameworks (Vue.js, React.js, jQuery)",
        "Styled applications using Bootstrap, SASS, and Tailwind CSS",
        "Implemented state management techniques, improving application performance",
        "Gained experience with TypeScript, improving code maintainability",
        "Followed best practices for accessibility and cross-browser compatibility",
        "Integrated third-party libraries for enhanced functionality",
      ],
      technologies: [
        "JavaScript",
        "TypeScript",
        "React.js",
        "jQuery",
        "Bootstrap",
        "Tailwind CSS",
        "SASS",
        "Git/GitHub",
        "Remix",
        "Node.js",
      ],
    },
  ];

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <a href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </a>
            </Button>
            <h1 className="text-3xl font-bold">Work Experience</h1>
          </div>

          <div className="mb-16 flex flex-col items-center text-center">
            <Badge className="mb-4">Career</Badge>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Professional Journey
            </h2>
            <Separator className="mb-6 w-24" />
            <p className="max-w-2xl text-muted-foreground">
              A timeline of my professional experience as a Frontend Developer,
              showcasing my growth and expertise in web development.
            </p>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card
                key={index}
                className="overflow-hidden transition-shadow hover:shadow-lg"
              >
                <CardHeader>
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-primary" />
                        {exp.company}
                      </CardTitle>
                      <CardDescription className="mt-2 text-lg">
                        {exp.role}
                      </CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {exp.location}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-muted-foreground">
                    {exp.description}
                  </p>
                  <div className="mb-4 space-y-2">
                    <h4 className="text-sm font-medium">Key Achievements:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx}>• {achievement}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
