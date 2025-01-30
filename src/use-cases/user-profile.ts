import { getUserProfileById } from '@/data-access/user-profile';
import { AuthenticationError } from '@/use-cases/errors';
import { User } from '@supabase/supabase-js';

export async function getUserProfileUseCase(authenticatedUser: User | null) {
  if (!authenticatedUser) {
    throw new AuthenticationError();
  }

  return await getUserProfileById(authenticatedUser.id);
}
