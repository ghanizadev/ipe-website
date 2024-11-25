'use server';

import Image from 'next/image';
import React from 'react';

import { H2 } from '@/components/typography';

import getPartners from '@/services/get-partners.service';

export default async function Partners() {
  const partners = await getPartners();

  const support = (partners?.docs ?? []).filter(
    (partner) => partner.type === 'support'
  );
  const companies = (partners?.docs ?? []).filter(
    (partner) => partner.type === 'company'
  );

  return (
    <section className={'my-16 flex flex-col items-center justify-center px-4'}>
      <H2>Empresas parceiras</H2>
      <div className={'flex flex-col lg:flex-row'}>
        {companies.map((partner) => (
          <div key={partner.id} className={'m-2 w-36 lg:m-4'}>
            <a
              href={partner.link}
              target={'_blank'}
              rel={'noreferrer,noopener'}
            >
              <Image
                src={
                  process.env.NEXT_PUBLIC_CMS_URL +
                  (partner.logo.sizes.md?.url ?? '')
                }
                alt={partner.name + ' logo'}
                width={128}
                height={128}
                className={'m-auto'}
              />
            </a>
          </div>
        ))}
      </div>
      <H2>Apoio</H2>
      <div className={'flex flex-row'}>
        {support.map((partner) => (
          <div key={partner.id} className={'m-2 w-36 lg:m-4'}>
            <a
              href={partner.link}
              target={'_blank'}
              rel={'noreferrer,noopener'}
            >
              <Image
                src={
                  process.env.NEXT_PUBLIC_CMS_URL +
                  (partner.logo.sizes.md?.url ?? '')
                }
                alt={partner.name + ' logo'}
                width={128}
                height={128}
                className={'m-auto'}
              />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
