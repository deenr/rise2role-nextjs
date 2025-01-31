import { prisma } from '@/lib/prisma';
import { cache } from 'react';

export const getSharedBoard = cache(async (kanbanBoardId: string) => {
  const sharedBoard = await prisma?.sharedBoardLink.findFirst({
    where: { kanbanBoardId }
  });
  return sharedBoard;
});
