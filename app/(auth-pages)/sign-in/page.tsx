import { signInAction } from '@/app/actions';
import { FormMessage, Message } from '@/components/form-message';
import { Rise2RoleLogo } from '@/components/rise2role-logo';
import { SubmitButton } from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import Link from 'next/link';

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  return (
    <div className="m-auto flex w-full max-w-[420px] flex-col px-4">
      <Rise2RoleLogo className="absolute left-4 top-12 h-6 min-h-6 w-[170px] md:left-8 md:top-8" />
      <div className="mb-8 sm:text-center">
        <h2 className="text-3xl font-semibold">Sign in to your account</h2>
        <p className="mt-2 text-base text-muted-foreground">Welcome back! Please enter your details</p>
      </div>
      <Card className="overflow-hidden">
        <div className="p-6">
          <form className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="group relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:scale-110 group-focus-within:text-primary" />
                  <Input className="pl-9" name="email" placeholder="you@example.com" required />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password">
                    <Button variant="link" className="h-fit p-0 text-xs font-normal text-muted-foreground hover:text-primary">
                      Forgot password?
                    </Button>
                  </Link>
                </div>
                <div className="group relative">
                  <Lock className="absolute left-3 top-1/2 size-4 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:scale-110 group-focus-within:text-primary" />
                  <Input className="pl-9" type="password" name="password" placeholder="••••••••" required />
                </div>
                <FormMessage message={searchParams} />
              </div>
            </div>
            <SubmitButton className="w-full" pendingText="Signing In..." formAction={signInAction}>
              Sign in
              <ArrowRight className="h-4 w-4" />
            </SubmitButton>
          </form>
        </div>
      </Card>
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link href={'/sign-up'}>
            <Button variant="link" className="h-fit p-0 text-primary hover:text-primary/80">
              Sign up
            </Button>
          </Link>
        </p>
      </div>
      <p className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center text-xs text-muted-foreground">
        By continuing, you agree to our{' '}
        <a href="terms" className="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="privacy" className="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </a>
      </p>
    </div>
  );
}
