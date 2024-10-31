"use server"

import Image from "next/image";
import PrimaryButton from "@/components/button/primary-button";

export default async function Hero() {
    return (
        <div className={"grid lg:grid-cols-12 lg:grid-rows-1 py-24 px-4"}>
            <div className={"p-4 col-span-6"}>
                <span
                    className={"mb-4 text-lg leading-none tracking-tight text-[--primary] lg:text-xl"}>O mundo não muda com opiniões, muda com exemplos.</span>
                <h1 className={"mb-6 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl"}>Inclusão
                    Pelo Esporte</h1>
                <p className={"mb-6 text-lg font-normal text-gray-500 lg:text-xl"}>Somos uma instituição sem fins
                    lucrativos, que teve início em 2016 com apenas 4 atletas, e hoje atendemos mais de 60 pessoas,
                    promovendo ações ligadas ao esporte e lazer, com foco a inclusão de pessoas com deficiência e
                    voluntários.</p>
                <PrimaryButton>Saiba como ajudar</PrimaryButton>
            </div>
            <div className={"p-4  col-span-6"}>
                <Image src={"/hero.jpg"} alt={"descricao"} width={1920} height={850}
                       className={"h-[100%] object-cover rounded-2xl"}/>
            </div>
        </div>
    )
}