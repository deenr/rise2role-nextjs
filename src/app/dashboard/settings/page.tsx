import { Message } from '@/components/form-message';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileSection } from './profile-section';
import { ResetPasswordForm } from './reset-password-form';
import { ShareForm } from './share-form';

export default async function DashboardSettingsPage({ searchParams: searchParamsPromise }: { searchParams: Promise<{ tab: 'profile' | 'share' | 'reset-password' } & Message> }) {
  const searchParams = await searchParamsPromise;
  const defaultTab = searchParams.tab ?? 'profile';

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
          <ProfileSection searchParams={searchParams} />
        </TabsContent>
        <TabsContent value="share">
          <ShareForm searchParams={searchParams} />
        </TabsContent>
        <TabsContent value="reset-password">
          <ResetPasswordForm searchParams={searchParams} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
