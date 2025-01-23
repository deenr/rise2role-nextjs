import { signInAction } from '@/app/actions';
import { FormMessage, Message } from '@/components/form-message';
import { SubmitButton } from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import Link from 'next/link';

export default async function Signup(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  if ('message' in searchParams) {
    return (
      <div className="flex h-screen w-full flex-1 items-center justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-full w-full max-w-[420px] flex-col pt-32">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-semibold">Create your account</h2>
        <p className="mt-2 text-base text-muted-foreground">Create your account by entering your details</p>
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
                <Label htmlFor="password">Password</Label>
                <div className="group relative">
                  <Lock className="absolute left-3 top-1/2 size-4 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:scale-110 group-focus-within:text-primary" />
                  <Input className="pl-9" type="password" name="password" minLength={8} placeholder="••••••••" required />
                </div>
                <FormMessage message={searchParams} />
              </div>
            </div>
            <SubmitButton className="w-full" pendingText="Signing up..." formAction={signInAction}>
              Sign up
              <ArrowRight className="h-4 w-4" />
            </SubmitButton>
          </form>
        </div>
      </Card>
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href={'/sign-in'}>
            <Button variant="link" className="h-fit p-0 text-primary hover:text-primary/80">
              Sign in
            </Button>
          </Link>
        </p>
      </div>
      <p className="mt-auto pb-12 text-center text-xs text-muted-foreground">
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
