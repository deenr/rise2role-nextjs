import { getCurrentUser } from '@/lib/session';
import { getCategoriesUseCase } from '@/use-cases/categories';
import { CategoryCard } from './category-card';
import { NewCategoryDialog } from './new-category-dialog';

export async function CategoriesSection() {
  const user = await getCurrentUser();
  const categories = await getCategoriesUseCase(user);

  return (
    <>
      {categories?.map((category) => <CategoryCard key={category.id} {...category} />)}
      <NewCategoryDialog order={categories.length} />
    </>
  );
}
