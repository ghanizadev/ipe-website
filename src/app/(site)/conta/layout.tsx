import Link from "next/link";
import React from "react";

type AccountLayoutPageProps = {
    children: React.ReactNode
}

export default async function AccountLayout({children}: AccountLayoutPageProps) {
    return (
        <div className={"grid grid-cols-sidebar gap-4"}>
            <aside className={"col-span-1 w-44 border-r-2 border-gray-100"}>
                <h3 className={"text-lg text-[--primary] lg:text-2xl mb-4"}>Minha conta</h3>
                <nav>
                    <ul>
                        <li className={"mb-2"}>
                            <Link className={"text-[--primary] underline"} href={"/conta/eventos"}>Meus
                                eventos</Link>
                        </li>
                        <li className={"mb-2"}>
                            <Link className={"text-[--primary] underline mb-2"} href={"/conta/dados"}>Dados da
                                conta</Link>
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