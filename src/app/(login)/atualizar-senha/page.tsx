import React from "react";
import {Metadata} from "next";

import {H1, P} from "@/components/typography";
import UpdatePasswordForm from "./components/update-password-form";
import updatePasswordAction from "./actions/update-password.action";

export default async function UpdatePasswordPage({searchParams}: { searchParams: Promise<Record<string, string>>; }) {
    const {token} = await searchParams;

    return (
        <div className={"w-[100vw] h-[100vh] flex justify-center items-center"}>
            <section className={"flex flex-col m-auto p-16 md:border-2 md:border-[--primary] rounded-2xl"}>
                <H1>Redefina sua senha</H1>
                <P>Informe o e-mail que você usa para acessar sua conta</P>
                <UpdatePasswordForm token={token} action={updatePasswordAction}/>
            </section>
        </div>
    )
}

export const metadata: Metadata = {
    title: "Atualize sua senha / IPE - Inclusão Pelo Esporte"
}