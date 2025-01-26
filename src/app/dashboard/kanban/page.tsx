import { prisma } from '@/lib/prisma';
import { Suspense } from 'react';
import { KanbanColumn } from './kanban-column';

export default async function CategoriesPage() {
  const categories = await prisma.jobCategory.findMany({ where: { userId: '01b09396-e264-441b-b4b3-a59d435b8bfe' }, orderBy: { order: 'asc' } });

  return (
    <div className="flex flex-row gap-4">
      <Suspense fallback={<>Loading...</>}>
        {categories.map((category) => (
          <KanbanColumn key={category.id} {...category} color={category.hexColor} categories={categories} />
        ))}
      </Suspense>
    </div>
  );
}
