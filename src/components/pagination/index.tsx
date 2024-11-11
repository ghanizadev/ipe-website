"use client"

import {useMemo} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

type PageItem = {
    page: number;
    current: boolean;
}

type PaginationProps = {
    page: number;
    totalPages: number;
    hasNext?: boolean;
    hasPrevious?: boolean;
    onNext?: () => void;
    onPrevious?: () => void;
}

export default function Pagination({page, totalPages, hasPrevious, hasNext}: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathName = usePathname();

    const pages = useMemo(() => {
        if (totalPages === 1) {
            return [{
                page: 1,
                current: true,
            }]
        }

        if (totalPages <= 3) {
            const pages: PageItem[] = [];

            for (let i = 1; i < totalPages + 1; i++) {
                pages.push({
                    page: i,
                    current: page === i,
                });
            }

            return pages;
        }

        if (page === 1) {
            return [
                {
                    page: page,
                    current: true,
                },
                {
                    page: page + 1,
                    current: false,
                },
                {
                    page: page + 2,
                    current: false,
                }
            ]
        }

        return [
            {
                page: page - 1,
                current: false,
            },
            {
                page,
                current: true,
            },
            {
                page: page + 1,
                current: false,
            }
        ]


    }, [page, totalPages]);

    const goToPage = (page: number) => {
        const dest = new URLSearchParams(searchParams);
        dest.set('page', page.toString());
        router.push(pathName + '?' + dest.toString());
    }

    const handleGoToPage = (page: number) => {
        return () => {
            goToPage(page);
        }
    }

    const handleNavigate = (direction: number) => {
        return () => {
            const page = +(searchParams.get('page') ?? '1');
            goToPage(page + direction);
        }
    }

    return (
        <div className={"inline-flex leading-none"}>
            <button type={"button"} className={"w-4 h-4 mx-2"} disabled={!hasPrevious} onClick={handleNavigate(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     viewBox="0 0 16 16">
                    <path fillRule="evenodd"
                          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                </svg>
            </button>
            {pages.map(({page, current}, i) => {
                return (
                    <button key={i} type={"button"} disabled={current}
                            className={`w-4 h-4 mx-2 ${current ? 'text-[--primary]' : ''}`}
                            onClick={handleGoToPage(page)}>
                        {page}
                    </button>
                )
            })}
            <button type={"button"} className={"w-4 h-4 mx-2"} disabled={!hasNext} onClick={handleNavigate(1)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     viewBox="0 0 16 16">
                    <path fillRule="evenodd"
                          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                </svg>
            </button>
        </div>
    )
}