'use client';

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { deleteCategory } from './actions';

export function DeleteCategoryButton({ id, name }: { id: string; name: string }) {
  const [isLoading, setIsLoading] = useState(false); // State for loading

  async function handleDelete() {
    const formData = new FormData();
    formData.append('id', id);
    setIsLoading(true);

    try {
      await deleteCategory(formData);
      toast.success('Category deleted successfully');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <Trash2 className="size-4 text-muted-foreground" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete category</AlertDialogTitle>
          <AlertDialogDescription>Are you sure you want to delete the category "{name}"? This action cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex w-full items-center">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive" onClick={handleDelete}>
            {isLoading ? <Loader2 className="animate-spin" /> : null}
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
