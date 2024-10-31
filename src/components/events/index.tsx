"use server"

import EventItem from "@/components/events/event-item";

export default async function Events() {
    return (
        <section className={"px-4 my-16"}>
            <h2 className={"mb-6 text-2xl font-bold leading-none tracking-tight text-[--primary] md:text-3xl lg:text-4xl"}>Próximos
                eventos</h2>
            <EventItem/>
        </section>
    )
}