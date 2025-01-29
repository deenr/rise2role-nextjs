import { getKanbanBoardsByOwnerId } from '@/data-access/kanban-boards';
import { AuthenticationError } from '@/use-cases/errors';
import { User } from '@supabase/supabase-js';

export async function getKanbanBoardUseCase(authenticatedUser: User | null) {
  if (!authenticatedUser) {
    throw new AuthenticationError();
  }

  return (await getKanbanBoardsByOwnerId(authenticatedUser.id))[0]; // index 0 as user is currently limited to one kanban board
}
