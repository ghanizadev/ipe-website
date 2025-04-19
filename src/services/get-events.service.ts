import { getPayloadHeaders } from '@/helpers/get-payload-headers.helper';

export default async function getEvents(): Promise<PaginatedResponse<EventDTO> | null> {
  const url = `${process.env.CMS_API_URL}/api/events?limit=5&sort=date&where[date][greater_than]=${new Date()}`;
  const init: RequestInit = {
    headers: {
      ...getPayloadHeaders(),
    },
  };

  const response = await fetch(url, init);
  if (!response.ok) return null;
  return response.json();
}
