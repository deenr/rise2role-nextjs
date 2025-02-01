import { Rise2RoleLogo } from '@/components/rise2role-logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AuthCodeErrorPage() {
  return (
    <div className="grid min-h-svh w-full">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href={'/'}>
            <Rise2RoleLogo className="h-6 min-h-6 w-[170px]" />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Authentication Error</h1>
                <p className="text-balance text-sm text-muted-foreground">We encountered an issue with your authentication code.</p>
              </div>
              <div className="grid gap-6">
                <Button asChild className="w-full">
                  <Link href="/sign-in">Try Again</Link>
                </Button>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">Or</span>
                </div>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Need help?{' '}
                <a href="mailto:support@rise2role.com" className="text-primary hover:underline">
                  Contact Support
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
