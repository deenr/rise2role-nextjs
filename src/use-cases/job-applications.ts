import { getJobApplicationsByCategoryIdAndKanbanBoardId } from '@/data-access/job-applications';
import { AuthenticationError } from '@/use-cases/errors';
import { User } from '@supabase/supabase-js';

export async function getJobApplicationsByKanbanBoardIdUseCase(authenticatedUser: User | null, categoryId: string, kanbanBoardId: string) {
  if (!authenticatedUser) {
    throw new AuthenticationError();
  }

  return await getJobApplicationsByCategoryIdAndKanbanBoardId(categoryId, kanbanBoardId);
}
