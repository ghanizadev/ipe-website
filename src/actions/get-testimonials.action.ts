'use server';

import { Testimonial } from '@/payload-types';
import payloadConfig from '@payload-config';
import { getPayload } from 'payload';

import cachePublicContent from '@/helpers/cache-public-content.helper';

const getTestimonials = cachePublicContent(
  'testimonials',
  async (): Promise<Testimonial[]> => {
    const payload = await getPayload({ config: payloadConfig });
    const paginatedResponse = await payload.find({
      collection: 'testimonials',
      limit: 0,
      overrideAccess: true,
    });

    return paginatedResponse.docs;
  }
);

export default async function getTestimonialsAction(): Promise<Testimonial[]> {
  return getTestimonials();
}
