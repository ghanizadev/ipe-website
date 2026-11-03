'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Pagination from '@/components/pagination';

import getProducts from '@/app/(site)/loja/_actions/get-products.action';

import ProductItem from './product-item';

type Products = Awaited<ReturnType<typeof getProducts>>;

type StoreProductsProps = {
  initialProducts: Products;
};

export default function StoreProducts({
  initialProducts,
}: StoreProductsProps) {
  const searchParams = useSearchParams();
  const requestedPage = Math.max(1, Number(searchParams.get('page')) || 1);
  const [products, setProducts] = useState(initialProducts);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (requestedPage === products.page) return;

    let cancelled = false;

    getProducts(requestedPage).then(
      (nextProducts) => {
        if (cancelled) return;
        setProducts(nextProducts);
        setLoadError(false);
      },
      () => {
        if (!cancelled) setLoadError(true);
      }
    );

    return () => {
      cancelled = true;
    };
  }, [products.page, requestedPage]);

  return (
    <>
      {loadError && (
        <p role='alert' className='text-red-700'>
          Não foi possível carregar os produtos.
        </p>
      )}
      <div className='mb-8 grid grid-cols-1 gap-4 md:grid-cols-3'>
        {(products?.docs ?? []).map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      <div className='mb-8 flex w-full justify-center'>
        <Pagination
          page={products?.page ?? 1}
          totalPages={products?.totalPages ?? 1}
          hasPrevious={!!products?.hasPrevPage}
          hasNext={!!products?.hasNextPage}
        />
      </div>
    </>
  );
}
