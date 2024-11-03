declare type ImageSize = {
    width: number | null;
    height: number | null;
    mimeType: string | null;
    filesize: number | null;
    filename: string | null;
    url: string | null;
}

declare type ImageUploadDTO = {
    id: string;
    filename: string;
    mimeType: string;
    filesize: number;
    width: number;
    height: number;
    url: string;
    createdAt: string;
    updatedAt: string;
}

declare type LogoDTO = ImageUploadDTO & {
    sizes: {
        sm: ImageSize;
        md: ImageSize;
        lg: ImageSize
    }
}