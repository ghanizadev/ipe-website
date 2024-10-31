export type PayloadDocument = {
    id: string;
    createdAt: string;
    updatedAt: string;
}

export type PaginatedResponse<T> = {
    docs: T[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean | null;
    hasNextPage: boolean | null;
    prevPage: boolean | null;
    nextPage: boolean | null;
}

export type ImageSize = {
    width: number | null;
    height: number | null;
    mimeType: string | null;
    filesize: number | null;
    filename: string | null;
    url: string | null;
}

export type ImageUploadDTO = {
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

export type LogoDTO = ImageUploadDTO & {
    sizes: {
        sm: ImageSize;
        md: ImageSize;
        lg: ImageSize
    }
}

export type CategoryDTO = PayloadDocument & {
    title: string;
    slug: string;
}