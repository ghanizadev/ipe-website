"use server"

import Image from "next/image";
import SecondaryButton from "@/components/button/secondary-button";

export default async function EventItem() {
    return (
        <div className={"grid grid-cols-12 gap-4"}>
            <div className={"flex flex-col items-end col-span-4"}>
                <Image src={"/hero.jpg"} alt={"alt"} width={1920} height={850} className={"object-cover rounded-2xl"}/>
            </div>
            <div className={"flex flex-col items-end col-span-2"}>
                <h3 className={"text-red-800 text-2xl font-bold"}>02/11</h3>
                <span className={"text-[--primary] text-lg"}>as 9:00</span>
                <span
                    className={"text-md font-normal text-gray-500 text-right lg:text-lg"}>Proximo ao posto de saude</span>
            </div>
            <div className={"flex flex-col col-span-6"}>
                <h3 className={"text-[--primary] text-2xl font-bold"}>1ra Corrida da Barra da Lagoa</h3>
                <p>Mussum Ipsum, cacilds vidis litro abertis. Suco de cevadiss deixa as pessoas mais interessantis.
                    Paisis, filhis, espiritis santis. Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que
                    eu levo! In elementis mé pra quem é amistosis quis leo.</p>
                <div className={"w-32 self-end"}>
                    <SecondaryButton>Inscreva-se</SecondaryButton>
                </div>
            </div>
        </div>
    )
}