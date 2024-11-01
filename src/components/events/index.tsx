"use server"

import EventItem from "@/components/events/event-item";
import getEvents from "@/services/get-events.service";

export default async function Events() {
    const events = await getEvents();

    return (
        <section className={"px-4 my-16"}>
            <h2 className={"mb-6 text-2xl font-bold leading-none tracking-tight text-[--primary] md:text-3xl lg:text-4xl"}>Próximos
                eventos</h2>
            {events?.docs?.map(event => (
                <EventItem key={event.id} event={event}/>
            ))}
        </section>
    )
}