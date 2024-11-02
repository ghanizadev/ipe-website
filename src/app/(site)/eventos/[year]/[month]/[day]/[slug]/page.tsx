import Image from "next/image";
import {notFound} from "next/navigation";

import getEventBySlug from "@/services/get-event-by-slug.service";
import RichText from "@/components/rich-text";


type PageProps = {
    params: Promise<Record<string, string>>
}

export default async function EventPage({params}: PageProps) {
    const {slug} = await params;
    const event = await getEventBySlug(slug);

    if (!event) {
        return notFound()
    }

    return (
        <div className={"max-w-screen-xl m-auto"}>
            <h1 className={"text-4xl lg:6xl my-8 text-[--primary] font-extrabold text-center"}>{event.title}</h1>
            <div className={"text-center flex justify-center items-center my-16"}>
                <div className={"w-2/3"}>
                    <p className={"text-gray-600"}>{event.standFirst}</p>
                </div>
            </div>
            <Image src={process.env.NEXT_PUBLIC_CMS_URL + event.image.url} alt={''} width={event.image.width}
                   height={event.image.height}/>
            <RichText html={event.html} className={"my-16"}/>
            <div className={"flex justify-center items-center mb-16"}>
                <button type={"button"}
                        className={"bg-[--primary] text-white px-6 py-4 text-2xl rounded-2xl"}>Inscreva-se!
                </button>
            </div>
        </div>
    )
}