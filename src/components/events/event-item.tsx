"use server"

import Image from "next/image";
import SecondaryButton from "@/components/button/secondary-button";
import Link from "next/link";

type EventProps = {
    event: EventDTO;
}

export default async function EventItem(props: EventProps) {
    const {title, location, slug, date, standFirst, image: {height, width, url}} = props.event;

    const formattedDate = new Date(date);
    const hour = `${formattedDate.getHours().toString()}:${formattedDate.getMinutes().toString().padStart(2, '0')}`;
    const day = `${formattedDate.getDate()}/${formattedDate.getMonth() + 1}`;

    const path = `/eventos/${formattedDate.getFullYear()}/${formattedDate.getMonth() + 1}/${formattedDate.getDate()}/${slug}`

    return (
        <div className={"grid gap-4 lg:grid-cols-6"}>
            <div className={"flex flex-col items-end col-span-3 lg:col-span-2"}>
                <Image src={process.env.NEXT_PUBLIC_CMS_URL + url} alt={"alt"} width={width} height={height}
                       className={"object-cover rounded-2xl"}/>
            </div>
            <div className={"flex flex-row flex-wrap items-end col-span-3 lg:flex-col lg:items-end lg:col-span-1"}>
                <h3 className={"text-red-800 leading-none text-2xl font-bold mr-2"}>Dia {day}</h3>
                <p className={"text-[--primary] leading-none text-lg mr-2"}>às {hour} horas</p>
                <p
                    className={"text-md w-full font-base leading-none text-gray-500 mr-2 lg:text-right lg:text-lg"}>{location}</p>
            </div>
            <div className={"flex flex-col col-span-3 lg:col-span-3"}>
                <Link href={path} className={"text-[--primary] text-2xl font-bold underline"}>{title}</Link>
                <p className={"my-2"}>{standFirst}</p>
                <div className={"w-32 self-end"}>
                    <SecondaryButton path={path}>Saiba mais</SecondaryButton>
                </div>
            </div>
        </div>
    )
}