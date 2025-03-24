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
          <div className="relative h-64 w-64 overflow-hidden rounded-xl border">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-primary/5" />
            <div className="absolute inset-0 flex items-center justify-center">
              <img src="/img.png" alt="Paul Ionut Doros" className="h-full w-full object-cover" />
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
