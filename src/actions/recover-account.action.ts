'use server';

import UserService from '@/services/user.service';

import getUserAction from '@/actions/get-user.action';

export default async function recoverAccount() {
  const user = await getUserAction();

  if (!user) return;
  const userService = new UserService();
  await userService.recoverAccount(user.id);
}
