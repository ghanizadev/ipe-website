"use client"

import useMe from "@/hooks/use-me";
// import {EnrollmentService} from "@/services/enrollment.service";

type EnrollmentButtonProps = {
    event?: EventDTO;
}

export default function EnrollmentButton({event}: EnrollmentButtonProps) {
    const {data: me} = useMe();

    const handleEnrollment = async () => {
        // const service = new EnrollmentService();

        if (!me) {
            return;
        }

        // await service.create({event: event.id, user: me.user.id})
    }

    return (
        <button onClick={handleEnrollment} type={"button"} disabled={!event}
                className={"bg-[--primary] text-white px-6 py-4 text-2xl rounded-2xl"}>Inscreva-se!
        </button>
    )
}