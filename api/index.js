// This is a custom server adapter for Vercel
import * as path from 'path';
import { createRequestHandler } from '@remix-run/express';
import { broadcastDevReady, installGlobals } from '@remix-run/node';
import express from 'express';

// Install Remix globals
installGlobals();

// Our build directory
const BUILD_DIR = path.join(process.cwd(), 'build');

// Create an express app
const app = express();

// Handle asset requests
app.use(express.static('public', { maxAge: '1h' }));

// Handle data requests
app.all(
  '*',
  createRequestHandler({
    build: require(BUILD_DIR),
    mode: process.env.NODE_ENV,
  })
);

// Get port from env or use default
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);

  if (process.env.NODE_ENV === 'development') {
    broadcastDevReady(require(BUILD_DIR));
  }
});

// For Vercel, we need to export a request handler
export default app;

// app/components/theme-toggle.tsx
import { Moon, Sun } from 'lucide-react';
import { jsx as jsx8, jsxs as jsxs4 } from 'react/jsx-runtime';
function ThemeToggle() {
  let { theme, setTheme, resolvedTheme } = useTheme();
  return /* @__PURE__ */ jsxs4(Button, {
    variant: 'outline',
    size: 'icon',
    className: `relative h-9 w-16 rounded-full transition-colors ${resolvedTheme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}`,
    onClick: () => setTheme(resolvedTheme === 'light' ? 'dark' : 'light'),
    'aria-label': 'Toggle theme',
    children: [
      /* @__PURE__ */ jsx8('div', {
        className: `absolute left-1 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-200 ${resolvedTheme === 'dark' ? 'translate-x-[1.75rem]' : 'translate-x-0'}`,
        children:
          resolvedTheme === 'dark'
            ? /* @__PURE__ */ jsx8(Moon, { className: 'h-4 w-4 text-slate-800' })
            : /* @__PURE__ */ jsx8(Sun, { className: 'h-4 w-4 text-yellow-500' }),
      }),
      /* @__PURE__ */ jsx8('span', { className: 'sr-only', children: 'Toggle theme' }),
    ],
  });
}

// app/components/layout/nav-bar.tsx
import { jsx as jsx9, jsxs as jsxs5 } from 'react/jsx-runtime';
var navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/#about' },
  { name: 'Experience', href: '/experience' },
  { name: 'Projects', href: '/projects' },
  { name: 'Skills', href: '/#skills' },
  // { name: 'Compare', href: '/compare' },
  { name: 'Contact', href: '/#contact' },
];
function NavBar() {
  let [isScrolled, setIsScrolled] = useState3(!1);
  return (
    useEffect2(() => {
      let handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
      return (
        window.addEventListener('scroll', handleScroll),
        () => window.removeEventListener('scroll', handleScroll)
      );
    }, []),
    /* @__PURE__ */ jsx9('header', {
      className: `fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/90 shadow-sm backdrop-blur-md' : 'bg-transparent'}`,
      children: /* @__PURE__ */ jsx9('div', {
        className: 'container mx-auto px-4 py-4',
        children: /* @__PURE__ */ jsxs5('div', {
          className: 'flex items-center justify-between',
          children: [
            /* @__PURE__ */ jsx9(Link2, {
              to: '/',
              className: 'text-xl font-bold transition-colors hover:text-primary',
              children: 'Paul Doros',
            }),
            /* @__PURE__ */ jsxs5('div', {
              className: 'flex flex-1 items-center justify-end space-x-4',
              children: [
                /* @__PURE__ */ jsxs5('nav', {
                  className: 'hidden items-center space-x-4 md:flex',
                  children: [
                    /* @__PURE__ */ jsx9('div', {
                      className: 'flex items-center gap-6',
                      children: navItems.map(item =>
                        /* @__PURE__ */ jsxs5(
                          Link2,
                          {
                            to: item.href,
                            className:
                              'group relative text-sm font-medium transition-colors hover:text-primary',
                            children: [
                              item.name,
                              /* @__PURE__ */ jsx9('span', {
                                className:
                                  'absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full',
                              }),
                            ],
                          },
                          item.name
                        )
                      ),
                    }),
                    /* @__PURE__ */ jsx9(ThemeToggle, {}),
                  ],
                }),
                /* @__PURE__ */ jsx9(Button, {
                  className: 'hidden sm:flex sm:items-center sm:justify-center',
                  asChild: !0,
                  size: 'sm',
                  children: /* @__PURE__ */ jsx9('a', {
                    href: '/#contact',
                    children: "Let's Talk",
                  }),
                }),
              ],
            }),
            /* @__PURE__ */ jsx9('div', {
              className: 'h-full md:hidden',
              children: /* @__PURE__ */ jsxs5(Sheet, {
                children: [
                  /* @__PURE__ */ jsx9(SheetTrigger, {
                    asChild: !0,
                    children: /* @__PURE__ */ jsxs5(Button, {
                      variant: 'outline',
                      size: 'icon',
                      children: [
                        /* @__PURE__ */ jsx9(Menu, { className: 'h-5 w-5' }),
                        /* @__PURE__ */ jsx9('span', {
                          className: 'sr-only',
                          children: 'Toggle menu',
                        }),
                      ],
                    }),
                  }),
                  /* @__PURE__ */ jsxs5(SheetContent, {
                    side: 'right',
                    children: [
                      /* @__PURE__ */ jsx9(SheetHeader, {
                        children: /* @__PURE__ */ jsx9(SheetTitle, { children: 'Navigation' }),
                      }),
                      /* @__PURE__ */ jsxs5('div', {
                        className: 'flex h-full flex-col',
                        children: [
                          /* @__PURE__ */ jsx9('nav', {
                            className: 'flex-1 space-y-4 py-4',
                            children: navItems.map(item =>
                              /* @__PURE__ */ jsx9(
                                Link2,
                                {
                                  to: item.href,
                                  className:
                                    'flex items-center rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-muted',
                                  children: item.name,
                                },
                                item.name
                              )
                            ),
                          }),
                          /* @__PURE__ */ jsxs5('div', {
                            className: 'space-y-4 border-t py-4',
                            children: [
                              /* @__PURE__ */ jsxs5('div', {
                                className: 'flex items-center justify-between px-4',
                                children: [
                                  /* @__PURE__ */ jsx9('span', {
                                    className: 'text-sm font-medium',
                                    children: 'Appearance',
                                  }),
                                  /* @__PURE__ */ jsx9('div', {
                                    className: 'flex gap-2',
                                    children: /* @__PURE__ */ jsx9(ThemeToggle, {}),
                                  }),
                                ],
                              }),
                              /* @__PURE__ */ jsx9('div', {
                                className: 'px-4',
                                children: /* @__PURE__ */ jsx9(Button, {
                                  variant: 'outline',
                                  asChild: !0,
                                  className: 'w-full',
                                  children: /* @__PURE__ */ jsx9('a', {
                                    href: '/resume.pdf',
                                    download: !0,
                                    className: 'flex items-center justify-center gap-2',
                                    children: /* @__PURE__ */ jsx9('span', {
                                      children: 'Download Resume',
                                    }),
                                  }),
                                }),
                              }),
                              /* @__PURE__ */ jsx9('div', {
                                className: 'px-4',
                                children: /* @__PURE__ */ jsx9(Button, {
                                  asChild: !0,
                                  className: 'w-full',
                                  children: /* @__PURE__ */ jsx9('a', {
                                    href: '/#contact',
                                    className: 'flex items-center justify-center gap-2',
                                    children: "Let's Talk",
                                  }),
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
          ],
        }),
      }),
    })
  );
}

// app/components/layout/layout.tsx
import { jsx as jsx10, jsxs as jsxs6 } from 'react/jsx-runtime';
function Layout({ children }) {
  return /* @__PURE__ */ jsxs6('div', {
    className: 'flex min-h-screen flex-col',
    children: [
      /* @__PURE__ */ jsx10('header', {
        className:
          'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        children: /* @__PURE__ */ jsx10(NavBar, {}),
      }),
      /* @__PURE__ */ jsx10('main', { children }),
      /* @__PURE__ */ jsx10(Footer, {}),
    ],
  });
}

// app/components/ui/badge.tsx
import { cva as cva3 } from 'class-variance-authority';
import { jsx as jsx11 } from 'react/jsx-runtime';
var badgeVariants = cva3(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx11('div', {
    className: cn(badgeVariants({ variant }), className),
    ...props,
  });
}

// app/components/ui/card.tsx
import * as React4 from 'react';
import { jsx as jsx12 } from 'react/jsx-runtime';
var Card = React4.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsx12('div', {
    ref,
    className: cn('rounded-xl border bg-card text-card-foreground shadow', className),
    ...props,
  })
);
Card.displayName = 'Card';
var CardHeader = React4.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsx12('div', {
    ref,
    className: cn('flex flex-col space-y-1.5 p-6', className),
    ...props,
  })
);
CardHeader.displayName = 'CardHeader';
var CardTitle = React4.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsx12('div', {
    ref,
    className: cn('font-semibold leading-none tracking-tight', className),
    ...props,
  })
);
CardTitle.displayName = 'CardTitle';
var CardDescription = React4.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsx12('div', {
    ref,
    className: cn('text-sm text-muted-foreground', className),
    ...props,
  })
);
CardDescription.displayName = 'CardDescription';
var CardContent = React4.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsx12('div', { ref, className: cn('p-6 pt-0', className), ...props })
);
CardContent.displayName = 'CardContent';
var CardFooter = React4.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsx12('div', {
    ref,
    className: cn('flex items-center p-6 pt-0', className),
    ...props,
  })
);
CardFooter.displayName = 'CardFooter';

// app/routes/experience.tsx
import { jsx as jsx13, jsxs as jsxs7 } from 'react/jsx-runtime';
var meta = () => [
  { title: 'Experience | Paul Ionut Doros' },
  {
    name: 'description',
    content: 'Professional experience and work history of Paul Ionut Doros as a Frontend Developer',
  },
];
function Experience() {
  return /* @__PURE__ */ jsx13(Layout, {
    children: /* @__PURE__ */ jsx13('section', {
      className: 'py-20',
      children: /* @__PURE__ */ jsxs7('div', {
        className: 'container mx-auto px-4',
        children: [
          /* @__PURE__ */ jsxs7('div', {
            className: 'mb-12 flex items-center gap-4',
            children: [
              /* @__PURE__ */ jsx13(Button, {
                variant: 'ghost',
                size: 'sm',
                asChild: !0,
                children: /* @__PURE__ */ jsxs7('a', {
                  href: '/',
                  children: [
                    /* @__PURE__ */ jsx13(ArrowLeft, { className: 'mr-2 h-4 w-4' }),
                    'Back to Home',
                  ],
                }),
              }),
              /* @__PURE__ */ jsx13('h1', {
                className: 'text-3xl font-bold',
                children: 'Work Experience',
              }),
            ],
          }),
          /* @__PURE__ */ jsxs7('div', {
            className: 'mb-16 flex flex-col items-center text-center',
            children: [
              /* @__PURE__ */ jsx13(Badge, { className: 'mb-4', children: 'Career' }),
              /* @__PURE__ */ jsx13('h2', {
                className: 'mb-6 text-3xl font-bold md:text-4xl',
                children: 'Professional Journey',
              }),
              /* @__PURE__ */ jsx13(Separator, { className: 'mb-6 w-24' }),
              /* @__PURE__ */ jsx13('p', {
                className: 'max-w-2xl text-muted-foreground',
                children:
                  'A timeline of my professional experience as a Frontend Developer, showcasing my growth and expertise in web development.',
              }),
            ],
          }),
          /* @__PURE__ */ jsx13('div', {
            className: 'space-y-8',
            children: [
              {
                company: 'Cybernet Entertainment',
                role: 'Frontend Developer',
                location: 'Remote',
                period: 'Jan 2023 - Jan 2025',
                description:
                  'Leading frontend development for multiple projects, focusing on React and modern web technologies.',
                achievements: [
                  'Developed and optimized UI/UX features, ensuring smooth navigation, modern visual effects, and engaging user interactions',
                  'UI/UX improvements, introducing scroll-based animations, hover effects, skeleton loaders, lazy loading, and dynamic layouts',
                  'Designed and implemented high-quality animations and transitions, enhancing user experience',
                  'Built and maintained an NPM component library containing reusable UI components (Modals, Sliders, Custom Buttons, Form Elements)',
                  'Designed and developed category-based filtering, sorting, and tagging systems for content organization',
                  'Implemented real-time messaging features, ensuring seamless in-app communication',
                  'Developed React Native applications for KinkyClips, launching on both Google Play Store and Apple App Store',
                  'Optimized AWS Lambda functions for automatic video preview generation',
                  'Led UI improvements with advanced CSS and Tailwind effects',
                  'Worked on application performance improvements and complex pagination with infinite scrolling',
                ],
                technologies: [
                  'React.js',
                  'Next.js',
                  'Remix',
                  'React Native',
                  'TypeScript',
                  'Tailwind CSS',
                  'Framer Motion',
                  'Zustand',
                  'Redux',
                  'WebSockets',
                  'REST APIs',
                  'GraphQL',
                  'OAuth',
                  'JWT',
                  'Two-Factor Authentication',
                  'AWS Lambda',
                  'Vercel',
                  'Notion',
                  'Jira',
                  'Figma',
                  'Git/GitHub',
                ],
              },
              {
                company: 'SMEDIX Inc',
                role: 'Software Developer',
                location: 'Remote',
                period: 'Sep 2022 - Dec 2022',
                description:
                  'Contributed to the development of healthcare-related web applications and platforms.',
                achievements: [
                  'Developed and optimized applications using React.js and TypeScript',
                  'Implemented reusable UI components, enhancing application scalability',
                  'Closely collaborated with backend teams to integrate RESTful APIs',
                  'Debugged and resolved UI/UX issues, improving responsiveness and accessibility',
                  'Followed Agile methodologies, participating in daily standups and code reviews',
                  'Implemented complex form handling with validation using React Hook Form',
                  'Analyzed Delphi codebase as part of a migration strategy to C++',
                ],
                technologies: [
                  'React.js',
                  'TypeScript',
                  '.NET',
                  'Delphi',
                  'REST APIs',
                  'Git',
                  'Agile (Scrum)',
                ],
              },
              {
                company: 'Advartes',
                role: 'Junior Fullstack Developer',
                location: 'Remote',
                period: 'Jun 2022 - Sep 2022',
                description:
                  'Worked on full-stack web applications, developing frontend interfaces and integrating backend APIs.',
                achievements: [
                  'Worked on full-stack web applications, developing frontend interfaces and integrating backend APIs',
                  'Implemented dynamic UI elements using HTML, JavaScript, and Tailwind CSS',
                  'Gained experience with Node.js, working on server-side logic and API development',
                  'Utilized Git for version control and team collaboration',
                  'Enhanced debugging skills, resolving JavaScript errors and optimizing performance',
                ],
                technologies: [
                  'HTML',
                  'JavaScript',
                  'CSS',
                  'Tailwind CSS',
                  'Node.js',
                  'Git/GitHub',
                  'Agile Development',
                ],
              },
              {
                company: 'Fluid Trends',
                role: 'Frontend Developer',
                location: 'Remote',
                period: 'Jan 2022 - Jun 2022',
                description:
                  'Developed and integrated UI/UX interfaces, ensuring seamless user experiences and responsive designs.',
                achievements: [
                  'Developed and integrated UI/UX interfaces with responsive designs',
                  'Worked with multiple JavaScript frameworks (Vue.js, React.js, jQuery)',
                  'Styled applications using Bootstrap, SASS, and Tailwind CSS',
                  'Implemented state management techniques, improving application performance',
                  'Gained experience with TypeScript, improving code maintainability',
                  'Followed best practices for accessibility and cross-browser compatibility',
                  'Integrated third-party libraries for enhanced functionality',
                ],
                technologies: [
                  'JavaScript',
                  'TypeScript',
                  'React.js',
                  'jQuery',
                  'Bootstrap',
                  'Tailwind CSS',
                  'SASS',
                  'Git/GitHub',
                  'Remix',
                  'Node.js',
                ],
              },
            ].map((exp, index) =>
              /* @__PURE__ */ jsxs7(
                Card,
                {
                  className: 'overflow-hidden transition-shadow hover:shadow-lg',
                  children: [
                    /* @__PURE__ */ jsx13(CardHeader, {
                      children: /* @__PURE__ */ jsxs7('div', {
                        className:
                          'flex flex-col gap-4 md:flex-row md:items-center md:justify-between',
                        children: [
                          /* @__PURE__ */ jsxs7('div', {
                            children: [
                              /* @__PURE__ */ jsxs7(CardTitle, {
                                className: 'flex items-center gap-2',
                                children: [
                                  /* @__PURE__ */ jsx13(Building2, {
                                    className: 'h-5 w-5 text-primary',
                                  }),
                                  exp.company,
                                ],
                              }),
                              /* @__PURE__ */ jsx13(CardDescription, {
                                className: 'mt-2 text-lg',
                                children: exp.role,
                              }),
                            ],
                          }),
                          /* @__PURE__ */ jsxs7('div', {
                            className: 'flex flex-wrap gap-4 text-sm text-muted-foreground',
                            children: [
                              /* @__PURE__ */ jsxs7('div', {
                                className: 'flex items-center gap-1',
                                children: [
                                  /* @__PURE__ */ jsx13(Calendar, { className: 'h-4 w-4' }),
                                  exp.period,
                                ],
                              }),
                              /* @__PURE__ */ jsxs7('div', {
                                className: 'flex items-center gap-1',
                                children: [
                                  /* @__PURE__ */ jsx13(MapPin, { className: 'h-4 w-4' }),
                                  exp.location,
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                    /* @__PURE__ */ jsxs7(CardContent, {
                      children: [
                        /* @__PURE__ */ jsx13('p', {
                          className: 'mb-4 text-muted-foreground',
                          children: exp.description,
                        }),
                        /* @__PURE__ */ jsxs7('div', {
                          className: 'mb-4 space-y-2',
                          children: [
                            /* @__PURE__ */ jsx13('h4', {
                              className: 'text-sm font-medium',
                              children: 'Key Achievements:',
                            }),
                            /* @__PURE__ */ jsx13('ul', {
                              className: 'space-y-1 text-sm text-muted-foreground',
                              children: exp.achievements.map((achievement, idx) =>
                                /* @__PURE__ */ jsxs7(
                                  'li',
                                  { children: ['\u2022 ', achievement] },
                                  idx
                                )
                              ),
                            }),
                          ],
                        }),
                        /* @__PURE__ */ jsx13('div', {
                          className: 'flex flex-wrap gap-2',
                          children: exp.technologies.map(tech =>
                            /* @__PURE__ */ jsx13(
                              Badge,
                              { variant: 'secondary', children: tech },
                              tech
                            )
                          ),
                        }),
                      ],
                    }),
                  ],
                },
                index
              )
            ),
          }),
        ],
      }),
    }),
  });
}

// app/routes/projects.tsx
var projects_exports = {};
__export(projects_exports, {
  default: () => Projects,
  meta: () => meta2,
});
import { Github as Github2, ExternalLink } from 'lucide-react';
import { useState as useState6 } from 'react';

// app/components/adult-content-modal.tsx
import { AlertTriangle, Shield, Lock } from 'lucide-react';

// app/components/ui/dialog.tsx
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X as X2 } from 'lucide-react';
import * as React5 from 'react';
import { jsx as jsx14, jsxs as jsxs8 } from 'react/jsx-runtime';
var Dialog = DialogPrimitive.Root;
var DialogPortal = DialogPrimitive.Portal;
var DialogOverlay = React5.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsx14(DialogPrimitive.Overlay, {
    ref,
    className: cn(
      'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    ),
    ...props,
  })
);
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
var DialogContent = React5.forwardRef(({ className, children, ...props }, ref) =>
  /* @__PURE__ */ jsxs8(DialogPortal, {
    children: [
      /* @__PURE__ */ jsx14(DialogOverlay, {}),
      /* @__PURE__ */ jsxs8(DialogPrimitive.Content, {
        ref,
        className: cn(
          'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxs8(DialogPrimitive.Close, {
            className:
              'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground',
            children: [
              /* @__PURE__ */ jsx14(X2, { className: 'h-4 w-4' }),
              /* @__PURE__ */ jsx14('span', { className: 'sr-only', children: 'Close' }),
            ],
          }),
        ],
      }),
    ],
  })
);
DialogContent.displayName = DialogPrimitive.Content.displayName;
var DialogHeader = ({ className, ...props }) =>
  /* @__PURE__ */ jsx14('div', {
    className: cn('flex flex-col space-y-1.5 text-center sm:text-left', className),
    ...props,
  });
DialogHeader.displayName = 'DialogHeader';
var DialogFooter = ({ className, ...props }) =>
  /* @__PURE__ */ jsx14('div', {
    className: cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className),
    ...props,
  });
DialogFooter.displayName = 'DialogFooter';
var DialogTitle = React5.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsx14(DialogPrimitive.Title, {
    ref,
    className: cn('text-lg font-semibold leading-none tracking-tight', className),
    ...props,
  })
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;
var DialogDescription = React5.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsx14(DialogPrimitive.Description, {
    ref,
    className: cn('text-sm text-muted-foreground', className),
    ...props,
  })
);
DialogDescription.displayName = DialogPrimitive.Description.displayName;

// node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs
import { jsx as jsx17, Fragment } from 'react/jsx-runtime';
import {
  useMemo as useMemo3,
  useRef as useRef3,
  useState as useState4,
  useContext as useContext5,
} from 'react';

// node_modules/framer-motion/dist/es/context/LayoutGroupContext.mjs
import { createContext as createContext3 } from 'react';
var LayoutGroupContext = createContext3({});

// node_modules/framer-motion/dist/es/utils/use-constant.mjs
import { useRef } from 'react';
function useConstant(init) {
  let ref = useRef(null);
  return ref.current === null && (ref.current = init()), ref.current;
}

// node_modules/framer-motion/dist/es/components/AnimatePresence/PresenceChild.mjs
import { jsx as jsx16 } from 'react/jsx-runtime';
import * as React7 from 'react';
import { useId as useId2, useCallback, useMemo as useMemo2 } from 'react';

// node_modules/framer-motion/dist/es/context/PresenceContext.mjs
import { createContext as createContext4 } from 'react';
var PresenceContext = createContext4(null);

// node_modules/framer-motion/dist/es/components/AnimatePresence/PopChild.mjs
import { jsx as jsx15 } from 'react/jsx-runtime';
import * as React6 from 'react';
import { useId, useRef as useRef2, useContext as useContext3, useInsertionEffect } from 'react';

// node_modules/framer-motion/dist/es/context/MotionConfigContext.mjs
import { createContext as createContext5 } from 'react';
var MotionConfigContext = createContext5({
  transformPagePoint: p => p,
  isStatic: !1,
  reducedMotion: 'never',
});

// node_modules/framer-motion/dist/es/components/AnimatePresence/PopChild.mjs
var PopChildMeasure = class extends React6.Component {
  getSnapshotBeforeUpdate(prevProps) {
    let element = this.props.childRef.current;
    if (element && prevProps.isPresent && !this.props.isPresent) {
      let size = this.props.sizeRef.current;
      (size.height = element.offsetHeight || 0),
        (size.width = element.offsetWidth || 0),
        (size.top = element.offsetTop),
        (size.left = element.offsetLeft);
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {}
  render() {
    return this.props.children;
  }
};
function PopChild({ children, isPresent }) {
  let id3 = useId(),
    ref = useRef2(null),
    size = useRef2({
      width: 0,
      height: 0,
      top: 0,
      left: 0,
    }),
    { nonce } = useContext3(MotionConfigContext);
  return (
    useInsertionEffect(() => {
      let { width, height, top, left } = size.current;
      if (isPresent || !ref.current || !width || !height) return;
      ref.current.dataset.motionPopId = id3;
      let style = document.createElement('style');
      return (
        nonce && (style.nonce = nonce),
        document.head.appendChild(style),
        style.sheet &&
          style.sheet.insertRule(`
          [data-motion-pop-id="${id3}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            top: ${top}px !important;
            left: ${left}px !important;
          }
        `),
        () => {
          document.head.removeChild(style);
        }
      );
    }, [isPresent]),
    jsx15(PopChildMeasure, {
      isPresent,
      childRef: ref,
      sizeRef: size,
      children: React6.cloneElement(children, { ref }),
    })
  );
}

// node_modules/framer-motion/dist/es/components/AnimatePresence/PresenceChild.mjs
var PresenceChild = ({
  children,
  initial,
  isPresent,
  onExitComplete,
  custom,
  presenceAffectsLayout,
  mode: mode2,
}) => {
  let presenceChildren = useConstant(newChildrenMap),
    id3 = useId2(),
    memoizedOnExitComplete = useCallback(
      childId => {
        presenceChildren.set(childId, !0);
        for (let isComplete of presenceChildren.values()) if (!isComplete) return;
        onExitComplete && onExitComplete();
      },
      [presenceChildren, onExitComplete]
    ),
    context = useMemo2(
      () => ({
        id: id3,
        initial,
        isPresent,
        custom,
        onExitComplete: memoizedOnExitComplete,
        register: childId => (
          presenceChildren.set(childId, !1), () => presenceChildren.delete(childId)
        ),
      }),
      /**
       * If the presence of a child affects the layout of the components around it,
       * we want to make a new context value to ensure they get re-rendered
       * so they can detect that layout change.
       */
      presenceAffectsLayout
        ? [Math.random(), memoizedOnExitComplete]
        : [isPresent, memoizedOnExitComplete]
    );
  return (
    useMemo2(() => {
      presenceChildren.forEach((_, key) => presenceChildren.set(key, !1));
    }, [isPresent]),
    React7.useEffect(() => {
      !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
    }, [isPresent]),
    mode2 === 'popLayout' && (children = jsx16(PopChild, { isPresent, children })),
    jsx16(PresenceContext.Provider, { value: context, children })
  );
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}

// node_modules/framer-motion/dist/es/components/AnimatePresence/use-presence.mjs
import {
  useContext as useContext4,
  useId as useId3,
  useEffect as useEffect4,
  useCallback as useCallback2,
} from 'react';
function usePresence(subscribe = !0) {
  let context = useContext4(PresenceContext);
  if (context === null) return [!0, null];
  let { isPresent, onExitComplete, register } = context,
    id3 = useId3();
  useEffect4(() => {
    subscribe && register(id3);
  }, [subscribe]);
  let safeToRemove = useCallback2(
    () => subscribe && onExitComplete && onExitComplete(id3),
    [id3, onExitComplete, subscribe]
  );
  return !isPresent && onExitComplete ? [!1, safeToRemove] : [!0];
}

// node_modules/framer-motion/dist/es/components/AnimatePresence/utils.mjs
import { Children, isValidElement } from 'react';
var getChildKey = child => child.key || '';
function onlyElements(children) {
  let filtered = [];
  return (
    Children.forEach(children, child => {
      isValidElement(child) && filtered.push(child);
    }),
    filtered
  );
}

// node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs
import { useLayoutEffect, useEffect as useEffect5 } from 'react';

// node_modules/framer-motion/dist/es/utils/is-browser.mjs
var isBrowser = typeof window < 'u';

// node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs
var useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect5;

// node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs
var AnimatePresence = ({
  children,
  custom,
  initial = !0,
  onExitComplete,
  presenceAffectsLayout = !0,
  mode: mode2 = 'sync',
  propagate = !1,
}) => {
  let [isParentPresent, safeToRemove] = usePresence(propagate),
    presentChildren = useMemo3(() => onlyElements(children), [children]),
    presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey),
    isInitialRender = useRef3(!0),
    pendingPresentChildren = useRef3(presentChildren),
    exitComplete = useConstant(() => /* @__PURE__ */ new Map()),
    [diffedChildren, setDiffedChildren] = useState4(presentChildren),
    [renderedChildren, setRenderedChildren] = useState4(presentChildren);
  useIsomorphicLayoutEffect(() => {
    (isInitialRender.current = !1), (pendingPresentChildren.current = presentChildren);
    for (let i = 0; i < renderedChildren.length; i++) {
      let key = getChildKey(renderedChildren[i]);
      presentKeys.includes(key)
        ? exitComplete.delete(key)
        : exitComplete.get(key) !== !0 && exitComplete.set(key, !1);
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join('-')]);
  let exitingChildren = [];
  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];
    for (let i = 0; i < renderedChildren.length; i++) {
      let child = renderedChildren[i],
        key = getChildKey(child);
      presentKeys.includes(key) || (nextChildren.splice(i, 0, child), exitingChildren.push(child));
    }
    mode2 === 'wait' && exitingChildren.length && (nextChildren = exitingChildren),
      setRenderedChildren(onlyElements(nextChildren)),
      setDiffedChildren(presentChildren);
    return;
  }
  let { forceRender } = useContext5(LayoutGroupContext);
  return jsx17(Fragment, {
    children: renderedChildren.map(child => {
      let key = getChildKey(child),
        isPresent =
          propagate && !isParentPresent
            ? !1
            : presentChildren === renderedChildren || presentKeys.includes(key),
        onExit = () => {
          if (exitComplete.has(key)) exitComplete.set(key, !0);
          else return;
          let isEveryExitComplete = !0;
          exitComplete.forEach(isExitComplete => {
            isExitComplete || (isEveryExitComplete = !1);
          }),
            isEveryExitComplete &&
              (forceRender?.(),
              setRenderedChildren(pendingPresentChildren.current),
              propagate && safeToRemove?.(),
              onExitComplete && onExitComplete());
        };
      return jsx17(
        PresenceChild,
        {
          isPresent,
          initial: !isInitialRender.current || initial ? void 0 : !1,
          custom: isPresent ? void 0 : custom,
          presenceAffectsLayout,
          mode: mode2,
          onExitComplete: isPresent ? void 0 : onExit,
          children: child,
        },
        key
      );
    }),
  });
};

// node_modules/framer-motion/dist/es/frameloop/frame.mjs
import { noop } from 'motion-utils';

// node_modules/framer-motion/dist/es/utils/GlobalConfig.mjs
var MotionGlobalConfig = {
  skipAnimations: !1,
  useManualTiming: !1,
};

// node_modules/framer-motion/dist/es/frameloop/render-step.mjs
function createRenderStep(runNextFrame) {
  let thisFrame = /* @__PURE__ */ new Set(),
    nextFrame = /* @__PURE__ */ new Set(),
    isProcessing = !1,
    flushNextFrame = !1,
    toKeepAlive = /* @__PURE__ */ new WeakSet(),
    latestFrameData = {
      delta: 0,
      timestamp: 0,
      isProcessing: !1,
    };
  function triggerCallback(callback) {
    toKeepAlive.has(callback) && (step.schedule(callback), runNextFrame()),
      callback(latestFrameData);
  }
  let step = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (callback, keepAlive = !1, immediate = !1) => {
      let queue = immediate && isProcessing ? thisFrame : nextFrame;
      return (
        keepAlive && toKeepAlive.add(callback), queue.has(callback) || queue.add(callback), callback
      );
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: callback => {
      nextFrame.delete(callback), toKeepAlive.delete(callback);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: frameData2 => {
      if (((latestFrameData = frameData2), isProcessing)) {
        flushNextFrame = !0;
        return;
      }
      (isProcessing = !0),
        ([thisFrame, nextFrame] = [nextFrame, thisFrame]),
        thisFrame.forEach(triggerCallback),
        thisFrame.clear(),
        (isProcessing = !1),
        flushNextFrame && ((flushNextFrame = !1), step.process(frameData2));
    },
  };
  return step;
}

// node_modules/framer-motion/dist/es/frameloop/batcher.mjs
var stepsOrder = [
    'read',
    // Read
    'resolveKeyframes',
    // Write/Read/Write/Read
    'update',
    // Compute
    'preRender',
    // Compute
    'render',
    // Write
    'postRender',
    // Compute
  ],
  maxElapsed = 40;
function createRenderBatcher(scheduleNextBatch, allowKeepAlive) {
  let runNextFrame = !1,
    useDefaultElapsed = !0,
    state = {
      delta: 0,
      timestamp: 0,
      isProcessing: !1,
    },
    flagRunNextFrame = () => (runNextFrame = !0),
    steps = stepsOrder.reduce(
      (acc, key) => ((acc[key] = createRenderStep(flagRunNextFrame)), acc),
      {}
    ),
    { read, resolveKeyframes, update, preRender, render, postRender } = steps,
    processBatch = () => {
      let timestamp = MotionGlobalConfig.useManualTiming ? state.timestamp : performance.now();
      (runNextFrame = !1),
        (state.delta = useDefaultElapsed
          ? 1e3 / 60
          : Math.max(Math.min(timestamp - state.timestamp, maxElapsed), 1)),
        (state.timestamp = timestamp),
        (state.isProcessing = !0),
        read.process(state),
        resolveKeyframes.process(state),
        update.process(state),
        preRender.process(state),
        render.process(state),
        postRender.process(state),
        (state.isProcessing = !1),
        runNextFrame &&
          allowKeepAlive &&
          ((useDefaultElapsed = !1), scheduleNextBatch(processBatch));
    },
    wake = () => {
      (runNextFrame = !0),
        (useDefaultElapsed = !0),
        state.isProcessing || scheduleNextBatch(processBatch);
    };
  return {
    schedule: stepsOrder.reduce((acc, key) => {
      let step = steps[key];
      return (
        (acc[key] = (process2, keepAlive = !1, immediate = !1) => (
          runNextFrame || wake(), step.schedule(process2, keepAlive, immediate)
        )),
        acc
      );
    }, {}),
    cancel: process2 => {
      for (let i = 0; i < stepsOrder.length; i++) steps[stepsOrder[i]].cancel(process2);
    },
    state,
    steps,
  };
}

// node_modules/framer-motion/dist/es/frameloop/frame.mjs
var {
  schedule: frame,
  cancel: cancelFrame,
  state: frameData,
  steps: frameSteps,
} = createRenderBatcher(typeof requestAnimationFrame < 'u' ? requestAnimationFrame : noop, !0);

// node_modules/framer-motion/dist/es/context/LazyContext.mjs
import { createContext as createContext6 } from 'react';
var LazyContext = createContext6({ strict: !1 });

// node_modules/framer-motion/dist/es/motion/features/definitions.mjs
var featureProps = {
    animation: [
      'animate',
      'variants',
      'whileHover',
      'whileTap',
      'exit',
      'whileInView',
      'whileFocus',
      'whileDrag',
    ],
    exit: ['exit'],
    drag: ['drag', 'dragControls'],
    focus: ['whileFocus'],
    hover: ['whileHover', 'onHoverStart', 'onHoverEnd'],
    tap: ['whileTap', 'onTap', 'onTapStart', 'onTapCancel'],
    pan: ['onPan', 'onPanStart', 'onPanSessionStart', 'onPanEnd'],
    inView: ['whileInView', 'onViewportEnter', 'onViewportLeave'],
    layout: ['layout', 'layoutId'],
  },
  featureDefinitions = {};
for (let key in featureProps)
  featureDefinitions[key] = {
    isEnabled: props => featureProps[key].some(name => !!props[name]),
  };

// node_modules/framer-motion/dist/es/motion/features/load-features.mjs
function loadFeatures(features) {
  for (let key in features)
    featureDefinitions[key] = {
      ...featureDefinitions[key],
      ...features[key],
    };
}

// node_modules/framer-motion/dist/es/motion/utils/valid-prop.mjs
var validMotionProps = /* @__PURE__ */ new Set([
  'animate',
  'exit',
  'variants',
  'initial',
  'style',
  'values',
  'variants',
  'transition',
  'transformTemplate',
  'custom',
  'inherit',
  'onBeforeLayoutMeasure',
  'onAnimationStart',
  'onAnimationComplete',
  'onUpdate',
  'onDragStart',
  'onDrag',
  'onDragEnd',
  'onMeasureDragConstraints',
  'onDirectionLock',
  'onDragTransitionEnd',
  '_dragX',
  '_dragY',
  'onHoverStart',
  'onHoverEnd',
  'onViewportEnter',
  'onViewportLeave',
  'globalTapTarget',
  'ignoreStrict',
  'viewport',
]);
function isValidMotionProp(key) {
  return (
    key.startsWith('while') ||
    (key.startsWith('drag') && key !== 'draggable') ||
    key.startsWith('layout') ||
    key.startsWith('onTap') ||
    key.startsWith('onPan') ||
    key.startsWith('onLayout') ||
    validMotionProps.has(key)
  );
}

// node_modules/framer-motion/dist/es/render/dom/utils/filter-props.mjs
var shouldForward = key => !isValidMotionProp(key);
function loadExternalIsValidProp(isValidProp) {
  isValidProp &&
    (shouldForward = key => (key.startsWith('on') ? !isValidMotionProp(key) : isValidProp(key)));
}
try {
  loadExternalIsValidProp(__require('@emotion/is-prop-valid').default);
} catch {}
function filterProps(props, isDom, forwardMotionProps) {
  let filteredProps = {};
  for (let key in props)
    (key === 'values' && typeof props.values == 'object') ||
      ((shouldForward(key) ||
        (forwardMotionProps === !0 && isValidMotionProp(key)) ||
        (!isDom && !isValidMotionProp(key)) || // If trying to use native HTML drag events, forward drag listeners
        (props.draggable && key.startsWith('onDrag'))) &&
        (filteredProps[key] = props[key]));
  return filteredProps;
}

// node_modules/framer-motion/dist/es/render/components/create-proxy.mjs
function createDOMMotionComponentProxy(componentFactory) {
  if (typeof Proxy > 'u') return componentFactory;
  let componentCache = /* @__PURE__ */ new Map(),
    deprecatedFactoryFunction = (...args) => componentFactory(...args);
  return new Proxy(deprecatedFactoryFunction, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (_target, key) =>
      key === 'create'
        ? componentFactory
        : (componentCache.has(key) || componentCache.set(key, componentFactory(key)),
          componentCache.get(key)),
  });
}

// node_modules/framer-motion/dist/es/motion/index.mjs
import { jsxs as jsxs9, jsx as jsx18 } from 'react/jsx-runtime';
import 'motion-utils';
import { forwardRef as forwardRef5, useContext as useContext8 } from 'react';

// node_modules/framer-motion/dist/es/context/MotionContext/index.mjs
import { createContext as createContext7 } from 'react';
var MotionContext = createContext7({});

// node_modules/framer-motion/dist/es/context/MotionContext/create.mjs
import { useContext as useContext6, useMemo as useMemo4 } from 'react';

// node_modules/framer-motion/dist/es/render/utils/is-variant-label.mjs
function isVariantLabel(v) {
  return typeof v == 'string' || Array.isArray(v);
}

// node_modules/framer-motion/dist/es/animation/utils/is-animation-controls.mjs
function isAnimationControls(v) {
  return v !== null && typeof v == 'object' && typeof v.start == 'function';
}

// node_modules/framer-motion/dist/es/render/utils/variant-props.mjs
var variantPriorityOrder = [
    'animate',
    'whileInView',
    'whileFocus',
    'whileHover',
    'whileTap',
    'whileDrag',
    'exit',
  ],
  variantProps = ['initial', ...variantPriorityOrder];

// node_modules/framer-motion/dist/es/render/utils/is-controlling-variants.mjs
function isControllingVariants(props) {
  return (
    isAnimationControls(props.animate) || variantProps.some(name => isVariantLabel(props[name]))
  );
}
function isVariantNode(props) {
  return Boolean(isControllingVariants(props) || props.variants);
}

// node_modules/framer-motion/dist/es/context/MotionContext/utils.mjs
function getCurrentTreeVariants(props, context) {
  if (isControllingVariants(props)) {
    let { initial, animate } = props;
    return {
      initial: initial === !1 || isVariantLabel(initial) ? initial : void 0,
      animate: isVariantLabel(animate) ? animate : void 0,
    };
  }
  return props.inherit !== !1 ? context : {};
}

// node_modules/framer-motion/dist/es/context/MotionContext/create.mjs
function useCreateMotionContext(props) {
  let { initial, animate } = getCurrentTreeVariants(props, useContext6(MotionContext));
  return useMemo4(
    () => ({ initial, animate }),
    [variantLabelsAsDependency(initial), variantLabelsAsDependency(animate)]
  );
}
function variantLabelsAsDependency(prop) {
  return Array.isArray(prop) ? prop.join(' ') : prop;
}

// node_modules/framer-motion/dist/es/motion/utils/symbol.mjs
var motionComponentSymbol = Symbol.for('motionComponentSymbol');

// node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.mjs
import { useCallback as useCallback3 } from 'react';

// node_modules/framer-motion/dist/es/utils/is-ref-object.mjs
function isRefObject(ref) {
  return ref && typeof ref == 'object' && Object.prototype.hasOwnProperty.call(ref, 'current');
}

// node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.mjs
function useMotionRef(visualState, visualElement, externalRef) {
  return useCallback3(
    instance => {
      instance && visualState.onMount && visualState.onMount(instance),
        visualElement && (instance ? visualElement.mount(instance) : visualElement.unmount()),
        externalRef &&
          (typeof externalRef == 'function'
            ? externalRef(instance)
            : isRefObject(externalRef) && (externalRef.current = instance));
    },
    /**
     * Only pass a new ref callback to React if we've received a visual element
     * factory. Otherwise we'll be mounting/remounting every time externalRef
     * or other dependencies change.
     */
    [visualElement]
  );
}

// node_modules/framer-motion/dist/es/motion/utils/use-visual-element.mjs
import {
  useContext as useContext7,
  useRef as useRef4,
  useInsertionEffect as useInsertionEffect2,
  useEffect as useEffect6,
} from 'react';

// node_modules/framer-motion/dist/es/render/dom/utils/camel-to-dash.mjs
var camelToDash = str => str.replace(/([a-z])([A-Z])/gu, '$1-$2').toLowerCase();

// node_modules/framer-motion/dist/es/animation/optimized-appear/data-id.mjs
var optimizedAppearDataId = 'framerAppearId',
  optimizedAppearDataAttribute = 'data-' + camelToDash(optimizedAppearDataId);

// node_modules/framer-motion/dist/es/frameloop/microtask.mjs
var { schedule: microtask, cancel: cancelMicrotask } = createRenderBatcher(queueMicrotask, !1);

// node_modules/framer-motion/dist/es/context/SwitchLayoutGroupContext.mjs
import { createContext as createContext8 } from 'react';
var SwitchLayoutGroupContext = createContext8({});

// node_modules/framer-motion/dist/es/motion/utils/use-visual-element.mjs
function useVisualElement(
  Component3,
  visualState,
  props,
  createVisualElement,
  ProjectionNodeConstructor
) {
  var _a, _b;
  let { visualElement: parent } = useContext7(MotionContext),
    lazyContext = useContext7(LazyContext),
    presenceContext = useContext7(PresenceContext),
    reducedMotionConfig = useContext7(MotionConfigContext).reducedMotion,
    visualElementRef = useRef4(null);
  (createVisualElement = createVisualElement || lazyContext.renderer),
    !visualElementRef.current &&
      createVisualElement &&
      (visualElementRef.current = createVisualElement(Component3, {
        visualState,
        parent,
        props,
        presenceContext,
        blockInitialAnimation: presenceContext ? presenceContext.initial === !1 : !1,
        reducedMotionConfig,
      }));
  let visualElement = visualElementRef.current,
    initialLayoutGroupConfig = useContext7(SwitchLayoutGroupContext);
  visualElement &&
    !visualElement.projection &&
    ProjectionNodeConstructor &&
    (visualElement.type === 'html' || visualElement.type === 'svg') &&
    createProjectionNode(
      visualElementRef.current,
      props,
      ProjectionNodeConstructor,
      initialLayoutGroupConfig
    );
  let isMounted = useRef4(!1);
  useInsertionEffect2(() => {
    visualElement && isMounted.current && visualElement.update(props, presenceContext);
  });
  let optimisedAppearId = props[optimizedAppearDataAttribute],
    wantsHandoff = useRef4(
      Boolean(optimisedAppearId) &&
        !(
          !((_a = window.MotionHandoffIsComplete) === null || _a === void 0) &&
          _a.call(window, optimisedAppearId)
        ) &&
        ((_b = window.MotionHasOptimisedAnimation) === null || _b === void 0
          ? void 0
          : _b.call(window, optimisedAppearId))
    );
  return (
    useIsomorphicLayoutEffect(() => {
      visualElement &&
        ((isMounted.current = !0),
        (window.MotionIsMounted = !0),
        visualElement.updateFeatures(),
        microtask.render(visualElement.render),
        wantsHandoff.current &&
          visualElement.animationState &&
          visualElement.animationState.animateChanges());
    }),
    useEffect6(() => {
      visualElement &&
        (!wantsHandoff.current &&
          visualElement.animationState &&
          visualElement.animationState.animateChanges(),
        wantsHandoff.current &&
          (queueMicrotask(() => {
            var _a2;
            (_a2 = window.MotionHandoffMarkAsComplete) === null ||
              _a2 === void 0 ||
              _a2.call(window, optimisedAppearId);
          }),
          (wantsHandoff.current = !1)));
    }),
    visualElement
  );
}
function createProjectionNode(
  visualElement,
  props,
  ProjectionNodeConstructor,
  initialPromotionConfig
) {
  let { layoutId, layout: layout2, drag: drag2, dragConstraints, layoutScroll, layoutRoot } = props;
  (visualElement.projection = new ProjectionNodeConstructor(
    visualElement.latestValues,
    props['data-framer-portal-id'] ? void 0 : getClosestProjectingNode(visualElement.parent)
  )),
    visualElement.projection.setOptions({
      layoutId,
      layout: layout2,
      alwaysMeasureLayout: Boolean(drag2) || (dragConstraints && isRefObject(dragConstraints)),
      visualElement,
      /**
       * TODO: Update options in an effect. This could be tricky as it'll be too late
       * to update by the time layout animations run.
       * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
       * ensuring it gets called if there's no potential layout animations.
       *
       */
      animationType: typeof layout2 == 'string' ? layout2 : 'both',
      initialPromotionConfig,
      layoutScroll,
      layoutRoot,
    });
}
function getClosestProjectingNode(visualElement) {
  if (visualElement)
    return visualElement.options.allowProjection !== !1
      ? visualElement.projection
      : getClosestProjectingNode(visualElement.parent);
}

// node_modules/framer-motion/dist/es/motion/index.mjs
function createRendererMotionComponent({
  preloadedFeatures,
  createVisualElement,
  useRender,
  useVisualState,
  Component: Component3,
}) {
  var _a, _b;
  preloadedFeatures && loadFeatures(preloadedFeatures);
  function MotionComponent(props, externalRef) {
    let MeasureLayout2,
      configAndProps = {
        ...useContext8(MotionConfigContext),
        ...props,
        layoutId: useLayoutId(props),
      },
      { isStatic } = configAndProps,
      context = useCreateMotionContext(props),
      visualState = useVisualState(props, isStatic);
    if (!isStatic && isBrowser) {
      useStrictMode(configAndProps, preloadedFeatures);
      let layoutProjection = getProjectionFunctionality(configAndProps);
      (MeasureLayout2 = layoutProjection.MeasureLayout),
        (context.visualElement = useVisualElement(
          Component3,
          visualState,
          configAndProps,
          createVisualElement,
          layoutProjection.ProjectionNode
        ));
    }
    return jsxs9(MotionContext.Provider, {
      value: context,
      children: [
        MeasureLayout2 && context.visualElement
          ? jsx18(MeasureLayout2, { visualElement: context.visualElement, ...configAndProps })
          : null,
        useRender(
          Component3,
          props,
          useMotionRef(visualState, context.visualElement, externalRef),
          visualState,
          isStatic,
          context.visualElement
        ),
      ],
    });
  }
  MotionComponent.displayName = `motion.${typeof Component3 == 'string' ? Component3 : `create(${(_b = (_a = Component3.displayName) !== null && _a !== void 0 ? _a : Component3.name) !== null && _b !== void 0 ? _b : ''})`}`;
  let ForwardRefMotionComponent = forwardRef5(MotionComponent);
  return (ForwardRefMotionComponent[motionComponentSymbol] = Component3), ForwardRefMotionComponent;
}
function useLayoutId({ layoutId }) {
  let layoutGroupId = useContext8(LayoutGroupContext).id;
  return layoutGroupId && layoutId !== void 0 ? layoutGroupId + '-' + layoutId : layoutId;
}
function useStrictMode(configAndProps, preloadedFeatures) {
  let isStrict = useContext8(LazyContext).strict;
}
function getProjectionFunctionality(props) {
  let { drag: drag2, layout: layout2 } = featureDefinitions;
  if (!drag2 && !layout2) return {};
  let combined = { ...drag2, ...layout2 };
  return {
    MeasureLayout:
      drag2?.isEnabled(props) || layout2?.isEnabled(props) ? combined.MeasureLayout : void 0,
    ProjectionNode: combined.ProjectionNode,
  };
}

// node_modules/framer-motion/dist/es/render/svg/lowercase-elements.mjs
var lowercaseSVGElements = [
  'animate',
  'circle',
  'defs',
  'desc',
  'ellipse',
  'g',
  'image',
  'line',
  'filter',
  'marker',
  'mask',
  'metadata',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'rect',
  'stop',
  'switch',
  'symbol',
  'svg',
  'text',
  'tspan',
  'use',
  'view',
];

// node_modules/framer-motion/dist/es/render/dom/utils/is-svg-component.mjs
function isSVGComponent(Component3) {
  return (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof Component3 != 'string' /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */ || Component3.includes('-')
      ? !1
      : /**
         * If it's in our list of lowercase SVG tags, it's an SVG component
         */
        !!(
          lowercaseSVGElements.indexOf(Component3) > -1 /**
           * If it contains a capital letter, it's an SVG component
           */ || /[A-Z]/u.test(Component3)
        )
  );
}

// node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs
import { useContext as useContext9 } from 'react';

// node_modules/framer-motion/dist/es/render/utils/resolve-variants.mjs
function getValueState(visualElement) {
  let state = [{}, {}];
  return (
    visualElement?.values.forEach((value, key) => {
      (state[0][key] = value.get()), (state[1][key] = value.getVelocity());
    }),
    state
  );
}
function resolveVariantFromProps(props, definition, custom, visualElement) {
  if (typeof definition == 'function') {
    let [current, velocity] = getValueState(visualElement);
    definition = definition(custom !== void 0 ? custom : props.custom, current, velocity);
  }
  if (
    (typeof definition == 'string' && (definition = props.variants && props.variants[definition]),
    typeof definition == 'function')
  ) {
    let [current, velocity] = getValueState(visualElement);
    definition = definition(custom !== void 0 ? custom : props.custom, current, velocity);
  }
  return definition;
}

// node_modules/framer-motion/dist/es/animation/utils/is-keyframes-target.mjs
var isKeyframesTarget = v => Array.isArray(v);

// node_modules/framer-motion/dist/es/utils/resolve-value.mjs
var isCustomValue = v => Boolean(v && typeof v == 'object' && v.mix && v.toValue),
  resolveFinalValueInKeyframes = v => (isKeyframesTarget(v) ? v[v.length - 1] || 0 : v);

// node_modules/framer-motion/dist/es/value/utils/is-motion-value.mjs
var isMotionValue = value => Boolean(value && value.getVelocity);

// node_modules/framer-motion/dist/es/value/utils/resolve-motion-value.mjs
function resolveMotionValue(value) {
  let unwrappedValue = isMotionValue(value) ? value.get() : value;
  return isCustomValue(unwrappedValue) ? unwrappedValue.toValue() : unwrappedValue;
}

// node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs
function makeState(
  { scrapeMotionValuesFromProps: scrapeMotionValuesFromProps3, createRenderState, onUpdate },
  props,
  context,
  presenceContext
) {
  let state = {
    latestValues: makeLatestValues(props, context, presenceContext, scrapeMotionValuesFromProps3),
    renderState: createRenderState(),
  };
  return (
    onUpdate &&
      ((state.onMount = instance => onUpdate({ props, current: instance, ...state })),
      (state.onUpdate = visualElement => onUpdate(visualElement))),
    state
  );
}
var makeUseVisualState = config => (props, isStatic) => {
  let context = useContext9(MotionContext),
    presenceContext = useContext9(PresenceContext),
    make = () => makeState(config, props, context, presenceContext);
  return isStatic ? make() : useConstant(make);
};
function makeLatestValues(props, context, presenceContext, scrapeMotionValues) {
  let values = {},
    motionValues = scrapeMotionValues(props, {});
  for (let key in motionValues) values[key] = resolveMotionValue(motionValues[key]);
  let { initial, animate } = props,
    isControllingVariants$1 = isControllingVariants(props),
    isVariantNode$1 = isVariantNode(props);
  context &&
    isVariantNode$1 &&
    !isControllingVariants$1 &&
    props.inherit !== !1 &&
    (initial === void 0 && (initial = context.initial),
    animate === void 0 && (animate = context.animate));
  let isInitialAnimationBlocked = presenceContext ? presenceContext.initial === !1 : !1;
  isInitialAnimationBlocked = isInitialAnimationBlocked || initial === !1;
  let variantToSet = isInitialAnimationBlocked ? animate : initial;
  if (variantToSet && typeof variantToSet != 'boolean' && !isAnimationControls(variantToSet)) {
    let list = Array.isArray(variantToSet) ? variantToSet : [variantToSet];
    for (let i = 0; i < list.length; i++) {
      let resolved = resolveVariantFromProps(props, list[i]);
      if (resolved) {
        let { transitionEnd, transition, ...target } = resolved;
        for (let key in target) {
          let valueTarget = target[key];
          if (Array.isArray(valueTarget)) {
            let index = isInitialAnimationBlocked ? valueTarget.length - 1 : 0;
            valueTarget = valueTarget[index];
          }
          valueTarget !== null && (values[key] = valueTarget);
        }
        for (let key in transitionEnd) values[key] = transitionEnd[key];
      }
    }
  }
  return values;
}

// node_modules/framer-motion/dist/es/render/html/utils/keys-transform.mjs
var transformPropOrder = [
    'transformPerspective',
    'x',
    'y',
    'z',
    'translateX',
    'translateY',
    'translateZ',
    'scale',
    'scaleX',
    'scaleY',
    'rotate',
    'rotateX',
    'rotateY',
    'rotateZ',
    'skew',
    'skewX',
    'skewY',
  ],
  transformProps = new Set(transformPropOrder);

// node_modules/framer-motion/dist/es/render/dom/utils/is-css-variable.mjs
var checkStringStartsWith = token => key => typeof key == 'string' && key.startsWith(token),
  isCSSVariableName = /* @__PURE__ */ checkStringStartsWith('--'),
  startsAsVariableToken = /* @__PURE__ */ checkStringStartsWith('var(--'),
  isCSSVariableToken = value =>
    startsAsVariableToken(value) ? singleCssVariableRegex.test(value.split('/*')[0].trim()) : !1,
  singleCssVariableRegex =
    /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;

// node_modules/framer-motion/dist/es/render/dom/value-types/get-as-type.mjs
var getValueAsType = (value, type) =>
  type && typeof value == 'number' ? type.transform(value) : value;

// node_modules/framer-motion/dist/es/utils/clamp.mjs
var clamp = (min, max, v) => (v > max ? max : v < min ? min : v);

// node_modules/framer-motion/dist/es/value/types/numbers/index.mjs
var number = {
    test: v => typeof v == 'number',
    parse: parseFloat,
    transform: v => v,
  },
  alpha = {
    ...number,
    transform: v => clamp(0, 1, v),
  },
  scale = {
    ...number,
    default: 1,
  };

// node_modules/framer-motion/dist/es/value/types/numbers/units.mjs
var createUnitType = unit => ({
    test: v => typeof v == 'string' && v.endsWith(unit) && v.split(' ').length === 1,
    parse: parseFloat,
    transform: v => `${v}${unit}`,
  }),
  degrees = /* @__PURE__ */ createUnitType('deg'),
  percent = /* @__PURE__ */ createUnitType('%'),
  px = /* @__PURE__ */ createUnitType('px'),
  vh = /* @__PURE__ */ createUnitType('vh'),
  vw = /* @__PURE__ */ createUnitType('vw'),
  progressPercentage = {
    ...percent,
    parse: v => percent.parse(v) / 100,
    transform: v => percent.transform(v * 100),
  };

// node_modules/framer-motion/dist/es/render/dom/value-types/number-browser.mjs
var browserNumberValueTypes = {
  // Border props
  borderWidth: px,
  borderTopWidth: px,
  borderRightWidth: px,
  borderBottomWidth: px,
  borderLeftWidth: px,
  borderRadius: px,
  radius: px,
  borderTopLeftRadius: px,
  borderTopRightRadius: px,
  borderBottomRightRadius: px,
  borderBottomLeftRadius: px,
  // Positioning props
  width: px,
  maxWidth: px,
  height: px,
  maxHeight: px,
  top: px,
  right: px,
  bottom: px,
  left: px,
  // Spacing props
  padding: px,
  paddingTop: px,
  paddingRight: px,
  paddingBottom: px,
  paddingLeft: px,
  margin: px,
  marginTop: px,
  marginRight: px,
  marginBottom: px,
  marginLeft: px,
  // Misc
  backgroundPositionX: px,
  backgroundPositionY: px,
};

// node_modules/framer-motion/dist/es/render/dom/value-types/transform.mjs
var transformValueTypes = {
  rotate: degrees,
  rotateX: degrees,
  rotateY: degrees,
  rotateZ: degrees,
  scale,
  scaleX: scale,
  scaleY: scale,
  scaleZ: scale,
  skew: degrees,
  skewX: degrees,
  skewY: degrees,
  distance: px,
  translateX: px,
  translateY: px,
  translateZ: px,
  x: px,
  y: px,
  z: px,
  perspective: px,
  transformPerspective: px,
  opacity: alpha,
  originX: progressPercentage,
  originY: progressPercentage,
  originZ: px,
};

// node_modules/framer-motion/dist/es/render/dom/value-types/type-int.mjs
var int = {
  ...number,
  transform: Math.round,
};

// node_modules/framer-motion/dist/es/render/dom/value-types/number.mjs
var numberValueTypes = {
  ...browserNumberValueTypes,
  ...transformValueTypes,
  zIndex: int,
  size: px,
  // SVG
  fillOpacity: alpha,
  strokeOpacity: alpha,
  numOctaves: int,
};

// node_modules/framer-motion/dist/es/render/html/utils/build-transform.mjs
var translateAlias = {
    x: 'translateX',
    y: 'translateY',
    z: 'translateZ',
    transformPerspective: 'perspective',
  },
  numTransforms = transformPropOrder.length;
function buildTransform(latestValues, transform2, transformTemplate) {
  let transformString = '',
    transformIsDefault = !0;
  for (let i = 0; i < numTransforms; i++) {
    let key = transformPropOrder[i],
      value = latestValues[key];
    if (value === void 0) continue;
    let valueIsDefault = !0;
    if (
      (typeof value == 'number'
        ? (valueIsDefault = value === (key.startsWith('scale') ? 1 : 0))
        : (valueIsDefault = parseFloat(value) === 0),
      !valueIsDefault || transformTemplate)
    ) {
      let valueAsType = getValueAsType(value, numberValueTypes[key]);
      if (!valueIsDefault) {
        transformIsDefault = !1;
        let transformName = translateAlias[key] || key;
        transformString += `${transformName}(${valueAsType}) `;
      }
      transformTemplate && (transform2[key] = valueAsType);
    }
  }
  return (
    (transformString = transformString.trim()),
    transformTemplate
      ? (transformString = transformTemplate(transform2, transformIsDefault ? '' : transformString))
      : transformIsDefault && (transformString = 'none'),
    transformString
  );
}

// node_modules/framer-motion/dist/es/render/html/utils/build-styles.mjs
function buildHTMLStyles(state, latestValues, transformTemplate) {
  let { style, vars, transformOrigin } = state,
    hasTransform2 = !1,
    hasTransformOrigin = !1;
  for (let key in latestValues) {
    let value = latestValues[key];
    if (transformProps.has(key)) {
      hasTransform2 = !0;
      continue;
    } else if (isCSSVariableName(key)) {
      vars[key] = value;
      continue;
    } else {
      let valueAsType = getValueAsType(value, numberValueTypes[key]);
      key.startsWith('origin')
        ? ((hasTransformOrigin = !0), (transformOrigin[key] = valueAsType))
        : (style[key] = valueAsType);
    }
  }
  if (
    (latestValues.transform ||
      (hasTransform2 || transformTemplate
        ? (style.transform = buildTransform(latestValues, state.transform, transformTemplate))
        : style.transform && (style.transform = 'none')),
    hasTransformOrigin)
  ) {
    let { originX = '50%', originY = '50%', originZ = 0 } = transformOrigin;
    style.transformOrigin = `${originX} ${originY} ${originZ}`;
  }
}

// node_modules/framer-motion/dist/es/render/svg/utils/path.mjs
var dashKeys = {
    offset: 'stroke-dashoffset',
    array: 'stroke-dasharray',
  },
  camelKeys = {
    offset: 'strokeDashoffset',
    array: 'strokeDasharray',
  };
function buildSVGPath(attrs, length, spacing = 1, offset = 0, useDashCase = !0) {
  attrs.pathLength = 1;
  let keys = useDashCase ? dashKeys : camelKeys;
  attrs[keys.offset] = px.transform(-offset);
  let pathLength = px.transform(length),
    pathSpacing = px.transform(spacing);
  attrs[keys.array] = `${pathLength} ${pathSpacing}`;
}

// node_modules/framer-motion/dist/es/render/svg/utils/transform-origin.mjs
function calcOrigin(origin, offset, size) {
  return typeof origin == 'string' ? origin : px.transform(offset + size * origin);
}
function calcSVGTransformOrigin(dimensions, originX, originY) {
  let pxOriginX = calcOrigin(originX, dimensions.x, dimensions.width),
    pxOriginY = calcOrigin(originY, dimensions.y, dimensions.height);
  return `${pxOriginX} ${pxOriginY}`;
}

// node_modules/framer-motion/dist/es/render/svg/utils/build-attrs.mjs
function buildSVGAttrs(
  state,
  {
    attrX,
    attrY,
    attrScale,
    originX,
    originY,
    pathLength,
    pathSpacing = 1,
    pathOffset = 0,
    // This is object creation, which we try to avoid per-frame.
    ...latest
  },
  isSVGTag2,
  transformTemplate
) {
  if ((buildHTMLStyles(state, latest, transformTemplate), isSVGTag2)) {
    state.style.viewBox && (state.attrs.viewBox = state.style.viewBox);
    return;
  }
  (state.attrs = state.style), (state.style = {});
  let { attrs, style, dimensions } = state;
  attrs.transform && (dimensions && (style.transform = attrs.transform), delete attrs.transform),
    dimensions &&
      (originX !== void 0 || originY !== void 0 || style.transform) &&
      (style.transformOrigin = calcSVGTransformOrigin(
        dimensions,
        originX !== void 0 ? originX : 0.5,
        originY !== void 0 ? originY : 0.5
      )),
    attrX !== void 0 && (attrs.x = attrX),
    attrY !== void 0 && (attrs.y = attrY),
    attrScale !== void 0 && (attrs.scale = attrScale),
    pathLength !== void 0 && buildSVGPath(attrs, pathLength, pathSpacing, pathOffset, !1);
}

// node_modules/framer-motion/dist/es/render/html/utils/create-render-state.mjs
var createHtmlRenderState = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {},
});

// node_modules/framer-motion/dist/es/render/svg/utils/create-render-state.mjs
var createSvgRenderState = () => ({
  ...createHtmlRenderState(),
  attrs: {},
});

// node_modules/framer-motion/dist/es/render/svg/utils/is-svg-tag.mjs
var isSVGTag = tag => typeof tag == 'string' && tag.toLowerCase() === 'svg';

// node_modules/framer-motion/dist/es/render/html/utils/render.mjs
function renderHTML(element, { style, vars }, styleProp, projection) {
  Object.assign(element.style, style, projection && projection.getProjectionStyles(styleProp));
  for (let key in vars) element.style.setProperty(key, vars[key]);
}

// node_modules/framer-motion/dist/es/render/svg/utils/camel-case-attrs.mjs
var camelCaseAttributes = /* @__PURE__ */ new Set([
  'baseFrequency',
  'diffuseConstant',
  'kernelMatrix',
  'kernelUnitLength',
  'keySplines',
  'keyTimes',
  'limitingConeAngle',
  'markerHeight',
  'markerWidth',
  'numOctaves',
  'targetX',
  'targetY',
  'surfaceScale',
  'specularConstant',
  'specularExponent',
  'stdDeviation',
  'tableValues',
  'viewBox',
  'gradientTransform',
  'pathLength',
  'startOffset',
  'textLength',
  'lengthAdjust',
]);

// node_modules/framer-motion/dist/es/render/svg/utils/render.mjs
function renderSVG(element, renderState, _styleProp, projection) {
  renderHTML(element, renderState, void 0, projection);
  for (let key in renderState.attrs)
    element.setAttribute(
      camelCaseAttributes.has(key) ? key : camelToDash(key),
      renderState.attrs[key]
    );
}

// node_modules/framer-motion/dist/es/projection/styles/scale-correction.mjs
var scaleCorrectors = {};
function addScaleCorrector(correctors) {
  Object.assign(scaleCorrectors, correctors);
}

// node_modules/framer-motion/dist/es/motion/utils/is-forced-motion-value.mjs
function isForcedMotionValue(key, { layout: layout2, layoutId }) {
  return (
    transformProps.has(key) ||
    key.startsWith('origin') ||
    ((layout2 || layoutId !== void 0) && (!!scaleCorrectors[key] || key === 'opacity'))
  );
}

// node_modules/framer-motion/dist/es/render/html/utils/scrape-motion-values.mjs
function scrapeMotionValuesFromProps(props, prevProps, visualElement) {
  var _a;
  let { style } = props,
    newValues = {};
  for (let key in style)
    (isMotionValue(style[key]) ||
      (prevProps.style && isMotionValue(prevProps.style[key])) ||
      isForcedMotionValue(key, props) ||
      ((_a = visualElement?.getValue(key)) === null || _a === void 0 ? void 0 : _a.liveStyle) !==
        void 0) &&
      (newValues[key] = style[key]);
  return newValues;
}

// node_modules/framer-motion/dist/es/render/svg/utils/scrape-motion-values.mjs
function scrapeMotionValuesFromProps2(props, prevProps, visualElement) {
  let newValues = scrapeMotionValuesFromProps(props, prevProps, visualElement);
  for (let key in props)
    if (isMotionValue(props[key]) || isMotionValue(prevProps[key])) {
      let targetKey =
        transformPropOrder.indexOf(key) !== -1
          ? 'attr' + key.charAt(0).toUpperCase() + key.substring(1)
          : key;
      newValues[targetKey] = props[key];
    }
  return newValues;
}

// node_modules/framer-motion/dist/es/render/svg/config-motion.mjs
function updateSVGDimensions(instance, renderState) {
  try {
    renderState.dimensions =
      typeof instance.getBBox == 'function' ? instance.getBBox() : instance.getBoundingClientRect();
  } catch {
    renderState.dimensions = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
  }
}
var layoutProps = ['x', 'y', 'width', 'height', 'cx', 'cy', 'r'],
  svgMotionConfig = {
    useVisualState: makeUseVisualState({
      scrapeMotionValuesFromProps: scrapeMotionValuesFromProps2,
      createRenderState: createSvgRenderState,
      onUpdate: ({ props, prevProps, current, renderState, latestValues }) => {
        if (!current) return;
        let hasTransform2 = !!props.drag;
        if (!hasTransform2) {
          for (let key in latestValues)
            if (transformProps.has(key)) {
              hasTransform2 = !0;
              break;
            }
        }
        if (!hasTransform2) return;
        let needsMeasure = !prevProps;
        if (prevProps)
          for (let i = 0; i < layoutProps.length; i++) {
            let key = layoutProps[i];
            props[key] !== prevProps[key] && (needsMeasure = !0);
          }
        needsMeasure &&
          frame.read(() => {
            updateSVGDimensions(current, renderState),
              frame.render(() => {
                buildSVGAttrs(
                  renderState,
                  latestValues,
                  isSVGTag(current.tagName),
                  props.transformTemplate
                ),
                  renderSVG(current, renderState);
              });
          });
      },
    }),
  };

// node_modules/framer-motion/dist/es/render/html/config-motion.mjs
var htmlMotionConfig = {
  useVisualState: makeUseVisualState({
    scrapeMotionValuesFromProps,
    createRenderState: createHtmlRenderState,
  }),
};

// node_modules/framer-motion/dist/es/render/dom/use-render.mjs
import { Fragment as Fragment2, useMemo as useMemo7, createElement } from 'react';

// node_modules/framer-motion/dist/es/render/html/use-props.mjs
import { useMemo as useMemo5 } from 'react';
function copyRawValuesOnly(target, source, props) {
  for (let key in source)
    !isMotionValue(source[key]) && !isForcedMotionValue(key, props) && (target[key] = source[key]);
}
function useInitialMotionValues({ transformTemplate }, visualState) {
  return useMemo5(() => {
    let state = createHtmlRenderState();
    return (
      buildHTMLStyles(state, visualState, transformTemplate),
      Object.assign({}, state.vars, state.style)
    );
  }, [visualState]);
}
function useStyle(props, visualState) {
  let styleProp = props.style || {},
    style = {};
  return (
    copyRawValuesOnly(style, styleProp, props),
    Object.assign(style, useInitialMotionValues(props, visualState)),
    style
  );
}
function useHTMLProps(props, visualState) {
  let htmlProps = {},
    style = useStyle(props, visualState);
  return (
    props.drag &&
      props.dragListener !== !1 &&
      ((htmlProps.draggable = !1),
      (style.userSelect = style.WebkitUserSelect = style.WebkitTouchCallout = 'none'),
      (style.touchAction = props.drag === !0 ? 'none' : `pan-${props.drag === 'x' ? 'y' : 'x'}`)),
    props.tabIndex === void 0 &&
      (props.onTap || props.onTapStart || props.whileTap) &&
      (htmlProps.tabIndex = 0),
    (htmlProps.style = style),
    htmlProps
  );
}

// node_modules/framer-motion/dist/es/render/svg/use-props.mjs
import { useMemo as useMemo6 } from 'react';
function useSVGProps(props, visualState, _isStatic, Component3) {
  let visualProps = useMemo6(() => {
    let state = createSvgRenderState();
    return (
      buildSVGAttrs(state, visualState, isSVGTag(Component3), props.transformTemplate),
      {
        ...state.attrs,
        style: { ...state.style },
      }
    );
  }, [visualState]);
  if (props.style) {
    let rawStyles = {};
    copyRawValuesOnly(rawStyles, props.style, props),
      (visualProps.style = { ...rawStyles, ...visualProps.style });
  }
  return visualProps;
}

// node_modules/framer-motion/dist/es/render/dom/use-render.mjs
function createUseRender(forwardMotionProps = !1) {
  return (Component3, props, ref, { latestValues }, isStatic) => {
    let visualProps = (isSVGComponent(Component3) ? useSVGProps : useHTMLProps)(
        props,
        latestValues,
        isStatic,
        Component3
      ),
      filteredProps = filterProps(props, typeof Component3 == 'string', forwardMotionProps),
      elementProps = Component3 !== Fragment2 ? { ...filteredProps, ...visualProps, ref } : {},
      { children } = props,
      renderedChildren = useMemo7(
        () => (isMotionValue(children) ? children.get() : children),
        [children]
      );
    return createElement(Component3, {
      ...elementProps,
      children: renderedChildren,
    });
  };
}

// node_modules/framer-motion/dist/es/render/components/create-factory.mjs
function createMotionComponentFactory(preloadedFeatures, createVisualElement) {
  return function (Component3, { forwardMotionProps } = { forwardMotionProps: !1 }) {
    let config = {
      ...(isSVGComponent(Component3) ? svgMotionConfig : htmlMotionConfig),
      preloadedFeatures,
      useRender: createUseRender(forwardMotionProps),
      createVisualElement,
      Component: Component3,
    };
    return createRendererMotionComponent(config);
  };
}

// node_modules/framer-motion/dist/es/utils/shallow-compare.mjs
function shallowCompare(next, prev) {
  if (!Array.isArray(prev)) return !1;
  let prevLength = prev.length;
  if (prevLength !== next.length) return !1;
  for (let i = 0; i < prevLength; i++) if (prev[i] !== next[i]) return !1;
  return !0;
}

// node_modules/framer-motion/dist/es/render/utils/resolve-dynamic-variants.mjs
function resolveVariant(visualElement, definition, custom) {
  let props = visualElement.getProps();
  return resolveVariantFromProps(
    props,
    definition,
    custom !== void 0 ? custom : props.custom,
    visualElement
  );
}

// node_modules/framer-motion/dist/es/animation/interfaces/visual-element-target.mjs
import { getValueTransition as getValueTransition2 } from 'motion-dom';

// node_modules/framer-motion/dist/es/render/html/utils/keys-position.mjs
var positionalKeys = /* @__PURE__ */ new Set([
  'width',
  'height',
  'top',
  'left',
  'right',
  'bottom',
  ...transformPropOrder,
]);

// node_modules/framer-motion/dist/es/frameloop/sync-time.mjs
var now;
function clearTime() {
  now = void 0;
}
var time = {
  now: () => (
    now === void 0 &&
      time.set(
        frameData.isProcessing || MotionGlobalConfig.useManualTiming
          ? frameData.timestamp
          : performance.now()
      ),
    now
  ),
  set: newTime => {
    (now = newTime), queueMicrotask(clearTime);
  },
};

// node_modules/framer-motion/dist/es/utils/array.mjs
function addUniqueItem(arr, item) {
  arr.indexOf(item) === -1 && arr.push(item);
}
function removeItem(arr, item) {
  let index = arr.indexOf(item);
  index > -1 && arr.splice(index, 1);
}

// node_modules/framer-motion/dist/es/utils/subscription-manager.mjs
var SubscriptionManager = class {
  constructor() {
    this.subscriptions = [];
  }
  add(handler) {
    return (
      addUniqueItem(this.subscriptions, handler), () => removeItem(this.subscriptions, handler)
    );
  }
  notify(a, b, c) {
    let numSubscriptions = this.subscriptions.length;
    if (numSubscriptions)
      if (numSubscriptions === 1) this.subscriptions[0](a, b, c);
      else
        for (let i = 0; i < numSubscriptions; i++) {
          let handler = this.subscriptions[i];
          handler && handler(a, b, c);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
};

// node_modules/framer-motion/dist/es/utils/velocity-per-second.mjs
function velocityPerSecond(velocity, frameDuration) {
  return frameDuration ? velocity * (1e3 / frameDuration) : 0;
}

// node_modules/framer-motion/dist/es/value/index.mjs
var MAX_VELOCITY_DELTA = 30,
  isFloat = value => !isNaN(parseFloat(value)),
  collectMotionValues = {
    current: void 0,
  },
  MotionValue = class {
    /**
     * @param init - The initiating value
     * @param config - Optional configuration options
     *
     * -  `transformer`: A function to transform incoming values with.
     *
     * @internal
     */
    constructor(init, options = {}) {
      (this.version = '11.18.2'),
        (this.canTrackVelocity = null),
        (this.events = {}),
        (this.updateAndNotify = (v, render = !0) => {
          let currentTime = time.now();
          this.updatedAt !== currentTime && this.setPrevFrameValue(),
            (this.prev = this.current),
            this.setCurrent(v),
            this.current !== this.prev &&
              this.events.change &&
              this.events.change.notify(this.current),
            render && this.events.renderRequest && this.events.renderRequest.notify(this.current);
        }),
        (this.hasAnimated = !1),
        this.setCurrent(init),
        (this.owner = options.owner);
    }
    setCurrent(current) {
      (this.current = current),
        (this.updatedAt = time.now()),
        this.canTrackVelocity === null &&
          current !== void 0 &&
          (this.canTrackVelocity = isFloat(this.current));
    }
    setPrevFrameValue(prevFrameValue = this.current) {
      (this.prevFrameValue = prevFrameValue), (this.prevUpdatedAt = this.updatedAt);
    }
    /**
     * Adds a function that will be notified when the `MotionValue` is updated.
     *
     * It returns a function that, when called, will cancel the subscription.
     *
     * When calling `onChange` inside a React component, it should be wrapped with the
     * `useEffect` hook. As it returns an unsubscribe function, this should be returned
     * from the `useEffect` function to ensure you don't add duplicate subscribers..
     *
     * ```jsx
     * export const MyComponent = () => {
     *   const x = useMotionValue(0)
     *   const y = useMotionValue(0)
     *   const opacity = useMotionValue(1)
     *
     *   useEffect(() => {
     *     function updateOpacity() {
     *       const maxXY = Math.max(x.get(), y.get())
     *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
     *       opacity.set(newOpacity)
     *     }
     *
     *     const unsubscribeX = x.on("change", updateOpacity)
     *     const unsubscribeY = y.on("change", updateOpacity)
     *
     *     return () => {
     *       unsubscribeX()
     *       unsubscribeY()
     *     }
     *   }, [])
     *
     *   return <motion.div style={{ x }} />
     * }
     * ```
     *
     * @param subscriber - A function that receives the latest value.
     * @returns A function that, when called, will cancel this subscription.
     *
     * @deprecated
     */
    onChange(subscription) {
      return this.on('change', subscription);
    }
    on(eventName, callback) {
      this.events[eventName] || (this.events[eventName] = new SubscriptionManager());
      let unsubscribe = this.events[eventName].add(callback);
      return eventName === 'change'
        ? () => {
            unsubscribe(),
              frame.read(() => {
                this.events.change.getSize() || this.stop();
              });
          }
        : unsubscribe;
    }
    clearListeners() {
      for (let eventManagers in this.events) this.events[eventManagers].clear();
    }
    /**
     * Attaches a passive effect to the `MotionValue`.
     *
     * @internal
     */
    attach(passiveEffect, stopPassiveEffect) {
      (this.passiveEffect = passiveEffect), (this.stopPassiveEffect = stopPassiveEffect);
    }
    /**
     * Sets the state of the `MotionValue`.
     *
     * @remarks
     *
     * ```jsx
     * const x = useMotionValue(0)
     * x.set(10)
     * ```
     *
     * @param latest - Latest value to set.
     * @param render - Whether to notify render subscribers. Defaults to `true`
     *
     * @public
     */
    set(v, render = !0) {
      !render || !this.passiveEffect
        ? this.updateAndNotify(v, render)
        : this.passiveEffect(v, this.updateAndNotify);
    }
    setWithVelocity(prev, current, delta) {
      this.set(current),
        (this.prev = void 0),
        (this.prevFrameValue = prev),
        (this.prevUpdatedAt = this.updatedAt - delta);
    }
    /**
     * Set the state of the `MotionValue`, stopping any active animations,
     * effects, and resets velocity to `0`.
     */
    jump(v, endAnimation = !0) {
      this.updateAndNotify(v),
        (this.prev = v),
        (this.prevUpdatedAt = this.prevFrameValue = void 0),
        endAnimation && this.stop(),
        this.stopPassiveEffect && this.stopPassiveEffect();
    }
    /**
     * Returns the latest state of `MotionValue`
     *
     * @returns - The latest state of `MotionValue`
     *
     * @public
     */
    get() {
      return collectMotionValues.current && collectMotionValues.current.push(this), this.current;
    }
    /**
     * @public
     */
    getPrevious() {
      return this.prev;
    }
    /**
     * Returns the latest velocity of `MotionValue`
     *
     * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
     *
     * @public
     */
    getVelocity() {
      let currentTime = time.now();
      if (
        !this.canTrackVelocity ||
        this.prevFrameValue === void 0 ||
        currentTime - this.updatedAt > MAX_VELOCITY_DELTA
      )
        return 0;
      let delta = Math.min(this.updatedAt - this.prevUpdatedAt, MAX_VELOCITY_DELTA);
      return velocityPerSecond(parseFloat(this.current) - parseFloat(this.prevFrameValue), delta);
    }
    /**
     * Registers a new animation to control this `MotionValue`. Only one
     * animation can drive a `MotionValue` at one time.
     *
     * ```jsx
     * value.start()
     * ```
     *
     * @param animation - A function that starts the provided animation
     *
     * @internal
     */
    start(startAnimation) {
      return (
        this.stop(),
        new Promise(resolve => {
          (this.hasAnimated = !0),
            (this.animation = startAnimation(resolve)),
            this.events.animationStart && this.events.animationStart.notify();
        }).then(() => {
          this.events.animationComplete && this.events.animationComplete.notify(),
            this.clearAnimation();
        })
      );
    }
    /**
     * Stop the currently active animation.
     *
     * @public
     */
    stop() {
      this.animation &&
        (this.animation.stop(),
        this.events.animationCancel && this.events.animationCancel.notify()),
        this.clearAnimation();
    }
    /**
     * Returns `true` if this value is currently animating.
     *
     * @public
     */
    isAnimating() {
      return !!this.animation;
    }
    clearAnimation() {
      delete this.animation;
    }
    /**
     * Destroy and clean up subscribers to this `MotionValue`.
     *
     * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
     * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
     * created a `MotionValue` via the `motionValue` function.
     *
     * @public
     */
    destroy() {
      this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
    }
  };
function motionValue(init, options) {
  return new MotionValue(init, options);
}

// node_modules/framer-motion/dist/es/render/utils/setters.mjs
function setMotionValue(visualElement, key, value) {
  visualElement.hasValue(key)
    ? visualElement.getValue(key).set(value)
    : visualElement.addValue(key, motionValue(value));
}
function setTarget(visualElement, definition) {
  let resolved = resolveVariant(visualElement, definition),
    { transitionEnd = {}, transition = {}, ...target } = resolved || {};
  target = { ...target, ...transitionEnd };
  for (let key in target) {
    let value = resolveFinalValueInKeyframes(target[key]);
    setMotionValue(visualElement, key, value);
  }
}

// node_modules/framer-motion/dist/es/value/use-will-change/is.mjs
function isWillChangeMotionValue(value) {
  return Boolean(isMotionValue(value) && value.add);
}

// node_modules/framer-motion/dist/es/value/use-will-change/add-will-change.mjs
function addValueToWillChange(visualElement, key) {
  let willChange = visualElement.getValue('willChange');
  if (isWillChangeMotionValue(willChange)) return willChange.add(key);
}

// node_modules/framer-motion/dist/es/animation/optimized-appear/get-appear-id.mjs
function getOptimisedAppearId(visualElement) {
  return visualElement.props[optimizedAppearDataAttribute];
}

// node_modules/framer-motion/dist/es/animation/interfaces/motion-value.mjs
import { getValueTransition, GroupPlaybackControls } from 'motion-dom';
import { secondsToMilliseconds as secondsToMilliseconds5 } from 'motion-utils';

// node_modules/framer-motion/dist/es/utils/use-instant-transition-state.mjs
var instantAnimationState = {
  current: !1,
};

// node_modules/framer-motion/dist/es/animation/animators/AcceleratedAnimation.mjs
import {
  supportsLinearEasing,
  attachTimeline,
  isGenerator as isGenerator3,
  isWaapiSupportedEasing,
} from 'motion-dom';
import {
  millisecondsToSeconds as millisecondsToSeconds4,
  secondsToMilliseconds as secondsToMilliseconds4,
  noop as noop5,
} from 'motion-utils';

// node_modules/framer-motion/dist/es/easing/cubic-bezier.mjs
import { noop as noop2 } from 'motion-utils';
var calcBezier = (t, a1, a2) => (((1 - 3 * a2 + 3 * a1) * t + (3 * a2 - 6 * a1)) * t + 3 * a1) * t,
  subdivisionPrecision = 1e-7,
  subdivisionMaxIterations = 12;
function binarySubdivide(x, lowerBound, upperBound, mX1, mX2) {
  let currentX,
    currentT,
    i = 0;
  do
    (currentT = lowerBound + (upperBound - lowerBound) / 2),
      (currentX = calcBezier(currentT, mX1, mX2) - x),
      currentX > 0 ? (upperBound = currentT) : (lowerBound = currentT);
  while (Math.abs(currentX) > subdivisionPrecision && ++i < subdivisionMaxIterations);
  return currentT;
}
function cubicBezier(mX1, mY1, mX2, mY2) {
  if (mX1 === mY1 && mX2 === mY2) return noop2;
  let getTForX = aX => binarySubdivide(aX, 0, 1, mX1, mX2);
  return t => (t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2));
}

// node_modules/framer-motion/dist/es/easing/modifiers/mirror.mjs
var mirrorEasing = easing => p => (p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2);

// node_modules/framer-motion/dist/es/easing/modifiers/reverse.mjs
var reverseEasing = easing => p => 1 - easing(1 - p);

// node_modules/framer-motion/dist/es/easing/back.mjs
var backOut = /* @__PURE__ */ cubicBezier(0.33, 1.53, 0.69, 0.99),
  backIn = /* @__PURE__ */ reverseEasing(backOut),
  backInOut = /* @__PURE__ */ mirrorEasing(backIn);

// node_modules/framer-motion/dist/es/easing/anticipate.mjs
var anticipate = p => ((p *= 2) < 1 ? 0.5 * backIn(p) : 0.5 * (2 - Math.pow(2, -10 * (p - 1))));

// node_modules/framer-motion/dist/es/easing/circ.mjs
var circIn = p => 1 - Math.sin(Math.acos(p)),
  circOut = reverseEasing(circIn),
  circInOut = mirrorEasing(circIn);

// node_modules/framer-motion/dist/es/utils/is-zero-value-string.mjs
var isZeroValueString = v => /^0[^.\s]+$/u.test(v);

// node_modules/framer-motion/dist/es/animation/utils/is-none.mjs
function isNone(value) {
  return typeof value == 'number'
    ? value === 0
    : value !== null
      ? value === 'none' || value === '0' || isZeroValueString(value)
      : !0;
}

// node_modules/framer-motion/dist/es/value/types/utils/sanitize.mjs
var sanitize = v => Math.round(v * 1e5) / 1e5;

// node_modules/framer-motion/dist/es/value/types/utils/float-regex.mjs
var floatRegex = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;

// node_modules/framer-motion/dist/es/value/types/utils/is-nullish.mjs
function isNullish(v) {
  return v == null;
}

// node_modules/framer-motion/dist/es/value/types/utils/single-color-regex.mjs
var singleColorRegex =
  /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;

// node_modules/framer-motion/dist/es/value/types/color/utils.mjs
var isColorString = (type, testProp) => v =>
    Boolean(
      (typeof v == 'string' && singleColorRegex.test(v) && v.startsWith(type)) ||
        (testProp && !isNullish(v) && Object.prototype.hasOwnProperty.call(v, testProp))
    ),
  splitColor = (aName, bName, cName) => v => {
    if (typeof v != 'string') return v;
    let [a, b, c, alpha2] = v.match(floatRegex);
    return {
      [aName]: parseFloat(a),
      [bName]: parseFloat(b),
      [cName]: parseFloat(c),
      alpha: alpha2 !== void 0 ? parseFloat(alpha2) : 1,
    };
  };

// node_modules/framer-motion/dist/es/value/types/color/rgba.mjs
var clampRgbUnit = v => clamp(0, 255, v),
  rgbUnit = {
    ...number,
    transform: v => Math.round(clampRgbUnit(v)),
  },
  rgba = {
    test: /* @__PURE__ */ isColorString('rgb', 'red'),
    parse: /* @__PURE__ */ splitColor('red', 'green', 'blue'),
    transform: ({ red, green, blue, alpha: alpha$1 = 1 }) =>
      'rgba(' +
      rgbUnit.transform(red) +
      ', ' +
      rgbUnit.transform(green) +
      ', ' +
      rgbUnit.transform(blue) +
      ', ' +
      sanitize(alpha.transform(alpha$1)) +
      ')',
  };

// node_modules/framer-motion/dist/es/value/types/color/hex.mjs
function parseHex(v) {
  let r = '',
    g = '',
    b = '',
    a = '';
  return (
    v.length > 5
      ? ((r = v.substring(1, 3)),
        (g = v.substring(3, 5)),
        (b = v.substring(5, 7)),
        (a = v.substring(7, 9)))
      : ((r = v.substring(1, 2)),
        (g = v.substring(2, 3)),
        (b = v.substring(3, 4)),
        (a = v.substring(4, 5)),
        (r += r),
        (g += g),
        (b += b),
        (a += a)),
    {
      red: parseInt(r, 16),
      green: parseInt(g, 16),
      blue: parseInt(b, 16),
      alpha: a ? parseInt(a, 16) / 255 : 1,
    }
  );
}
var hex = {
  test: /* @__PURE__ */ isColorString('#'),
  parse: parseHex,
  transform: rgba.transform,
};

// node_modules/framer-motion/dist/es/value/types/color/hsla.mjs
var hsla = {
  test: /* @__PURE__ */ isColorString('hsl', 'hue'),
  parse: /* @__PURE__ */ splitColor('hue', 'saturation', 'lightness'),
  transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) =>
    'hsla(' +
    Math.round(hue) +
    ', ' +
    percent.transform(sanitize(saturation)) +
    ', ' +
    percent.transform(sanitize(lightness)) +
    ', ' +
    sanitize(alpha.transform(alpha$1)) +
    ')',
};

// node_modules/framer-motion/dist/es/value/types/color/index.mjs
var color = {
  test: v => rgba.test(v) || hex.test(v) || hsla.test(v),
  parse: v => (rgba.test(v) ? rgba.parse(v) : hsla.test(v) ? hsla.parse(v) : hex.parse(v)),
  transform: v =>
    typeof v == 'string' ? v : v.hasOwnProperty('red') ? rgba.transform(v) : hsla.transform(v),
};

// node_modules/framer-motion/dist/es/value/types/utils/color-regex.mjs
var colorRegex =
  /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;

// node_modules/framer-motion/dist/es/value/types/complex/index.mjs
function test(v) {
  var _a, _b;
  return (
    isNaN(v) &&
    typeof v == 'string' &&
    (((_a = v.match(floatRegex)) === null || _a === void 0 ? void 0 : _a.length) || 0) +
      (((_b = v.match(colorRegex)) === null || _b === void 0 ? void 0 : _b.length) || 0) >
      0
  );
}
var NUMBER_TOKEN = 'number',
  COLOR_TOKEN = 'color',
  VAR_TOKEN = 'var',
  VAR_FUNCTION_TOKEN = 'var(',
  SPLIT_TOKEN = '${}',
  complexRegex =
    /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function analyseComplexValue(value) {
  let originalValue = value.toString(),
    values = [],
    indexes = {
      color: [],
      number: [],
      var: [],
    },
    types = [],
    i = 0,
    split = originalValue
      .replace(
        complexRegex,
        parsedValue => (
          color.test(parsedValue)
            ? (indexes.color.push(i),
              types.push(COLOR_TOKEN),
              values.push(color.parse(parsedValue)))
            : parsedValue.startsWith(VAR_FUNCTION_TOKEN)
              ? (indexes.var.push(i), types.push(VAR_TOKEN), values.push(parsedValue))
              : (indexes.number.push(i),
                types.push(NUMBER_TOKEN),
                values.push(parseFloat(parsedValue))),
          ++i,
          SPLIT_TOKEN
        )
      )
      .split(SPLIT_TOKEN);
  return { values, split, indexes, types };
}
function parseComplexValue(v) {
  return analyseComplexValue(v).values;
}
function createTransformer(source) {
  let { split, types } = analyseComplexValue(source),
    numSections = split.length;
  return v => {
    let output = '';
    for (let i = 0; i < numSections; i++)
      if (((output += split[i]), v[i] !== void 0)) {
        let type = types[i];
        type === NUMBER_TOKEN
          ? (output += sanitize(v[i]))
          : type === COLOR_TOKEN
            ? (output += color.transform(v[i]))
            : (output += v[i]);
      }
    return output;
  };
}
var convertNumbersToZero = v => (typeof v == 'number' ? 0 : v);
function getAnimatableNone(v) {
  let parsed = parseComplexValue(v);
  return createTransformer(v)(parsed.map(convertNumbersToZero));
}
var complex = {
  test,
  parse: parseComplexValue,
  createTransformer,
  getAnimatableNone,
};

// node_modules/framer-motion/dist/es/value/types/complex/filter.mjs
var maxDefaults = /* @__PURE__ */ new Set(['brightness', 'contrast', 'saturate', 'opacity']);
function applyDefaultFilter(v) {
  let [name, value] = v.slice(0, -1).split('(');
  if (name === 'drop-shadow') return v;
  let [number2] = value.match(floatRegex) || [];
  if (!number2) return v;
  let unit = value.replace(number2, ''),
    defaultValue = maxDefaults.has(name) ? 1 : 0;
  return number2 !== value && (defaultValue *= 100), name + '(' + defaultValue + unit + ')';
}
var functionRegex = /\b([a-z-]*)\(.*?\)/gu,
  filter = {
    ...complex,
    getAnimatableNone: v => {
      let functions = v.match(functionRegex);
      return functions ? functions.map(applyDefaultFilter).join(' ') : v;
    },
  };

// node_modules/framer-motion/dist/es/render/dom/value-types/defaults.mjs
var defaultValueTypes = {
    ...numberValueTypes,
    // Color props
    color,
    backgroundColor: color,
    outlineColor: color,
    fill: color,
    stroke: color,
    // Border props
    borderColor: color,
    borderTopColor: color,
    borderRightColor: color,
    borderBottomColor: color,
    borderLeftColor: color,
    filter,
    WebkitFilter: filter,
  },
  getDefaultValueType = key => defaultValueTypes[key];

// node_modules/framer-motion/dist/es/render/dom/value-types/animatable-none.mjs
function getAnimatableNone2(key, value) {
  let defaultValueType = getDefaultValueType(key);
  return (
    defaultValueType !== filter && (defaultValueType = complex),
    defaultValueType.getAnimatableNone ? defaultValueType.getAnimatableNone(value) : void 0
  );
}

// node_modules/framer-motion/dist/es/render/html/utils/make-none-animatable.mjs
var invalidTemplates = /* @__PURE__ */ new Set(['auto', 'none', '0']);
function makeNoneKeyframesAnimatable(unresolvedKeyframes, noneKeyframeIndexes, name) {
  let i = 0,
    animatableTemplate;
  for (; i < unresolvedKeyframes.length && !animatableTemplate; ) {
    let keyframe = unresolvedKeyframes[i];
    typeof keyframe == 'string' &&
      !invalidTemplates.has(keyframe) &&
      analyseComplexValue(keyframe).values.length &&
      (animatableTemplate = unresolvedKeyframes[i]),
      i++;
  }
  if (animatableTemplate && name)
    for (let noneIndex of noneKeyframeIndexes)
      unresolvedKeyframes[noneIndex] = getAnimatableNone2(name, animatableTemplate);
}

// node_modules/framer-motion/dist/es/render/dom/utils/unit-conversion.mjs
var isNumOrPxType = v => v === number || v === px,
  getPosFromMatrix = (matrix, pos) => parseFloat(matrix.split(', ')[pos]),
  getTranslateFromMatrix =
    (pos2, pos3) =>
    (_bbox, { transform: transform2 }) => {
      if (transform2 === 'none' || !transform2) return 0;
      let matrix3d = transform2.match(/^matrix3d\((.+)\)$/u);
      if (matrix3d) return getPosFromMatrix(matrix3d[1], pos3);
      {
        let matrix = transform2.match(/^matrix\((.+)\)$/u);
        return matrix ? getPosFromMatrix(matrix[1], pos2) : 0;
      }
    },
  transformKeys = /* @__PURE__ */ new Set(['x', 'y', 'z']),
  nonTranslationalTransformKeys = transformPropOrder.filter(key => !transformKeys.has(key));
function removeNonTranslationalTransform(visualElement) {
  let removedTransforms = [];
  return (
    nonTranslationalTransformKeys.forEach(key => {
      let value = visualElement.getValue(key);
      value !== void 0 &&
        (removedTransforms.push([key, value.get()]), value.set(key.startsWith('scale') ? 1 : 0));
    }),
    removedTransforms
  );
}
var positionalValues = {
  // Dimensions
  width: ({ x }, { paddingLeft = '0', paddingRight = '0' }) =>
    x.max - x.min - parseFloat(paddingLeft) - parseFloat(paddingRight),
  height: ({ y }, { paddingTop = '0', paddingBottom = '0' }) =>
    y.max - y.min - parseFloat(paddingTop) - parseFloat(paddingBottom),
  top: (_bbox, { top }) => parseFloat(top),
  left: (_bbox, { left }) => parseFloat(left),
  bottom: ({ y }, { top }) => parseFloat(top) + (y.max - y.min),
  right: ({ x }, { left }) => parseFloat(left) + (x.max - x.min),
  // Transform
  x: getTranslateFromMatrix(4, 13),
  y: getTranslateFromMatrix(5, 14),
};
positionalValues.translateX = positionalValues.x;
positionalValues.translateY = positionalValues.y;

// node_modules/framer-motion/dist/es/render/utils/KeyframesResolver.mjs
var toResolve = /* @__PURE__ */ new Set(),
  isScheduled = !1,
  anyNeedsMeasurement = !1;
function measureAllKeyframes() {
  if (anyNeedsMeasurement) {
    let resolversToMeasure = Array.from(toResolve).filter(resolver => resolver.needsMeasurement),
      elementsToMeasure = new Set(resolversToMeasure.map(resolver => resolver.element)),
      transformsToRestore = /* @__PURE__ */ new Map();
    elementsToMeasure.forEach(element => {
      let removedTransforms = removeNonTranslationalTransform(element);
      removedTransforms.length &&
        (transformsToRestore.set(element, removedTransforms), element.render());
    }),
      resolversToMeasure.forEach(resolver => resolver.measureInitialState()),
      elementsToMeasure.forEach(element => {
        element.render();
        let restore = transformsToRestore.get(element);
        restore &&
          restore.forEach(([key, value]) => {
            var _a;
            (_a = element.getValue(key)) === null || _a === void 0 || _a.set(value);
          });
      }),
      resolversToMeasure.forEach(resolver => resolver.measureEndState()),
      resolversToMeasure.forEach(resolver => {
        resolver.suspendedScrollY !== void 0 && window.scrollTo(0, resolver.suspendedScrollY);
      });
  }
  (anyNeedsMeasurement = !1),
    (isScheduled = !1),
    toResolve.forEach(resolver => resolver.complete()),
    toResolve.clear();
}
function readAllKeyframes() {
  toResolve.forEach(resolver => {
    resolver.readKeyframes(), resolver.needsMeasurement && (anyNeedsMeasurement = !0);
  });
}
function flushKeyframeResolvers() {
  readAllKeyframes(), measureAllKeyframes();
}
var KeyframeResolver = class {
  constructor(unresolvedKeyframes, onComplete, name, motionValue2, element, isAsync = !1) {
    (this.isComplete = !1),
      (this.isAsync = !1),
      (this.needsMeasurement = !1),
      (this.isScheduled = !1),
      (this.unresolvedKeyframes = [...unresolvedKeyframes]),
      (this.onComplete = onComplete),
      (this.name = name),
      (this.motionValue = motionValue2),
      (this.element = element),
      (this.isAsync = isAsync);
  }
  scheduleResolve() {
    (this.isScheduled = !0),
      this.isAsync
        ? (toResolve.add(this),
          isScheduled ||
            ((isScheduled = !0),
            frame.read(readAllKeyframes),
            frame.resolveKeyframes(measureAllKeyframes)))
        : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    let { unresolvedKeyframes, name, element, motionValue: motionValue2 } = this;
    for (let i = 0; i < unresolvedKeyframes.length; i++)
      if (unresolvedKeyframes[i] === null)
        if (i === 0) {
          let currentValue = motionValue2?.get(),
            finalKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
          if (currentValue !== void 0) unresolvedKeyframes[0] = currentValue;
          else if (element && name) {
            let valueAsRead = element.readValue(name, finalKeyframe);
            valueAsRead != null && (unresolvedKeyframes[0] = valueAsRead);
          }
          unresolvedKeyframes[0] === void 0 && (unresolvedKeyframes[0] = finalKeyframe),
            motionValue2 && currentValue === void 0 && motionValue2.set(unresolvedKeyframes[0]);
        } else unresolvedKeyframes[i] = unresolvedKeyframes[i - 1];
  }
  setFinalKeyframe() {}
  measureInitialState() {}
  renderEndStyles() {}
  measureEndState() {}
  complete() {
    (this.isComplete = !0),
      this.onComplete(this.unresolvedKeyframes, this.finalKeyframe),
      toResolve.delete(this);
  }
  cancel() {
    this.isComplete || ((this.isScheduled = !1), toResolve.delete(this));
  }
  resume() {
    this.isComplete || this.scheduleResolve();
  }
};

// node_modules/framer-motion/dist/es/render/dom/utils/css-variables-conversion.mjs
import { invariant as invariant2 } from 'motion-utils';

// node_modules/framer-motion/dist/es/utils/is-numerical-string.mjs
var isNumericalString = v => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(v);

// node_modules/framer-motion/dist/es/render/dom/utils/css-variables-conversion.mjs
var splitCSSVariableRegex =
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function parseCSSVariable(current) {
  let match = splitCSSVariableRegex.exec(current);
  if (!match) return [,];
  let [, token1, token2, fallback] = match;
  return [`--${token1 ?? token2}`, fallback];
}
var maxDepth = 4;
function getVariableValue(current, element, depth = 1) {
  invariant2(
    depth <= maxDepth,
    `Max CSS variable fallback depth detected in property "${current}". This may indicate a circular fallback dependency.`
  );
  let [token, fallback] = parseCSSVariable(current);
  if (!token) return;
  let resolved = window.getComputedStyle(element).getPropertyValue(token);
  if (resolved) {
    let trimmed = resolved.trim();
    return isNumericalString(trimmed) ? parseFloat(trimmed) : trimmed;
  }
  return isCSSVariableToken(fallback) ? getVariableValue(fallback, element, depth + 1) : fallback;
}

// node_modules/framer-motion/dist/es/render/dom/value-types/test.mjs
var testValueType = v => type => type.test(v);

// node_modules/framer-motion/dist/es/render/dom/value-types/type-auto.mjs
var auto = {
  test: v => v === 'auto',
  parse: v => v,
};

// node_modules/framer-motion/dist/es/render/dom/value-types/dimensions.mjs
var dimensionValueTypes = [number, px, percent, degrees, vw, vh, auto],
  findDimensionValueType = v => dimensionValueTypes.find(testValueType(v));

// node_modules/framer-motion/dist/es/render/dom/DOMKeyframesResolver.mjs
var DOMKeyframesResolver = class extends KeyframeResolver {
  constructor(unresolvedKeyframes, onComplete, name, motionValue2, element) {
    super(unresolvedKeyframes, onComplete, name, motionValue2, element, !0);
  }
  readKeyframes() {
    let { unresolvedKeyframes, element, name } = this;
    if (!element || !element.current) return;
    super.readKeyframes();
    for (let i = 0; i < unresolvedKeyframes.length; i++) {
      let keyframe = unresolvedKeyframes[i];
      if (
        typeof keyframe == 'string' &&
        ((keyframe = keyframe.trim()), isCSSVariableToken(keyframe))
      ) {
        let resolved = getVariableValue(keyframe, element.current);
        resolved !== void 0 && (unresolvedKeyframes[i] = resolved),
          i === unresolvedKeyframes.length - 1 && (this.finalKeyframe = keyframe);
      }
    }
    if (
      (this.resolveNoneKeyframes(), !positionalKeys.has(name) || unresolvedKeyframes.length !== 2)
    )
      return;
    let [origin, target] = unresolvedKeyframes,
      originType = findDimensionValueType(origin),
      targetType = findDimensionValueType(target);
    if (originType !== targetType)
      if (isNumOrPxType(originType) && isNumOrPxType(targetType))
        for (let i = 0; i < unresolvedKeyframes.length; i++) {
          let value = unresolvedKeyframes[i];
          typeof value == 'string' && (unresolvedKeyframes[i] = parseFloat(value));
        }
      else this.needsMeasurement = !0;
  }
  resolveNoneKeyframes() {
    let { unresolvedKeyframes, name } = this,
      noneKeyframeIndexes = [];
    for (let i = 0; i < unresolvedKeyframes.length; i++)
      isNone(unresolvedKeyframes[i]) && noneKeyframeIndexes.push(i);
    noneKeyframeIndexes.length &&
      makeNoneKeyframesAnimatable(unresolvedKeyframes, noneKeyframeIndexes, name);
  }
  measureInitialState() {
    let { element, unresolvedKeyframes, name } = this;
    if (!element || !element.current) return;
    name === 'height' && (this.suspendedScrollY = window.pageYOffset),
      (this.measuredOrigin = positionalValues[name](
        element.measureViewportBox(),
        window.getComputedStyle(element.current)
      )),
      (unresolvedKeyframes[0] = this.measuredOrigin);
    let measureKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
    measureKeyframe !== void 0 && element.getValue(name, measureKeyframe).jump(measureKeyframe, !1);
  }
  measureEndState() {
    var _a;
    let { element, name, unresolvedKeyframes } = this;
    if (!element || !element.current) return;
    let value = element.getValue(name);
    value && value.jump(this.measuredOrigin, !1);
    let finalKeyframeIndex = unresolvedKeyframes.length - 1,
      finalKeyframe = unresolvedKeyframes[finalKeyframeIndex];
    (unresolvedKeyframes[finalKeyframeIndex] = positionalValues[name](
      element.measureViewportBox(),
      window.getComputedStyle(element.current)
    )),
      finalKeyframe !== null &&
        this.finalKeyframe === void 0 &&
        (this.finalKeyframe = finalKeyframe),
      !((_a = this.removedTransforms) === null || _a === void 0) &&
        _a.length &&
        this.removedTransforms.forEach(([unsetTransformName, unsetTransformValue]) => {
          element.getValue(unsetTransformName).set(unsetTransformValue);
        }),
      this.resolveNoneKeyframes();
  }
};

// node_modules/framer-motion/dist/es/animation/animators/utils/can-animate.mjs
import { isGenerator } from 'motion-dom';
import { warning as warning2 } from 'motion-utils';

// node_modules/framer-motion/dist/es/animation/utils/is-animatable.mjs
var isAnimatable = (value, name) =>
  name === 'zIndex'
    ? !1
    : !!(
        typeof value == 'number' ||
        Array.isArray(value) ||
        (typeof value == 'string' && // It's animatable if we have a string
          (complex.test(value) || value === '0') && // And it contains numbers and/or colors
          !value.startsWith('url('))
      );

// node_modules/framer-motion/dist/es/animation/animators/utils/can-animate.mjs
function hasKeyframesChanged(keyframes2) {
  let current = keyframes2[0];
  if (keyframes2.length === 1) return !0;
  for (let i = 0; i < keyframes2.length; i++) if (keyframes2[i] !== current) return !0;
}
function canAnimate(keyframes2, name, type, velocity) {
  let originKeyframe = keyframes2[0];
  if (originKeyframe === null) return !1;
  if (name === 'display' || name === 'visibility') return !0;
  let targetKeyframe = keyframes2[keyframes2.length - 1],
    isOriginAnimatable = isAnimatable(originKeyframe, name),
    isTargetAnimatable = isAnimatable(targetKeyframe, name);
  return (
    warning2(
      isOriginAnimatable === isTargetAnimatable,
      `You are trying to animate ${name} from "${originKeyframe}" to "${targetKeyframe}". ${originKeyframe} is not an animatable value - to enable this animation set ${originKeyframe} to a value animatable to ${targetKeyframe} via the \`style\` property.`
    ),
    !isOriginAnimatable || !isTargetAnimatable
      ? !1
      : hasKeyframesChanged(keyframes2) || ((type === 'spring' || isGenerator(type)) && velocity)
  );
}

// node_modules/framer-motion/dist/es/animation/animators/waapi/utils/get-final-keyframe.mjs
var isNotNull = value => value !== null;
function getFinalKeyframe(keyframes2, { repeat, repeatType = 'loop' }, finalKeyframe) {
  let resolvedKeyframes = keyframes2.filter(isNotNull),
    index = repeat && repeatType !== 'loop' && repeat % 2 === 1 ? 0 : resolvedKeyframes.length - 1;
  return !index || finalKeyframe === void 0 ? resolvedKeyframes[index] : finalKeyframe;
}

// node_modules/framer-motion/dist/es/animation/animators/BaseAnimation.mjs
var MAX_RESOLVE_DELAY = 40,
  BaseAnimation = class {
    constructor({
      autoplay = !0,
      delay: delay2 = 0,
      type = 'keyframes',
      repeat = 0,
      repeatDelay = 0,
      repeatType = 'loop',
      ...options
    }) {
      (this.isStopped = !1),
        (this.hasAttemptedResolve = !1),
        (this.createdAt = time.now()),
        (this.options = {
          autoplay,
          delay: delay2,
          type,
          repeat,
          repeatDelay,
          repeatType,
          ...options,
        }),
        this.updateFinishedPromise();
    }
    /**
     * This method uses the createdAt and resolvedAt to calculate the
     * animation startTime. *Ideally*, we would use the createdAt time as t=0
     * as the following frame would then be the first frame of the animation in
     * progress, which would feel snappier.
     *
     * However, if there's a delay (main thread work) between the creation of
     * the animation and the first commited frame, we prefer to use resolvedAt
     * to avoid a sudden jump into the animation.
     */
    calcStartTime() {
      return this.resolvedAt
        ? this.resolvedAt - this.createdAt > MAX_RESOLVE_DELAY
          ? this.resolvedAt
          : this.createdAt
        : this.createdAt;
    }
    /**
     * A getter for resolved data. If keyframes are not yet resolved, accessing
     * this.resolved will synchronously flush all pending keyframe resolvers.
     * This is a deoptimisation, but at its worst still batches read/writes.
     */
    get resolved() {
      return (
        !this._resolved && !this.hasAttemptedResolve && flushKeyframeResolvers(), this._resolved
      );
    }
    /**
     * A method to be called when the keyframes resolver completes. This method
     * will check if its possible to run the animation and, if not, skip it.
     * Otherwise, it will call initPlayback on the implementing class.
     */
    onKeyframesResolved(keyframes2, finalKeyframe) {
      (this.resolvedAt = time.now()), (this.hasAttemptedResolve = !0);
      let {
        name,
        type,
        velocity,
        delay: delay2,
        onComplete,
        onUpdate,
        isGenerator: isGenerator4,
      } = this.options;
      if (!isGenerator4 && !canAnimate(keyframes2, name, type, velocity))
        if (instantAnimationState.current || !delay2) {
          onUpdate && onUpdate(getFinalKeyframe(keyframes2, this.options, finalKeyframe)),
            onComplete && onComplete(),
            this.resolveFinishedPromise();
          return;
        } else this.options.duration = 0;
      let resolvedAnimation = this.initPlayback(keyframes2, finalKeyframe);
      resolvedAnimation !== !1 &&
        ((this._resolved = {
          keyframes: keyframes2,
          finalKeyframe,
          ...resolvedAnimation,
        }),
        this.onPostResolved());
    }
    onPostResolved() {}
    /**
     * Allows the returned animation to be awaited or promise-chained. Currently
     * resolves when the animation finishes at all but in a future update could/should
     * reject if its cancels.
     */
    then(resolve, reject) {
      return this.currentFinishedPromise.then(resolve, reject);
    }
    flatten() {
      (this.options.type = 'keyframes'), (this.options.ease = 'linear');
    }
    updateFinishedPromise() {
      this.currentFinishedPromise = new Promise(resolve => {
        this.resolveFinishedPromise = resolve;
      });
    }
  };

// node_modules/framer-motion/dist/es/animation/animators/MainThreadAnimation.mjs
import {
  isGenerator as isGenerator2,
  calcGeneratorDuration as calcGeneratorDuration2,
} from 'motion-dom';
import {
  millisecondsToSeconds as millisecondsToSeconds3,
  secondsToMilliseconds as secondsToMilliseconds3,
} from 'motion-utils';

// node_modules/framer-motion/dist/es/utils/mix/number.mjs
var mixNumber = (from, to, progress6) => from + (to - from) * progress6;

// node_modules/framer-motion/dist/es/utils/mix/color.mjs
import { warning as warning3 } from 'motion-utils';

// node_modules/framer-motion/dist/es/utils/hsla-to-rgba.mjs
function hueToRgb(p, q, t) {
  return (
    t < 0 && (t += 1),
    t > 1 && (t -= 1),
    t < 1 / 6 ? p + (q - p) * 6 * t : t < 1 / 2 ? q : t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6 : p
  );
}
function hslaToRgba({ hue, saturation, lightness, alpha: alpha2 }) {
  (hue /= 360), (saturation /= 100), (lightness /= 100);
  let red = 0,
    green = 0,
    blue = 0;
  if (!saturation) red = green = blue = lightness;
  else {
    let q =
        lightness < 0.5
          ? lightness * (1 + saturation)
          : lightness + saturation - lightness * saturation,
      p = 2 * lightness - q;
    (red = hueToRgb(p, q, hue + 1 / 3)),
      (green = hueToRgb(p, q, hue)),
      (blue = hueToRgb(p, q, hue - 1 / 3));
  }
  return {
    red: Math.round(red * 255),
    green: Math.round(green * 255),
    blue: Math.round(blue * 255),
    alpha: alpha2,
  };
}

// node_modules/framer-motion/dist/es/utils/mix/immediate.mjs
function mixImmediate(a, b) {
  return p => (p > 0 ? b : a);
}

// node_modules/framer-motion/dist/es/utils/mix/color.mjs
var mixLinearColor = (from, to, v) => {
    let fromExpo = from * from,
      expo = v * (to * to - fromExpo) + fromExpo;
    return expo < 0 ? 0 : Math.sqrt(expo);
  },
  colorTypes = [hex, rgba, hsla],
  getColorType = v => colorTypes.find(type => type.test(v));
function asRGBA(color2) {
  let type = getColorType(color2);
  if (
    (warning3(
      Boolean(type),
      `'${color2}' is not an animatable color. Use the equivalent color code instead.`
    ),
    !type)
  )
    return !1;
  let model = type.parse(color2);
  return type === hsla && (model = hslaToRgba(model)), model;
}
var mixColor = (from, to) => {
  let fromRGBA = asRGBA(from),
    toRGBA = asRGBA(to);
  if (!fromRGBA || !toRGBA) return mixImmediate(from, to);
  let blended = { ...fromRGBA };
  return v => (
    (blended.red = mixLinearColor(fromRGBA.red, toRGBA.red, v)),
    (blended.green = mixLinearColor(fromRGBA.green, toRGBA.green, v)),
    (blended.blue = mixLinearColor(fromRGBA.blue, toRGBA.blue, v)),
    (blended.alpha = mixNumber(fromRGBA.alpha, toRGBA.alpha, v)),
    rgba.transform(blended)
  );
};

// node_modules/framer-motion/dist/es/utils/pipe.mjs
var combineFunctions = (a, b) => v => b(a(v)),
  pipe = (...transformers) => transformers.reduce(combineFunctions);

// node_modules/framer-motion/dist/es/utils/mix/complex.mjs
import { warning as warning4 } from 'motion-utils';

// node_modules/framer-motion/dist/es/utils/mix/visibility.mjs
var invisibleValues = /* @__PURE__ */ new Set(['none', 'hidden']);
function mixVisibility(origin, target) {
  return invisibleValues.has(origin)
    ? p => (p <= 0 ? origin : target)
    : p => (p >= 1 ? target : origin);
}

// node_modules/framer-motion/dist/es/utils/mix/complex.mjs
function mixNumber2(a, b) {
  return p => mixNumber(a, b, p);
}
function getMixer(a) {
  return typeof a == 'number'
    ? mixNumber2
    : typeof a == 'string'
      ? isCSSVariableToken(a)
        ? mixImmediate
        : color.test(a)
          ? mixColor
          : mixComplex
      : Array.isArray(a)
        ? mixArray
        : typeof a == 'object'
          ? color.test(a)
            ? mixColor
            : mixObject
          : mixImmediate;
}
function mixArray(a, b) {
  let output = [...a],
    numValues = output.length,
    blendValue = a.map((v, i) => getMixer(v)(v, b[i]));
  return p => {
    for (let i = 0; i < numValues; i++) output[i] = blendValue[i](p);
    return output;
  };
}
function mixObject(a, b) {
  let output = { ...a, ...b },
    blendValue = {};
  for (let key in output)
    a[key] !== void 0 && b[key] !== void 0 && (blendValue[key] = getMixer(a[key])(a[key], b[key]));
  return v => {
    for (let key in blendValue) output[key] = blendValue[key](v);
    return output;
  };
}
function matchOrder(origin, target) {
  var _a;
  let orderedOrigin = [],
    pointers = { color: 0, var: 0, number: 0 };
  for (let i = 0; i < target.values.length; i++) {
    let type = target.types[i],
      originIndex = origin.indexes[type][pointers[type]],
      originValue = (_a = origin.values[originIndex]) !== null && _a !== void 0 ? _a : 0;
    (orderedOrigin[i] = originValue), pointers[type]++;
  }
  return orderedOrigin;
}
var mixComplex = (origin, target) => {
  let template = complex.createTransformer(target),
    originStats = analyseComplexValue(origin),
    targetStats = analyseComplexValue(target);
  return originStats.indexes.var.length === targetStats.indexes.var.length &&
    originStats.indexes.color.length === targetStats.indexes.color.length &&
    originStats.indexes.number.length >= targetStats.indexes.number.length
    ? (invisibleValues.has(origin) && !targetStats.values.length) ||
      (invisibleValues.has(target) && !originStats.values.length)
      ? mixVisibility(origin, target)
      : pipe(mixArray(matchOrder(originStats, targetStats), targetStats.values), template)
    : (warning4(
        !0,
        `Complex values '${origin}' and '${target}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`
      ),
      mixImmediate(origin, target));
};

// node_modules/framer-motion/dist/es/utils/mix/index.mjs
function mix(from, to, p) {
  return typeof from == 'number' && typeof to == 'number' && typeof p == 'number'
    ? mixNumber(from, to, p)
    : getMixer(from)(from, to);
}

// node_modules/framer-motion/dist/es/animation/generators/spring/index.mjs
import { calcGeneratorDuration, maxGeneratorDuration, generateLinearEasing } from 'motion-dom';
import {
  millisecondsToSeconds as millisecondsToSeconds2,
  secondsToMilliseconds as secondsToMilliseconds2,
} from 'motion-utils';

// node_modules/framer-motion/dist/es/animation/generators/utils/velocity.mjs
var velocitySampleDuration = 5;
function calcGeneratorVelocity(resolveValue, t, current) {
  let prevT = Math.max(t - velocitySampleDuration, 0);
  return velocityPerSecond(current - resolveValue(prevT), t - prevT);
}

// node_modules/framer-motion/dist/es/animation/generators/spring/defaults.mjs
var springDefaults = {
  // Default spring physics
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  // Default duration/bounce-based options
  duration: 800,
  // in ms
  bounce: 0.3,
  visualDuration: 0.3,
  // in seconds
  // Rest thresholds
  restSpeed: {
    granular: 0.01,
    default: 2,
  },
  restDelta: {
    granular: 5e-3,
    default: 0.5,
  },
  // Limits
  minDuration: 0.01,
  // in seconds
  maxDuration: 10,
  // in seconds
  minDamping: 0.05,
  maxDamping: 1,
};

// node_modules/framer-motion/dist/es/animation/generators/spring/find.mjs
import { warning as warning5, secondsToMilliseconds, millisecondsToSeconds } from 'motion-utils';
var safeMin = 1e-3;
function findSpring({
  duration = springDefaults.duration,
  bounce = springDefaults.bounce,
  velocity = springDefaults.velocity,
  mass = springDefaults.mass,
}) {
  let envelope, derivative;
  warning5(
    duration <= secondsToMilliseconds(springDefaults.maxDuration),
    'Spring duration must be 10 seconds or less'
  );
  let dampingRatio = 1 - bounce;
  (dampingRatio = clamp(springDefaults.minDamping, springDefaults.maxDamping, dampingRatio)),
    (duration = clamp(
      springDefaults.minDuration,
      springDefaults.maxDuration,
      millisecondsToSeconds(duration)
    )),
    dampingRatio < 1
      ? ((envelope = undampedFreq2 => {
          let exponentialDecay = undampedFreq2 * dampingRatio,
            delta = exponentialDecay * duration,
            a = exponentialDecay - velocity,
            b = calcAngularFreq(undampedFreq2, dampingRatio),
            c = Math.exp(-delta);
          return safeMin - (a / b) * c;
        }),
        (derivative = undampedFreq2 => {
          let delta = undampedFreq2 * dampingRatio * duration,
            d = delta * velocity + velocity,
            e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq2, 2) * duration,
            f = Math.exp(-delta),
            g = calcAngularFreq(Math.pow(undampedFreq2, 2), dampingRatio);
          return ((-envelope(undampedFreq2) + safeMin > 0 ? -1 : 1) * ((d - e) * f)) / g;
        }))
      : ((envelope = undampedFreq2 => {
          let a = Math.exp(-undampedFreq2 * duration),
            b = (undampedFreq2 - velocity) * duration + 1;
          return -safeMin + a * b;
        }),
        (derivative = undampedFreq2 => {
          let a = Math.exp(-undampedFreq2 * duration),
            b = (velocity - undampedFreq2) * (duration * duration);
          return a * b;
        }));
  let initialGuess = 5 / duration,
    undampedFreq = approximateRoot(envelope, derivative, initialGuess);
  if (((duration = secondsToMilliseconds(duration)), isNaN(undampedFreq)))
    return {
      stiffness: springDefaults.stiffness,
      damping: springDefaults.damping,
      duration,
    };
  {
    let stiffness = Math.pow(undampedFreq, 2) * mass;
    return {
      stiffness,
      damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
      duration,
    };
  }
}
var rootIterations = 12;
function approximateRoot(envelope, derivative, initialGuess) {
  let result = initialGuess;
  for (let i = 1; i < rootIterations; i++) result = result - envelope(result) / derivative(result);
  return result;
}
function calcAngularFreq(undampedFreq, dampingRatio) {
  return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}

// node_modules/framer-motion/dist/es/animation/generators/spring/index.mjs
var durationKeys = ['duration', 'bounce'],
  physicsKeys = ['stiffness', 'damping', 'mass'];
function isSpringType(options, keys) {
  return keys.some(key => options[key] !== void 0);
}
function getSpringOptions(options) {
  let springOptions = {
    velocity: springDefaults.velocity,
    stiffness: springDefaults.stiffness,
    damping: springDefaults.damping,
    mass: springDefaults.mass,
    isResolvedFromDuration: !1,
    ...options,
  };
  if (!isSpringType(options, physicsKeys) && isSpringType(options, durationKeys))
    if (options.visualDuration) {
      let visualDuration = options.visualDuration,
        root = (2 * Math.PI) / (visualDuration * 1.2),
        stiffness = root * root,
        damping = 2 * clamp(0.05, 1, 1 - (options.bounce || 0)) * Math.sqrt(stiffness);
      springOptions = {
        ...springOptions,
        mass: springDefaults.mass,
        stiffness,
        damping,
      };
    } else {
      let derived = findSpring(options);
      (springOptions = {
        ...springOptions,
        ...derived,
        mass: springDefaults.mass,
      }),
        (springOptions.isResolvedFromDuration = !0);
    }
  return springOptions;
}
function spring(
  optionsOrVisualDuration = springDefaults.visualDuration,
  bounce = springDefaults.bounce
) {
  let options =
      typeof optionsOrVisualDuration != 'object'
        ? {
            visualDuration: optionsOrVisualDuration,
            keyframes: [0, 1],
            bounce,
          }
        : optionsOrVisualDuration,
    { restSpeed, restDelta } = options,
    origin = options.keyframes[0],
    target = options.keyframes[options.keyframes.length - 1],
    state = { done: !1, value: origin },
    { stiffness, damping, mass, duration, velocity, isResolvedFromDuration } = getSpringOptions({
      ...options,
      velocity: -millisecondsToSeconds2(options.velocity || 0),
    }),
    initialVelocity = velocity || 0,
    dampingRatio = damping / (2 * Math.sqrt(stiffness * mass)),
    initialDelta = target - origin,
    undampedAngularFreq = millisecondsToSeconds2(Math.sqrt(stiffness / mass)),
    isGranularScale = Math.abs(initialDelta) < 5;
  restSpeed ||
    (restSpeed = isGranularScale
      ? springDefaults.restSpeed.granular
      : springDefaults.restSpeed.default),
    restDelta ||
      (restDelta = isGranularScale
        ? springDefaults.restDelta.granular
        : springDefaults.restDelta.default);
  let resolveSpring;
  if (dampingRatio < 1) {
    let angularFreq = calcAngularFreq(undampedAngularFreq, dampingRatio);
    resolveSpring = t => {
      let envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
      return (
        target -
        envelope *
          (((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq) *
            Math.sin(angularFreq * t) +
            initialDelta * Math.cos(angularFreq * t))
      );
    };
  } else if (dampingRatio === 1)
    resolveSpring = t =>
      target -
      Math.exp(-undampedAngularFreq * t) *
        (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t);
  else {
    let dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
    resolveSpring = t => {
      let envelope = Math.exp(-dampingRatio * undampedAngularFreq * t),
        freqForT = Math.min(dampedAngularFreq * t, 300);
      return (
        target -
        (envelope *
          ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) *
            Math.sinh(freqForT) +
            dampedAngularFreq * initialDelta * Math.cosh(freqForT))) /
          dampedAngularFreq
      );
    };
  }
  let generator = {
    calculatedDuration: (isResolvedFromDuration && duration) || null,
    next: t => {
      let current = resolveSpring(t);
      if (isResolvedFromDuration) state.done = t >= duration;
      else {
        let currentVelocity = 0;
        dampingRatio < 1 &&
          (currentVelocity =
            t === 0
              ? secondsToMilliseconds2(initialVelocity)
              : calcGeneratorVelocity(resolveSpring, t, current));
        let isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed,
          isBelowDisplacementThreshold = Math.abs(target - current) <= restDelta;
        state.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
      }
      return (state.value = state.done ? target : current), state;
    },
    toString: () => {
      let calculatedDuration = Math.min(calcGeneratorDuration(generator), maxGeneratorDuration),
        easing = generateLinearEasing(
          progress6 => generator.next(calculatedDuration * progress6).value,
          calculatedDuration,
          30
        );
      return calculatedDuration + 'ms ' + easing;
    },
  };
  return generator;
}

// node_modules/framer-motion/dist/es/animation/generators/inertia.mjs
function inertia({
  keyframes: keyframes2,
  velocity = 0,
  power = 0.8,
  timeConstant = 325,
  bounceDamping = 10,
  bounceStiffness = 500,
  modifyTarget,
  min,
  max,
  restDelta = 0.5,
  restSpeed,
}) {
  let origin = keyframes2[0],
    state = {
      done: !1,
      value: origin,
    },
    isOutOfBounds = v => (min !== void 0 && v < min) || (max !== void 0 && v > max),
    nearestBoundary = v =>
      min === void 0 ? max : max === void 0 || Math.abs(min - v) < Math.abs(max - v) ? min : max,
    amplitude = power * velocity,
    ideal = origin + amplitude,
    target = modifyTarget === void 0 ? ideal : modifyTarget(ideal);
  target !== ideal && (amplitude = target - origin);
  let calcDelta = t => -amplitude * Math.exp(-t / timeConstant),
    calcLatest = t => target + calcDelta(t),
    applyFriction = t => {
      let delta = calcDelta(t),
        latest = calcLatest(t);
      (state.done = Math.abs(delta) <= restDelta), (state.value = state.done ? target : latest);
    },
    timeReachedBoundary,
    spring$1,
    checkCatchBoundary = t => {
      isOutOfBounds(state.value) &&
        ((timeReachedBoundary = t),
        (spring$1 = spring({
          keyframes: [state.value, nearestBoundary(state.value)],
          velocity: calcGeneratorVelocity(calcLatest, t, state.value),
          // TODO: This should be passing * 1000
          damping: bounceDamping,
          stiffness: bounceStiffness,
          restDelta,
          restSpeed,
        })));
    };
  return (
    checkCatchBoundary(0),
    {
      calculatedDuration: null,
      next: t => {
        let hasUpdatedFrame = !1;
        return (
          !spring$1 &&
            timeReachedBoundary === void 0 &&
            ((hasUpdatedFrame = !0), applyFriction(t), checkCatchBoundary(t)),
          timeReachedBoundary !== void 0 && t >= timeReachedBoundary
            ? spring$1.next(t - timeReachedBoundary)
            : (!hasUpdatedFrame && applyFriction(t), state)
        );
      },
    }
  );
}

// node_modules/framer-motion/dist/es/easing/ease.mjs
var easeIn = /* @__PURE__ */ cubicBezier(0.42, 0, 1, 1),
  easeOut = /* @__PURE__ */ cubicBezier(0, 0, 0.58, 1),
  easeInOut = /* @__PURE__ */ cubicBezier(0.42, 0, 0.58, 1);

// node_modules/framer-motion/dist/es/easing/utils/is-easing-array.mjs
var isEasingArray = ease2 => Array.isArray(ease2) && typeof ease2[0] != 'number';

// node_modules/framer-motion/dist/es/easing/utils/map.mjs
import { isBezierDefinition } from 'motion-dom';
import { invariant as invariant3, noop as noop3 } from 'motion-utils';
var easingLookup = {
    linear: noop3,
    easeIn,
    easeInOut,
    easeOut,
    circIn,
    circInOut,
    circOut,
    backIn,
    backInOut,
    backOut,
    anticipate,
  },
  easingDefinitionToFunction = definition => {
    if (isBezierDefinition(definition)) {
      invariant3(
        definition.length === 4,
        'Cubic bezier arrays must contain four numerical values.'
      );
      let [x1, y1, x2, y2] = definition;
      return cubicBezier(x1, y1, x2, y2);
    } else if (typeof definition == 'string')
      return (
        invariant3(easingLookup[definition] !== void 0, `Invalid easing type '${definition}'`),
        easingLookup[definition]
      );
    return definition;
  };

// node_modules/framer-motion/dist/es/utils/interpolate.mjs
import { invariant as invariant4, noop as noop4, progress } from 'motion-utils';
function createMixers(output, ease2, customMixer) {
  let mixers = [],
    mixerFactory = customMixer || mix,
    numMixers = output.length - 1;
  for (let i = 0; i < numMixers; i++) {
    let mixer = mixerFactory(output[i], output[i + 1]);
    if (ease2) {
      let easingFunction = Array.isArray(ease2) ? ease2[i] || noop4 : ease2;
      mixer = pipe(easingFunction, mixer);
    }
    mixers.push(mixer);
  }
  return mixers;
}
function interpolate(input, output, { clamp: isClamp = !0, ease: ease2, mixer } = {}) {
  let inputLength = input.length;
  if (
    (invariant4(
      inputLength === output.length,
      'Both input and output ranges must be the same length'
    ),
    inputLength === 1)
  )
    return () => output[0];
  if (inputLength === 2 && output[0] === output[1]) return () => output[1];
  let isZeroDeltaRange = input[0] === input[1];
  input[0] > input[inputLength - 1] &&
    ((input = [...input].reverse()), (output = [...output].reverse()));
  let mixers = createMixers(output, ease2, mixer),
    numMixers = mixers.length,
    interpolator = v => {
      if (isZeroDeltaRange && v < input[0]) return output[0];
      let i = 0;
      if (numMixers > 1) for (; i < input.length - 2 && !(v < input[i + 1]); i++);
      let progressInRange = progress(input[i], input[i + 1], v);
      return mixers[i](progressInRange);
    };
  return isClamp ? v => interpolator(clamp(input[0], input[inputLength - 1], v)) : interpolator;
}

// node_modules/framer-motion/dist/es/utils/offsets/fill.mjs
import { progress as progress2 } from 'motion-utils';
function fillOffset(offset, remaining) {
  let min = offset[offset.length - 1];
  for (let i = 1; i <= remaining; i++) {
    let offsetProgress = progress2(0, remaining, i);
    offset.push(mixNumber(min, 1, offsetProgress));
  }
}

// node_modules/framer-motion/dist/es/utils/offsets/default.mjs
function defaultOffset(arr) {
  let offset = [0];
  return fillOffset(offset, arr.length - 1), offset;
}

// node_modules/framer-motion/dist/es/utils/offsets/time.mjs
function convertOffsetToTimes(offset, duration) {
  return offset.map(o => o * duration);
}

// node_modules/framer-motion/dist/es/animation/generators/keyframes.mjs
function defaultEasing(values, easing) {
  return values.map(() => easing || easeInOut).splice(0, values.length - 1);
}
function keyframes({
  duration = 300,
  keyframes: keyframeValues,
  times,
  ease: ease2 = 'easeInOut',
}) {
  let easingFunctions = isEasingArray(ease2)
      ? ease2.map(easingDefinitionToFunction)
      : easingDefinitionToFunction(ease2),
    state = {
      done: !1,
      value: keyframeValues[0],
    },
    absoluteTimes = convertOffsetToTimes(
      // Only use the provided offsets if they're the correct length
      // TODO Maybe we should warn here if there's a length mismatch
      times && times.length === keyframeValues.length ? times : defaultOffset(keyframeValues),
      duration
    ),
    mapTimeToKeyframe = interpolate(absoluteTimes, keyframeValues, {
      ease: Array.isArray(easingFunctions)
        ? easingFunctions
        : defaultEasing(keyframeValues, easingFunctions),
    });
  return {
    calculatedDuration: duration,
    next: t => ((state.value = mapTimeToKeyframe(t)), (state.done = t >= duration), state),
  };
}

// node_modules/framer-motion/dist/es/animation/animators/drivers/driver-frameloop.mjs
var frameloopDriver = update => {
  let passTimestamp = ({ timestamp }) => update(timestamp);
  return {
    start: () => frame.update(passTimestamp, !0),
    stop: () => cancelFrame(passTimestamp),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => (frameData.isProcessing ? frameData.timestamp : time.now()),
  };
};

// node_modules/framer-motion/dist/es/animation/animators/MainThreadAnimation.mjs
var generators = {
    decay: inertia,
    inertia,
    tween: keyframes,
    keyframes,
    spring,
  },
  percentToProgress = percent2 => percent2 / 100,
  MainThreadAnimation = class extends BaseAnimation {
    constructor(options) {
      super(options),
        (this.holdTime = null),
        (this.cancelTime = null),
        (this.currentTime = 0),
        (this.playbackSpeed = 1),
        (this.pendingPlayState = 'running'),
        (this.startTime = null),
        (this.state = 'idle'),
        (this.stop = () => {
          if ((this.resolver.cancel(), (this.isStopped = !0), this.state === 'idle')) return;
          this.teardown();
          let { onStop } = this.options;
          onStop && onStop();
        });
      let { name, motionValue: motionValue2, element, keyframes: keyframes2 } = this.options,
        KeyframeResolver$1 = element?.KeyframeResolver || KeyframeResolver,
        onResolved = (resolvedKeyframes, finalKeyframe) =>
          this.onKeyframesResolved(resolvedKeyframes, finalKeyframe);
      (this.resolver = new KeyframeResolver$1(keyframes2, onResolved, name, motionValue2, element)),
        this.resolver.scheduleResolve();
    }
    flatten() {
      super.flatten(),
        this._resolved &&
          Object.assign(this._resolved, this.initPlayback(this._resolved.keyframes));
    }
    initPlayback(keyframes$1) {
      let {
          type = 'keyframes',
          repeat = 0,
          repeatDelay = 0,
          repeatType,
          velocity = 0,
        } = this.options,
        generatorFactory = isGenerator2(type) ? type : generators[type] || keyframes,
        mapPercentToKeyframes,
        mirroredGenerator;
      generatorFactory !== keyframes &&
        typeof keyframes$1[0] != 'number' &&
        ((mapPercentToKeyframes = pipe(percentToProgress, mix(keyframes$1[0], keyframes$1[1]))),
        (keyframes$1 = [0, 100]));
      let generator = generatorFactory({ ...this.options, keyframes: keyframes$1 });
      repeatType === 'mirror' &&
        (mirroredGenerator = generatorFactory({
          ...this.options,
          keyframes: [...keyframes$1].reverse(),
          velocity: -velocity,
        })),
        generator.calculatedDuration === null &&
          (generator.calculatedDuration = calcGeneratorDuration2(generator));
      let { calculatedDuration } = generator,
        resolvedDuration = calculatedDuration + repeatDelay,
        totalDuration = resolvedDuration * (repeat + 1) - repeatDelay;
      return {
        generator,
        mirroredGenerator,
        mapPercentToKeyframes,
        calculatedDuration,
        resolvedDuration,
        totalDuration,
      };
    }
    onPostResolved() {
      let { autoplay = !0 } = this.options;
      this.play(),
        this.pendingPlayState === 'paused' || !autoplay
          ? this.pause()
          : (this.state = this.pendingPlayState);
    }
    tick(timestamp, sample = !1) {
      let { resolved } = this;
      if (!resolved) {
        let { keyframes: keyframes3 } = this.options;
        return { done: !0, value: keyframes3[keyframes3.length - 1] };
      }
      let {
        finalKeyframe,
        generator,
        mirroredGenerator,
        mapPercentToKeyframes,
        keyframes: keyframes2,
        calculatedDuration,
        totalDuration,
        resolvedDuration,
      } = resolved;
      if (this.startTime === null) return generator.next(0);
      let { delay: delay2, repeat, repeatType, repeatDelay, onUpdate } = this.options;
      this.speed > 0
        ? (this.startTime = Math.min(this.startTime, timestamp))
        : this.speed < 0 &&
          (this.startTime = Math.min(timestamp - totalDuration / this.speed, this.startTime)),
        sample
          ? (this.currentTime = timestamp)
          : this.holdTime !== null
            ? (this.currentTime = this.holdTime)
            : (this.currentTime = Math.round(timestamp - this.startTime) * this.speed);
      let timeWithoutDelay = this.currentTime - delay2 * (this.speed >= 0 ? 1 : -1),
        isInDelayPhase = this.speed >= 0 ? timeWithoutDelay < 0 : timeWithoutDelay > totalDuration;
      (this.currentTime = Math.max(timeWithoutDelay, 0)),
        this.state === 'finished' && this.holdTime === null && (this.currentTime = totalDuration);
      let elapsed = this.currentTime,
        frameGenerator = generator;
      if (repeat) {
        let progress6 = Math.min(this.currentTime, totalDuration) / resolvedDuration,
          currentIteration = Math.floor(progress6),
          iterationProgress = progress6 % 1;
        !iterationProgress && progress6 >= 1 && (iterationProgress = 1),
          iterationProgress === 1 && currentIteration--,
          (currentIteration = Math.min(currentIteration, repeat + 1)),
          Boolean(currentIteration % 2) &&
            (repeatType === 'reverse'
              ? ((iterationProgress = 1 - iterationProgress),
                repeatDelay && (iterationProgress -= repeatDelay / resolvedDuration))
              : repeatType === 'mirror' && (frameGenerator = mirroredGenerator)),
          (elapsed = clamp(0, 1, iterationProgress) * resolvedDuration);
      }
      let state = isInDelayPhase
        ? { done: !1, value: keyframes2[0] }
        : frameGenerator.next(elapsed);
      mapPercentToKeyframes && (state.value = mapPercentToKeyframes(state.value));
      let { done } = state;
      !isInDelayPhase &&
        calculatedDuration !== null &&
        (done = this.speed >= 0 ? this.currentTime >= totalDuration : this.currentTime <= 0);
      let isAnimationFinished =
        this.holdTime === null && (this.state === 'finished' || (this.state === 'running' && done));
      return (
        isAnimationFinished &&
          finalKeyframe !== void 0 &&
          (state.value = getFinalKeyframe(keyframes2, this.options, finalKeyframe)),
        onUpdate && onUpdate(state.value),
        isAnimationFinished && this.finish(),
        state
      );
    }
    get duration() {
      let { resolved } = this;
      return resolved ? millisecondsToSeconds3(resolved.calculatedDuration) : 0;
    }
    get time() {
      return millisecondsToSeconds3(this.currentTime);
    }
    set time(newTime) {
      (newTime = secondsToMilliseconds3(newTime)),
        (this.currentTime = newTime),
        this.holdTime !== null || this.speed === 0
          ? (this.holdTime = newTime)
          : this.driver && (this.startTime = this.driver.now() - newTime / this.speed);
    }
    get speed() {
      return this.playbackSpeed;
    }
    set speed(newSpeed) {
      let hasChanged = this.playbackSpeed !== newSpeed;
      (this.playbackSpeed = newSpeed),
        hasChanged && (this.time = millisecondsToSeconds3(this.currentTime));
    }
    play() {
      if ((this.resolver.isScheduled || this.resolver.resume(), !this._resolved)) {
        this.pendingPlayState = 'running';
        return;
      }
      if (this.isStopped) return;
      let { driver = frameloopDriver, onPlay, startTime } = this.options;
      this.driver || (this.driver = driver(timestamp => this.tick(timestamp))), onPlay && onPlay();
      let now2 = this.driver.now();
      this.holdTime !== null
        ? (this.startTime = now2 - this.holdTime)
        : this.startTime
          ? this.state === 'finished' && (this.startTime = now2)
          : (this.startTime = startTime ?? this.calcStartTime()),
        this.state === 'finished' && this.updateFinishedPromise(),
        (this.cancelTime = this.startTime),
        (this.holdTime = null),
        (this.state = 'running'),
        this.driver.start();
    }
    pause() {
      var _a;
      if (!this._resolved) {
        this.pendingPlayState = 'paused';
        return;
      }
      (this.state = 'paused'),
        (this.holdTime = (_a = this.currentTime) !== null && _a !== void 0 ? _a : 0);
    }
    complete() {
      this.state !== 'running' && this.play(),
        (this.pendingPlayState = this.state = 'finished'),
        (this.holdTime = null);
    }
    finish() {
      this.teardown(), (this.state = 'finished');
      let { onComplete } = this.options;
      onComplete && onComplete();
    }
    cancel() {
      this.cancelTime !== null && this.tick(this.cancelTime),
        this.teardown(),
        this.updateFinishedPromise();
    }
    teardown() {
      (this.state = 'idle'),
        this.stopDriver(),
        this.resolveFinishedPromise(),
        this.updateFinishedPromise(),
        (this.startTime = this.cancelTime = null),
        this.resolver.cancel();
    }
    stopDriver() {
      this.driver && (this.driver.stop(), (this.driver = void 0));
    }
    sample(time2) {
      return (this.startTime = 0), this.tick(time2, !0);
    }
  };

// node_modules/framer-motion/dist/es/animation/animators/utils/accelerated-values.mjs
var acceleratedValues = /* @__PURE__ */ new Set([
  'opacity',
  'clipPath',
  'filter',
  'transform',
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]);

// node_modules/framer-motion/dist/es/animation/animators/waapi/index.mjs
import { mapEasingToNativeEasing } from 'motion-dom';
function startWaapiAnimation(
  element,
  valueName,
  keyframes2,
  {
    delay: delay2 = 0,
    duration = 300,
    repeat = 0,
    repeatType = 'loop',
    ease: ease2 = 'easeInOut',
    times,
  } = {}
) {
  let keyframeOptions = { [valueName]: keyframes2 };
  times && (keyframeOptions.offset = times);
  let easing = mapEasingToNativeEasing(ease2, duration);
  return (
    Array.isArray(easing) && (keyframeOptions.easing = easing),
    element.animate(keyframeOptions, {
      delay: delay2,
      duration,
      easing: Array.isArray(easing) ? 'linear' : easing,
      fill: 'both',
      iterations: repeat + 1,
      direction: repeatType === 'reverse' ? 'alternate' : 'normal',
    })
  );
}

// node_modules/framer-motion/dist/es/animation/animators/waapi/utils/supports-waapi.mjs
import { memo } from 'motion-utils';
var supportsWaapi = /* @__PURE__ */ memo(() =>
  Object.hasOwnProperty.call(Element.prototype, 'animate')
);

// node_modules/framer-motion/dist/es/animation/animators/AcceleratedAnimation.mjs
var sampleDelta = 10,
  maxDuration = 2e4;
function requiresPregeneratedKeyframes(options) {
  return (
    isGenerator3(options.type) || options.type === 'spring' || !isWaapiSupportedEasing(options.ease)
  );
}
function pregenerateKeyframes(keyframes2, options) {
  let sampleAnimation = new MainThreadAnimation({
      ...options,
      keyframes: keyframes2,
      repeat: 0,
      delay: 0,
      isGenerator: !0,
    }),
    state = { done: !1, value: keyframes2[0] },
    pregeneratedKeyframes = [],
    t = 0;
  for (; !state.done && t < maxDuration; )
    (state = sampleAnimation.sample(t)),
      pregeneratedKeyframes.push(state.value),
      (t += sampleDelta);
  return {
    times: void 0,
    keyframes: pregeneratedKeyframes,
    duration: t - sampleDelta,
    ease: 'linear',
  };
}
var unsupportedEasingFunctions = {
  anticipate,
  backInOut,
  circInOut,
};
function isUnsupportedEase(key) {
  return key in unsupportedEasingFunctions;
}
var AcceleratedAnimation = class extends BaseAnimation {
  constructor(options) {
    super(options);
    let { name, motionValue: motionValue2, element, keyframes: keyframes2 } = this.options;
    (this.resolver = new DOMKeyframesResolver(
      keyframes2,
      (resolvedKeyframes, finalKeyframe) =>
        this.onKeyframesResolved(resolvedKeyframes, finalKeyframe),
      name,
      motionValue2,
      element
    )),
      this.resolver.scheduleResolve();
  }
  initPlayback(keyframes2, finalKeyframe) {
    let {
      duration = 300,
      times,
      ease: ease2,
      type,
      motionValue: motionValue2,
      name,
      startTime,
    } = this.options;
    if (!motionValue2.owner || !motionValue2.owner.current) return !1;
    if (
      (typeof ease2 == 'string' &&
        supportsLinearEasing() &&
        isUnsupportedEase(ease2) &&
        (ease2 = unsupportedEasingFunctions[ease2]),
      requiresPregeneratedKeyframes(this.options))
    ) {
      let { onComplete, onUpdate, motionValue: motionValue3, element, ...options } = this.options,
        pregeneratedAnimation = pregenerateKeyframes(keyframes2, options);
      (keyframes2 = pregeneratedAnimation.keyframes),
        keyframes2.length === 1 && (keyframes2[1] = keyframes2[0]),
        (duration = pregeneratedAnimation.duration),
        (times = pregeneratedAnimation.times),
        (ease2 = pregeneratedAnimation.ease),
        (type = 'keyframes');
    }
    let animation = startWaapiAnimation(motionValue2.owner.current, name, keyframes2, {
      ...this.options,
      duration,
      times,
      ease: ease2,
    });
    return (
      (animation.startTime = startTime ?? this.calcStartTime()),
      this.pendingTimeline
        ? (attachTimeline(animation, this.pendingTimeline), (this.pendingTimeline = void 0))
        : (animation.onfinish = () => {
            let { onComplete } = this.options;
            motionValue2.set(getFinalKeyframe(keyframes2, this.options, finalKeyframe)),
              onComplete && onComplete(),
              this.cancel(),
              this.resolveFinishedPromise();
          }),
      {
        animation,
        duration,
        times,
        type,
        ease: ease2,
        keyframes: keyframes2,
      }
    );
  }
  get duration() {
    let { resolved } = this;
    if (!resolved) return 0;
    let { duration } = resolved;
    return millisecondsToSeconds4(duration);
  }
  get time() {
    let { resolved } = this;
    if (!resolved) return 0;
    let { animation } = resolved;
    return millisecondsToSeconds4(animation.currentTime || 0);
  }
  set time(newTime) {
    let { resolved } = this;
    if (!resolved) return;
    let { animation } = resolved;
    animation.currentTime = secondsToMilliseconds4(newTime);
  }
  get speed() {
    let { resolved } = this;
    if (!resolved) return 1;
    let { animation } = resolved;
    return animation.playbackRate;
  }
  set speed(newSpeed) {
    let { resolved } = this;
    if (!resolved) return;
    let { animation } = resolved;
    animation.playbackRate = newSpeed;
  }
  get state() {
    let { resolved } = this;
    if (!resolved) return 'idle';
    let { animation } = resolved;
    return animation.playState;
  }
  get startTime() {
    let { resolved } = this;
    if (!resolved) return null;
    let { animation } = resolved;
    return animation.startTime;
  }
  /**
   * Replace the default DocumentTimeline with another AnimationTimeline.
   * Currently used for scroll animations.
   */
  attachTimeline(timeline) {
    if (!this._resolved) this.pendingTimeline = timeline;
    else {
      let { resolved } = this;
      if (!resolved) return noop5;
      let { animation } = resolved;
      attachTimeline(animation, timeline);
    }
    return noop5;
  }
  play() {
    if (this.isStopped) return;
    let { resolved } = this;
    if (!resolved) return;
    let { animation } = resolved;
    animation.playState === 'finished' && this.updateFinishedPromise(), animation.play();
  }
  pause() {
    let { resolved } = this;
    if (!resolved) return;
    let { animation } = resolved;
    animation.pause();
  }
  stop() {
    if ((this.resolver.cancel(), (this.isStopped = !0), this.state === 'idle')) return;
    this.resolveFinishedPromise(), this.updateFinishedPromise();
    let { resolved } = this;
    if (!resolved) return;
    let { animation, keyframes: keyframes2, duration, type, ease: ease2, times } = resolved;
    if (animation.playState === 'idle' || animation.playState === 'finished') return;
    if (this.time) {
      let { motionValue: motionValue2, onUpdate, onComplete, element, ...options } = this.options,
        sampleAnimation = new MainThreadAnimation({
          ...options,
          keyframes: keyframes2,
          duration,
          type,
          ease: ease2,
          times,
          isGenerator: !0,
        }),
        sampleTime = secondsToMilliseconds4(this.time);
      motionValue2.setWithVelocity(
        sampleAnimation.sample(sampleTime - sampleDelta).value,
        sampleAnimation.sample(sampleTime).value,
        sampleDelta
      );
    }
    let { onStop } = this.options;
    onStop && onStop(), this.cancel();
  }
  complete() {
    let { resolved } = this;
    resolved && resolved.animation.finish();
  }
  cancel() {
    let { resolved } = this;
    resolved && resolved.animation.cancel();
  }
  static supports(options) {
    let { motionValue: motionValue2, name, repeatDelay, repeatType, damping, type } = options;
    if (
      !motionValue2 ||
      !motionValue2.owner ||
      !(motionValue2.owner.current instanceof HTMLElement)
    )
      return !1;
    let { onUpdate, transformTemplate } = motionValue2.owner.getProps();
    return (
      supportsWaapi() &&
      name &&
      acceleratedValues.has(name) /**
       * If we're outputting values to onUpdate then we can't use WAAPI as there's
       * no way to read the value from WAAPI every frame.
       */ &&
      !onUpdate &&
      !transformTemplate &&
      !repeatDelay &&
      repeatType !== 'mirror' &&
      damping !== 0 &&
      type !== 'inertia'
    );
  }
};

// node_modules/framer-motion/dist/es/animation/utils/default-transitions.mjs
var underDampedSpring = {
    type: 'spring',
    stiffness: 500,
    damping: 25,
    restSpeed: 10,
  },
  criticallyDampedSpring = target => ({
    type: 'spring',
    stiffness: 550,
    damping: target === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
  }),
  keyframesTransition = {
    type: 'keyframes',
    duration: 0.8,
  },
  ease = {
    type: 'keyframes',
    ease: [0.25, 0.1, 0.35, 1],
    duration: 0.3,
  },
  getDefaultTransition = (valueKey, { keyframes: keyframes2 }) =>
    keyframes2.length > 2
      ? keyframesTransition
      : transformProps.has(valueKey)
        ? valueKey.startsWith('scale')
          ? criticallyDampedSpring(keyframes2[1])
          : underDampedSpring
        : ease;

// node_modules/framer-motion/dist/es/animation/utils/is-transition-defined.mjs
function isTransitionDefined({
  when,
  delay: _delay,
  delayChildren,
  staggerChildren,
  staggerDirection,
  repeat,
  repeatType,
  repeatDelay,
  from,
  elapsed,
  ...transition
}) {
  return !!Object.keys(transition).length;
}

// node_modules/framer-motion/dist/es/animation/interfaces/motion-value.mjs
var animateMotionValue =
  (name, value, target, transition = {}, element, isHandoff) =>
  onComplete => {
    let valueTransition = getValueTransition(transition, name) || {},
      delay2 = valueTransition.delay || transition.delay || 0,
      { elapsed = 0 } = transition;
    elapsed = elapsed - secondsToMilliseconds5(delay2);
    let options = {
      keyframes: Array.isArray(target) ? target : [null, target],
      ease: 'easeOut',
      velocity: value.getVelocity(),
      ...valueTransition,
      delay: -elapsed,
      onUpdate: v => {
        value.set(v), valueTransition.onUpdate && valueTransition.onUpdate(v);
      },
      onComplete: () => {
        onComplete(), valueTransition.onComplete && valueTransition.onComplete();
      },
      name,
      motionValue: value,
      element: isHandoff ? void 0 : element,
    };
    isTransitionDefined(valueTransition) ||
      (options = {
        ...options,
        ...getDefaultTransition(name, options),
      }),
      options.duration && (options.duration = secondsToMilliseconds5(options.duration)),
      options.repeatDelay && (options.repeatDelay = secondsToMilliseconds5(options.repeatDelay)),
      options.from !== void 0 && (options.keyframes[0] = options.from);
    let shouldSkip = !1;
    if (
      ((options.type === !1 || (options.duration === 0 && !options.repeatDelay)) &&
        ((options.duration = 0), options.delay === 0 && (shouldSkip = !0)),
      (instantAnimationState.current || MotionGlobalConfig.skipAnimations) &&
        ((shouldSkip = !0), (options.duration = 0), (options.delay = 0)),
      shouldSkip && !isHandoff && value.get() !== void 0)
    ) {
      let finalKeyframe = getFinalKeyframe(options.keyframes, valueTransition);
      if (finalKeyframe !== void 0)
        return (
          frame.update(() => {
            options.onUpdate(finalKeyframe), options.onComplete();
          }),
          new GroupPlaybackControls([])
        );
    }
    return !isHandoff && AcceleratedAnimation.supports(options)
      ? new AcceleratedAnimation(options)
      : new MainThreadAnimation(options);
  };

// node_modules/framer-motion/dist/es/animation/interfaces/visual-element-target.mjs
function shouldBlockAnimation({ protectedKeys, needsAnimating }, key) {
  let shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== !0;
  return (needsAnimating[key] = !1), shouldBlock;
}
function animateTarget(
  visualElement,
  targetAndTransition,
  { delay: delay2 = 0, transitionOverride, type } = {}
) {
  var _a;
  let {
    transition = visualElement.getDefaultTransition(),
    transitionEnd,
    ...target
  } = targetAndTransition;
  transitionOverride && (transition = transitionOverride);
  let animations2 = [],
    animationTypeState =
      type && visualElement.animationState && visualElement.animationState.getState()[type];
  for (let key in target) {
    let value = visualElement.getValue(
        key,
        (_a = visualElement.latestValues[key]) !== null && _a !== void 0 ? _a : null
      ),
      valueTarget = target[key];
    if (
      valueTarget === void 0 ||
      (animationTypeState && shouldBlockAnimation(animationTypeState, key))
    )
      continue;
    let valueTransition = {
        delay: delay2,
        ...getValueTransition2(transition || {}, key),
      },
      isHandoff = !1;
    if (window.MotionHandoffAnimation) {
      let appearId = getOptimisedAppearId(visualElement);
      if (appearId) {
        let startTime = window.MotionHandoffAnimation(appearId, key, frame);
        startTime !== null && ((valueTransition.startTime = startTime), (isHandoff = !0));
      }
    }
    addValueToWillChange(visualElement, key),
      value.start(
        animateMotionValue(
          key,
          value,
          valueTarget,
          visualElement.shouldReduceMotion && positionalKeys.has(key)
            ? { type: !1 }
            : valueTransition,
          visualElement,
          isHandoff
        )
      );
    let animation = value.animation;
    animation && animations2.push(animation);
  }
  return (
    transitionEnd &&
      Promise.all(animations2).then(() => {
        frame.update(() => {
          transitionEnd && setTarget(visualElement, transitionEnd);
        });
      }),
    animations2
  );
}

// node_modules/framer-motion/dist/es/animation/interfaces/visual-element-variant.mjs
function animateVariant(visualElement, variant, options = {}) {
  var _a;
  let resolved = resolveVariant(
      visualElement,
      variant,
      options.type === 'exit'
        ? (_a = visualElement.presenceContext) === null || _a === void 0
          ? void 0
          : _a.custom
        : void 0
    ),
    { transition = visualElement.getDefaultTransition() || {} } = resolved || {};
  options.transitionOverride && (transition = options.transitionOverride);
  let getAnimation = resolved
      ? () => Promise.all(animateTarget(visualElement, resolved, options))
      : () => Promise.resolve(),
    getChildAnimations =
      visualElement.variantChildren && visualElement.variantChildren.size
        ? (forwardDelay = 0) => {
            let { delayChildren = 0, staggerChildren, staggerDirection } = transition;
            return animateChildren(
              visualElement,
              variant,
              delayChildren + forwardDelay,
              staggerChildren,
              staggerDirection,
              options
            );
          }
        : () => Promise.resolve(),
    { when } = transition;
  if (when) {
    let [first, last] =
      when === 'beforeChildren'
        ? [getAnimation, getChildAnimations]
        : [getChildAnimations, getAnimation];
    return first().then(() => last());
  } else return Promise.all([getAnimation(), getChildAnimations(options.delay)]);
}
function animateChildren(
  visualElement,
  variant,
  delayChildren = 0,
  staggerChildren = 0,
  staggerDirection = 1,
  options
) {
  let animations2 = [],
    maxStaggerDuration = (visualElement.variantChildren.size - 1) * staggerChildren,
    generateStaggerDuration =
      staggerDirection === 1
        ? (i = 0) => i * staggerChildren
        : (i = 0) => maxStaggerDuration - i * staggerChildren;
  return (
    Array.from(visualElement.variantChildren)
      .sort(sortByTreeOrder)
      .forEach((child, i) => {
        child.notify('AnimationStart', variant),
          animations2.push(
            animateVariant(child, variant, {
              ...options,
              delay: delayChildren + generateStaggerDuration(i),
            }).then(() => child.notify('AnimationComplete', variant))
          );
      }),
    Promise.all(animations2)
  );
}
function sortByTreeOrder(a, b) {
  return a.sortNodePosition(b);
}

// node_modules/framer-motion/dist/es/animation/interfaces/visual-element.mjs
function animateVisualElement(visualElement, definition, options = {}) {
  visualElement.notify('AnimationStart', definition);
  let animation;
  if (Array.isArray(definition)) {
    let animations2 = definition.map(variant => animateVariant(visualElement, variant, options));
    animation = Promise.all(animations2);
  } else if (typeof definition == 'string')
    animation = animateVariant(visualElement, definition, options);
  else {
    let resolvedDefinition =
      typeof definition == 'function'
        ? resolveVariant(visualElement, definition, options.custom)
        : definition;
    animation = Promise.all(animateTarget(visualElement, resolvedDefinition, options));
  }
  return animation.then(() => {
    visualElement.notify('AnimationComplete', definition);
  });
}

// node_modules/framer-motion/dist/es/render/utils/get-variant-context.mjs
var numVariantProps = variantProps.length;
function getVariantContext(visualElement) {
  if (!visualElement) return;
  if (!visualElement.isControllingVariants) {
    let context2 = visualElement.parent ? getVariantContext(visualElement.parent) || {} : {};
    return (
      visualElement.props.initial !== void 0 && (context2.initial = visualElement.props.initial),
      context2
    );
  }
  let context = {};
  for (let i = 0; i < numVariantProps; i++) {
    let name = variantProps[i],
      prop = visualElement.props[name];
    (isVariantLabel(prop) || prop === !1) && (context[name] = prop);
  }
  return context;
}

// node_modules/framer-motion/dist/es/render/utils/animation-state.mjs
var reversePriorityOrder = [...variantPriorityOrder].reverse(),
  numAnimationTypes = variantPriorityOrder.length;
function animateList(visualElement) {
  return animations2 =>
    Promise.all(
      animations2.map(({ animation, options }) =>
        animateVisualElement(visualElement, animation, options)
      )
    );
}
function createAnimationState(visualElement) {
  let animate = animateList(visualElement),
    state = createState(),
    isInitialRender = !0,
    buildResolvedTypeValues = type => (acc, definition) => {
      var _a;
      let resolved = resolveVariant(
        visualElement,
        definition,
        type === 'exit'
          ? (_a = visualElement.presenceContext) === null || _a === void 0
            ? void 0
            : _a.custom
          : void 0
      );
      if (resolved) {
        let { transition, transitionEnd, ...target } = resolved;
        acc = { ...acc, ...target, ...transitionEnd };
      }
      return acc;
    };
  function setAnimateFunction(makeAnimator) {
    animate = makeAnimator(visualElement);
  }
  function animateChanges(changedActiveType) {
    let { props } = visualElement,
      context = getVariantContext(visualElement.parent) || {},
      animations2 = [],
      removedKeys = /* @__PURE__ */ new Set(),
      encounteredKeys = {},
      removedVariantIndex = 1 / 0;
    for (let i = 0; i < numAnimationTypes; i++) {
      let type = reversePriorityOrder[i],
        typeState = state[type],
        prop = props[type] !== void 0 ? props[type] : context[type],
        propIsVariant = isVariantLabel(prop),
        activeDelta = type === changedActiveType ? typeState.isActive : null;
      activeDelta === !1 && (removedVariantIndex = i);
      let isInherited = prop === context[type] && prop !== props[type] && propIsVariant;
      if (
        (isInherited &&
          isInitialRender &&
          visualElement.manuallyAnimateOnMount &&
          (isInherited = !1),
        (typeState.protectedKeys = { ...encounteredKeys }), // If it isn't active and hasn't *just* been set as inactive
        (!typeState.isActive && activeDelta === null) || // If we didn't and don't have any defined prop for this animation type
          (!prop && !typeState.prevProp) || // Or if the prop doesn't define an animation
          isAnimationControls(prop) ||
          typeof prop == 'boolean')
      )
        continue;
      let variantDidChange = checkVariantsDidChange(typeState.prevProp, prop),
        shouldAnimateType =
          variantDidChange || // If we're making this variant active, we want to always make it active
          (type === changedActiveType && typeState.isActive && !isInherited && propIsVariant) || // If we removed a higher-priority variant (i is in reverse order)
          (i > removedVariantIndex && propIsVariant),
        handledRemovedValues = !1,
        definitionList = Array.isArray(prop) ? prop : [prop],
        resolvedValues = definitionList.reduce(buildResolvedTypeValues(type), {});
      activeDelta === !1 && (resolvedValues = {});
      let { prevResolvedValues = {} } = typeState,
        allKeys = {
          ...prevResolvedValues,
          ...resolvedValues,
        },
        markToAnimate = key => {
          (shouldAnimateType = !0),
            removedKeys.has(key) && ((handledRemovedValues = !0), removedKeys.delete(key)),
            (typeState.needsAnimating[key] = !0);
          let motionValue2 = visualElement.getValue(key);
          motionValue2 && (motionValue2.liveStyle = !1);
        };
      for (let key in allKeys) {
        let next = resolvedValues[key],
          prev = prevResolvedValues[key];
        if (encounteredKeys.hasOwnProperty(key)) continue;
        let valueHasChanged = !1;
        isKeyframesTarget(next) && isKeyframesTarget(prev)
          ? (valueHasChanged = !shallowCompare(next, prev))
          : (valueHasChanged = next !== prev),
          valueHasChanged
            ? next != null
              ? markToAnimate(key)
              : removedKeys.add(key)
            : next !== void 0 && removedKeys.has(key)
              ? markToAnimate(key)
              : (typeState.protectedKeys[key] = !0);
      }
      (typeState.prevProp = prop),
        (typeState.prevResolvedValues = resolvedValues),
        typeState.isActive && (encounteredKeys = { ...encounteredKeys, ...resolvedValues }),
        isInitialRender && visualElement.blockInitialAnimation && (shouldAnimateType = !1),
        shouldAnimateType &&
          (!(isInherited && variantDidChange) || handledRemovedValues) &&
          animations2.push(
            ...definitionList.map(animation => ({
              animation,
              options: { type },
            }))
          );
    }
    if (removedKeys.size) {
      let fallbackAnimation = {};
      removedKeys.forEach(key => {
        let fallbackTarget = visualElement.getBaseTarget(key),
          motionValue2 = visualElement.getValue(key);
        motionValue2 && (motionValue2.liveStyle = !0),
          (fallbackAnimation[key] = fallbackTarget ?? null);
      }),
        animations2.push({ animation: fallbackAnimation });
    }
    let shouldAnimate = Boolean(animations2.length);
    return (
      isInitialRender &&
        (props.initial === !1 || props.initial === props.animate) &&
        !visualElement.manuallyAnimateOnMount &&
        (shouldAnimate = !1),
      (isInitialRender = !1),
      shouldAnimate ? animate(animations2) : Promise.resolve()
    );
  }
  function setActive(type, isActive) {
    var _a;
    if (state[type].isActive === isActive) return Promise.resolve();
    (_a = visualElement.variantChildren) === null ||
      _a === void 0 ||
      _a.forEach(child => {
        var _a2;
        return (_a2 = child.animationState) === null || _a2 === void 0
          ? void 0
          : _a2.setActive(type, isActive);
      }),
      (state[type].isActive = isActive);
    let animations2 = animateChanges(type);
    for (let key in state) state[key].protectedKeys = {};
    return animations2;
  }
  return {
    animateChanges,
    setActive,
    setAnimateFunction,
    getState: () => state,
    reset: () => {
      (state = createState()), (isInitialRender = !0);
    },
  };
}
function checkVariantsDidChange(prev, next) {
  return typeof next == 'string'
    ? next !== prev
    : Array.isArray(next)
      ? !shallowCompare(next, prev)
      : !1;
}
function createTypeState(isActive = !1) {
  return {
    isActive,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {},
  };
}
function createState() {
  return {
    animate: createTypeState(!0),
    whileInView: createTypeState(),
    whileHover: createTypeState(),
    whileTap: createTypeState(),
    whileDrag: createTypeState(),
    whileFocus: createTypeState(),
    exit: createTypeState(),
  };
}

// node_modules/framer-motion/dist/es/motion/features/Feature.mjs
var Feature = class {
  constructor(node) {
    (this.isMounted = !1), (this.node = node);
  }
  update() {}
};

// node_modules/framer-motion/dist/es/motion/features/animation/index.mjs
var AnimationFeature = class extends Feature {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(node) {
    super(node), node.animationState || (node.animationState = createAnimationState(node));
  }
  updateAnimationControlsSubscription() {
    let { animate } = this.node.getProps();
    isAnimationControls(animate) && (this.unmountControls = animate.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    let { animate } = this.node.getProps(),
      { animate: prevAnimate } = this.node.prevProps || {};
    animate !== prevAnimate && this.updateAnimationControlsSubscription();
  }
  unmount() {
    var _a;
    this.node.animationState.reset(),
      (_a = this.unmountControls) === null || _a === void 0 || _a.call(this);
  }
};

// node_modules/framer-motion/dist/es/motion/features/animation/exit.mjs
var id = 0,
  ExitAnimationFeature = class extends Feature {
    constructor() {
      super(...arguments), (this.id = id++);
    }
    update() {
      if (!this.node.presenceContext) return;
      let { isPresent, onExitComplete } = this.node.presenceContext,
        { isPresent: prevIsPresent } = this.node.prevPresenceContext || {};
      if (!this.node.animationState || isPresent === prevIsPresent) return;
      let exitAnimation = this.node.animationState.setActive('exit', !isPresent);
      onExitComplete && !isPresent && exitAnimation.then(() => onExitComplete(this.id));
    }
    mount() {
      let { register } = this.node.presenceContext || {};
      register && (this.unmount = register(this.id));
    }
    unmount() {}
  };

// node_modules/framer-motion/dist/es/motion/features/animations.mjs
var animations = {
  animation: {
    Feature: AnimationFeature,
  },
  exit: {
    Feature: ExitAnimationFeature,
  },
};

// node_modules/framer-motion/dist/es/gestures/drag/index.mjs
import { noop as noop6 } from 'motion-utils';

// node_modules/framer-motion/dist/es/gestures/drag/VisualElementDragControls.mjs
import { invariant as invariant6 } from 'motion-utils';
import { setDragLock } from 'motion-dom';

// node_modules/framer-motion/dist/es/gestures/pan/PanSession.mjs
import { isPrimaryPointer as isPrimaryPointer2 } from 'motion-dom';
import {
  secondsToMilliseconds as secondsToMilliseconds6,
  millisecondsToSeconds as millisecondsToSeconds5,
} from 'motion-utils';

// node_modules/framer-motion/dist/es/events/add-dom-event.mjs
function addDomEvent(target, eventName, handler, options = { passive: !0 }) {
  return (
    target.addEventListener(eventName, handler, options),
    () => target.removeEventListener(eventName, handler)
  );
}

// node_modules/framer-motion/dist/es/events/event-info.mjs
import { isPrimaryPointer } from 'motion-dom';
function extractEventInfo(event) {
  return {
    point: {
      x: event.pageX,
      y: event.pageY,
    },
  };
}
var addPointerInfo = handler => event =>
  isPrimaryPointer(event) && handler(event, extractEventInfo(event));

// node_modules/framer-motion/dist/es/events/add-pointer-event.mjs
function addPointerEvent(target, eventName, handler, options) {
  return addDomEvent(target, eventName, addPointerInfo(handler), options);
}

// node_modules/framer-motion/dist/es/utils/distance.mjs
var distance = (a, b) => Math.abs(a - b);
function distance2D(a, b) {
  let xDelta = distance(a.x, b.x),
    yDelta = distance(a.y, b.y);
  return Math.sqrt(xDelta ** 2 + yDelta ** 2);
}

// node_modules/framer-motion/dist/es/gestures/pan/PanSession.mjs
var PanSession = class {
  constructor(event, handlers, { transformPagePoint, contextWindow, dragSnapToOrigin = !1 } = {}) {
    if (
      ((this.startEvent = null),
      (this.lastMoveEvent = null),
      (this.lastMoveEventInfo = null),
      (this.handlers = {}),
      (this.contextWindow = window),
      (this.updatePoint = () => {
        if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
        let info2 = getPanInfo(this.lastMoveEventInfo, this.history),
          isPanStarted = this.startEvent !== null,
          isDistancePastThreshold = distance2D(info2.offset, { x: 0, y: 0 }) >= 3;
        if (!isPanStarted && !isDistancePastThreshold) return;
        let { point: point2 } = info2,
          { timestamp: timestamp2 } = frameData;
        this.history.push({ ...point2, timestamp: timestamp2 });
        let { onStart, onMove } = this.handlers;
        isPanStarted ||
          (onStart && onStart(this.lastMoveEvent, info2), (this.startEvent = this.lastMoveEvent)),
          onMove && onMove(this.lastMoveEvent, info2);
      }),
      (this.handlePointerMove = (event2, info2) => {
        (this.lastMoveEvent = event2),
          (this.lastMoveEventInfo = transformPoint(info2, this.transformPagePoint)),
          frame.update(this.updatePoint, !0);
      }),
      (this.handlePointerUp = (event2, info2) => {
        this.end();
        let { onEnd, onSessionEnd, resumeAnimation } = this.handlers;
        if (
          (this.dragSnapToOrigin && resumeAnimation && resumeAnimation(),
          !(this.lastMoveEvent && this.lastMoveEventInfo))
        )
          return;
        let panInfo = getPanInfo(
          event2.type === 'pointercancel'
            ? this.lastMoveEventInfo
            : transformPoint(info2, this.transformPagePoint),
          this.history
        );
        this.startEvent && onEnd && onEnd(event2, panInfo),
          onSessionEnd && onSessionEnd(event2, panInfo);
      }),
      !isPrimaryPointer2(event))
    )
      return;
    (this.dragSnapToOrigin = dragSnapToOrigin),
      (this.handlers = handlers),
      (this.transformPagePoint = transformPagePoint),
      (this.contextWindow = contextWindow || window);
    let info = extractEventInfo(event),
      initialInfo = transformPoint(info, this.transformPagePoint),
      { point } = initialInfo,
      { timestamp } = frameData;
    this.history = [{ ...point, timestamp }];
    let { onSessionStart } = handlers;
    onSessionStart && onSessionStart(event, getPanInfo(initialInfo, this.history)),
      (this.removeListeners = pipe(
        addPointerEvent(this.contextWindow, 'pointermove', this.handlePointerMove),
        addPointerEvent(this.contextWindow, 'pointerup', this.handlePointerUp),
        addPointerEvent(this.contextWindow, 'pointercancel', this.handlePointerUp)
      ));
  }
  updateHandlers(handlers) {
    this.handlers = handlers;
  }
  end() {
    this.removeListeners && this.removeListeners(), cancelFrame(this.updatePoint);
  }
};
function transformPoint(info, transformPagePoint) {
  return transformPagePoint ? { point: transformPagePoint(info.point) } : info;
}
function subtractPoint(a, b) {
  return { x: a.x - b.x, y: a.y - b.y };
}
function getPanInfo({ point }, history) {
  return {
    point,
    delta: subtractPoint(point, lastDevicePoint(history)),
    offset: subtractPoint(point, startDevicePoint(history)),
    velocity: getVelocity(history, 0.1),
  };
}
function startDevicePoint(history) {
  return history[0];
}
function lastDevicePoint(history) {
  return history[history.length - 1];
}
function getVelocity(history, timeDelta) {
  if (history.length < 2) return { x: 0, y: 0 };
  let i = history.length - 1,
    timestampedPoint = null,
    lastPoint = lastDevicePoint(history);
  for (
    ;
    i >= 0 &&
    ((timestampedPoint = history[i]),
    !(lastPoint.timestamp - timestampedPoint.timestamp > secondsToMilliseconds6(timeDelta)));

  )
    i--;
  if (!timestampedPoint) return { x: 0, y: 0 };
  let time2 = millisecondsToSeconds5(lastPoint.timestamp - timestampedPoint.timestamp);
  if (time2 === 0) return { x: 0, y: 0 };
  let currentVelocity = {
    x: (lastPoint.x - timestampedPoint.x) / time2,
    y: (lastPoint.y - timestampedPoint.y) / time2,
  };
  return (
    currentVelocity.x === 1 / 0 && (currentVelocity.x = 0),
    currentVelocity.y === 1 / 0 && (currentVelocity.y = 0),
    currentVelocity
  );
}

// node_modules/framer-motion/dist/es/gestures/drag/utils/constraints.mjs
import { progress as progress3 } from 'motion-utils';

// node_modules/framer-motion/dist/es/projection/geometry/delta-calc.mjs
var SCALE_PRECISION = 1e-4,
  SCALE_MIN = 1 - SCALE_PRECISION,
  SCALE_MAX = 1 + SCALE_PRECISION,
  TRANSLATE_PRECISION = 0.01,
  TRANSLATE_MIN = 0 - TRANSLATE_PRECISION,
  TRANSLATE_MAX = 0 + TRANSLATE_PRECISION;
function calcLength(axis) {
  return axis.max - axis.min;
}
function isNear(value, target, maxDistance) {
  return Math.abs(value - target) <= maxDistance;
}
function calcAxisDelta(delta, source, target, origin = 0.5) {
  (delta.origin = origin),
    (delta.originPoint = mixNumber(source.min, source.max, delta.origin)),
    (delta.scale = calcLength(target) / calcLength(source)),
    (delta.translate = mixNumber(target.min, target.max, delta.origin) - delta.originPoint),
    ((delta.scale >= SCALE_MIN && delta.scale <= SCALE_MAX) || isNaN(delta.scale)) &&
      (delta.scale = 1),
    ((delta.translate >= TRANSLATE_MIN && delta.translate <= TRANSLATE_MAX) ||
      isNaN(delta.translate)) &&
      (delta.translate = 0);
}
function calcBoxDelta(delta, source, target, origin) {
  calcAxisDelta(delta.x, source.x, target.x, origin ? origin.originX : void 0),
    calcAxisDelta(delta.y, source.y, target.y, origin ? origin.originY : void 0);
}
function calcRelativeAxis(target, relative, parent) {
  (target.min = parent.min + relative.min), (target.max = target.min + calcLength(relative));
}
function calcRelativeBox(target, relative, parent) {
  calcRelativeAxis(target.x, relative.x, parent.x),
    calcRelativeAxis(target.y, relative.y, parent.y);
}
function calcRelativeAxisPosition(target, layout2, parent) {
  (target.min = layout2.min - parent.min), (target.max = target.min + calcLength(layout2));
}
function calcRelativePosition(target, layout2, parent) {
  calcRelativeAxisPosition(target.x, layout2.x, parent.x),
    calcRelativeAxisPosition(target.y, layout2.y, parent.y);
}

// node_modules/framer-motion/dist/es/gestures/drag/utils/constraints.mjs
function applyConstraints(point, { min, max }, elastic) {
  return (
    min !== void 0 && point < min
      ? (point = elastic ? mixNumber(min, point, elastic.min) : Math.max(point, min))
      : max !== void 0 &&
        point > max &&
        (point = elastic ? mixNumber(max, point, elastic.max) : Math.min(point, max)),
    point
  );
}
function calcRelativeAxisConstraints(axis, min, max) {
  return {
    min: min !== void 0 ? axis.min + min : void 0,
    max: max !== void 0 ? axis.max + max - (axis.max - axis.min) : void 0,
  };
}
function calcRelativeConstraints(layoutBox, { top, left, bottom, right }) {
  return {
    x: calcRelativeAxisConstraints(layoutBox.x, left, right),
    y: calcRelativeAxisConstraints(layoutBox.y, top, bottom),
  };
}
function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
  let min = constraintsAxis.min - layoutAxis.min,
    max = constraintsAxis.max - layoutAxis.max;
  return (
    constraintsAxis.max - constraintsAxis.min < layoutAxis.max - layoutAxis.min &&
      ([min, max] = [max, min]),
    { min, max }
  );
}
function calcViewportConstraints(layoutBox, constraintsBox) {
  return {
    x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
    y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y),
  };
}
function calcOrigin2(source, target) {
  let origin = 0.5,
    sourceLength = calcLength(source),
    targetLength = calcLength(target);
  return (
    targetLength > sourceLength
      ? (origin = progress3(target.min, target.max - sourceLength, source.min))
      : sourceLength > targetLength &&
        (origin = progress3(source.min, source.max - targetLength, target.min)),
    clamp(0, 1, origin)
  );
}
function rebaseAxisConstraints(layout2, constraints) {
  let relativeConstraints = {};
  return (
    constraints.min !== void 0 && (relativeConstraints.min = constraints.min - layout2.min),
    constraints.max !== void 0 && (relativeConstraints.max = constraints.max - layout2.min),
    relativeConstraints
  );
}
var defaultElastic = 0.35;
function resolveDragElastic(dragElastic = defaultElastic) {
  return (
    dragElastic === !1 ? (dragElastic = 0) : dragElastic === !0 && (dragElastic = defaultElastic),
    {
      x: resolveAxisElastic(dragElastic, 'left', 'right'),
      y: resolveAxisElastic(dragElastic, 'top', 'bottom'),
    }
  );
}
function resolveAxisElastic(dragElastic, minLabel, maxLabel) {
  return {
    min: resolvePointElastic(dragElastic, minLabel),
    max: resolvePointElastic(dragElastic, maxLabel),
  };
}
function resolvePointElastic(dragElastic, label) {
  return typeof dragElastic == 'number' ? dragElastic : dragElastic[label] || 0;
}

// node_modules/framer-motion/dist/es/projection/geometry/models.mjs
var createAxisDelta = () => ({
    translate: 0,
    scale: 1,
    origin: 0,
    originPoint: 0,
  }),
  createDelta = () => ({
    x: createAxisDelta(),
    y: createAxisDelta(),
  }),
  createAxis = () => ({ min: 0, max: 0 }),
  createBox = () => ({
    x: createAxis(),
    y: createAxis(),
  });

// node_modules/framer-motion/dist/es/projection/utils/each-axis.mjs
function eachAxis(callback) {
  return [callback('x'), callback('y')];
}

// node_modules/framer-motion/dist/es/projection/geometry/conversion.mjs
function convertBoundingBoxToBox({ top, left, right, bottom }) {
  return {
    x: { min: left, max: right },
    y: { min: top, max: bottom },
  };
}
function convertBoxToBoundingBox({ x, y }) {
  return { top: y.min, right: x.max, bottom: y.max, left: x.min };
}
function transformBoxPoints(point, transformPoint2) {
  if (!transformPoint2) return point;
  let topLeft = transformPoint2({ x: point.left, y: point.top }),
    bottomRight = transformPoint2({ x: point.right, y: point.bottom });
  return {
    top: topLeft.y,
    left: topLeft.x,
    bottom: bottomRight.y,
    right: bottomRight.x,
  };
}

// node_modules/framer-motion/dist/es/projection/utils/has-transform.mjs
function isIdentityScale(scale2) {
  return scale2 === void 0 || scale2 === 1;
}
function hasScale({ scale: scale2, scaleX, scaleY }) {
  return !isIdentityScale(scale2) || !isIdentityScale(scaleX) || !isIdentityScale(scaleY);
}
function hasTransform(values) {
  return (
    hasScale(values) ||
    has2DTranslate(values) ||
    values.z ||
    values.rotate ||
    values.rotateX ||
    values.rotateY ||
    values.skewX ||
    values.skewY
  );
}
function has2DTranslate(values) {
  return is2DTranslate(values.x) || is2DTranslate(values.y);
}
function is2DTranslate(value) {
  return value && value !== '0%';
}

// node_modules/framer-motion/dist/es/projection/geometry/delta-apply.mjs
function scalePoint(point, scale2, originPoint) {
  let distanceFromOrigin = point - originPoint,
    scaled = scale2 * distanceFromOrigin;
  return originPoint + scaled;
}
function applyPointDelta(point, translate, scale2, originPoint, boxScale) {
  return (
    boxScale !== void 0 && (point = scalePoint(point, boxScale, originPoint)),
    scalePoint(point, scale2, originPoint) + translate
  );
}
function applyAxisDelta(axis, translate = 0, scale2 = 1, originPoint, boxScale) {
  (axis.min = applyPointDelta(axis.min, translate, scale2, originPoint, boxScale)),
    (axis.max = applyPointDelta(axis.max, translate, scale2, originPoint, boxScale));
}
function applyBoxDelta(box, { x, y }) {
  applyAxisDelta(box.x, x.translate, x.scale, x.originPoint),
    applyAxisDelta(box.y, y.translate, y.scale, y.originPoint);
}
var TREE_SCALE_SNAP_MIN = 0.999999999999,
  TREE_SCALE_SNAP_MAX = 1.0000000000001;
function applyTreeDeltas(box, treeScale, treePath, isSharedTransition = !1) {
  let treeLength = treePath.length;
  if (!treeLength) return;
  treeScale.x = treeScale.y = 1;
  let node, delta;
  for (let i = 0; i < treeLength; i++) {
    (node = treePath[i]), (delta = node.projectionDelta);
    let { visualElement } = node.options;
    (visualElement &&
      visualElement.props.style &&
      visualElement.props.style.display === 'contents') ||
      (isSharedTransition &&
        node.options.layoutScroll &&
        node.scroll &&
        node !== node.root &&
        transformBox(box, {
          x: -node.scroll.offset.x,
          y: -node.scroll.offset.y,
        }),
      delta &&
        ((treeScale.x *= delta.x.scale), (treeScale.y *= delta.y.scale), applyBoxDelta(box, delta)),
      isSharedTransition &&
        hasTransform(node.latestValues) &&
        transformBox(box, node.latestValues));
  }
  treeScale.x < TREE_SCALE_SNAP_MAX && treeScale.x > TREE_SCALE_SNAP_MIN && (treeScale.x = 1),
    treeScale.y < TREE_SCALE_SNAP_MAX && treeScale.y > TREE_SCALE_SNAP_MIN && (treeScale.y = 1);
}
function translateAxis(axis, distance2) {
  (axis.min = axis.min + distance2), (axis.max = axis.max + distance2);
}
function transformAxis(axis, axisTranslate, axisScale, boxScale, axisOrigin = 0.5) {
  let originPoint = mixNumber(axis.min, axis.max, axisOrigin);
  applyAxisDelta(axis, axisTranslate, axisScale, originPoint, boxScale);
}
function transformBox(box, transform2) {
  transformAxis(box.x, transform2.x, transform2.scaleX, transform2.scale, transform2.originX),
    transformAxis(box.y, transform2.y, transform2.scaleY, transform2.scale, transform2.originY);
}

// node_modules/framer-motion/dist/es/projection/utils/measure.mjs
function measureViewportBox(instance, transformPoint2) {
  return convertBoundingBoxToBox(
    transformBoxPoints(instance.getBoundingClientRect(), transformPoint2)
  );
}
function measurePageBox(element, rootProjectionNode2, transformPagePoint) {
  let viewportBox = measureViewportBox(element, transformPagePoint),
    { scroll } = rootProjectionNode2;
  return (
    scroll &&
      (translateAxis(viewportBox.x, scroll.offset.x),
      translateAxis(viewportBox.y, scroll.offset.y)),
    viewportBox
  );
}

// node_modules/framer-motion/dist/es/utils/get-context-window.mjs
var getContextWindow = ({ current }) => (current ? current.ownerDocument.defaultView : null);

// node_modules/framer-motion/dist/es/gestures/drag/VisualElementDragControls.mjs
var elementDragControls = /* @__PURE__ */ new WeakMap(),
  VisualElementDragControls = class {
    constructor(visualElement) {
      (this.openDragLock = null),
        (this.isDragging = !1),
        (this.currentDirection = null),
        (this.originPoint = { x: 0, y: 0 }),
        (this.constraints = !1),
        (this.hasMutatedConstraints = !1),
        (this.elastic = createBox()),
        (this.visualElement = visualElement);
    }
    start(originEvent, { snapToCursor = !1 } = {}) {
      let { presenceContext } = this.visualElement;
      if (presenceContext && presenceContext.isPresent === !1) return;
      let onSessionStart = event => {
          let { dragSnapToOrigin: dragSnapToOrigin2 } = this.getProps();
          dragSnapToOrigin2 ? this.pauseAnimation() : this.stopAnimation(),
            snapToCursor && this.snapToCursor(extractEventInfo(event).point);
        },
        onStart = (event, info) => {
          let { drag: drag2, dragPropagation, onDragStart } = this.getProps();
          if (
            drag2 &&
            !dragPropagation &&
            (this.openDragLock && this.openDragLock(),
            (this.openDragLock = setDragLock(drag2)),
            !this.openDragLock)
          )
            return;
          (this.isDragging = !0),
            (this.currentDirection = null),
            this.resolveConstraints(),
            this.visualElement.projection &&
              ((this.visualElement.projection.isAnimationBlocked = !0),
              (this.visualElement.projection.target = void 0)),
            eachAxis(axis => {
              let current = this.getAxisMotionValue(axis).get() || 0;
              if (percent.test(current)) {
                let { projection } = this.visualElement;
                if (projection && projection.layout) {
                  let measuredAxis = projection.layout.layoutBox[axis];
                  measuredAxis &&
                    (current = calcLength(measuredAxis) * (parseFloat(current) / 100));
                }
              }
              this.originPoint[axis] = current;
            }),
            onDragStart && frame.postRender(() => onDragStart(event, info)),
            addValueToWillChange(this.visualElement, 'transform');
          let { animationState } = this.visualElement;
          animationState && animationState.setActive('whileDrag', !0);
        },
        onMove = (event, info) => {
          let { dragPropagation, dragDirectionLock, onDirectionLock, onDrag } = this.getProps();
          if (!dragPropagation && !this.openDragLock) return;
          let { offset } = info;
          if (dragDirectionLock && this.currentDirection === null) {
            (this.currentDirection = getCurrentDirection(offset)),
              this.currentDirection !== null &&
                onDirectionLock &&
                onDirectionLock(this.currentDirection);
            return;
          }
          this.updateAxis('x', info.point, offset),
            this.updateAxis('y', info.point, offset),
            this.visualElement.render(),
            onDrag && onDrag(event, info);
        },
        onSessionEnd = (event, info) => this.stop(event, info),
        resumeAnimation = () =>
          eachAxis(axis => {
            var _a;
            return (
              this.getAnimationState(axis) === 'paused' &&
              ((_a = this.getAxisMotionValue(axis).animation) === null || _a === void 0
                ? void 0
                : _a.play())
            );
          }),
        { dragSnapToOrigin } = this.getProps();
      this.panSession = new PanSession(
        originEvent,
        {
          onSessionStart,
          onStart,
          onMove,
          onSessionEnd,
          resumeAnimation,
        },
        {
          transformPagePoint: this.visualElement.getTransformPagePoint(),
          dragSnapToOrigin,
          contextWindow: getContextWindow(this.visualElement),
        }
      );
    }
    stop(event, info) {
      let isDragging = this.isDragging;
      if ((this.cancel(), !isDragging)) return;
      let { velocity } = info;
      this.startAnimation(velocity);
      let { onDragEnd } = this.getProps();
      onDragEnd && frame.postRender(() => onDragEnd(event, info));
    }
    cancel() {
      this.isDragging = !1;
      let { projection, animationState } = this.visualElement;
      projection && (projection.isAnimationBlocked = !1),
        this.panSession && this.panSession.end(),
        (this.panSession = void 0);
      let { dragPropagation } = this.getProps();
      !dragPropagation && this.openDragLock && (this.openDragLock(), (this.openDragLock = null)),
        animationState && animationState.setActive('whileDrag', !1);
    }
    updateAxis(axis, _point, offset) {
      let { drag: drag2 } = this.getProps();
      if (!offset || !shouldDrag(axis, drag2, this.currentDirection)) return;
      let axisValue = this.getAxisMotionValue(axis),
        next = this.originPoint[axis] + offset[axis];
      this.constraints &&
        this.constraints[axis] &&
        (next = applyConstraints(next, this.constraints[axis], this.elastic[axis])),
        axisValue.set(next);
    }
    resolveConstraints() {
      var _a;
      let { dragConstraints, dragElastic } = this.getProps(),
        layout2 =
          this.visualElement.projection && !this.visualElement.projection.layout
            ? this.visualElement.projection.measure(!1)
            : (_a = this.visualElement.projection) === null || _a === void 0
              ? void 0
              : _a.layout,
        prevConstraints = this.constraints;
      dragConstraints && isRefObject(dragConstraints)
        ? this.constraints || (this.constraints = this.resolveRefConstraints())
        : dragConstraints && layout2
          ? (this.constraints = calcRelativeConstraints(layout2.layoutBox, dragConstraints))
          : (this.constraints = !1),
        (this.elastic = resolveDragElastic(dragElastic)),
        prevConstraints !== this.constraints &&
          layout2 &&
          this.constraints &&
          !this.hasMutatedConstraints &&
          eachAxis(axis => {
            this.constraints !== !1 &&
              this.getAxisMotionValue(axis) &&
              (this.constraints[axis] = rebaseAxisConstraints(
                layout2.layoutBox[axis],
                this.constraints[axis]
              ));
          });
    }
    resolveRefConstraints() {
      let { dragConstraints: constraints, onMeasureDragConstraints } = this.getProps();
      if (!constraints || !isRefObject(constraints)) return !1;
      let constraintsElement = constraints.current;
      invariant6(
        constraintsElement !== null,
        "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop."
      );
      let { projection } = this.visualElement;
      if (!projection || !projection.layout) return !1;
      let constraintsBox = measurePageBox(
          constraintsElement,
          projection.root,
          this.visualElement.getTransformPagePoint()
        ),
        measuredConstraints = calcViewportConstraints(projection.layout.layoutBox, constraintsBox);
      if (onMeasureDragConstraints) {
        let userConstraints = onMeasureDragConstraints(
          convertBoxToBoundingBox(measuredConstraints)
        );
        (this.hasMutatedConstraints = !!userConstraints),
          userConstraints && (measuredConstraints = convertBoundingBoxToBox(userConstraints));
      }
      return measuredConstraints;
    }
    startAnimation(velocity) {
      let {
          drag: drag2,
          dragMomentum,
          dragElastic,
          dragTransition,
          dragSnapToOrigin,
          onDragTransitionEnd,
        } = this.getProps(),
        constraints = this.constraints || {},
        momentumAnimations = eachAxis(axis => {
          if (!shouldDrag(axis, drag2, this.currentDirection)) return;
          let transition = (constraints && constraints[axis]) || {};
          dragSnapToOrigin && (transition = { min: 0, max: 0 });
          let bounceStiffness = dragElastic ? 200 : 1e6,
            bounceDamping = dragElastic ? 40 : 1e7,
            inertia2 = {
              type: 'inertia',
              velocity: dragMomentum ? velocity[axis] : 0,
              bounceStiffness,
              bounceDamping,
              timeConstant: 750,
              restDelta: 1,
              restSpeed: 10,
              ...dragTransition,
              ...transition,
            };
          return this.startAxisValueAnimation(axis, inertia2);
        });
      return Promise.all(momentumAnimations).then(onDragTransitionEnd);
    }
    startAxisValueAnimation(axis, transition) {
      let axisValue = this.getAxisMotionValue(axis);
      return (
        addValueToWillChange(this.visualElement, axis),
        axisValue.start(animateMotionValue(axis, axisValue, 0, transition, this.visualElement, !1))
      );
    }
    stopAnimation() {
      eachAxis(axis => this.getAxisMotionValue(axis).stop());
    }
    pauseAnimation() {
      eachAxis(axis => {
        var _a;
        return (_a = this.getAxisMotionValue(axis).animation) === null || _a === void 0
          ? void 0
          : _a.pause();
      });
    }
    getAnimationState(axis) {
      var _a;
      return (_a = this.getAxisMotionValue(axis).animation) === null || _a === void 0
        ? void 0
        : _a.state;
    }
    /**
     * Drag works differently depending on which props are provided.
     *
     * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
     * - Otherwise, we apply the delta to the x/y motion values.
     */
    getAxisMotionValue(axis) {
      let dragKey = `_drag${axis.toUpperCase()}`,
        props = this.visualElement.getProps(),
        externalMotionValue = props[dragKey];
      return (
        externalMotionValue ||
        this.visualElement.getValue(axis, (props.initial ? props.initial[axis] : void 0) || 0)
      );
    }
    snapToCursor(point) {
      eachAxis(axis => {
        let { drag: drag2 } = this.getProps();
        if (!shouldDrag(axis, drag2, this.currentDirection)) return;
        let { projection } = this.visualElement,
          axisValue = this.getAxisMotionValue(axis);
        if (projection && projection.layout) {
          let { min, max } = projection.layout.layoutBox[axis];
          axisValue.set(point[axis] - mixNumber(min, max, 0.5));
        }
      });
    }
    /**
     * When the viewport resizes we want to check if the measured constraints
     * have changed and, if so, reposition the element within those new constraints
     * relative to where it was before the resize.
     */
    scalePositionWithinConstraints() {
      if (!this.visualElement.current) return;
      let { drag: drag2, dragConstraints } = this.getProps(),
        { projection } = this.visualElement;
      if (!isRefObject(dragConstraints) || !projection || !this.constraints) return;
      this.stopAnimation();
      let boxProgress = { x: 0, y: 0 };
      eachAxis(axis => {
        let axisValue = this.getAxisMotionValue(axis);
        if (axisValue && this.constraints !== !1) {
          let latest = axisValue.get();
          boxProgress[axis] = calcOrigin2({ min: latest, max: latest }, this.constraints[axis]);
        }
      });
      let { transformTemplate } = this.visualElement.getProps();
      (this.visualElement.current.style.transform = transformTemplate
        ? transformTemplate({}, '')
        : 'none'),
        projection.root && projection.root.updateScroll(),
        projection.updateLayout(),
        this.resolveConstraints(),
        eachAxis(axis => {
          if (!shouldDrag(axis, drag2, null)) return;
          let axisValue = this.getAxisMotionValue(axis),
            { min, max } = this.constraints[axis];
          axisValue.set(mixNumber(min, max, boxProgress[axis]));
        });
    }
    addListeners() {
      if (!this.visualElement.current) return;
      elementDragControls.set(this.visualElement, this);
      let element = this.visualElement.current,
        stopPointerListener = addPointerEvent(element, 'pointerdown', event => {
          let { drag: drag2, dragListener = !0 } = this.getProps();
          drag2 && dragListener && this.start(event);
        }),
        measureDragConstraints = () => {
          let { dragConstraints } = this.getProps();
          isRefObject(dragConstraints) &&
            dragConstraints.current &&
            (this.constraints = this.resolveRefConstraints());
        },
        { projection } = this.visualElement,
        stopMeasureLayoutListener = projection.addEventListener('measure', measureDragConstraints);
      projection &&
        !projection.layout &&
        (projection.root && projection.root.updateScroll(), projection.updateLayout()),
        frame.read(measureDragConstraints);
      let stopResizeListener = addDomEvent(window, 'resize', () =>
          this.scalePositionWithinConstraints()
        ),
        stopLayoutUpdateListener = projection.addEventListener(
          'didUpdate',
          ({ delta, hasLayoutChanged }) => {
            this.isDragging &&
              hasLayoutChanged &&
              (eachAxis(axis => {
                let motionValue2 = this.getAxisMotionValue(axis);
                motionValue2 &&
                  ((this.originPoint[axis] += delta[axis].translate),
                  motionValue2.set(motionValue2.get() + delta[axis].translate));
              }),
              this.visualElement.render());
          }
        );
      return () => {
        stopResizeListener(),
          stopPointerListener(),
          stopMeasureLayoutListener(),
          stopLayoutUpdateListener && stopLayoutUpdateListener();
      };
    }
    getProps() {
      let props = this.visualElement.getProps(),
        {
          drag: drag2 = !1,
          dragDirectionLock = !1,
          dragPropagation = !1,
          dragConstraints = !1,
          dragElastic = defaultElastic,
          dragMomentum = !0,
        } = props;
      return {
        ...props,
        drag: drag2,
        dragDirectionLock,
        dragPropagation,
        dragConstraints,
        dragElastic,
        dragMomentum,
      };
    }
  };
function shouldDrag(direction, drag2, currentDirection) {
  return (
    (drag2 === !0 || drag2 === direction) &&
    (currentDirection === null || currentDirection === direction)
  );
}
function getCurrentDirection(offset, lockThreshold = 10) {
  let direction = null;
  return (
    Math.abs(offset.y) > lockThreshold
      ? (direction = 'y')
      : Math.abs(offset.x) > lockThreshold && (direction = 'x'),
    direction
  );
}

// node_modules/framer-motion/dist/es/gestures/drag/index.mjs
var DragGesture = class extends Feature {
  constructor(node) {
    super(node),
      (this.removeGroupControls = noop6),
      (this.removeListeners = noop6),
      (this.controls = new VisualElementDragControls(node));
  }
  mount() {
    let { dragControls } = this.node.getProps();
    dragControls && (this.removeGroupControls = dragControls.subscribe(this.controls)),
      (this.removeListeners = this.controls.addListeners() || noop6);
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners();
  }
};

// node_modules/framer-motion/dist/es/gestures/pan/index.mjs
import { noop as noop7 } from 'motion-utils';
var asyncHandler = handler => (event, info) => {
    handler && frame.postRender(() => handler(event, info));
  },
  PanGesture = class extends Feature {
    constructor() {
      super(...arguments), (this.removePointerDownListener = noop7);
    }
    onPointerDown(pointerDownEvent) {
      this.session = new PanSession(pointerDownEvent, this.createPanHandlers(), {
        transformPagePoint: this.node.getTransformPagePoint(),
        contextWindow: getContextWindow(this.node),
      });
    }
    createPanHandlers() {
      let { onPanSessionStart, onPanStart, onPan, onPanEnd } = this.node.getProps();
      return {
        onSessionStart: asyncHandler(onPanSessionStart),
        onStart: asyncHandler(onPanStart),
        onMove: onPan,
        onEnd: (event, info) => {
          delete this.session, onPanEnd && frame.postRender(() => onPanEnd(event, info));
        },
      };
    }
    mount() {
      this.removePointerDownListener = addPointerEvent(this.node.current, 'pointerdown', event =>
        this.onPointerDown(event)
      );
    }
    update() {
      this.session && this.session.updateHandlers(this.createPanHandlers());
    }
    unmount() {
      this.removePointerDownListener(), this.session && this.session.end();
    }
  };

// node_modules/framer-motion/dist/es/motion/features/layout/MeasureLayout.mjs
import { jsx as jsx19 } from 'react/jsx-runtime';
import { useContext as useContext10, Component as Component2 } from 'react';

// node_modules/framer-motion/dist/es/projection/node/state.mjs
var globalProjectionState = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: !0,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: !1,
};

// node_modules/framer-motion/dist/es/projection/styles/scale-border-radius.mjs
function pixelsToPercent(pixels, axis) {
  return axis.max === axis.min ? 0 : (pixels / (axis.max - axis.min)) * 100;
}
var correctBorderRadius = {
  correct: (latest, node) => {
    if (!node.target) return latest;
    if (typeof latest == 'string')
      if (px.test(latest)) latest = parseFloat(latest);
      else return latest;
    let x = pixelsToPercent(latest, node.target.x),
      y = pixelsToPercent(latest, node.target.y);
    return `${x}% ${y}%`;
  },
};

// node_modules/framer-motion/dist/es/projection/styles/scale-box-shadow.mjs
var correctBoxShadow = {
  correct: (latest, { treeScale, projectionDelta }) => {
    let original = latest,
      shadow = complex.parse(latest);
    if (shadow.length > 5) return original;
    let template = complex.createTransformer(latest),
      offset = typeof shadow[0] != 'number' ? 1 : 0,
      xScale = projectionDelta.x.scale * treeScale.x,
      yScale = projectionDelta.y.scale * treeScale.y;
    (shadow[0 + offset] /= xScale), (shadow[1 + offset] /= yScale);
    let averageScale = mixNumber(xScale, yScale, 0.5);
    return (
      typeof shadow[2 + offset] == 'number' && (shadow[2 + offset] /= averageScale),
      typeof shadow[3 + offset] == 'number' && (shadow[3 + offset] /= averageScale),
      template(shadow)
    );
  },
};

// node_modules/framer-motion/dist/es/motion/features/layout/MeasureLayout.mjs
var MeasureLayoutWithContext = class extends Component2 {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    let { visualElement, layoutGroup, switchLayoutGroup, layoutId } = this.props,
      { projection } = visualElement;
    addScaleCorrector(defaultScaleCorrectors),
      projection &&
        (layoutGroup.group && layoutGroup.group.add(projection),
        switchLayoutGroup &&
          switchLayoutGroup.register &&
          layoutId &&
          switchLayoutGroup.register(projection),
        projection.root.didUpdate(),
        projection.addEventListener('animationComplete', () => {
          this.safeToRemove();
        }),
        projection.setOptions({
          ...projection.options,
          onExitComplete: () => this.safeToRemove(),
        })),
      (globalProjectionState.hasEverUpdated = !0);
  }
  getSnapshotBeforeUpdate(prevProps) {
    let { layoutDependency, visualElement, drag: drag2, isPresent } = this.props,
      projection = visualElement.projection;
    return (
      projection &&
        ((projection.isPresent = isPresent),
        drag2 || prevProps.layoutDependency !== layoutDependency || layoutDependency === void 0
          ? projection.willUpdate()
          : this.safeToRemove(),
        prevProps.isPresent !== isPresent &&
          (isPresent
            ? projection.promote()
            : projection.relegate() ||
              frame.postRender(() => {
                let stack = projection.getStack();
                (!stack || !stack.members.length) && this.safeToRemove();
              }))),
      null
    );
  }
  componentDidUpdate() {
    let { projection } = this.props.visualElement;
    projection &&
      (projection.root.didUpdate(),
      microtask.postRender(() => {
        !projection.currentAnimation && projection.isLead() && this.safeToRemove();
      }));
  }
  componentWillUnmount() {
    let { visualElement, layoutGroup, switchLayoutGroup: promoteContext } = this.props,
      { projection } = visualElement;
    projection &&
      (projection.scheduleCheckAfterUnmount(),
      layoutGroup && layoutGroup.group && layoutGroup.group.remove(projection),
      promoteContext && promoteContext.deregister && promoteContext.deregister(projection));
  }
  safeToRemove() {
    let { safeToRemove } = this.props;
    safeToRemove && safeToRemove();
  }
  render() {
    return null;
  }
};
function MeasureLayout(props) {
  let [isPresent, safeToRemove] = usePresence(),
    layoutGroup = useContext10(LayoutGroupContext);
  return jsx19(MeasureLayoutWithContext, {
    ...props,
    layoutGroup,
    switchLayoutGroup: useContext10(SwitchLayoutGroupContext),
    isPresent,
    safeToRemove,
  });
}
var defaultScaleCorrectors = {
  borderRadius: {
    ...correctBorderRadius,
    applyTo: [
      'borderTopLeftRadius',
      'borderTopRightRadius',
      'borderBottomLeftRadius',
      'borderBottomRightRadius',
    ],
  },
  borderTopLeftRadius: correctBorderRadius,
  borderTopRightRadius: correctBorderRadius,
  borderBottomLeftRadius: correctBorderRadius,
  borderBottomRightRadius: correctBorderRadius,
  boxShadow: correctBoxShadow,
};

// node_modules/framer-motion/dist/es/projection/node/create-projection-node.mjs
import { getValueTransition as getValueTransition3 } from 'motion-dom';
import { noop as noop9 } from 'motion-utils';

// node_modules/framer-motion/dist/es/animation/animate/single-value.mjs
function animateSingleValue(value, keyframes2, options) {
  let motionValue$1 = isMotionValue(value) ? value : motionValue(value);
  return (
    motionValue$1.start(animateMotionValue('', motionValue$1, keyframes2, options)),
    motionValue$1.animation
  );
}

// node_modules/framer-motion/dist/es/render/dom/utils/is-svg-element.mjs
function isSVGElement(element) {
  return element instanceof SVGElement && element.tagName !== 'svg';
}

// node_modules/framer-motion/dist/es/render/utils/compare-by-depth.mjs
var compareByDepth = (a, b) => a.depth - b.depth;

// node_modules/framer-motion/dist/es/render/utils/flat-tree.mjs
var FlatTree = class {
  constructor() {
    (this.children = []), (this.isDirty = !1);
  }
  add(child) {
    addUniqueItem(this.children, child), (this.isDirty = !0);
  }
  remove(child) {
    removeItem(this.children, child), (this.isDirty = !0);
  }
  forEach(callback) {
    this.isDirty && this.children.sort(compareByDepth),
      (this.isDirty = !1),
      this.children.forEach(callback);
  }
};

// node_modules/framer-motion/dist/es/utils/delay.mjs
import { secondsToMilliseconds as secondsToMilliseconds7 } from 'motion-utils';
function delay(callback, timeout) {
  let start = time.now(),
    checkElapsed = ({ timestamp }) => {
      let elapsed = timestamp - start;
      elapsed >= timeout && (cancelFrame(checkElapsed), callback(elapsed - timeout));
    };
  return frame.read(checkElapsed, !0), () => cancelFrame(checkElapsed);
}

// node_modules/framer-motion/dist/es/projection/animation/mix-values.mjs
import { progress as progress4, noop as noop8 } from 'motion-utils';
var borders = ['TopLeft', 'TopRight', 'BottomLeft', 'BottomRight'],
  numBorders = borders.length,
  asNumber = value => (typeof value == 'string' ? parseFloat(value) : value),
  isPx = value => typeof value == 'number' || px.test(value);
function mixValues(target, follow, lead, progress6, shouldCrossfadeOpacity, isOnlyMember) {
  shouldCrossfadeOpacity
    ? ((target.opacity = mixNumber(
        0,
        // TODO Reinstate this if only child
        lead.opacity !== void 0 ? lead.opacity : 1,
        easeCrossfadeIn(progress6)
      )),
      (target.opacityExit = mixNumber(
        follow.opacity !== void 0 ? follow.opacity : 1,
        0,
        easeCrossfadeOut(progress6)
      )))
    : isOnlyMember &&
      (target.opacity = mixNumber(
        follow.opacity !== void 0 ? follow.opacity : 1,
        lead.opacity !== void 0 ? lead.opacity : 1,
        progress6
      ));
  for (let i = 0; i < numBorders; i++) {
    let borderLabel = `border${borders[i]}Radius`,
      followRadius = getRadius(follow, borderLabel),
      leadRadius = getRadius(lead, borderLabel);
    if (followRadius === void 0 && leadRadius === void 0) continue;
    followRadius || (followRadius = 0),
      leadRadius || (leadRadius = 0),
      followRadius === 0 || leadRadius === 0 || isPx(followRadius) === isPx(leadRadius)
        ? ((target[borderLabel] = Math.max(
            mixNumber(asNumber(followRadius), asNumber(leadRadius), progress6),
            0
          )),
          (percent.test(leadRadius) || percent.test(followRadius)) && (target[borderLabel] += '%'))
        : (target[borderLabel] = leadRadius);
  }
  (follow.rotate || lead.rotate) &&
    (target.rotate = mixNumber(follow.rotate || 0, lead.rotate || 0, progress6));
}
function getRadius(values, radiusName) {
  return values[radiusName] !== void 0 ? values[radiusName] : values.borderRadius;
}
var easeCrossfadeIn = /* @__PURE__ */ compress(0, 0.5, circOut),
  easeCrossfadeOut = /* @__PURE__ */ compress(0.5, 0.95, noop8);
function compress(min, max, easing) {
  return p => (p < min ? 0 : p > max ? 1 : easing(progress4(min, max, p)));
}

// node_modules/framer-motion/dist/es/projection/geometry/copy.mjs
function copyAxisInto(axis, originAxis) {
  (axis.min = originAxis.min), (axis.max = originAxis.max);
}
function copyBoxInto(box, originBox) {
  copyAxisInto(box.x, originBox.x), copyAxisInto(box.y, originBox.y);
}
function copyAxisDeltaInto(delta, originDelta) {
  (delta.translate = originDelta.translate),
    (delta.scale = originDelta.scale),
    (delta.originPoint = originDelta.originPoint),
    (delta.origin = originDelta.origin);
}

// node_modules/framer-motion/dist/es/projection/geometry/delta-remove.mjs
function removePointDelta(point, translate, scale2, originPoint, boxScale) {
  return (
    (point -= translate),
    (point = scalePoint(point, 1 / scale2, originPoint)),
    boxScale !== void 0 && (point = scalePoint(point, 1 / boxScale, originPoint)),
    point
  );
}
function removeAxisDelta(
  axis,
  translate = 0,
  scale2 = 1,
  origin = 0.5,
  boxScale,
  originAxis = axis,
  sourceAxis = axis
) {
  if (
    (percent.test(translate) &&
      ((translate = parseFloat(translate)),
      (translate = mixNumber(sourceAxis.min, sourceAxis.max, translate / 100) - sourceAxis.min)),
    typeof translate != 'number')
  )
    return;
  let originPoint = mixNumber(originAxis.min, originAxis.max, origin);
  axis === originAxis && (originPoint -= translate),
    (axis.min = removePointDelta(axis.min, translate, scale2, originPoint, boxScale)),
    (axis.max = removePointDelta(axis.max, translate, scale2, originPoint, boxScale));
}
function removeAxisTransforms(axis, transforms, [key, scaleKey, originKey], origin, sourceAxis) {
  removeAxisDelta(
    axis,
    transforms[key],
    transforms[scaleKey],
    transforms[originKey],
    transforms.scale,
    origin,
    sourceAxis
  );
}
var xKeys = ['x', 'scaleX', 'originX'],
  yKeys = ['y', 'scaleY', 'originY'];
function removeBoxTransforms(box, transforms, originBox, sourceBox) {
  removeAxisTransforms(
    box.x,
    transforms,
    xKeys,
    originBox ? originBox.x : void 0,
    sourceBox ? sourceBox.x : void 0
  ),
    removeAxisTransforms(
      box.y,
      transforms,
      yKeys,
      originBox ? originBox.y : void 0,
      sourceBox ? sourceBox.y : void 0
    );
}

// node_modules/framer-motion/dist/es/projection/geometry/utils.mjs
function isAxisDeltaZero(delta) {
  return delta.translate === 0 && delta.scale === 1;
}
function isDeltaZero(delta) {
  return isAxisDeltaZero(delta.x) && isAxisDeltaZero(delta.y);
}
function axisEquals(a, b) {
  return a.min === b.min && a.max === b.max;
}
function boxEquals(a, b) {
  return axisEquals(a.x, b.x) && axisEquals(a.y, b.y);
}
function axisEqualsRounded(a, b) {
  return Math.round(a.min) === Math.round(b.min) && Math.round(a.max) === Math.round(b.max);
}
function boxEqualsRounded(a, b) {
  return axisEqualsRounded(a.x, b.x) && axisEqualsRounded(a.y, b.y);
}
function aspectRatio(box) {
  return calcLength(box.x) / calcLength(box.y);
}
function axisDeltaEquals(a, b) {
  return a.translate === b.translate && a.scale === b.scale && a.originPoint === b.originPoint;
}

// node_modules/framer-motion/dist/es/projection/shared/stack.mjs
var NodeStack = class {
  constructor() {
    this.members = [];
  }
  add(node) {
    addUniqueItem(this.members, node), node.scheduleRender();
  }
  remove(node) {
    if (
      (removeItem(this.members, node),
      node === this.prevLead && (this.prevLead = void 0),
      node === this.lead)
    ) {
      let prevLead = this.members[this.members.length - 1];
      prevLead && this.promote(prevLead);
    }
  }
  relegate(node) {
    let indexOfNode = this.members.findIndex(member => node === member);
    if (indexOfNode === 0) return !1;
    let prevLead;
    for (let i = indexOfNode; i >= 0; i--) {
      let member = this.members[i];
      if (member.isPresent !== !1) {
        prevLead = member;
        break;
      }
    }
    return prevLead ? (this.promote(prevLead), !0) : !1;
  }
  promote(node, preserveFollowOpacity) {
    let prevLead = this.lead;
    if (
      node !== prevLead &&
      ((this.prevLead = prevLead), (this.lead = node), node.show(), prevLead)
    ) {
      prevLead.instance && prevLead.scheduleRender(),
        node.scheduleRender(),
        (node.resumeFrom = prevLead),
        preserveFollowOpacity && (node.resumeFrom.preserveOpacity = !0),
        prevLead.snapshot &&
          ((node.snapshot = prevLead.snapshot),
          (node.snapshot.latestValues = prevLead.animationValues || prevLead.latestValues)),
        node.root && node.root.isUpdating && (node.isLayoutDirty = !0);
      let { crossfade } = node.options;
      crossfade === !1 && prevLead.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach(node => {
      let { options, resumingFrom } = node;
      options.onExitComplete && options.onExitComplete(),
        resumingFrom &&
          resumingFrom.options.onExitComplete &&
          resumingFrom.options.onExitComplete();
    });
  }
  scheduleRender() {
    this.members.forEach(node => {
      node.instance && node.scheduleRender(!1);
    });
  }
  /**
   * Clear any leads that have been removed this render to prevent them from being
   * used in future animations and to prevent memory leaks
   */
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
};

// node_modules/framer-motion/dist/es/projection/styles/transform.mjs
function buildProjectionTransform(delta, treeScale, latestTransform) {
  let transform2 = '',
    xTranslate = delta.x.translate / treeScale.x,
    yTranslate = delta.y.translate / treeScale.y,
    zTranslate = latestTransform?.z || 0;
  if (
    ((xTranslate || yTranslate || zTranslate) &&
      (transform2 = `translate3d(${xTranslate}px, ${yTranslate}px, ${zTranslate}px) `),
    (treeScale.x !== 1 || treeScale.y !== 1) &&
      (transform2 += `scale(${1 / treeScale.x}, ${1 / treeScale.y}) `),
    latestTransform)
  ) {
    let { transformPerspective, rotate, rotateX, rotateY, skewX, skewY } = latestTransform;
    transformPerspective && (transform2 = `perspective(${transformPerspective}px) ${transform2}`),
      rotate && (transform2 += `rotate(${rotate}deg) `),
      rotateX && (transform2 += `rotateX(${rotateX}deg) `),
      rotateY && (transform2 += `rotateY(${rotateY}deg) `),
      skewX && (transform2 += `skewX(${skewX}deg) `),
      skewY && (transform2 += `skewY(${skewY}deg) `);
  }
  let elementScaleX = delta.x.scale * treeScale.x,
    elementScaleY = delta.y.scale * treeScale.y;
  return (
    (elementScaleX !== 1 || elementScaleY !== 1) &&
      (transform2 += `scale(${elementScaleX}, ${elementScaleY})`),
    transform2 || 'none'
  );
}

// node_modules/framer-motion/dist/es/projection/node/create-projection-node.mjs
var metrics = {
    type: 'projectionFrame',
    totalNodes: 0,
    resolvedTargetDeltas: 0,
    recalculatedProjection: 0,
  },
  isDebug = typeof window < 'u' && window.MotionDebug !== void 0,
  transformAxes = ['', 'X', 'Y', 'Z'],
  hiddenVisibility = { visibility: 'hidden' },
  animationTarget = 1e3,
  id2 = 0;
function resetDistortingTransform(key, visualElement, values, sharedAnimationValues) {
  let { latestValues } = visualElement;
  latestValues[key] &&
    ((values[key] = latestValues[key]),
    visualElement.setStaticValue(key, 0),
    sharedAnimationValues && (sharedAnimationValues[key] = 0));
}
function cancelTreeOptimisedTransformAnimations(projectionNode) {
  if (((projectionNode.hasCheckedOptimisedAppear = !0), projectionNode.root === projectionNode))
    return;
  let { visualElement } = projectionNode.options;
  if (!visualElement) return;
  let appearId = getOptimisedAppearId(visualElement);
  if (window.MotionHasOptimisedAnimation(appearId, 'transform')) {
    let { layout: layout2, layoutId } = projectionNode.options;
    window.MotionCancelOptimisedAnimation(appearId, 'transform', frame, !(layout2 || layoutId));
  }
  let { parent } = projectionNode;
  parent && !parent.hasCheckedOptimisedAppear && cancelTreeOptimisedTransformAnimations(parent);
}
function createProjectionNode2({
  attachResizeListener,
  defaultParent,
  measureScroll,
  checkIsScrollRoot,
  resetTransform,
}) {
  return class {
    constructor(latestValues = {}, parent = defaultParent?.()) {
      (this.id = id2++),
        (this.animationId = 0),
        (this.children = /* @__PURE__ */ new Set()),
        (this.options = {}),
        (this.isTreeAnimating = !1),
        (this.isAnimationBlocked = !1),
        (this.isLayoutDirty = !1),
        (this.isProjectionDirty = !1),
        (this.isSharedProjectionDirty = !1),
        (this.isTransformDirty = !1),
        (this.updateManuallyBlocked = !1),
        (this.updateBlockedByResize = !1),
        (this.isUpdating = !1),
        (this.isSVG = !1),
        (this.needsReset = !1),
        (this.shouldResetTransform = !1),
        (this.hasCheckedOptimisedAppear = !1),
        (this.treeScale = { x: 1, y: 1 }),
        (this.eventHandlers = /* @__PURE__ */ new Map()),
        (this.hasTreeAnimated = !1),
        (this.updateScheduled = !1),
        (this.scheduleUpdate = () => this.update()),
        (this.projectionUpdateScheduled = !1),
        (this.checkUpdateFailed = () => {
          this.isUpdating && ((this.isUpdating = !1), this.clearAllSnapshots());
        }),
        (this.updateProjection = () => {
          (this.projectionUpdateScheduled = !1),
            isDebug &&
              (metrics.totalNodes =
                metrics.resolvedTargetDeltas =
                metrics.recalculatedProjection =
                  0),
            this.nodes.forEach(propagateDirtyNodes),
            this.nodes.forEach(resolveTargetDelta),
            this.nodes.forEach(calcProjection),
            this.nodes.forEach(cleanDirtyNodes),
            isDebug && window.MotionDebug.record(metrics);
        }),
        (this.resolvedRelativeTargetAt = 0),
        (this.hasProjected = !1),
        (this.isVisible = !0),
        (this.animationProgress = 0),
        (this.sharedNodes = /* @__PURE__ */ new Map()),
        (this.latestValues = latestValues),
        (this.root = parent ? parent.root || parent : this),
        (this.path = parent ? [...parent.path, parent] : []),
        (this.parent = parent),
        (this.depth = parent ? parent.depth + 1 : 0);
      for (let i = 0; i < this.path.length; i++) this.path[i].shouldResetTransform = !0;
      this.root === this && (this.nodes = new FlatTree());
    }
    addEventListener(name, handler) {
      return (
        this.eventHandlers.has(name) || this.eventHandlers.set(name, new SubscriptionManager()),
        this.eventHandlers.get(name).add(handler)
      );
    }
    notifyListeners(name, ...args) {
      let subscriptionManager = this.eventHandlers.get(name);
      subscriptionManager && subscriptionManager.notify(...args);
    }
    hasListeners(name) {
      return this.eventHandlers.has(name);
    }
    /**
     * Lifecycles
     */
    mount(instance, isLayoutDirty = this.root.hasTreeAnimated) {
      if (this.instance) return;
      (this.isSVG = isSVGElement(instance)), (this.instance = instance);
      let { layoutId, layout: layout2, visualElement } = this.options;
      if (
        (visualElement && !visualElement.current && visualElement.mount(instance),
        this.root.nodes.add(this),
        this.parent && this.parent.children.add(this),
        isLayoutDirty && (layout2 || layoutId) && (this.isLayoutDirty = !0),
        attachResizeListener)
      ) {
        let cancelDelay,
          resizeUnblockUpdate = () => (this.root.updateBlockedByResize = !1);
        attachResizeListener(instance, () => {
          (this.root.updateBlockedByResize = !0),
            cancelDelay && cancelDelay(),
            (cancelDelay = delay(resizeUnblockUpdate, 250)),
            globalProjectionState.hasAnimatedSinceResize &&
              ((globalProjectionState.hasAnimatedSinceResize = !1),
              this.nodes.forEach(finishAnimation));
        });
      }
      layoutId && this.root.registerSharedNode(layoutId, this),
        this.options.animate !== !1 &&
          visualElement &&
          (layoutId || layout2) &&
          this.addEventListener(
            'didUpdate',
            ({ delta, hasLayoutChanged, hasRelativeTargetChanged, layout: newLayout }) => {
              if (this.isTreeAnimationBlocked()) {
                (this.target = void 0), (this.relativeTarget = void 0);
                return;
              }
              let layoutTransition =
                  this.options.transition ||
                  visualElement.getDefaultTransition() ||
                  defaultLayoutTransition,
                { onLayoutAnimationStart, onLayoutAnimationComplete } = visualElement.getProps(),
                targetChanged =
                  !this.targetLayout ||
                  !boxEqualsRounded(this.targetLayout, newLayout) ||
                  hasRelativeTargetChanged,
                hasOnlyRelativeTargetChanged = !hasLayoutChanged && hasRelativeTargetChanged;
              if (
                this.options.layoutRoot ||
                (this.resumeFrom && this.resumeFrom.instance) ||
                hasOnlyRelativeTargetChanged ||
                (hasLayoutChanged && (targetChanged || !this.currentAnimation))
              ) {
                this.resumeFrom &&
                  ((this.resumingFrom = this.resumeFrom),
                  (this.resumingFrom.resumingFrom = void 0)),
                  this.setAnimationOrigin(delta, hasOnlyRelativeTargetChanged);
                let animationOptions = {
                  ...getValueTransition3(layoutTransition, 'layout'),
                  onPlay: onLayoutAnimationStart,
                  onComplete: onLayoutAnimationComplete,
                };
                (visualElement.shouldReduceMotion || this.options.layoutRoot) &&
                  ((animationOptions.delay = 0), (animationOptions.type = !1)),
                  this.startAnimation(animationOptions);
              } else
                hasLayoutChanged || finishAnimation(this),
                  this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
              this.targetLayout = newLayout;
            }
          );
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      let stack = this.getStack();
      stack && stack.remove(this),
        this.parent && this.parent.children.delete(this),
        (this.instance = void 0),
        cancelFrame(this.updateProjection);
    }
    // only on the root
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || (this.parent && this.parent.isTreeAnimationBlocked()) || !1;
    }
    // Note: currently only running on root node
    startUpdate() {
      this.isUpdateBlocked() ||
        ((this.isUpdating = !0),
        this.nodes && this.nodes.forEach(resetSkewAndRotation),
        this.animationId++);
    }
    getTransformTemplate() {
      let { visualElement } = this.options;
      return visualElement && visualElement.getProps().transformTemplate;
    }
    willUpdate(shouldNotifyListeners = !0) {
      if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (
        (window.MotionCancelOptimisedAnimation &&
          !this.hasCheckedOptimisedAppear &&
          cancelTreeOptimisedTransformAnimations(this),
        !this.root.isUpdating && this.root.startUpdate(),
        this.isLayoutDirty)
      )
        return;
      this.isLayoutDirty = !0;
      for (let i = 0; i < this.path.length; i++) {
        let node = this.path[i];
        (node.shouldResetTransform = !0),
          node.updateScroll('snapshot'),
          node.options.layoutRoot && node.willUpdate(!1);
      }
      let { layoutId, layout: layout2 } = this.options;
      if (layoutId === void 0 && !layout2) return;
      let transformTemplate = this.getTransformTemplate();
      (this.prevTransformTemplateValue = transformTemplate
        ? transformTemplate(this.latestValues, '')
        : void 0),
        this.updateSnapshot(),
        shouldNotifyListeners && this.notifyListeners('willUpdate');
    }
    update() {
      if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
        this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(clearMeasurements);
        return;
      }
      this.isUpdating || this.nodes.forEach(clearIsLayoutDirty),
        (this.isUpdating = !1),
        this.nodes.forEach(resetTransformStyle),
        this.nodes.forEach(updateLayout),
        this.nodes.forEach(notifyLayoutUpdate),
        this.clearAllSnapshots();
      let now2 = time.now();
      (frameData.delta = clamp(0, 1e3 / 60, now2 - frameData.timestamp)),
        (frameData.timestamp = now2),
        (frameData.isProcessing = !0),
        frameSteps.update.process(frameData),
        frameSteps.preRender.process(frameData),
        frameSteps.render.process(frameData),
        (frameData.isProcessing = !1);
    }
    didUpdate() {
      this.updateScheduled || ((this.updateScheduled = !0), microtask.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(clearSnapshot), this.sharedNodes.forEach(removeLeadSnapshots);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled ||
        ((this.projectionUpdateScheduled = !0), frame.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      frame.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure());
    }
    updateLayout() {
      if (
        !this.instance ||
        (this.updateScroll(),
        !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty)
      )
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let i = 0; i < this.path.length; i++) this.path[i].updateScroll();
      let prevLayout = this.layout;
      (this.layout = this.measure(!1)),
        (this.layoutCorrected = createBox()),
        (this.isLayoutDirty = !1),
        (this.projectionDelta = void 0),
        this.notifyListeners('measure', this.layout.layoutBox);
      let { visualElement } = this.options;
      visualElement &&
        visualElement.notify(
          'LayoutMeasure',
          this.layout.layoutBox,
          prevLayout ? prevLayout.layoutBox : void 0
        );
    }
    updateScroll(phase = 'measure') {
      let needsMeasurement = Boolean(this.options.layoutScroll && this.instance);
      if (
        (this.scroll &&
          this.scroll.animationId === this.root.animationId &&
          this.scroll.phase === phase &&
          (needsMeasurement = !1),
        needsMeasurement)
      ) {
        let isRoot = checkIsScrollRoot(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase,
          isRoot,
          offset: measureScroll(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : isRoot,
        };
      }
    }
    resetTransform() {
      if (!resetTransform) return;
      let isResetRequested =
          this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout,
        hasProjection = this.projectionDelta && !isDeltaZero(this.projectionDelta),
        transformTemplate = this.getTransformTemplate(),
        transformTemplateValue = transformTemplate
          ? transformTemplate(this.latestValues, '')
          : void 0,
        transformTemplateHasChanged = transformTemplateValue !== this.prevTransformTemplateValue;
      isResetRequested &&
        (hasProjection || hasTransform(this.latestValues) || transformTemplateHasChanged) &&
        (resetTransform(this.instance, transformTemplateValue),
        (this.shouldResetTransform = !1),
        this.scheduleRender());
    }
    measure(removeTransform = !0) {
      let pageBox = this.measurePageBox(),
        layoutBox = this.removeElementScroll(pageBox);
      return (
        removeTransform && (layoutBox = this.removeTransform(layoutBox)),
        roundBox(layoutBox),
        {
          animationId: this.root.animationId,
          measuredBox: pageBox,
          layoutBox,
          latestValues: {},
          source: this.id,
        }
      );
    }
    measurePageBox() {
      var _a;
      let { visualElement } = this.options;
      if (!visualElement) return createBox();
      let box = visualElement.measureViewportBox();
      if (
        !(
          ((_a = this.scroll) === null || _a === void 0 ? void 0 : _a.wasRoot) ||
          this.path.some(checkNodeWasScrollRoot)
        )
      ) {
        let { scroll } = this.root;
        scroll && (translateAxis(box.x, scroll.offset.x), translateAxis(box.y, scroll.offset.y));
      }
      return box;
    }
    removeElementScroll(box) {
      var _a;
      let boxWithoutScroll = createBox();
      if (
        (copyBoxInto(boxWithoutScroll, box),
        !((_a = this.scroll) === null || _a === void 0) && _a.wasRoot)
      )
        return boxWithoutScroll;
      for (let i = 0; i < this.path.length; i++) {
        let node = this.path[i],
          { scroll, options } = node;
        node !== this.root &&
          scroll &&
          options.layoutScroll &&
          (scroll.wasRoot && copyBoxInto(boxWithoutScroll, box),
          translateAxis(boxWithoutScroll.x, scroll.offset.x),
          translateAxis(boxWithoutScroll.y, scroll.offset.y));
      }
      return boxWithoutScroll;
    }
    applyTransform(box, transformOnly = !1) {
      let withTransforms = createBox();
      copyBoxInto(withTransforms, box);
      for (let i = 0; i < this.path.length; i++) {
        let node = this.path[i];
        !transformOnly &&
          node.options.layoutScroll &&
          node.scroll &&
          node !== node.root &&
          transformBox(withTransforms, {
            x: -node.scroll.offset.x,
            y: -node.scroll.offset.y,
          }),
          hasTransform(node.latestValues) && transformBox(withTransforms, node.latestValues);
      }
      return (
        hasTransform(this.latestValues) && transformBox(withTransforms, this.latestValues),
        withTransforms
      );
    }
    removeTransform(box) {
      let boxWithoutTransform = createBox();
      copyBoxInto(boxWithoutTransform, box);
      for (let i = 0; i < this.path.length; i++) {
        let node = this.path[i];
        if (!node.instance || !hasTransform(node.latestValues)) continue;
        hasScale(node.latestValues) && node.updateSnapshot();
        let sourceBox = createBox(),
          nodeBox = node.measurePageBox();
        copyBoxInto(sourceBox, nodeBox),
          removeBoxTransforms(
            boxWithoutTransform,
            node.latestValues,
            node.snapshot ? node.snapshot.layoutBox : void 0,
            sourceBox
          );
      }
      return (
        hasTransform(this.latestValues) &&
          removeBoxTransforms(boxWithoutTransform, this.latestValues),
        boxWithoutTransform
      );
    }
    setTargetDelta(delta) {
      (this.targetDelta = delta),
        this.root.scheduleUpdateProjection(),
        (this.isProjectionDirty = !0);
    }
    setOptions(options) {
      this.options = {
        ...this.options,
        ...options,
        crossfade: options.crossfade !== void 0 ? options.crossfade : !0,
      };
    }
    clearMeasurements() {
      (this.scroll = void 0),
        (this.layout = void 0),
        (this.snapshot = void 0),
        (this.prevTransformTemplateValue = void 0),
        (this.targetDelta = void 0),
        (this.target = void 0),
        (this.isLayoutDirty = !1);
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent &&
        this.relativeParent.resolvedRelativeTargetAt !== frameData.timestamp &&
        this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(forceRecalculation = !1) {
      var _a;
      let lead = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = lead.isProjectionDirty),
        this.isTransformDirty || (this.isTransformDirty = lead.isTransformDirty),
        this.isSharedProjectionDirty ||
          (this.isSharedProjectionDirty = lead.isSharedProjectionDirty);
      let isShared = Boolean(this.resumingFrom) || this !== lead;
      if (
        !(
          forceRecalculation ||
          (isShared && this.isSharedProjectionDirty) ||
          this.isProjectionDirty ||
          (!((_a = this.parent) === null || _a === void 0) && _a.isProjectionDirty) ||
          this.attemptToResolveRelativeTarget ||
          this.root.updateBlockedByResize
        )
      )
        return;
      let { layout: layout2, layoutId } = this.options;
      if (!(!this.layout || !(layout2 || layoutId))) {
        if (
          ((this.resolvedRelativeTargetAt = frameData.timestamp),
          !this.targetDelta && !this.relativeTarget)
        ) {
          let relativeParent = this.getClosestProjectingParent();
          relativeParent && relativeParent.layout && this.animationProgress !== 1
            ? ((this.relativeParent = relativeParent),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = createBox()),
              (this.relativeTargetOrigin = createBox()),
              calcRelativePosition(
                this.relativeTargetOrigin,
                this.layout.layoutBox,
                relativeParent.layout.layoutBox
              ),
              copyBoxInto(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0);
        }
        if (!(!this.relativeTarget && !this.targetDelta)) {
          if (
            (this.target ||
              ((this.target = createBox()), (this.targetWithTransforms = createBox())),
            this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.relativeParent &&
            this.relativeParent.target
              ? (this.forceRelativeParentToResolveTarget(),
                calcRelativeBox(this.target, this.relativeTarget, this.relativeParent.target))
              : this.targetDelta
                ? (this.resumingFrom
                    ? (this.target = this.applyTransform(this.layout.layoutBox))
                    : copyBoxInto(this.target, this.layout.layoutBox),
                  applyBoxDelta(this.target, this.targetDelta))
                : copyBoxInto(this.target, this.layout.layoutBox),
            this.attemptToResolveRelativeTarget)
          ) {
            this.attemptToResolveRelativeTarget = !1;
            let relativeParent = this.getClosestProjectingParent();
            relativeParent &&
            Boolean(relativeParent.resumingFrom) === Boolean(this.resumingFrom) &&
            !relativeParent.options.layoutScroll &&
            relativeParent.target &&
            this.animationProgress !== 1
              ? ((this.relativeParent = relativeParent),
                this.forceRelativeParentToResolveTarget(),
                (this.relativeTarget = createBox()),
                (this.relativeTargetOrigin = createBox()),
                calcRelativePosition(this.relativeTargetOrigin, this.target, relativeParent.target),
                copyBoxInto(this.relativeTarget, this.relativeTargetOrigin))
              : (this.relativeParent = this.relativeTarget = void 0);
          }
          isDebug && metrics.resolvedTargetDeltas++;
        }
      }
    }
    getClosestProjectingParent() {
      if (
        !(
          !this.parent ||
          hasScale(this.parent.latestValues) ||
          has2DTranslate(this.parent.latestValues)
        )
      )
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return Boolean(
        (this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout
      );
    }
    calcProjection() {
      var _a;
      let lead = this.getLead(),
        isShared = Boolean(this.resumingFrom) || this !== lead,
        canSkip = !0;
      if (
        ((this.isProjectionDirty ||
          (!((_a = this.parent) === null || _a === void 0) && _a.isProjectionDirty)) &&
          (canSkip = !1),
        isShared && (this.isSharedProjectionDirty || this.isTransformDirty) && (canSkip = !1),
        this.resolvedRelativeTargetAt === frameData.timestamp && (canSkip = !1),
        canSkip)
      )
        return;
      let { layout: layout2, layoutId } = this.options;
      if (
        ((this.isTreeAnimating = Boolean(
          (this.parent && this.parent.isTreeAnimating) ||
            this.currentAnimation ||
            this.pendingAnimation
        )),
        this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0),
        !this.layout || !(layout2 || layoutId))
      )
        return;
      copyBoxInto(this.layoutCorrected, this.layout.layoutBox);
      let prevTreeScaleX = this.treeScale.x,
        prevTreeScaleY = this.treeScale.y;
      applyTreeDeltas(this.layoutCorrected, this.treeScale, this.path, isShared),
        lead.layout &&
          !lead.target &&
          (this.treeScale.x !== 1 || this.treeScale.y !== 1) &&
          ((lead.target = lead.layout.layoutBox), (lead.targetWithTransforms = createBox()));
      let { target } = lead;
      if (!target) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta
        ? this.createProjectionDeltas()
        : (copyAxisDeltaInto(this.prevProjectionDelta.x, this.projectionDelta.x),
          copyAxisDeltaInto(this.prevProjectionDelta.y, this.projectionDelta.y)),
        calcBoxDelta(this.projectionDelta, this.layoutCorrected, target, this.latestValues),
        (this.treeScale.x !== prevTreeScaleX ||
          this.treeScale.y !== prevTreeScaleY ||
          !axisDeltaEquals(this.projectionDelta.x, this.prevProjectionDelta.x) ||
          !axisDeltaEquals(this.projectionDelta.y, this.prevProjectionDelta.y)) &&
          ((this.hasProjected = !0),
          this.scheduleRender(),
          this.notifyListeners('projectionUpdate', target)),
        isDebug && metrics.recalculatedProjection++;
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(notifyAll = !0) {
      var _a;
      if (
        ((_a = this.options.visualElement) === null || _a === void 0 || _a.scheduleRender(),
        notifyAll)
      ) {
        let stack = this.getStack();
        stack && stack.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      (this.prevProjectionDelta = createDelta()),
        (this.projectionDelta = createDelta()),
        (this.projectionDeltaWithTransform = createDelta());
    }
    setAnimationOrigin(delta, hasOnlyRelativeTargetChanged = !1) {
      let snapshot = this.snapshot,
        snapshotLatestValues = snapshot ? snapshot.latestValues : {},
        mixedValues = { ...this.latestValues },
        targetDelta = createDelta();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) &&
        (this.relativeTarget = this.relativeTargetOrigin = void 0),
        (this.attemptToResolveRelativeTarget = !hasOnlyRelativeTargetChanged);
      let relativeLayout = createBox(),
        snapshotSource = snapshot ? snapshot.source : void 0,
        layoutSource = this.layout ? this.layout.source : void 0,
        isSharedLayoutAnimation = snapshotSource !== layoutSource,
        stack = this.getStack(),
        isOnlyMember = !stack || stack.members.length <= 1,
        shouldCrossfadeOpacity = Boolean(
          isSharedLayoutAnimation &&
            !isOnlyMember &&
            this.options.crossfade === !0 &&
            !this.path.some(hasOpacityCrossfade)
        );
      this.animationProgress = 0;
      let prevRelativeTarget;
      (this.mixTargetDelta = latest => {
        let progress6 = latest / 1e3;
        mixAxisDelta(targetDelta.x, delta.x, progress6),
          mixAxisDelta(targetDelta.y, delta.y, progress6),
          this.setTargetDelta(targetDelta),
          this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.layout &&
            this.relativeParent &&
            this.relativeParent.layout &&
            (calcRelativePosition(
              relativeLayout,
              this.layout.layoutBox,
              this.relativeParent.layout.layoutBox
            ),
            mixBox(this.relativeTarget, this.relativeTargetOrigin, relativeLayout, progress6),
            prevRelativeTarget &&
              boxEquals(this.relativeTarget, prevRelativeTarget) &&
              (this.isProjectionDirty = !1),
            prevRelativeTarget || (prevRelativeTarget = createBox()),
            copyBoxInto(prevRelativeTarget, this.relativeTarget)),
          isSharedLayoutAnimation &&
            ((this.animationValues = mixedValues),
            mixValues(
              mixedValues,
              snapshotLatestValues,
              this.latestValues,
              progress6,
              shouldCrossfadeOpacity,
              isOnlyMember
            )),
          this.root.scheduleUpdateProjection(),
          this.scheduleRender(),
          (this.animationProgress = progress6);
      }),
        this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(options) {
      this.notifyListeners('animationStart'),
        this.currentAnimation && this.currentAnimation.stop(),
        this.resumingFrom &&
          this.resumingFrom.currentAnimation &&
          this.resumingFrom.currentAnimation.stop(),
        this.pendingAnimation &&
          (cancelFrame(this.pendingAnimation), (this.pendingAnimation = void 0)),
        (this.pendingAnimation = frame.update(() => {
          (globalProjectionState.hasAnimatedSinceResize = !0),
            (this.currentAnimation = animateSingleValue(0, animationTarget, {
              ...options,
              onUpdate: latest => {
                this.mixTargetDelta(latest), options.onUpdate && options.onUpdate(latest);
              },
              onComplete: () => {
                options.onComplete && options.onComplete(), this.completeAnimation();
              },
            })),
            this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation),
            (this.pendingAnimation = void 0);
        }));
    }
    completeAnimation() {
      this.resumingFrom &&
        ((this.resumingFrom.currentAnimation = void 0),
        (this.resumingFrom.preserveOpacity = void 0));
      let stack = this.getStack();
      stack && stack.exitAnimationComplete(),
        (this.resumingFrom = this.currentAnimation = this.animationValues = void 0),
        this.notifyListeners('animationComplete');
    }
    finishAnimation() {
      this.currentAnimation &&
        (this.mixTargetDelta && this.mixTargetDelta(animationTarget), this.currentAnimation.stop()),
        this.completeAnimation();
    }
    applyTransformsToTarget() {
      let lead = this.getLead(),
        { targetWithTransforms, target, layout: layout2, latestValues } = lead;
      if (!(!targetWithTransforms || !target || !layout2)) {
        if (
          this !== lead &&
          this.layout &&
          layout2 &&
          shouldAnimatePositionOnly(
            this.options.animationType,
            this.layout.layoutBox,
            layout2.layoutBox
          )
        ) {
          target = this.target || createBox();
          let xLength = calcLength(this.layout.layoutBox.x);
          (target.x.min = lead.target.x.min), (target.x.max = target.x.min + xLength);
          let yLength = calcLength(this.layout.layoutBox.y);
          (target.y.min = lead.target.y.min), (target.y.max = target.y.min + yLength);
        }
        copyBoxInto(targetWithTransforms, target),
          transformBox(targetWithTransforms, latestValues),
          calcBoxDelta(
            this.projectionDeltaWithTransform,
            this.layoutCorrected,
            targetWithTransforms,
            latestValues
          );
      }
    }
    registerSharedNode(layoutId, node) {
      this.sharedNodes.has(layoutId) || this.sharedNodes.set(layoutId, new NodeStack()),
        this.sharedNodes.get(layoutId).add(node);
      let config = node.options.initialPromotionConfig;
      node.promote({
        transition: config ? config.transition : void 0,
        preserveFollowOpacity:
          config && config.shouldPreserveFollowOpacity
            ? config.shouldPreserveFollowOpacity(node)
            : void 0,
      });
    }
    isLead() {
      let stack = this.getStack();
      return stack ? stack.lead === this : !0;
    }
    getLead() {
      var _a;
      let { layoutId } = this.options;
      return layoutId
        ? ((_a = this.getStack()) === null || _a === void 0 ? void 0 : _a.lead) || this
        : this;
    }
    getPrevLead() {
      var _a;
      let { layoutId } = this.options;
      return layoutId
        ? (_a = this.getStack()) === null || _a === void 0
          ? void 0
          : _a.prevLead
        : void 0;
    }
    getStack() {
      let { layoutId } = this.options;
      if (layoutId) return this.root.sharedNodes.get(layoutId);
    }
    promote({ needsReset, transition, preserveFollowOpacity } = {}) {
      let stack = this.getStack();
      stack && stack.promote(this, preserveFollowOpacity),
        needsReset && ((this.projectionDelta = void 0), (this.needsReset = !0)),
        transition && this.setOptions({ transition });
    }
    relegate() {
      let stack = this.getStack();
      return stack ? stack.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      let { visualElement } = this.options;
      if (!visualElement) return;
      let hasDistortingTransform = !1,
        { latestValues } = visualElement;
      if (
        ((latestValues.z ||
          latestValues.rotate ||
          latestValues.rotateX ||
          latestValues.rotateY ||
          latestValues.rotateZ ||
          latestValues.skewX ||
          latestValues.skewY) &&
          (hasDistortingTransform = !0),
        !hasDistortingTransform)
      )
        return;
      let resetValues = {};
      latestValues.z &&
        resetDistortingTransform('z', visualElement, resetValues, this.animationValues);
      for (let i = 0; i < transformAxes.length; i++)
        resetDistortingTransform(
          `rotate${transformAxes[i]}`,
          visualElement,
          resetValues,
          this.animationValues
        ),
          resetDistortingTransform(
            `skew${transformAxes[i]}`,
            visualElement,
            resetValues,
            this.animationValues
          );
      visualElement.render();
      for (let key in resetValues)
        visualElement.setStaticValue(key, resetValues[key]),
          this.animationValues && (this.animationValues[key] = resetValues[key]);
      visualElement.scheduleRender();
    }
    getProjectionStyles(styleProp) {
      var _a, _b;
      if (!this.instance || this.isSVG) return;
      if (!this.isVisible) return hiddenVisibility;
      let styles = {
          visibility: '',
        },
        transformTemplate = this.getTransformTemplate();
      if (this.needsReset)
        return (
          (this.needsReset = !1),
          (styles.opacity = ''),
          (styles.pointerEvents = resolveMotionValue(styleProp?.pointerEvents) || ''),
          (styles.transform = transformTemplate
            ? transformTemplate(this.latestValues, '')
            : 'none'),
          styles
        );
      let lead = this.getLead();
      if (!this.projectionDelta || !this.layout || !lead.target) {
        let emptyStyles = {};
        return (
          this.options.layoutId &&
            ((emptyStyles.opacity =
              this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1),
            (emptyStyles.pointerEvents = resolveMotionValue(styleProp?.pointerEvents) || '')),
          this.hasProjected &&
            !hasTransform(this.latestValues) &&
            ((emptyStyles.transform = transformTemplate ? transformTemplate({}, '') : 'none'),
            (this.hasProjected = !1)),
          emptyStyles
        );
      }
      let valuesToRender = lead.animationValues || lead.latestValues;
      this.applyTransformsToTarget(),
        (styles.transform = buildProjectionTransform(
          this.projectionDeltaWithTransform,
          this.treeScale,
          valuesToRender
        )),
        transformTemplate &&
          (styles.transform = transformTemplate(valuesToRender, styles.transform));
      let { x, y } = this.projectionDelta;
      (styles.transformOrigin = `${x.origin * 100}% ${y.origin * 100}% 0`),
        lead.animationValues
          ? (styles.opacity =
              lead === this
                ? (_b =
                    (_a = valuesToRender.opacity) !== null && _a !== void 0
                      ? _a
                      : this.latestValues.opacity) !== null && _b !== void 0
                  ? _b
                  : 1
                : this.preserveOpacity
                  ? this.latestValues.opacity
                  : valuesToRender.opacityExit)
          : (styles.opacity =
              lead === this
                ? valuesToRender.opacity !== void 0
                  ? valuesToRender.opacity
                  : ''
                : valuesToRender.opacityExit !== void 0
                  ? valuesToRender.opacityExit
                  : 0);
      for (let key in scaleCorrectors) {
        if (valuesToRender[key] === void 0) continue;
        let { correct, applyTo } = scaleCorrectors[key],
          corrected =
            styles.transform === 'none' ? valuesToRender[key] : correct(valuesToRender[key], lead);
        if (applyTo) {
          let num = applyTo.length;
          for (let i = 0; i < num; i++) styles[applyTo[i]] = corrected;
        } else styles[key] = corrected;
      }
      return (
        this.options.layoutId &&
          (styles.pointerEvents =
            lead === this ? resolveMotionValue(styleProp?.pointerEvents) || '' : 'none'),
        styles
      );
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach(node => {
        var _a;
        return (_a = node.currentAnimation) === null || _a === void 0 ? void 0 : _a.stop();
      }),
        this.root.nodes.forEach(clearMeasurements),
        this.root.sharedNodes.clear();
    }
  };
}
function updateLayout(node) {
  node.updateLayout();
}
function notifyLayoutUpdate(node) {
  var _a;
  let snapshot =
    ((_a = node.resumeFrom) === null || _a === void 0 ? void 0 : _a.snapshot) || node.snapshot;
  if (node.isLead() && node.layout && snapshot && node.hasListeners('didUpdate')) {
    let { layoutBox: layout2, measuredBox: measuredLayout } = node.layout,
      { animationType } = node.options,
      isShared = snapshot.source !== node.layout.source;
    animationType === 'size'
      ? eachAxis(axis => {
          let axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis],
            length = calcLength(axisSnapshot);
          (axisSnapshot.min = layout2[axis].min), (axisSnapshot.max = axisSnapshot.min + length);
        })
      : shouldAnimatePositionOnly(animationType, snapshot.layoutBox, layout2) &&
        eachAxis(axis => {
          let axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis],
            length = calcLength(layout2[axis]);
          (axisSnapshot.max = axisSnapshot.min + length),
            node.relativeTarget &&
              !node.currentAnimation &&
              ((node.isProjectionDirty = !0),
              (node.relativeTarget[axis].max = node.relativeTarget[axis].min + length));
        });
    let layoutDelta = createDelta();
    calcBoxDelta(layoutDelta, layout2, snapshot.layoutBox);
    let visualDelta = createDelta();
    isShared
      ? calcBoxDelta(visualDelta, node.applyTransform(measuredLayout, !0), snapshot.measuredBox)
      : calcBoxDelta(visualDelta, layout2, snapshot.layoutBox);
    let hasLayoutChanged = !isDeltaZero(layoutDelta),
      hasRelativeTargetChanged = !1;
    if (!node.resumeFrom) {
      let relativeParent = node.getClosestProjectingParent();
      if (relativeParent && !relativeParent.resumeFrom) {
        let { snapshot: parentSnapshot, layout: parentLayout } = relativeParent;
        if (parentSnapshot && parentLayout) {
          let relativeSnapshot = createBox();
          calcRelativePosition(relativeSnapshot, snapshot.layoutBox, parentSnapshot.layoutBox);
          let relativeLayout = createBox();
          calcRelativePosition(relativeLayout, layout2, parentLayout.layoutBox),
            boxEqualsRounded(relativeSnapshot, relativeLayout) || (hasRelativeTargetChanged = !0),
            relativeParent.options.layoutRoot &&
              ((node.relativeTarget = relativeLayout),
              (node.relativeTargetOrigin = relativeSnapshot),
              (node.relativeParent = relativeParent));
        }
      }
    }
    node.notifyListeners('didUpdate', {
      layout: layout2,
      snapshot,
      delta: visualDelta,
      layoutDelta,
      hasLayoutChanged,
      hasRelativeTargetChanged,
    });
  } else if (node.isLead()) {
    let { onExitComplete } = node.options;
    onExitComplete && onExitComplete();
  }
  node.options.transition = void 0;
}
function propagateDirtyNodes(node) {
  isDebug && metrics.totalNodes++,
    node.parent &&
      (node.isProjecting() || (node.isProjectionDirty = node.parent.isProjectionDirty),
      node.isSharedProjectionDirty ||
        (node.isSharedProjectionDirty = Boolean(
          node.isProjectionDirty ||
            node.parent.isProjectionDirty ||
            node.parent.isSharedProjectionDirty
        )),
      node.isTransformDirty || (node.isTransformDirty = node.parent.isTransformDirty));
}
function cleanDirtyNodes(node) {
  node.isProjectionDirty = node.isSharedProjectionDirty = node.isTransformDirty = !1;
}
function clearSnapshot(node) {
  node.clearSnapshot();
}
function clearMeasurements(node) {
  node.clearMeasurements();
}
function clearIsLayoutDirty(node) {
  node.isLayoutDirty = !1;
}
function resetTransformStyle(node) {
  let { visualElement } = node.options;
  visualElement &&
    visualElement.getProps().onBeforeLayoutMeasure &&
    visualElement.notify('BeforeLayoutMeasure'),
    node.resetTransform();
}
function finishAnimation(node) {
  node.finishAnimation(),
    (node.targetDelta = node.relativeTarget = node.target = void 0),
    (node.isProjectionDirty = !0);
}
function resolveTargetDelta(node) {
  node.resolveTargetDelta();
}
function calcProjection(node) {
  node.calcProjection();
}
function resetSkewAndRotation(node) {
  node.resetSkewAndRotation();
}
function removeLeadSnapshots(stack) {
  stack.removeLeadSnapshot();
}
function mixAxisDelta(output, delta, p) {
  (output.translate = mixNumber(delta.translate, 0, p)),
    (output.scale = mixNumber(delta.scale, 1, p)),
    (output.origin = delta.origin),
    (output.originPoint = delta.originPoint);
}
function mixAxis(output, from, to, p) {
  (output.min = mixNumber(from.min, to.min, p)), (output.max = mixNumber(from.max, to.max, p));
}
function mixBox(output, from, to, p) {
  mixAxis(output.x, from.x, to.x, p), mixAxis(output.y, from.y, to.y, p);
}
function hasOpacityCrossfade(node) {
  return node.animationValues && node.animationValues.opacityExit !== void 0;
}
var defaultLayoutTransition = {
    duration: 0.45,
    ease: [0.4, 0, 0.1, 1],
  },
  userAgentContains = string =>
    typeof navigator < 'u' &&
    navigator.userAgent &&
    navigator.userAgent.toLowerCase().includes(string),
  roundPoint =
    userAgentContains('applewebkit/') && !userAgentContains('chrome/') ? Math.round : noop9;
function roundAxis(axis) {
  (axis.min = roundPoint(axis.min)), (axis.max = roundPoint(axis.max));
}
function roundBox(box) {
  roundAxis(box.x), roundAxis(box.y);
}
function shouldAnimatePositionOnly(animationType, snapshot, layout2) {
  return (
    animationType === 'position' ||
    (animationType === 'preserve-aspect' &&
      !isNear(aspectRatio(snapshot), aspectRatio(layout2), 0.2))
  );
}
function checkNodeWasScrollRoot(node) {
  var _a;
  return node !== node.root && ((_a = node.scroll) === null || _a === void 0 ? void 0 : _a.wasRoot);
}

// node_modules/framer-motion/dist/es/projection/node/DocumentProjectionNode.mjs
var DocumentProjectionNode = createProjectionNode2({
  attachResizeListener: (ref, notify) => addDomEvent(ref, 'resize', notify),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body.scrollLeft,
    y: document.documentElement.scrollTop || document.body.scrollTop,
  }),
  checkIsScrollRoot: () => !0,
});

// node_modules/framer-motion/dist/es/projection/node/HTMLProjectionNode.mjs
var rootProjectionNode = {
    current: void 0,
  },
  HTMLProjectionNode = createProjectionNode2({
    measureScroll: instance => ({
      x: instance.scrollLeft,
      y: instance.scrollTop,
    }),
    defaultParent: () => {
      if (!rootProjectionNode.current) {
        let documentNode = new DocumentProjectionNode({});
        documentNode.mount(window),
          documentNode.setOptions({ layoutScroll: !0 }),
          (rootProjectionNode.current = documentNode);
      }
      return rootProjectionNode.current;
    },
    resetTransform: (instance, value) => {
      instance.style.transform = value !== void 0 ? value : 'none';
    },
    checkIsScrollRoot: instance => Boolean(window.getComputedStyle(instance).position === 'fixed'),
  });

// node_modules/framer-motion/dist/es/motion/features/drag.mjs
var drag = {
  pan: {
    Feature: PanGesture,
  },
  drag: {
    Feature: DragGesture,
    ProjectionNode: HTMLProjectionNode,
    MeasureLayout,
  },
};

// node_modules/framer-motion/dist/es/gestures/hover.mjs
import { hover } from 'motion-dom';
function handleHoverEvent(node, event, lifecycle) {
  let { props } = node;
  node.animationState &&
    props.whileHover &&
    node.animationState.setActive('whileHover', lifecycle === 'Start');
  let eventName = 'onHover' + lifecycle,
    callback = props[eventName];
  callback && frame.postRender(() => callback(event, extractEventInfo(event)));
}
var HoverGesture = class extends Feature {
  mount() {
    let { current } = this.node;
    current &&
      (this.unmount = hover(
        current,
        startEvent => (
          handleHoverEvent(this.node, startEvent, 'Start'),
          endEvent => handleHoverEvent(this.node, endEvent, 'End')
        )
      ));
  }
  unmount() {}
};

// node_modules/framer-motion/dist/es/gestures/focus.mjs
var FocusGesture = class extends Feature {
  constructor() {
    super(...arguments), (this.isActive = !1);
  }
  onFocus() {
    let isFocusVisible = !1;
    try {
      isFocusVisible = this.node.current.matches(':focus-visible');
    } catch {
      isFocusVisible = !0;
    }
    !isFocusVisible ||
      !this.node.animationState ||
      (this.node.animationState.setActive('whileFocus', !0), (this.isActive = !0));
  }
  onBlur() {
    !this.isActive ||
      !this.node.animationState ||
      (this.node.animationState.setActive('whileFocus', !1), (this.isActive = !1));
  }
  mount() {
    this.unmount = pipe(
      addDomEvent(this.node.current, 'focus', () => this.onFocus()),
      addDomEvent(this.node.current, 'blur', () => this.onBlur())
    );
  }
  unmount() {}
};

// node_modules/framer-motion/dist/es/gestures/press.mjs
import { press } from 'motion-dom';
function handlePressEvent(node, event, lifecycle) {
  let { props } = node;
  node.animationState &&
    props.whileTap &&
    node.animationState.setActive('whileTap', lifecycle === 'Start');
  let eventName = 'onTap' + (lifecycle === 'End' ? '' : lifecycle),
    callback = props[eventName];
  callback && frame.postRender(() => callback(event, extractEventInfo(event)));
}
var PressGesture = class extends Feature {
  mount() {
    let { current } = this.node;
    current &&
      (this.unmount = press(
        current,
        startEvent => (
          handlePressEvent(this.node, startEvent, 'Start'),
          (endEvent, { success }) =>
            handlePressEvent(this.node, endEvent, success ? 'End' : 'Cancel')
        ),
        { useGlobalTarget: this.node.props.globalTapTarget }
      ));
  }
  unmount() {}
};

// node_modules/framer-motion/dist/es/motion/features/viewport/observers.mjs
var observerCallbacks = /* @__PURE__ */ new WeakMap(),
  observers = /* @__PURE__ */ new WeakMap(),
  fireObserverCallback = entry2 => {
    let callback = observerCallbacks.get(entry2.target);
    callback && callback(entry2);
  },
  fireAllObserverCallbacks = entries => {
    entries.forEach(fireObserverCallback);
  };
function initIntersectionObserver({ root, ...options }) {
  let lookupRoot = root || document;
  observers.has(lookupRoot) || observers.set(lookupRoot, {});
  let rootObservers = observers.get(lookupRoot),
    key = JSON.stringify(options);
  return (
    rootObservers[key] ||
      (rootObservers[key] = new IntersectionObserver(fireAllObserverCallbacks, {
        root,
        ...options,
      })),
    rootObservers[key]
  );
}
function observeIntersection(element, options, callback) {
  let rootInteresectionObserver = initIntersectionObserver(options);
  return (
    observerCallbacks.set(element, callback),
    rootInteresectionObserver.observe(element),
    () => {
      observerCallbacks.delete(element), rootInteresectionObserver.unobserve(element);
    }
  );
}

// node_modules/framer-motion/dist/es/motion/features/viewport/index.mjs
var thresholdNames = {
    some: 0,
    all: 1,
  },
  InViewFeature = class extends Feature {
    constructor() {
      super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1);
    }
    startObserver() {
      this.unmount();
      let { viewport = {} } = this.node.getProps(),
        { root, margin: rootMargin, amount = 'some', once } = viewport,
        options = {
          root: root ? root.current : void 0,
          rootMargin,
          threshold: typeof amount == 'number' ? amount : thresholdNames[amount],
        },
        onIntersectionUpdate = entry2 => {
          let { isIntersecting } = entry2;
          if (
            this.isInView === isIntersecting ||
            ((this.isInView = isIntersecting), once && !isIntersecting && this.hasEnteredView)
          )
            return;
          isIntersecting && (this.hasEnteredView = !0),
            this.node.animationState &&
              this.node.animationState.setActive('whileInView', isIntersecting);
          let { onViewportEnter, onViewportLeave } = this.node.getProps(),
            callback = isIntersecting ? onViewportEnter : onViewportLeave;
          callback && callback(entry2);
        };
      return observeIntersection(this.node.current, options, onIntersectionUpdate);
    }
    mount() {
      this.startObserver();
    }
    update() {
      if (typeof IntersectionObserver > 'u') return;
      let { props, prevProps } = this.node;
      ['amount', 'margin', 'root'].some(hasViewportOptionChanged(props, prevProps)) &&
        this.startObserver();
    }
    unmount() {}
  };
function hasViewportOptionChanged({ viewport = {} }, { viewport: prevViewport = {} } = {}) {
  return name => viewport[name] !== prevViewport[name];
}

// node_modules/framer-motion/dist/es/motion/features/gestures.mjs
var gestureAnimations = {
  inView: {
    Feature: InViewFeature,
  },
  tap: {
    Feature: PressGesture,
  },
  focus: {
    Feature: FocusGesture,
  },
  hover: {
    Feature: HoverGesture,
  },
};

// node_modules/framer-motion/dist/es/motion/features/layout.mjs
var layout = {
  layout: {
    ProjectionNode: HTMLProjectionNode,
    MeasureLayout,
  },
};

// node_modules/framer-motion/dist/es/render/dom/create-visual-element.mjs
import { Fragment as Fragment3 } from 'react';

// node_modules/framer-motion/dist/es/utils/reduced-motion/state.mjs
var prefersReducedMotion = { current: null },
  hasReducedMotionListener = { current: !1 };

// node_modules/framer-motion/dist/es/utils/reduced-motion/index.mjs
function initPrefersReducedMotion() {
  if (((hasReducedMotionListener.current = !0), !!isBrowser))
    if (window.matchMedia) {
      let motionMediaQuery = window.matchMedia('(prefers-reduced-motion)'),
        setReducedMotionPreferences = () =>
          (prefersReducedMotion.current = motionMediaQuery.matches);
      motionMediaQuery.addListener(setReducedMotionPreferences), setReducedMotionPreferences();
    } else prefersReducedMotion.current = !1;
}

// node_modules/framer-motion/dist/es/render/dom/value-types/find.mjs
var valueTypes = [...dimensionValueTypes, color, complex],
  findValueType = v => valueTypes.find(testValueType(v));

// node_modules/framer-motion/dist/es/render/store.mjs
var visualElementStore = /* @__PURE__ */ new WeakMap();

// node_modules/framer-motion/dist/es/render/utils/motion-values.mjs
function updateMotionValuesFromProps(element, next, prev) {
  for (let key in next) {
    let nextValue = next[key],
      prevValue = prev[key];
    if (isMotionValue(nextValue)) element.addValue(key, nextValue);
    else if (isMotionValue(prevValue))
      element.addValue(key, motionValue(nextValue, { owner: element }));
    else if (prevValue !== nextValue)
      if (element.hasValue(key)) {
        let existingValue = element.getValue(key);
        existingValue.liveStyle === !0
          ? existingValue.jump(nextValue)
          : existingValue.hasAnimated || existingValue.set(nextValue);
      } else {
        let latestValue = element.getStaticValue(key);
        element.addValue(
          key,
          motionValue(latestValue !== void 0 ? latestValue : nextValue, { owner: element })
        );
      }
  }
  for (let key in prev) next[key] === void 0 && element.removeValue(key);
  return next;
}

// node_modules/framer-motion/dist/es/render/VisualElement.mjs
var propEventHandlers = [
    'AnimationStart',
    'AnimationComplete',
    'Update',
    'BeforeLayoutMeasure',
    'LayoutMeasure',
    'LayoutAnimationStart',
    'LayoutAnimationComplete',
  ],
  VisualElement = class {
    /**
     * This method takes React props and returns found MotionValues. For example, HTML
     * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
     *
     * This isn't an abstract method as it needs calling in the constructor, but it is
     * intended to be one.
     */
    scrapeMotionValuesFromProps(_props, _prevProps, _visualElement) {
      return {};
    }
    constructor(
      { parent, props, presenceContext, reducedMotionConfig, blockInitialAnimation, visualState },
      options = {}
    ) {
      (this.current = null),
        (this.children = /* @__PURE__ */ new Set()),
        (this.isVariantNode = !1),
        (this.isControllingVariants = !1),
        (this.shouldReduceMotion = null),
        (this.values = /* @__PURE__ */ new Map()),
        (this.KeyframeResolver = KeyframeResolver),
        (this.features = {}),
        (this.valueSubscriptions = /* @__PURE__ */ new Map()),
        (this.prevMotionValues = {}),
        (this.events = {}),
        (this.propEventSubscriptions = {}),
        (this.notifyUpdate = () => this.notify('Update', this.latestValues)),
        (this.render = () => {
          this.current &&
            (this.triggerBuild(),
            this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
        }),
        (this.renderScheduledAt = 0),
        (this.scheduleRender = () => {
          let now2 = time.now();
          this.renderScheduledAt < now2 &&
            ((this.renderScheduledAt = now2), frame.render(this.render, !1, !0));
        });
      let { latestValues, renderState, onUpdate } = visualState;
      (this.onUpdate = onUpdate),
        (this.latestValues = latestValues),
        (this.baseTarget = { ...latestValues }),
        (this.initialValues = props.initial ? { ...latestValues } : {}),
        (this.renderState = renderState),
        (this.parent = parent),
        (this.props = props),
        (this.presenceContext = presenceContext),
        (this.depth = parent ? parent.depth + 1 : 0),
        (this.reducedMotionConfig = reducedMotionConfig),
        (this.options = options),
        (this.blockInitialAnimation = Boolean(blockInitialAnimation)),
        (this.isControllingVariants = isControllingVariants(props)),
        (this.isVariantNode = isVariantNode(props)),
        this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()),
        (this.manuallyAnimateOnMount = Boolean(parent && parent.current));
      let { willChange, ...initialMotionValues } = this.scrapeMotionValuesFromProps(
        props,
        {},
        this
      );
      for (let key in initialMotionValues) {
        let value = initialMotionValues[key];
        latestValues[key] !== void 0 && isMotionValue(value) && value.set(latestValues[key], !1);
      }
    }
    mount(instance) {
      (this.current = instance),
        visualElementStore.set(instance, this),
        this.projection && !this.projection.instance && this.projection.mount(instance),
        this.parent &&
          this.isVariantNode &&
          !this.isControllingVariants &&
          (this.removeFromVariantTree = this.parent.addVariantChild(this)),
        this.values.forEach((value, key) => this.bindToMotionValue(key, value)),
        hasReducedMotionListener.current || initPrefersReducedMotion(),
        (this.shouldReduceMotion =
          this.reducedMotionConfig === 'never'
            ? !1
            : this.reducedMotionConfig === 'always'
              ? !0
              : prefersReducedMotion.current),
        this.parent && this.parent.children.add(this),
        this.update(this.props, this.presenceContext);
    }
    unmount() {
      visualElementStore.delete(this.current),
        this.projection && this.projection.unmount(),
        cancelFrame(this.notifyUpdate),
        cancelFrame(this.render),
        this.valueSubscriptions.forEach(remove => remove()),
        this.valueSubscriptions.clear(),
        this.removeFromVariantTree && this.removeFromVariantTree(),
        this.parent && this.parent.children.delete(this);
      for (let key in this.events) this.events[key].clear();
      for (let key in this.features) {
        let feature = this.features[key];
        feature && (feature.unmount(), (feature.isMounted = !1));
      }
      this.current = null;
    }
    bindToMotionValue(key, value) {
      this.valueSubscriptions.has(key) && this.valueSubscriptions.get(key)();
      let valueIsTransform = transformProps.has(key),
        removeOnChange = value.on('change', latestValue => {
          (this.latestValues[key] = latestValue),
            this.props.onUpdate && frame.preRender(this.notifyUpdate),
            valueIsTransform && this.projection && (this.projection.isTransformDirty = !0);
        }),
        removeOnRenderRequest = value.on('renderRequest', this.scheduleRender),
        removeSyncCheck;
      window.MotionCheckAppearSync &&
        (removeSyncCheck = window.MotionCheckAppearSync(this, key, value)),
        this.valueSubscriptions.set(key, () => {
          removeOnChange(),
            removeOnRenderRequest(),
            removeSyncCheck && removeSyncCheck(),
            value.owner && value.stop();
        });
    }
    sortNodePosition(other) {
      return !this.current || !this.sortInstanceNodePosition || this.type !== other.type
        ? 0
        : this.sortInstanceNodePosition(this.current, other.current);
    }
    updateFeatures() {
      let key = 'animation';
      for (key in featureDefinitions) {
        let featureDefinition = featureDefinitions[key];
        if (!featureDefinition) continue;
        let { isEnabled, Feature: FeatureConstructor } = featureDefinition;
        if (
          (!this.features[key] &&
            FeatureConstructor &&
            isEnabled(this.props) &&
            (this.features[key] = new FeatureConstructor(this)),
          this.features[key])
        ) {
          let feature = this.features[key];
          feature.isMounted ? feature.update() : (feature.mount(), (feature.isMounted = !0));
        }
      }
    }
    triggerBuild() {
      this.build(this.renderState, this.latestValues, this.props);
    }
    /**
     * Measure the current viewport box with or without transforms.
     * Only measures axis-aligned boxes, rotate and skew must be manually
     * removed with a re-render to work.
     */
    measureViewportBox() {
      return this.current ? this.measureInstanceViewportBox(this.current, this.props) : createBox();
    }
    getStaticValue(key) {
      return this.latestValues[key];
    }
    setStaticValue(key, value) {
      this.latestValues[key] = value;
    }
    /**
     * Update the provided props. Ensure any newly-added motion values are
     * added to our map, old ones removed, and listeners updated.
     */
    update(props, presenceContext) {
      (props.transformTemplate || this.props.transformTemplate) && this.scheduleRender(),
        (this.prevProps = this.props),
        (this.props = props),
        (this.prevPresenceContext = this.presenceContext),
        (this.presenceContext = presenceContext);
      for (let i = 0; i < propEventHandlers.length; i++) {
        let key = propEventHandlers[i];
        this.propEventSubscriptions[key] &&
          (this.propEventSubscriptions[key](), delete this.propEventSubscriptions[key]);
        let listenerName = 'on' + key,
          listener = props[listenerName];
        listener && (this.propEventSubscriptions[key] = this.on(key, listener));
      }
      (this.prevMotionValues = updateMotionValuesFromProps(
        this,
        this.scrapeMotionValuesFromProps(props, this.prevProps, this),
        this.prevMotionValues
      )),
        this.handleChildMotionValue && this.handleChildMotionValue(),
        this.onUpdate && this.onUpdate(this);
    }
    getProps() {
      return this.props;
    }
    /**
     * Returns the variant definition with a given name.
     */
    getVariant(name) {
      return this.props.variants ? this.props.variants[name] : void 0;
    }
    /**
     * Returns the defined default transition on this component.
     */
    getDefaultTransition() {
      return this.props.transition;
    }
    getTransformPagePoint() {
      return this.props.transformPagePoint;
    }
    getClosestVariantNode() {
      return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
    }
    /**
     * Add a child visual element to our set of children.
     */
    addVariantChild(child) {
      let closestVariantNode = this.getClosestVariantNode();
      if (closestVariantNode)
        return (
          closestVariantNode.variantChildren && closestVariantNode.variantChildren.add(child),
          () => closestVariantNode.variantChildren.delete(child)
        );
    }
    /**
     * Add a motion value and bind it to this visual element.
     */
    addValue(key, value) {
      let existingValue = this.values.get(key);
      value !== existingValue &&
        (existingValue && this.removeValue(key),
        this.bindToMotionValue(key, value),
        this.values.set(key, value),
        (this.latestValues[key] = value.get()));
    }
    /**
     * Remove a motion value and unbind any active subscriptions.
     */
    removeValue(key) {
      this.values.delete(key);
      let unsubscribe = this.valueSubscriptions.get(key);
      unsubscribe && (unsubscribe(), this.valueSubscriptions.delete(key)),
        delete this.latestValues[key],
        this.removeValueFromRenderState(key, this.renderState);
    }
    /**
     * Check whether we have a motion value for this key
     */
    hasValue(key) {
      return this.values.has(key);
    }
    getValue(key, defaultValue) {
      if (this.props.values && this.props.values[key]) return this.props.values[key];
      let value = this.values.get(key);
      return (
        value === void 0 &&
          defaultValue !== void 0 &&
          ((value = motionValue(defaultValue === null ? void 0 : defaultValue, { owner: this })),
          this.addValue(key, value)),
        value
      );
    }
    /**
     * If we're trying to animate to a previously unencountered value,
     * we need to check for it in our state and as a last resort read it
     * directly from the instance (which might have performance implications).
     */
    readValue(key, target) {
      var _a;
      let value =
        this.latestValues[key] !== void 0 || !this.current
          ? this.latestValues[key]
          : (_a = this.getBaseTargetFromProps(this.props, key)) !== null && _a !== void 0
            ? _a
            : this.readValueFromInstance(this.current, key, this.options);
      return (
        value != null &&
          (typeof value == 'string' && (isNumericalString(value) || isZeroValueString(value))
            ? (value = parseFloat(value))
            : !findValueType(value) &&
              complex.test(target) &&
              (value = getAnimatableNone2(key, target)),
          this.setBaseTarget(key, isMotionValue(value) ? value.get() : value)),
        isMotionValue(value) ? value.get() : value
      );
    }
    /**
     * Set the base target to later animate back to. This is currently
     * only hydrated on creation and when we first read a value.
     */
    setBaseTarget(key, value) {
      this.baseTarget[key] = value;
    }
    /**
     * Find the base target for a value thats been removed from all animation
     * props.
     */
    getBaseTarget(key) {
      var _a;
      let { initial } = this.props,
        valueFromInitial;
      if (typeof initial == 'string' || typeof initial == 'object') {
        let variant = resolveVariantFromProps(
          this.props,
          initial,
          (_a = this.presenceContext) === null || _a === void 0 ? void 0 : _a.custom
        );
        variant && (valueFromInitial = variant[key]);
      }
      if (initial && valueFromInitial !== void 0) return valueFromInitial;
      let target = this.getBaseTargetFromProps(this.props, key);
      return target !== void 0 && !isMotionValue(target)
        ? target
        : this.initialValues[key] !== void 0 && valueFromInitial === void 0
          ? void 0
          : this.baseTarget[key];
    }
    on(eventName, callback) {
      return (
        this.events[eventName] || (this.events[eventName] = new SubscriptionManager()),
        this.events[eventName].add(callback)
      );
    }
    notify(eventName, ...args) {
      this.events[eventName] && this.events[eventName].notify(...args);
    }
  };

// node_modules/framer-motion/dist/es/render/dom/DOMVisualElement.mjs
var DOMVisualElement = class extends VisualElement {
  constructor() {
    super(...arguments), (this.KeyframeResolver = DOMKeyframesResolver);
  }
  sortInstanceNodePosition(a, b) {
    return a.compareDocumentPosition(b) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(props, key) {
    return props.style ? props.style[key] : void 0;
  }
  removeValueFromRenderState(key, { vars, style }) {
    delete vars[key], delete style[key];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    let { children } = this.props;
    isMotionValue(children) &&
      (this.childSubscription = children.on('change', latest => {
        this.current && (this.current.textContent = `${latest}`);
      }));
  }
};

// node_modules/framer-motion/dist/es/render/html/HTMLVisualElement.mjs
function getComputedStyle(element) {
  return window.getComputedStyle(element);
}
var HTMLVisualElement = class extends DOMVisualElement {
  constructor() {
    super(...arguments), (this.type = 'html'), (this.renderInstance = renderHTML);
  }
  readValueFromInstance(instance, key) {
    if (transformProps.has(key)) {
      let defaultType = getDefaultValueType(key);
      return (defaultType && defaultType.default) || 0;
    } else {
      let computedStyle = getComputedStyle(instance),
        value =
          (isCSSVariableName(key) ? computedStyle.getPropertyValue(key) : computedStyle[key]) || 0;
      return typeof value == 'string' ? value.trim() : value;
    }
  }
  measureInstanceViewportBox(instance, { transformPagePoint }) {
    return measureViewportBox(instance, transformPagePoint);
  }
  build(renderState, latestValues, props) {
    buildHTMLStyles(renderState, latestValues, props.transformTemplate);
  }
  scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    return scrapeMotionValuesFromProps(props, prevProps, visualElement);
  }
};

// node_modules/framer-motion/dist/es/render/svg/SVGVisualElement.mjs
var SVGVisualElement = class extends DOMVisualElement {
  constructor() {
    super(...arguments),
      (this.type = 'svg'),
      (this.isSVGTag = !1),
      (this.measureInstanceViewportBox = createBox);
  }
  getBaseTargetFromProps(props, key) {
    return props[key];
  }
  readValueFromInstance(instance, key) {
    if (transformProps.has(key)) {
      let defaultType = getDefaultValueType(key);
      return (defaultType && defaultType.default) || 0;
    }
    return (
      (key = camelCaseAttributes.has(key) ? key : camelToDash(key)), instance.getAttribute(key)
    );
  }
  scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    return scrapeMotionValuesFromProps2(props, prevProps, visualElement);
  }
  build(renderState, latestValues, props) {
    buildSVGAttrs(renderState, latestValues, this.isSVGTag, props.transformTemplate);
  }
  renderInstance(instance, renderState, styleProp, projection) {
    renderSVG(instance, renderState, styleProp, projection);
  }
  mount(instance) {
    (this.isSVGTag = isSVGTag(instance.tagName)), super.mount(instance);
  }
};

// node_modules/framer-motion/dist/es/render/dom/create-visual-element.mjs
var createDomVisualElement = (Component3, options) =>
  isSVGComponent(Component3)
    ? new SVGVisualElement(options)
    : new HTMLVisualElement(options, {
        allowProjection: Component3 !== Fragment3,
      });

// node_modules/framer-motion/dist/es/render/components/motion/create.mjs
var createMotionComponent = /* @__PURE__ */ createMotionComponentFactory(
  {
    ...animations,
    ...gestureAnimations,
    ...drag,
    ...layout,
  },
  createDomVisualElement
);

// node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs
var motion = /* @__PURE__ */ createDOMMotionComponentProxy(createMotionComponent);

// node_modules/framer-motion/dist/es/value/use-motion-value.mjs
import { useContext as useContext11, useState as useState5, useEffect as useEffect7 } from 'react';
function useMotionValue(initial) {
  let value = useConstant(() => motionValue(initial)),
    { isStatic } = useContext11(MotionConfigContext);
  if (isStatic) {
    let [, setLatest] = useState5(initial);
    useEffect7(() => value.on('change', setLatest), []);
  }
  return value;
}

// node_modules/framer-motion/dist/es/value/use-combine-values.mjs
function useCombineMotionValues(values, combineValues) {
  let value = useMotionValue(combineValues()),
    updateValue = () => value.set(combineValues());
  return (
    updateValue(),
    useIsomorphicLayoutEffect(() => {
      let scheduleUpdate = () => frame.preRender(updateValue, !1, !0),
        subscriptions = values.map(v => v.on('change', scheduleUpdate));
      return () => {
        subscriptions.forEach(unsubscribe => unsubscribe()), cancelFrame(updateValue);
      };
    }),
    value
  );
}

// node_modules/framer-motion/dist/es/value/use-motion-template.mjs
function useMotionTemplate(fragments, ...values) {
  let numFragments = fragments.length;
  function buildValue() {
    let output = '';
    for (let i = 0; i < numFragments; i++) {
      output += fragments[i];
      let value = values[i];
      value && (output += isMotionValue(value) ? value.get() : value);
    }
    return output;
  }
  return useCombineMotionValues(values.filter(isMotionValue), buildValue);
}

// node_modules/framer-motion/dist/es/utils/use-animation-frame.mjs
import { useRef as useRef5, useContext as useContext12, useEffect as useEffect8 } from 'react';
function useAnimationFrame(callback) {
  let initialTimestamp = useRef5(0),
    { isStatic } = useContext12(MotionConfigContext);
  useEffect8(() => {
    if (isStatic) return;
    let provideTimeSinceStart = ({ timestamp, delta }) => {
      initialTimestamp.current || (initialTimestamp.current = timestamp),
        callback(timestamp - initialTimestamp.current, delta);
    };
    return frame.update(provideTimeSinceStart, !0), () => cancelFrame(provideTimeSinceStart);
  }, [callback]);
}

// node_modules/framer-motion/dist/es/utils/transform.mjs
var isCustomValueType = v => v && typeof v == 'object' && v.mix,
  getMixer2 = v => (isCustomValueType(v) ? v.mix : void 0);
function transform(...args) {
  let useImmediate = !Array.isArray(args[0]),
    argOffset = useImmediate ? 0 : -1,
    inputValue = args[0 + argOffset],
    inputRange = args[1 + argOffset],
    outputRange = args[2 + argOffset],
    options = args[3 + argOffset],
    interpolator = interpolate(inputRange, outputRange, {
      mixer: getMixer2(outputRange[0]),
      ...options,
    });
  return useImmediate ? interpolator(inputValue) : interpolator;
}

// node_modules/framer-motion/dist/es/value/use-computed.mjs
function useComputed(compute) {
  (collectMotionValues.current = []), compute();
  let value = useCombineMotionValues(collectMotionValues.current, compute);
  return (collectMotionValues.current = void 0), value;
}

// node_modules/framer-motion/dist/es/value/use-transform.mjs
function useTransform(input, inputRangeOrTransformer, outputRange, options) {
  if (typeof input == 'function') return useComputed(input);
  let transformer =
    typeof inputRangeOrTransformer == 'function'
      ? inputRangeOrTransformer
      : transform(inputRangeOrTransformer, outputRange, options);
  return Array.isArray(input)
    ? useListTransform(input, transformer)
    : useListTransform([input], ([latest]) => transformer(latest));
}
function useListTransform(values, transformer) {
  let latest = useConstant(() => []);
  return useCombineMotionValues(values, () => {
    latest.length = 0;
    let numValues = values.length;
    for (let i = 0; i < numValues; i++) latest[i] = values[i].get();
    return transformer(latest);
  });
}

// node_modules/framer-motion/dist/es/index.mjs
import { isDragActive } from 'motion-dom';
import { invariant as invariant7, noop as noop10, progress as progress5 } from 'motion-utils';

// app/components/adult-content-modal.tsx
import { jsx as jsx20, jsxs as jsxs10 } from 'react/jsx-runtime';
function AdultContentModal({ isOpen, onClose, onConfirm, siteName }) {
  return /* @__PURE__ */ jsx20(Dialog, {
    open: isOpen,
    onOpenChange: onClose,
    children: /* @__PURE__ */ jsxs10(DialogContent, {
      className: 'overflow-hidden border-0 p-0 sm:max-w-[425px]',
      onPointerDownOutside: onClose,
      children: [
        /* @__PURE__ */ jsxs10('div', {
          className: 'relative',
          children: [
            /* @__PURE__ */ jsx20('div', { className: 'absolute right-4 top-4 z-10' }),
            /* @__PURE__ */ jsx20('div', {
              className: 'bg-gradient-to-br from-destructive/20 to-destructive/10 p-6',
              children: /* @__PURE__ */ jsxs10(motion.div, {
                initial: { scale: 0.9, opacity: 0 },
                animate: { scale: 1, opacity: 1 },
                transition: { duration: 0.2 },
                className: 'flex items-center gap-3',
                children: [
                  /* @__PURE__ */ jsx20('div', {
                    className: 'rounded-full bg-destructive/20 p-2 ring-2 ring-destructive/20',
                    children: /* @__PURE__ */ jsx20(AlertTriangle, {
                      className: 'h-5 w-5 text-destructive',
                    }),
                  }),
                  /* @__PURE__ */ jsx20(DialogTitle, {
                    className: 'font-bold text-destructive',
                    children: 'Adult Content Warning',
                  }),
                ],
              }),
            }),
            /* @__PURE__ */ jsx20('div', {
              className: 'p-6',
              children: /* @__PURE__ */ jsxs10(motion.div, {
                initial: { y: 20, opacity: 0 },
                animate: { y: 0, opacity: 1 },
                transition: { delay: 0.1, duration: 0.2 },
                className: 'flex items-start gap-4',
                children: [
                  /* @__PURE__ */ jsx20('div', {
                    className: 'rounded-full bg-primary/10 p-2 ring-2 ring-primary/20',
                    children: /* @__PURE__ */ jsx20(Shield, { className: 'h-5 w-5 text-primary' }),
                  }),
                  /* @__PURE__ */ jsxs10('div', {
                    className: 'space-y-2',
                    children: [
                      /* @__PURE__ */ jsxs10(DialogDescription, {
                        className: 'text-base',
                        children: [
                          /* @__PURE__ */ jsx20('span', {
                            className: 'font-medium text-foreground',
                            children: siteName,
                          }),
                          ' contains adult content. Are you sure you want to proceed?',
                        ],
                      }),
                      /* @__PURE__ */ jsxs10('div', {
                        className: 'flex items-center gap-2 text-sm text-muted-foreground',
                        children: [
                          /* @__PURE__ */ jsx20(Lock, { className: 'h-4 w-4' }),
                          /* @__PURE__ */ jsx20('span', {
                            children: 'This content is restricted to adults only',
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
          ],
        }),
        /* @__PURE__ */ jsx20(DialogFooter, {
          className: 'p-6 pt-0',
          children: /* @__PURE__ */ jsxs10(motion.div, {
            initial: { y: 20, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            transition: { delay: 0.2, duration: 0.2 },
            className: 'flex w-full gap-3',
            children: [
              /* @__PURE__ */ jsx20(Button, {
                variant: 'outline',
                onClick: onClose,
                className: 'flex-1',
                children: 'Cancel',
              }),
              /* @__PURE__ */ jsx20(Button, {
                onClick: onConfirm,
                className:
                  'flex-1 bg-destructive text-destructive-foreground hover:bg-destructive/90',
                children: 'Proceed',
              }),
            ],
          }),
        }),
      ],
    }),
  });
}

// app/routes/projects.tsx
import { jsx as jsx21, jsxs as jsxs11 } from 'react/jsx-runtime';
var meta2 = () => [
  { title: 'Projects | Paul Ionut Doros' },
  {
    name: 'description',
    content: 'A showcase of my development projects and work as a Frontend Developer',
  },
];
function Projects() {
  let [showAdultWarning, setShowAdultWarning] = useState6(!1),
    [pendingUrl, setPendingUrl] = useState6(null),
    [pendingSiteName, setPendingSiteName] = useState6(''),
    handleAdultLinkClick = (url, siteName) => e => {
      e.preventDefault(), setPendingUrl(url), setPendingSiteName(siteName), setShowAdultWarning(!0);
    },
    handleConfirmAdultContent = () => {
      pendingUrl &&
        (window.open(pendingUrl, '_blank'),
        setShowAdultWarning(!1),
        setPendingUrl(null),
        setPendingSiteName(''));
    };
  return /* @__PURE__ */ jsx21(Layout, {
    children: /* @__PURE__ */ jsxs11('section', {
      className: 'py-20',
      children: [
        /* @__PURE__ */ jsxs11('div', {
          className: 'container mx-auto px-4',
          children: [
            /* @__PURE__ */ jsxs11('div', {
              className: 'mb-16 flex flex-col items-center text-center',
              children: [
                /* @__PURE__ */ jsx21(Badge, { className: 'mb-4', children: 'Portfolio' }),
                /* @__PURE__ */ jsx21('h1', {
                  className: 'mb-6 text-3xl font-bold md:text-5xl',
                  children: 'My Projects',
                }),
                /* @__PURE__ */ jsx21(Separator, { className: 'mb-6 w-24' }),
                /* @__PURE__ */ jsx21('p', {
                  className: 'max-w-2xl text-muted-foreground',
                  children:
                    'A comprehensive collection of my development work, showcasing a variety of technologies and problem-solving approaches.',
                }),
              ],
            }),
            /* @__PURE__ */ jsx21('div', {
              className: 'grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3',
              children: [
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
                  isAdult: !1,
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
                  isAdult: !0,
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
                  isAdult: !0,
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
                  isAdult: !1,
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
                  isAdult: !1,
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
                  isAdult: !1,
                },
              ].map(project =>
                /* @__PURE__ */ jsxs11(
                  Card,
                  {
                    className: 'overflow-hidden transition-shadow hover:shadow-lg',
                    children: [
                      /* @__PURE__ */ jsx21('div', {
                        className: 'relative aspect-video bg-muted',
                        children: /* @__PURE__ */ jsx21('div', {
                          className: 'absolute inset-0 flex items-center justify-center',
                          children: /* @__PURE__ */ jsx21('img', {
                            src: project.image,
                            alt: project.title,
                            className: `h-full w-full object-cover ${project.isAdult ? 'blur-xl' : ''}`,
                          }),
                        }),
                      }),
                      /* @__PURE__ */ jsxs11(CardHeader, {
                        children: [
                          /* @__PURE__ */ jsx21(CardTitle, { children: project.title }),
                          /* @__PURE__ */ jsx21(CardDescription, { children: project.description }),
                        ],
                      }),
                      /* @__PURE__ */ jsxs11(CardContent, {
                        children: [
                          /* @__PURE__ */ jsx21('p', {
                            className: 'mb-4 text-sm text-muted-foreground',
                            children: project.content,
                          }),
                          /* @__PURE__ */ jsxs11('div', {
                            className: 'mb-4 space-y-2',
                            children: [
                              /* @__PURE__ */ jsx21('h4', {
                                className: 'text-sm font-medium',
                                children: 'Key Features:',
                              }),
                              /* @__PURE__ */ jsx21('ul', {
                                className: 'space-y-1 text-sm text-muted-foreground',
                                children: project.keyFeatures.map((feature, index) =>
                                  /* @__PURE__ */ jsxs11(
                                    'li',
                                    { children: ['\u2022 ', feature] },
                                    index
                                  )
                                ),
                              }),
                            ],
                          }),
                          /* @__PURE__ */ jsx21('div', {
                            className: 'flex flex-wrap gap-2',
                            children: project.technologies.map(tech =>
                              /* @__PURE__ */ jsx21(
                                Badge,
                                { variant: 'secondary', children: tech },
                                tech
                              )
                            ),
                          }),
                        ],
                      }),
                      /* @__PURE__ */ jsxs11(CardFooter, {
                        className: 'flex justify-between',
                        children: [
                          /* @__PURE__ */ jsx21(Button, {
                            variant: 'outline',
                            size: 'sm',
                            asChild: !0,
                            children: /* @__PURE__ */ jsxs11('a', {
                              href: project.codeUrl,
                              target: '_blank',
                              rel: 'noopener noreferrer',
                              children: [
                                /* @__PURE__ */ jsx21(Github2, { className: 'mr-2 h-4 w-4' }),
                                'Code',
                              ],
                            }),
                          }),
                          /* @__PURE__ */ jsx21(Button, {
                            size: 'sm',
                            asChild: !0,
                            onClick: project.isAdult
                              ? handleAdultLinkClick(project.demoUrl, project.title)
                              : void 0,
                            children: /* @__PURE__ */ jsxs11('a', {
                              href: project.isAdult ? '#' : project.demoUrl,
                              target: '_blank',
                              rel: 'noopener noreferrer',
                              children: [
                                /* @__PURE__ */ jsx21(ExternalLink, { className: 'mr-2 h-4 w-4' }),
                                'Demo',
                              ],
                            }),
                          }),
                        ],
                      }),
                    ],
                  },
                  project.id
                )
              ),
            }),
            /* @__PURE__ */ jsx21('div', {
              className: 'mt-12 flex justify-center',
              children: /* @__PURE__ */ jsx21(Button, {
                asChild: !0,
                children: /* @__PURE__ */ jsx21('a', {
                  href: '/#contact',
                  children: "Let's Work Together",
                }),
              }),
            }),
          ],
        }),
        /* @__PURE__ */ jsx21(AdultContentModal, {
          isOpen: showAdultWarning,
          onClose: () => {
            setShowAdultWarning(!1), setPendingUrl(null), setPendingSiteName('');
          },
          onConfirm: handleConfirmAdultContent,
          siteName: pendingSiteName,
        }),
      ],
    }),
  });
}

// app/routes/compare.tsx
var compare_exports = {};
__export(compare_exports, {
  default: () => ComparePage,
  loader: () => loader2,
  meta: () => meta3,
});
import { json as json2 } from '@remix-run/node';

// app/components/ui/compare.tsx
import React8, {
  useState as useState8,
  useEffect as useEffect10,
  useRef as useRef7,
  useCallback as useCallback4,
} from 'react';

// app/components/ui/sparkles.tsx
import { useEffect as useEffect9, useRef as useRef6, useState as useState7 } from 'react';
import { createNoise3D } from 'simplex-noise';
import { jsx as jsx22 } from 'react/jsx-runtime';
var SparklesCore = ({
  id: id3,
  background,
  minSize,
  maxSize,
  speed,
  particleColor,
  className,
  particleDensity,
}) => {
  let canvasRef = useRef6(null),
    [noise, setNoise] = useState7(),
    [particles, setParticles] = useState7([]);
  return (
    useEffect9(() => {
      setNoise(createNoise3D());
    }, []),
    useEffect9(() => {
      if (!noise) return;
      let canvas = canvasRef.current;
      if (!canvas || !canvas.getContext('2d')) return;
      let resizeCanvas = () => {
          canvas &&
            canvas.parentElement &&
            ((canvas.width = canvas.parentElement.offsetWidth),
            (canvas.height = canvas.parentElement.offsetHeight),
            initParticles());
        },
        initParticles = () => {
          let particleCount = Math.floor(
              ((canvas.width * canvas.height) / 2073600) * (particleDensity || 50)
            ),
            newParticles = [];
          for (let i = 0; i < particleCount; i++) {
            let x = Math.random() * canvas.width,
              y = Math.random() * canvas.height,
              vx = 0,
              vy = 0,
              radius = Math.random() * (maxSize || 2) + (minSize || 0.5);
            newParticles.push({
              x,
              y,
              vx,
              vy,
              radius,
              originX: x,
              originY: y,
            });
          }
          setParticles(newParticles);
        };
      return (
        resizeCanvas(),
        window.addEventListener('resize', resizeCanvas),
        () => {
          window.removeEventListener('resize', resizeCanvas);
        }
      );
    }, [noise, particleDensity, minSize, maxSize]),
    useEffect9(() => {
      if (!noise || particles.length === 0) return;
      let canvas = canvasRef.current;
      if (!canvas) return;
      let ctx = canvas.getContext('2d');
      if (!ctx) return;
      let animate = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height),
            background &&
              ((ctx.fillStyle = background), ctx.fillRect(0, 0, canvas.width, canvas.height)),
            particles.forEach((particle, i) => {
              let n = noise(
                  particle.originX * 5e-3,
                  particle.originY * 5e-3,
                  performance.now() * 5e-5 * (speed || 1)
                ),
                maxSpeed = 2 - particle.radius * 0.5;
              (particle.vx = Math.cos(n * Math.PI * 2) * maxSpeed),
                (particle.vy = Math.sin(n * Math.PI * 2) * maxSpeed),
                (particle.x += particle.vx),
                (particle.y += particle.vy),
                (particle.x < 0 ||
                  particle.x > canvas.width ||
                  particle.y < 0 ||
                  particle.y > canvas.height) &&
                  ((particle.x = particle.originX), (particle.y = particle.originY)),
                ctx.beginPath(),
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2),
                (ctx.fillStyle = particleColor || '#FFFFFF'),
                ctx.fill();
            }),
            requestAnimationFrame(animate);
        },
        animationId = requestAnimationFrame(animate);
      return () => {
        cancelAnimationFrame(animationId);
      };
    }, [background, noise, particles, particleColor, speed]),
    /* @__PURE__ */ jsx22('canvas', { ref: canvasRef, id: id3, className })
  );
};

// app/components/ui/compare.tsx
import { MoreVertical } from 'lucide-react';
import { jsx as jsx23, jsxs as jsxs12 } from 'react/jsx-runtime';
var Compare = ({
    firstContent,
    secondContent,
    className,
    firstContentClassName,
    secondContentClassName,
    initialSliderPercentage = 50,
    slideMode = 'drag',
    showHandlebar = !0,
    autoplay = !1,
    autoplayDuration = 5e3,
    interactive = !0,
  }) => {
    let [width, setWidth] = useState8(0),
      [sliderPercentage, setSliderPercentage] = useState8(initialSliderPercentage),
      [dragging, setDragging] = useState8(!1),
      [hovering, setHovering] = useState8(!1),
      [autoplaying, setAutoplaying] = useState8(autoplay),
      [sparklesDisabled, setSparklesDisabled] = useState8(!1),
      sliderRef = useRef7(null),
      sliderWidth = width * (sliderPercentage / 100),
      autoplayRef = useRef7(null),
      startAutoplay = useCallback4(() => {
        if (!autoplay) return;
        let startTime = Date.now(),
          animate = () => {
            let progress6 = ((Date.now() - startTime) % (autoplayDuration * 2)) / autoplayDuration,
              percentage = progress6 <= 1 ? progress6 * 100 : (2 - progress6) * 100;
            setSliderPercentage(percentage), (autoplayRef.current = setTimeout(animate, 16));
          };
        animate();
      }, [autoplay, autoplayDuration]),
      stopAutoplay = useCallback4(() => {
        autoplayRef.current && (clearTimeout(autoplayRef.current), (autoplayRef.current = null));
      }, []);
    useEffect10(() => (startAutoplay(), () => stopAutoplay()), [startAutoplay, stopAutoplay]),
      useEffect10(() => {
        setSliderPercentage(initialSliderPercentage);
      }, [initialSliderPercentage]),
      useEffect10(() => {
        let handleResize = () => {
          sliderRef.current && setWidth(sliderRef.current.offsetWidth);
        };
        return (
          handleResize(),
          window.addEventListener('resize', handleResize),
          () => window.removeEventListener('resize', handleResize)
        );
      }, []),
      useEffect10(() => {
        if (!autoplaying) return;
        let interval = setInterval(() => {
          setSliderPercentage(prev =>
            prev >= 95 ? 5 : prev <= 5 ? 95 : prev > 50 ? prev + 1 : prev - 1
          );
        }, 30);
        return () => clearInterval(interval);
      }, [autoplaying]);
    let handleMouseDown = e => {
        if (
          interactive &&
          (setDragging(!0),
          setSparklesDisabled(!0),
          autoplaying && setAutoplaying(!1),
          sliderRef.current)
        ) {
          let rect = sliderRef.current.getBoundingClientRect(),
            x = e.clientX - rect.left;
          setSliderPercentage((x / width) * 100);
        }
      },
      handleMouseMove = e => {
        if (interactive) {
          if (dragging && sliderRef.current) {
            let rect = sliderRef.current.getBoundingClientRect(),
              x = e.clientX - rect.left;
            setSliderPercentage(Math.max(0, Math.min(100, (x / width) * 100)));
          } else if (slideMode === 'hover' && sliderRef.current && hovering) {
            let rect = sliderRef.current.getBoundingClientRect(),
              x = e.clientX - rect.left;
            setSliderPercentage(Math.max(0, Math.min(100, (x / width) * 100)));
          }
        }
      },
      handleMouseUp = () => {
        interactive &&
          (setDragging(!1),
          setTimeout(() => {
            setSparklesDisabled(!1);
          }, 500));
      },
      handleMouseEnter = () => {
        interactive && (setHovering(!0), autoplaying && setAutoplaying(!1));
      },
      handleMouseLeave = () => {
        interactive &&
          (setHovering(!1),
          setDragging(!1),
          autoplay && setAutoplaying(!0),
          setTimeout(() => {
            setSparklesDisabled(!1);
          }, 500));
      },
      handleTouchStart = e => {
        if (
          interactive &&
          (setDragging(!0),
          setSparklesDisabled(!0),
          autoplaying && setAutoplaying(!1),
          sliderRef.current)
        ) {
          let rect = sliderRef.current.getBoundingClientRect(),
            x = e.touches[0].clientX - rect.left;
          setSliderPercentage((x / width) * 100);
        }
      },
      handleTouchMove = e => {
        if (interactive && dragging && sliderRef.current) {
          let rect = sliderRef.current.getBoundingClientRect(),
            x = e.touches[0].clientX - rect.left;
          setSliderPercentage(Math.max(0, Math.min(100, (x / width) * 100)));
        }
      },
      handleTouchEnd = () => {
        interactive &&
          (setDragging(!1),
          setTimeout(() => {
            setSparklesDisabled(!1);
          }, 500));
      };
    return (
      useEffect10(() => {
        let preventScroll = e => {
            dragging && e.preventDefault();
          },
          options = { passive: !1 };
        return (
          document.addEventListener('touchmove', preventScroll, options),
          () => document.removeEventListener('touchmove', preventScroll)
        );
      }, [dragging]),
      /* @__PURE__ */ jsxs12('div', {
        ref: sliderRef,
        className: `relative h-full w-full overflow-hidden ${className} ${dragging || (slideMode === 'hover' && hovering) ? 'cursor-col-resize' : interactive ? 'cursor-pointer' : 'cursor-default'}`,
        onMouseDown: handleMouseDown,
        onMouseMove: handleMouseMove,
        onMouseUp: handleMouseUp,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
        children: [
          /* @__PURE__ */ jsx23('div', {
            className: 'absolute inset-0 h-full w-full overflow-hidden',
            children: /* @__PURE__ */ jsx23(AnimatePresence, {
              initial: !1,
              children: firstContent
                ? /* @__PURE__ */ jsx23(motion.div, {
                    className: cn(
                      'absolute inset-0 z-20 h-full w-full flex-shrink-0 select-none overflow-hidden',
                      firstContentClassName
                    ),
                    style: {
                      clipPath: `inset(0 ${100 - sliderPercentage}% 0 0)`,
                    },
                    transition: { duration: 0 },
                    children: /* @__PURE__ */ jsx23('div', {
                      className: cn(
                        'absolute inset-0 z-20 h-full w-full flex-shrink-0',
                        firstContentClassName
                      ),
                      children: firstContent,
                    }),
                  })
                : null,
            }),
          }),
          /* @__PURE__ */ jsx23('div', {
            className: 'absolute inset-0 h-full w-full overflow-hidden',
            style: {
              clipPath: `inset(0 0 0 ${sliderPercentage}%)`,
            },
            children: /* @__PURE__ */ jsx23(AnimatePresence, {
              initial: !1,
              children: secondContent
                ? /* @__PURE__ */ jsx23(motion.div, {
                    className: cn(
                      'absolute inset-0 z-[19] h-full w-full select-none',
                      secondContentClassName
                    ),
                    children: secondContent,
                  })
                : null,
            }),
          }),
          showHandlebar &&
            /* @__PURE__ */ jsx23('div', {
              className: `absolute top-0 z-20 h-full w-0.5 cursor-col-resize bg-background shadow-[0_0_10px_2px_rgba(0,0,0,0.3)] transition-none ${interactive ? '' : 'pointer-events-none'}`,
              style: { left: `${sliderPercentage}%` },
              children: /* @__PURE__ */ jsxs12('div', {
                className: `absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background shadow-md ${interactive ? 'hover:scale-110' : ''}`,
                children: [
                  !sparklesDisabled &&
                    /* @__PURE__ */ jsx23(MemoizedSparklesCore, {
                      background: 'transparent',
                      minSize: 0.4,
                      maxSize: 1,
                      particleDensity: 1200,
                      className: 'h-full w-full',
                      particleColor: '#FFFFFF',
                    }),
                  /* @__PURE__ */ jsx23('div', {
                    className: 'absolute inset-0 flex items-center justify-center',
                    children: /* @__PURE__ */ jsx23(MoreVertical, {
                      className: 'h-3 w-3 text-muted-foreground',
                    }),
                  }),
                ],
              }),
            }),
        ],
      })
    );
  },
  MemoizedSparklesCore = React8.memo(SparklesCore);

// app/components/demos/compare-demo.tsx
import { jsx as jsx24 } from 'react/jsx-runtime';
function CompareDemo() {
  return /* @__PURE__ */ jsx24('div', {
    className:
      'rounded-3xl border border-neutral-200 bg-neutral-100 p-4 px-4 dark:border-neutral-800 dark:bg-neutral-900',
    children: /* @__PURE__ */ jsx24(Compare, {
      firstContent: /* @__PURE__ */ jsx24('img', {
        src: 'https://images.unsplash.com/photo-1682687218147-9806132dc697?q=80&w=1000',
        alt: 'First image',
        className: 'h-full w-full object-cover',
        draggable: !1,
      }),
      secondContent: /* @__PURE__ */ jsx24('img', {
        src: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=1000',
        alt: 'Second image',
        className: 'h-full w-full object-cover',
        draggable: !1,
      }),
      firstContentClassName: 'object-cover object-center',
      secondContentClassName: 'object-cover object-center',
      className: 'h-[250px] w-[200px] overflow-hidden rounded-xl md:h-[500px] md:w-[500px]',
      slideMode: 'hover',
    }),
  });
}

// app/components/sections/classic-hero.tsx
import { Download } from 'lucide-react';
import { jsx as jsx25, jsxs as jsxs13 } from 'react/jsx-runtime';
function ClassicHero() {
  return /* @__PURE__ */ jsxs13('section', {
    id: 'hero',
    className: 'relative overflow-hidden',
    children: [
      /* @__PURE__ */ jsx25('div', {
        className: 'bg-grid-small-black/[0.05] absolute inset-0 -z-10',
      }),
      /* @__PURE__ */ jsx25('div', {
        className:
          'absolute inset-0 -z-10 bg-gradient-to-b from-background/20 via-background/60 to-background',
      }),
      /* @__PURE__ */ jsxs13('div', {
        className:
          'container mx-auto flex flex-col items-center justify-center px-4 py-20 text-center md:py-32',
        children: [
          /* @__PURE__ */ jsx25(Badge, { className: 'mb-4', children: 'Available for Work' }),
          /* @__PURE__ */ jsx25('h1', {
            className: 'mb-6 text-4xl font-bold md:text-6xl',
            children: 'Paul Ionut Doros',
          }),
          /* @__PURE__ */ jsx25('p', {
            className: 'mb-2 text-2xl font-medium',
            children: 'Frontend Developer',
          }),
          /* @__PURE__ */ jsx25('p', {
            className: 'mb-10 max-w-2xl text-xl text-muted-foreground',
            children:
              "I build modern, responsive web applications with React, Remix, and TypeScript. Let's work together to bring your ideas to life.",
          }),
          /* @__PURE__ */ jsxs13('div', {
            className: 'flex flex-wrap justify-center gap-4',
            children: [
              /* @__PURE__ */ jsx25(Button, {
                asChild: !0,
                size: 'lg',
                children: /* @__PURE__ */ jsx25('a', { href: '/#contact', children: 'Contact Me' }),
              }),
              /* @__PURE__ */ jsx25(Button, {
                variant: 'outline',
                size: 'lg',
                asChild: !0,
                children: /* @__PURE__ */ jsxs13('a', {
                  href: '/resume.pdf',
                  download: !0,
                  children: [
                    /* @__PURE__ */ jsx25(Download, { className: 'mr-2 h-4 w-4' }),
                    'Download Resume',
                  ],
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

// app/components/ui/moving-border.tsx
import { useRef as useRef8 } from 'react';
import { Fragment as Fragment4, jsx as jsx26, jsxs as jsxs14 } from 'react/jsx-runtime';
function Button2({
  borderRadius = '1.75rem',
  children,
  as: Component3 = 'button',
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}) {
  return /* @__PURE__ */ jsxs14(Component3, {
    className: cn(
      'relative h-16 w-40  overflow-hidden bg-transparent p-[1px] text-xl ',
      containerClassName
    ),
    style: {
      borderRadius,
    },
    ...otherProps,
    children: [
      /* @__PURE__ */ jsx26('div', {
        className: 'absolute inset-0',
        style: { borderRadius: `calc(${borderRadius} * 0.96)` },
        children: /* @__PURE__ */ jsx26(MovingBorder, {
          duration,
          rx: '30%',
          ry: '30%',
          children: /* @__PURE__ */ jsx26('div', {
            className: cn(
              ' bg-[radial-gradient(var(--sky-500)_40%,transparent_60%)] opacity-[0.8]',
              borderClassName
            ),
          }),
        }),
      }),
      /* @__PURE__ */ jsx26('div', {
        className: cn(
          'relative flex h-full w-full items-center justify-center border border-slate-800 bg-slate-900/[0.8] text-sm text-white antialiased backdrop-blur-xl',
          className
        ),
        style: {
          borderRadius: `calc(${borderRadius} * 0.96)`,
        },
        children,
      }),
    ],
  });
}
var MovingBorder = ({ children, duration = 2e3, rx, ry, ...otherProps }) => {
  let pathRef = useRef8(),
    progress6 = useMotionValue(0);
  useAnimationFrame(time2 => {
    let length = pathRef.current?.getTotalLength();
    if (length) {
      let pxPerMillisecond = length / duration;
      progress6.set((time2 * pxPerMillisecond) % length);
    }
  });
  let x = useTransform(progress6, val => pathRef.current?.getPointAtLength(val).x),
    y = useTransform(progress6, val => pathRef.current?.getPointAtLength(val).y),
    transform2 = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;
  return /* @__PURE__ */ jsxs14(Fragment4, {
    children: [
      /* @__PURE__ */ jsx26('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        preserveAspectRatio: 'none',
        className: 'absolute h-full w-full',
        width: '100%',
        height: '100%',
        ...otherProps,
        children: /* @__PURE__ */ jsx26('rect', {
          fill: 'none',
          width: '100%',
          height: '100%',
          rx,
          ry,
          ref: pathRef,
        }),
      }),
      /* @__PURE__ */ jsx26(motion.div, {
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'inline-block',
          transform: transform2,
        },
        children,
      }),
    ],
  });
};

// app/components/sections/animated-hero.tsx
import { jsx as jsx27, jsxs as jsxs15 } from 'react/jsx-runtime';
function AnimatedHero() {
  return /* @__PURE__ */ jsxs15('section', {
    id: 'hero',
    className: 'relative overflow-hidden',
    children: [
      /* @__PURE__ */ jsx27('div', {
        className: 'bg-grid-small-black/[0.05] absolute inset-0 -z-10',
      }),
      /* @__PURE__ */ jsx27('div', {
        className:
          'absolute inset-0 -z-10 bg-gradient-to-b from-background/20 via-background/60 to-background',
      }),
      /* @__PURE__ */ jsxs15('div', {
        className:
          'container mx-auto flex flex-col items-center justify-center px-4 py-20 text-center md:py-32',
        children: [
          /* @__PURE__ */ jsx27(Badge, { className: 'mb-4', children: 'Available for Work' }),
          /* @__PURE__ */ jsx27('h1', {
            className: 'mb-6 text-4xl font-bold md:text-6xl',
            children: 'Paul Ionut Doros',
          }),
          /* @__PURE__ */ jsx27('p', {
            className: 'mb-2 text-2xl font-medium',
            children: 'Frontend Developer',
          }),
          /* @__PURE__ */ jsx27('p', {
            className: 'mb-10 max-w-2xl text-xl text-muted-foreground',
            children:
              "I build modern, responsive web applications with React, Remix, and TypeScript. Let's work together to bring your ideas to life.",
          }),
          /* @__PURE__ */ jsxs15('div', {
            className: 'flex flex-wrap justify-center gap-4',
            children: [
              /* @__PURE__ */ jsx27(Button2, {
                asChild: !0,
                size: 'lg',
                children: /* @__PURE__ */ jsx27('a', { href: '/#contact', children: 'Contact Me' }),
              }),
              /* @__PURE__ */ jsx27(Button2, {
                borderRadius: '1.75rem',
                className:
                  'flex flex-row items-center justify-center border-neutral-200 bg-white p-2 text-black dark:border-slate-800 dark:bg-slate-900 dark:text-white',
                children: /* @__PURE__ */ jsx27('a', {
                  href: '/resume.pdf',
                  download: !0,
                  children: 'Download Resume',
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

// app/components/sections/classic-about.tsx
import { jsx as jsx28, jsxs as jsxs16 } from 'react/jsx-runtime';
function ClassicAbout() {
  return /* @__PURE__ */ jsx28('section', {
    id: 'about',
    className: 'bg-muted/50 py-20',
    children: /* @__PURE__ */ jsxs16('div', {
      className: 'container mx-auto px-4',
      children: [
        /* @__PURE__ */ jsxs16('div', {
          className: 'mb-16 flex flex-col items-center text-center',
          children: [
            /* @__PURE__ */ jsx28(Badge, { className: 'mb-4', children: 'About Me' }),
            /* @__PURE__ */ jsx28('h2', {
              className: 'mb-6 text-3xl font-bold md:text-4xl',
              children: 'My Background',
            }),
            /* @__PURE__ */ jsx28(Separator, { className: 'mb-6 w-24' }),
            /* @__PURE__ */ jsx28('p', {
              className: 'max-w-2xl text-muted-foreground',
              children:
                'Learn more about my journey, experience, and what drives me as a developer.',
            }),
          ],
        }),
        /* @__PURE__ */ jsxs16('div', {
          className: 'flex flex-col items-center justify-center gap-12',
          children: [
            /* @__PURE__ */ jsxs16('div', {
              className: 'relative h-64 w-64 overflow-hidden rounded-xl border',
              children: [
                /* @__PURE__ */ jsx28('div', {
                  className: 'absolute inset-0 bg-gradient-to-tr from-primary/20 to-primary/5',
                }),
                /* @__PURE__ */ jsx28('div', {
                  className: 'absolute inset-0 flex items-center justify-center',
                  children: /* @__PURE__ */ jsx28('img', {
                    src: '/img.png',
                    alt: 'Paul Ionut Doros',
                    className: 'h-full w-full object-cover',
                  }),
                }),
              ],
            }),
            /* @__PURE__ */ jsxs16('div', {
              className: 'flex max-w-3xl flex-col justify-center text-center',
              children: [
                /* @__PURE__ */ jsx28('h3', {
                  className: 'mb-4 text-2xl font-bold',
                  children: "Hi, I'm Paul Ionut Doros",
                }),
                /* @__PURE__ */ jsx28('p', {
                  className: 'mb-6 text-muted-foreground',
                  children:
                    "As a front-end developer, I don't just write code I create solutions. Over the past couple of years, I've worked on a wide range of tasks, from building responsive, user-friendly features to troubleshooting complex issues. But what truly sets me apart is my adaptability and willingness to step outside of my role whenever necessary.",
                }),
                /* @__PURE__ */ jsxs16('div', {
                  className: 'mb-6 grid grid-cols-1 gap-6 md:grid-cols-2',
                  children: [
                    /* @__PURE__ */ jsxs16('div', {
                      className: 'space-y-2',
                      children: [
                        /* @__PURE__ */ jsx28('h4', {
                          className: 'font-semibold',
                          children: 'Frontend Development',
                        }),
                        /* @__PURE__ */ jsx28('p', {
                          className: 'text-sm text-muted-foreground',
                          children:
                            "My expertise lies in JavaScript/TypeScript, React, Remix, and React Native. I'm experienced in UI/UX improvements, implementing animations and transitions, and building reusable component libraries for optimized development workflows.",
                        }),
                      ],
                    }),
                    /* @__PURE__ */ jsxs16('div', {
                      className: 'space-y-2',
                      children: [
                        /* @__PURE__ */ jsx28('h4', {
                          className: 'font-semibold',
                          children: 'Mobile Development',
                        }),
                        /* @__PURE__ */ jsx28('p', {
                          className: 'text-sm text-muted-foreground',
                          children:
                            "I've developed cross-platform applications using React Native, optimizing for both iOS and Android. My experience includes app store deployment, performance optimization, and implementing responsive layouts.",
                        }),
                      ],
                    }),
                  ],
                }),
                /* @__PURE__ */ jsxs16('div', {
                  className: 'mt-8 flex flex-wrap items-center justify-center gap-4',
                  children: [
                    /* @__PURE__ */ jsx28(Button, {
                      asChild: !0,
                      children: /* @__PURE__ */ jsx28('a', {
                        href: '/#contact',
                        children: 'Get In Touch',
                      }),
                    }),
                    /* @__PURE__ */ jsx28(Button, {
                      variant: 'outline',
                      asChild: !0,
                      children: /* @__PURE__ */ jsx28('a', {
                        href: '/#projects',
                        children: 'View Projects',
                      }),
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
}

// app/components/sections/animated-about.tsx
import { jsx as jsx29, jsxs as jsxs17 } from 'react/jsx-runtime';
var fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  },
  staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };
function AnimatedAbout() {
  return /* @__PURE__ */ jsxs17('section', {
    id: 'about',
    className: 'py-20',
    children: [
      /* @__PURE__ */ jsxs17(motion.div, {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: !0, margin: '-100px' },
        transition: { duration: 0.6 },
        className: 'absolute inset-0 -z-10',
        children: [
          /* @__PURE__ */ jsx29('div', { className: 'absolute inset-0 -z-10 bg-muted/50' }),
          /* @__PURE__ */ jsx29(motion.div, {
            className:
              'absolute inset-0 -z-10 bg-gradient-to-tr from-primary/5 via-transparent to-primary/5',
            animate: {
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
            },
            transition: {
              duration: 20,
              repeat: 1 / 0,
              repeatType: 'reverse',
            },
          }),
        ],
      }),
      /* @__PURE__ */ jsxs17('div', {
        className: 'container mx-auto px-4',
        children: [
          /* @__PURE__ */ jsxs17(motion.div, {
            className: 'mb-16 flex flex-col items-center text-center',
            variants: staggerContainer,
            initial: 'hidden',
            whileInView: 'visible',
            viewport: { once: !0 },
            children: [
              /* @__PURE__ */ jsx29(motion.div, {
                variants: fadeInUp,
                children: /* @__PURE__ */ jsx29(Badge, { className: 'mb-4', children: 'About Me' }),
              }),
              /* @__PURE__ */ jsx29(motion.h2, {
                className: 'mb-6 text-3xl font-bold md:text-4xl',
                variants: fadeInUp,
                children: /* @__PURE__ */ jsx29('span', {
                  className:
                    'bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent',
                  children: 'My Background',
                }),
              }),
              /* @__PURE__ */ jsx29(motion.div, {
                variants: fadeInUp,
                children: /* @__PURE__ */ jsx29(Separator, { className: 'mb-6 w-24' }),
              }),
              /* @__PURE__ */ jsx29(motion.p, {
                className: 'max-w-2xl text-muted-foreground',
                variants: fadeInUp,
                children:
                  'Learn more about my journey, experience, and what drives me as a developer.',
              }),
            ],
          }),
          /* @__PURE__ */ jsxs17('div', {
            className: 'flex flex-col items-center justify-center gap-12',
            children: [
              /* @__PURE__ */ jsxs17(motion.div, {
                className: 'relative h-64 w-64 overflow-hidden rounded-xl border',
                initial: { opacity: 0, scale: 0.8 },
                whileInView: { opacity: 1, scale: 1 },
                viewport: { once: !0 },
                transition: {
                  type: 'spring',
                  stiffness: 100,
                  damping: 20,
                  delay: 0.2,
                },
                children: [
                  /* @__PURE__ */ jsx29(motion.div, {
                    className: 'absolute inset-0 bg-gradient-to-tr from-primary/20 to-primary/5',
                    animate: {
                      opacity: [0.6, 0.8, 0.6],
                      rotate: [0, 3, 0],
                    },
                    transition: {
                      duration: 5,
                      repeat: 1 / 0,
                      repeatType: 'reverse',
                    },
                  }),
                  /* @__PURE__ */ jsx29('div', {
                    className: 'absolute inset-0 flex items-center justify-center',
                    children: /* @__PURE__ */ jsx29(motion.img, {
                      src: '/img.png',
                      alt: 'Paul Ionut Doros',
                      className: 'h-full w-full object-cover',
                      whileHover: { scale: 1.05 },
                      transition: { duration: 0.3 },
                    }),
                  }),
                ],
              }),
              /* @__PURE__ */ jsxs17(motion.div, {
                className: 'flex max-w-3xl flex-col justify-center text-center',
                variants: staggerContainer,
                initial: 'hidden',
                whileInView: 'visible',
                viewport: { once: !0 },
                children: [
                  /* @__PURE__ */ jsx29(motion.h3, {
                    className: 'mb-4 text-2xl font-bold',
                    variants: fadeInUp,
                    children: "Hi, I'm Paul Ionut Doros",
                  }),
                  /* @__PURE__ */ jsx29(motion.p, {
                    className: 'mb-6 text-muted-foreground',
                    variants: fadeInUp,
                    children:
                      "As a front-end developer, I don't just write code I create solutions. Over the past couple of years, I've worked on a wide range of tasks, from building responsive, user-friendly features to troubleshooting complex issues. But what truly sets me apart is my adaptability and willingness to step outside of my role whenever necessary.",
                  }),
                  /* @__PURE__ */ jsxs17('div', {
                    className: 'mb-6 grid grid-cols-1 gap-6 md:grid-cols-2',
                    children: [
                      /* @__PURE__ */ jsxs17(motion.div, {
                        className: 'space-y-2',
                        variants: fadeInUp,
                        children: [
                          /* @__PURE__ */ jsx29('h4', {
                            className: 'font-semibold',
                            children: 'Frontend Development',
                          }),
                          /* @__PURE__ */ jsx29('p', {
                            className: 'text-sm text-muted-foreground',
                            children:
                              "My expertise lies in JavaScript/TypeScript, React, Remix, and React Native. I'm experienced in UI/UX improvements, implementing animations and transitions, and building reusable component libraries for optimized development workflows.",
                          }),
                        ],
                      }),
                      /* @__PURE__ */ jsxs17(motion.div, {
                        className: 'space-y-2',
                        variants: fadeInUp,
                        children: [
                          /* @__PURE__ */ jsx29('h4', {
                            className: 'font-semibold',
                            children: 'Mobile Development',
                          }),
                          /* @__PURE__ */ jsx29('p', {
                            className: 'text-sm text-muted-foreground',
                            children:
                              "I've developed cross-platform applications using React Native, optimizing for both iOS and Android. My experience includes app store deployment, performance optimization, and implementing responsive layouts.",
                          }),
                        ],
                      }),
                    ],
                  }),
                  /* @__PURE__ */ jsxs17(motion.div, {
                    className: 'mt-8 flex flex-wrap items-center justify-center gap-4',
                    variants: fadeInUp,
                    children: [
                      /* @__PURE__ */ jsx29(motion.div, {
                        whileHover: { scale: 1.05 },
                        whileTap: { scale: 0.95 },
                        children: /* @__PURE__ */ jsx29(Button, {
                          asChild: !0,
                          className:
                            'bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70',
                          children: /* @__PURE__ */ jsx29('a', {
                            href: '/#contact',
                            children: 'Get In Touch',
                          }),
                        }),
                      }),
                      /* @__PURE__ */ jsx29(motion.div, {
                        whileHover: { scale: 1.05 },
                        whileTap: { scale: 0.95 },
                        children: /* @__PURE__ */ jsx29(Button, {
                          variant: 'outline',
                          asChild: !0,
                          className: 'border-primary/20',
                          children: /* @__PURE__ */ jsx29('a', {
                            href: '/#projects',
                            children: 'View Projects',
                          }),
                        }),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

// app/components/page-compare.tsx
import { jsx as jsx30, jsxs as jsxs18 } from 'react/jsx-runtime';
function PageCompare({ section, className, height = 'h-[600px]' }) {
  return /* @__PURE__ */ jsxs18('div', {
    className: 'relative w-full',
    children: [
      /* @__PURE__ */ jsxs18('div', {
        className: 'absolute left-0 top-4 z-50 flex gap-4 px-4',
        children: [
          /* @__PURE__ */ jsx30(Badge, {
            variant: 'outline',
            className: 'bg-background/50 backdrop-blur',
            children: 'Classic',
          }),
          /* @__PURE__ */ jsx30(Badge, {
            variant: 'outline',
            className: 'bg-background/50 backdrop-blur',
            children: 'Animated',
          }),
        ],
      }),
      /* @__PURE__ */ jsx30(Compare, {
        firstContent: /* @__PURE__ */ jsx30('div', {
          className: 'h-full w-full overflow-auto',
          children:
            section === 'hero'
              ? /* @__PURE__ */ jsx30(ClassicHero, {})
              : /* @__PURE__ */ jsx30(ClassicAbout, {}),
        }),
        secondContent: /* @__PURE__ */ jsx30('div', {
          className: 'h-full w-full overflow-auto',
          children:
            section === 'about'
              ? /* @__PURE__ */ jsx30(AnimatedAbout, {})
              : /* @__PURE__ */ jsx30(AnimatedHero, {}),
        }),
        className: `w-full ${height} rounded-lg border shadow-lg ${className}`,
        slideMode: 'hover',
        initialSliderPercentage: 50,
      }),
    ],
  });
}

// app/components/ui/tabs.tsx
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React9 from 'react';
import { jsx as jsx31 } from 'react/jsx-runtime';
var Tabs = TabsPrimitive.Root,
  TabsList = React9.forwardRef(({ className, ...props }, ref) =>
    /* @__PURE__ */ jsx31(TabsPrimitive.List, {
      ref,
      className: cn(
        'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
        className
      ),
      ...props,
    })
  );
TabsList.displayName = TabsPrimitive.List.displayName;
var TabsTrigger = React9.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsx31(TabsPrimitive.Trigger, {
    ref,
    className: cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
      className
    ),
    ...props,
  })
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
var TabsContent = React9.forwardRef(({ className, ...props }, ref) =>
  /* @__PURE__ */ jsx31(TabsPrimitive.Content, {
    ref,
    className: cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className
    ),
    ...props,
  })
);
TabsContent.displayName = TabsPrimitive.Content.displayName;

// app/routes/compare.tsx
import { jsx as jsx32, jsxs as jsxs19 } from 'react/jsx-runtime';
var meta3 = () => [
    { title: 'Compare Demo | Portfolio' },
    {
      name: 'description',
      content: 'Interactive comparison demonstrations',
    },
  ],
  loader2 = async () => json2({});
function ComparePage() {
  return /* @__PURE__ */ jsx32(Layout, {
    children: /* @__PURE__ */ jsx32('section', {
      className: 'py-20',
      children: /* @__PURE__ */ jsxs19('div', {
        className: 'container mx-auto px-4',
        children: [
          /* @__PURE__ */ jsxs19('div', {
            className: 'mb-16 flex flex-col items-center text-center',
            children: [
              /* @__PURE__ */ jsx32('h1', {
                className: 'mb-6 text-3xl font-bold md:text-4xl',
                children: 'Interactive Comparisons',
              }),
              /* @__PURE__ */ jsx32('p', {
                className: 'max-w-2xl text-muted-foreground',
                children:
                  'Explore the power of interactive comparison sliders - compare images or entire page sections by sliding between different versions.',
              }),
            ],
          }),
          /* @__PURE__ */ jsxs19(Tabs, {
            defaultValue: 'page',
            className: 'w-full',
            children: [
              /* @__PURE__ */ jsxs19(TabsList, {
                className: 'mx-auto mb-8 w-auto',
                children: [
                  /* @__PURE__ */ jsx32(TabsTrigger, {
                    value: 'page',
                    children: 'Page Comparison',
                  }),
                  /* @__PURE__ */ jsx32(TabsTrigger, {
                    value: 'image',
                    children: 'Image Comparison',
                  }),
                ],
              }),
              /* @__PURE__ */ jsxs19(TabsContent, {
                value: 'page',
                className: 'space-y-16',
                children: [
                  /* @__PURE__ */ jsxs19('div', {
                    children: [
                      /* @__PURE__ */ jsxs19('div', {
                        className: 'mb-8 flex flex-col items-center text-center',
                        children: [
                          /* @__PURE__ */ jsx32(Badge, {
                            className: 'mb-4',
                            children: 'Hero Section',
                          }),
                          /* @__PURE__ */ jsx32('h2', {
                            className: 'mb-6 text-2xl font-bold',
                            children: 'Compare Hero Styles',
                          }),
                          /* @__PURE__ */ jsx32('p', {
                            className: 'max-w-2xl text-muted-foreground',
                            children:
                              'Slide to compare the classic and animated versions of the hero section. Notice the different animations, effects, and styling.',
                          }),
                        ],
                      }),
                      /* @__PURE__ */ jsx32(PageCompare, { section: 'hero', height: 'h-[600px]' }),
                    ],
                  }),
                  /* @__PURE__ */ jsx32(Separator, {}),
                  /* @__PURE__ */ jsxs19('div', {
                    children: [
                      /* @__PURE__ */ jsxs19('div', {
                        className: 'mb-8 flex flex-col items-center text-center',
                        children: [
                          /* @__PURE__ */ jsx32(Badge, {
                            className: 'mb-4',
                            children: 'About Section',
                          }),
                          /* @__PURE__ */ jsx32('h2', {
                            className: 'mb-6 text-2xl font-bold',
                            children: 'Compare About Styles',
                          }),
                          /* @__PURE__ */ jsx32('p', {
                            className: 'max-w-2xl text-muted-foreground',
                            children:
                              'Slide to compare the classic and animated versions of the about section. See how animations can enhance the user experience while maintaining the same content.',
                          }),
                        ],
                      }),
                      /* @__PURE__ */ jsx32(PageCompare, { section: 'about', height: 'h-[800px]' }),
                    ],
                  }),
                ],
              }),
              /* @__PURE__ */ jsxs19(TabsContent, {
                value: 'image',
                children: [
                  /* @__PURE__ */ jsxs19('div', {
                    className: 'mb-8 flex flex-col items-center text-center',
                    children: [
                      /* @__PURE__ */ jsx32(Badge, {
                        className: 'mb-4',
                        children: 'Image Comparison',
                      }),
                      /* @__PURE__ */ jsx32('h2', {
                        className: 'mb-6 text-2xl font-bold',
                        children: 'Compare Images',
                      }),
                      /* @__PURE__ */ jsx32('p', {
                        className: 'max-w-2xl text-muted-foreground',
                        children:
                          'The same slider component can be used to compare images, perfect for before/after demonstrations, design iterations, or visual differences.',
                      }),
                    ],
                  }),
                  /* @__PURE__ */ jsx32('div', {
                    className: 'flex justify-center',
                    children: /* @__PURE__ */ jsx32(CompareDemo, {}),
                  }),
                ],
              }),
            ],
          }),
          /* @__PURE__ */ jsxs19('div', {
            className: 'mx-auto mt-24 max-w-3xl',
            children: [
              /* @__PURE__ */ jsx32('h2', {
                className: 'mb-4 text-center text-2xl font-bold',
                children: 'How It Works',
              }),
              /* @__PURE__ */ jsx32('p', {
                className: 'mb-6 text-muted-foreground',
                children:
                  "The comparison slider uses Framer Motion for smooth animations and React's composition pattern to allow comparing either images or entire page components:",
              }),
              /* @__PURE__ */ jsxs19('div', {
                className: 'grid grid-cols-1 gap-6 md:grid-cols-2',
                children: [
                  /* @__PURE__ */ jsxs19('div', {
                    className: 'space-y-2',
                    children: [
                      /* @__PURE__ */ jsx32('h3', {
                        className: 'font-semibold',
                        children: 'Features',
                      }),
                      /* @__PURE__ */ jsxs19('ul', {
                        className: 'list-inside list-disc text-sm text-muted-foreground',
                        children: [
                          /* @__PURE__ */ jsx32('li', {
                            children: 'Supports both image and component comparison',
                          }),
                          /* @__PURE__ */ jsx32('li', {
                            children: 'Interactive slider with sparkle effects',
                          }),
                          /* @__PURE__ */ jsx32('li', {
                            children: 'Hover and drag interaction modes',
                          }),
                          /* @__PURE__ */ jsx32('li', { children: 'Fully responsive design' }),
                        ],
                      }),
                    ],
                  }),
                  /* @__PURE__ */ jsxs19('div', {
                    className: 'space-y-2',
                    children: [
                      /* @__PURE__ */ jsx32('h3', {
                        className: 'font-semibold',
                        children: 'Use Cases',
                      }),
                      /* @__PURE__ */ jsxs19('ul', {
                        className: 'list-inside list-disc text-sm text-muted-foreground',
                        children: [
                          /* @__PURE__ */ jsx32('li', {
                            children: 'Compare classic vs animated UI',
                          }),
                          /* @__PURE__ */ jsx32('li', {
                            children: 'Before/after image processing',
                          }),
                          /* @__PURE__ */ jsx32('li', { children: 'Design iterations showcase' }),
                          /* @__PURE__ */ jsx32('li', { children: 'Compare light/dark themes' }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    }),
  });
}

// app/routes/privacy.tsx
var privacy_exports = {};
__export(privacy_exports, {
  default: () => Privacy,
  meta: () => meta4,
});
import { jsx as jsx33, jsxs as jsxs20 } from 'react/jsx-runtime';
var meta4 = () => [
  { title: 'Privacy Policy | Paul Doros' },
  { name: 'description', content: 'Privacy policy for Paul Doros portfolio website' },
];
function Privacy() {
  return /* @__PURE__ */ jsx33(Layout, {
    children: /* @__PURE__ */ jsx33('div', {
      className: 'container mx-auto px-4 py-20',
      children: /* @__PURE__ */ jsxs20('div', {
        className: 'mx-auto max-w-3xl',
        children: [
          /* @__PURE__ */ jsx33('h1', {
            className: 'mb-6 text-3xl font-bold md:text-4xl',
            children: 'Privacy Policy',
          }),
          /* @__PURE__ */ jsx33(Separator, { className: 'mb-8' }),
          /* @__PURE__ */ jsxs20('section', {
            className: 'mb-10',
            children: [
              /* @__PURE__ */ jsx33('h2', {
                className: 'mb-4 text-2xl font-semibold',
                children: 'Introduction',
              }),
              /* @__PURE__ */ jsx33('p', {
                className: 'mb-4 text-muted-foreground',
                children:
                  'Welcome to my portfolio website. I respect your privacy and am committed to protecting your personal data. This privacy policy will inform you about how I look after your personal data when you visit my website and tell you about your privacy rights and how the law protects you.',
              }),
              /* @__PURE__ */ jsx33('p', {
                className: 'text-muted-foreground',
                children:
                  'This website is not intended for children and I do not knowingly collect data relating to children.',
              }),
            ],
          }),
          /* @__PURE__ */ jsxs20('section', {
            className: 'mb-10',
            children: [
              /* @__PURE__ */ jsx33('h2', {
                className: 'mb-4 text-2xl font-semibold',
                children: 'Information I Collect',
              }),
              /* @__PURE__ */ jsx33('p', {
                className: 'mb-4 text-muted-foreground',
                children:
                  'When you use the contact form on this website, I collect the following types of personal information:',
              }),
              /* @__PURE__ */ jsxs20('ul', {
                className: 'mb-4 list-inside list-disc space-y-2 text-muted-foreground',
                children: [
                  /* @__PURE__ */ jsx33('li', { children: 'Name' }),
                  /* @__PURE__ */ jsx33('li', { children: 'Email address' }),
                  /* @__PURE__ */ jsx33('li', {
                    children: 'Any information you choose to provide in the message field',
                  }),
                ],
              }),
              /* @__PURE__ */ jsx33('p', {
                className: 'text-muted-foreground',
                children:
                  'I do not use cookies or other tracking technologies to collect information about your browsing activities over time or across different websites.',
              }),
            ],
          }),
          /* @__PURE__ */ jsxs20('section', {
            className: 'mb-10',
            children: [
              /* @__PURE__ */ jsx33('h2', {
                className: 'mb-4 text-2xl font-semibold',
                children: 'How I Use Your Information',
              }),
              /* @__PURE__ */ jsx33('p', {
                className: 'mb-4 text-muted-foreground',
                children:
                  'I use the information you provide via the contact form solely for the purpose of responding to your inquiries and to communicate with you about potential opportunities for collaboration.',
              }),
              /* @__PURE__ */ jsx33('p', {
                className: 'text-muted-foreground',
                children:
                  'I will not use your personal information for marketing purposes or share it with third parties without your explicit consent.',
              }),
            ],
          }),
          /* @__PURE__ */ jsxs20('section', {
            className: 'mb-10',
            children: [
              /* @__PURE__ */ jsx33('h2', {
                className: 'mb-4 text-2xl font-semibold',
                children: 'Data Security',
              }),
              /* @__PURE__ */ jsx33('p', {
                className: 'text-muted-foreground',
                children:
                  'I have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, I limit access to your personal data to myself. I will only process your personal data on my lawful bases and instructions.',
              }),
            ],
          }),
          /* @__PURE__ */ jsxs20('section', {
            className: 'mb-10',
            children: [
              /* @__PURE__ */ jsx33('h2', {
                className: 'mb-4 text-2xl font-semibold',
                children: 'Your Rights',
              }),
              /* @__PURE__ */ jsx33('p', {
                className: 'mb-4 text-muted-foreground',
                children:
                  'Under certain circumstances, you have rights under data protection laws in relation to your personal data, including:',
              }),
              /* @__PURE__ */ jsxs20('ul', {
                className: 'mb-4 list-inside list-disc space-y-2 text-muted-foreground',
                children: [
                  /* @__PURE__ */ jsx33('li', {
                    children: 'The right to request access to your personal data',
                  }),
                  /* @__PURE__ */ jsx33('li', {
                    children: 'The right to request correction of your personal data',
                  }),
                  /* @__PURE__ */ jsx33('li', {
                    children: 'The right to request erasure of your personal data',
                  }),
                  /* @__PURE__ */ jsx33('li', {
                    children: 'The right to object to processing of your personal data',
                  }),
                  /* @__PURE__ */ jsx33('li', {
                    children: 'The right to request restriction of processing your personal data',
                  }),
                  /* @__PURE__ */ jsx33('li', { children: 'The right to data portability' }),
                ],
              }),
              /* @__PURE__ */ jsx33('p', {
                className: 'text-muted-foreground',
                children:
                  'If you wish to exercise any of these rights, please contact me via the contact form on this website.',
              }),
            ],
          }),
          /* @__PURE__ */ jsxs20('section', {
            children: [
              /* @__PURE__ */ jsx33('h2', {
                className: 'mb-4 text-2xl font-semibold',
                children: 'Changes to this Policy',
              }),
              /* @__PURE__ */ jsx33('p', {
                className: 'mb-4 text-muted-foreground',
                children:
                  'I may update this privacy policy from time to time. I will notify you of significant changes by updating the effective date at the top of this policy.',
              }),
              /* @__PURE__ */ jsx33('p', {
                className: 'text-muted-foreground',
                children: 'This policy was last updated on [Current Date].',
              }),
            ],
          }),
        ],
      }),
    }),
  });
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index,
  loader: () => loader3,
  meta: () => meta5,
});
import { json as json3 } from '@remix-run/node';
import { useState as useState10 } from 'react';

// app/components/portfolios/classic-portfolio.tsx
import { Link as Link3 } from '@remix-run/react';
import { Github as Github3, Mail as Mail2 } from 'lucide-react';

// app/components/contact-form.tsx
import { Send, Loader2 as Loader22 } from 'lucide-react';
import { useState as useState9, useEffect as useEffect11 } from 'react';
import emailjs from '@emailjs/browser';

// app/components/email-status-modal.tsx
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { jsx as jsx34, jsxs as jsxs21 } from 'react/jsx-runtime';
function EmailStatusModal({ isOpen, onClose, status, message }) {
  return /* @__PURE__ */ jsx34(Dialog, {
    open: isOpen,
    onOpenChange: onClose,
    children: /* @__PURE__ */ jsxs21(DialogContent, {
      className: 'sm:max-w-md',
      children: [
        /* @__PURE__ */ jsxs21(DialogHeader, {
          children: [
            /* @__PURE__ */ jsxs21(DialogTitle, {
              className: 'flex items-center gap-2',
              children: [
                status === 'success' &&
                  /* @__PURE__ */ jsx34(CheckCircle2, { className: 'h-5 w-5 text-green-500' }),
                status === 'error' &&
                  /* @__PURE__ */ jsx34(XCircle, { className: 'h-5 w-5 text-red-500' }),
                status === 'sending' &&
                  /* @__PURE__ */ jsx34(Loader2, {
                    className: 'h-5 w-5 animate-spin text-primary',
                  }),
                status === 'success'
                  ? 'Message Sent Successfully!'
                  : status === 'error'
                    ? 'Failed to Send Message'
                    : 'Sending Message...',
              ],
            }),
            /* @__PURE__ */ jsx34(DialogDescription, { children: message }),
          ],
        }),
        /* @__PURE__ */ jsx34(DialogFooter, {
          children: /* @__PURE__ */ jsx34(Button, {
            variant: 'outline',
            onClick: onClose,
            disabled: status === 'sending',
            children: 'Close',
          }),
        }),
      ],
    }),
  });
}

// app/config.ts
var emailConfig = {
  publicKey: 'Xw9u_u66agMT3Haie',
  serviceId: 'service_ai7vj4x',
  templateId: 'template_zf40apm',
  recipientEmail: 'dorospaul26@gmail.com',
};

// app/components/contact-form.tsx
import { Fragment as Fragment5, jsx as jsx35, jsxs as jsxs22 } from 'react/jsx-runtime';
function ContactForm({ className = '' }) {
  let [formData, setFormData] = useState9({
      name: '',
      email: '',
      subject: '',
      message: '',
    }),
    [isSubmitting, setIsSubmitting] = useState9(!1),
    [emailStatus, setEmailStatus] = useState9({
      isOpen: !1,
      status: 'success',
      message: '',
    });
  useEffect11(() => {
    emailjs.init(emailConfig.publicKey);
  }, []);
  let handleSubmit = async e => {
      e.preventDefault(),
        setIsSubmitting(!0),
        setEmailStatus({
          isOpen: !0,
          status: 'sending',
          message: 'Please wait while we send your message...',
        });
      try {
        await emailjs.send(
          emailConfig.serviceId,
          emailConfig.templateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            to_name: 'Paul Doros',
            reply_to: formData.email,
            to_email: emailConfig.recipientEmail,
            email: emailConfig.recipientEmail,
            subject: formData.subject,
            message: formData.message,
          },
          emailConfig.publicKey
        ),
          setEmailStatus({
            isOpen: !0,
            status: 'success',
            message:
              "Thank you for your message! I'll get back to you as soon as possible. In the meantime, feel free to connect with me on LinkedIn or GitHub.",
          }),
          setFormData({ name: '', email: '', subject: '', message: '' });
      } catch (error) {
        console.error('EmailJS Error:', error),
          setEmailStatus({
            isOpen: !0,
            status: 'error',
            message:
              'I apologize, but there was an error sending your message. Please try again later or reach out to me directly at dorospaul26@gmail.com',
          });
      } finally {
        setIsSubmitting(!1);
      }
    },
    handleChange = e => {
      let { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };
  return /* @__PURE__ */ jsxs22(Fragment5, {
    children: [
      /* @__PURE__ */ jsxs22('div', {
        className,
        children: [
          /* @__PURE__ */ jsx35('h3', {
            className: 'mb-6 text-xl font-semibold',
            children: 'Send Me a Message',
          }),
          /* @__PURE__ */ jsxs22('form', {
            className: 'space-y-6',
            onSubmit: handleSubmit,
            children: [
              /* @__PURE__ */ jsxs22('div', {
                className: 'grid grid-cols-1 gap-6',
                children: [
                  /* @__PURE__ */ jsxs22('div', {
                    children: [
                      /* @__PURE__ */ jsx35('label', {
                        htmlFor: 'name',
                        className: 'mb-2 block text-sm font-medium',
                        children: 'Name',
                      }),
                      /* @__PURE__ */ jsx35('input', {
                        type: 'text',
                        id: 'name',
                        name: 'name',
                        value: formData.name,
                        onChange: handleChange,
                        className:
                          'w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
                        placeholder: 'Your name',
                        required: !0,
                      }),
                    ],
                  }),
                  /* @__PURE__ */ jsxs22('div', {
                    children: [
                      /* @__PURE__ */ jsx35('label', {
                        htmlFor: 'email',
                        className: 'mb-2 block text-sm font-medium',
                        children: 'Email',
                      }),
                      /* @__PURE__ */ jsx35('input', {
                        type: 'email',
                        id: 'email',
                        name: 'email',
                        value: formData.email,
                        onChange: handleChange,
                        className:
                          'w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
                        placeholder: 'Your email',
                        required: !0,
                      }),
                    ],
                  }),
                  /* @__PURE__ */ jsxs22('div', {
                    children: [
                      /* @__PURE__ */ jsx35('label', {
                        htmlFor: 'subject',
                        className: 'mb-2 block text-sm font-medium',
                        children: 'Subject',
                      }),
                      /* @__PURE__ */ jsx35('input', {
                        type: 'text',
                        id: 'subject',
                        name: 'subject',
                        value: formData.subject,
                        onChange: handleChange,
                        className:
                          'w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
                        placeholder: 'Subject of your message',
                        required: !0,
                      }),
                    ],
                  }),
                  /* @__PURE__ */ jsxs22('div', {
                    children: [
                      /* @__PURE__ */ jsx35('label', {
                        htmlFor: 'message',
                        className: 'mb-2 block text-sm font-medium',
                        children: 'Message',
                      }),
                      /* @__PURE__ */ jsx35('textarea', {
                        id: 'message',
                        name: 'message',
                        value: formData.message,
                        onChange: handleChange,
                        rows: 6,
                        className:
                          'w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
                        placeholder: 'Your message',
                        required: !0,
                      }),
                    ],
                  }),
                ],
              }),
              /* @__PURE__ */ jsx35(Button, {
                className: 'w-full',
                type: 'submit',
                disabled: isSubmitting,
                children: isSubmitting
                  ? /* @__PURE__ */ jsxs22(Fragment5, {
                      children: [
                        /* @__PURE__ */ jsx35(Loader22, { className: 'mr-2 h-4 w-4 animate-spin' }),
                        'Sending...',
                      ],
                    })
                  : /* @__PURE__ */ jsxs22(Fragment5, {
                      children: [
                        /* @__PURE__ */ jsx35(Send, { className: 'mr-2 h-4 w-4' }),
                        'Send Message',
                      ],
                    }),
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ jsx35(EmailStatusModal, {
        isOpen: emailStatus.isOpen,
        onClose: () => setEmailStatus(prev => ({ ...prev, isOpen: !1 })),
        status: emailStatus.status,
        message: emailStatus.message,
      }),
    ],
  });
}

// app/components/ui/progress.tsx
import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React10 from 'react';
import { jsx as jsx36 } from 'react/jsx-runtime';
var Progress = React10.forwardRef(({ className, value, ...props }, ref) =>
  /* @__PURE__ */ jsx36(ProgressPrimitive.Root, {
    ref,
    className: cn('relative h-2 w-full overflow-hidden rounded-full bg-primary/20', className),
    ...props,
    children: /* @__PURE__ */ jsx36(ProgressPrimitive.Indicator, {
      className: 'h-full w-full flex-1 bg-primary transition-all',
      style: { transform: `translateX(-${100 - (value || 0)}%)` },
    }),
  })
);
Progress.displayName = ProgressPrimitive.Root.displayName;

// app/components/portfolios/classic-portfolio.tsx
import { jsx as jsx37, jsxs as jsxs23 } from 'react/jsx-runtime';
function ClassicPortfolio({ onAdultLinkClick }) {
  return /* @__PURE__ */ jsx37(Layout, {
    children: /* @__PURE__ */ jsxs23('div', {
      className: 'classic-version',
      children: [
        /* @__PURE__ */ jsx37(ClassicHero, {}),
        /* @__PURE__ */ jsx37(ClassicAbout, {}),
        /* @__PURE__ */ jsx37('section', {
          id: 'projects',
          className: 'py-20',
          children: /* @__PURE__ */ jsxs23('div', {
            className: 'container mx-auto px-4',
            children: [
              /* @__PURE__ */ jsxs23('div', {
                className: 'mb-16 flex flex-col items-center text-center',
                children: [
                  /* @__PURE__ */ jsx37(Badge, { className: 'mb-4', children: 'My Work' }),
                  /* @__PURE__ */ jsx37('h2', {
                    className: 'mb-6 text-3xl font-bold md:text-4xl',
                    children: 'Featured Projects',
                  }),
                  /* @__PURE__ */ jsx37(Separator, { className: 'mb-6 w-24' }),
                  /* @__PURE__ */ jsx37('p', {
                    className: 'max-w-2xl text-muted-foreground',
                    children:
                      'A collection of my recent projects demonstrating my skills and capabilities.',
                  }),
                ],
              }),
              /* @__PURE__ */ jsxs23('div', {
                className: 'grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3',
                children: [
                  /* @__PURE__ */ jsxs23(Card, {
                    className:
                      'flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg',
                    children: [
                      /* @__PURE__ */ jsx37('div', {
                        className: 'relative aspect-video bg-muted',
                        children: /* @__PURE__ */ jsx37('div', {
                          className: 'absolute inset-0 flex items-center justify-center',
                          children: /* @__PURE__ */ jsx37('img', {
                            src: '/images/devjourney.png',
                            alt: 'Dev Journey Project Screenshot',
                            className: 'h-full w-full object-cover',
                          }),
                        }),
                      }),
                      /* @__PURE__ */ jsxs23(CardHeader, {
                        children: [
                          /* @__PURE__ */ jsx37(CardTitle, { children: 'Dev Journey' }),
                          /* @__PURE__ */ jsx37(CardDescription, {
                            children: 'Personal learning and portfolio website',
                          }),
                        ],
                      }),
                      /* @__PURE__ */ jsxs23(CardContent, {
                        className: 'flex-grow',
                        children: [
                          /* @__PURE__ */ jsx37('p', {
                            className: 'mb-4 text-sm text-muted-foreground',
                            children:
                              'A comprehensive learning platform that combines portfolio showcasing with interactive learning features. Built with modern web technologies and a focus on user engagement.',
                          }),
                          /* @__PURE__ */ jsxs23('div', {
                            className: 'mb-4 space-y-2',
                            children: [
                              /* @__PURE__ */ jsx37('h4', {
                                className: 'text-sm font-medium',
                                children: 'Key Features:',
                              }),
                              /* @__PURE__ */ jsxs23('ul', {
                                className: 'space-y-1 text-sm text-muted-foreground',
                                children: [
                                  /* @__PURE__ */ jsx37('li', {
                                    children: '\u2022 User authentication and profile management',
                                  }),
                                  /* @__PURE__ */ jsx37('li', {
                                    children:
                                      '\u2022 Interactive learning modules and progress tracking',
                                  }),
                                  /* @__PURE__ */ jsx37('li', {
                                    children:
                                      '\u2022 Gamification system with achievements and badges',
                                  }),
                                  /* @__PURE__ */ jsx37('li', {
                                    children: '\u2022 Responsive design with dark/light mode',
                                  }),
                                  /* @__PURE__ */ jsx37('li', {
                                    children: '\u2022 Dynamic UI components and animations',
                                  }),
                                ],
                              }),
                            ],
                          }),
                          /* @__PURE__ */ jsxs23('div', {
                            className: 'mt-4 flex flex-wrap gap-2',
                            children: [
                              /* @__PURE__ */ jsx37(Badge, {
                                variant: 'secondary',
                                children: 'Remix',
                              }),
                              /* @__PURE__ */ jsx37(Badge, {
                                variant: 'secondary',
                                children: 'React',
                              }),
                              /* @__PURE__ */ jsx37(Badge, {
                                variant: 'secondary',
                                children: 'TypeScript',
                              }),
                              /* @__PURE__ */ jsx37(Badge, {
                                variant: 'secondary',
                                children: 'Tailwind CSS',
                              }),
                              /* @__PURE__ */ jsx37(Badge, {
                                variant: 'secondary',
                                children: 'Prisma',
                              }),
                              /* @__PURE__ */ jsx37(Badge, {
                                variant: 'secondary',
                                children: 'PostgreSQL',
                              }),
                            ],
                          }),
                        ],
                      }),
                      /* @__PURE__ */ jsxs23(CardFooter, {
                        className: 'mt-auto flex justify-between',
                        children: [
                          /* @__PURE__ */ jsx37(Button, {
                            variant: 'outline',
                            size: 'sm',
                            asChild: !0,
                            children: /* @__PURE__ */ jsx37('a', {
                              href: 'https://github.com',
                              target: '_blank',
                              rel: 'noopener noreferrer',
                              children: 'Code',
                            }),
                          }),
                          /* @__PURE__ */ jsx37(Button, {
                            size: 'sm',
                            asChild: !0,
                            children: /* @__PURE__ */ jsx37('a', {
                              href: 'https://dev-journey-five.vercel.app',
                              target: '_blank',
                              rel: 'noopener noreferrer',
                              children: 'Demo',
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  /* @__PURE__ */ jsxs23(Card, {
                    className:
                      'flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg',
                    children: [
                      /* @__PURE__ */ jsx37('div', {
                        className: 'relative aspect-video bg-muted',
                        children: /* @__PURE__ */ jsx37('div', {
                          className: 'absolute inset-0 flex items-center justify-center blur-xl',
                          children: /* @__PURE__ */ jsx37('img', {
                            src: '/images/ai.png',
                            alt: 'Kinky AI Chat Project Screenshot',
                            className: 'h-full w-full object-cover',
                          }),
                        }),
                      }),
                      /* @__PURE__ */ jsxs23(CardHeader, {
                        children: [
                          /* @__PURE__ */ jsx37(CardTitle, { children: 'Kinky AI Chat' }),
                          /* @__PURE__ */ jsx37(CardDescription, {
                            children: 'Real-Time AI Chat System',
                          }),
                        ],
                      }),
                      /* @__PURE__ */ jsxs23(CardContent, {
                        className: 'flex-grow',
                        children: [
                          /* @__PURE__ */ jsx37('p', {
                            className: 'mb-4 text-sm text-muted-foreground',
                            children:
                              'An advanced AI-powered chat platform featuring real-time communication, intelligent message filtering, and personalized user interactions.',
                          }),
                          /* @__PURE__ */ jsxs23('div', {
                            className: 'mb-4 space-y-2',
                            children: [
                              /* @__PURE__ */ jsx37('h4', {
                                className: 'text-sm font-medium',
                                children: 'Key Features:',
                              }),
                              /* @__PURE__ */ jsxs23('ul', {
                                className: 'space-y-1 text-sm text-muted-foreground',
                                children: [
                                  /* @__PURE__ */ jsx37('li', {
                                    children:
                                      '\u2022 Real-time messaging with WebSocket integration',
                                  }),
                                  /* @__PURE__ */ jsx37('li', {
                                    children: '\u2022 AI-powered message filtering and moderation',
                                  }),
                                  /* @__PURE__ */ jsx37('li', {
                                    children: '\u2022 Smart auto-suggestions and context awareness',
                                  }),
                                  /* @__PURE__ */ jsx37('li', {
                                    children: '\u2022 User tagging and notification system',
                                  }),
                                  /* @__PURE__ */ jsx37('li', {
                                    children: '\u2022 Responsive mobile-first design',
                                  }),
                                ],
                              }),
                            ],
                          }),
                          /* @__PURE__ */ jsxs23('div', {
                            className: 'mt-4 flex flex-wrap gap-2',
                            children: [
                              /* @__PURE__ */ jsx37(Badge, {
                                variant: 'secondary',
                                children: 'React.js',
                              }),
                              /* @__PURE__ */ jsx37(Badge, {
                                variant: 'secondary',
                                children: 'Next.js',
                              }),
                              /* @__PURE__ */ jsx37(Badge, {
                                variant: 'secondary',
                                children: 'WebSockets',
                              }),
                              /* @__PURE__ */ jsx37(Badge, {
                                variant: 'secondary',
                                children: 'AI Integration',
                              }),
                              /* @__PURE__ */ jsx37(Badge, {
                                variant: 'secondary',
                                children: 'TypeScript',
                              }),
                              /* @__PURE__ */ jsx37(Badge, {
                                variant: 'secondary',
                                children: 'Tailwind CSS',
                              }),
                            ],
                          }),
                        ],
                      }),
                      /* @__PURE__ */ jsxs23(CardFooter, {
                        className: 'mt-auto flex justify-between',
                        children: [
                          /* @__PURE__ */ jsx37(Button, {
                            variant: 'outline',
                            size: 'sm',
                            asChild: !0,
                            children: /* @__PURE__ */ jsx37('a', {
                              href: 'https://github.com',
                              target: '_blank',
                              rel: 'noopener noreferrer',
                              children: 'Code',
                            }),
                          }),
                          /* @__PURE__ */ jsx37(Button, {
                            size: 'sm',
                            asChild: !0,
                            children: /* @__PURE__ */ jsx37('a', {
                              href: 'https://chat.kink.ai',
                              onClick: onAdultLinkClick('https://chat.kink.ai', 'Kinky AI Chat'),
                              className:
                                'flex items-center text-muted-foreground transition-colors hover:text-foreground',
                              children: 'Demo',
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  /* @__PURE__ */ jsxs23(Card, {
                    className:
                      'flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg',
                    children: [
                      /* @__PURE__ */ jsx37('div', {
                        className: 'relative aspect-video bg-muted',
                        children: /* @__PURE__ */ jsx37('div', {
                          className: 'absolute inset-0 flex items-center justify-center blur-xl',
                          children: /* @__PURE__ */ jsx37('img', {
                            src: '/images/clips.png',
                            alt: 'KinkyClips Project Screenshot',
                            className: 'h-full w-full object-cover',
                          }),
                        }),
                      }),
                      /* @__PURE__ */ jsxs23(CardHeader, {
                        children: [
                          /* @__PURE__ */ jsx37(CardTitle, { children: 'KinkyClips' }),
                          /* @__PURE__ */ jsx37(CardDescription, {
                            children: 'Mobile & Web Application',
                          }),
                        ],
                      }),
                      /* @__PURE__ */ jsxs23(CardContent, {
                        className: 'flex-grow',
                        children: [
                          /* @__PURE__ */ jsx37('p', {
                            className: 'mb-4 text-sm text-muted-foreground',
                            children:
                              'A cross-platform mobile application with advanced video processing capabilities, available on both iOS and Android platforms.',
                          }),
                          /* @__PURE__ */ jsxs23('div', {
                            className: 'mb-4 space-y-2',
                            children: [
                              /* @__PURE__ */ jsx37('h4', {
                                className: 'text-sm font-medium',
                                children: 'Key Features:',
                              }),
                              /* @__PURE__ */ jsxs23('ul', {
                                className: 'space-y-1 text-sm text-muted-foreground',
                                children: [
                                  /* @__PURE__ */ jsx37('li', {
                                    children: '\u2022 Cross-platform mobile app (iOS & Android)',
                                  }),
                                  /* @__PURE__ */ jsx37('li', {
                                    children: '\u2022 Advanced video processing and editing',
                                  }),
                                  /* @__PURE__ */ jsx37('li', {
                                    children: '\u2022 Adaptive streaming for optimal performance',
                                  }),
                                  /* @__PURE__ */ jsx37('li', {
                                    children: '\u2022 Secure payment integration',
                                  }),
                                  /* @__PURE__ */ jsx37('li', {
                                    children: '\u2022 Admin dashboard for content management',
                                  }),
                                ],
                              }),
                            ],
                          }),
                          /* @__PURE__ */ jsxs23('div', {
                            className: 'mt-4 flex flex-wrap gap-2',
                            children: [
                              /* @__PURE__ */ jsx37(Badge, {
                                variant: 'secondary',
                                children: 'React Native',
                              }),
                              /* @__PURE__ */ jsx37(Badge, {
                                variant: 'secondary',
                                children: 'Mobile Apps',
                              }),
                              /* @__PURE__ */ jsx37(Badge, {
                                variant: 'secondary',
                                children: 'Video Processing',
                              }),
                              /* @__PURE__ */ jsx37(Badge, {
                                variant: 'secondary',
                                children: 'Payments',
                              }),
                              /* @__PURE__ */ jsx37(Badge, {
                                variant: 'secondary',
                                children: 'Firebase',
                              }),
                              /* @__PURE__ */ jsx37(Badge, {
                                variant: 'secondary',
                                children: 'AWS',
                              }),
                            ],
                          }),
                        ],
                      }),
                      /* @__PURE__ */ jsxs23(CardFooter, {
                        className: 'mt-auto flex justify-between',
                        children: [
                          /* @__PURE__ */ jsx37(Button, {
                            variant: 'outline',
                            size: 'sm',
                            asChild: !0,
                            children: /* @__PURE__ */ jsx37('a', {
                              href: 'https://github.com',
                              target: '_blank',
                              rel: 'noopener noreferrer',
                              children: 'Code',
                            }),
                          }),
                          /* @__PURE__ */ jsx37(Button, {
                            size: 'sm',
                            asChild: !0,
                            children: /* @__PURE__ */ jsx37('a', {
                              href: 'https://kinkyclips.com',
                              onClick: onAdultLinkClick('https://kinkyclips.com', 'KinkyClips'),
                              className:
                                'flex items-center text-muted-foreground transition-colors hover:text-foreground',
                              children: 'Demo',
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              /* @__PURE__ */ jsx37('div', {
                className: 'mt-12 flex justify-center',
                children: /* @__PURE__ */ jsx37(Button, {
                  variant: 'outline',
                  asChild: !0,
                  children: /* @__PURE__ */ jsx37(Link3, {
                    to: '/projects',
                    children: 'View All Projects',
                  }),
                }),
              }),
            ],
          }),
        }),
        /* @__PURE__ */ jsx37('section', {
          id: 'skills',
          className: 'bg-muted/50 py-20',
          children: /* @__PURE__ */ jsxs23('div', {
            className: 'container mx-auto px-4',
            children: [
              /* @__PURE__ */ jsxs23('div', {
                className: 'mb-16 flex flex-col items-center text-center',
                children: [
                  /* @__PURE__ */ jsx37(Badge, { className: 'mb-4', children: 'Expertise' }),
                  /* @__PURE__ */ jsx37('h2', {
                    className: 'mb-6 text-3xl font-bold md:text-4xl',
                    children: 'My Skills',
                  }),
                  /* @__PURE__ */ jsx37(Separator, { className: 'mb-6 w-24' }),
                  /* @__PURE__ */ jsx37('p', {
                    className: 'max-w-2xl text-muted-foreground',
                    children: 'A comprehensive overview of my technical skills and proficiencies.',
                  }),
                ],
              }),
              /* @__PURE__ */ jsxs23('div', {
                className: 'grid grid-cols-1 gap-12 md:grid-cols-2',
                children: [
                  /* @__PURE__ */ jsxs23('div', {
                    children: [
                      /* @__PURE__ */ jsx37('h3', {
                        className: 'mb-6 text-xl font-semibold',
                        children: 'Frontend Development',
                      }),
                      /* @__PURE__ */ jsxs23('div', {
                        className: 'space-y-6',
                        children: [
                          /* @__PURE__ */ jsxs23('div', {
                            children: [
                              /* @__PURE__ */ jsxs23('div', {
                                className: 'mb-2 flex justify-between',
                                children: [
                                  /* @__PURE__ */ jsx37('span', {
                                    className: 'font-medium',
                                    children: 'React/Remix',
                                  }),
                                  /* @__PURE__ */ jsx37('span', { children: '95%' }),
                                ],
                              }),
                              /* @__PURE__ */ jsx37(Progress, { value: 95, className: 'h-2' }),
                            ],
                          }),
                          /* @__PURE__ */ jsxs23('div', {
                            children: [
                              /* @__PURE__ */ jsxs23('div', {
                                className: 'mb-2 flex justify-between',
                                children: [
                                  /* @__PURE__ */ jsx37('span', {
                                    className: 'font-medium',
                                    children: 'TypeScript',
                                  }),
                                  /* @__PURE__ */ jsx37('span', { children: '90%' }),
                                ],
                              }),
                              /* @__PURE__ */ jsx37(Progress, { value: 90, className: 'h-2' }),
                            ],
                          }),
                          /* @__PURE__ */ jsxs23('div', {
                            children: [
                              /* @__PURE__ */ jsxs23('div', {
                                className: 'mb-2 flex justify-between',
                                children: [
                                  /* @__PURE__ */ jsx37('span', {
                                    className: 'font-medium',
                                    children: 'Tailwind CSS',
                                  }),
                                  /* @__PURE__ */ jsx37('span', { children: '85%' }),
                                ],
                              }),
                              /* @__PURE__ */ jsx37(Progress, { value: 85, className: 'h-2' }),
                            ],
                          }),
                          /* @__PURE__ */ jsxs23('div', {
                            children: [
                              /* @__PURE__ */ jsxs23('div', {
                                className: 'mb-2 flex justify-between',
                                children: [
                                  /* @__PURE__ */ jsx37('span', {
                                    className: 'font-medium',
                                    children: 'React Native',
                                  }),
                                  /* @__PURE__ */ jsx37('span', { children: '85%' }),
                                ],
                              }),
                              /* @__PURE__ */ jsx37(Progress, { value: 85, className: 'h-2' }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  /* @__PURE__ */ jsxs23('div', {
                    children: [
                      /* @__PURE__ */ jsx37('h3', {
                        className: 'mb-6 text-xl font-semibold',
                        children: 'Additional Skills',
                      }),
                      /* @__PURE__ */ jsxs23('div', {
                        className: 'space-y-6',
                        children: [
                          /* @__PURE__ */ jsxs23('div', {
                            children: [
                              /* @__PURE__ */ jsxs23('div', {
                                className: 'mb-2 flex justify-between',
                                children: [
                                  /* @__PURE__ */ jsx37('span', {
                                    className: 'font-medium',
                                    children: 'UI/UX Implementation',
                                  }),
                                  /* @__PURE__ */ jsx37('span', { children: '90%' }),
                                ],
                              }),
                              /* @__PURE__ */ jsx37(Progress, { value: 90, className: 'h-2' }),
                            ],
                          }),
                          /* @__PURE__ */ jsxs23('div', {
                            children: [
                              /* @__PURE__ */ jsxs23('div', {
                                className: 'mb-2 flex justify-between',
                                children: [
                                  /* @__PURE__ */ jsx37('span', {
                                    className: 'font-medium',
                                    children: 'Animations & Effects',
                                  }),
                                  /* @__PURE__ */ jsx37('span', { children: '85%' }),
                                ],
                              }),
                              /* @__PURE__ */ jsx37(Progress, { value: 85, className: 'h-2' }),
                            ],
                          }),
                          /* @__PURE__ */ jsxs23('div', {
                            children: [
                              /* @__PURE__ */ jsxs23('div', {
                                className: 'mb-2 flex justify-between',
                                children: [
                                  /* @__PURE__ */ jsx37('span', {
                                    className: 'font-medium',
                                    children: 'State Management',
                                  }),
                                  /* @__PURE__ */ jsx37('span', { children: '80%' }),
                                ],
                              }),
                              /* @__PURE__ */ jsx37(Progress, { value: 80, className: 'h-2' }),
                            ],
                          }),
                          /* @__PURE__ */ jsxs23('div', {
                            children: [
                              /* @__PURE__ */ jsxs23('div', {
                                className: 'mb-2 flex justify-between',
                                children: [
                                  /* @__PURE__ */ jsx37('span', {
                                    className: 'font-medium',
                                    children: 'Performance Optimization',
                                  }),
                                  /* @__PURE__ */ jsx37('span', { children: '85%' }),
                                ],
                              }),
                              /* @__PURE__ */ jsx37(Progress, { value: 85, className: 'h-2' }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              /* @__PURE__ */ jsxs23('div', {
                className: 'mt-16',
                children: [
                  /* @__PURE__ */ jsx37('h3', {
                    className: 'mb-6 text-center text-xl font-semibold',
                    children: 'Technologies I Work With',
                  }),
                  /* @__PURE__ */ jsxs23('div', {
                    className: 'grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4',
                    children: [
                      /* @__PURE__ */ jsxs23('div', {
                        className: 'space-y-4',
                        children: [
                          /* @__PURE__ */ jsx37('h4', {
                            className: 'font-medium',
                            children: 'Frontend',
                          }),
                          /* @__PURE__ */ jsxs23('div', {
                            className: 'flex flex-wrap gap-2',
                            children: [
                              /* @__PURE__ */ jsx37(Badge, {
                                className: 'px-4 py-2',
                                children: 'JavaScript',
                              }),
                              /* @__PURE__ */ jsx37(Badge, {
                                className: 'px-4 py-2',
                                children: 'TypeScript',
                              }),
                              /* @__PURE__ */ jsx37(Badge, {
                                className: 'px-4 py-2',
                                children: 'React.js',
                              }),
                              /* @__PURE__ */ jsx37(Badge, {
                                className: 'px-4 py-2',
                                children: 'Next.js',
                              }),
                              /* @__PURE__ */ jsx37(Badge, {
                                className: 'px-4 py-2',
                                children: 'Remix',
                              }),
                              /* @__PURE__ */ jsx37(Badge, {
                                className: 'px-4 py-2',
                                children: 'React Native',
                              }),
                              /* @__PURE__ */ jsx37(Badge, {
                                className: 'px-4 py-2',
                                children: 'Vue.js',
                              }),
                              /* @__PURE__ */ jsx37(Badge, {
                                className: 'px-4 py-2',
                                children: 'Tailwind CSS',
                              }),
                            ],
                          }),
                        ],
                      }),
                      /* @__PURE__ */ jsxs23('div', {
                        className: 'space-y-4',
                        children: [
                          /* @__PURE__ */ jsx37('h4', {
                            className: 'font-medium',
                            children: 'UI/UX',
                          }),
                          /* @__PURE__ */ jsxs23('div', {
                            className: 'flex flex-wrap gap-2',
                            children: [
                              /* @__PURE__ */ jsx37(Badge, {
                                className: 'px-4 py-2',
                                children: 'Framer Motion',
                              }),
                              /* @__PURE__ */ jsx37(Badge, {
                                className: 'px-4 py-2',
                                children: 'GSAP',
                              }),
                              /* @__PURE__ */ jsx37(Badge, {
                                className: 'px-4 py-2',
                                children: 'Chakra UI',
                              }),
                              /* @__PURE__ */ jsx37(Badge, {
                                className: 'px-4 py-2',
                                children: 'Bootstrap',
                              }),
                              /* @__PURE__ */ jsx37(Badge, {
                                className: 'px-4 py-2',
                                children: 'SASS',
                              }),
                              /* @__PURE__ */ jsx37(Badge, {
                                className: 'px-4 py-2',
                                children: 'Styled Components',
                              }),
                            ],
                          }),
                        ],
                      }),
                      /* @__PURE__ */ jsxs23('div', {
                        className: 'space-y-4',
                        children: [
                          /* @__PURE__ */ jsx37('h4', {
                            className: 'font-medium',
                            children: 'State & Data',
                          }),
                          /* @__PURE__ */ jsxs23('div', {
                            className: 'flex flex-wrap gap-2',
                            children: [
                              /* @__PURE__ */ jsx37(Badge, {
                                className: 'px-4 py-2',
                                children: 'Zustand',
                              }),
                              /* @__PURE__ */ jsx37(Badge, {
                                className: 'px-4 py-2',
                                children: 'Redux',
                              }),
                              /* @__PURE__ */ jsx37(Badge, {
                                className: 'px-4 py-2',
                                children: 'JWT/OAuth',
                              }),
                              /* @__PURE__ */ jsx37(Badge, {
                                className: 'px-4 py-2',
                                children: 'GraphQL',
                              }),
                              /* @__PURE__ */ jsx37(Badge, {
                                className: 'px-4 py-2',
                                children: 'WebSockets',
                              }),
                              /* @__PURE__ */ jsx37(Badge, {
                                className: 'px-4 py-2',
                                children: 'REST APIs',
                              }),
                            ],
                          }),
                        ],
                      }),
                      /* @__PURE__ */ jsxs23('div', {
                        className: 'space-y-4',
                        children: [
                          /* @__PURE__ */ jsx37('h4', {
                            className: 'font-medium',
                            children: 'Tools & DevOps',
                          }),
                          /* @__PURE__ */ jsxs23('div', {
                            className: 'flex flex-wrap gap-2',
                            children: [
                              /* @__PURE__ */ jsx37(Badge, {
                                className: 'px-4 py-2',
                                children: 'Git',
                              }),
                              /* @__PURE__ */ jsx37(Badge, {
                                className: 'px-4 py-2',
                                children: 'Figma',
                              }),
                              /* @__PURE__ */ jsx37(Badge, {
                                className: 'px-4 py-2',
                                children: 'Vercel',
                              }),
                              /* @__PURE__ */ jsx37(Badge, {
                                className: 'px-4 py-2',
                                children: 'Firebase',
                              }),
                              /* @__PURE__ */ jsx37(Badge, {
                                className: 'px-4 py-2',
                                children: 'AWS Lambda',
                              }),
                              /* @__PURE__ */ jsx37(Badge, {
                                className: 'px-4 py-2',
                                children: 'Jira',
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
        /* @__PURE__ */ jsx37('section', {
          id: 'contact',
          className: 'py-20',
          children: /* @__PURE__ */ jsxs23('div', {
            className: 'container mx-auto px-4',
            children: [
              /* @__PURE__ */ jsxs23('div', {
                className: 'mb-16 flex flex-col items-center text-center',
                children: [
                  /* @__PURE__ */ jsx37(Badge, { className: 'mb-4', children: 'Get In Touch' }),
                  /* @__PURE__ */ jsx37('h2', {
                    className: 'mb-6 text-3xl font-bold md:text-4xl',
                    children: 'Contact Me',
                  }),
                  /* @__PURE__ */ jsx37(Separator, { className: 'mb-6 w-24' }),
                  /* @__PURE__ */ jsx37('p', {
                    className: 'max-w-2xl text-muted-foreground',
                    children:
                      'Have a project in mind or just want to say hello? Feel free to reach out!',
                  }),
                ],
              }),
              /* @__PURE__ */ jsxs23('div', {
                className: 'grid grid-cols-1 gap-12 md:grid-cols-2',
                children: [
                  /* @__PURE__ */ jsx37(ContactForm, {}),
                  /* @__PURE__ */ jsxs23('div', {
                    children: [
                      /* @__PURE__ */ jsx37('h3', {
                        className: 'mb-6 text-xl font-semibold',
                        children: 'Contact Information',
                      }),
                      /* @__PURE__ */ jsxs23('div', {
                        className: 'space-y-6',
                        children: [
                          /* @__PURE__ */ jsxs23('div', {
                            className: 'flex items-start gap-4',
                            children: [
                              /* @__PURE__ */ jsx37('div', {
                                className: 'rounded-full bg-primary/10 p-3',
                                children: /* @__PURE__ */ jsx37(Mail2, {
                                  className: 'h-5 w-5 text-primary',
                                }),
                              }),
                              /* @__PURE__ */ jsxs23('div', {
                                children: [
                                  /* @__PURE__ */ jsx37('h4', {
                                    className: 'font-medium',
                                    children: 'Email',
                                  }),
                                  /* @__PURE__ */ jsx37('p', {
                                    className: 'text-muted-foreground',
                                    children: 'dorospaul26@gmail.com',
                                  }),
                                ],
                              }),
                            ],
                          }),
                          /* @__PURE__ */ jsxs23('div', {
                            className: 'flex items-start gap-4',
                            children: [
                              /* @__PURE__ */ jsx37('div', {
                                className: 'rounded-full bg-primary/10 p-3',
                                children: /* @__PURE__ */ jsx37(Github3, {
                                  className: 'h-5 w-5 text-primary',
                                }),
                              }),
                              /* @__PURE__ */ jsxs23('div', {
                                children: [
                                  /* @__PURE__ */ jsx37('h4', {
                                    className: 'font-medium',
                                    children: 'GitHub',
                                  }),
                                  /* @__PURE__ */ jsx37('a', {
                                    href: 'https://github.com',
                                    target: '_blank',
                                    rel: 'noopener noreferrer',
                                    className: 'text-primary hover:underline',
                                    children: 'github.com/PaulDoros',
                                  }),
                                ],
                              }),
                            ],
                          }),
                          /* @__PURE__ */ jsxs23('div', {
                            className: 'flex items-start gap-4',
                            children: [
                              /* @__PURE__ */ jsx37('div', {
                                className: 'rounded-full bg-primary/10 p-3',
                                children: /* @__PURE__ */ jsxs23('svg', {
                                  className: 'h-5 w-5 text-primary',
                                  xmlns: 'http://www.w3.org/2000/svg',
                                  viewBox: '0 0 24 24',
                                  fill: 'none',
                                  stroke: 'currentColor',
                                  strokeWidth: '2',
                                  strokeLinecap: 'round',
                                  strokeLinejoin: 'round',
                                  children: [
                                    /* @__PURE__ */ jsx37('path', {
                                      d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z',
                                    }),
                                    /* @__PURE__ */ jsx37('rect', {
                                      x: '2',
                                      y: '9',
                                      width: '4',
                                      height: '12',
                                    }),
                                    /* @__PURE__ */ jsx37('circle', { cx: '4', cy: '4', r: '2' }),
                                  ],
                                }),
                              }),
                              /* @__PURE__ */ jsxs23('div', {
                                children: [
                                  /* @__PURE__ */ jsx37('h4', {
                                    className: 'font-medium',
                                    children: 'LinkedIn',
                                  }),
                                  /* @__PURE__ */ jsx37('a', {
                                    href: 'https://linkedin.com',
                                    target: '_blank',
                                    rel: 'noopener noreferrer',
                                    className: 'text-primary hover:underline',
                                    children: 'www.linkedin.com/in/paul-doros-3468a2177',
                                  }),
                                ],
                              }),
                            ],
                          }),
                          /* @__PURE__ */ jsxs23('div', {
                            className: 'flex items-start gap-4',
                            children: [
                              /* @__PURE__ */ jsx37('div', {
                                className: 'rounded-full bg-primary/10 p-3',
                                children: /* @__PURE__ */ jsxs23('svg', {
                                  className: 'h-5 w-5 text-primary',
                                  xmlns: 'http://www.w3.org/2000/svg',
                                  viewBox: '0 0 24 24',
                                  fill: 'none',
                                  stroke: 'currentColor',
                                  strokeWidth: '2',
                                  strokeLinecap: 'round',
                                  strokeLinejoin: 'round',
                                  children: [
                                    /* @__PURE__ */ jsx37('path', {
                                      d: 'M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9',
                                    }),
                                    /* @__PURE__ */ jsx37('path', { d: 'M9 22V12h6v10' }),
                                    /* @__PURE__ */ jsx37('path', { d: 'M2 10.6L12 2l10 8.6' }),
                                  ],
                                }),
                              }),
                              /* @__PURE__ */ jsxs23('div', {
                                children: [
                                  /* @__PURE__ */ jsx37('h4', {
                                    className: 'font-medium',
                                    children: 'Location',
                                  }),
                                  /* @__PURE__ */ jsx37('p', {
                                    className: 'text-muted-foreground',
                                    children: 'Sibiu, Romania',
                                  }),
                                ],
                              }),
                            ],
                          }),
                          /* @__PURE__ */ jsxs23('div', {
                            className: 'flex items-start gap-4',
                            children: [
                              /* @__PURE__ */ jsx37('div', {
                                className: 'rounded-full bg-primary/10 p-3',
                                children: /* @__PURE__ */ jsx37('svg', {
                                  className: 'h-5 w-5 text-primary',
                                  xmlns: 'http://www.w3.org/2000/svg',
                                  viewBox: '0 0 24 24',
                                  fill: 'none',
                                  stroke: 'currentColor',
                                  strokeWidth: '2',
                                  strokeLinecap: 'round',
                                  strokeLinejoin: 'round',
                                  children: /* @__PURE__ */ jsx37('path', {
                                    d: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z',
                                  }),
                                }),
                              }),
                              /* @__PURE__ */ jsxs23('div', {
                                children: [
                                  /* @__PURE__ */ jsx37('h4', {
                                    className: 'font-medium',
                                    children: 'Phone',
                                  }),
                                  /* @__PURE__ */ jsx37('p', {
                                    className: 'text-muted-foreground',
                                    children: '+40 756 436 531',
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      /* @__PURE__ */ jsxs23('div', {
                        className: 'mt-12',
                        children: [
                          /* @__PURE__ */ jsx37('h3', {
                            className: 'mb-6 text-xl font-semibold',
                            children: 'Available For',
                          }),
                          /* @__PURE__ */ jsxs23('ul', {
                            className: 'space-y-3',
                            children: [
                              /* @__PURE__ */ jsxs23('li', {
                                className: 'flex items-center gap-2',
                                children: [
                                  /* @__PURE__ */ jsx37('div', {
                                    className: 'h-2 w-2 rounded-full bg-green-500',
                                  }),
                                  /* @__PURE__ */ jsx37('span', {
                                    children: 'Full-time positions',
                                  }),
                                ],
                              }),
                              /* @__PURE__ */ jsxs23('li', {
                                className: 'flex items-center gap-2',
                                children: [
                                  /* @__PURE__ */ jsx37('div', {
                                    className: 'h-2 w-2 rounded-full bg-green-500',
                                  }),
                                  /* @__PURE__ */ jsx37('span', { children: 'Freelance projects' }),
                                ],
                              }),
                              /* @__PURE__ */ jsxs23('li', {
                                className: 'flex items-center gap-2',
                                children: [
                                  /* @__PURE__ */ jsx37('div', {
                                    className: 'h-2 w-2 rounded-full bg-green-500',
                                  }),
                                  /* @__PURE__ */ jsx37('span', { children: 'Consulting' }),
                                ],
                              }),
                              /* @__PURE__ */ jsxs23('li', {
                                className: 'flex items-center gap-2',
                                children: [
                                  /* @__PURE__ */ jsx37('div', {
                                    className: 'h-2 w-2 rounded-full bg-green-500',
                                  }),
                                  /* @__PURE__ */ jsx37('span', { children: 'Remote work' }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
      ],
    }),
  });
}

// app/routes/_index.tsx
import { Fragment as Fragment6, jsx as jsx38, jsxs as jsxs24 } from 'react/jsx-runtime';
var meta5 = () => [
    { title: 'Paul Ionut Doros | Frontend Developer' },
    {
      name: 'description',
      content:
        'Professional portfolio of Paul Ionut Doros, Frontend Developer with expertise in React, Remix, and modern web technologies',
    },
  ],
  loader3 = async () => json3({});
function Index() {
  let [showAdultWarning, setShowAdultWarning] = useState10(!1),
    [pendingUrl, setPendingUrl] = useState10(null),
    [pendingSiteName, setPendingSiteName] = useState10('');
  return /* @__PURE__ */ jsxs24(Fragment6, {
    children: [
      /* @__PURE__ */ jsx38(ClassicPortfolio, {
        onAdultLinkClick: (url, siteName) => e => {
          e.preventDefault(),
            setPendingUrl(url),
            setPendingSiteName(siteName),
            setShowAdultWarning(!0);
        },
      }),
      /* @__PURE__ */ jsx38(AdultContentModal, {
        isOpen: showAdultWarning,
        onClose: () => {
          setShowAdultWarning(!1), setPendingUrl(null), setPendingSiteName('');
        },
        onConfirm: () => {
          pendingUrl &&
            (window.open(pendingUrl, '_blank'),
            setShowAdultWarning(!1),
            setPendingUrl(null),
            setPendingSiteName(''));
        },
        siteName: pendingSiteName,
      }),
    ],
  });
}

// app/routes/terms.tsx
var terms_exports = {};
__export(terms_exports, {
  default: () => Terms,
  meta: () => meta6,
});
import { jsx as jsx39, jsxs as jsxs25 } from 'react/jsx-runtime';
var meta6 = () => [
  { title: 'Terms of Service | Paul Doros' },
  { name: 'description', content: 'Terms of service for Paul Doros portfolio website' },
];
function Terms() {
  return /* @__PURE__ */ jsx39(Layout, {
    children: /* @__PURE__ */ jsx39('div', {
      className: 'container mx-auto px-4 py-20',
      children: /* @__PURE__ */ jsxs25('div', {
        className: 'mx-auto max-w-3xl',
        children: [
          /* @__PURE__ */ jsx39('h1', {
            className: 'mb-6 text-3xl font-bold md:text-4xl',
            children: 'Terms of Service',
          }),
          /* @__PURE__ */ jsx39(Separator, { className: 'mb-8' }),
          /* @__PURE__ */ jsxs25('section', {
            className: 'mb-10',
            children: [
              /* @__PURE__ */ jsx39('h2', {
                className: 'mb-4 text-2xl font-semibold',
                children: 'Introduction',
              }),
              /* @__PURE__ */ jsx39('p', {
                className: 'mb-4 text-muted-foreground',
                children:
                  'Welcome to my portfolio website. These terms and conditions outline the rules and regulations for the use of this website. By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use this website if you do not accept all of the terms and conditions stated on this page.',
              }),
            ],
          }),
          /* @__PURE__ */ jsxs25('section', {
            className: 'mb-10',
            children: [
              /* @__PURE__ */ jsx39('h2', {
                className: 'mb-4 text-2xl font-semibold',
                children: 'Intellectual Property Rights',
              }),
              /* @__PURE__ */ jsx39('p', {
                className: 'mb-4 text-muted-foreground',
                children:
                  'Unless otherwise stated, I own the intellectual property rights for all material on this website. All intellectual property rights are reserved. You may view and/or print pages from this website for your own personal use subject to restrictions set in these terms and conditions.',
              }),
              /* @__PURE__ */ jsx39('p', {
                className: 'mb-4 text-muted-foreground',
                children: 'You must not:',
              }),
              /* @__PURE__ */ jsxs25('ul', {
                className: 'mb-4 list-inside list-disc space-y-2 text-muted-foreground',
                children: [
                  /* @__PURE__ */ jsx39('li', { children: 'Republish material from this website' }),
                  /* @__PURE__ */ jsx39('li', {
                    children: 'Sell, rent, or sub-license material from this website',
                  }),
                  /* @__PURE__ */ jsx39('li', {
                    children: 'Reproduce, duplicate, or copy material from this website',
                  }),
                  /* @__PURE__ */ jsx39('li', {
                    children: 'Redistribute content from this website',
                  }),
                ],
              }),
            ],
          }),
          /* @__PURE__ */ jsxs25('section', {
            className: 'mb-10',
            children: [
              /* @__PURE__ */ jsx39('h2', {
                className: 'mb-4 text-2xl font-semibold',
                children: 'User Content',
              }),
              /* @__PURE__ */ jsx39('p', {
                className: 'mb-4 text-muted-foreground',
                children:
                  'In these terms and conditions, "User Content" means material (including without limitation text, images, audio material, video material, and audio-visual material) that you submit to this website, for whatever purpose.',
              }),
              /* @__PURE__ */ jsx39('p', {
                className: 'mb-4 text-muted-foreground',
                children:
                  'You grant me a worldwide, irrevocable, non-exclusive, royalty-free license to use, reproduce, adapt, publish, translate, and distribute your User Content in any existing or future media. You also grant me the right to sub-license these rights and the right to bring an action for infringement of these rights.',
              }),
            ],
          }),
          /* @__PURE__ */ jsxs25('section', {
            className: 'mb-10',
            children: [
              /* @__PURE__ */ jsx39('h2', {
                className: 'mb-4 text-2xl font-semibold',
                children: 'No Warranties',
              }),
              /* @__PURE__ */ jsx39('p', {
                className: 'mb-4 text-muted-foreground',
                children:
                  'This website is provided "as is" without any representations or warranties, express or implied. I make no representations or warranties in relation to this website or the information and materials provided on this website.',
              }),
              /* @__PURE__ */ jsx39('p', {
                className: 'mb-4 text-muted-foreground',
                children:
                  'Nothing on this website constitutes, or is meant to constitute, advice of any kind.',
              }),
            ],
          }),
          /* @__PURE__ */ jsxs25('section', {
            className: 'mb-10',
            children: [
              /* @__PURE__ */ jsx39('h2', {
                className: 'mb-4 text-2xl font-semibold',
                children: 'Limitations of Liability',
              }),
              /* @__PURE__ */ jsx39('p', {
                className: 'mb-4 text-muted-foreground',
                children:
                  'I will not be liable to you in relation to the contents of, or use of, or otherwise in connection with, this website for any indirect, special, or consequential loss; or for any business losses, loss of revenue, income, profits or anticipated savings, loss of contracts or business relationships, loss of reputation or goodwill, or loss or corruption of information or data.',
              }),
            ],
          }),
          /* @__PURE__ */ jsxs25('section', {
            className: 'mb-10',
            children: [
              /* @__PURE__ */ jsx39('h2', {
                className: 'mb-4 text-2xl font-semibold',
                children: 'External Links',
              }),
              /* @__PURE__ */ jsx39('p', {
                className: 'mb-4 text-muted-foreground',
                children:
                  'This website may contain links to other websites. I have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.',
              }),
            ],
          }),
          /* @__PURE__ */ jsxs25('section', {
            children: [
              /* @__PURE__ */ jsx39('h2', {
                className: 'mb-4 text-2xl font-semibold',
                children: 'Changes to These Terms',
              }),
              /* @__PURE__ */ jsx39('p', {
                className: 'mb-4 text-muted-foreground',
                children:
                  'I may revise these terms of service for this website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms and conditions.',
              }),
              /* @__PURE__ */ jsx39('p', {
                className: 'text-muted-foreground',
                children: 'These terms were last updated on [Current Date].',
              }),
            ],
          }),
        ],
      }),
    }),
  });
}

// app/routes/test.tsx
var test_exports = {};
__export(test_exports, {
  default: () => TestPage,
  loader: () => loader4,
  meta: () => meta7,
});
import { useState as useState11 } from 'react';
import { json as json4 } from '@remix-run/node';

// app/components/portfolios/animated-portfolio.tsx
import { Link as Link4 } from '@remix-run/react';
import { Github as Github4, Mail as Mail3 } from 'lucide-react';
import { jsx as jsx40, jsxs as jsxs26 } from 'react/jsx-runtime';
function AnimatedPortfolio({ onAdultLinkClick }) {
  return /* @__PURE__ */ jsx40(Layout, {
    children: /* @__PURE__ */ jsxs26('div', {
      className: 'classic-version bg-red-500',
      children: [
        /* @__PURE__ */ jsx40(AnimatedHero, {}),
        /* @__PURE__ */ jsx40(ClassicAbout, {}),
        /* @__PURE__ */ jsx40('section', {
          id: 'projects',
          className: 'py-20',
          children: /* @__PURE__ */ jsxs26('div', {
            className: 'container mx-auto px-4',
            children: [
              /* @__PURE__ */ jsxs26('div', {
                className: 'mb-16 flex flex-col items-center text-center',
                children: [
                  /* @__PURE__ */ jsx40(Badge, { className: 'mb-4', children: 'My Work' }),
                  /* @__PURE__ */ jsx40('h2', {
                    className: 'mb-6 text-3xl font-bold md:text-4xl',
                    children: 'Featured Projects',
                  }),
                  /* @__PURE__ */ jsx40(Separator, { className: 'mb-6 w-24' }),
                  /* @__PURE__ */ jsx40('p', {
                    className: 'max-w-2xl text-muted-foreground',
                    children:
                      'A collection of my recent projects demonstrating my skills and capabilities.',
                  }),
                ],
              }),
              /* @__PURE__ */ jsxs26('div', {
                className: 'grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3',
                children: [
                  /* @__PURE__ */ jsxs26(Card, {
                    className:
                      'flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg',
                    children: [
                      /* @__PURE__ */ jsx40('div', {
                        className: 'relative aspect-video bg-muted',
                        children: /* @__PURE__ */ jsx40('div', {
                          className: 'absolute inset-0 flex items-center justify-center',
                          children: /* @__PURE__ */ jsx40('img', {
                            src: '/images/devjourney.png',
                            alt: 'Dev Journey Project Screenshot',
                            className: 'h-full w-full object-cover',
                          }),
                        }),
                      }),
                      /* @__PURE__ */ jsxs26(CardHeader, {
                        children: [
                          /* @__PURE__ */ jsx40(CardTitle, { children: 'Dev Journey' }),
                          /* @__PURE__ */ jsx40(CardDescription, {
                            children: 'Personal learning and portfolio website',
                          }),
                        ],
                      }),
                      /* @__PURE__ */ jsxs26(CardContent, {
                        className: 'flex-grow',
                        children: [
                          /* @__PURE__ */ jsx40('p', {
                            className: 'mb-4 text-sm text-muted-foreground',
                            children:
                              'A comprehensive learning platform that combines portfolio showcasing with interactive learning features. Built with modern web technologies and a focus on user engagement.',
                          }),
                          /* @__PURE__ */ jsxs26('div', {
                            className: 'mb-4 space-y-2',
                            children: [
                              /* @__PURE__ */ jsx40('h4', {
                                className: 'text-sm font-medium',
                                children: 'Key Features:',
                              }),
                              /* @__PURE__ */ jsxs26('ul', {
                                className: 'space-y-1 text-sm text-muted-foreground',
                                children: [
                                  /* @__PURE__ */ jsx40('li', {
                                    children: '\u2022 User authentication and profile management',
                                  }),
                                  /* @__PURE__ */ jsx40('li', {
                                    children:
                                      '\u2022 Interactive learning modules and progress tracking',
                                  }),
                                  /* @__PURE__ */ jsx40('li', {
                                    children:
                                      '\u2022 Gamification system with achievements and badges',
                                  }),
                                  /* @__PURE__ */ jsx40('li', {
                                    children: '\u2022 Responsive design with dark/light mode',
                                  }),
                                  /* @__PURE__ */ jsx40('li', {
                                    children: '\u2022 Dynamic UI components and animations',
                                  }),
                                ],
                              }),
                            ],
                          }),
                          /* @__PURE__ */ jsxs26('div', {
                            className: 'mt-4 flex flex-wrap gap-2',
                            children: [
                              /* @__PURE__ */ jsx40(Badge, {
                                variant: 'secondary',
                                children: 'Remix',
                              }),
                              /* @__PURE__ */ jsx40(Badge, {
                                variant: 'secondary',
                                children: 'React',
                              }),
                              /* @__PURE__ */ jsx40(Badge, {
                                variant: 'secondary',
                                children: 'TypeScript',
                              }),
                              /* @__PURE__ */ jsx40(Badge, {
                                variant: 'secondary',
                                children: 'Tailwind CSS',
                              }),
                              /* @__PURE__ */ jsx40(Badge, {
                                variant: 'secondary',
                                children: 'Prisma',
                              }),
                              /* @__PURE__ */ jsx40(Badge, {
                                variant: 'secondary',
                                children: 'PostgreSQL',
                              }),
                            ],
                          }),
                        ],
                      }),
                      /* @__PURE__ */ jsxs26(CardFooter, {
                        className: 'mt-auto flex justify-between',
                        children: [
                          /* @__PURE__ */ jsx40(Button, {
                            variant: 'outline',
                            size: 'sm',
                            asChild: !0,
                            children: /* @__PURE__ */ jsx40('a', {
                              href: 'https://github.com',
                              target: '_blank',
                              rel: 'noopener noreferrer',
                              children: 'Code',
                            }),
                          }),
                          /* @__PURE__ */ jsx40(Button, {
                            size: 'sm',
                            asChild: !0,
                            children: /* @__PURE__ */ jsx40('a', {
                              href: 'https://dev-journey-five.vercel.app',
                              target: '_blank',
                              rel: 'noopener noreferrer',
                              children: 'Demo',
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  /* @__PURE__ */ jsxs26(Card, {
                    className:
                      'flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg',
                    children: [
                      /* @__PURE__ */ jsx40('div', {
                        className: 'relative aspect-video bg-muted',
                        children: /* @__PURE__ */ jsx40('div', {
                          className: 'absolute inset-0 flex items-center justify-center blur-xl',
                          children: /* @__PURE__ */ jsx40('img', {
                            src: '/images/ai.png',
                            alt: 'Kinky AI Chat Project Screenshot',
                            className: 'h-full w-full object-cover',
                          }),
                        }),
                      }),
                      /* @__PURE__ */ jsxs26(CardHeader, {
                        children: [
                          /* @__PURE__ */ jsx40(CardTitle, { children: 'Kinky AI Chat' }),
                          /* @__PURE__ */ jsx40(CardDescription, {
                            children: 'Real-Time AI Chat System',
                          }),
                        ],
                      }),
                      /* @__PURE__ */ jsxs26(CardContent, {
                        className: 'flex-grow',
                        children: [
                          /* @__PURE__ */ jsx40('p', {
                            className: 'mb-4 text-sm text-muted-foreground',
                            children:
                              'An advanced AI-powered chat platform featuring real-time communication, intelligent message filtering, and personalized user interactions.',
                          }),
                          /* @__PURE__ */ jsxs26('div', {
                            className: 'mb-4 space-y-2',
                            children: [
                              /* @__PURE__ */ jsx40('h4', {
                                className: 'text-sm font-medium',
                                children: 'Key Features:',
                              }),
                              /* @__PURE__ */ jsxs26('ul', {
                                className: 'space-y-1 text-sm text-muted-foreground',
                                children: [
                                  /* @__PURE__ */ jsx40('li', {
                                    children:
                                      '\u2022 Real-time messaging with WebSocket integration',
                                  }),
                                  /* @__PURE__ */ jsx40('li', {
                                    children: '\u2022 AI-powered message filtering and moderation',
                                  }),
                                  /* @__PURE__ */ jsx40('li', {
                                    children: '\u2022 Smart auto-suggestions and context awareness',
                                  }),
                                  /* @__PURE__ */ jsx40('li', {
                                    children: '\u2022 User tagging and notification system',
                                  }),
                                  /* @__PURE__ */ jsx40('li', {
                                    children: '\u2022 Responsive mobile-first design',
                                  }),
                                ],
                              }),
                            ],
                          }),
                          /* @__PURE__ */ jsxs26('div', {
                            className: 'mt-4 flex flex-wrap gap-2',
                            children: [
                              /* @__PURE__ */ jsx40(Badge, {
                                variant: 'secondary',
                                children: 'React.js',
                              }),
                              /* @__PURE__ */ jsx40(Badge, {
                                variant: 'secondary',
                                children: 'Next.js',
                              }),
                              /* @__PURE__ */ jsx40(Badge, {
                                variant: 'secondary',
                                children: 'WebSockets',
                              }),
                              /* @__PURE__ */ jsx40(Badge, {
                                variant: 'secondary',
                                children: 'AI Integration',
                              }),
                              /* @__PURE__ */ jsx40(Badge, {
                                variant: 'secondary',
                                children: 'TypeScript',
                              }),
                              /* @__PURE__ */ jsx40(Badge, {
                                variant: 'secondary',
                                children: 'Tailwind CSS',
                              }),
                            ],
                          }),
                        ],
                      }),
                      /* @__PURE__ */ jsxs26(CardFooter, {
                        className: 'mt-auto flex justify-between',
                        children: [
                          /* @__PURE__ */ jsx40(Button, {
                            variant: 'outline',
                            size: 'sm',
                            asChild: !0,
                            children: /* @__PURE__ */ jsx40('a', {
                              href: 'https://github.com',
                              target: '_blank',
                              rel: 'noopener noreferrer',
                              children: 'Code',
                            }),
                          }),
                          /* @__PURE__ */ jsx40(Button, {
                            size: 'sm',
                            asChild: !0,
                            children: /* @__PURE__ */ jsx40('a', {
                              href: 'https://chat.kink.ai',
                              onClick: onAdultLinkClick('https://chat.kink.ai', 'Kinky AI Chat'),
                              className:
                                'flex items-center text-muted-foreground transition-colors hover:text-foreground',
                              children: 'Demo',
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  /* @__PURE__ */ jsxs26(Card, {
                    className:
                      'flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg',
                    children: [
                      /* @__PURE__ */ jsx40('div', {
                        className: 'relative aspect-video bg-muted',
                        children: /* @__PURE__ */ jsx40('div', {
                          className: 'absolute inset-0 flex items-center justify-center blur-xl',
                          children: /* @__PURE__ */ jsx40('img', {
                            src: '/images/clips.png',
                            alt: 'KinkyClips Project Screenshot',
                            className: 'h-full w-full object-cover',
                          }),
                        }),
                      }),
                      /* @__PURE__ */ jsxs26(CardHeader, {
                        children: [
                          /* @__PURE__ */ jsx40(CardTitle, { children: 'KinkyClips' }),
                          /* @__PURE__ */ jsx40(CardDescription, {
                            children: 'Mobile & Web Application',
                          }),
                        ],
                      }),
                      /* @__PURE__ */ jsxs26(CardContent, {
                        className: 'flex-grow',
                        children: [
                          /* @__PURE__ */ jsx40('p', {
                            className: 'mb-4 text-sm text-muted-foreground',
                            children:
                              'A cross-platform mobile application with advanced video processing capabilities, available on both iOS and Android platforms.',
                          }),
                          /* @__PURE__ */ jsxs26('div', {
                            className: 'mb-4 space-y-2',
                            children: [
                              /* @__PURE__ */ jsx40('h4', {
                                className: 'text-sm font-medium',
                                children: 'Key Features:',
                              }),
                              /* @__PURE__ */ jsxs26('ul', {
                                className: 'space-y-1 text-sm text-muted-foreground',
                                children: [
                                  /* @__PURE__ */ jsx40('li', {
                                    children: '\u2022 Cross-platform mobile app (iOS & Android)',
                                  }),
                                  /* @__PURE__ */ jsx40('li', {
                                    children: '\u2022 Advanced video processing and editing',
                                  }),
                                  /* @__PURE__ */ jsx40('li', {
                                    children: '\u2022 Adaptive streaming for optimal performance',
                                  }),
                                  /* @__PURE__ */ jsx40('li', {
                                    children: '\u2022 Secure payment integration',
                                  }),
                                  /* @__PURE__ */ jsx40('li', {
                                    children: '\u2022 Admin dashboard for content management',
                                  }),
                                ],
                              }),
                            ],
                          }),
                          /* @__PURE__ */ jsxs26('div', {
                            className: 'mt-4 flex flex-wrap gap-2',
                            children: [
                              /* @__PURE__ */ jsx40(Badge, {
                                variant: 'secondary',
                                children: 'React Native',
                              }),
                              /* @__PURE__ */ jsx40(Badge, {
                                variant: 'secondary',
                                children: 'Mobile Apps',
                              }),
                              /* @__PURE__ */ jsx40(Badge, {
                                variant: 'secondary',
                                children: 'Video Processing',
                              }),
                              /* @__PURE__ */ jsx40(Badge, {
                                variant: 'secondary',
                                children: 'Payments',
                              }),
                              /* @__PURE__ */ jsx40(Badge, {
                                variant: 'secondary',
                                children: 'Firebase',
                              }),
                              /* @__PURE__ */ jsx40(Badge, {
                                variant: 'secondary',
                                children: 'AWS',
                              }),
                            ],
                          }),
                        ],
                      }),
                      /* @__PURE__ */ jsxs26(CardFooter, {
                        className: 'mt-auto flex justify-between',
                        children: [
                          /* @__PURE__ */ jsx40(Button, {
                            variant: 'outline',
                            size: 'sm',
                            asChild: !0,
                            children: /* @__PURE__ */ jsx40('a', {
                              href: 'https://github.com',
                              target: '_blank',
                              rel: 'noopener noreferrer',
                              children: 'Code',
                            }),
                          }),
                          /* @__PURE__ */ jsx40(Button, {
                            size: 'sm',
                            asChild: !0,
                            children: /* @__PURE__ */ jsx40('a', {
                              href: 'https://kinkyclips.com',
                              onClick: onAdultLinkClick('https://kinkyclips.com', 'KinkyClips'),
                              className:
                                'flex items-center text-muted-foreground transition-colors hover:text-foreground',
                              children: 'Demo',
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              /* @__PURE__ */ jsx40('div', {
                className: 'mt-12 flex justify-center',
                children: /* @__PURE__ */ jsx40(Button, {
                  variant: 'outline',
                  asChild: !0,
                  children: /* @__PURE__ */ jsx40(Link4, {
                    to: '/projects',
                    children: 'View All Projects',
                  }),
                }),
              }),
            ],
          }),
        }),
        /* @__PURE__ */ jsx40('section', {
          id: 'skills',
          className: 'bg-muted/50 py-20',
          children: /* @__PURE__ */ jsxs26('div', {
            className: 'container mx-auto px-4',
            children: [
              /* @__PURE__ */ jsxs26('div', {
                className: 'mb-16 flex flex-col items-center text-center',
                children: [
                  /* @__PURE__ */ jsx40(Badge, { className: 'mb-4', children: 'Expertise' }),
                  /* @__PURE__ */ jsx40('h2', {
                    className: 'mb-6 text-3xl font-bold md:text-4xl',
                    children: 'My Skills',
                  }),
                  /* @__PURE__ */ jsx40(Separator, { className: 'mb-6 w-24' }),
                  /* @__PURE__ */ jsx40('p', {
                    className: 'max-w-2xl text-muted-foreground',
                    children: 'A comprehensive overview of my technical skills and proficiencies.',
                  }),
                ],
              }),
              /* @__PURE__ */ jsxs26('div', {
                className: 'grid grid-cols-1 gap-12 md:grid-cols-2',
                children: [
                  /* @__PURE__ */ jsxs26('div', {
                    children: [
                      /* @__PURE__ */ jsx40('h3', {
                        className: 'mb-6 text-xl font-semibold',
                        children: 'Frontend Development',
                      }),
                      /* @__PURE__ */ jsxs26('div', {
                        className: 'space-y-6',
                        children: [
                          /* @__PURE__ */ jsxs26('div', {
                            children: [
                              /* @__PURE__ */ jsxs26('div', {
                                className: 'mb-2 flex justify-between',
                                children: [
                                  /* @__PURE__ */ jsx40('span', {
                                    className: 'font-medium',
                                    children: 'React/Remix',
                                  }),
                                  /* @__PURE__ */ jsx40('span', { children: '95%' }),
                                ],
                              }),
                              /* @__PURE__ */ jsx40(Progress, { value: 95, className: 'h-2' }),
                            ],
                          }),
                          /* @__PURE__ */ jsxs26('div', {
                            children: [
                              /* @__PURE__ */ jsxs26('div', {
                                className: 'mb-2 flex justify-between',
                                children: [
                                  /* @__PURE__ */ jsx40('span', {
                                    className: 'font-medium',
                                    children: 'TypeScript',
                                  }),
                                  /* @__PURE__ */ jsx40('span', { children: '90%' }),
                                ],
                              }),
                              /* @__PURE__ */ jsx40(Progress, { value: 90, className: 'h-2' }),
                            ],
                          }),
                          /* @__PURE__ */ jsxs26('div', {
                            children: [
                              /* @__PURE__ */ jsxs26('div', {
                                className: 'mb-2 flex justify-between',
                                children: [
                                  /* @__PURE__ */ jsx40('span', {
                                    className: 'font-medium',
                                    children: 'Tailwind CSS',
                                  }),
                                  /* @__PURE__ */ jsx40('span', { children: '85%' }),
                                ],
                              }),
                              /* @__PURE__ */ jsx40(Progress, { value: 85, className: 'h-2' }),
                            ],
                          }),
                          /* @__PURE__ */ jsxs26('div', {
                            children: [
                              /* @__PURE__ */ jsxs26('div', {
                                className: 'mb-2 flex justify-between',
                                children: [
                                  /* @__PURE__ */ jsx40('span', {
                                    className: 'font-medium',
                                    children: 'React Native',
                                  }),
                                  /* @__PURE__ */ jsx40('span', { children: '85%' }),
                                ],
                              }),
                              /* @__PURE__ */ jsx40(Progress, { value: 85, className: 'h-2' }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  /* @__PURE__ */ jsxs26('div', {
                    children: [
                      /* @__PURE__ */ jsx40('h3', {
                        className: 'mb-6 text-xl font-semibold',
                        children: 'Additional Skills',
                      }),
                      /* @__PURE__ */ jsxs26('div', {
                        className: 'space-y-6',
                        children: [
                          /* @__PURE__ */ jsxs26('div', {
                            children: [
                              /* @__PURE__ */ jsxs26('div', {
                                className: 'mb-2 flex justify-between',
                                children: [
                                  /* @__PURE__ */ jsx40('span', {
                                    className: 'font-medium',
                                    children: 'UI/UX Implementation',
                                  }),
                                  /* @__PURE__ */ jsx40('span', { children: '90%' }),
                                ],
                              }),
                              /* @__PURE__ */ jsx40(Progress, { value: 90, className: 'h-2' }),
                            ],
                          }),
                          /* @__PURE__ */ jsxs26('div', {
                            children: [
                              /* @__PURE__ */ jsxs26('div', {
                                className: 'mb-2 flex justify-between',
                                children: [
                                  /* @__PURE__ */ jsx40('span', {
                                    className: 'font-medium',
                                    children: 'Animations & Effects',
                                  }),
                                  /* @__PURE__ */ jsx40('span', { children: '85%' }),
                                ],
                              }),
                              /* @__PURE__ */ jsx40(Progress, { value: 85, className: 'h-2' }),
                            ],
                          }),
                          /* @__PURE__ */ jsxs26('div', {
                            children: [
                              /* @__PURE__ */ jsxs26('div', {
                                className: 'mb-2 flex justify-between',
                                children: [
                                  /* @__PURE__ */ jsx40('span', {
                                    className: 'font-medium',
                                    children: 'State Management',
                                  }),
                                  /* @__PURE__ */ jsx40('span', { children: '80%' }),
                                ],
                              }),
                              /* @__PURE__ */ jsx40(Progress, { value: 80, className: 'h-2' }),
                            ],
                          }),
                          /* @__PURE__ */ jsxs26('div', {
                            children: [
                              /* @__PURE__ */ jsxs26('div', {
                                className: 'mb-2 flex justify-between',
                                children: [
                                  /* @__PURE__ */ jsx40('span', {
                                    className: 'font-medium',
                                    children: 'Performance Optimization',
                                  }),
                                  /* @__PURE__ */ jsx40('span', { children: '85%' }),
                                ],
                              }),
                              /* @__PURE__ */ jsx40(Progress, { value: 85, className: 'h-2' }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              /* @__PURE__ */ jsxs26('div', {
                className: 'mt-16',
                children: [
                  /* @__PURE__ */ jsx40('h3', {
                    className: 'mb-6 text-center text-xl font-semibold',
                    children: 'Technologies I Work With',
                  }),
                  /* @__PURE__ */ jsxs26('div', {
                    className: 'grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4',
                    children: [
                      /* @__PURE__ */ jsxs26('div', {
                        className: 'space-y-4',
                        children: [
                          /* @__PURE__ */ jsx40('h4', {
                            className: 'font-medium',
                            children: 'Frontend',
                          }),
                          /* @__PURE__ */ jsxs26('div', {
                            className: 'flex flex-wrap gap-2',
                            children: [
                              /* @__PURE__ */ jsx40(Badge, {
                                className: 'px-4 py-2',
                                children: 'JavaScript',
                              }),
                              /* @__PURE__ */ jsx40(Badge, {
                                className: 'px-4 py-2',
                                children: 'TypeScript',
                              }),
                              /* @__PURE__ */ jsx40(Badge, {
                                className: 'px-4 py-2',
                                children: 'React.js',
                              }),
                              /* @__PURE__ */ jsx40(Badge, {
                                className: 'px-4 py-2',
                                children: 'Next.js',
                              }),
                              /* @__PURE__ */ jsx40(Badge, {
                                className: 'px-4 py-2',
                                children: 'Remix',
                              }),
                              /* @__PURE__ */ jsx40(Badge, {
                                className: 'px-4 py-2',
                                children: 'React Native',
                              }),
                              /* @__PURE__ */ jsx40(Badge, {
                                className: 'px-4 py-2',
                                children: 'Vue.js',
                              }),
                              /* @__PURE__ */ jsx40(Badge, {
                                className: 'px-4 py-2',
                                children: 'Tailwind CSS',
                              }),
                            ],
                          }),
                        ],
                      }),
                      /* @__PURE__ */ jsxs26('div', {
                        className: 'space-y-4',
                        children: [
                          /* @__PURE__ */ jsx40('h4', {
                            className: 'font-medium',
                            children: 'UI/UX',
                          }),
                          /* @__PURE__ */ jsxs26('div', {
                            className: 'flex flex-wrap gap-2',
                            children: [
                              /* @__PURE__ */ jsx40(Badge, {
                                className: 'px-4 py-2',
                                children: 'Framer Motion',
                              }),
                              /* @__PURE__ */ jsx40(Badge, {
                                className: 'px-4 py-2',
                                children: 'GSAP',
                              }),
                              /* @__PURE__ */ jsx40(Badge, {
                                className: 'px-4 py-2',
                                children: 'Chakra UI',
                              }),
                              /* @__PURE__ */ jsx40(Badge, {
                                className: 'px-4 py-2',
                                children: 'Bootstrap',
                              }),
                              /* @__PURE__ */ jsx40(Badge, {
                                className: 'px-4 py-2',
                                children: 'SASS',
                              }),
                              /* @__PURE__ */ jsx40(Badge, {
                                className: 'px-4 py-2',
                                children: 'Styled Components',
                              }),
                            ],
                          }),
                        ],
                      }),
                      /* @__PURE__ */ jsxs26('div', {
                        className: 'space-y-4',
                        children: [
                          /* @__PURE__ */ jsx40('h4', {
                            className: 'font-medium',
                            children: 'State & Data',
                          }),
                          /* @__PURE__ */ jsxs26('div', {
                            className: 'flex flex-wrap gap-2',
                            children: [
                              /* @__PURE__ */ jsx40(Badge, {
                                className: 'px-4 py-2',
                                children: 'Zustand',
                              }),
                              /* @__PURE__ */ jsx40(Badge, {
                                className: 'px-4 py-2',
                                children: 'Redux',
                              }),
                              /* @__PURE__ */ jsx40(Badge, {
                                className: 'px-4 py-2',
                                children: 'JWT/OAuth',
                              }),
                              /* @__PURE__ */ jsx40(Badge, {
                                className: 'px-4 py-2',
                                children: 'GraphQL',
                              }),
                              /* @__PURE__ */ jsx40(Badge, {
                                className: 'px-4 py-2',
                                children: 'WebSockets',
                              }),
                              /* @__PURE__ */ jsx40(Badge, {
                                className: 'px-4 py-2',
                                children: 'REST APIs',
                              }),
                            ],
                          }),
                        ],
                      }),
                      /* @__PURE__ */ jsxs26('div', {
                        className: 'space-y-4',
                        children: [
                          /* @__PURE__ */ jsx40('h4', {
                            className: 'font-medium',
                            children: 'Tools & DevOps',
                          }),
                          /* @__PURE__ */ jsxs26('div', {
                            className: 'flex flex-wrap gap-2',
                            children: [
                              /* @__PURE__ */ jsx40(Badge, {
                                className: 'px-4 py-2',
                                children: 'Git',
                              }),
                              /* @__PURE__ */ jsx40(Badge, {
                                className: 'px-4 py-2',
                                children: 'Figma',
                              }),
                              /* @__PURE__ */ jsx40(Badge, {
                                className: 'px-4 py-2',
                                children: 'Vercel',
                              }),
                              /* @__PURE__ */ jsx40(Badge, {
                                className: 'px-4 py-2',
                                children: 'Firebase',
                              }),
                              /* @__PURE__ */ jsx40(Badge, {
                                className: 'px-4 py-2',
                                children: 'AWS Lambda',
                              }),
                              /* @__PURE__ */ jsx40(Badge, {
                                className: 'px-4 py-2',
                                children: 'Jira',
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
        /* @__PURE__ */ jsx40('section', {
          id: 'contact',
          className: 'py-20',
          children: /* @__PURE__ */ jsxs26('div', {
            className: 'container mx-auto px-4',
            children: [
              /* @__PURE__ */ jsxs26('div', {
                className: 'mb-16 flex flex-col items-center text-center',
                children: [
                  /* @__PURE__ */ jsx40(Badge, { className: 'mb-4', children: 'Get In Touch' }),
                  /* @__PURE__ */ jsx40('h2', {
                    className: 'mb-6 text-3xl font-bold md:text-4xl',
                    children: 'Contact Me',
                  }),
                  /* @__PURE__ */ jsx40(Separator, { className: 'mb-6 w-24' }),
                  /* @__PURE__ */ jsx40('p', {
                    className: 'max-w-2xl text-muted-foreground',
                    children:
                      'Have a project in mind or just want to say hello? Feel free to reach out!',
                  }),
                ],
              }),
              /* @__PURE__ */ jsxs26('div', {
                className: 'grid grid-cols-1 gap-12 md:grid-cols-2',
                children: [
                  /* @__PURE__ */ jsx40(ContactForm, {}),
                  /* @__PURE__ */ jsxs26('div', {
                    children: [
                      /* @__PURE__ */ jsx40('h3', {
                        className: 'mb-6 text-xl font-semibold',
                        children: 'Contact Information',
                      }),
                      /* @__PURE__ */ jsxs26('div', {
                        className: 'space-y-6',
                        children: [
                          /* @__PURE__ */ jsxs26('div', {
                            className: 'flex items-start gap-4',
                            children: [
                              /* @__PURE__ */ jsx40('div', {
                                className: 'rounded-full bg-primary/10 p-3',
                                children: /* @__PURE__ */ jsx40(Mail3, {
                                  className: 'h-5 w-5 text-primary',
                                }),
                              }),
                              /* @__PURE__ */ jsxs26('div', {
                                children: [
                                  /* @__PURE__ */ jsx40('h4', {
                                    className: 'font-medium',
                                    children: 'Email',
                                  }),
                                  /* @__PURE__ */ jsx40('p', {
                                    className: 'text-muted-foreground',
                                    children: 'dorospaul26@gmail.com',
                                  }),
                                ],
                              }),
                            ],
                          }),
                          /* @__PURE__ */ jsxs26('div', {
                            className: 'flex items-start gap-4',
                            children: [
                              /* @__PURE__ */ jsx40('div', {
                                className: 'rounded-full bg-primary/10 p-3',
                                children: /* @__PURE__ */ jsx40(Github4, {
                                  className: 'h-5 w-5 text-primary',
                                }),
                              }),
                              /* @__PURE__ */ jsxs26('div', {
                                children: [
                                  /* @__PURE__ */ jsx40('h4', {
                                    className: 'font-medium',
                                    children: 'GitHub',
                                  }),
                                  /* @__PURE__ */ jsx40('a', {
                                    href: 'https://github.com',
                                    target: '_blank',
                                    rel: 'noopener noreferrer',
                                    className: 'text-primary hover:underline',
                                    children: 'github.com/PaulDoros',
                                  }),
                                ],
                              }),
                            ],
                          }),
                          /* @__PURE__ */ jsxs26('div', {
                            className: 'flex items-start gap-4',
                            children: [
                              /* @__PURE__ */ jsx40('div', {
                                className: 'rounded-full bg-primary/10 p-3',
                                children: /* @__PURE__ */ jsxs26('svg', {
                                  className: 'h-5 w-5 text-primary',
                                  xmlns: 'http://www.w3.org/2000/svg',
                                  viewBox: '0 0 24 24',
                                  fill: 'none',
                                  stroke: 'currentColor',
                                  strokeWidth: '2',
                                  strokeLinecap: 'round',
                                  strokeLinejoin: 'round',
                                  children: [
                                    /* @__PURE__ */ jsx40('path', {
                                      d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z',
                                    }),
                                    /* @__PURE__ */ jsx40('rect', {
                                      x: '2',
                                      y: '9',
                                      width: '4',
                                      height: '12',
                                    }),
                                    /* @__PURE__ */ jsx40('circle', { cx: '4', cy: '4', r: '2' }),
                                  ],
                                }),
                              }),
                              /* @__PURE__ */ jsxs26('div', {
                                children: [
                                  /* @__PURE__ */ jsx40('h4', {
                                    className: 'font-medium',
                                    children: 'LinkedIn',
                                  }),
                                  /* @__PURE__ */ jsx40('a', {
                                    href: 'https://linkedin.com',
                                    target: '_blank',
                                    rel: 'noopener noreferrer',
                                    className: 'text-primary hover:underline',
                                    children: 'www.linkedin.com/in/paul-doros-3468a2177',
                                  }),
                                ],
                              }),
                            ],
                          }),
                          /* @__PURE__ */ jsxs26('div', {
                            className: 'flex items-start gap-4',
                            children: [
                              /* @__PURE__ */ jsx40('div', {
                                className: 'rounded-full bg-primary/10 p-3',
                                children: /* @__PURE__ */ jsxs26('svg', {
                                  className: 'h-5 w-5 text-primary',
                                  xmlns: 'http://www.w3.org/2000/svg',
                                  viewBox: '0 0 24 24',
                                  fill: 'none',
                                  stroke: 'currentColor',
                                  strokeWidth: '2',
                                  strokeLinecap: 'round',
                                  strokeLinejoin: 'round',
                                  children: [
                                    /* @__PURE__ */ jsx40('path', {
                                      d: 'M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9',
                                    }),
                                    /* @__PURE__ */ jsx40('path', { d: 'M9 22V12h6v10' }),
                                    /* @__PURE__ */ jsx40('path', { d: 'M2 10.6L12 2l10 8.6' }),
                                  ],
                                }),
                              }),
                              /* @__PURE__ */ jsxs26('div', {
                                children: [
                                  /* @__PURE__ */ jsx40('h4', {
                                    className: 'font-medium',
                                    children: 'Location',
                                  }),
                                  /* @__PURE__ */ jsx40('p', {
                                    className: 'text-muted-foreground',
                                    children: 'Sibiu, Romania',
                                  }),
                                ],
                              }),
                            ],
                          }),
                          /* @__PURE__ */ jsxs26('div', {
                            className: 'flex items-start gap-4',
                            children: [
                              /* @__PURE__ */ jsx40('div', {
                                className: 'rounded-full bg-primary/10 p-3',
                                children: /* @__PURE__ */ jsx40('svg', {
                                  className: 'h-5 w-5 text-primary',
                                  xmlns: 'http://www.w3.org/2000/svg',
                                  viewBox: '0 0 24 24',
                                  fill: 'none',
                                  stroke: 'currentColor',
                                  strokeWidth: '2',
                                  strokeLinecap: 'round',
                                  strokeLinejoin: 'round',
                                  children: /* @__PURE__ */ jsx40('path', {
                                    d: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z',
                                  }),
                                }),
                              }),
                              /* @__PURE__ */ jsxs26('div', {
                                children: [
                                  /* @__PURE__ */ jsx40('h4', {
                                    className: 'font-medium',
                                    children: 'Phone',
                                  }),
                                  /* @__PURE__ */ jsx40('p', {
                                    className: 'text-muted-foreground',
                                    children: '+40 756 436 531',
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      /* @__PURE__ */ jsxs26('div', {
                        className: 'mt-12',
                        children: [
                          /* @__PURE__ */ jsx40('h3', {
                            className: 'mb-6 text-xl font-semibold',
                            children: 'Available For',
                          }),
                          /* @__PURE__ */ jsxs26('ul', {
                            className: 'space-y-3',
                            children: [
                              /* @__PURE__ */ jsxs26('li', {
                                className: 'flex items-center gap-2',
                                children: [
                                  /* @__PURE__ */ jsx40('div', {
                                    className: 'h-2 w-2 rounded-full bg-green-500',
                                  }),
                                  /* @__PURE__ */ jsx40('span', {
                                    children: 'Full-time positions',
                                  }),
                                ],
                              }),
                              /* @__PURE__ */ jsxs26('li', {
                                className: 'flex items-center gap-2',
                                children: [
                                  /* @__PURE__ */ jsx40('div', {
                                    className: 'h-2 w-2 rounded-full bg-green-500',
                                  }),
                                  /* @__PURE__ */ jsx40('span', { children: 'Freelance projects' }),
                                ],
                              }),
                              /* @__PURE__ */ jsxs26('li', {
                                className: 'flex items-center gap-2',
                                children: [
                                  /* @__PURE__ */ jsx40('div', {
                                    className: 'h-2 w-2 rounded-full bg-green-500',
                                  }),
                                  /* @__PURE__ */ jsx40('span', { children: 'Consulting' }),
                                ],
                              }),
                              /* @__PURE__ */ jsxs26('li', {
                                className: 'flex items-center gap-2',
                                children: [
                                  /* @__PURE__ */ jsx40('div', {
                                    className: 'h-2 w-2 rounded-full bg-green-500',
                                  }),
                                  /* @__PURE__ */ jsx40('span', { children: 'Remote work' }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
      ],
    }),
  });
}

// app/routes/test.tsx
import { Fragment as Fragment7, jsx as jsx41, jsxs as jsxs27 } from 'react/jsx-runtime';
var meta7 = () => [
    { title: 'Paul Ionut Doros | Portfolio Comparison' },
    {
      name: 'description',
      content:
        "Compare classic and animated versions of Paul Ionut Doros's frontend developer portfolio",
    },
  ],
  loader4 = async () => json4({});
function TestPage() {
  let [showAdultWarning, setShowAdultWarning] = useState11(!1),
    [pendingUrl, setPendingUrl] = useState11(null),
    [pendingSiteName, setPendingSiteName] = useState11(''),
    [activeView, setActiveView] = useState11('classic'),
    [showComparison, setShowComparison] = useState11(!1),
    handleAdultLinkClick = (url, siteName) => e => {
      e.preventDefault(), setPendingUrl(url), setPendingSiteName(siteName), setShowAdultWarning(!0);
    },
    handleConfirmAdultContent = () => {
      pendingUrl &&
        (window.open(pendingUrl, '_blank'),
        setShowAdultWarning(!1),
        setPendingUrl(null),
        setPendingSiteName(''));
    };
  return /* @__PURE__ */ jsxs27(Fragment7, {
    children: [
      /* @__PURE__ */ jsxs27('div', {
        className: 'relative w-full',
        children: [
          /* @__PURE__ */ jsx41('div', {
            className: 'classic-portfolio',
            style: {
              display: 'block',
              visibility: !showComparison && activeView !== 'classic' ? 'hidden' : 'visible',
              opacity: !showComparison && activeView !== 'classic' ? 0 : 1,
              transition: 'opacity 0.3s ease',
              ...(showComparison
                ? {
                    WebkitMaskImage:
                      'linear-gradient(to right, black 0%, black 50%, transparent 50%, transparent 100%)',
                    maskImage:
                      'linear-gradient(to right, black 0%, black 50%, transparent 50%, transparent 100%)',
                  }
                : {}),
            },
            children: /* @__PURE__ */ jsx41(
              ClassicPortfolio,
              { onAdultLinkClick: handleAdultLinkClick },
              'classic'
            ),
          }),
          /* @__PURE__ */ jsx41('div', {
            className: `animated-portfolio ${showComparison ? 'absolute left-0 top-0 w-full' : ''}`,
            style: {
              display: 'block',
              visibility: !showComparison && activeView !== 'animated' ? 'hidden' : 'visible',
              opacity: !showComparison && activeView !== 'animated' ? 0 : 1,
              transition: 'opacity 0.3s ease',
              ...(showComparison
                ? {
                    WebkitMaskImage:
                      'linear-gradient(to right, transparent 0%, transparent 50%, black 50%, black 100%)',
                    maskImage:
                      'linear-gradient(to right, transparent 0%, transparent 50%, black 50%, black 100%)',
                  }
                : {}),
            },
            children: /* @__PURE__ */ jsx41(
              AnimatedPortfolio,
              { onAdultLinkClick: handleAdultLinkClick },
              'animated'
            ),
          }),
          showComparison &&
            /* @__PURE__ */ jsxs27(Fragment7, {
              children: [
                /* @__PURE__ */ jsx41('div', {
                  className: 'fixed bottom-0 left-1/2 top-0 z-10 w-1 bg-white shadow-lg',
                }),
                /* @__PURE__ */ jsx41('div', {
                  className: 'pointer-events-none fixed inset-0 z-20',
                  children: /* @__PURE__ */ jsxs27('div', {
                    className: 'flex h-full',
                    children: [
                      /* @__PURE__ */ jsx41('div', {
                        className: 'flex w-1/2 items-center justify-center',
                        children: /* @__PURE__ */ jsx41('span', {
                          className:
                            'rounded-lg border-2 border-white bg-black/10 px-8 py-4 text-3xl font-bold text-white shadow-lg backdrop-blur-sm',
                          children: 'CLASSIC',
                        }),
                      }),
                      /* @__PURE__ */ jsx41('div', {
                        className: 'flex w-1/2 items-center justify-center',
                        children: /* @__PURE__ */ jsx41('span', {
                          className:
                            'rounded-lg border-2 border-white bg-black/10 px-8 py-4 text-3xl font-bold text-white shadow-lg backdrop-blur-sm',
                          children: 'ANIMATED',
                        }),
                      }),
                    ],
                  }),
                }),
              ],
            }),
        ],
      }),
      /* @__PURE__ */ jsx41('div', {
        className: 'fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 transform',
        children: /* @__PURE__ */ jsx41(Button, {
          variant: showComparison ? 'secondary' : 'default',
          className: 'rounded-full px-6 shadow-lg',
          onClick: () => setShowComparison(!showComparison),
          children: showComparison ? 'Close' : 'Change Style',
        }),
      }),
      /* @__PURE__ */ jsx41(AdultContentModal, {
        isOpen: showAdultWarning,
        onClose: () => {
          setShowAdultWarning(!1), setPendingUrl(null), setPendingSiteName('');
        },
        onConfirm: handleConfirmAdultContent,
        siteName: pendingSiteName,
      }),
    ],
  });
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = {
  entry: {
    module: '/build/entry.client-NT7L6LQ2.js',
    imports: ['/build/_shared/chunk-YKMUOXEL.js'],
  },
  routes: {
    root: {
      id: 'root',
      parentId: void 0,
      path: '',
      index: void 0,
      caseSensitive: void 0,
      module: '/build/root-LMI47SO5.js',
      imports: ['/build/_shared/chunk-OJEHEZKH.js', '/build/_shared/chunk-NVL73VKF.js'],
      hasAction: !1,
      hasLoader: !0,
      hasClientAction: !1,
      hasClientLoader: !1,
      hasErrorBoundary: !0,
    },
    'routes/_index': {
      id: 'routes/_index',
      parentId: 'root',
      path: void 0,
      index: !0,
      caseSensitive: void 0,
      module: '/build/routes/_index-I3UCMKPF.js',
      imports: [
        '/build/_shared/chunk-VXEAJH76.js',
        '/build/_shared/chunk-LSROXNFR.js',
        '/build/_shared/chunk-F33EGIEM.js',
        '/build/_shared/chunk-MAIJFPYE.js',
        '/build/_shared/chunk-KZGF4YM4.js',
        '/build/_shared/chunk-3S4XLL6O.js',
        '/build/_shared/chunk-QB6F3QSB.js',
      ],
      hasAction: !1,
      hasLoader: !0,
      hasClientAction: !1,
      hasClientLoader: !1,
      hasErrorBoundary: !1,
    },
    'routes/compare': {
      id: 'routes/compare',
      parentId: 'root',
      path: 'compare',
      index: void 0,
      caseSensitive: void 0,
      module: '/build/routes/compare-2AYMOGKM.js',
      imports: [
        '/build/_shared/chunk-EI4537ZZ.js',
        '/build/_shared/chunk-MAIJFPYE.js',
        '/build/_shared/chunk-KZGF4YM4.js',
        '/build/_shared/chunk-3S4XLL6O.js',
        '/build/_shared/chunk-QB6F3QSB.js',
      ],
      hasAction: !1,
      hasLoader: !0,
      hasClientAction: !1,
      hasClientLoader: !1,
      hasErrorBoundary: !1,
    },
    'routes/experience': {
      id: 'routes/experience',
      parentId: 'root',
      path: 'experience',
      index: void 0,
      caseSensitive: void 0,
      module: '/build/routes/experience-BFKCSBZB.js',
      imports: [
        '/build/_shared/chunk-F33EGIEM.js',
        '/build/_shared/chunk-3S4XLL6O.js',
        '/build/_shared/chunk-QB6F3QSB.js',
      ],
      hasAction: !1,
      hasLoader: !1,
      hasClientAction: !1,
      hasClientLoader: !1,
      hasErrorBoundary: !1,
    },
    'routes/privacy': {
      id: 'routes/privacy',
      parentId: 'root',
      path: 'privacy',
      index: void 0,
      caseSensitive: void 0,
      module: '/build/routes/privacy-KKAK4ZXW.js',
      imports: ['/build/_shared/chunk-QB6F3QSB.js'],
      hasAction: !1,
      hasLoader: !1,
      hasClientAction: !1,
      hasClientLoader: !1,
      hasErrorBoundary: !1,
    },
    'routes/projects': {
      id: 'routes/projects',
      parentId: 'root',
      path: 'projects',
      index: void 0,
      caseSensitive: void 0,
      module: '/build/routes/projects-RDFQMTJ6.js',
      imports: [
        '/build/_shared/chunk-LSROXNFR.js',
        '/build/_shared/chunk-F33EGIEM.js',
        '/build/_shared/chunk-KZGF4YM4.js',
        '/build/_shared/chunk-3S4XLL6O.js',
        '/build/_shared/chunk-QB6F3QSB.js',
      ],
      hasAction: !1,
      hasLoader: !1,
      hasClientAction: !1,
      hasClientLoader: !1,
      hasErrorBoundary: !1,
    },
    'routes/terms': {
      id: 'routes/terms',
      parentId: 'root',
      path: 'terms',
      index: void 0,
      caseSensitive: void 0,
      module: '/build/routes/terms-RSBXQZUQ.js',
      imports: ['/build/_shared/chunk-QB6F3QSB.js'],
      hasAction: !1,
      hasLoader: !1,
      hasClientAction: !1,
      hasClientLoader: !1,
      hasErrorBoundary: !1,
    },
    'routes/test': {
      id: 'routes/test',
      parentId: 'root',
      path: 'test',
      index: void 0,
      caseSensitive: void 0,
      module: '/build/routes/test-SHSU6EHU.js',
      imports: [
        '/build/_shared/chunk-EI4537ZZ.js',
        '/build/_shared/chunk-VXEAJH76.js',
        '/build/_shared/chunk-LSROXNFR.js',
        '/build/_shared/chunk-F33EGIEM.js',
        '/build/_shared/chunk-MAIJFPYE.js',
        '/build/_shared/chunk-KZGF4YM4.js',
        '/build/_shared/chunk-3S4XLL6O.js',
        '/build/_shared/chunk-QB6F3QSB.js',
      ],
      hasAction: !1,
      hasLoader: !0,
      hasClientAction: !1,
      hasClientLoader: !1,
      hasErrorBoundary: !1,
    },
  },
  version: 'dbe77b51',
  hmr: void 0,
  url: '/build/manifest-DBE77B51.js',
};

// server-entry-module:@remix-run/dev/server-build
var mode = 'production',
  assetsBuildDirectory = 'public\\build',
  future = {
    v3_fetcherPersist: !0,
    v3_relativeSplatPath: !0,
    v3_throwAbortReason: !0,
    v3_routeConfig: !1,
    v3_singleFetch: !0,
    v3_lazyRouteDiscovery: !0,
    unstable_optimizeDeps: !1,
  },
  publicPath = '/build/',
  entry = { module: entry_server_exports },
  routes = {
    root: {
      id: 'root',
      parentId: void 0,
      path: '',
      index: void 0,
      caseSensitive: void 0,
      module: root_exports,
    },
    'routes/experience': {
      id: 'routes/experience',
      parentId: 'root',
      path: 'experience',
      index: void 0,
      caseSensitive: void 0,
      module: experience_exports,
    },
    'routes/projects': {
      id: 'routes/projects',
      parentId: 'root',
      path: 'projects',
      index: void 0,
      caseSensitive: void 0,
      module: projects_exports,
    },
    'routes/compare': {
      id: 'routes/compare',
      parentId: 'root',
      path: 'compare',
      index: void 0,
      caseSensitive: void 0,
      module: compare_exports,
    },
    'routes/privacy': {
      id: 'routes/privacy',
      parentId: 'root',
      path: 'privacy',
      index: void 0,
      caseSensitive: void 0,
      module: privacy_exports,
    },
    'routes/_index': {
      id: 'routes/_index',
      parentId: 'root',
      path: void 0,
      index: !0,
      caseSensitive: void 0,
      module: index_exports,
    },
    'routes/terms': {
      id: 'routes/terms',
      parentId: 'root',
      path: 'terms',
      index: void 0,
      caseSensitive: void 0,
      module: terms_exports,
    },
    'routes/test': {
      id: 'routes/test',
      parentId: 'root',
      path: 'test',
      index: void 0,
      caseSensitive: void 0,
      module: test_exports,
    },
  };
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes,
};
