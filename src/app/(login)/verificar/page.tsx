import {redirect} from "next/navigation";
import {Metadata} from "next";

import Validate from "@/app/(login)/verificar/_components/validate";
import verifyAccountAction from "@/app/(login)/verificar/_actions/verify-account.action";


export default async function VerifyAccountPage({searchParams}: { searchParams: Promise<Record<string, string>>; }) {
    const {token} = await searchParams;

    if (!token) {
        return redirect('/');
    }

    return (
        <Validate token={token} action={verifyAccountAction}/>
    )
}

export const metadata: Metadata = {
    title: "Aguarde..."
}
