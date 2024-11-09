import {useEffect, useState} from "react";
import grecaptchaService from "@/services/grecapcha.service";


type ValidateProps = {
    action: (token: string, grecaptchaToken: string) => Promise<ActionResponse>;
    token: string;
}

export default function Validate(props: ValidateProps) {
    const [response, setResponse] = useState<ActionResponse>();

    useEffect(() => {
        const effect = async () => {
            const grecaptchaToken = await grecaptchaService();
            const response = await props.action(props.token, grecaptchaToken);
            setResponse(response);
        }

        effect().catch();
    }, []);

    return (
        <>
            {!response && <h1>Aguarde...</h1>}
            {!response?.success && <h1>Erro</h1>}
            {response?.errors?.map(({field, message}) => <h2 key={field}>{message}</h2>)}
        </>
    )
}