"use server"

import React from "react";
import Image from "next/image";

import getPartners from "@/services/get-partners.service";


export default async function Partners() {
    const partners = await getPartners();

    const support = (partners?.docs ?? []).filter(partner => partner.type === "support")
    const companies = (partners?.docs ?? []).filter(partner => partner.type === "company")

    return (
        <section className={"flex flex-col items-center justify-center my-16 px-4"}>
            <h3 className={"mb-6 text-2xl font-bold leading-none tracking-tight text-[--primary] md:text-3xl lg:text-4xl"}>Empresas
                parceiras</h3>
            <div className={"flex flex-col lg:flex-row"}>
                {companies.map(partner => (
                    <div key={partner.id} className={"w-36 m-2 lg:m-4"}>
                        <a href={partner.link} target={"_blank"} rel={"noreferrer,noopener"}>
                            <Image src={`${process.env.CMS_API_URL}${partner.logo.sizes.md?.url ?? ''}`}
                                   alt={partner.name + " logo"} width={128} height={128} className={"m-auto"}/>
                        </a>
                    </div>
                ))}
            </div>
            <h3 className={"mb-6 text-2xl font-bold leading-none tracking-tight text-[--primary] md:text-3xl lg:text-4xl"}>Apoio</h3>
            <div className={"flex flex-row"}>
                {support.map(partner => (
                    <div key={partner.id} className={"w-36 m-2 lg:m-4"}>
                        <a href={partner.link} target={"_blank"} rel={"noreferrer,noopener"}>
                            <Image src={`${process.env.CMS_API_URL}${partner.logo.sizes.md?.url ?? ''}`}
                                   alt={partner.name + " logo"} width={128} height={128} className={"m-auto"}/>
                        </a>
                    </div>
                ))}
            </div>
        </section>
    )
}