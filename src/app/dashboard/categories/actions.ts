'use server';

import { prisma } from '@/lib/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
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
    revalidatePath('/dashboard/categories');
    revalidatePath('/dashboard/kanban');
  } catch (error) {
    throw new Error('Failed to update category');
  }
}

export async function createCategory(formData: FormData) {
  const order = formData.get('order') as string;
  const name = formData.get('name') as string;
  const color = formData.get('color') as string;

  if (!order) {
    throw new Error('Missing order');
  }
  if (!name) {
    throw new Error('Name is required');
  }
  if (!color) {
    throw new Error('Color is required');
  }

  try {
    await prisma.jobCategory.create({
      data: { name, hexColor: color, order: Number(order), userId: '01b09396-e264-441b-b4b3-a59d435b8bfe' }
    });
    revalidatePath('/dashboard/categories');
    revalidatePath('/dashboard/kanban');
  } catch (error) {
    throw new Error('Failed to update category');
  }
}

export async function deleteCategory(formData: FormData) {
  const id = formData.get('id') as string;

  try {
    const value = await prisma.jobCategory.delete({
      where: { id }
    });
    console.log(value);
    revalidatePath('/dashboard/categories');
    revalidatePath('/dashboard/kanban');
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2003') {
        throw new Error('Category can only be removed if no jobs are still linked to it.');
      }
    }
    console.error(error);
  }
}

export async function updateCategories(categories: { id: string }[]) {
  try {
    await prisma.$transaction(
      categories.map(({ id }, index) =>
        prisma.jobCategory.update({
          where: { id },
          data: { order: index + 1 }
        })
      )
    );
    revalidatePath('/dashboard/categories');
    revalidatePath('/dashboard/kanban');
  } catch (error) {
    throw new Error('Failed to update categories');
  }
}
