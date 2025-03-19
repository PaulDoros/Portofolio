import type { MetaFunction } from '@remix-run/node';


import { Separator } from '~/components/ui/separator';

export const meta: MetaFunction = () => {
  return [
    { title: 'Privacy Policy | Paul Doros' },
    { name: 'description', content: 'Privacy policy for Paul Doros portfolio website' },
  ];
};

export default function Privacy() {
  return (
    <>
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1>
          <Separator className="mb-8" />
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p className="text-muted-foreground mb-4">
              Welcome to my portfolio website. I respect your privacy and am committed to protecting your personal data.
              This privacy policy will inform you about how I look after your personal data when you visit my website
              and tell you about your privacy rights and how the law protects you.
            </p>
            <p className="text-muted-foreground">
              This website is not intended for children and I do not knowingly collect data relating to children.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Information I Collect</h2>
            <p className="text-muted-foreground mb-4">
              When you use the contact form on this website, I collect the following types of personal information:
            </p>
            <ul className="list-disc list-inside mb-4 text-muted-foreground space-y-2">
              <li>Name</li>
              <li>Email address</li>
              <li>Any information you choose to provide in the message field</li>
            </ul>
            <p className="text-muted-foreground">
              I do not use cookies or other tracking technologies to collect information about your browsing activities
              over time or across different websites.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">How I Use Your Information</h2>
            <p className="text-muted-foreground mb-4">
              I use the information you provide via the contact form solely for the purpose of responding to your inquiries
              and to communicate with you about potential opportunities for collaboration.
            </p>
            <p className="text-muted-foreground">
              I will not use your personal information for marketing purposes or share it with third parties without your
              explicit consent.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p className="text-muted-foreground">
              I have implemented appropriate security measures to prevent your personal data from being accidentally lost,
              used, or accessed in an unauthorized way, altered, or disclosed. In addition, I limit access to your personal data
              to myself. I will only process your personal data on my lawful bases and instructions.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <p className="text-muted-foreground mb-4">
              Under certain circumstances, you have rights under data protection laws in relation to your personal data, including:
            </p>
            <ul className="list-disc list-inside mb-4 text-muted-foreground space-y-2">
              <li>The right to request access to your personal data</li>
              <li>The right to request correction of your personal data</li>
              <li>The right to request erasure of your personal data</li>
              <li>The right to object to processing of your personal data</li>
              <li>The right to request restriction of processing your personal data</li>
              <li>The right to data portability</li>
            </ul>
            <p className="text-muted-foreground">
              If you wish to exercise any of these rights, please contact me via the contact form on this website.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Changes to this Policy</h2>
            <p className="text-muted-foreground mb-4">
              I may update this privacy policy from time to time. I will notify you of significant changes by updating
              the effective date at the top of this policy.
            </p>
            <p className="text-muted-foreground">
              This policy was last updated on [Current Date].
            </p>
          </section>
        </div>
      </div>
    </>
  );
} 