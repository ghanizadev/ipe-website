'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Link from '@/components/link';

export default function GoBackLink() {
  const [path, setPath] = useState('');
  const search = useSearchParams();

  useEffect(() => {
    if (search.has('redirect')) {
      const redirect = search.get('redirect')!;
      if (redirect) {
        try {
          const url = new URL(redirect);
          const ownUrl = new URL(process.env.NEXT_PUBLIC_URL!);

          if (url.hostname === ownUrl.hostname) {
            url.searchParams.set('create', 'success');
            setPath(url.pathname + url.search);
          }
        } catch {}
      }
    }
  }, [search]);

  return (
    <>
      <Link href={'/'}>Ir para a página inicial</Link>
      {path && (
        <>
          <br />
          <Link href={path}>Voltar a página anterior</Link>
        </>
      )}
    </>
  );
}
