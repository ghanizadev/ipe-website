'use server';

export default async function createEnrollmentAction(
  eventId: string,
  userId: string
) {
  // const service = new EnrollmentService();
  // const response = await service.create({ event: eventId, user: userId });
  // return !!response;
  console.log(eventId, userId);
  return true;
}
