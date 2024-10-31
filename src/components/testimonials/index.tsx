"use server"

import Image from "next/image";

export default async function Testimonials() {
    return (
        <section className={"my-16 px-4 bg-gray-50"}>
            <div className={"py-16"}>
                <h2 className={"mb-8 text-2xl font-bold leading-none tracking-tight text-[--primary] md:text-3xl lg:text-4xl"}>O
                    que as pessoas tem a dizer?</h2>
                <div className={"m-auto flex flex-col items-center justify-center max-w-2xl"}>
                    <Image
                        src={"http://localhost:3300/avatars/background-05-1920x850-64x64.jpg"}
                        alt={"testimonial"} width={64} height={64}
                        className={"rounded-[50%] mb-4"}/>
                    <span className={"text-xl font-bold text-[--primary]"}>Name here</span>
                    <span className={"text-md text-gray-600"}>Ocupacao</span>
                    <blockquote
                        className={"text-base italic font-semibold text-gray-600 text-justify mb-6"}>
                        <svg className="w-8 h-8 text-[--primary] mb-4 fill-[--primary]" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 14">
                            <path
                                d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
                        </svg>
                        <p>Mussum Ipsum, cacilds vidis litro
                            abertis. Suco
                            de cevadiss
                            deixa as pessoas mais interessantis.
                            Quem num gosta di mé, boa gentis num é. Interessantiss quisso pudia ce receita de bolis,
                            mais
                            bolis eu num gostis. Detraxit consequat et quo num tendi nada.
                        </p>
                    </blockquote>
                    <div className={"flex flex-row"}>
                        <button className={"mx-2 fill-[--primary]"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                <path fillRule="evenodd"
                                      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                            </svg>
                        </button>
                        <button className={"mx-2 fill-[--primary]"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                 viewBox="0 0 16 16">
                                <path fillRule="evenodd"
                                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </button>
                    </div>

                </div>
            </div>
        </section>
    )
}