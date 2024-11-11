import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Head from 'next/head';
import Script from 'next/script';
import { Suspense } from 'react';

import ConfirmationAlert from '@/components/alert/confirmation';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import ToastWrapper from '@/components/toast';

import '../globals.scss';

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'IPE - Inclusão Pelo Esporte',
  keywords: [
    'IPE',
    'Instituto Inclusão Pelo Esporte',
    'inclusao ao esporte',
    'deficiente fisico',
    'triatleta',
    'ser as pernas',
    'pernas de aluguel',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt'>
      <Head>
        <link
          href='https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.css'
          rel='stylesheet'
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main className='mx-auto max-w-screen-xl p-4'>{children}</main>
        <Footer />
        <Suspense>
          <ToastWrapper />
        </Suspense>
        <ConfirmationAlert />
        <Script
          strategy={'beforeInteractive'}
          src='https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js'
        ></Script>
        <Script
          strategy={'beforeInteractive'}
          src={
            'https://www.google.com/recaptcha/api.js?render=' +
            process.env.NEXT_PUBLIC_GRECAPTCHA_SITE_KEY
          }
        ></Script>
      </body>
    </html>
  );
}
