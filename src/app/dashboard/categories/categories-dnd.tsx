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
  const [retryLoading, setRetryLoading] = useState(false); // New state for retry loading

  // Validate and filter categories
  const validInitialCategories = useMemo(
    () =>
      initialCategories.filter(
        (category): category is jobCategory => Boolean(category) && typeof category.id === 'string' && typeof category.name === 'string' && typeof category.hexColor === 'string'
      ),
    [initialCategories]
  );

  const [optimisticCategories, updateOptimisticCategories] = useOptimistic(validInitialCategories);

  const activeCategory = useMemo(() => optimisticCategories.find((category) => category.id === active?.id), [active, optimisticCategories]);

  // Set mounted after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
      keyboardCodes: {
        start: ['Space', 'Enter'],
        cancel: ['Escape'],
        end: ['Space', 'Enter']
      }
    })
  );

  function onDragStart({ active }: DragStartEvent) {
    setActive(active);
  }

  async function onDragEnd({ active, over }: DragEndEvent) {
    if (!over || active.id === over.id) {
      setActive(null);
      return;
    }

    const activeIndex = optimisticCategories.findIndex(({ id }) => id === active.id);
    const overIndex = optimisticCategories.findIndex(({ id }) => id === over.id);

    // Calculate affected items
    const affectedIndexes = new Set<number>();
    const start = Math.min(activeIndex, overIndex);
    const end = Math.max(activeIndex, overIndex);
    for (let i = start; i <= end; i++) {
      affectedIndexes.add(i);
    }

    const updatedItemIds = new Set(Array.from(affectedIndexes).map((index) => optimisticCategories[index].id));
    setUpdatedIds(updatedItemIds);

    const newCategories = arrayMove(optimisticCategories, activeIndex, overIndex);

    startTransition(() => {
      updateOptimisticCategories(newCategories);
      setActive(null);
    });

    setIsUpdating(true);
    try {
      await updateCategories(newCategories);
      toast.success('Categories order updated');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update categories'));
      toast.error('Failed to update categories order');

      setFailedCategories(newCategories);

      startTransition(() => {
        updateOptimisticCategories(validInitialCategories);
      });
    } finally {
      setIsUpdating(false);
      setUpdatedIds(new Set());
    }
  }

  const handleRetry = async () => {
    setRetryLoading(true); // Set loading state to true
    try {
      await updateCategories(failedCategories);
      toast.success('Categories order updated on retry');
      setFailedCategories([]); // Clear failed categories on success
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update categories on retry'));
      toast.error('Failed to update categories order on retry');
    } finally {
      setError(null);
      setIsUpdating(false);
      setRetryLoading(false); // Reset loading state
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
      {error && (
        <Card role="alert" className="flex flex-row items-center gap-4 border border-red-300 bg-red-50 p-4 text-red-600">
          <div className="flex w-8 items-center">
            <CircleAlert className="mx-auto my-auto size-5" />
          </div>
          <p className="font-medium">{error.message}</p>
          <Button variant="outline" size="sm" className="ml-auto" onClick={handleRetry} disabled={retryLoading}>
            {retryLoading ? <Loader2 className="animate-spin" /> : null}
            Retry
          </Button>
        </Card>
      )}
      <div className="space-y-6">
        <SortableContext items={optimisticCategories}>
          {optimisticCategories?.map((category) => (
            <CategoryCard key={category.id} {...category} dragging={category.id === active?.id} isUpdating={updatedIds.has(category.id)} disabled={isUpdating} />
          ))}
        </SortableContext>
      </div>
      <DragOverlay>{activeCategory && <CategoryCard {...activeCategory} dragging={false} isUpdating={false} disabled={false} />}</DragOverlay>
    </DndContext>
  );
}
