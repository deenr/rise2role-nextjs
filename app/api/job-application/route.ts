import { prisma } from '@/lib/prisma';
import { createClient } from '@/utils/supabase/server';
import { User } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(req: Request) {
  try {
    const user = await getCurrentUserId();

    const kanbanBoard = await prisma.kanbanBoard.findFirst({ where: { ownerId: user.id } });

    if (!kanbanBoard) {
      return NextResponse.json({ error: { message: 'No Kanban board found for your profile.' } }, { status: 404 });
    }

    const schema = z.object({
      categoryId: z.string().uuid().nullable(),
      jobTitle: z.string().min(1, 'Job title is required'),
      companyName: z.string().min(1, 'Company name is required'),
      companySize: z.string().nullable(),
      companyIndustry: z.string().nullable(),
      location: z.string().nullable(),
      workModel: z.string().nullable(),
      skills: z.array(z.string()).default([]),
      jobUrl: z.string().url('Invalid URL format')
    });

    const response = schema.safeParse(req.body);

    if (!response.success) {
      const { errors } = response.error;

      return NextResponse.json({ error: { message: 'Invalid request', errors } }, { status: 400 });
    }

    const { categoryId, jobTitle, companyName, companySize, companyIndustry, location, workModel, skills, jobUrl } = response.data;

    const newJobApplication = await prisma.jobApplication.create({
      data: {
        jobTitle: jobTitle,
        companyName: companyName,
        companySize: companySize,
        companyIndustry: companyIndustry,
        location: location,
        workModel: workModel,
        skills: skills,
        jobUrl: jobUrl,
        categoryId: categoryId,
        kanbanBoardId: kanbanBoard.id
      }
    });

    return NextResponse.json(newJobApplication, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: { message: error.message } }, { status: 500 });
  }
}

async function getCurrentUserId(): Promise<User> {
  const supabase = await createClient();

  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('Unauthorized');
  }

  return user;
}
