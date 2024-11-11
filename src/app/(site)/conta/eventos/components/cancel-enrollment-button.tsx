"use client"

import React from "react";
import SecondaryButton from "@/components/button/secondary-button";
import callAlert from "@/components/alert/call-alert";
import {useRouter} from "next/navigation";


type CancelEnrollmentButtonProps = {
    enrollmentId: string;
    action: (args: { enrollmentId: string }) => Promise<void>
}

export default function CancelEnrollmentButton(props: CancelEnrollmentButtonProps) {
    const router = useRouter();

    const handleCancelEnrollment = async () => {
        const {status} = await callAlert('confirmation', {
            title: "Deseja mesmo cancelar esta inscrição?",
            message: "É possivel cancelar sua inscrição se ela não estiver paga ainda. Além disso, você poderá se reinscrever neste mesmo evento, porém não pode ser que não tenha mais vagas.\n\nAo aceitar, você concorda em desistir da sua reserva."
        });

        if (status === 'confirm') {
            await props.action({enrollmentId: props.enrollmentId})
            router.refresh();
        }
    }

    return (
        <SecondaryButton
            tag={"button"}
            className={"border-red-700 text-red-700 w-full mt-4 mb-2 md:mb-0 md:w-fit md:float-right"}
            onClick={handleCancelEnrollment}
        >
            Cancelar inscrição
        </SecondaryButton>
    )
}