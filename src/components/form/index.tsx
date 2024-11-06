"use client"

import React from "react";
import {useRouter} from "next/navigation";
import _ from "lodash"

import formEventParser from "@/helpers/form-event-parser.helper";


type FormProps<T, U> = {
    children?: React.ReactNode;
    action: (value: T & U) => void | Promise<void>;
    additionalData: U;
    className?: string;
    refresh?: boolean;
}

export default function Form<T = PayloadDocument, U = Record<string, string>>(props: FormProps<T, U>) {
    const {
        action,
        children,
        additionalData,
        className,
        refresh
    } = props;

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = formEventParser<T>(e);
        _.merge(formData, additionalData)
        await action(formData as T & U);
        if (refresh)
            router.refresh();
    }
    return <form className={className} onSubmit={handleSubmit}>{children}</form>
}