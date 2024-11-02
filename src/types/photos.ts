import {PayloadDocument} from "@/types/payload";

export type PhotoDTO = PayloadDocument & {
    tags: string[];
    filename: string;
    mimeType: string;
    filesize: number;
    width: number;
    height: number;
    url: string;
}