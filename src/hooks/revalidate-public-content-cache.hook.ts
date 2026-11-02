import { revalidateTag } from 'next/cache';

import { PUBLIC_CONTENT_CACHE_TAG } from '@/helpers/cache-public-content.helper';

export default function revalidatePublicContentCache() {
  revalidateTag(PUBLIC_CONTENT_CACHE_TAG, { expire: 0 });
}
