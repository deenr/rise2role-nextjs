'use client';

import { GradientPicker } from '@/components/color-picker';
import { FormMessage, Message } from '@/components/form-message';
import { SubmitButton } from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { updateCategory } from './actions';

export function EditCategoryDialog({ id, name, color }: { id: string; name: string; color: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newColor, setNewColor] = useState(color);
  const [message, setMessage] = useState<Message | null>(null);

  async function handleUpdateCategory(formData: FormData) {
    try {
      await updateCategory(formData);
      setIsOpen(false);
      toast.success('Category updated successfully!');
    } catch (error: any) {
      setMessage({ error: error.message });
      toast.error(error.message);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <Pencil className="size-4 text-muted-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        <form action={handleUpdateCategory}>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="color" value={newColor} />
          <div className="flex flex-row gap-4">
            <div className="min-w-32 max-w-32 space-y-2">
              <Label>Color</Label>
              <GradientPicker className="w-full" color={newColor} setColor={setNewColor} />
            </div>
            <div className="w-full space-y-2">
              <Label htmlFor="Category name">Category name</Label>
              <Input name="name" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Category name" required />
            </div>
          </div>
          <DialogFooter className="mt-6 flex w-full items-center gap-3">
            {message && <FormMessage className="w-full" message={message} />}
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <SubmitButton type="submit">Save Changes</SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
