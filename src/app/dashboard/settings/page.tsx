import { Message } from '@/components/form-message';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Suspense } from 'react';
import { ProfileSection } from './profile/profile-section';
import { ProfileSectionSkeleton } from './profile/profile-section-skeleton';
import { ResetPasswordForm } from './reset-password-form';
import { ShareSection } from './share/share-section';
import { ShareSectionSkeleton } from './share/share-section-skeleton';

export default async function DashboardSettingsPage({ searchParams: searchParamsPromise }: { searchParams: Promise<{ tab: 'profile' | 'share' | 'reset-password' } & Message> }) {
  const params = await searchParamsPromise;
  const defaultTab = params.tab ?? 'profile';

  return (
    <div className="px-4 pb-12 md:px-8">
      <h3 className="text-lg font-semibold text-foreground">Settings</h3>
      <Tabs defaultValue={defaultTab} className="mt-5">
        <TabsList className="flex w-fit flex-row justify-start">
          <TabsTrigger value="profile">My profile</TabsTrigger>
          <TabsTrigger value="share">Share</TabsTrigger>
          <TabsTrigger value="reset-password">Reset password</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Suspense fallback={<ProfileSectionSkeleton />}>
            <ProfileSection searchParams={params} />
          </Suspense>
        </TabsContent>
        <TabsContent value="share">
          <Suspense fallback={<ShareSectionSkeleton />}>
            <ShareSection searchParams={params} />
          </Suspense>
        </TabsContent>
        <TabsContent value="reset-password">
          <ResetPasswordForm searchParams={params} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
