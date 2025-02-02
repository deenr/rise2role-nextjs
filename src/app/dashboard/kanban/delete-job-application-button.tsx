'use client';

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Loader2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { deleteJobApplication } from './actions';

export function DeleteJobApplicationButton({ id, jobTitle, category, onDialogClose }: { id: string; jobTitle: string; category: string; onDialogClose: () => void }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    const formData = new FormData();
    formData.append('id', id);
    setIsLoading(true);

    try {
      await deleteJobApplication(formData);
      toast.success('Job application deleted successfully');

      onDialogClose();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AlertDialog onOpenChange={(open) => !open && onDialogClose()}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Trash2 />
          <span>Delete application</span>
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete job application</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the {jobTitle} from {category}? This action cannot be undone.
          </AlertDialogDescription>
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
