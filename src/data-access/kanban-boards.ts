import { prisma } from '@/lib/prisma';

export async function getKanbanBoardsByOwnerId(userId: string) {
  const boards = await prisma.kanbanBoard.findMany({ where: { ownerId: userId } });

  return boards;
}
