"use client"

import useMe from "@/hooks/use-me";

export default function Title() {
    const {data: me} = useMe();

    return (
        <h3>Olá, {me?.user?.name}</h3>
    )
}