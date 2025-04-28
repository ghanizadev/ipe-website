declare type EventDTO = PayloadDocument & {
  title: string;
  date: string;
  slug: string;
  standFirst: string;
  location: string;
  image: ImageUploadDTO;
  content?: LexicalNodes;
  fee?: number;
  dueDate?: string;
  html?: string;
  instructionsHtml?: string;
  instructions?: LexicalNodes;
  modality?: string[];
};
