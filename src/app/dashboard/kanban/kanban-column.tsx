import { Badge } from '@/components/ui/badge';
import { prisma } from '@/lib/prisma';
import { jobCategory } from '@prisma/client';
import { KanbanCard } from './kanban-card';
import { NewJobApplicationDialog } from './new-job-application-dialog';

export async function KanbanColumn({ id, name, color, categories }: { id: string; name: string; color: string; categories: jobCategory[] }) {
  const jobApplications = await prisma.jobApplication.findMany({ where: { categoryId: id } });

  return (
    <div className="flex min-w-64 flex-col gap-4">
      <header className="relative flex min-h-10 flex-row items-center rounded-lg border bg-card px-3">
        <span className="text-card-foreground">{name}</span>
        <Badge className="ml-2 px-1.5" style={{ backgroundColor: color }}>
          {jobApplications.length}
        </Badge>
        <NewJobApplicationDialog categoryId={id} categories={categories} />
      </header>
      <section className="flex h-full flex-col gap-2 rounded-lg border bg-muted p-2">
        {jobApplications.map((jobApplication) => (
          <KanbanCard key={jobApplication.id} color={color} {...jobApplication} />
        ))}
      </section>
    </div>
  );
}
