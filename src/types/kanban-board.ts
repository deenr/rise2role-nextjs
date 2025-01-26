import { z } from 'zod';

export const kanbanBoardSchema = z.object({
  title: z.string().min(1, 'Title is required')
});

export type KanbanBoard = z.infer<typeof kanbanBoardSchema>;
