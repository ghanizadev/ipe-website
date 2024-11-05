import {Metadata} from "next";
import {TextInput} from "@/components/input";
import PrimaryButton from "@/components/button/primary-button";
import {H1, H2, H3} from "@/components/typography"
import Link from "@/components/link";
import TextArea from "@/components/textarea";
import Form from "./components/form";
import createMessageAction from "@/app/(site)/contato/actions/create-message.action";

export default function ContactPage() {
    return (
        <>
            <H1>Contato</H1>
            <div className={"grid grid-[repeat(1fr, 2)] gap-8 md:grid-cols-2"}>
                <div>
                    <H2>Encontre-nos</H2>
                    <p>Venha conhecer nosso escritório e conhecer de perto nosso projeto, ideias e planos para o
                        futuro.</p>
                    <br/>
                    <H3>INSTITUTO IPE</H3>
                    <p>Rua Nove de Julho, 1224 - Ipiranga</p>
                    <p>São José - SC, 88.111-380</p>
                    <br/>
                    <p>Telefones:</p>
                    <p>(48) 99183-1139 / <small>Paulo Escobar – Presidente</small></p>
                    <p>(48) 98809-4111 / <small>Paulo Demétrio - Vice-Presidente</small></p>
                    <p>E-mail: <Link href={"mailto:contato@instituto-ipe.org"}>contato@instituto-ipe.org</Link></p>
                </div>
                <div>
                    <H2>Envie-nos uma mensagem</H2>
                    <Form action={createMessageAction}>
                        <TextInput className={"mb-2"} label={"Nome"} name={'name'} required/>
                        <TextInput className={"mb-2"} label={"E-mail"} name={'email'} type={"email"} required/>
                        <TextInput className={"mb-2"} label={"Telefone/Whatsapp"} name={'phone'} type={"phone"}/>
                        <TextArea className={"mb-2"} label={"Mensagem"} name={'message'} required/>
                        <PrimaryButton className={"float-right"} type={"submit"}>Enviar</PrimaryButton>
                    </Form>
                </div>
            </div>
        </>
    )
}

export const metadata: Metadata = {
    title: "Contato / IPE - Inclusão Pelo Esporte"
}