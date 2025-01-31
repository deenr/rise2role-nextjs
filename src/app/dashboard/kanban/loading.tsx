import { KanbanSkeletonColumn } from './kanban-column-skeleton';

export default function Loading() {
  return (
    <div className="flex flex-1 flex-row gap-4 overflow-y-scroll px-4 pb-12 md:px-8">
      {[1, 2, 3, 4].map((index) => (
        <KanbanSkeletonColumn key={index} />
      ))}
    </div>
  );
}
