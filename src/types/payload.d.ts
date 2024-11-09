declare type PayloadDocument = {
    id: string;
    createdAt: string;
    updatedAt: string;
}

declare type PaginationDTO = {
    limit?: number;
    order?: string;
    page?: number;
    where?: Record<string, string>;
}

declare type PaginatedResponse<T> = {
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

declare type PayloadError = {
    errors?: { field: string; message: string }[]
}

declare type LoginUserDTO = {
    email: string;
    password: string;
    grecaptchaToken: string;
}

declare type PartialEntityDTO<T> = Partial<Omit<T | Record<keyof T, string>, 'createdAt' | 'updatedAt' | 'id'>>