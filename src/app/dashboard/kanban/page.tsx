import { getCategories } from '@/data-access/categories';
import { getCurrentUser } from '@/lib/session';
import { KanbanColumn } from './kanban-column';

export default async function KanbanPage() {
  const user = await getCurrentUser();
  const categories = await getCategories(user);

  return (
    <div className="flex flex-1 flex-row gap-4 overflow-y-scroll px-4 pb-12 md:px-8">
      {categories.map((category) => (
        <KanbanColumn key={category.id} category={category} categories={categories} />
      ))}
    </div>
  );
}
