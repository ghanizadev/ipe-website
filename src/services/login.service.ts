import {getPayloadHeaders} from "@/helpers/get-payload-headers.helper";

type LoginOptions = {
    email: string;
    password: string;
}

export default async function loginService(data: LoginOptions) {
    const url = `/cms/users/login`;
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