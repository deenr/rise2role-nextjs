import { getCurrentUser } from '@/lib/session';
import { getCategoriesUseCase } from '@/use-cases/categories';
import { getKanbanBoardUseCase } from '@/use-cases/kanban-boards';
import { Suspense } from 'react';
import { KanbanColumn } from './kanban-column';
import { KanbanSkeletonColumn } from './kanban-column-skeleton';

export default async function KanbanPage() {
  const user = await getCurrentUser();
  const categories = await getCategoriesUseCase(user);
  const kanbanBoard = await getKanbanBoardUseCase(user);

  return (
    <div className="flex flex-1 flex-row gap-4 overflow-y-scroll px-4 pb-12 md:px-8">
      <Suspense
        fallback={[1, 2, 3, 4].map((index) => (
          <KanbanSkeletonColumn key={index} />
        ))}
      >
        {categories.map((category) => (
          <KanbanColumn key={category.id} {...category} color={category.hexColor} categories={categories} kanbanBoardId={kanbanBoard.id} />
        ))}
      </Suspense>
    </div>
  );
}
