'use server';

import { createClient } from '@/utils/supabase/server';
import { encodedRedirect } from '@/utils/utils';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const signUpAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get('origin');

  if (!email || !password) {
    return encodedRedirect('error', '/sign-up', 'Email and password are required');
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`
    }
  });

  if (error) {
    return encodedRedirect('error', '/sign-up', error.message);
  } else {
    return encodedRedirect('success', '/sign-up', 'Thanks for signing up! Please check your email for a verification link.');
  }
};

export const signUpWithGoogleAction = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_API_URL}/auth/callback`
    }
  });

  if (error) {
    return encodedRedirect('error', '/sign-up', error.message);
  }

  if (!data) {
    return encodedRedirect('error', '/sign-up', 'Authentication failed');
  }

  if (data.url) {
    return redirect(data.url);
  }

  return encodedRedirect('error', '/sign-up', 'Authentication failed');
};
