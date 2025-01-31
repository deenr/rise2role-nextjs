import { prisma } from '@/lib/prisma';
import { User } from '@supabase/supabase-js';
import { cache } from 'react';
import { AuthenticationError } from './errors';

export const getCategories = cache(async (authenticatedUser: User | null) => {
  if (!authenticatedUser) {
    throw new AuthenticationError();
  }

  const categories = await prisma.jobCategory.findMany({
    where: { userId: authenticatedUser.id },
    orderBy: { order: 'asc' }
  });

  return categories;
});
