import { getJobApplicationsByCategoryIdAndKanbanBoardId, getJobApplicationsByKanbanBoardId } from '@/data-access/job-applications';
import { getKanbanBoardsByOwnerId } from '@/data-access/kanban-boards';
import { AuthenticationError } from '@/use-cases/errors';
import { User } from '@supabase/supabase-js';

export async function getJobApplicationsByKanbanBoardIdUseCase(authenticatedUser: User | null, categoryId: string, kanbanBoardId: string) {
  if (!authenticatedUser) {
    throw new AuthenticationError();
  }

  return await getJobApplicationsByCategoryIdAndKanbanBoardId(categoryId, kanbanBoardId);
}

export async function getJobApplicationsByUserUseCase(authenticatedUser: User | null) {
  if (!authenticatedUser) {
    throw new AuthenticationError();
  }

  const kanbanBoard = (await getKanbanBoardsByOwnerId(authenticatedUser.id))[0];

  return await getJobApplicationsByKanbanBoardId(kanbanBoard.id);
}
