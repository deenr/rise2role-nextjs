import { getUserProfile } from '@/data-access/user-profile';
import { getCurrentUser } from '@/lib/session';

export async function NavUserProperty({ property }: { property: 'initials' | 'name' | 'email' }) {
  const user = await getCurrentUser();
  const userProfile = await getUserProfile(user);
  if (!userProfile) {
    return null;
  }

  switch (property) {
    case 'initials':
      if (!userProfile.firstName && !userProfile.lastName) {
        return userProfile.email.slice(0, 2).toUpperCase();
      }

      if (userProfile.firstName && !userProfile.lastName) {
        return userProfile.firstName.slice(0, 2).toUpperCase();
      }

      if (!userProfile.firstName && userProfile.lastName) {
        return userProfile.lastName.slice(0, 2).toUpperCase();
      }

      return `${userProfile.firstName?.[0] ?? ''}${userProfile.lastName?.[0] ?? ''}`.toUpperCase();
    case 'name':
      if (!userProfile.firstName && !userProfile.lastName) {
        return null;
      }

      if (userProfile.firstName && !userProfile.lastName) {
        return userProfile.firstName;
      }

      if (!userProfile.firstName && userProfile.lastName) {
        return userProfile.lastName;
      }
      return `${userProfile.firstName} ${userProfile.lastName}`;
    case 'email':
      return userProfile.email;
    default:
      return null;
  }
}
