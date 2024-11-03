"use server"

import {EnrollmentService} from "@/services/enrollment.service";

export default async function createEnrollmentAction(eventId: string, userId: string) {
    const service = new EnrollmentService();
    await service.create({event: eventId, user: userId})
}
