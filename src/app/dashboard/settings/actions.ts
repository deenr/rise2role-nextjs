'use server';

import { prisma } from '@/lib/prisma';
import { createClient } from '@/utils/supabase/server';

export const updateProfileAction = async (formData: FormData) => {
  const id = formData.get('id') as string;
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const role = formData.get('role') as string;

  if (!firstName) {
    throw new Error('First name is required');
  }
  if (!lastName) {
    throw new Error('Last name is required');
  }
  if (!role) {
    throw new Error('Role is required');
  }

  try {
    await prisma.userProfile.update({
      where: { id },
      data: { firstName, lastName, role }
    });
  } catch (error) {
    throw new Error('Failed to profile');
  }
};

export const updateSharedBoardAction = async (formData: FormData) => {
  const enabled = formData.get('sharingEnabled') === 'true';
  const urlToken = formData.get('urlToken') as string;
  const kanbanBoardId = formData.get('kanbanBoardId') as string;

  if (!urlToken && enabled) {
    throw new Error('URL is required when sharing is enabled');
  }
  if (!kanbanBoardId) {
    throw new Error('Unable to update, try again later');
  }

  try {
    await prisma.sharedBoardLink.upsert({
      where: { kanbanBoardId },
      update: {
        enabled,
        linkToken: urlToken
      },
      create: {
        kanbanBoardId,
        enabled,
        linkToken: urlToken
      }
    });
    console.log('update complete');
  } catch (error) {
    console.log(error);
    throw new Error('Failed to update the shared board');
  }
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (!password || !confirmPassword) {
    throw new Error('Password and confirm password are required');
  }

  if (password !== confirmPassword) {
    throw new Error('Passwords do not match');
  }

  const { error } = await supabase.auth.updateUser({
    password: password
  });

  if (error) {
    throw new Error('Password update failed');
  }

  return 'Password updated successfully';
};
