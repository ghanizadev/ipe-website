import { Metadata } from 'next';

import Gallery from '@/components/gallery';

import getPhotosAction from '@/actions/get-photos.action';

import { DEFAULT_OPENGRAPH } from '@/constants/content.constants';

export default async function GalleryPage() {
  const { docs: photos, hasNextPage } = await getPhotosAction(1);

  return (
    <div>
      <Gallery photos={photos} hasNextPage={hasNextPage} />
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Galeria de Fotos / IPE - Inclusão Pelo Esporte',
  openGraph: DEFAULT_OPENGRAPH,
};
