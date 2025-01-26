import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function KanbanSkeletonColumn() {
  return (
    <div className="flex h-full w-full min-w-64 flex-col gap-4">
      <header className="relative flex min-h-10 flex-row items-center rounded-lg border bg-card px-3">
        <Skeleton className="h-6 w-2/3" />
      </header>
      <section className="flex h-full flex-col gap-2 rounded-lg border bg-muted p-2">
        {[1, 2].map((index) => (
          <Card key={index} className="group relative w-full overflow-hidden rounded-md p-4">
            <Skeleton className="absolute left-0 h-full w-1 opacity-20 transition-colors group-hover:opacity-100" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="mt-2 h-5 w-3/5" />
            <Skeleton className="mt-4 h-5 w-2/3" />
            <Skeleton className="mt-3 h-[22px] w-3/5" />
          </Card>
        ))}
      </section>
    </div>
  );
}
