import React, {Suspense} from "react";
import Image from "next/image";
import {Metadata} from "next";

import GoBackLink from "./_components/go-back-link";


export default async function SignUpSuccessPage() {
    return (
        <div className={"w-[100vw] h-[100vh] flex justify-center items-center"}>
            <div
                className={"max-w-2xl h-auto grid grid-cols-1 2xl:grid-cols-2 2xl:max-w-screen-xl grid-rows-1 md:border-2 md:border-[--primary] rounded-2xl overflow-hidden"}>
                <section className={"flex flex-col m-auto p-16"}>
                    <h3 className={"mb-4 text-2xl font-bold leading-none tracking-tight text-[--primary] md:text-2xl lg:text-4xl"}>Conta
                        criada com sucesso!</h3>
                    <span
                        className={"mb-6 text-base text-gray-700"}>Um link de confirmação foi enviado para seu e-mail. Antes de continuar, por favor, valide sua conta por este link de confirmação.</span>
                    <Suspense>
                        <GoBackLink/>
                    </Suspense>
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
    title: "Conta criada com sucesso / IPE - Inclusão Pelo Esporte"
}
