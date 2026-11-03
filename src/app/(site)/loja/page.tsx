import { Metadata } from 'next';
import { Suspense } from 'react';

import { H1, H2, P } from '@/components/typography';

import { DEFAULT_OPENGRAPH } from '@/constants/content.constants';

import getProducts from '@/app/(site)/loja/_actions/get-products.action';
import StoreProducts from '@/app/(site)/loja/_components/store-products';

export default async function StorePage() {
  const products = await getProducts();

  return (
    <div className={''}>
      <H1>Loja</H1>
      <div className={'my-4'}>
        <H2>Confira nossos produtos</H2>
        <P>
          Comprando nossos produtos você está ajudando os projetos e progamas do
          Instituto.
        </P>
      </div>
      <Suspense fallback={null}>
        <StoreProducts initialProducts={products} />
      </Suspense>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Loja / IPE - Inclusão Pelo Esporte',
    openGraph: DEFAULT_OPENGRAPH,
  };
}
