declare type EnrollmentDTO = PayloadDocument & {
    user?: UserDTO;
    event?: EventDTO;
    payment?: {
        paid?: boolean;
        paidAt?: string;
    }
}

declare type CreateEnrollmentDTO = EnrollmentDTO & {
    grecaptchaToken: string;
}