import { Badge } from '@/components/ui/badge';
import { getCurrentUser } from '@/lib/session';
import { getJobApplicationsByKanbanBoardIdUseCase } from '@/use-cases/job-applications';
import { jobCategory } from '@prisma/client';
import { KanbanCard } from './kanban-card';
import { NewJobApplicationDialog } from './new-job-application-dialog';

export async function KanbanColumn({ id, name, color, categories, kanbanBoardId }: { id: string; name: string; color: string; categories: jobCategory[]; kanbanBoardId: string }) {
  const user = await getCurrentUser();
  const jobApplications = await getJobApplicationsByKanbanBoardIdUseCase(user, id, kanbanBoardId);

  return (
    <div className="flex w-full min-w-[320px] flex-1 flex-col gap-4">
      <header className="relative flex min-h-10 flex-row items-center rounded-lg border bg-card px-3">
        <span className="text-card-foreground">{name}</span>
        <Badge className="ml-2 px-1.5" style={{ backgroundColor: color }}>
          {jobApplications.length}
        </Badge>
        <NewJobApplicationDialog categoryId={id} categories={categories} />
      </header>
      <section className="flex flex-1 flex-col gap-2 rounded-lg border bg-muted p-2">
        {jobApplications.map((jobApplication) => (
          <KanbanCard key={jobApplication.id} color={color} {...jobApplication} />
        ))}
      </section>
    </div>
  );
}
