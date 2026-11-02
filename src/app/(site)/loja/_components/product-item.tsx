import { Media, Product } from '@/payload-types';
import React from 'react';

import PrimaryButton from '@/components/button/primary-button';
import PayloadImage from '@/components/payload-image';
import { H3 } from '@/components/typography';

type ProductItemProps = {
  product: Product;
};

export default function ProductItem({ product }: ProductItemProps) {
  const photos = product.photos as { photo: Media; description: string }[];
  const productLink = product.link ?? '';
  const productPrice = product.price ?? 0;

  return (
    <div className={'my-8 text-center'}>
      <div>
        {photos.map(({ photo, description }) => {
          const photoAltText = photo.altText ?? '';

          return (
            <div key={photo.id}>
              <PayloadImage
                image={photo}
                variant={photo.sizes?.card}
                alt={photoAltText}
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
