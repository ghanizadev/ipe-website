import { MetadataRoute } from 'next';

import getEventsAction from '@/actions/get-events.action';
import getPagesAction from '@/actions/get-pages.action';

import makeEventLink from '@/helpers/make-event-link.helper';
import makePageLink from '@/helpers/make-page-link.helper';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${process.env.NEXT_PUBLIC_URL}/contato`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}/galeria`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}/loja`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    },
  ];

  const pages = await getPagesAction();

  for (const page of pages) {
    routes.push({
      url: `${process.env.NEXT_PUBLIC_URL}${makePageLink(page)}`,
      lastModified: new Date(page.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  }

  const events = await getEventsAction();

  for (const event of events) {
    const date = new Date(event.createdAt);

    routes.push({
      url: `${process.env.NEXT_PUBLIC_URL}${makeEventLink(event)}`,
      lastModified: date,
      changeFrequency: 'daily',
      priority: 1,
    });
  }

  return routes;
}
