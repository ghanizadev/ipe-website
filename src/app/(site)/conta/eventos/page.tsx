import findEnrollmentsAction from "@/app/(site)/conta/find-enrollments.action";
import {cookies} from "next/headers";
import getMeServerService from "@/services/get-me-server.service";
import {redirect, RedirectType} from "next/navigation";
import React from "react";
import RichText from "@/components/rich-text";
import moment from "moment";
import SecondaryButton from "@/components/button/secondary-button";


function getStatus(enrollment?: EnrollmentDTO) {
    let label = 'Inscrição confirmada';
    let color = 'text-yellow-700';
    let message = "Sua vaga está reservada, porém ainda não identificamos o pagamento da sua taxa de inscrição. Page a taxa de inscrição antes do término do prazo para garantir sua vaga."

    if (enrollment?.payment?.paid) {
        label = "Pagamento confirmado"
        color = "text-green-700"
        message = "Está tudo certo! Por agora, veja como se preparar para o evento logo abaixo, no campo de instruções."
    } else if (enrollment?.event?.dueDate && new Date(enrollment?.event?.dueDate).getTime() <= Date.now()) {
        label = "Encerrado"
        color = "text-gray-700"
        message = "Este evento está encerrado. Fique atento para novos eventos na página inicial."
    }

    return (
        <span>
            <span className={`${color} font-bold`}>{label}</span> - {message}
        </span>
    )
}

export default async function Account() {
    const cookieStore = await cookies();
    const me = await getMeServerService(cookieStore.get('payload-token')?.value);

    if (!me?.user) {
        return redirect('/', RedirectType.replace)
    }

    const {myEnrollments} = await findEnrollmentsAction(me.user.id);

    return (
        <div className={"m-4"}>
            <h4 className={"mb-2 font-bold"}>Minhas inscrições</h4>
            {myEnrollments?.map((enrollment) => {
                const event = enrollment.event;
                return (
                    <div key={enrollment.id} className={"border-2 border-gray-100 p-4 relative rounded"}>
                        <div className={"font-bold leading-none mb-4"}>
                            <span className={" text-2xl leading-none"}>{event?.title}</span>
                        </div>
                        <small className={"text-gray-600"}>{event?.standFirst}</small>
                        <p className={"text-lg leading-none text-[--primary] my-4"}>Geral</p>
                        <p>Data do evento: {moment(enrollment.event?.date).format('L')}</p>
                        <p>Término das inscrições: {moment(enrollment.event?.dueDate).format("L")}</p>
                        <p>Local: {enrollment.event?.location}</p>
                        <p>Taxa de inscrição: R$ {enrollment.event?.fee?.toFixed(2).replace('.', ',')}</p>
                        <p className={"my-1"}>{getStatus(enrollment)}</p>
                        <p className={"text-lg leading-none text-[--primary] my-4"}>Instruções</p>
                        <RichText html={enrollment.event?.instructionsHtml}/>
                        <div className={"my-2 absolute right-2 top-2"}></div>
                        <SecondaryButton className={"border-red-700 text-red-700"}>Cancelar
                            inscrição</SecondaryButton>
                    </div>
                )
            })}
        </div>
    )
}