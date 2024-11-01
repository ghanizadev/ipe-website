"use client"

import useMe from "@/hooks/use-me";

export default function Title() {
    const {data: me} = useMe();

    console.log(me)
    return (
        <h3>Ola, {me?.user.name}</h3>
    )
}