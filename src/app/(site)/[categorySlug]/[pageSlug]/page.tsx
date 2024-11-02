import {notFound} from "next/navigation";

import getPageBySlug from "@/services/get-page-by-slug.service";

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
        <div>
            <h1>{customPage?.title}</h1>
        </div>
    )
}