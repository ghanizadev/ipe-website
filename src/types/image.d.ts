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
    altText?: string;
    createdAt: string;
    updatedAt: string;
}

declare type PhotoDTO = ImageUploadDTO & {
    description?: string;
    tags?: string[];
}

declare type LogoDTO = ImageUploadDTO & {
    sizes: {
        sm: ImageSize;
        md: ImageSize;
        lg: ImageSize
    }
}

declare type AvatarDTO = ImageUploadDTO & {
    sizes: {
        sm: ImageSize;
        md: ImageSize;
        lg: ImageSize
    }
}