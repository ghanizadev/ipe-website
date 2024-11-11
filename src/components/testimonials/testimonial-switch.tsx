'use client';

import { useEffect, useState } from 'react';

import TestimonialItem from '@/components/testimonials/testimonial-item';

type TestimonialSwitchProps = {
  testimonials: TestimonialDTO[];
  static?: boolean;
};

let TESTIMONIAL_SWITCH_CAROUSEL: NodeJS.Timeout;

export default function TestimonialSwitch(props: TestimonialSwitchProps) {
  const [current, setCurrent] = useState<TestimonialDTO>(props.testimonials[0]);

  const handleSwitch = (direction: number) => {
    return () => {
      const index = props.testimonials.findIndex((t) => t.id === current?.id);
      const next = index + direction;

      if (next <= props.testimonials.length - 1 && next >= 0) {
        setCurrent(props.testimonials[next]);
      }
    };
  };

  useEffect(() => {
    if (!props.static) {
      if (TESTIMONIAL_SWITCH_CAROUSEL)
        clearTimeout(TESTIMONIAL_SWITCH_CAROUSEL);

      setTimeout(() => {
        const index = props.testimonials.findIndex((t) => t.id === current?.id);
        const next = index + 1;

        if (next <= props.testimonials.length - 1) {
          setCurrent(props.testimonials[next]);
        } else {
          setCurrent(props.testimonials[0]);
        }
      }, 8_000);
    }

    return () => {
      if (TESTIMONIAL_SWITCH_CAROUSEL)
        clearTimeout(TESTIMONIAL_SWITCH_CAROUSEL);
    };
  }, [current, props.static]);

  return (
    <>
      {current && <TestimonialItem {...current} />}
      <div className={'flex flex-row'}>
        <button className={'mx-2 fill-[--primary]'} onClick={handleSwitch(-1)}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 16 16'
          >
            <path
              fillRule='evenodd'
              d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0'
            />
          </svg>
        </button>
        <button className={'mx-2 fill-[--primary]'} onClick={handleSwitch(1)}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 16 16'
          >
            <path
              fillRule='evenodd'
              d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708'
            />
          </svg>
        </button>
      </div>
    </>
  );
}
