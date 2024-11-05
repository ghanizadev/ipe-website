"use client"

import {useEffect, useState} from "react";
import SimpleToast from "./simple";
import {NotificationProps} from "./types";

let timeout: NodeJS.Timeout;

export default function ToastWrapper() {
    const [message, setMessage] = useState<NotificationProps | undefined>();

    const handleClose = () => {
        setMessage(undefined);
    }

    useEffect(() => {
        window.addEventListener('toast.show', (e: Event) => {
            const {detail} = e as CustomEvent;

            if (timeout) clearTimeout(timeout);

            setMessage(detail);

            timeout = setTimeout(() => {
                setMessage(undefined);
            }, 3000);
        })
    }, []);
    return (
        <div id="toast-simple"
             className="flex items-center p-4 space-x-4 rtl:space-x-reverse shadow fixed bottom-5 right-5"
             role="alert">
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