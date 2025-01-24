import { prisma } from '@/lib/prisma';
import { createClient } from '@/utils/supabase/server';
import { User } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const user = await getCurrentUser();

    const categories = await prisma.jobCategory.findMany({
      where: { userId: user.id },
      select: {
        id: true,
        name: true
      },
      orderBy: { order: 'asc' }
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: { message: error.message } }, { status: 500 });
  }
}

async function getCurrentUser(): Promise<User> {
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
