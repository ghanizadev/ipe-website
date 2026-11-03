const STATIC_IMAGE_ORIGIN = 'https://static.instituto-ipe.org';

export default function makeStaticImageUrl(
  imageUrl: string | null | undefined
) {
  if (!imageUrl) return '';

  const filename = new URL(imageUrl, STATIC_IMAGE_ORIGIN).pathname
    .split('/')
    .pop();

  return filename ? `${STATIC_IMAGE_ORIGIN}/${filename}` : '';
}
