'use client';

import { GradientPicker } from '@/components/color-picker';
import { SubmitButton } from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { updateCategory } from './actions';

export function EditCategoryDialog({ id, name, color }: { id: string; name: string; color: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newColor, setNewColor] = useState(color);

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
        <form
          action={async (formData) => {
            await updateCategory(formData);
            setIsOpen(false);
          }}
        >
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
          <DialogFooter className="mt-6 flex w-full justify-end gap-3">
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
