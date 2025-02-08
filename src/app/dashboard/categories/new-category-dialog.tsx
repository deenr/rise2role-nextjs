'use client';

import { GradientPicker } from '@/components/color-picker';
import { FormMessage, Message } from '@/components/form-message';
import { SubmitButton } from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DialogDescription } from '@radix-ui/react-dialog';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { createCategory as createCategoryAction } from './actions';

export function NewCategoryDialog({ order }: { order: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [message, setMessage] = useState<Message | null>(null);

  async function createCategory(formData: FormData) {
    if (!name) {
      setMessage({ error: 'Name is required' });
      return;
    }
    if (!color) {
      setMessage({ error: 'Color is required' });
      return;
    }
    try {
      await createCategoryAction(formData);
      setIsOpen(false);
      toast.success('Category created successfully');
    } catch (error: any) {
      setMessage({ error: error.message });
      toast.error(error.message);
    }
  }

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
          <DialogTitle>New Category</DialogTitle>
          <DialogDescription className="sr-only">Dialog to add a new category</DialogDescription>
        </DialogHeader>
        <form action={createCategory}>
          <input type="hidden" name="order" value={order} />
          <input type="hidden" name="color" value={color} />
          <div className="flex flex-row gap-4">
            <div className="min-w-32 max-w-32 space-y-2">
              <Label>Color</Label>
              <GradientPicker className="w-full" color={color} setColor={setColor} />
            </div>
            <div className="w-full space-y-2">
              <Label htmlFor="Category name">Category name</Label>
              <Input name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Category name" required />
            </div>
          </div>
          <DialogFooter className="mt-6 flex w-full items-center gap-3">
            {message && <FormMessage className="w-full" message={message} />}
            <Button className="ml-auto w-full sm:w-fit" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <SubmitButton className="w-full sm:w-fit" type="submit">
              Create category
            </SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
