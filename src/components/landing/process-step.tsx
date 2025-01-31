import { Badge } from '@/components/ui/badge';

export function ProcessStep({ className, number, title, description, icon }: { className?: string; number: number; title: string; description: string; icon: React.ReactElement }) {
  return (
    <article className={`relative overflow-hidden rounded-xl border bg-background p-6 sm:p-8 ${className}`}>
      <Badge className="absolute right-3 top-3">Step {number}</Badge>

      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 p-2 text-primary sm:h-12 sm:w-12 sm:p-3">{icon}</div>
      <div className="mt-6 flex flex-col gap-2 sm:mt-8">
        <h3 className="text-lg font-semibold sm:text-xl">{title}</h3>
        <p className="sm:text-md text-sm font-normal text-muted-foreground">{description}</p>
      </div>
      <div className="absolute bottom-[-30px] right-[-50px] h-[133px] w-[168px] text-primary opacity-5">{icon}</div>
    </article>
  );
}
