import { Card } from '@/components/ui/card';
import { GripVertical } from 'lucide-react';
import { EditCategoryDialog } from './edit-category-dialog';

export function CategoryCard({ id, name, hexColor }: { id: string; name: string; hexColor: string }) {
  return (
    <Card className="flex flex-row items-center gap-4 p-4">
      <GripVertical className="size-5 text-muted-foreground" />
      <div className="size-4 rounded-full" style={{ backgroundColor: hexColor }}></div>
      <p className="flex-1 font-medium text-foreground">{name}</p>
      <div className="flex gap-1">
        <EditCategoryDialog id={id} name={name} color={hexColor} />
        {/* <Button size="icon" variant="ghost">
          <Trash2 className="size-4 text-muted-foreground" />
        </Button> */}
      </div>
    </Card>
  );
}
