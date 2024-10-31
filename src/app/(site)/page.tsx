"use server"

import Partners from "@/components/partners";
import Hero from "@/components/hero";
import Events from "@/components/events";
import Testimonials from "@/components/testimonials";

export default async function Home() {
    return (
        <div>
            <Hero/>
            <Events/>
            <Testimonials/>
            <Partners/>
        </div>
    );
}
