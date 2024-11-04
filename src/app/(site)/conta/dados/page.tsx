import TextInput from "@/components/input/text-input";
import PrimaryButton from "@/components/button/primary-button";
import {cookies} from "next/headers";
import getMeServerService from "@/services/get-me-server.service";
import {redirect} from "next/navigation";
import SelectInput from "@/components/select";

const tSizes = [
    {
        label: "P (Pequeno)",
        value: 'P'
    },
    {
        label: "M (Médio)",
        value: 'M'
    },
    {
        label: "G (Grande)",
        value: 'G'
    },
    {
        label: "XG (Extra Grande)",
        value: 'XG'
    },
]

const tTypes = [
    {
        label: "Masculino",
        value: "masc"
    },
    {
        label: "Feminino",
        value: "fem"
    },
    {
        label: "Infantil",
        value: "inf",
    }
]

export default async function AccountDataPage() {
    const cookieStore = await cookies();
    const me = await getMeServerService(cookieStore.get('payload-token')?.value);

    if (!me?.user) {
        return redirect('/')
    }

    const {name, email, birthday, rg, cpf, tshirt} = me.user;

    return (
        <div>
            <form className={"grid gap-1"}>
                <h3 className={"text-lg leading-none text-[--primary] my-4"}>Geral</h3>
                <TextInput label={"Nome"} name={'name'} readonly defaultValue={name}/>
                <TextInput label={"E-mail"} name={'email'} readonly defaultValue={email}/>
                <TextInput label={"Data de nascimento"} name={'birthday'} type={"date"} defaultValue={birthday}/>
                <h3 className={"text-lg leading-none text-[--primary] my-4"}>Documentacao</h3>
                <TextInput label={"CPF (Certidao de Pessoa Fisica)"} name={'cpf'} defaultValue={cpf}/>
                <TextInput label={"RG (Registro Geral)"} name={'rg'} defaultValue={rg}/>
                <h3 className={"text-lg leading-none text-[--primary] my-4"}>Camiseta</h3>
                {/*<TextInput label={"Tipo de Camiseta"} name={'tshirtType'} defaultValue={tshirt?.type}/>*/}
                <SelectInput name={"tshirt.type"} label={"Tipo da Camiseta"} options={tTypes}
                             defaultValue={tshirt?.type}/>
                <SelectInput name={"tshirt.size"} label={"Tamanho da Camiseta"} options={tSizes}
                             defaultValue={tshirt?.size}/>
                {/*<TextInput label={"Tamanho da Camiseta"} name={'tshirtSize'} defaultValue={tshirt?.size}/>*/}
                <PrimaryButton className={"w-min justify-self-end"}>Salvar</PrimaryButton>
            </form>
            <h3 className={"text-lg leading-none text-[--primary] my-4"}>Outros</h3>
            <PrimaryButton className={"bg-red-700"}>Remover minha conta</PrimaryButton>
        </div>
    )
}