import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';

export function ClassicAbout() {
  return (
    <section id="about" className="bg-muted/50 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 flex flex-col items-center text-center">
          <Badge className="mb-4">About Me</Badge>
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">My Background</h2>
          <Separator className="mb-6 w-24" />
          <p className="max-w-2xl text-muted-foreground">
            Learn more about my journey, experience, and what drives me as a developer.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-12">
          <div className="relative h-64 w-64">
            {/* Neumorphic outer container */}
            <div
              className="p- relative h-full w-full rounded-3xl
                          bg-background
                          shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff]
                          dark:bg-slate-900
                          dark:shadow-[8px_8px_16px_#0f172a,-8px_-8px_16px_#1e293b]"
            >
              {/* Inner neumorphic frame */}
              <div
                className="relative h-full w-full overflow-hidden rounded-2xl
                            bg-gradient-to-br from-slate-50 to-slate-100
                            shadow-[inset_4px_4px_8px_#d1d5db,inset_-4px_-4px_8px_#ffffff] dark:from-slate-800
                            dark:to-slate-900
                            dark:shadow-[inset_4px_4px_8px_#0f172a,inset_-4px_-4px_8px_#334155]"
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-primary/5" />

                {/* Image container */}
                <div className="relative h-full w-full overflow-hidden rounded-xl">
                  <img
                    src="/img.png"
                    alt="Paul Ionut Doros"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />

                  {/* Subtle inner glow */}
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-transparent via-transparent
                                to-white/5 dark:to-white/10"
                  />
                </div>
              </div>

              {/* Subtle highlight on the outer frame */}
              <div
                className="pointer-events-none absolute left-2 right-2 top-2 h-8
                            rounded-t-2xl bg-gradient-to-b from-white/20
                            to-transparent dark:from-white/10"
              />
            </div>
          </div>

          <div className="flex max-w-3xl flex-col justify-center text-center">
            <h3 className="mb-4 text-2xl font-bold">Hi, I&apos;m Paul Ionut Doros</h3>
            <p className="mb-6 text-muted-foreground">
              As a front-end developer, I don&apos;t just write code I create solutions. Over the
              past couple of years, I&apos;ve worked on a wide range of tasks, from building
              responsive, user-friendly features to troubleshooting complex issues. But what truly
              sets me apart is my adaptability and willingness to step outside of my role whenever
              necessary.
            </p>
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-semibold">Frontend Development</h4>
                <p className="text-sm text-muted-foreground">
                  My expertise lies in JavaScript/TypeScript, React, Remix, and React Native.
                  I&apos;m experienced in UI/UX improvements, implementing animations and
                  transitions, and building reusable component libraries for optimized development
                  workflows.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Mobile Development</h4>
                <p className="text-sm text-muted-foreground">
                  I&apos;ve developed cross-platform applications using React Native, optimizing for
                  both iOS and Android. My experience includes app store deployment, performance
                  optimization, and implementing responsive layouts.
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
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
  );
}
