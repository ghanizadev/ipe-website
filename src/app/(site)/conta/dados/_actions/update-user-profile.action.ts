'use server';

import UserService from '@/services/user.service';

export default async function updateUserProfileAction(
  formData: Partial<UserDTO> & { id: string }
) {
  const userService = new UserService();
  await userService.updateById(formData.id, formData);
}
