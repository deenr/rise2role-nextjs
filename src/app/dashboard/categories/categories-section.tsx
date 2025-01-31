import { getCategories } from '@/data-access/categories';
import { getCurrentUser } from '@/lib/session';
import { CategoryCard } from './category-card';
import { NewCategoryDialog } from './new-category-dialog';

export async function CategoriesSection() {
  const user = await getCurrentUser();

  const categories = await getCategories(user);

  return (
    <>
      {categories?.map((category) => <CategoryCard key={category.id} {...category} />)}
      <NewCategoryDialog order={categories.length} />
    </>
  );
}
