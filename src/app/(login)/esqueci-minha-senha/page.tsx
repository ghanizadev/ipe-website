import Form from "next/form";
import {TextInput} from "@/components/input";
import PrimaryButton from "@/components/button/primary-button";
import React from "react";
import UserService from "@/services/user.service";
import {H1, P} from "@/components/typography";
import {redirect} from "next/navigation";

export default async function ForgotMyPasswordPage({searchParams}: { searchParams: Promise<Record<string, string>> }) {
    const {sent} = await searchParams;

    const sendForgotPasswordRequest = async (formData: FormData) => {
        "use server"

        const email = formData.get("email")?.toString() ?? '';

        if (!email) return;

        const service = new UserService();
        await service.forgotPassword(email);
        redirect("/esqueci-minha-senha?sent=1");
    }

    return (
        <div className={"w-[100vw] h-[100vh] flex justify-center items-center"}>
            <section className={"flex flex-col m-auto p-16 md:border-2 md:border-[--primary] rounded-2xl"}>
                {!sent &&
                    <>
                        <H1>Esqueci minha senha</H1>
                        <P>Informe o e-mail que você usa para acessar sua conta</P>
                        <Form action={sendForgotPasswordRequest} className={"flex flex-col"}>
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