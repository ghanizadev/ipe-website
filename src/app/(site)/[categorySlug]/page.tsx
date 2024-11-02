import {notFound} from "next/navigation";

import getPageBySlug from "@/services/get-page-by-slug.service";

export default async function CustomPage({params}: any) {
    const {categorySlug} = await params;
    const customPage = await getPageBySlug(categorySlug);

    if (!customPage) {
        return notFound();
    }

    return (
        <div>
            <h1>{customPage?.title}</h1>
        </div>
    )
}