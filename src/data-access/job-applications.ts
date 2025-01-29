import { prisma } from '@/lib/prisma';

export async function getJobApplicationsByCategoryIdAndKanbanBoardId(categoryId: string, kanbanBoardId: string) {
  const applications = await prisma.jobApplication.findMany({ where: { categoryId, kanbanBoardId } });

  return applications;
}
export async function getJobApplicationsByKanbanBoardId(kanbanBoardId: string) {
  const applications = await prisma.jobApplication.findMany({ where: { kanbanBoardId } });

  return applications;
}
