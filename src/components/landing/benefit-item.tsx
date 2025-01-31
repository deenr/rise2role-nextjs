import { Badge } from '@/components/ui/badge';
import { Check, Frown, Smile, X } from 'lucide-react';

export function BenefitItem({ className, positive, negative }: { className?: string; positive: { title: string; description: string }; negative: { title: string; description: string } }) {
  return (
    <article className={`flex flex-col gap-8 md:flex-row md:gap-12 md:overflow-hidden md:rounded-xl md:border md:bg-background md:p-8 ${className}`}>
      <div className="relative flex-1 rounded-xl border bg-background p-6 sm:p-8 md:rounded-none md:border-none md:bg-none md:p-0">
        <Check className="rounded-full bg-primary p-1 text-background" />
        <div className="mt-8 flex flex-col gap-2">
          <h3 className="text-xl font-semibold">{positive.title}</h3>
          <p className="text-md font-normal text-muted-foreground">{positive.description}</p>
        </div>
        <Badge variant="outline" className="absolute right-[29px] top-[-16px] z-10 overflow-hidden border-none bg-background p-0 md:hidden">
          <div className="flex flex-row items-center gap-1 bg-primary/10 py-1.5 pl-2 pr-3">
            <Smile className="h-5 w-5 text-primary" />
            <p className="sm:text-md text-sm font-medium text-primary">With Rise2Role</p>
          </div>
        </Badge>
      </div>
      <div className="hidden w-[1px] bg-border md:block"></div>
      <div className="relative flex-1 rounded-3xl border bg-background p-6 sm:p-8 md:rounded-none md:border-none md:bg-none md:p-0">
        <X className="rounded-full bg-destructive p-1 text-background" />
        <div className="mt-8 flex flex-col gap-2">
          <h3 className="text-xl font-semibold">{negative.title}</h3>
          <p className="text-md font-normal text-muted-foreground">{negative.description}</p>
        </div>

        <Badge variant="outline" className="absolute right-[29px] top-[-16px] z-10 overflow-hidden border-none bg-background p-0 md:hidden">
          <div className="flex flex-row items-center gap-1 bg-destructive/10 py-1.5 pl-2 pr-3">
            <Frown className="h-5 w-5 text-destructive" />
            <p className="sm:text-md text-sm font-medium text-destructive">Without Rise2Role</p>
          </div>
        </Badge>
      </div>
    </article>
  );
}
