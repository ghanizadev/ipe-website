"use client"

import {useEffect, useState} from "react";
import SimpleToast from "./simple";
import {NotificationProps} from "./types";
import {useSearchParams} from "next/navigation";
import {KNOWN_EVENTS} from "@/components/toast/constants";

let timeout: NodeJS.Timeout;

export default function ToastWrapper() {
    const [message, setMessage] = useState<NotificationProps | undefined>();
    const searchParams = useSearchParams();

    const handleClose = () => {
        setMessage(undefined);
    }

    const handleEventShow = (e: Event) => {
        const {detail} = e as CustomEvent;
        handleShowMessage(detail);
    }

    const handleEventHide = () => {
        setMessage(undefined);
    }

    const handleShowMessage = (targetMessage: NotificationProps, duration = 8000) => {
        if (timeout) clearTimeout(timeout);

        setMessage(targetMessage);

        if (duration >= 0) {
            timeout = setTimeout(() => {
                setMessage(undefined);
            }, duration);
        }
    }

    useEffect(() => {
        window.addEventListener('toast.show', handleEventShow);
        window.addEventListener('toast.hide', handleEventHide);

        return () => {
            window.removeEventListener('toast.show', handleEventShow);
            window.removeEventListener('toast.hide', handleEventHide);
        }
    }, []);

    useEffect(() => {
        if (searchParams.has('status')) {
            const status = searchParams.get('status') ?? '';

            const knownEvent = KNOWN_EVENTS[status];
            if (knownEvent) {
                const {duration, ...notification} = knownEvent;
                handleShowMessage(notification, duration);
            }
        }
    }, [searchParams]);

    return (
        <div id={"toast-simple"}
             className={"flex items-center p-4 space-x-4 rtl:space-x-reverse fixed bottom-5 right-5 md:bottom-auto md:right-auto md:top-5 md:left-1/2 md:-translate-x-1/2"}
             role={"alert"}>
            {message &&
                <SimpleToast
                    type={message.type}
                    title={message.title}
                    message={message.message}
                    onClose={handleClose}
                />
            }
        </div>
    )
}