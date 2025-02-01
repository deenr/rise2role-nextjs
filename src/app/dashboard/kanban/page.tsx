import { Button } from '@/components/ui/button';
import { getCategories } from '@/data-access/categories';
import { getCurrentUser } from '@/lib/session';
import Link from 'next/link';
import { KanbanColumn } from './kanban-column';

export default async function KanbanPage() {
  const user = await getCurrentUser();
  const categories = await getCategories(user);

  return (
    <div className="flex flex-1 flex-row gap-4 overflow-y-scroll px-4 pb-12 md:px-8">
      {categories.length > 0 ? (
        categories.map((category) => <KanbanColumn key={category.id} category={category} categories={categories} />)
      ) : (
        <div>
          <header>
            <h3 className="text-lg font-semibold text-foreground">You don't have any categories yet.</h3>
            <p className="text-base text-muted-foreground">Click the button down below to get started.</p>
          </header>
          <section className="mt-8 flex max-w-lg flex-col gap-6">
            <Link href={'categories'}>
              <Button variant="outline">Click here to add your first category</Button>
            </Link>
          </section>
        </div>
      )}
    </div>
  );
}
