'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Loader2 } from 'lucide-react';
import { DeleteCategoryButton } from './delete-category-button';
import { EditCategoryDialog } from './edit-category-dialog';

export function CategoryCard({ id, name, hexColor, dragging, isUpdating, disabled }: any) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    attributes: {
      role: 'listitem'
    },
    disabled
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  return (
    <Card ref={setNodeRef} style={style} className={cn('relative flex flex-row items-center gap-4 overflow-hidden p-4', isUpdating && 'bg-muted')}>
      {isUpdating ? (
        <Button variant="ghost" size="icon">
          <Loader2 className="!size-5 animate-spin text-muted-foreground" />
        </Button>
      ) : (
        <Button variant="ghost" size="icon" {...attributes} {...listeners} aria-label={`Drag ${name} to reorder`}>
          <GripVertical className="!size-5 text-muted-foreground" />
        </Button>
      )}

      <div className="size-4 rounded-full" style={{ backgroundColor: hexColor }} role="presentation" />

      <p className="flex-1 font-medium text-foreground">{name}</p>

      <div className="flex items-center gap-1">
        <EditCategoryDialog id={id} name={name} color={hexColor} />
        <DeleteCategoryButton id={id} name={name} />
      </div>
    </Card>
  );
}
