"use client"

import {useEffect, useMemo, useRef, useState} from "react";
import Image from "next/image";


type GalleryProps = {
    photos?: PhotoDTO[];
}

export default function Gallery({photos: init}: GalleryProps) {
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
    }, [photos])

    const handlePreview = (photo: PhotoDTO) => () => {
        setPreview(photo)
    }

    useEffect(() => {
        function doSomething() {
            if (!ref.current) return;

            const offsetHeight = ref.current.offsetHeight;
            const top = ref.current.getBoundingClientRect().top;
            const offset = 300;
            const shouldUpdate = -top + window.innerHeight > offsetHeight - offset;

            if (shouldUpdate) {
                console.log('update')
            }
        }

        document.addEventListener("scroll", doSomething);
        return () => {
            document.removeEventListener("scroll", doSomething);
        }
    }, [ref]);

    useEffect(() => {
        if (preview)
            document.body.classList.add('no-scroll')
        else
            document.body.classList.remove('no-scroll')

    }, [preview]);

    return (
        <>
            <section ref={ref} className={"w-full grid grid-cols-3 gap-1"}>
                {units.map((ps, index) => {
                    return (
                        <div key={index}>
                            {ps.map(photo => {
                                return (
                                    <Image
                                        key={photo.id}
                                        src={photo.url}
                                        alt={''}
                                        width={photo.width}
                                        height={photo.height}
                                        className={"object-contain mb-1"}
                                        onClick={handlePreview(photo)}
                                    />
                                )
                            })}
                        </div>
                    )
                })}
            </section>
            {preview &&
                (<>
                    <div className={"fixed bg-black opacity-90 inset-0"}></div>
                    <div className={"fixed inset-0 z-10 overscroll-contain"}>
                        <div
                            className={"p-8 grid grid-cols-1 items-center justify-center max-h-screen h-full"}>
                            <div>
                                <Image
                                    className={"h-[75vh] m-auto object-contain lg:h-[80vh]"}
                                    src={preview.url}
                                    alt={""}
                                    width={preview.width} height={preview.height}/>
                            </div>
                            <div
                                className={"m-auto text-white text-lg font-bold h-min lg:text:2xl"}>
                                <p>{preview.filename}</p>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setPreview(null)}
                            className={"fixed top-4 right-4 text-white cursor-pointer  z-20"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 16 16">
                            <path
                                d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                    </button>
                </>)
            }
        </>
    )
}