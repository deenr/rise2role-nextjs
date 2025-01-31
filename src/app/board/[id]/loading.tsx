import { KanbanSkeletonColumn } from '@/app/dashboard/kanban/kanban-column-skeleton';

export default function Loading() {
  return (
    <div className="flex h-full flex-1 flex-row gap-4 overflow-y-scroll">
      {[1, 2, 3, 4].map((index) => (
        <KanbanSkeletonColumn key={index} />
      ))}
    </div>
  );
}
