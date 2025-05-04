import { Testimonial } from '@/payload-types';

import TestimonialSwitch from '@/components/testimonials/testimonial-switch';
import { H2 } from '@/components/typography';

export default function Testimonials(props: { testimonials: Testimonial[] }) {
  return (
    <section className={'my-16 bg-gray-50 px-4'}>
      <div className={'py-16'}>
        <H2>O quê as pessoas têm a dizer?</H2>
        <div
          className={
            'm-auto flex max-w-2xl flex-col items-center justify-center'
          }
        >
          <TestimonialSwitch testimonials={props.testimonials} />
        </div>
      </div>
    </section>
  );
}
