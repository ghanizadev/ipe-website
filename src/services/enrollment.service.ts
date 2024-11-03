import {APIService} from "@/services/api.service";

export class EnrollmentService extends APIService<EnrollmentDTO> {
    constructor() {
        super('/enrollments');
    }
}