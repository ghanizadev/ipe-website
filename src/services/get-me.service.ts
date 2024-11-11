export default async function getMe() {
  const response = await fetch(process.env.NEXT_PUBLIC_URL + '/api/users/me');
  if (!response.ok) return;
  return response.json();
}
