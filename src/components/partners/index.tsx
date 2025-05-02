import { Logo, Partner } from '@/payload-types';
import Image from 'next/image';
import React from 'react';

import { H2 } from '@/components/typography';

export default function Partners(props: { partners: Partner[] }) {
  const support = props.partners.filter(
    (partner) => partner.type === 'support'
  );
  const companies = props.partners.filter(
    (partner) => partner.type === 'company'
  );

  return (
    <section className={'my-16 flex flex-col items-center justify-center px-4'}>
      <H2>Empresas parceiras</H2>
      <div className={'flex flex-col lg:flex-row'}>
        {companies.map((partner) => {
          const logo = partner.logo as Logo;
          const logoUrl = logo.url ?? '';

          return (
            <div key={partner.id} className={'m-2 w-36 lg:m-4'}>
              <a
                href={partner.link ?? ''}
                target={'_blank'}
                rel={'noreferrer,noopener'}
              >
                <Image
                  src={logoUrl}
                  alt={partner.name + ' logo'}
                  width={128}
                  height={128}
                  className={'m-auto'}
                />
              </a>
            </div>
          );
        })}
      </div>
      <H2>Apoio</H2>
      <div className={'flex flex-row'}>
        {support.map((partner) => {
          const logo = partner.logo as Logo;
          const logoUrl = logo.url ?? '';

          return (
            <div key={partner.id} className={'m-2 w-36 lg:m-4'}>
              <a
                href={partner.link ?? ''}
                target={'_blank'}
                rel={'noreferrer,noopener'}
              >
                <Image
                  src={logoUrl}
                  alt={partner.name + ' logo'}
                  width={128}
                  height={128}
                  className={'m-auto'}
                />
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
