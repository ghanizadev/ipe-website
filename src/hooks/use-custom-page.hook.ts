import useSWR from "swr";
import {getPayloadHeaders} from "@/helpers/get-payload-headers.helper";

type CustomPageDTO = any;

async function fetcher(slug: string) {
    const response = await fetch(`/api/pages?${encodeURI('where[slug][equals]=' + slug)}`, {
        headers: {
            ...getPayloadHeaders()
        }
    }).then(response => response.json())
    if (!response.docs?.length) return;
    return response.docs[0];
}

export default function useCustomPage(slug: string) {
    return useSWR<CustomPageDTO>(slug, fetcher);
}