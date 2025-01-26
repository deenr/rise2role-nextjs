import { prisma } from '@/lib/prisma';
import CategoryCard from './category-card';
import NewCategoryDialog from './new-category-dialog';

export default async function CategoriesSection() {
  const categories = await prisma.jobCategory.findMany({ where: { userId: '01b09396-e264-441b-b4b3-a59d435b8bfe' }, orderBy: { order: 'asc' } });

  return (
    <>
      {categories?.map((category) => <CategoryCard key={category.id} {...category} />)}
      <NewCategoryDialog order={categories.length} />
    </>
  );
}
