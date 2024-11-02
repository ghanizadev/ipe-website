import React from "react";

import LoginForm from "./login-form";
import Image from "next/image";
import Link from "next/link";


export default async function SignUp() {
    return (
        <div className={"w-[100vw] h-[100vh] flex justify-center items-center"}>
            <div
                className={"max-w-2xl h-auto grid grid-cols-1 2xl:grid-cols-2 2xl:max-w-screen-xl grid-rows-1 md:border-2 md:border-[--primary] rounded-2xl overflow-hidden"}>
                <section className={"flex flex-col m-auto p-16"}>
                    <h3 className={"mb-4 text-2xl font-bold leading-none tracking-tight text-[--primary] md:text-2xl lg:text-4xl"}>Crie
                        sua conta</h3>
                    <span
                        className={"mb-6 text-md lg:text-xl text-gray-700"}>Preencha com seus dados para criar sua conta</span>
                    <LoginForm/>
                    <div className={"w-full text-center my-8 flex flex-row justify-center items-center"}>
                        <div className={"h-0.5 bg-gray-200 w-full"}></div>
                        <span className={"mx-1 text-gray-500"}>ou</span>
                        <div className={"h-0.5 bg-gray-200 w-full"}></div>
                    </div>
                    <span>Ja possui uma conta? <Link href={'/entrar'}
                                                     className={"text-[--primary-lighter] text-nowrap underline"}>Entre com seu e-mail e senha</Link></span>
                </section>
                <section className={"hidden 2xl:block"}>
                    <Image src={"/hero.jpg"} alt={""} width={1920} height={850}
                           className={"h-full w-full object-cover"}/>
                </section>
            </div>
        </div>
    )
}