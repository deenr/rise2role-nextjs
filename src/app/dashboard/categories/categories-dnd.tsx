'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Active, DndContext, DragEndEvent, DragOverlay, DragStartEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { jobCategory } from '@prisma/client';
import { CircleAlert, Loader2 } from 'lucide-react';
import { startTransition, useEffect, useMemo, useOptimistic, useState } from 'react';
import { toast } from 'sonner';
import { updateCategories } from './actions';
import { CategoryCard } from './category-card';

export function CategoriesDnd({ categories: initialCategories }: { categories: jobCategory[] }) {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<Active | null>(null);
  const [updatedIds, setUpdatedIds] = useState<Set<string>>(new Set());
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [failedCategories, setFailedCategories] = useState<jobCategory[]>([]);
  const [retryLoading, setRetryLoading] = useState(false);

  const validInitialCategories = useMemo(
    () =>
      initialCategories.filter(
        (category): category is jobCategory => Boolean(category) && typeof category.id === 'string' && typeof category.name === 'string' && typeof category.hexColor === 'string'
      ),
    [initialCategories]
  );

  const [optimisticCategories, updateOptimisticCategories] = useOptimistic(validInitialCategories);
  const activeCategory = useMemo(() => optimisticCategories.find((category) => category.id === active?.id), [active, optimisticCategories]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
      keyboardCodes: { start: ['Space', 'Enter'], cancel: ['Escape'], end: ['Space', 'Enter'] }
    })
  );

  const onDragStart = ({ active }: DragStartEvent) => setActive(active);

  const onDragEnd = async ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) {
      setActive(null);
      return;
    }

    const activeIndex = optimisticCategories.findIndex(({ id }) => id === active.id);
    const overIndex = optimisticCategories.findIndex(({ id }) => id === over.id);
    const newCategories = arrayMove(optimisticCategories, activeIndex, overIndex);
    const updatedItemIds = new Set(newCategories.slice(Math.min(activeIndex, overIndex), Math.max(activeIndex, overIndex) + 1).map(({ id }) => id));

    setUpdatedIds(updatedItemIds);
    startTransition(() => {
      updateOptimisticCategories(newCategories);
      setActive(null);
    });

    setIsUpdating(true);
    try {
      const result = await updateCategories(newCategories);

      if (result.success) {
        toast.success('Categories order updated');
      } else {
        throw new Error(result.error || 'Failed to update categories');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update categories';
      setError(new Error(errorMessage));
      toast.error(errorMessage);
      setFailedCategories(newCategories);
      startTransition(() => updateOptimisticCategories(validInitialCategories));
    } finally {
      setIsUpdating(false);
      setUpdatedIds(new Set());
    }
  };

  const handleRetry = async () => {
    setRetryLoading(true);
    try {
      const result = await updateCategories(failedCategories);

      if (result.success) {
        toast.success('Categories order updated on retry');
        setFailedCategories([]);
      } else {
        throw new Error(result.error || 'Failed to update categories on retry');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update categories on retry';
      setError(new Error(errorMessage));
      toast.error(errorMessage);
    } finally {
      setError(null);
      setIsUpdating(false);
      setRetryLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
      {error && (
        <Card role="alert" className="flex flex-row items-center gap-4 border border-red-300 bg-red-50 p-4 text-red-600">
          <CircleAlert className="mx-auto my-auto size-5" />
          <p className="font-medium">{error.message}</p>
          <Button variant="outline" size="sm" className="ml-auto" onClick={handleRetry} disabled={retryLoading}>
            {retryLoading ? <Loader2 className="animate-spin" /> : null} Retry
          </Button>
        </Card>
      )}
      <div className="space-y-6">
        <SortableContext items={optimisticCategories}>
          {optimisticCategories.map((category) => (
            <CategoryCard key={category.id} {...category} dragging={category.id === active?.id} isUpdating={updatedIds.has(category.id)} disabled={isUpdating} />
          ))}
        </SortableContext>
      </div>
      <DragOverlay>{activeCategory && <CategoryCard {...activeCategory} dragging={false} isUpdating={false} disabled={false} />}</DragOverlay>
    </DndContext>
  );
}
