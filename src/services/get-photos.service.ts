'use server';

import { getPayloadHeaders } from '@/helpers/get-payload-headers.helper';

export default async function getPhotos(
  page: number,
  limit = 15
): Promise<PaginatedResponse<PhotoDTO> | null> {
  const url = `${process.env.CMS_API_URL}/api/photos?page=${page ?? 1}&limit=${limit}`;
  const init: RequestInit = {
    headers: {
      ...getPayloadHeaders(),
    },
  };

  const response = await fetch(url, init);
  if (!response.ok) return null;
  return (await response.json()) as PaginatedResponse<PhotoDTO>;
}
