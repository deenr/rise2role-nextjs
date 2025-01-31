'use client';

import { useEffect, useState } from 'react';

export default function TermsOfServicePage() {
  const [effectiveDate, setEffectiveDate] = useState<Date | null>(null);

  useEffect(() => {
    setEffectiveDate(new Date());
  }, []);

  return (
    <section className="px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 md:px-8 md:pb-24 md:pt-48 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:gap-8 md:gap-12">
        <div className="flex flex-col items-start gap-3 text-primary">
          <p>Effective: {effectiveDate?.toLocaleDateString()}</p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">Terms of Service for Rise2Role</h1>
        </div>

        <div className="space-y-8 text-base text-muted-foreground">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground md:text-3xl">1. Acceptance of Terms</h2>
            <p>By accessing Rise2Role, you agree to be bound by these Terms and comply with EU Regulation 2022/2065 (Digital Services Act). You must be at least 16 years old to use our services.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground md:text-3xl">2. User Accounts</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>You must provide accurate information during registration</li>
              <li>You are responsible for maintaining account security</li>
              <li>We reserve the right to suspend accounts violating these terms</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground md:text-3xl">3. User Content</h2>
            <p>You retain ownership of job applications and data entered, but grant us a non-exclusive license to process it for service delivery.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground md:text-3xl">4. Prohibited Activities</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>Illegal or fraudulent use</li>
              <li>Reverse engineering or scraping</li>
              <li>Spamming other users</li>
              <li>Uploading harmful content</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground md:text-3xl">5. Termination</h2>
            <p>You may delete your account at any time. We reserve the right to terminate accounts for violations, with 30 days notice except for severe breaches.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground md:text-3xl">6. Disclaimers</h2>
            <p>Service provided "as is". We don't guarantee job placement outcomes. We're not liable for:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Service interruptions</li>
              <li>Data loss beyond our redundancy measures</li>
              <li>Third-party integrations (Supabase)</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground md:text-3xl">7. Governing Law</h2>
            <p>These terms are governed by EU law. Disputes will be resolved in EU courts. We participate in EU online dispute resolution.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground md:text-3xl">Contact</h2>
            <p>
              For questions:{' '}
              <a href="mailto:support@rise2role.com" className="text-primary hover:underline">
                support@rise2role.com
              </a>
              <br />
              Physical address: [Your Company Address]
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
