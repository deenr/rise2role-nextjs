import { Message } from '@/components/form-message';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getCurrentUser } from '@/lib/session';
import { getUserProfileUseCase } from '@/use-cases/user-profile';
import { Suspense } from 'react';
import { ProfileForm } from './profile-form';

export async function ProfileSection({ searchParams }: { searchParams: Message }) {
  const user = await getCurrentUser();
  const userProfile = await getUserProfileUseCase(user);

  return (
    <section className="mt-8 flex max-w-lg flex-col gap-6">
      <header>
        <h3 className="text-lg font-semibold text-foreground">Your profile</h3>
        <p className="text-base text-muted-foreground">Update your profile and other related information here.</p>
      </header>
      <Card>
        <CardContent className="pt-6">
          <Suspense fallback={<ProfileFormSkeleton />}>
            <ProfileForm profile={userProfile!} searchParams={searchParams} />
          </Suspense>
        </CardContent>
      </Card>
    </section>
  );
}

function ProfileFormSkeleton() {
  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        <div className="grid gap-2">
          <Skeleton className="h-[14px] w-1/2" />
          <Skeleton className="h-9 w-full" />
        </div>
        <div className="grid gap-2">
          <Skeleton className="h-[14px] w-1/2" />
          <Skeleton className="h-9 w-full" />
        </div>
      </div>
      <div className="grid gap-2">
        <Skeleton className="h-[14px] w-1/4" />
        <Skeleton className="h-9 w-full" />
      </div>
      <div className="grid gap-2">
        <Skeleton className="h-[14px] w-1/4" />
        <Skeleton className="h-9 w-full" />
      </div>
    </>
  );
}
