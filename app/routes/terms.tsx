import type { MetaFunction } from '@remix-run/node';

import { Layout } from '~/components/layout/layout';
import { Separator } from '~/components/ui/separator';

export const meta: MetaFunction = () => {
  return [
    { title: 'Terms of Service | Paul Doros' },
    { name: 'description', content: 'Terms of service for Paul Doros portfolio website' },
  ];
};

export default function Terms() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Terms of Service</h1>
          <Separator className="mb-8" />
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p className="text-muted-foreground mb-4">
              Welcome to my portfolio website. These terms and conditions outline the rules and regulations
              for the use of this website. By accessing this website, we assume you accept these terms and
              conditions in full. Do not continue to use this website if you do not accept all of the terms
              and conditions stated on this page.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Intellectual Property Rights</h2>
            <p className="text-muted-foreground mb-4">
              Unless otherwise stated, I own the intellectual property rights for all material on this website.
              All intellectual property rights are reserved. You may view and/or print pages from this website
              for your own personal use subject to restrictions set in these terms and conditions.
            </p>
            <p className="text-muted-foreground mb-4">
              You must not:
            </p>
            <ul className="list-disc list-inside mb-4 text-muted-foreground space-y-2">
              <li>Republish material from this website</li>
              <li>Sell, rent, or sub-license material from this website</li>
              <li>Reproduce, duplicate, or copy material from this website</li>
              <li>Redistribute content from this website</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">User Content</h2>
            <p className="text-muted-foreground mb-4">
              In these terms and conditions, &quot;User Content&quot; means material (including without limitation text,
              images, audio material, video material, and audio-visual material) that you submit to this website,
              for whatever purpose.
            </p>
            <p className="text-muted-foreground mb-4">
              You grant me a worldwide, irrevocable, non-exclusive, royalty-free license to use, reproduce,
              adapt, publish, translate, and distribute your User Content in any existing or future media.
              You also grant me the right to sub-license these rights and the right to bring an action for
              infringement of these rights.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">No Warranties</h2>
            <p className="text-muted-foreground mb-4">
              This website is provided &quot;as is&quot; without any representations or warranties, express or implied.
              I make no representations or warranties in relation to this website or the information and
              materials provided on this website.
            </p>
            <p className="text-muted-foreground mb-4">
              Nothing on this website constitutes, or is meant to constitute, advice of any kind.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Limitations of Liability</h2>
            <p className="text-muted-foreground mb-4">
              I will not be liable to you in relation to the contents of, or use of, or otherwise in
              connection with, this website for any indirect, special, or consequential loss; or for any
              business losses, loss of revenue, income, profits or anticipated savings, loss of contracts
              or business relationships, loss of reputation or goodwill, or loss or corruption of information
              or data.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">External Links</h2>
            <p className="text-muted-foreground mb-4">
              This website may contain links to other websites. I have no control over the nature, content,
              and availability of those sites. The inclusion of any links does not necessarily imply a
              recommendation or endorse the views expressed within them.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Changes to These Terms</h2>
            <p className="text-muted-foreground mb-4">
              I may revise these terms of service for this website at any time without notice. By using
              this website, you are agreeing to be bound by the then current version of these terms and
              conditions.
            </p>
            <p className="text-muted-foreground">
              These terms were last updated on [Current Date].
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
} 