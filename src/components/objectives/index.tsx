import PrimaryButton from "@/components/button/primary-button";

type ObjectiveItemProps = {
    title: string;
    message: string;
    cta?: {
        label: string;
        path: string;
    }
}

function ObjectiveItem(props: ObjectiveItemProps) {
    return (
        <div
            className={"w-48 h-[100%] mx-4 flex flex-col items-center justify-center border-2 rounded-xl border-[--primary] px-4 py-4"}>
            <span className={"mb-4 text-xl text-[--primary]"}>{props.title}</span>
            <p className={"mb-4 text-md text-gray-600"}>{props.message}</p>
            {props.cta && <PrimaryButton>{props.cta.label}</PrimaryButton>}
        </div>
    )
}

export default async function Objectives() {
    return (
        <div className={"flex flex-row justify-center"}>
            <ObjectiveItem
                title={"Nossos objectivos"}
                message={"O começo voluntário de um grande e possível sonho"}
                cta={{label: "Conheça-nos", path: "/institucional/sobre-nos"}}
            />
            <ObjectiveItem
                title={"Nossos paratletas"}
                message={"Conheça nossos paratletas e saiba como é possível ajudá-los neste projeto."}
                cta={{label: "Paratletas", path: "/paratletas"}}
            />
        </div>
    )
}