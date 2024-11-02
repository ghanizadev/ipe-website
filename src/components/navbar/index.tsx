"use server";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {cookies} from "next/headers";

import Dropdown from "@/components/dropdown";
import LinkButton from "@/components/link-button";
import PrimaryButton from "@/components/button/primary-button";
import getPages from "@/services/get-pages.service";
import getMeServerService from "@/services/get-me-server.service";


export default async function Navbar() {
    const pages = await getPages();

    const cookieStore = await cookies();
    const me = await getMeServerService(cookieStore.get('payload-token')?.value);

    const navigation = (pages?.docs ?? []).reduce((previous, current) => {
        if (!current.shownOnNavbar) return previous;

        if (current.category) {
            return {
                ...previous,
                [current.category.title]: {
                    path: "#",
                    items: [
                        ...(previous[current.category.title]?.items ?? []),
                        {
                            label: current.title,
                            path: "/" + current.category.slug + "/" + current.slug
                        }
                    ]
                }
            }
        }

        return {
            ...previous,
            [current.title]: {
                path: `/${current.slug}`,
                items: []
            }
        }
    }, {} as Record<string, { path: string; items: { label: string; path: string }[] }>)

    return (
        <nav className="bg-white border-gray-200">
            <div
                className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image src="/logo.png" width={127} height={73} className="h-12 w-auto"
                           alt="Logo instituto IPE"/>
                </Link>
                <button data-collapse-toggle="navbar-dropdown" type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        aria-controls="navbar-dropdown" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                        <li className={"m-auto"}>
                            <LinkButton href={"/"} current={'page'}>Início</LinkButton>
                        </li>
                        {Object.keys(navigation).map(categoryName => {
                            const category = navigation[categoryName];

                            if (!category.items.length)
                                return (
                                    <li key={categoryName} className={"m-auto"}>
                                        <LinkButton href={category.path}>{categoryName}</LinkButton>
                                    </li>
                                )

                            return (
                                <li key={categoryName} className={"m-auto"}>
                                    <Dropdown
                                        options={category.items} label={categoryName}/>
                                </li>
                            )
                        })}
                        <li className={"m-auto"}>
                            <LinkButton href="/galeria">Galeria de fotos</LinkButton>
                        </li>
                        <li className={"m-auto"}>
                            <LinkButton href="/loja">Loja</LinkButton>
                        </li>
                        <li className={"m-auto"}>
                            <LinkButton href="/contato">Contato</LinkButton>
                        </li>
                        {!me.user &&
                            <li className={"m-auto"}>
                                <PrimaryButton path={"/entrar"}>Entrar</PrimaryButton>
                            </li>
                        }
                        {me.user &&
                            <li className={"m-auto"}>
                                Olá, <a href={"/conta"}
                                        className={"text-[--primary-lighter] underline"}>{me.user.name.split(' ')[0]}</a>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}