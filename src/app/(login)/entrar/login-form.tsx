"use client"

import React, {useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";

import TextInput from "@/components/input/text-input";
import PrimaryButton from "@/components/button/primary-button";
import loginService from "@/services/login.service";


export default function LoginForm() {
    const [error, setError] = useState("");
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        let formData = {};

        for (const element of form.elements) {
            const input = element as HTMLInputElement;
            const name = input.getAttribute('name');
            if (!name) continue;

            const value = input.value;
            formData = {...formData, [name]: value}
        }

        const response = await loginService(formData as { email: string; password: string; });
        if (response) {
            router.push('/conta')
            return;
        }

        setError('Email e/ou senha incorretos')
    }

    return (
        <form onSubmit={handleSubmit} className={"flex flex-col"}>
            <TextInput label={'E-mail'} name={'email'} error={!!error}/>
            <TextInput label={'Senha'} name={'password'} type={"password"} error={error}/>
            <Link href={'/'} className={"text-sm text-[--primary] underline self-end"}>Esqueci minha senha</Link>
            <br/>
            <PrimaryButton>Entrar</PrimaryButton>
        </form>
    )
}