import {getPayloadHeaders} from "@/helpers/get-payload-headers.helper";
import {PaginatedResponse} from "@/types/payload";
import {PageDTO} from "@/types/page";

export default async function getPageBySlug(slug: string): Promise<PageDTO | null> {
    const url = `${process.env.CMS_API_URL}/api/pages?where[slug][equals]=${slug}`;
    const init: RequestInit = {
        headers: {
            ...getPayloadHeaders()
        }
    }

    const response = await fetch(url, init);
    if (!response.ok) return null;

    const paginatedResponse: PaginatedResponse<PageDTO> = await response.json()
    if (!paginatedResponse.docs.length)
        return null

    return paginatedResponse.docs[0];
}