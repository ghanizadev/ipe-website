import Image from 'next/image';

type TestimonialSwitchProps = TestimonialDTO;

export default function TestimonialItem(props: TestimonialSwitchProps) {
  const { avatar, occupation, testimonial, name } = props;

  return (
    <>
      {avatar && (
        <Image
          src={process.env.NEXT_PUBLIC_CMS_URL + avatar.sizes.sm.url!}
          alt={'testimonial'}
          width={avatar.sizes.sm.width!}
          height={avatar.sizes.sm.height!}
          className={'mb-4 h-16 w-16 rounded-[50%]'}
        />
      )}
      <span className={'text-xl font-bold text-[--primary]'}>{name}</span>
      <span className={'text-md text-gray-600'}>{occupation}</span>
      <blockquote
        className={
          'mb-6 text-justify text-base font-semibold italic text-gray-600'
        }
      >
        <svg
          className='mb-4 h-8 w-8 fill-[--primary] text-[--primary]'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 18 14'
        >
          <path d='M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z' />
        </svg>
        <p>{testimonial}</p>
      </blockquote>
    </>
  );
}
