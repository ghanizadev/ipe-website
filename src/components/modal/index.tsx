"use client"

import React from "react";
import {useRouter} from "next/navigation";

type ModalProps = {
    title: string;
    children?: React.ReactNode;
}

export default function Modal({title, children}: ModalProps) {
    const router = useRouter();

    const handleClose = () => {
        router.push(window.location.pathname);
    }

    return (
        <div id="medium-modal" tabIndex={-1}
             className={"fixed inset-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full bg-backdrop"}>
            <div
                className="relative w-full max-w-lg max-h-full top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
                <div
                    className="relative bg-white rounded-lg shadow">
                    <div
                        className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                        <h3 className="text-xl font-medium text-gray-900">
                            {title}
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                            onClick={handleClose}
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                 fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className={"p-4"}>{children}</div>
                </div>
            </div>
        </div>
    )
}