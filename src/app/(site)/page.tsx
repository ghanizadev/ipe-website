'use server';

import { Metadata } from 'next';

import Events from '@/components/events';
import Hero from '@/components/hero';
import Partners from '@/components/partners';
import Testimonials from '@/components/testimonials';

import getEventsAction from '@/actions/get-events.action';
import getPartnersAction from '@/actions/get-partners.action';
import getTestimonialsAction from '@/actions/get-testimonials.action';

import { DEFAULT_OPENGRAPH, MOTIVATION } from '@/constants/content.constants';

export default async function Home() {
  const testimonials = await getTestimonialsAction();
  const events = await getEventsAction();
  const partners = await getPartnersAction();

  return (
    <div>
      <Hero />
      <Events events={events} />
      <Testimonials testimonials={testimonials} />
      <Partners partners={partners} />
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
