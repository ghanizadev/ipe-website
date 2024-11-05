import {cookies} from "next/headers";
import {redirect} from "next/navigation";

import {TextInput} from "@/components/input";
import PrimaryButton from "@/components/button/primary-button";
import getMeServerService from "@/services/get-me-server.service";
import SelectInput from "@/components/select";
import {tSizes, tTypes} from "@/constants/account.constants";
import updateUserProfileAction from "./actions/update-user-profile.action";
import Form from "@/components/form";
import SecondaryButton from "@/components/button/secondary-button";


export default async function AccountDataPage() {
    const cookieStore = await cookies();
    const me = await getMeServerService(cookieStore.get('payload-token')?.value);

    if (!me?.user) {
        return redirect('/')
    }

    const {id, name, email, birthday, rg, cpf, tshirt} = me.user;

    return (
        <div>
            <Form<Partial<UserDTO>, { id: string; }>
                action={updateUserProfileAction}
                additionalData={{id: id}}
                className={"grid gap-1"}
            >
                <h3 className={"text-lg leading-none text-[--primary] my-4"}>Geral</h3>
                <TextInput label={"Nome"} name={'name'} readonly defaultValue={name}/>
                <TextInput label={"E-mail"} name={'email'} readonly defaultValue={email}/>
                <TextInput label={"Data de Nascimento"} name={'birthday'} type={"date"} defaultValue={birthday}/>
                <h3 className={"text-lg leading-none text-[--primary] my-4"}>Documentação</h3>
                <TextInput label={"CPF (Certidão de Pessoa Física)"} name={'cpf'} defaultValue={cpf}/>
                <TextInput label={"RG (Registro Geral)"} name={'rg'} defaultValue={rg}/>
                <h3 className={"text-lg leading-none text-[--primary] my-4"}>Camiseta</h3>
                <SelectInput name={"tshirt.type"} label={"Tipo da Camiseta"} options={tTypes}
                             defaultValue={tshirt?.type}/>
                <SelectInput name={"tshirt.size"} label={"Tamanho da Camiseta"} options={tSizes}
                             defaultValue={tshirt?.size}/>
                <PrimaryButton className={"w-min justify-self-end"}>Salvar</PrimaryButton>
            </Form>
            <h3 className={"text-lg leading-none text-[--primary] my-4"}>Outros</h3>
            <SecondaryButton className={"border-red-800 text-red-800"}>Remover minha conta</SecondaryButton>
        </div>
    )
}