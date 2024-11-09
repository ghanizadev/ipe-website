import Head from "next/head";
import Script from "next/script";
import localFont from "next/font/local";

import "../globals.scss"

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

export default async function SignUpLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="pt">
        <Head>
            <link href="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.css" rel="stylesheet"/>
        </Head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <main>
            {children}
        </main>
        <Script strategy={'beforeInteractive'}
                src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js"></Script>
        <Script
            strategy={'beforeInteractive'}
            src={"https://www.google.com/recaptcha/api.js?render=" + process.env.NEXT_PUBLIC_GRECAPTCHA_SITE_KEY}></Script>
        </body>
        </html>
    )
}