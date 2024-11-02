import {CategoryDTO, PayloadDocument} from "@/types/payload";

export type PageDTO = PayloadDocument & {
    slug: string;
    title: string;
    category: CategoryDTO;
    content: Record<string, never>;
    shownOnNavbar?: boolean;
    shownOnDrawer?: boolean;
    shownOnFooter?: boolean;
}