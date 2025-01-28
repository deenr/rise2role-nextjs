import { Suspense } from 'react';

export default async function JobsPage() {
  return (
    <div className="px-4 pb-12 md:px-8">
      <header>
        <h3 className="text-lg font-semibold text-foreground">Job applications</h3>
        <p className="text-base text-muted-foreground">View all your jobs here</p>
      </header>
      <section className="mt-8 flex max-w-lg flex-col gap-6">
        <Suspense fallback={<>Loading...</>}></Suspense>
      </section>
    </div>
  );
}
