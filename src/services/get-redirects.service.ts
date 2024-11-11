export default async function getRedirectsService(): Promise<PaginatedResponse<RedirectsDTO> | null> {
  const url = `${process.env.CMS_API_URL}/api/redirects`;
  const init: RequestInit = {
    headers: {
      Authorization: 'services API-Key ' + process.env.CMS_API_KEY,
    },
  };

  const response = await fetch(url, init);
  if (!response.ok) return null;
  return (await response.json()) as PaginatedResponse<RedirectsDTO>;
}
