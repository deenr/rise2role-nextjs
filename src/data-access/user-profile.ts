import { prisma } from '@/lib/prisma';

export async function getUserProfileById(id: string) {
  const userProfile = await prisma.userProfile.findFirst({ where: { id } });

  return userProfile;
}
