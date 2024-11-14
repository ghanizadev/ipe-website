import { notFound } from 'next/navigation';

import RichText from '@/components/rich-text';

import getPageBySlug from '@/services/get-page-by-slug.service';

import { DEFAULT_OPENGRAPH } from '@/constants/content.constants';

type PageProps = {
  params: Promise<Record<string, string>>;
};

export default async function CustomPage({ params }: PageProps) {
  const { pageSlug, categorySlug } = await params;
  const page = await getPageBySlug(pageSlug);

  if (!page || page.category?.slug !== categorySlug) {
    return notFound();
  }

  return (
    <div className={'pb-16 pt-4'}>
      {page.content && <RichText nodes={page.content} />}
    </div>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { pageSlug } = await params;
  const customPage = await getPageBySlug(pageSlug);

  return {
    title: `${customPage?.title ?? ''} / IPE - Inclusão Pelo Esporte`,
    openGraph: DEFAULT_OPENGRAPH,
  };
}
