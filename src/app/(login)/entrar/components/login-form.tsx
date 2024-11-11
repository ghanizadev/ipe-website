"use client"

import React, {useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";

import {TextInput} from "@/components/input";
import PrimaryButton from "@/components/button/primary-button";
import formEventParser from "@/helpers/form-event-parser.helper";
import grecaptchaService from "@/services/grecapcha.service";


type LoginFormProps = {
    redirect?: string;
    action: (args: LoginUserDTO) => Promise<ActionResponse>
}

export default function LoginForm(props: LoginFormProps) {
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const grecaptchaToken = await grecaptchaService();
        const formData = formEventParser<LoginUserDTO>(e);

        const response = await props.action({...formData, grecaptchaToken});
        if (response?.success) {
            if (props.redirect) {
                try {
                    const url = new URL(props.redirect);
                    const ownUrl = new URL(process.env.NEXT_PUBLIC_URL!);

                    if (url.hostname === ownUrl.hostname) {
                        router.push(url.pathname + url.search);
                        return;
                    }
                } catch {
                }
            }

            router.push('/conta');
            return;
        }

        setError('Email e/ou senha incorretos');
    }

    return (
        <form onSubmit={handleSubmit} className={"flex flex-col"}>
            <TextInput label={'E-mail'} name={'email'} error={!!error}/>
            <TextInput label={'Senha'} name={'password'} type={"password"} error={error}/>
            <Link href={'/esqueci-minha-senha'} className={"text-sm text-[--primary] mb-8 underline self-end"}>Esqueci
                minha senha</Link>
            <PrimaryButton tag={"button"}>Entrar</PrimaryButton>
        </form>
    )
}