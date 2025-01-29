import { getCurrentUser } from '@/lib/session';
import { getCategoriesUseCase } from '@/use-cases/categories';
import { getJobApplicationsByUserUseCase } from '@/use-cases/job-applications';
import { Suspense } from 'react';
import { DataTable } from './data-table';
import { NewJobApplicationDialog } from './new-job-application-dialog';

export default async function JobsPage() {
  const user = await getCurrentUser();
  const jobApplications = await getJobApplicationsByUserUseCase(user);
  const categories = await getCategoriesUseCase(user);

  return (
    <div className="flex flex-col gap-8 pb-12 sm:px-4 md:px-8">
      <header className="flex flex-wrap justify-between gap-4 px-4 sm:px-0">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Job applications</h3>
          <p className="text-base text-muted-foreground">View all your jobs here</p>
        </div>
        <NewJobApplicationDialog categories={categories} />
      </header>
      <section className="flex h-full min-h-0 flex-grow-0 flex-col gap-6">
        <Suspense fallback={<>Loading...</>}>
          <DataTable data={jobApplications} categories={categories} />
        </Suspense>
      </section>
    </div>
  );
}
