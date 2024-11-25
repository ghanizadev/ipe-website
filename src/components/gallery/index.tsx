'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import getPhotos from '@/services/get-photos.service';

type GalleryProps = {
  photos?: PhotoDTO[];
};

let touchStart = 0;
let touchEnd = 0;

export default function Gallery({ photos: init }: GalleryProps) {
  const [photos, setPhotos] = useState<PhotoDTO[]>(init ?? []);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const [previewIndex, setPreviewIndex] = useState<number>(-1);
  const [columns, setColumns] = useState(0);

  const ref = useRef<HTMLElement>(null);

  const units = useMemo(() => {
    const result: (PhotoDTO & { currentIndex: number })[][] = [];
    for (let currentIndex = 0; currentIndex < photos.length; currentIndex++) {
      const currentPhoto = photos[currentIndex];
      const mod = currentIndex % columns;
      if (!result[mod]) result[mod] = [];
      result[mod].push({ ...currentPhoto, currentIndex });
    }
    return result;
  }, [photos, columns]);

  const currentPreview = useMemo(() => {
    if (previewIndex < 0 || previewIndex >= photos.length) return undefined;
    return photos[previewIndex];
  }, [photos, previewIndex]);

  const changePreview = useCallback(
    (direction: number) => {
      const nextPreview = previewIndex + direction;

      if (nextPreview >= photos.length) return setPreviewIndex(0);
      if (nextPreview < 0) return setPreviewIndex(photos.length - 1);

      return setPreviewIndex(nextPreview);
    },
    [previewIndex, photos]
  );

  const handlePreview = (index: number) => () => {
    setPreviewIndex(index);
  };

  const handleChangePreview = (direction: number) => {
    return () => {
      changePreview(direction);
    };
  };

  const allImagesShowing = () => {
    const images = document.querySelectorAll('[data-image]');
    const viewHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight
    );

    if (!images.length) return true;

    const rect = images[images.length - 1].getBoundingClientRect();
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
  };

  useEffect(() => {
    function doSomething() {
      if (!ref.current || loading || !hasNext) return;

      if (allImagesShowing()) {
        setLoading(true);
        setPage((page) => page + 1);
      }
    }

    doSomething();
    document.addEventListener('scroll', doSomething);
    return () => {
      document.removeEventListener('scroll', doSomething);
    };
  }, [ref, loading, hasNext]);

  useEffect(() => {
    if (previewIndex >= 0) document.body.classList.add('no-scroll');
    else document.body.classList.remove('no-scroll');
  }, [previewIndex]);

  useEffect(() => {
    const handleSwipeDirection = () => {
      const diff = touchEnd - touchStart;

      if (previewIndex < 0 || !diff) return;

      const direction = diff / Math.abs(diff);
      changePreview(direction);
    };

    const touchStartHandler = (event: Event) => {
      const e = event as TouchEvent;
      touchStart = e.changedTouches[0].screenX;
    };

    const touchEndHandler = (event: Event) => {
      const e = event as TouchEvent;
      touchEnd = e.changedTouches[0].screenX;
      handleSwipeDirection();
    };

    document.addEventListener('touchstart', touchStartHandler, false);
    document.addEventListener('touchend', touchEndHandler, false);

    return () => {
      document.removeEventListener('touchstart', touchStartHandler);
      document.removeEventListener('touchend', touchEndHandler);
    };
  }, [changePreview]);

  useEffect(() => {
    const windowResizeHandler = () => {
      if (window.innerWidth >= 768) setColumns(3);
      else setColumns(2);
    };

    window.addEventListener('resize', windowResizeHandler);
    windowResizeHandler();

    return () => {
      window.removeEventListener('resize', windowResizeHandler);
    };
  }, []);

  useEffect(() => {
    if (loading && hasNext)
      getPhotos(page, 3).then((res) => {
        if (!res?.hasNextPage) setHasNext(false);
        if (res?.docs) {
          setPhotos((photos) => [...photos, ...res.docs]);
          setLoading(false);
        }
      });
  }, [loading, page, hasNext]);

  return (
    <>
      <section
        ref={ref}
        className={`grid w-full grid-cols-2 gap-1 md:grid-cols-3`}
      >
        {columns > 0 &&
          units.map((ps, index) => {
            return (
              <div key={index} className={'col-span-1'}>
                {ps.map((photo) => {
                  return (
                    <Image
                      data-image
                      key={photo.id}
                      src={photo.url}
                      alt={photo.altText ?? ''}
                      blurDataURL={photo.url} //TODO check how it works
                      width={photo.width}
                      height={photo.height}
                      className={'mb-1 object-contain'}
                      onClick={handlePreview(photo.currentIndex)}
                    />
                  );
                })}
              </div>
            );
          })}
      </section>
      {currentPreview && (
        <>
          <div className={'fixed inset-0 bg-black opacity-90'}></div>
          <div className={'fixed inset-0 z-10 overscroll-contain'}>
            <div
              className={
                'grid h-full max-h-screen grid-cols-1 items-center justify-center p-8'
              }
            >
              <div className={'relative'}>
                <Image
                  className={'m-auto h-[75vh] object-contain lg:h-[80vh]'}
                  src={currentPreview.url}
                  alt={''}
                  width={currentPreview.width}
                  height={currentPreview.height}
                />
                <button
                  onClick={handleChangePreview(1)}
                  className={
                    'absolute right-0 top-0 p-2 bottom-0 z-20 cursor-pointer text-white hover:text-[--secondary]'
                  }
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='32'
                    height='32'
                    fill='currentColor'
                    viewBox='0 0 16 16'
                  >
                    <path
                      fillRule='evenodd'
                      d='M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671'
                    />
                  </svg>
                </button>
                <button
                  onClick={handleChangePreview(-1)}
                  className={
                    'absolute left-0 top-0 p-2 bottom-0 z-20 cursor-pointer text-white hover:text-[--secondary]'
                  }
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='32'
                    height='32'
                    fill='currentColor'
                    viewBox='0 0 16 16'
                  >
                    <path
                      fillRule='evenodd'
                      d='M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223'
                    />
                  </svg>
                </button>
              </div>
              <div
                className={
                  'lg:text:2xl m-auto h-min text-lg font-bold text-white'
                }
              >
                <p>{currentPreview.description ?? currentPreview.filename}</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setPreviewIndex(-1)}
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
