'use server';

import { prisma } from '@/lib/prisma';
import { createClient } from '@/utils/supabase/server';
import { encodedRedirect } from '@/utils/utils';

export const updateProfileAction = async (formData: FormData) => {
  const id = formData.get('id') as string;
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const role = formData.get('role') as string;

  if (!firstName) {
    encodedRedirect('error', '/dashboard/settings?tab=profile', 'First name is required');
  }
  if (!lastName) {
    encodedRedirect('error', '/dashboard/settings?tab=profile', 'Last name is required');
  }
  if (!role) {
    encodedRedirect('error', '/dashboard/settings?tab=profile', 'Role is required');
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
  const enabled = Boolean(formData.get('sharingEnabled'));
  const urlToken = formData.get('urlToken') as string;
  const kanbanBoardId = formData.get('kanbanBoardId') as string;

  if (!urlToken && enabled) {
    encodedRedirect('error', '/dashboard/settings?tab=share', 'URL is required when sharing is enabled');
  }
  if (!kanbanBoardId) {
    encodedRedirect('error', '/dashboard/settings?tab=share', 'Unable to update, try again later');
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
    encodedRedirect('error', '/dashboard/settings?tab=reset-password', 'Password and confirm password are required');
  }

  if (password !== confirmPassword) {
    encodedRedirect('error', '/dashboard/settings?tab=reset-password', 'Passwords do not match');
  }

  const { error } = await supabase.auth.updateUser({
    password: password
  });

  if (error) {
    encodedRedirect('error', '/dashboard?tab=reset-password', 'Password update failed');
  }

  encodedRedirect('success', '/dashboard?tab=reset-password', 'Password updated');
};
