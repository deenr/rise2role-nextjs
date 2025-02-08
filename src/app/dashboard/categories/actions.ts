'use server';

import { AuthenticationError } from '@/data-access/errors';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';
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
  const user = await getCurrentUser();

  if (!user) {
    throw new AuthenticationError();
  }

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
      data: { name, hexColor: color, order: Number(order), userId: user.id }
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
    await prisma.jobCategory.delete({
      where: { id }
    });

    revalidatePath('/dashboard/categories');
    revalidatePath('/dashboard/kanban');
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2003') {
        throw new Error('Category can only be removed if no jobs are still linked to it.');
      }
    }
    throw new Error('Failed to delete category');
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
