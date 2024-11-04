"use client"

import logoutService from "@/services/logout.service";
import React from "react";
import {useRouter} from "next/navigation";

export default function LogoutButton() {
    const router = useRouter()

    const handleLogout = async () => {
        await logoutService();
        router.push('/');
        router.refresh();
    }

    return (
        <button onClick={handleLogout} type={"button"}
                className={"text-red-700 underline mb-2"}>Sair
        </button>
    )
}