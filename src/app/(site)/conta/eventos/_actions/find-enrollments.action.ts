import { EnrollmentService } from '@/services/enrollment.service';

export default async function findEnrollmentsAction(userId: string) {
  const service = new EnrollmentService();
  const myEnrollmentsResponse = await service.findEnrollmentsByUserId(userId);

  return { myEnrollments: myEnrollmentsResponse?.docs };
}
