'use server';

import UserService from '@/services/user.service';

export default async function removeAccountAction(
  userId: string
): Promise<void> {
  const userService = new UserService();
  await userService.removeAccount(userId);
}
