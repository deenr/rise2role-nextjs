'use client';

import { FormMessage, Message } from '@/components/form-message';
import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { userProfile } from '@prisma/client';
import { useState } from 'react';
import { updateProfileAction } from '../actions';

export function ProfileForm({ profile }: { profile: userProfile }) {
  const [firstName, setFirstName] = useState<string>(profile.firstName ?? '');
  const [lastName, setLastName] = useState<string>(profile.lastName ?? '');
  const [role, setRole] = useState<string>(profile.role ?? '');
  const [message, setMessage] = useState<Message | null>(null);

  async function handleUpdateProfile(formData: FormData) {
    try {
      await updateProfileAction(formData);
    } catch (error: any) {
      setMessage({ error: error.message });
    }
  }

  return (
    <form className="grid w-full max-w-lg gap-6" action={handleUpdateProfile}>
      <input type="hidden" name="id" value={profile.id} />
      <div className="grid gap-6 xs:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="firstName">First name</Label>
          <Input name="firstName" placeholder="Enter your first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lastName">Last name</Label>
          <Input name="lastName" placeholder="Enter your last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="Enter your email here" disabled value={profile.email ?? ''} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="role">Role</Label>
        <Input name="role" placeholder="e.g. Frontend Developer" value={role} onChange={(e) => setRole(e.target.value)} required />
      </div>
      <div className="flex gap-6">
        {message && <FormMessage message={message} />}
        <SubmitButton className="ml-auto w-fit" type="submit">
          Update profile
        </SubmitButton>
      </div>
    </form>
  );
}
