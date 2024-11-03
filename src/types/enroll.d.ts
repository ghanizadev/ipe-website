declare type EnrollmentDTO = PayloadDocument & {
    user?: UserDTO;
    event?: EventDTO;
}
