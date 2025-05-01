import { Photo, Product } from '@/payload-types';
import Image from 'next/image';
import React from 'react';

import PrimaryButton from '@/components/button/primary-button';
import { H3 } from '@/components/typography';

type ProductItemProps = {
  product: Product;
};

export default function ProductItem({ product }: ProductItemProps) {
  const photos = product.photos as { photo: Photo; description: string }[];
  const productLink = product.link ?? '';
  const productPrice = product.price ?? 0;

  return (
    <div className={'my-8 text-center'}>
      <div>
        {photos.map(({ photo, description }) => {
          const photoUrl = photo.url ?? '';
          const photoAltText = photo.altText ?? '';
          const photoWidth = photo.width ?? 0;
          const photoHeight = photo.height ?? 0;

          return (
            <div key={photo.id}>
              <Image
                src={photoUrl}
                alt={photoAltText}
                width={photoWidth}
                height={photoHeight}
              />
              <small>{description}</small>
            </div>
          );
        })}
      </div>
      <H3>{product.name}</H3>
      <p className={'mb-4'}>R$ {productPrice.toFixed(2).replace('.', ',')}</p>
      <PrimaryButton
        tag={'anchor'}
        target={'_blank'}
        rel={'noreferrer,noopener'}
        href={productLink}
      >
        Comprar
      </PrimaryButton>
    </div>
  );
}
