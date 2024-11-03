import {notFound} from "next/navigation";

import getPageBySlug from "@/services/get-page-by-slug.service";
import RichText from "@/components/rich-text";


type PageProps = {
    params: Promise<Record<string, string>>
}

export default async function CustomPage({params}: PageProps) {
    const {categorySlug} = await params;
    const customPage = await getPageBySlug(categorySlug);

    if (!customPage) {
        return notFound();
    }

    return (
        <div className={"pt-4 pb-16"}>
            <h1 className={"text-xl text-[--primary] font-extrabold mb-8 lg:text-4xl"}>{customPage?.title}</h1>
            <RichText html={customPage.html}/>
        </div>
    )
}