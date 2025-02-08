'use client';

import { FormMessage, Message } from '@/components/form-message';
import { SubmitButton } from '@/components/submit-button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { toast } from 'sonner';
import { resetPasswordAction } from './actions';

export function ResetPasswordForm() {
  const [message, setMessage] = useState<Message | null>(null);

  async function handleResetPassword(formData: FormData) {
    const result = await resetPasswordAction(formData);

    if (result.success) {
      toast.success('Your password has been changed succesfully');
    } else {
      setMessage({ error: result.error ?? 'Failed to update your password' });
      toast.error(result.error ?? 'Failed to update your password');
    }
  }

  return (
    <section className="mt-8 flex max-w-lg flex-col gap-6">
      <header>
        <h3 className="text-lg font-semibold text-foreground">Reset password</h3>
        <p className="text-base text-muted-foreground">Please enter your new password below.</p>
      </header>
      <Card>
        <form className="grid w-full max-w-lg gap-6" action={handleResetPassword}>
          <CardContent className="grid w-full max-w-lg gap-6 pb-0 pt-6">
            <div className="grid gap-2">
              <Label htmlFor="password">New password</Label>
              <Input name="password" type="password" placeholder="New password" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input name="confirmPassword" type="password" placeholder="Confirm password" required />
            </div>
          </CardContent>
          <CardFooter className="flex gap-6">
            {message && <FormMessage message={message} />}
            <SubmitButton className="ml-auto w-fit" type="submit">
              Reset password
            </SubmitButton>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}
