"use client"

import React from "react";

import TextInput from "@/components/input/text-input";
import PrimaryButton from "@/components/button/primary-button";
import Link from "next/link";


export default function LoginForm() {
    const handleSubmit = (e: React.FormEvent) => {
        //
    }

    return (
        <form onSubmit={handleSubmit} className={"flex flex-col"}>
            <TextInput label={'Nome completo'} name={'name'}/>
            <TextInput label={'E-mail'} name={'email'}/>
            <TextInput label={'Data de nascimento'} name={'birthday'}/>
            <br/>
            <TextInput label={'Senha'} name={'password'} type={"password"}/>
            <TextInput label={'Confirmar senha'} name={'confirm-password'} type={"password"}/>
            <br/>
            <PrimaryButton>Criar conta</PrimaryButton>
        </form>
    )
}