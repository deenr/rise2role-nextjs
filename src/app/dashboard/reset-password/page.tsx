import { FormMessage, Message } from '@/components/form-message';
import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { resetPasswordAction } from './actions';

export default async function ResetPasswordPage(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  return (
    <div className="px-4 pb-12 md:px-8">
      <header>
        <h3 className="text-lg font-semibold text-foreground">Reset password</h3>
        <p className="text-base text-muted-foreground">Please enter your new password below.</p>
      </header>
      <form className="mt-8 grid w-full max-w-lg gap-6">
        <div className="grid gap-2">
          <Label htmlFor="password">New password</Label>
          <Input name="password" placeholder="New password" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">New password</Label>
          <Input name="confirmPassword" placeholder="New password" required />
          <FormMessage message={searchParams} />
        </div>
        <SubmitButton formAction={resetPasswordAction}>Reset password</SubmitButton>
      </form>
    </div>
  );
}
