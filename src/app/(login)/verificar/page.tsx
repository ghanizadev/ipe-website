"use server"

import {redirect} from "next/navigation";
import UserService from "@/services/user.service";

export default async function VerifyAccountPage({searchParams}: { searchParams: Promise<Record<string, string>>; }) {
    const {token} = await searchParams;

    if (!token) {
        return redirect('/');
    }

    const verifyAccount = async () => {
        "use server"

        const service = new UserService();
        const success = await service.verifyEmail({token});

        if (!success) {
            return {
                success: false,
                errors: [
                    {field: '*', message: 'Não foi possível verificar sua conta. Tente novamente mais tarde.'}
                ]
            }
        }

        return {success}
    }

    const response = await verifyAccount();

    if (response.success) {
        return redirect("/entrar?create=confirmed")
    }

    return (
        <>
            {!response.success && <h1>Erro</h1>}
            {response.errors?.map(({field, message}) => <h2 key={field}>{message}</h2>)}
        </>
    )
}