import { json } from '@remix-run/node';
import type { MetaFunction } from '@remix-run/node';
import { Layout } from '~/components/layout/layout';
import { CompareDemo } from '~/components/demos/compare-demo';
import { PageCompare } from '~/components/page-compare';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Separator } from '~/components/ui/separator';
import { Badge } from '~/components/ui/badge';

export const meta: MetaFunction = () => {
  return [
    { title: 'Compare Demo | Portfolio' },
    {
      name: 'description',
      content: 'Interactive comparison demonstrations',
    },
  ];
};

export const loader = async () => {
  return json({});
};

export default function ComparePage() {
  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 flex flex-col items-center text-center">
            <h1 className="mb-6 text-3xl font-bold md:text-4xl">Interactive Comparisons</h1>
            <p className="max-w-2xl text-muted-foreground">
              Explore the power of interactive comparison sliders - compare images or entire page
              sections by sliding between different versions.
            </p>
          </div>

          <Tabs defaultValue="page" className="w-full">
            <TabsList className="mx-auto mb-8 w-auto">
              <TabsTrigger value="page">Page Comparison</TabsTrigger>
              <TabsTrigger value="image">Image Comparison</TabsTrigger>
            </TabsList>

            <TabsContent value="page" className="space-y-16">
              <div>
                <div className="mb-8 flex flex-col items-center text-center">
                  <Badge className="mb-4">Hero Section</Badge>
                  <h2 className="mb-6 text-2xl font-bold">Compare Hero Styles</h2>
                  <p className="max-w-2xl text-muted-foreground">
                    Slide to compare the classic and animated versions of the hero section. Notice
                    the different animations, effects, and styling.
                  </p>
                </div>
                <PageCompare section="hero" height="h-[600px]" />
              </div>

              <Separator />

              <div>
                <div className="mb-8 flex flex-col items-center text-center">
                  <Badge className="mb-4">About Section</Badge>
                  <h2 className="mb-6 text-2xl font-bold">Compare About Styles</h2>
                  <p className="max-w-2xl text-muted-foreground">
                    Slide to compare the classic and animated versions of the about section. See how
                    animations can enhance the user experience while maintaining the same content.
                  </p>
                </div>
                <PageCompare section="about" height="h-[800px]" />
              </div>
            </TabsContent>

            <TabsContent value="image">
              <div className="mb-8 flex flex-col items-center text-center">
                <Badge className="mb-4">Image Comparison</Badge>
                <h2 className="mb-6 text-2xl font-bold">Compare Images</h2>
                <p className="max-w-2xl text-muted-foreground">
                  The same slider component can be used to compare images, perfect for before/after
                  demonstrations, design iterations, or visual differences.
                </p>
              </div>
              <div className="flex justify-center">
                <CompareDemo />
              </div>
            </TabsContent>
          </Tabs>

          <div className="mx-auto mt-24 max-w-3xl">
            <h2 className="mb-4 text-center text-2xl font-bold">How It Works</h2>
            <p className="mb-6 text-muted-foreground">
              The comparison slider uses Framer Motion for smooth animations and React's composition
              pattern to allow comparing either images or entire page components:
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="font-semibold">Features</h3>
                <ul className="list-inside list-disc text-sm text-muted-foreground">
                  <li>Supports both image and component comparison</li>
                  <li>Interactive slider with sparkle effects</li>
                  <li>Hover and drag interaction modes</li>
                  <li>Fully responsive design</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Use Cases</h3>
                <ul className="list-inside list-disc text-sm text-muted-foreground">
                  <li>Compare classic vs animated UI</li>
                  <li>Before/after image processing</li>
                  <li>Design iterations showcase</li>
                  <li>Compare light/dark themes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
