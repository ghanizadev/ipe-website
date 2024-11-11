"use server"

import Image from "next/image";
import {notFound} from "next/navigation";

import getEventBySlug from "@/services/get-event-by-slug.service";
import RichText from "@/components/rich-text";
import EnrollmentButton from "./components/enrollment-button";
import Modal from "@/components/modal";
import {TextInput} from "@/components/input";
import PrimaryButton from "@/components/button/primary-button";
import confirmAndEnrollAction from "./actions/confirm-and-enroll.action";
import Form from "@/components/form";
import {H3} from "@/components/typography";
import getMeServerService from "@/services/get-me-server.service";
import {cookies, headers} from "next/headers";
import SelectInput from "@/components/select";
import {tshirtSizes, tshirtTypes} from "@/constants/account.constants";


type PageProps = {
    params: Promise<Record<string, string>>;
    searchParams: Promise<Record<string, string>>;
}

export default async function EventPage(props: PageProps) {
    const {slug} = await props.params;
    const {register} = await props.searchParams;
    const heads = await headers();
    const pathname = heads.get('next-url')

    const cookieStore = await cookies();

    const me = await getMeServerService(cookieStore.get('payload-token')?.value);
    const event = await getEventBySlug(slug);

    if (!event) {
        return notFound()
    }

    return (
        <>
            <div className={"max-w-screen-xl m-auto"}>
                <h1 className={"text-4xl lg:6xl my-8 text-[--primary] font-extrabold text-center"}>{event.title}</h1>
                <div className={"text-center flex justify-center items-center my-16"}>
                    <div className={"w-2/3"}>
                        <p className={"text-gray-600"}>{event.standFirst}</p>
                    </div>
                </div>
                <Image src={process.env.NEXT_PUBLIC_CMS_URL + event.image.url} alt={''} width={event.image.width}
                       height={event.image.height}/>
                <RichText html={event.html} className={"my-16"}/>
                <div className={"flex justify-center items-center mb-16"}>
                    <EnrollmentButton event={event}/>
                </div>
            </div>
            {register &&
                <Modal title={"Inscrição"}>
                    <p className={"mb-4"}>Confirme seus dados e envie sua inscrição</p>
                    <Form<Partial<UserDTO>, { eventId: string, redirectUrl: string; userId?: string }>
                        action={confirmAndEnrollAction}
                        additionalData={{
                            eventId: event.id,
                            userId: me?.user?.id,
                            redirectUrl: pathname ?? '/'
                        }}
                    >
                        <TextInput
                            className={"mb-2"}
                            label={"Nome"}
                            name={'name'}
                            defaultValue={me?.user?.name}
                            readonly
                            required
                        />
                        <TextInput
                            className={"mb-2"}
                            label={"E-mail"}
                            name={'email'}
                            defaultValue={me?.user?.email}
                            readonly
                            required
                        />
                        <H3>Documentação</H3>
                        <TextInput
                            className={"mb-2"}
                            label={"Data de Nascimento"}
                            name={'birthday'}
                            type={"date"}
                            defaultValue={me?.user?.birthday}
                            required
                        />
                        <TextInput
                            className={"mb-2"}
                            label={"CPF (Certidão de Pessoa Física)"}
                            name={'cpf'}
                            pattern={'\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}'}
                            title={"O CPF deve ter o formato com hífem. Ex.: 000000000-00"}
                            defaultValue={me?.user?.cpf}
                            required
                        />
                        <TextInput
                            className={"mb-2"}
                            label={"RG (Registro Geral)"}
                            name={'rg'}
                            defaultValue={me?.user?.rg}
                            required
                        />
                        <H3>Camiseta</H3>
                        <SelectInput
                            className={"mb-2"}
                            label={"Tipo da Camiseta"}
                            name={'tshirt.type'}
                            defaultValue={me?.user?.tshirt?.type}
                            options={tshirtTypes}
                            required
                        />
                        <SelectInput
                            className={"mb-4"}
                            label={"Tamanho da Camiseta"}
                            name={'tshirt.size'}
                            defaultValue={me?.user?.tshirt?.size}
                            options={tshirtSizes}
                            required
                        />
                        <small><span className={"text-red-600"}>*</span> Campos obrigatórios.</small>
                        <div
                            className="mt-4 flex items-center justify-end py-4 md:py-5 border-t border-gray-200 rounded-b">
                            <PrimaryButton tag={"button"} type={"submit"}>Salvar e Inscrever-se</PrimaryButton>
                        </div>
                    </Form>
                </Modal>
            }
        </>
    )
}

export async function generateMetadata({params}: PageProps) {
    const {slug} = await params;
    const event = await getEventBySlug(slug);

    return {
        title: `${event?.title ?? ''} / IPE - Inclusão Pelo Esporte`,
    }
}