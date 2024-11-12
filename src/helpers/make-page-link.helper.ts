export default function makePageLink(page: PageDTO): string {
  let url = '';

  if (page.category?.slug) {
    url += `/${page.category.slug}`;
  }
  
  url += `/${page.slug}`;

  return url;
}
