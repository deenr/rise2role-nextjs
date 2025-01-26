'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateCategory(formData: FormData) {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const color = formData.get('color') as string;

  if (!id || !name || !color) {
    throw new Error('Missing id, name or color');
  }

  try {
    await prisma.jobCategory.update({
      where: { id },
      data: { name, hexColor: color }
    });
    revalidatePath('/categories');
  } catch (error) {
    throw new Error('Failed to update category');
  }
}

export async function createCategory(formData: FormData) {
  const name = formData.get('name') as string;
  const color = formData.get('color') as string;

  if (!name || !color) {
    throw new Error('Missing name or color');
  }

  try {
    await prisma.jobCategory.create({
      data: { name, hexColor: color, order: 0, userId: '01b09396-e264-441b-b4b3-a59d435b8bfe' }
    });
    revalidatePath('/categories');
  } catch (error) {
    throw new Error('Failed to update category');
  }
}
