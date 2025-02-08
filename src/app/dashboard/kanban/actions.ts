'use server';

import { getKanbanBoard } from '@/data-access/kanban-board';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';
import { jobApplicationSchema } from '@/types/job-application';
import { jobApplication } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { revalidatePath } from 'next/cache';

interface ActionResult {
  success: boolean;
  error?: string;
  data?: any;
}

export async function createJobApplication(formData: FormData): Promise<ActionResult> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        error: 'You must be logged in to create job applications'
      };
    }

    const data = {
      categoryId: formData.get('categoryId'),
      jobTitle: formData.get('jobTitle'),
      companyName: formData.get('companyName'),
      companySize: formData.get('companySize'),
      companyIndustry: formData.get('companyIndustry'),
      location: formData.get('location'),
      workModel: formData.get('workModel'),
      skills: (formData.get('skills') as string)?.split(','),
      jobUrl: formData.get('jobUrl')
    };

    const parsedData = jobApplicationSchema.safeParse(data);
    if (!parsedData.success) {
      return {
        success: false,
        error: 'Invalid data provided: ' + parsedData.error.message
      };
    }

    let kanbanBoard = await getKanbanBoard(user);
    if (!kanbanBoard) {
      kanbanBoard = await prisma.kanbanBoard.create({
        data: {
          title: 'Kanban board',
          ownerId: user.id
        }
      });
    }

    const jobApplication = await prisma.jobApplication.create({
      data: {
        categoryId: parsedData.data.categoryId,
        jobTitle: parsedData.data.jobTitle,
        companyName: parsedData.data.companyName,
        companySize: parsedData.data.companySize,
        companyIndustry: parsedData.data.companyIndustry,
        location: parsedData.data.location,
        workModel: parsedData.data.workModel,
        skills: parsedData.data.skills,
        jobUrl: parsedData.data.jobUrl,
        kanbanBoardId: kanbanBoard.id
      }
    });

    revalidatePath('/dashboard/kanban');

    return {
      success: true,
      data: jobApplication
    };
  } catch (error) {
    console.error('Create job application error:', error);
    return {
      success: false,
      error: 'Failed to create job application'
    };
  }
}

export async function updateJobApplication(data: jobApplication): Promise<ActionResult> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        error: 'You must be logged in to update job applications'
      };
    }

    const parsedData = jobApplicationSchema.safeParse(data);
    if (!parsedData.success) {
      return {
        success: false,
        error: 'Invalid data provided: ' + parsedData.error.message
      };
    }

    // Verify ownership
    const existingApplication = await prisma.jobApplication.findFirst({
      where: {
        id: data.id,
        kanbanBoard: {
          ownerId: user.id
        }
      }
    });

    if (!existingApplication) {
      return {
        success: false,
        error: 'Job application not found or you do not have permission to update it'
      };
    }

    const updatedApplication = await prisma.jobApplication.update({
      where: { id: data.id },
      data: {
        categoryId: parsedData.data.categoryId,
        jobTitle: parsedData.data.jobTitle,
        companyName: parsedData.data.companyName,
        companySize: parsedData.data.companySize,
        companyIndustry: parsedData.data.companyIndustry,
        location: parsedData.data.location,
        workModel: parsedData.data.workModel,
        skills: parsedData.data.skills,
        jobUrl: parsedData.data.jobUrl
      }
    });

    revalidatePath('/dashboard/kanban');

    return {
      success: true,
      data: updatedApplication
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return {
          success: false,
          error: 'Job application not found'
        };
      }
    }

    console.error('Update job application error:', error);
    return {
      success: false,
      error: 'Failed to update job application'
    };
  }
}

export async function deleteJobApplication(formData: FormData): Promise<ActionResult> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        error: 'You must be logged in to delete job applications'
      };
    }

    const id = formData.get('id');
    if (!id || typeof id !== 'string') {
      return {
        success: false,
        error: 'Invalid job application ID'
      };
    }

    // Verify ownership
    const existingApplication = await prisma.jobApplication.findFirst({
      where: {
        id,
        kanbanBoard: {
          ownerId: user.id
        }
      }
    });

    if (!existingApplication) {
      return {
        success: false,
        error: 'Job application not found or you do not have permission to delete it'
      };
    }

    await prisma.jobApplication.delete({
      where: { id }
    });

    revalidatePath('/dashboard/kanban', 'page');

    return {
      success: true
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return {
          success: false,
          error: 'Job application not found'
        };
      }
    }

    console.error('Delete job application error:', error);
    return {
      success: false,
      error: 'Failed to delete job application'
    };
  }
}
