import { notFound } from 'next/navigation';

import RichText from '@/components/rich-text';

import getPageBySlug from '@/services/get-page-by-slug.service';

type PageProps = {
  params: Promise<Record<string, string>>;
};

export default async function CustomPage({ params }: PageProps) {
  const { categorySlug } = await params;
  const page = await getPageBySlug(categorySlug);

  if (!page || page.category?.slug) {
    return notFound();
  }

  return (
    <div className={'pb-16 pt-4'}>
      {page.content && <RichText nodes={page.content} />}
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
