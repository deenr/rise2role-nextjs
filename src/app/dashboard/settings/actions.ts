'use server';

import { prisma } from '@/lib/prisma';
import { createClient } from '@/utils/supabase/server';

interface ActionResult {
  success: boolean;
  error?: string;
  data?: any;
}

export const updateProfileAction = async (formData: FormData): Promise<ActionResult> => {
  const id = formData.get('id') as string;
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const role = formData.get('role') as string;

  if (!firstName || !lastName || !role) {
    return {
      success: false,
      error: 'First name, last name, and role are required'
    };
  }

  try {
    const profile = await prisma.userProfile.update({
      where: { id },
      data: { firstName, lastName, role }
    });
    return {
      success: true,
      data: profile
    };
  } catch (error) {
    console.error('Update profile error:', error);
    return {
      success: false,
      error: 'Failed to update profile'
    };
  }
};

export const updateSharedBoardAction = async (formData: FormData): Promise<ActionResult> => {
  const enabled = formData.get('sharingEnabled') === 'true';
  const urlToken = formData.get('urlToken') as string;
  const kanbanBoardId = formData.get('kanbanBoardId') as string;

  if (!kanbanBoardId) {
    return {
      success: false,
      error: 'Unable to update, try again later'
    };
  }

  if (!urlToken && enabled) {
    return {
      success: false,
      error: 'URL is required when sharing is enabled'
    };
  }

  try {
    const sharedBoard = await prisma.sharedBoardLink.upsert({
      where: { kanbanBoardId },
      update: { enabled, linkToken: urlToken },
      create: { kanbanBoardId, enabled, linkToken: urlToken }
    });
    return {
      success: true,
      data: sharedBoard
    };
  } catch (error) {
    console.error('Update shared board error:', error);
    return {
      success: false,
      error: 'Failed to update the shared board'
    };
  }
};

export const resetPasswordAction = async (formData: FormData): Promise<ActionResult> => {
  const supabase = await createClient();
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (!password || !confirmPassword) {
    return {
      success: false,
      error: 'Password and confirm password are required'
    };
  }

  if (password !== confirmPassword) {
    return {
      success: false,
      error: 'Passwords do not match'
    };
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    console.error('Password update error:', error);
    return {
      success: false,
      error: 'Password update failed'
    };
  }

  return {
    success: true,
    data: 'Password updated successfully'
  };
};
