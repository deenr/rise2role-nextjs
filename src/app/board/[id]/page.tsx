import { getCategoriesBySharedBoard } from '@/data-access/categories';
import { KanbanColumn } from './kanban-column';

export default async function PublicBoardPage({ params }: { params: Promise<{ id: string }> }) {
  const publicBoardParams = await params;

  try {
    const categories = await getCategoriesBySharedBoard(publicBoardParams.id);

    return (
      <div className="flex h-full flex-1 flex-row gap-4 overflow-y-scroll">
        {categories.map((category) => (
          <KanbanColumn key={category.id} category={category} />
        ))}
      </div>
    );
  } catch {
    return <>Board not found</>;
  }
}
