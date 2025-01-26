'use server';

import { prisma } from '@/lib/prisma';
import { jobApplicationSchema } from '@/types/job-application';
import { revalidatePath } from 'next/cache';

export async function createJobApplication(formData: FormData) {
  const categoryId = formData.get('categoryId') as string;
  const jobTitle = formData.get('jobTitle') as string;
  const companyName = formData.get('companyName') as string;
  const companySize = formData.get('companySize') as string;
  const companyIndustry = formData.get('companyIndustry') as string;
  const location = formData.get('location') as string;
  const workModel = formData.get('workModel') as string;
  const skills = (formData.get('skills') as string).split(',');
  const jobUrl = formData.get('jobUrl') as string;

  const parsedData = jobApplicationSchema.safeParse({
    categoryId,
    jobTitle,
    companyName,
    companySize,
    companyIndustry,
    location,
    workModel,
    skills,
    jobUrl
  });

  if (!parsedData.success) {
    throw new Error('Invalid data provided: ' + parsedData.error.message);
  }

  try {
    await prisma.jobApplication.create({
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
        kanbanBoardId: '3fdb76a7-aba6-4ab9-b920-82bd77f26a8a'
      }
    });

    revalidatePath('/kanban');
  } catch (error) {
    throw new Error('Failed to create job application');
  }
}
