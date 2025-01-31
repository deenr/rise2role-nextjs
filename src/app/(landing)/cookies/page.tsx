'use client';

export default function CookiesPage() {
  return (
    <section className="px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 md:px-8 md:pb-24 md:pt-48 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:gap-8 md:gap-12">
        <div className="flex flex-col items-start gap-3 text-primary">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">Cookies Policy for Rise2Role</h1>
          <p className="max-w-2xl text-sm font-normal text-muted-foreground sm:text-base lg:text-lg">Compliant with ePrivacy Directive (EU) 2002/58/EC and GDPR</p>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold md:text-3xl">What Are Cookies?</h2>
            <p className="text-base text-muted-foreground">Cookies are small text files stored on your device. We use them and similar technologies (Local Storage) to:</p>
            <ul className="list-disc pl-6 text-base text-muted-foreground">
              <li>Authenticate users</li>
              <li>Store board preferences</li>
              <li>Analyze service performance</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold md:text-3xl">Cookie Types We Use</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold md:text-2xl">Essential Cookies</h3>
                <p className="mt-2 text-base text-muted-foreground">
                  <strong>Purpose:</strong> Core functionality
                  <br />
                  <strong>Example:</strong> Supabase authentication session
                  <br />
                  <strong>Duration:</strong> Session
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold md:text-2xl">Preference Cookies</h3>
                <p className="mt-2 text-base text-muted-foreground">
                  <strong>Purpose:</strong> Remember board layout/theme
                  <br />
                  <strong>Storage:</strong> Local Storage
                  <br />
                  <strong>Duration:</strong> 1 year
                </p>
              </div>

              {/* <div>
                <h3 className="text-xl font-semibold md:text-2xl">Analytics Cookies</h3>
                <p className="mt-2 text-base text-muted-foreground">
                  <strong>Purpose:</strong> Service improvement
                  <br />
                  <strong>Tool:</strong> [Your Analytics Provider]
                  <br />
                  <strong>Duration:</strong> 13 months max
                </p>
              </div> */}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold md:text-3xl">Consent Management</h2>
            <div className="space-y-2 text-base text-muted-foreground">
              <p>We:</p>
              <ul className="list-disc pl-6">
                <li>Require opt-in for non-essential cookies</li>
                <li>Store consent preferences for 6 months</li>
                <li>Provide granular control through our consent banner</li>
              </ul>
              <p>Manage preferences at any time via Settings.</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold md:text-3xl">Third-Party Cookies</h2>
            <p className="text-base text-muted-foreground">Supabase may set essential cookies for authentication. We don't allow third-party marketing cookies.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold md:text-3xl">Your Controls</h2>
            <ul className="list-disc pl-6 text-base text-muted-foreground">
              <li>Browser settings to block/delete cookies</li>
              <li>Incognito/Private browsing modes</li>
              <li>Our consent management platform</li>
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-base text-muted-foreground">
              Contact our DPO:{' '}
              <a href="mailto:dpo@rise2role.com" className="text-primary hover:underline">
                dpo@rise2role.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
