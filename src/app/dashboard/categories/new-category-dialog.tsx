'use client';

import { GradientPicker } from '@/components/color-picker';
import { SubmitButton } from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { createCategory } from './actions';

export default function NewCategoryDialog({ order }: { order: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState<string>('');
  const [color, setColor] = useState<string>('');

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-dashed">
          <Plus />
          Add new category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        <form
          action={async (formData) => {
            await createCategory(formData);
            setIsOpen(false);
          }}
          className="space-y-4"
        >
          <input type="hidden" name="order" value={order} />
          <input type="hidden" name="color" value={color} />
          <div className="flex flex-row gap-4">
            <GradientPicker className="min-w-32 max-w-32" color={color} setColor={setColor} />
            <Input name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Category name" required />
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
