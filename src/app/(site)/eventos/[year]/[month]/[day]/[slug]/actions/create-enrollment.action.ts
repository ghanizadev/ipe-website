"use server"

import {EnrollmentService} from "@/services/enrollment.service";

export default async function createEnrollmentAction(eventId: string, userId: string) {
    const service = new EnrollmentService();
    const response = await service.create({event: eventId, user: userId})
    return !!response
}
