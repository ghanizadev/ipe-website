declare type ProductDTO = PayloadDocument & {
  name: string;
  price: number;
  link: string;
  photos: {
    photo: PhotoDTO;
    description: string;
    id: string;
  }[];
};
