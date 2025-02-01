'use server';

import { createClient } from '@/utils/supabase/server';
import { encodedRedirect } from '@/utils/utils';
import { redirect } from 'next/navigation';

export const signInAction = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return encodedRedirect('error', '/sign-in', error.message);
  }

  return redirect('/dashboard/kanban');
};

export const signInWithGoogleAction = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_API_URL}/auth/callback`
    }
  });

  if (error) {
    console.error('Google sign-in error:', error);
    return encodedRedirect('error', '/sign-in', error.message);
  }

  if (!data) {
    console.error('Google sign-in failed: No data returned');
    return encodedRedirect('error', '/sign-in', 'Authentication failed');
  }

  if (data.url) {
    return redirect(data.url);
  }

  return encodedRedirect('error', '/sign-in', 'Authentication failed');
};
