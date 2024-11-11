'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

type GalleryProps = {
  photos?: PhotoDTO[];
};

export default function Gallery({ photos: init }: GalleryProps) {
  const [photos] = useState<PhotoDTO[]>(init ?? []);
  const [preview, setPreview] = useState<PhotoDTO | null>();

  const ref = useRef<HTMLElement>(null);

  const units = useMemo(() => {
    const r: PhotoDTO[][] = [[], [], []];
    for (let i = 0; i < photos.length; i++) {
      const p = photos[i];
      const mod = i % 3;
      r[mod].push(p);
    }
    return r;
  }, [photos]);

  const handlePreview = (photo: PhotoDTO) => () => {
    setPreview(photo);
  };

  useEffect(() => {
    function doSomething() {
      if (!ref.current) return;

      const offsetHeight = ref.current.offsetHeight;
      const top = ref.current.getBoundingClientRect().top;
      const offset = 300;
      const shouldUpdate = -top + window.innerHeight > offsetHeight - offset;

      if (shouldUpdate) {
        console.log('update');
      }
    }

    document.addEventListener('scroll', doSomething);
    return () => {
      document.removeEventListener('scroll', doSomething);
    };
  }, [ref]);

  useEffect(() => {
    if (preview) document.body.classList.add('no-scroll');
    else document.body.classList.remove('no-scroll');
  }, [preview]);

  return (
    <>
      <section ref={ref} className={'grid w-full grid-cols-3 gap-1'}>
        {units.map((ps, index) => {
          return (
            <div key={index}>
              {ps.map((photo) => {
                return (
                  <Image
                    key={photo.id}
                    src={photo.url}
                    alt={''}
                    width={photo.width}
                    height={photo.height}
                    className={'mb-1 object-contain'}
                    onClick={handlePreview(photo)}
                  />
                );
              })}
            </div>
          );
        })}
      </section>
      {preview && (
        <>
          <div className={'fixed inset-0 bg-black opacity-90'}></div>
          <div className={'fixed inset-0 z-10 overscroll-contain'}>
            <div
              className={
                'grid h-full max-h-screen grid-cols-1 items-center justify-center p-8'
              }
            >
              <div>
                <Image
                  className={'m-auto h-[75vh] object-contain lg:h-[80vh]'}
                  src={preview.url}
                  alt={''}
                  width={preview.width}
                  height={preview.height}
                />
              </div>
              <div
                className={
                  'lg:text:2xl m-auto h-min text-lg font-bold text-white'
                }
              >
                <p>{preview.description ?? preview.filename}</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setPreview(null)}
            className={'fixed right-4 top-4 z-20 cursor-pointer text-white'}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='32'
              height='32'
              fill='white'
              viewBox='0 0 16 16'
            >
              <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z' />
            </svg>
          </button>
        </>
      )}
    </>
  );
}
