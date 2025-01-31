import { Message } from '@/components/form-message';
import { Card, CardContent } from '@/components/ui/card';
import { getUserProfile } from '@/data-access/user-profile';
import { getCurrentUser } from '@/lib/session';
import { ProfileForm } from './profile-form';

export async function ProfileSection({ searchParams }: { searchParams: Message }) {
  const user = await getCurrentUser();
  const userProfile = await getUserProfile(user);

  return (
    <section className="mt-8 flex max-w-lg flex-col gap-6">
      <header>
        <h3 className="text-lg font-semibold text-foreground">Your profile</h3>
        <p className="text-base text-muted-foreground">Update your profile and other related information here.</p>
      </header>
      <Card>
        <CardContent className="pt-6">
          <ProfileForm profile={userProfile!} searchParams={searchParams} />
        </CardContent>
      </Card>
    </section>
  );
}
