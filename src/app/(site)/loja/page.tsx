import {Metadata} from "next";

export default async function StorePage() {
    return (
        <div>
            <h1 className={"text-xl text-[--primary] font-extrabold mb-8 lg:text-4xl"}>Loja</h1>
        </div>
    )
}

export const metadata: Metadata = {
    title: "Loja / IPE - Inclusão Pelo Esporte"
}