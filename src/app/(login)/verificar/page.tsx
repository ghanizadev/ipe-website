import {redirect} from "next/navigation";
import {Metadata} from "next";

import Validate from "./components/validate";
import verifyAccountAction from "./actions/verify-account.action";


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
