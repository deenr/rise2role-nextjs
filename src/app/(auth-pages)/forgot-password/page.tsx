import { FormMessage, Message } from '@/components/form-message';
import { Rise2RoleLogo } from '@/components/rise2role-logo';
import { SubmitButton } from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { forgotPasswordAction } from './actions';

export default async function ForgotPassword(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  return (
    <div className="grid min-h-svh w-full">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <Rise2RoleLogo className="h-6 min-h-6 w-[170px]" />
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <form className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Reset Password</h1>
                <p className="text-balance text-sm text-muted-foreground">You can reset your password here</p>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="group relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-all group-focus-within:scale-110 group-focus-within:text-primary" />
                    <Input className="pl-9" name="email" placeholder="you@example.com" required />
                  </div>
                  <FormMessage message={searchParams} />
                </div>
                <SubmitButton className="w-full" formAction={forgotPasswordAction}>
                  Reset Password
                </SubmitButton>
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link href={'/sign-in'}>
                  <Button variant="link" className="h-fit p-0 text-primary hover:text-primary/80">
                    Sign in
                  </Button>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
