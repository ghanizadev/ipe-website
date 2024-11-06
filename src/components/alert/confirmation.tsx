"use client"

import React, {useEffect, useState} from "react";
import {AlertProps} from "@/components/alert/type";

export default function ConfirmationAlert() {
    const [props, setProps] = useState<AlertProps & { callbackName: string }>();

    const handleInvocation = (event: Event) => {
        event.preventDefault();
        const {detail} = event as CustomEvent;
        setProps(detail);
    }

    const handleAction = (status: 'confirm' | 'deny' | 'dismiss') => {
        return () => {
            if (!props) return;

            const event = new CustomEvent(props.callbackName, {detail: {status}})
            window.dispatchEvent(event)
            setProps(undefined);
        }
    }

    useEffect(() => {
        window.addEventListener('alert.confirmation', handleInvocation);

        return () => {
            window.removeEventListener('alert.confirmation', handleInvocation);
        }
    }, []);

    return (
        <>
            {props &&
                <div id="small-modal" tabIndex={-1}
                     className="fixed inset-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto max-h-full bg-backdrop">
                    <div
                        className="relative w-full max-w-lg max-h-full top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
                        <div className="relative bg-white rounded-lg shadow">
                            <div
                                className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                <h3 className="text-xl font-medium text-gray-900">
                                    {props?.title}
                                </h3>
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                    data-modal-hide="small-modal"
                                    onClick={handleAction('dismiss')}
                                >
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                         fill="none"
                                         viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                              strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-4 md:p-5 space-y-4">
                                {props?.message.split("\n").map((message, i) => (<p key={i}>{message}</p>))}
                            </div>
                            <div
                                className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b">
                                <button data-modal-hide="small-modal" type="button" onClick={handleAction('deny')}
                                        className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Cancelar
                                </button>
                                <button data-modal-hide="small-modal" type="button" onClick={handleAction('confirm')}
                                        className="ms-3 text-white bg-[--primary] hover:bg-[--primary-darker] focus:ring-4 focus:outline-none focus:ring-bg-[--primary-lighter] font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    Aceito
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}