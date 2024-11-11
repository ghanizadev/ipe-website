import { notFound } from 'next/navigation';

import RichText from '@/components/rich-text';
import { H1 } from '@/components/typography';

import getPageBySlug from '@/services/get-page-by-slug.service';

import amendHTML from '@/helpers/amend-html';

type PageProps = {
  params: Promise<Record<string, string>>;
};

export default async function CustomPage({ params }: PageProps) {
  const { categorySlug } = await params;
  const customPage = await getPageBySlug(categorySlug);

  if (!customPage) {
    return notFound();
  }

  return (
    <div className={'pb-16 pt-4'}>
      <H1>{customPage?.title}</H1>
      <RichText html={amendHTML(customPage.html)} />
    </div>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { categorySlug } = await params;
  const customPage = await getPageBySlug(categorySlug);

  return {
    title: `${customPage?.title ?? ''} / IPE - Inclusão Pelo Esporte`,
  };
}
