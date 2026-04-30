import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Mail } from 'lucide-react';
import ButtonMoveBack from '@/components/ButtonMoveBack';

const TermsOfService = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 px-6 py-12 sm:py-20">
        {/* Navigation & Header */}
        <div className="mb-12 space-y-3!">
          <ButtonMoveBack className="static! mt-3!" />

          <div className="space-y-4!">
            <Badge
              variant="outline"
              className="text-muted-foreground w-fit px-2! py-1!"
            >
              Last updated — February 2026
            </Badge>
            <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
              Terms of Service
            </h1>
            <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
              Please read these terms carefully before using our services. By
              accessing or using our platform, you agree to be bound by these
              conditions.
            </p>
          </div>
        </div>

        <Separator className="my-10" />

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_250px] lg:gap-20">
          {/* Main Text Content */}
          <main className="text-foreground/90 space-y-4! text-[16px] leading-7">
            {/* Section 1 */}
            <section id="introduction" className="scroll-m-20">
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                1. Introduction
              </h2>
              <p className="text-muted-foreground">
                Welcome to our platform. By accessing or using our services, you
                agree to be bound by these Terms of Service. If you do not agree
                with any part of the terms, you may not access the service.
              </p>
            </section>

            {/* Section 2 */}
            <section id="usage" className="scroll-m-20">
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                2. Use of Service
              </h2>
              <p className="text-muted-foreground mb-4">
                You agree to use the service only for lawful purposes and in
                accordance with these Terms. You specifically agree to:
              </p>
              <ul className="marker:text-primary list-disc! space-y-3 pl-6!">
                {termsOfServiceContent.map((item, index) => (
                  <li key={index} className="text-muted-foreground">
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 3 */}
            <section id="accounts" className="scroll-m-20">
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                3. User Accounts
              </h2>
              <p className="text-muted-foreground">
                You are responsible for maintaining the confidentiality of your
                account credentials and for all activities that occur under your
                account. Please notify us immediately of any unauthorized use.
              </p>
            </section>

            {/* Section 4 */}
            <section id="intellectual-property" className="scroll-m-20">
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                4. Intellectual Property
              </h2>
              <p className="text-muted-foreground">
                All content, trademarks, and materials available through the
                service are the property of the company and are protected by
                applicable intellectual property laws.
              </p>
            </section>

            {/* Section 5 & 6 & 7 Combined for brevity in preview */}
            <section className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight">
                  5. Limitation of Liability
                </h2>
                <p className="text-muted-foreground">
                  We shall not be liable for indirect, incidental, or
                  consequential damages resulting from your use of the service.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight">
                  6. Termination
                </h2>
                <p className="text-muted-foreground">
                  We reserve the right to suspend or terminate access to the
                  service at our discretion, without prior notice, for conduct
                  that we believe violates these Terms.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight">
                  7. Changes to Terms
                </h2>
                <p className="text-muted-foreground">
                  We may update these Terms from time to time. Continued use of
                  the service constitutes acceptance of the revised terms.
                </p>
              </div>
            </section>
          </main>

          {/* Sidebar / Contact Area (Sticky on Desktop) */}
          <aside className="hidden md:block">
            <div className="sticky top-10 space-y-4!">
              <p className="text-foreground text-sm font-medium">
                Have questions?
              </p>
              <Card className="bg-muted dark:bg-muted/50 border-none shadow-none">
                <CardContent className="space-y-4 p-6">
                  <div className="bg-background flex h-10 w-10 items-center justify-center rounded-full border shadow-sm">
                    <Mail className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-semibold">
                      Contact Support
                    </h3>
                    <p className="text-muted-foreground mt-1 text-xs">
                      For any questions regarding these terms.
                    </p>
                  </div>
                  <a
                    href="mailto:support@example.com"
                    className="text-primary block text-sm font-medium hover:underline"
                  >
                    support@example.com
                  </a>
                </CardContent>
              </Card>

              <div className="text-muted-foreground px-2 text-xs">
                <p>© {currentYear} Your Company.</p>
                <p>All rights reserved.</p>
              </div>
            </div>
          </aside>

          {/* Mobile Footer (Visible only on small screens) */}
          <div className="mt-8 border-t pt-8 md:hidden">
            <h3 className="mb-2 font-semibold">Contact Us</h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Questions? Email us at{' '}
              <span className="text-foreground font-medium">
                support@example.com
              </span>
            </p>
            <p className="text-muted-foreground text-xs">
              © {currentYear} Your Company.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const termsOfServiceContent: string[] = [
  'Comply with applicable laws and regulations.',
  'Respect the rights and privacy of other users.',
  'Refrain from distributing harmful or malicious content.',
  'Avoid unauthorized access to systems or data.',
];

export default TermsOfService;
