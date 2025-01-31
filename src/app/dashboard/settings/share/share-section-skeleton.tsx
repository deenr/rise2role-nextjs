import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ShareSectionSkeleton() {
  return (
    <section className="mt-8 flex max-w-lg flex-col gap-6">
      <header>
        <h3 className="text-lg font-semibold text-foreground">Share settings</h3>
        <p className="text-base text-muted-foreground">Change here what you want and don't want to share.</p>
      </header>
      <Card>
        <CardContent className="pt-6">
          <form className="grid w-full max-w-lg gap-6">
            <div className="flex flex-row items-center gap-2">
              <Skeleton className="h-[18px] w-[34px] rounded-full" />
              <Skeleton className="h-[12px] w-[93px]" />
            </div>
            <div className="grid gap-2">
              <Skeleton className="h-[14px] w-1/2" />
              <Skeleton className="h-9 w-full" />
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
