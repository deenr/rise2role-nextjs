'use client';

import { GradientPicker } from '@/components/color-picker';
import { SubmitButton } from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { updateCategory } from './actions';

export default function EditCategoryDialog({ id, name, color }: { id: string; name: string; color: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newColor, setNewColor] = useState<string>(color);

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
          className="space-y-4"
        >
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="color" value={newColor} />
          <div className="flex flex-row gap-4">
            <GradientPicker className="min-w-32 max-w-32" color={newColor} setColor={setNewColor} />
            <Input name="name" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Category name" required />
          </div>

          <div className="flex w-full justify-end gap-3">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <SubmitButton type="submit">Save Changes</SubmitButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
