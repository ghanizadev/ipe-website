declare type MessageDTO = PayloadDocument & {
    name: string;
    email: string;
    phone?: string;
    message: string;
}