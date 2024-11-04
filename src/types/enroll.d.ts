declare type EnrollmentDTO = PayloadDocument & {
    user?: UserDTO;
    event?: EventDTO;
    payment?: {
        paid?: boolean;
        paidAt?: string;
    }
}
