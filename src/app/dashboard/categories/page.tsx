import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';
import CategoriesSection from './categories-section';

export default async function CategoriesPage() {
  return (
    <div className="px-4 pb-12 md:px-8">
      <header>
        <h3 className="text-lg font-semibold text-foreground">Categories</h3>
        <p className="text-base text-muted-foreground">View and/or edit your categories here</p>
      </header>
      <section className="mt-8 flex max-w-lg flex-col gap-6">
        <Suspense
          fallback={
            <>
              {[1, 2, 3].map((index) => (
                <Card key={index} className="flex flex-row items-center gap-4 p-4 shadow-none">
                  <Skeleton className="size-5" />
                  <Skeleton className="size-4 rounded-full" />
                  <Skeleton className="h-6 w-1/4" />
                  <div className="ml-auto flex size-9 items-center justify-center gap-1">
                    <Skeleton className="size-5 rounded-full" />
                  </div>
                </Card>
              ))}
              <div className="flex h-9 flex-row items-center justify-center gap-2 rounded-md border border-dashed px-4 py-2">
                <Skeleton className="size-5 rounded-full" />
                <Skeleton className="h-full w-1/4" />
              </div>
            </>
          }
        >
          <CategoriesSection />
        </Suspense>
      </section>
    </div>
  );
}
