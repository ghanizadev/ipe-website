"use server";

import {getPayloadHeaders} from "@/helpers/get-payload-headers.helper";
import validateGRecaptcha from "@/actions/validate-grecaptcha.action";

export default async function createAccount(formData: CreateUserDTO & { grecaptchaToken: string }): Promise<boolean> {
    const isValid = validateGRecaptcha(formData.grecaptchaToken);
    if (!isValid) return false;

    const url = `${process.env.CMS_API_URL}/api/users`;
    const init: RequestInit = {
        method: 'POST',
        headers: {
            ...getPayloadHeaders(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
    }

    const response = await fetch(url, init);
    return response.ok;
}