'use server';

import { EnrollmentService } from '@/services/enrollment.service';

export default async function cancelEnrollmentAction({
  enrollmentId,
}: {
  enrollmentId: string;
}) {
  const enrollmentService = new EnrollmentService();
  await enrollmentService.deleteById(enrollmentId);
}
