"use client"

import useMe from "@/hooks/use-me";
import {useRouter} from "next/navigation";

type EnrollmentButtonProps = {
    event: EventDTO;
    createEnrollmentAction: (eventId: string, userId: string) => Promise<void>
}


export default function EnrollmentButton({event, createEnrollmentAction}: EnrollmentButtonProps) {
    const {data: me} = useMe();
    const router = useRouter();

    const handleEnrollment = async () => {
        if (!event) {
            router.replace('/')
            return;
        }

        if (!me) {
            router.push('/entrar?redirect=' + encodeURIComponent(window.location.href))
            return;
        }

        await createEnrollmentAction(event.id, me.user.id);
        router.push('/conta?notification=enrollment-success&enrollmentId=' + event.id)
    }

    return (
        <button onClick={handleEnrollment} type={"button"} disabled={!event}
                className={"bg-[--primary] text-white px-6 py-4 text-2xl rounded-2xl"}>Inscreva-se!
        </button>
    )
}