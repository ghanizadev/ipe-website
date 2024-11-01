import {getPayloadHeaders} from "@/helpers/get-payload-headers.helper";
import {PaginatedResponse} from "@/types/payload";
import {EventDTO} from "@/types/event";

export default async function getEventBySlug(slug: string): Promise<EventDTO | null> {
    const url = `${process.env.CMS_API_URL}/api/events?where[slug][equals]=${slug}`;
    const init: RequestInit = {
        headers: {
            ...getPayloadHeaders()
        }
    }

    const response = await fetch(url, init);
    if (!response.ok) return null;

    const paginatedResponse: PaginatedResponse<EventDTO> = await response.json()
    if (!paginatedResponse.docs.length)
        return null
    
    return paginatedResponse.docs[0];
}