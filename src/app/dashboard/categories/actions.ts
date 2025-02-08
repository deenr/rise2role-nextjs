'use server';

import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { revalidatePath } from 'next/cache';

interface ActionResult {
  success: boolean;
  error?: string;
  data?: any;
}

export async function updateCategory(formData: FormData): Promise<ActionResult> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        error: 'You must be logged in to update categories'
      };
    }

    const id = formData.get('id');
    const name = formData.get('name');
    const color = formData.get('color');

    if (!id || !name || !color) {
      return {
        success: false,
        error: 'Missing required fields'
      };
    }

    const category = await prisma.jobCategory.update({
      where: {
        id: id.toString(),
        userId: user.id
      },
      data: {
        name: name.toString(),
        hexColor: color.toString()
      }
    });

    revalidatePath('/dashboard/categories');
    revalidatePath('/dashboard/kanban');

    return {
      success: true,
      data: category
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return {
          success: false,
          error: 'Category not found or you do not have permission to update it'
        };
      }
    }

    console.error('Update category error:', error);
    return {
      success: false,
      error: 'Failed to update category'
    };
  }
}

export async function createCategory(formData: FormData): Promise<ActionResult> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        error: 'You must be logged in to create categories'
      };
    }

    const order = formData.get('order');
    const name = formData.get('name');
    const color = formData.get('color');

    if (!order || !name || !color) {
      return {
        success: false,
        error: 'Missing required fields'
      };
    }

    const category = await prisma.jobCategory.create({
      data: {
        name: name.toString(),
        hexColor: color.toString(),
        order: Number(order),
        userId: user.id
      }
    });

    revalidatePath('/dashboard/categories');
    revalidatePath('/dashboard/kanban');

    return {
      success: true,
      data: category
    };
  } catch (error) {
    console.error('Create category error:', error);
    return {
      success: false,
      error: 'Failed to create category'
    };
  }
}

export async function deleteCategory(formData: FormData): Promise<ActionResult> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        error: 'You must be logged in to delete categories'
      };
    }

    const id = formData.get('id');
    if (!id) {
      return {
        success: false,
        error: 'Category ID is required'
      };
    }

    await prisma.jobCategory.delete({
      where: {
        id: id.toString(),
        userId: user.id
      }
    });

    revalidatePath('/dashboard/categories');
    revalidatePath('/dashboard/kanban');

    return {
      success: true
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2003') {
        return {
          success: false,
          error: 'Cannot delete category that has jobs. Please move or delete the jobs first.'
        };
      }
      if (error.code === 'P2025') {
        return {
          success: false,
          error: 'Category not found or you do not have permission to delete it'
        };
      }
    }

    console.error('Delete category error:', error);
    return {
      success: false,
      error: 'Failed to delete category'
    };
  }
}

export async function updateCategories(categories: { id: string }[]): Promise<ActionResult> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        error: 'You must be logged in to update categories'
      };
    }

    if (!Array.isArray(categories)) {
      return {
        success: false,
        error: 'Invalid categories data'
      };
    }

    await prisma.$transaction(
      categories.map(({ id }, index) =>
        prisma.jobCategory.update({
          where: {
            id,
            userId: user.id
          },
          data: {
            order: index + 1
          }
        })
      )
    );

    revalidatePath('/dashboard/categories');
    revalidatePath('/dashboard/kanban');

    return {
      success: true
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return {
          success: false,
          error: 'One or more categories not found or you do not have permission'
        };
      }
    }

    console.error('Update categories error:', error);
    return {
      success: false,
      error: 'Failed to update categories order'
    };
  }
}
