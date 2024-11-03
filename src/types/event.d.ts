declare type EventDTO = PayloadDocument & {
    title: string;
    date: string;
    slug: string;
    standFirst: string;
    location: string;
    image: ImageUploadDTO;
    html?: string;
}