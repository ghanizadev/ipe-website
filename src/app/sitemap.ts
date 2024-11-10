import {MetadataRoute} from "next";
import getPages from "@/services/get-pages.service";
import getEvents from "@/services/get-events.service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const routes: MetadataRoute.Sitemap = [
        {
            url: `${process.env.NEXT_PUBLIC_URL}/contato`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${process.env.NEXT_PUBLIC_URL}/galeria`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${process.env.NEXT_PUBLIC_URL}/loja`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
    ];

    const pages = await getPages();

    for (const page of pages?.docs ?? []) {
        const urls = [process.env.NEXT_PUBLIC_URL];

        if (page.category?.slug) {
            urls.push(page.category.slug);
        }

        urls.push(page.slug);

        routes.push({
            url: urls.join("/").trim(),
            lastModified: new Date(page.updatedAt),
            changeFrequency: 'weekly',
            priority: 1,
        })
    }

    const events = await getEvents();

    for (const event of events?.docs ?? []) {
        const date = new Date(event.createdAt);
        const urls = [
            process.env.NEXT_PUBLIC_URL,
            "eventos",
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate(),
            event.slug,
        ];

        routes.push({
            url: urls.join("/").trim(),
            lastModified: date,
            changeFrequency: 'daily',
            priority: 1,
        })
    }

    return routes;
}