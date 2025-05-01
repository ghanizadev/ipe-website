import { Category, Page } from '@/payload-types';

export default function makePageLink(page: Page): string {
  let url = '';

  const category = page.category as Category;

  if (category.slug) {
    url += `/${category.slug}`;
  }

  url += `/${page.slug}`;

  return url;
}
