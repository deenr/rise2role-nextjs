import { Skeleton } from '@/components/ui/skeleton';
import { DataTableSkeleton } from './data-table-skeleton';

export default function JobsLoading() {
  return (
    <div className="flex flex-col gap-8 pb-12 sm:px-4 md:px-8">
      <header className="flex flex-wrap justify-between gap-4 px-4 sm:px-0">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Job applications</h3>
          <p className="text-base text-muted-foreground">View all your jobs here</p>
        </div>
        <Skeleton className="h-9 w-[158px]" />
      </header>
      <section className="flex h-full min-h-0 flex-grow-0 flex-col gap-6">
        <DataTableSkeleton />
      </section>
    </div>
  );
}
