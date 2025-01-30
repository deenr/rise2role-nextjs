import { FormMessage, Message } from '@/components/form-message';
import { SubmitButton } from '@/components/submit-button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { resetPasswordAction } from './actions';

export function ResetPasswordForm({ searchParams }: { searchParams: Message }) {
  return (
    <section className="mt-8 flex max-w-lg flex-col gap-6">
      <header>
        <h3 className="text-lg font-semibold text-foreground">Reset password</h3>
        <p className="text-base text-muted-foreground">Please enter your new password below.</p>
      </header>
      <Card>
        <form>
          <CardContent className="grid w-full max-w-lg gap-6 pt-6">
            <div className="grid gap-2">
              <Label htmlFor="password">New password</Label>
              <Input name="password" type="password" placeholder="New password" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input name="confirmPassword" type="password" placeholder="Confirm password" required />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between gap-6">
            <FormMessage message={searchParams} />
            <SubmitButton className="w-fit" formAction={resetPasswordAction}>
              Reset password
            </SubmitButton>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}
