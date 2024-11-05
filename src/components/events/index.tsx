"use server"

import EventItem from "@/components/events/event-item";
import getEvents from "@/services/get-events.service";
import {H2} from "@/components/typography"

export default async function Events() {
    const events = await getEvents();

    return (
        <section className={"px-4 my-16"}>
            <H2>Próximos eventos</H2>
            {events?.docs?.map(event => (
                <EventItem key={event.id} event={event}/>
            ))}
        </section>
    )
}