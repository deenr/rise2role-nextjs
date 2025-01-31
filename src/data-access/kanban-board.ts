import { prisma } from '@/lib/prisma';
import { User } from '@supabase/supabase-js';
import { cache } from 'react';
import { AuthenticationError } from './errors';

export const getKanbanBoard = cache(async (authenticatedUser: User | null) => {
  if (!authenticatedUser) {
    throw new AuthenticationError();
  }

  const board = await prisma.kanbanBoard.findFirst({
    where: { ownerId: authenticatedUser.id }
  });

  return board;
});
