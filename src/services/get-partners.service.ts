import {getPayloadHeaders} from "@/helpers/get-payload-headers.helper";
import {LogoDTO, PaginatedResponse, PayloadDocument} from "@/types/payload";

type PartnerDTO = PayloadDocument & {
    name: string;
    type: 'company' | 'support';
    link: string;
    logo: LogoDTO;
}

export default async function getPartners(): Promise<PaginatedResponse<PartnerDTO> | null> {
    const url = `${process.env.CMS_API_URL}/api/partners`;
    const init: RequestInit = {
        headers: {
            ...getPayloadHeaders(),
        }
    }
    const response = await fetch(url, init);
    if (!response.ok) return null
    return response.json()
}