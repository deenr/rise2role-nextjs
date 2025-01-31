import { Message } from '@/components/form-message';
import { Card, CardContent } from '@/components/ui/card';
import { getKanbanBoard } from '@/data-access/kanban-board';
import { getSharedBoard } from '@/data-access/shared-board';
import { getCurrentUser } from '@/lib/session';
import { ShareForm } from './share-form';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // revalidate every hour
export const fetchCache = 'force-cache';

export async function ShareSection({ searchParams }: { searchParams: Message }) {
  const user = await getCurrentUser();

  const kanbanBoard = await getKanbanBoard(user);

  if (!kanbanBoard) {
    return 'Kanban board not found';
  }

  const sharedBoard = await getSharedBoard(kanbanBoard.id);

  return (
    <section className="mt-8 flex max-w-lg flex-col gap-6">
      <header>
        <h3 className="text-lg font-semibold text-foreground">Share settings</h3>
        <p className="text-base text-muted-foreground">Change here what you want and don't want to share.</p>
      </header>
      <Card>
        <CardContent className="pt-6">
          <ShareForm kanbanBoardId={kanbanBoard.id} sharedBoard={sharedBoard ?? null} searchParams={searchParams} />
        </CardContent>
      </Card>
    </section>
  );
}
