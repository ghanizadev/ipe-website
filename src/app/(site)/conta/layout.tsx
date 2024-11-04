"use server"

import Link from "next/link";
import React from "react";
import LogoutButton from "./components/logout-button";

type AccountLayoutPageProps = {
    children: React.ReactNode
}

export default async function AccountLayout({children}: AccountLayoutPageProps) {
    return (
        <div className={"grid grid-cols-1 md:grid-cols-sidebar gap-4 mb-8"}>
            <aside className={"hidden col-span-1 w-44 border-r-2 border-gray-100 md:block"}>
                <h3 className={"text-lg text-[--primary] lg:text-2xl mb-4"}>Minha conta</h3>
                <nav>
                    <ul>
                        <li className={"mb-2"}>
                            <Link className={"text-[--primary] underline"} href={"/conta/eventos"}>Meus
                                eventos</Link>
                        </li>
                        <li className={"mb-2"}>
                            <Link className={"text-[--primary] underline mb-2"} href={"/conta/dados"}>Minha conta</Link>
                        </li>
                        <li>
                            <hr className="h-px bg-gray-200 my-4 border-0"/>
                        </li>
                        <li className={"mb-2"}>
                            <LogoutButton/>
                        </li>
                    </ul>
                </nav>
            </aside>
            <div className={"col-span-1"}>
                {children}
            </div>
        </div>
    )
}