"use server"

import {getPayloadHeaders} from "@/helpers/get-payload-headers.helper";
import validateGRecaptcha from "@/actions/validate-grecaptcha.action";

type LoginOptions = {
    email: string;
    password: string;
    grecaptchaToken: string;
}

export default async function loginServiceAction(data: LoginOptions) {
    const url = `${process.env.CMS_API_URL}/api/users/login`;

    const isValid = await validateGRecaptcha(data.grecaptchaToken);
    if (!isValid) return;

    const init: RequestInit = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            ...getPayloadHeaders(),
        },
        body: JSON.stringify(data)
    }

    const response = await fetch(url, init)
    if (!response.ok) return;
    return response.json();
}