export default function setPublicUploadCacheHeaders({
  headers,
}: {
  headers: Headers;
}) {
  headers.set(
    'Cache-Control',
    'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800'
  );

  return headers;
}
