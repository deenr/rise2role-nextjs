'use client';

import { FormMessage, Message } from '@/components/form-message';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { deleteCategory } from './actions';

export function DeleteCategoryButton({ id, name }: { id: string; name: string }) {
  const [message, setMessage] = useState<Message | null>(null);
  const [isLoading, setIsLoading] = useState(false); // State for loading

  async function handleDelete() {
    const formData = new FormData();
    formData.append('id', id);
    setIsLoading(true);

    try {
      await deleteCategory(formData);
    } catch (error: any) {
      setMessage({ error: error.message });
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
          {message && <FormMessage className="w-full" message={message} />}
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
