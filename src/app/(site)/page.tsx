'use server';

import Events from '@/components/events';
import Hero from '@/components/hero';
import Partners from '@/components/partners';
import Testimonials from '@/components/testimonials';

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
