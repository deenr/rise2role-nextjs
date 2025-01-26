import { prisma } from '@/lib/prisma';
import CategoryCard from './category-card';
import NewCategoryDialog from './new-category-dialog';

export default async function CategoriesSection() {
  const categories = await prisma.jobCategory.findMany({ where: { userId: '01b09396-e264-441b-b4b3-a59d435b8bfe' }, orderBy: { order: 'asc' } });

  return (
    <section className="mt-8 flex max-w-lg flex-col gap-6">
      {categories?.map((category) => <CategoryCard key={category.id} {...category} />)}
      <NewCategoryDialog />
    </section>
  );
}
