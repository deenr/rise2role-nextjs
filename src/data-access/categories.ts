import { prisma } from '@/lib/prisma';

export async function getCategoriesByUserId(userId: string) {
  const categories = await prisma.jobCategory.findMany({ where: { userId }, orderBy: { order: 'asc' } });

  return categories;
}
