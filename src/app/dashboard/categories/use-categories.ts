import { jobCategory } from '@prisma/client';
import { startTransition, useOptimistic, useState } from 'react';
import { toast } from 'sonner';

export function useCategories(initialCategories: jobCategory[]) {
  // Filter out any null/undefined/invalid categories
  const validInitialCategories = initialCategories.filter(
    (category): category is jobCategory => Boolean(category) && typeof category.id === 'string' && typeof category.name === 'string' && typeof category.hexColor === 'string'
  );

  const [optimisticCategories, updateOptimisticCategories] = useOptimistic(validInitialCategories);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateCategoryOrder = async (newCategories: jobCategory[]) => {
    // Validate new categories before updating
    const validNewCategories = newCategories.filter(
      (category): category is jobCategory => Boolean(category) && typeof category.id === 'string' && typeof category.name === 'string' && typeof category.hexColor === 'string'
    );

    if (validNewCategories.length !== newCategories.length) {
      console.error('Invalid categories detected and filtered out');
    }

    setIsUpdating(true);
    setError(null);

    startTransition(() => {
      updateOptimisticCategories(validNewCategories);
    });

    try {
      await updateCategoryOrder(validNewCategories);
      toast.success('Categories order updated');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update categories'));
      toast.error('Failed to update categories order');
      // Revert optimistic update
      startTransition(() => {
        updateOptimisticCategories(validInitialCategories);
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    categories: optimisticCategories,
    updateCategories: (newCategories: jobCategory[]) => {
      const validNewCategories = newCategories.filter(
        (category): category is jobCategory => Boolean(category) && typeof category.id === 'string' && typeof category.name === 'string' && typeof category.hexColor === 'string'
      );

      startTransition(() => {
        updateOptimisticCategories(validNewCategories);
      });
    },
    isUpdating,
    error,
    updateCategoryOrder
  };
}
