"use client"

import useMe from "@/hooks/use-me";
import {useRouter} from "next/navigation";


type EnrollmentButtonProps = {
    event: EventDTO;
}

export default function EnrollmentButton({event}: EnrollmentButtonProps) {
    const {data: me} = useMe();
    const router = useRouter();

    const handleEnrollment = async () => {
        if (!event) {
            router.replace('/');
            return;
        }

        if (!me?.user) {
            const url = new URL(window.location.href);
            url.searchParams.set('register', '1');
            router.push('/entrar?source=enrollment&redirect=' + encodeURIComponent(url.toString()))
            return;
        }

        router.push(window.location.pathname + '?register=1');
    }

    return (
        <button onClick={handleEnrollment} type={"button"} disabled={!event}
                className={"bg-[--primary] text-white px-6 py-4 text-2xl rounded-2xl"}>Inscreva-se!
        </button>
    )
}