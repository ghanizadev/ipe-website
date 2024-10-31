import {getPayloadHeaders} from "@/helpers/get-payload-headers.helper";
import {CategoryDTO, PaginatedResponse, PayloadDocument} from "@/types/payload";

type PageDTO = PayloadDocument & {
    slug: string;
    title: string;
    category: CategoryDTO;
    content: Record<string, any>;
}

export default async function getPages(): Promise<PaginatedResponse<PageDTO> | null> {
    const url = `${process.env.CMS_API_URL}/api/pages`;
    const init: RequestInit = {
        headers: {
            ...getPayloadHeaders(),
        }
    }
    const response = await fetch(url, init);
    if (!response.ok) return null
    return response.json()
}