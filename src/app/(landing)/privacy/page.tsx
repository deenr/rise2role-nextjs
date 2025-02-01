'use client';

import { useEffect, useState } from 'react';

export default function PrivacyPolicyPage() {
  const [effectiveDate, setEffectiveDate] = useState<Date | null>(null);

  useEffect(() => {
    setEffectiveDate(new Date());
  }, []);

  return (
    <section className="px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 md:px-8 md:pb-24 md:pt-48 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:gap-8 md:gap-12">
        <div className="flex flex-col items-start gap-3 text-primary">
          <p>Effective Date: {effectiveDate?.toLocaleDateString()}</p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">Privacy Policy for Rise2Role</h1>
          <p className="max-w-2xl text-sm font-normal text-muted-foreground sm:text-base lg:text-lg">
            We comply with the EU General Data Protection Regulation (GDPR) and are committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data
            when you use our services.
          </p>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold md:text-3xl">1. Data We Collect</h2>
            <div className="space-y-2 text-base text-muted-foreground">
              <p>
                <strong>Personal Data You Provide:</strong>
              </p>
              <ul className="list-disc pl-6">
                <li>Account Information: Email address, name (when registering via Supabase authentication)</li>
                <li>User Content: Job applications, notes, and status updates in your kanban board</li>
              </ul>

              <p>
                <strong>Automatically Collected Data:</strong>
              </p>
              <ul className="list-disc pl-6">
                <li>Technical Data: IP address, browser type, device information</li>
                <li>Usage Data: Timestamps, feature interactions, error logs</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold md:text-3xl">2. Legal Basis & Purpose of Processing</h2>
            <div className="space-y-2 text-base text-muted-foreground">
              <p>We process your data under GDPR Article 6(1)(b) (contractual necessity) and 6(1)(a) (consent) for:</p>
              <ul className="list-disc pl-6">
                <li>Account creation and service provision</li>
                <li>Job application management and synchronization</li>
                <li>Service improvement and security</li>
                <li>Legal compliance and fraud prevention</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold md:text-3xl">3. Data Sharing & International Transfers</h2>
            <p className="text-base text-muted-foreground">
              We use Supabase for data storage and authentication. Your data may be transferred to countries with adequacy decisions or using Standard Contractual Clauses. We never sell your data to
              third parties.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold md:text-3xl">4. Data Retention</h2>
            <p className="text-base text-muted-foreground">We retain your data until account deletion. Upon deletion request, we:</p>
            <ul className="list-disc pl-6 text-base text-muted-foreground">
              <li>Immediately remove active data</li>
              <li>Delete backups within 30 days</li>
              <li>Keep minimal logs for 12 months for legal compliance</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold md:text-3xl">5. Your GDPR Rights</h2>
            <div className="space-y-2 text-base text-muted-foreground">
              <p>You have the right to:</p>
              <ul className="list-disc pl-6">
                <li>Access and receive your data (Article 15)</li>
                <li>Rectify inaccurate data (Article 16)</li>
                <li>Erase your data ("Right to be Forgotten", Article 17)</li>
                <li>Restrict processing (Article 18)</li>
                <li>Data portability (Article 20)</li>
                <li>Object to processing (Article 21)</li>
                <li>Withdraw consent (Article 7(3))</li>
              </ul>
              <p>
                To exercise these rights, contact us at{' '}
                <a href="mailto:reymen@outlook.be" className="text-primary hover:underline">
                  support@rise2role.com
                </a>
                .
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold md:text-3xl">6. Security Measures</h2>
            <p className="text-base text-muted-foreground">We implement:</p>
            <ul className="list-disc pl-6 text-base text-muted-foreground">
              <li>End-to-end encryption via Supabase</li>
              <li>Regular security audits</li>
              <li>Access controls and 2FA for staff</li>
              <li>HTTPS/TLS for data transmission</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold md:text-3xl">7. Cookies & Tracking</h2>
            <div className="space-y-2 text-base text-muted-foreground">
              <p>We use:</p>
              <ul className="list-disc pl-6">
                <li>Session cookies for authentication</li>
                <li>Persistent cookies for preferences</li>
                <li>Local Storage for kanban board state</li>
              </ul>
              <p>You can manage cookies through browser settings. Essential cookies cannot be disabled.</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold md:text-3xl">8. Children's Privacy</h2>
            <p className="text-base text-muted-foreground">Our service is not directed at children under 16. We do not knowingly collect data from minors.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold md:text-3xl">9. Policy Updates</h2>
            <p className="text-base text-muted-foreground">We will notify users of material changes via email or in-app notice 30 days before implementation.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold md:text-3xl">Contact Information</h2>
            <p className="text-base text-muted-foreground">
              Data Controller: Rise2Role
              <br />
              Email:{' '}
              <a href="mailto:reymen@outlook.be" className="text-primary hover:underline">
                support@rise2role.com
              </a>
              <br />
              EU Representative: [Add if required by Article 27]
            </p>
          </div>

          <p className="text-base text-muted-foreground">
            By using Rise2Role, you acknowledge reading this policy and agree to its terms. For complaints, contact your local Data Protection Authority.
          </p>
        </div>
      </div>
    </section>
  );
}
