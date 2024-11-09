"use server"

import {getPayloadHeaders} from "@/helpers/get-payload-headers.helper";
import validateGRecaptcha from "@/actions/validate-grecaptcha.action";


export default async function loginAction(data: LoginUserDTO): Promise<ActionResponse> {
    const url = `${process.env.CMS_API_URL}/api/users/login`;

    const isValid = await validateGRecaptcha(data.grecaptchaToken);
    if (!isValid) {
        console.warn("Login failed. Invalid Recaptcha.");
        return {success: false, errors: [{field: '*', message: 'E-mail e/ou senha incorretos.'}]};
    }

    const init: RequestInit = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            ...getPayloadHeaders(),
        },
        body: JSON.stringify(data)
    }

    const response = await fetch(url, init);
    if (!response.ok) {
        console.warn("Login failed. Invalid credentials.");
        return {success: false, errors: [{field: '*', message: 'E-mail e/ou senha incorretos.'}]};
    }

    return {success: true};
}