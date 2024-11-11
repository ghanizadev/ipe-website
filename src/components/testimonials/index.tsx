'use server';

import TestimonialSwitch from '@/components/testimonials/testimonial-switch';
import { H2 } from '@/components/typography';

import { TestimonialService } from '@/services/testimonial.service';

export default async function Testimonials() {
  const getTestimonials = async (page = 1) => {
    'use server';

    const service = new TestimonialService();
    const response = await service.findAll({ page });
    return response?.docs ?? [];
  };

  const testimonials = await getTestimonials();

  return (
    <section className={'my-16 bg-gray-50 px-4'}>
      <div className={'py-16'}>
        <H2>O quê as pessoas têm a dizer?</H2>
        <div
          className={
            'm-auto flex max-w-2xl flex-col items-center justify-center'
          }
        >
          <TestimonialSwitch testimonials={testimonials} />
        </div>
      </div>
    </section>
  );
}
