import Image, { type ImageProps } from 'next/image';

import makeStaticImageUrl from '@/helpers/make-static-image-url.helper';

type UploadedImageFile = {
  url?: string | null;
  width?: number | null;
  height?: number | null;
};

type PayloadImageProps = Omit<ImageProps, 'src' | 'unoptimized'> & {
  image: UploadedImageFile;
  variant?: UploadedImageFile | null;
};

export default function PayloadImage({
  image,
  variant,
  ...props
}: PayloadImageProps) {
  const source = variant?.url ? variant : image;
  const { alt, height, width, ...imageProps } = props;

  return (
    <Image
      {...imageProps}
      alt={alt}
      src={makeStaticImageUrl(source.url)}
      width={width ?? source.width ?? image.width ?? 0}
      height={height ?? source.height ?? image.height ?? 0}
      unoptimized
    />
  );
}
