'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DashboardNotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 md:px-8">
      <div className="w-full max-w-xs">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">404 Error</h1>
            <p className="text-balance text-sm text-muted-foreground">Sorry, the page you are looking for doesn't exist or has been moved.</p>
          </div>
          <Button variant="outline" className="w-fit" onClick={() => router.back()}>
            <ArrowLeft /> Go back
          </Button>
        </div>
      </div>
    </div>
  );
}
