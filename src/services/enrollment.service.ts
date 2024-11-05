import {APIService} from "@/services/api.service";
import {getPayloadHeaders} from "@/helpers/get-payload-headers.helper";

export class EnrollmentService extends APIService<EnrollmentDTO> {
    constructor() {
        super('enrollments');
    }

    public async findEnrollmentsByUserId(userId: string): Promise<PaginatedResponse<EnrollmentDTO> | null> {
        const init: RequestInit = {
            method: "GET",
            headers: {
                ...getPayloadHeaders(),
            },
        };

        const queryString = this.makeQueryString({}, {where: {user: {equals: userId}}});

        const response = await fetch(`${this.baseUrl}${queryString}`, init);
        if (!response.ok) return null;

        return await response.json();
    }
}