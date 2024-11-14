'use server';

import { Metadata } from 'next';

import Events from '@/components/events';
import Hero from '@/components/hero';
import Partners from '@/components/partners';
import Testimonials from '@/components/testimonials';

import { DEFAULT_OPENGRAPH, MOTIVATION } from '@/constants/content.constants';

export default async function Home() {
  return (
    <div>
      <Hero />
      <Events />
      <Testimonials />
      <Partners />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `IPE - Inclusão Pelo Esporte`,
    description: MOTIVATION,
    openGraph: DEFAULT_OPENGRAPH,
  };
}
