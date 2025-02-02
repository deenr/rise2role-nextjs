import { getCategories } from '@/data-access/categories';
import { getCurrentUser } from '@/lib/session';
import { CategoriesDnd } from './categories-dnd';
import { NewCategoryDialog } from './new-category-dialog';

export async function CategoriesSection() {
  const user = await getCurrentUser();
  const categories = await getCategories(user);

  return (
    <>
      <CategoriesDnd categories={categories} />
      <NewCategoryDialog order={categories.length} />
    </>
  );
}
