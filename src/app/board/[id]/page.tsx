import { getCategoriesBySharedBoard } from '@/data-access/categories';
import { KanbanColumn } from './kanban-column';

export default async function PublicBoardPage({ params }: { params: Promise<{ id: string }> }) {
  const publicBoardParams = await params;

  try {
    const categories = await getCategoriesBySharedBoard(publicBoardParams.id);

    if (categories.length === 0) {
      return (
        <div className="flex h-full flex-1 flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Board not found</h1>
          <p className="text-balance text-sm text-muted-foreground">The board you are looking for may be private or does not exist.</p>
        </div>
      );
    }

    return (
      <div className="flex h-full flex-1 flex-row gap-4 overflow-y-scroll">
        {categories.map((category) => (
          <KanbanColumn key={category.id} category={category} />
        ))}
      </div>
    );
  } catch {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Board not found</h1>
        <p className="text-balance text-sm text-muted-foreground">The board you are looking for may be private or does not exist.</p>
      </div>
    );
  }
}
