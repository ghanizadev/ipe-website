import { Metadata } from 'next';

import Link from '@/components/link';
import { H1, H2, H3 } from '@/components/typography';

import { DEFAULT_OPENGRAPH } from '@/constants/content.constants';

import createMessageAction from './_actions/create-message.action';
import ContactForm from './_components/contact-form';

export default function ContactPage() {
  return (
    <>
      <H1>Contato</H1>
      <div className={'grid-[repeat(1fr, 2)] grid gap-8 md:grid-cols-2'}>
        <div>
          <H2>Encontre-nos</H2>
          <p>
            Venha conhecer nosso escritório e conhecer de perto nosso projeto,
            ideias e planos para o futuro.
          </p>
          <br />
          <H3>INSTITUTO IPE</H3>
          <p>Rua Nove de Julho, 1224 - Ipiranga</p>
          <p>São José - SC, 88.111-380</p>
          <br />
          <p>Telefones:</p>
          <p>
            (48) 99183-1139 / <small>Paulo Escobar – Presidente</small>
          </p>
          <p>
            (48) 98809-4111 / <small>Paulo Demétrio - Vice-Presidente</small>
          </p>
          <p>
            E-mail:{' '}
            <Link href={'mailto:contato@instituto-ipe.org'}>
              contato@instituto-ipe.org
            </Link>
          </p>
        </div>
        <div>
          <H2>Envie-nos uma mensagem</H2>
          <ContactForm action={createMessageAction} />
        </div>
      </div>
    </>
  );
}

export const metadata: Metadata = {
  title: 'Contato / IPE - Inclusão Pelo Esporte',
  openGraph: DEFAULT_OPENGRAPH,
};
