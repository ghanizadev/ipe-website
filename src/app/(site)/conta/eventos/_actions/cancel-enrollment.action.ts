'use server';

export default async function cancelEnrollmentAction({
  enrollmentId,
}: {
  enrollmentId: string;
}) {
  console.log(enrollmentId);
  // const enrollmentService = new EnrollmentService();
  // await enrollmentService.deleteById(enrollmentId);
}
