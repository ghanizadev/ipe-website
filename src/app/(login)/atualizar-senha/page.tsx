import React from "react";
import UserService from "@/services/user.service";
import {redirect} from "next/navigation";
import {H1, P} from "@/components/typography";
import UpdatePasswordForm from "./components/update-password-form";

export default async function UpdatePasswordPage({searchParams}: { searchParams: Promise<Record<string, string>>; }) {
    const {token} = await searchParams;

    const updatePasswordAction = async (password: string) => {
        "use server"

        const service = new UserService();
        const success = await service.updatePassword({token, password});

        if (success) {
            redirect('/entrar?create=password-updated');
        }
    }

    return (
        <div className={"w-[100vw] h-[100vh] flex justify-center items-center"}>
            <section className={"flex flex-col m-auto p-16 md:border-2 md:border-[--primary] rounded-2xl"}>
                <H1>Redefina sua senha</H1>
                <P>Informe o e-mail que você usa para acessar sua conta</P>
                <UpdatePasswordForm action={updatePasswordAction}/>
            </section>
        </div>
    )
}