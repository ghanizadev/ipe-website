export const dynamic = 'force-dynamic';

export function GET() {
  return new Response('OK', {
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}
