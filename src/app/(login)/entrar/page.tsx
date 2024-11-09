import React from "react";
import Image from "next/image";
import {Metadata} from "next";

import SecondaryButton from "@/components/button/secondary-button";
import {H1, P} from "@/components/typography";
import LoginForm from "./components/login-form";
import loginAction from "./actions/login.action";


type PageProps = {
    searchParams: Promise<Record<string, string>>
}

export default async function SignInPage({searchParams}: PageProps) {
    const {redirect} = await searchParams;

    return (
        <div className={"w-[100vw] h-[100vh] flex justify-center items-center"}>
            <div
                className={"max-w-2xl h-auto grid grid-cols-1 2xl:grid-cols-2 2xl:max-w-screen-xl grid-rows-1 md:border-2 md:border-[--primary] rounded-2xl overflow-hidden"}>
                <section className={"flex flex-col m-auto p-16"}>
                    <H1>Bem-vindo de volta!</H1>
                    <P>Entre com suas credenciais para acessar sua conta</P>
                    <LoginForm redirect={redirect} action={loginAction}/>
                    <div className={"w-full text-center my-8 flex flex-row justify-center items-center"}>
                        <div className={"h-0.5 bg-gray-200 w-full"}></div>
                        <span className={"mx-1 text-gray-500"}>ou</span>
                        <div className={"h-0.5 bg-gray-200 w-full"}></div>
                    </div>
                    <SecondaryButton path={"/criar-conta"}>Criar um conta</SecondaryButton>
                </section>
                <section className={"hidden 2xl:block"}>
                    <Image src={"/hero.jpg"} alt={""} width={1920} height={850}
                           className={"h-full w-full object-cover"}/>
                </section>
            </div>
        </div>
    )
}

export const metadata: Metadata = {
    title: "Entre / IPE - Inclusão Pelo Esporte"
}
