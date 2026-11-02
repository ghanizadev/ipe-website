import { Category } from '@/payload-types';
import { notFound } from 'next/navigation';

import RichText from '@/components/rich-text';

import getPageBySlugAction from '@/actions/get-page-by-slug.action';
import getPagesAction from '@/actions/get-pages.action';

import { DEFAULT_OPENGRAPH } from '@/constants/content.constants';

type PageProps = {
  params: Promise<Record<string, string>>;
};

export async function generateStaticParams() {
  const pages = await getPagesAction();

  return pages.flatMap((page) => {
    const category = page.category as Category;
    if (!category?.slug || !page.slug) return [];

    return [{ categorySlug: category.slug, pageSlug: page.slug }];
  });
}

export default async function CustomPage({ params }: PageProps) {
  const { pageSlug, categorySlug } = await params;
  const page = await getPageBySlugAction(pageSlug);
  const category = page?.category as Category;

  if (!page || category?.slug !== categorySlug) {
    return notFound();
  }

  return (
    <div className={'pb-16 pt-4'}>
      {page.content && <RichText nodes={page.content as LexicalNodes} />}
    </div>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { pageSlug } = await params;
  const customPage = await getPageBySlugAction(pageSlug);

  return {
    title: `${customPage?.title ?? ''} / IPE - Inclusão Pelo Esporte`,
    openGraph: DEFAULT_OPENGRAPH,
  };
}
