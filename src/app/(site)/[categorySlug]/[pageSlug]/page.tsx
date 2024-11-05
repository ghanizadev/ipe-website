import {notFound} from "next/navigation";

import getPageBySlug from "@/services/get-page-by-slug.service";
import RichText from "@/components/rich-text";
import {H1} from "@/components/typography";


type PageProps = {
    params: Promise<Record<string, string>>
}

export default async function CustomPage({params}: PageProps) {
    const {pageSlug} = await params;
    const customPage = await getPageBySlug(pageSlug);

    if (!customPage) {
        return notFound();
    }

    return (
        <div className={"pt-4 pb-16"}>
            <H1>{customPage?.title}</H1>
            <RichText html={customPage.html}/>
        </div>
    )
}

export async function generateMetadata({params}: PageProps) {
    const {pageSlug} = await params;
    const customPage = await getPageBySlug(pageSlug);

    return {
        title: `${customPage?.title ?? ''} / IPE - Inclusão Pelo Esporte`,
    }
}