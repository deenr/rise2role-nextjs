import { getCategoriesByUserId } from '@/data-access/categories';
import { AuthenticationError } from '@/use-cases/errors';
import { User } from '@supabase/supabase-js';

export async function getCategoriesUseCase(authenticatedUser: User | null) {
  if (!authenticatedUser) {
    throw new AuthenticationError();
  }

  return await getCategoriesByUserId(authenticatedUser.id);
}
