import { prisma } from '@/lib/prisma';
import { User } from '@supabase/supabase-js';
import { unstable_cache } from 'next/cache';
import { cache } from 'react';
import { AuthenticationError } from './errors';

export const getJobApplicationsByCategory = cache(async (categoryId: string) => {
  const applications = await prisma.jobApplication.findMany({
    where: { categoryId }
  });
  return applications;
});

export const getJobApplicationsByKanbanBoard = cache(async (kanbanBoardId: string) => {
  const applications = await prisma.jobApplication.findMany({
    where: { kanbanBoardId }
  });
  return applications;
});

export const getJobApplicationsBySharedBoard = cache(async (sharedBoard: string) => {
  const jobApplicationsWithCategories = await prisma.jobApplication.findMany({
    where: { kanbanBoard: { sharedLink: { linkToken: sharedBoard } } }
  });
  return jobApplicationsWithCategories;
});

export const getJobApplications = cache(async (authenticatedUser: User | null) => {
  if (!authenticatedUser) {
    throw new AuthenticationError();
  }

  return unstable_cache(
    async () => {
      const applications = await prisma.jobApplication.findMany({
        where: { kanbanBoard: { ownerId: authenticatedUser.id } },
        include: {
          category: true // Include category data to avoid separate queries
        }
      });
      return applications;
    },
    [`user-${authenticatedUser.id}-applications`],
    {
      revalidate: 60,
      tags: [`user-${authenticatedUser.id}-applications`]
    }
  )();
});
