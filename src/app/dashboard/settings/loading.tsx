import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="px-4 pb-12 md:px-8">
      <h3 className="text-lg font-semibold text-foreground">Settings</h3>
      <Skeleton className="mt-5 h-9 w-[293px] rounded-lg" />
      <section className="mt-8 flex max-w-lg flex-col gap-6">
        <header>
          <Skeleton className="h-7 w-1/4" />
          <Skeleton className="mt-1 h-5 w-3/4" />
        </header>
        <Skeleton className="h-56 w-full" />
      </section>
    </div>
  );
}
