"use client"

import useMe from "@/hooks/use-me";

export default function Title() {
    const {data: me} = useMe();

    return (
        <h3 className={"text-lg text-[--primary] mb-2 lg:text-2xl"}>Olá, {me?.user?.name.split(' ')[0] ?? 'visitante'}</h3>
    )
}