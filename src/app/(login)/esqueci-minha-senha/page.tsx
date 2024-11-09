import React from "react";
import {Metadata} from "next";

import {TextInput} from "@/components/input";
import PrimaryButton from "@/components/button/primary-button";
import {H1, P} from "@/components/typography";
import Form from "@/components/form";
import sendForgotPasswordResetAction from "./actions/send-forgot-password-reset.action";

export default async function ForgotMyPasswordPage({searchParams}: { searchParams: Promise<Record<string, string>> }) {
    const {sent} = await searchParams;

    return (
        <div className={"w-[100vw] h-[100vh] flex justify-center items-center"}>
            <section className={"flex flex-col m-auto p-16 md:border-2 md:border-[--primary] rounded-2xl"}>
                {!sent &&
                    <>
                        <H1>Esqueci minha senha</H1>
                        <P>Informe o e-mail que você usa para acessar sua conta</P>
                        <Form action={sendForgotPasswordResetAction} className={"flex flex-col"}>
                            <TextInput label={'Email'} name={'email'} type={"email"} className={"mb-4"}/>
                            <PrimaryButton>Enviar</PrimaryButton>
                        </Form>
                    </>
                }
                {sent &&
                    <>
                        <H1>Mensagem enviada!</H1>
                        <P>Um e-mail foi enviado para o endereço informado, caso ele exista.</P>
                        <PrimaryButton path={"/"}>Ir para o início</PrimaryButton>
                    </>
                }
            </section>
        </div>
    )
}

export const metadata: Metadata = {
    title: "Esqueci minha senha / IPE - Inclusão Pelo Esporte"
}
