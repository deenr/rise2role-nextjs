'use client';

import { FormMessage, Message } from '@/components/form-message';
import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { userProfile } from '@prisma/client';
import { useState } from 'react';
import { updateProfileAction } from './actions';

export function ProfileForm({ profile, searchParams }: { profile: userProfile; searchParams: Message }) {
  const [firstName, setFirstName] = useState<string>(profile.firstName ?? '');
  const [lastName, setLastName] = useState<string>(profile.lastName ?? '');
  const [role, setRole] = useState<string>(profile.role ?? '');

  return (
    <form className="grid w-full max-w-lg gap-6">
      <input type="hidden" name="id" value={profile.id} />
      <div className="grid grid-cols-2 gap-6">
        <div className="grid gap-2">
          <Label htmlFor="firstName">First name</Label>
          <Input name="firstName" placeholder="Enter your first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lastName">Last name</Label>
          <Input name="lastName" placeholder="Enter your last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="Enter your email here" disabled value={profile.email ?? ''} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="role">Role</Label>
        <Input name="role" placeholder="e.g. Frontend Developer" value={role} onChange={(e) => setRole(e.target.value)} />
      </div>
      <div className="mt-6 flex justify-between gap-6">
        <FormMessage message={searchParams} />
        <SubmitButton className="w-fit" formAction={updateProfileAction}>
          Update profile
        </SubmitButton>
      </div>
    </form>
  );
}
