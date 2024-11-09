import {APIService} from "@/services/api.service";

export class TestimonialService extends APIService<TestimonialDTO> {
    constructor() {
        super('testimonials');
    }
}