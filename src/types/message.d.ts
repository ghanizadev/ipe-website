declare type MessageDTO = PayloadDocument & {
    name: string;
    email: string;
    phone?: string;
    message: string;
}

declare type CreateMessageCTO = MessageDTO & {
    grecaptchaToken: string;
}