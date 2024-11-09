"use server"

import UserService from "@/services/user.service";
import {redirect} from "next/navigation";
import validateGRecaptcha from "@/actions/validate-grecaptcha.action";


export default async function sendForgotPasswordResetAction({email, grecaptchaToken}: Record<string, string>) {
    if (!email) return;

    const isValid = await validateGRecaptcha(grecaptchaToken);
    if (!isValid) return;
    
    const service = new UserService();
    await service.forgotPassword(email);
    redirect("/esqueci-minha-senha?sent=1");
}