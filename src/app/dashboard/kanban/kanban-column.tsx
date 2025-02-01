import { Badge } from '@/components/ui/badge';
import { getJobApplicationsByCategory } from '@/data-access/job-applications';
import { jobCategory } from '@prisma/client';
import { KanbanCard } from './kanban-card';
import { NewJobApplicationDialog } from './new-job-application-dialog';

export async function KanbanColumn({ category, categories }: { category: jobCategory; categories: jobCategory[] }) {
  const jobApplications = await getJobApplicationsByCategory(category.id);

  return (
    <div className="flex w-full min-w-[320px] flex-1 flex-col gap-4">
      <header className="relative flex min-h-10 flex-row items-center rounded-lg border bg-card px-3">
        <span className="text-card-foreground">{category.name}</span>
        <Badge className="ml-2 px-1.5" style={{ backgroundColor: category.hexColor }}>
          {jobApplications.length}
        </Badge>
        <NewJobApplicationDialog categories={categories} />
      </header>
      <section className="flex flex-1 flex-col gap-2 rounded-lg border bg-muted p-2">
        {jobApplications.map((jobApplication) => (
          <KanbanCard key={jobApplication.id} color={category.hexColor} {...jobApplication} />
        ))}
      </section>
    </div>
  );
}
