import _ from "lodash";
import React from "react";

export default function formEventParser<T = FormData>(e: React.FormEvent): T {
    const form = e.target as HTMLFormElement;
    const formData = {};

    for (const element of form.elements) {
        const input = element as HTMLInputElement;
        const name = input.getAttribute('name');
        if (!name) continue;

        const value = input.value || input.checked;
        if (value !== undefined) {
            _.set(formData, name, value)
        }
    }

    return formData as T;
}