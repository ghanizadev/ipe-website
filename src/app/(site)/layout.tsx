import { UserProvider } from '@/context/user.context';
import { User } from '@/payload-types';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Head from 'next/head';
import { cookies } from 'next/headers';
import Script from 'next/script';
import React, { Suspense } from 'react';

import ConfirmationAlert from '@/components/alert/confirmation';
import RemoveAlert from '@/components/alert/remove';
import CookieConsent from '@/components/cookie-consent';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import RecoverAccount from '@/components/recover-account';
import ToastWrapper from '@/components/toast';

import { getUserAuth } from '@/actions/get-user-auth.action';
import saveCookiesPreferencesAction from '@/actions/save-cookies-preferences.action';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();

  const hasConsented = cookieStore.has('cookie-consent');
  const auth = await getUserAuth();

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
        <UserProvider value={{ user: auth.user as User }}>
          <Navbar />
          <main className='mx-auto max-w-screen-xl p-4'>{children}</main>
          <Footer />
          <Suspense>
            <ToastWrapper />
            <CookieConsent
              hasConsented={hasConsented}
              action={saveCookiesPreferencesAction}
            />
            <RecoverAccount />
          </Suspense>
          <ConfirmationAlert />
          <RemoveAlert />
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
          <GoogleAnalytics gaId={'G-QBTZB6ZD7N'} />
        </UserProvider>
      </body>
    </html>
  );
}
