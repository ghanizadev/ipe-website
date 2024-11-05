import type {Metadata} from "next";
import Head from "next/head";
import Script from "next/script";
import localFont from "next/font/local";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ToastWrapper from "@/components/toast";


import "../globals.scss";

const geistSans = localFont({
    src: "../fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const geistMono = localFont({
    src: "../fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "IPE - Inclusão Pelo Esporte",
    keywords: [
        "IPE",
        "Instituto Inclusão Pelo Esporte",
        "inclusao ao esporte",
        "deficiente fisico",
        "triatleta",
        "ser as pernas",
        "pernas de aluguel"
    ]
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt">
        <Head>
            <link href="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.css" rel="stylesheet"/>
        </Head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <Navbar/>
        <main className="max-w-screen-xl mx-auto p-4">
            {children}
        </main>
        <Footer/>
        <ToastWrapper/>
        <Script strategy={'beforeInteractive'}
                src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js"></Script>
        </body>
        </html>
    );
}
