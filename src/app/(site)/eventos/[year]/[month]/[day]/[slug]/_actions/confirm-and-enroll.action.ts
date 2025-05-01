'use server';

import { redirect } from 'next/navigation';

export default async function confirmAndEnrollAction({
  eventId,
  userId,
  redirectUrl,
  ...userData
}: Partial<UserDTO> & {
  eventId: string;
  redirectUrl: string;
  userId?: string;
}) {
  if (!userId) {
    return redirect('/entrar?redirect=' + redirectUrl);
  }

  console.log(eventId, userData);
  // const userService = new UserService();
  // await userService.updateById(userId, userData);
  //
  // const enrollmentService = new EnrollmentService();
  // await enrollmentService.create({ event: eventId, user: userId });

  redirect('/conta/eventos');
}
