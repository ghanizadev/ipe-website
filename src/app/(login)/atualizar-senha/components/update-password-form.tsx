"use client"

import {TextInput} from "@/components/input";
import PrimaryButton from "@/components/button/primary-button";
import React, {useState} from "react";
import formEventParser from "@/helpers/form-event-parser.helper";

type UpdatePasswordParams = { password: string; 'confirm-password': string; };

type UpdatePasswordFromProps = {
    action: (password: string) => Promise<ActionResponse | void>
}

export default function UpdatePasswordForm(props: UpdatePasswordFromProps) {
    const [errors, setErrors] = useState<{ [field: string]: string | boolean }>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const {password, 'confirm-password': confirmPassword} = formEventParser<UpdatePasswordParams>(e);

        if (!password || password !== confirmPassword) {
            setErrors({'confirm-password': 'As senhas não conferem', password: true})
            return;
        }

        const response = await props.action(password);
        if (response?.success) setErrors({});
    }

    return (
        <form onSubmit={handleSubmit} className={"flex flex-col"}>
            <TextInput
                error={errors.password}
                label={'Nova senha'}
                name={'password'}
                type={"password"}
            />
            <TextInput
                error={errors['confirm-password']}
                label={'Confirme a senha'}
                name={'confirm-password'}
                type={"password"}
                className={"mb-4"}
            />
            <PrimaryButton>Salvar</PrimaryButton>
        </form>
    )
}