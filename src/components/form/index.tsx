"use client"

import React from "react";
import formEventParser from "@/helpers/form-event-parser.helper";
import _ from "lodash"

type FormProps<T, U> = {
    children?: React.ReactNode;
    action: (value: T & U) => void | Promise<void>;
    additionalData: U;
    className?: string;
}

export default function Form<T = PayloadDocument, U = Record<string, string>>(props: FormProps<T, U>) {
    const {
        action,
        children,
        additionalData,
        className,
    } = props;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = formEventParser<T>(e);
        _.merge(formData, additionalData)
        await action(formData as T & U);
    }
    return <form className={className} onSubmit={handleSubmit}>{children}</form>
}