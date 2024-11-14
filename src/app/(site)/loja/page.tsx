import { Metadata } from 'next';
import { Suspense } from 'react';

import Pagination from '@/components/pagination';
import { H1, H2, P } from '@/components/typography';

import { DEFAULT_OPENGRAPH } from '@/constants/content.constants';

import getProducts from '@/app/(site)/loja/_actions/get-products.action';
import ProductItem from '@/app/(site)/loja/_components/product-item';

export default async function StorePage(props: {
  searchParams: Promise<Record<string, string>>;
}) {
  const searchParams = await props.searchParams;
  const products = await getProducts(+(searchParams.page ?? '1'));

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
      <div className={'mb-8 grid grid-cols-1 gap-4 md:grid-cols-3'}>
        {(products?.docs ?? []).map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      <div className={'mb-8 flex w-full justify-center'}>
        <Suspense>
          <Pagination
            page={products?.page ?? 1}
            totalPages={products?.totalPages ?? 1}
            hasPrevious={!!products?.hasPrevPage}
            hasNext={!!products?.hasNextPage}
          />
        </Suspense>
      </div>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Loja / IPE - Inclusão Pelo Esporte',
    openGraph: DEFAULT_OPENGRAPH,
  };
}
