import { unstable_cache } from 'next/cache';

export const PUBLIC_CONTENT_CACHE_TAG = 'public-content';
export const PUBLIC_CONTENT_CACHE_REVALIDATE_SECONDS = 3600;

export default function cachePublicContent<Args extends unknown[], Result>(
  key: string,
  query: (...args: Args) => Promise<Result>
): (...args: Args) => Promise<Result> {
  return unstable_cache(query, [key], {
    tags: [PUBLIC_CONTENT_CACHE_TAG],
    revalidate: PUBLIC_CONTENT_CACHE_REVALIDATE_SECONDS,
  });
}
