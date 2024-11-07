"use client"

import React, {useState} from "react";

import {TextInput} from "@/components/input";
import PrimaryButton from "@/components/button/primary-button";
import SecondaryButton from "@/components/button/secondary-button";
import formEventParser from "@/helpers/form-event-parser.helper";
import createAccount from "@/services/create-account.service";
import {useRouter} from "next/navigation";

type SelectButtonProps = {
    label: string;
    onClick: () => void;
    selected: boolean;
}

function SelectButton({label, onClick, selected}: SelectButtonProps) {
    const classes = ["p-8 border-2 border-[--primary] w-full rounded-2xl"];

    if (selected) {
        classes.push('bg-[--primary] text-white')
    } else {
        classes.push('text-[--primary] scale-90')
    }

    return (
        <button type={'button'} onClick={onClick} className={classes.join(" ")}>{label}</button>
    )
}

export default function LoginForm(props: { redirect?: string }) {
    const [step, setStep] = useState('first');
    const [role, setRole] = useState('');
    const [errors, setErrors] = useState<Record<string, string | boolean>>({});
    const router = useRouter();

    const handleTypeSelect = (role: string) => () => {
        setRole(role);
    }

    const handleSelect = () => {
        setStep('second');
    }

    const handleGoBack = () => {
        setStep('first');
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = formEventParser<CreateUserDTO>(e);
        let isOk = true;

        if (!data.email) {
            setErrors(errors => ({...errors, email: 'E-mail é obrigatório'}))
            isOk = false;
        }

        if (!data.name) {
            setErrors(errors => ({...errors, name: 'Nome é obrigatório'}))
            isOk = false;
        }

        if (!data.birthday) {
            setErrors(errors => ({...errors, birthday: 'Data de nascimento é obrigatória'}))
            isOk = false;
        }

        if (data.password !== data['confirm-password'] as string) {
            setErrors(errors => ({...errors, password: true, 'confirm-password': 'As senhas não conferem'}))
            isOk = false;
        }

        if (!isOk) return;

        const response = await createAccount({...data, role});
        if (response) {
            if (props.redirect) {
                try {
                    const url = new URL(props.redirect);
                    const ownUrl = new URL(process.env.NEXT_PUBLIC_URL!);

                    if (url.hostname === ownUrl.hostname) {
                        url.searchParams.set('create', 'success');
                        router.push(url.pathname + url.search);
                        return;
                    }
                } catch {
                }
            }

            router.push('/entrar?create=success');
        }
    }

    return (
        <form onSubmit={handleSubmit} className={"flex flex-col"}>
            {step === "first" &&
                <>
                    <p>Eu sou um:</p>
                    <div className={"grid grid-cols-2 gap-2 my-8"}>
                        <SelectButton selected={role === 'parathlete'} onClick={handleTypeSelect('parathlete')}
                                      label={"Paratleta"}/>
                        <SelectButton selected={role === 'guide'} onClick={handleTypeSelect('guide')}
                                      label={"Guia"}/>
                    </div>
                    <SecondaryButton type={"button"} onClick={handleSelect}>Selecionar</SecondaryButton>
                </>
            }
            {step === "second" &&
                <>
                    <p className={"mb-4"}>Você selecionou: <span
                        className={"text-[--primary-darker]"}>{role === "guide" ? 'Guia' : 'Paratleta'}</span></p>
                    <TextInput error={errors['name']} label={'Nome completo'} name={'name'}/>
                    <TextInput error={errors['email']} label={'E-mail'} name={'email'}/>
                    <TextInput error={errors['birthday']} type={'date'} label={'Data de nascimento'} name={'birthday'}
                               className={"mb-8"}/>
                    <TextInput error={errors['password']} label={'Senha'} name={'password'} type={"password"}/>
                    <TextInput error={errors['confirm-password']} label={'Confirmar senha'} name={'confirm-password'}
                               type={"password"}
                               className={"mb-8"}/>
                    <PrimaryButton type={"submit"} className={"mb-2"}>Criar conta</PrimaryButton>
                    <SecondaryButton type={"button"} onClick={handleGoBack}>Voltar</SecondaryButton>
                </>
            }
        </form>
    )
}