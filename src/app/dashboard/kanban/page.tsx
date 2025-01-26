import { prisma } from '@/lib/prisma';
import { Suspense } from 'react';
import { KanbanColumn } from './kanban-column';
import { KanbanSkeletonColumn } from './kanban-column-skeleton';

export default async function KanbanPage() {
  const categories = await prisma.jobCategory.findMany({ where: { userId: '01b09396-e264-441b-b4b3-a59d435b8bfe' }, orderBy: { order: 'asc' } });

  return (
    <div className="flex flex-1 flex-row gap-4 overflow-y-scroll px-4 pb-12 md:px-8">
      <Suspense
        fallback={[1, 2, 3, 4].map((index) => (
          <KanbanSkeletonColumn key={index} />
        ))}
      >
        {categories.map((category) => (
          <KanbanColumn key={category.id} {...category} color={category.hexColor} categories={categories} />
        ))}
      </Suspense>
    </div>
  );
}
