"use server"

import UserService from "@/services/user.service";
import validateGRecaptcha from "@/actions/validate-grecaptcha.action";

const GENERIC_MESSAGE = {
    success: false,
    errors: [
        {field: '*', message: 'Não foi possível verificar sua conta. Tente novamente mais tarde.'}
    ]
}

export default async function verifyAccountAction(token: string, grecaptchaToken: string): Promise<ActionResponse> {
    const isValid = await validateGRecaptcha(grecaptchaToken);
    if (!isValid) {
        return GENERIC_MESSAGE;
    }

    const service = new UserService();
    const success = await service.verifyEmail({token});

    if (!success) {
        return GENERIC_MESSAGE;
    }

    return {success}
}