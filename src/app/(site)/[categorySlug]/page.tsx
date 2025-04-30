import { Category } from '@/payload-types';
import { notFound } from 'next/navigation';

import RichText from '@/components/rich-text';

import getPageByCategorySlugAction from '@/actions/get-page-by-category-slug.action';

import { DEFAULT_OPENGRAPH } from '@/constants/content.constants';

type PageProps = {
  params: Promise<Record<string, string>>;
};

export default async function CustomPage({ params }: PageProps) {
  const { categorySlug } = await params;
  const page = await getPageByCategorySlugAction(categorySlug);
  const category = page?.category as Category;

  if (!page || category?.slug) {
    return notFound();
  }

  return (
    <div className={'pb-16 pt-4'}>
      {page.content && <RichText nodes={page.content as LexicalNodes} />}
    </div>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { categorySlug } = await params;
  const customPage = await getPageByCategorySlugAction(categorySlug);

  return {
    title: `${customPage?.title ?? ''} / IPE - Inclusão Pelo Esporte`,
    openGraph: DEFAULT_OPENGRAPH,
  };
}
