import { notFound } from 'next/navigation';

import RichText from '@/components/rich-text';
import { H1 } from '@/components/typography';

import getPageBySlug from '@/services/get-page-by-slug.service';

import amendHTML from '@/helpers/amend-html';

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
      <H1>{page?.title}</H1>
      <RichText html={amendHTML(page.html)} />
    </div>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { pageSlug } = await params;
  const customPage = await getPageBySlug(pageSlug);

  return {
    title: `${customPage?.title ?? ''} / IPE - Inclusão Pelo Esporte`,
  };
}
