'use server';

import { prisma } from '@/lib/prisma';
import { User } from '@supabase/supabase-js';
import { cache } from 'react';
import { AuthenticationError } from './errors';

export const getUserProfile = cache(async (authenticatedUser: User | null) => {
  if (!authenticatedUser) {
    throw new AuthenticationError();
  }

  const userProfile = await prisma.userProfile.findFirst({
    where: { id: authenticatedUser.id }
  });
  return userProfile;
});
