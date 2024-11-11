declare type EventDTO = PayloadDocument & {
  title: string;
  date: string;
  slug: string;
  standFirst: string;
  location: string;
  image: ImageUploadDTO;
  fee?: number;
  dueDate?: string;
  html?: string;
  instructionsHtml?: string;
};
