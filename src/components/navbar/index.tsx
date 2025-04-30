'use server';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Dropdown from '@/components/dropdown';
import LinkButton from '@/components/link-button';
import { UserContext } from '@/components/navbar/components/user-context';

import getPages from '@/services/get-pages.service';

export default async function Navbar() {
  const pages = await getPages();

  const navigation = (pages?.docs ?? []).reduce(
    (previous, current) => {
      if (!current.shownOnNavbar) return previous;

      if (current.category) {
        return {
          ...previous,
          [current.category.title]: {
            path: '#',
            items: [
              ...(previous[current.category.title]?.items ?? []),
              {
                label: current.title,
                path: '/' + current.category.slug + '/' + current.slug,
              },
            ],
          },
        };
      }

      return {
        ...previous,
        [current.title]: {
          path: `/${current.slug}`,
          items: [],
        },
      };
    },
    {} as Record<
      string,
      { path: string; items: { label: string; path: string }[] }
    >
  );

  return (
    <nav className='border-gray-200 bg-white'>
      <div className='mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4'>
        <Link
          href='/'
          className='flex items-center space-x-3 rtl:space-x-reverse'
        >
          <Image
            src={'/logo.png'}
            width={127}
            height={73}
            className='h-12 w-auto'
            alt={'Logo instituto IPE'}
          />
        </Link>
        <button
          data-collapse-toggle='navbar-dropdown'
          type='button'
          className='inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none md:hidden'
          aria-controls='navbar-dropdown'
          aria-expanded='false'
        >
          <span className='sr-only'>Open main menu</span>
          <svg
            className='h-5 w-5'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 17 14'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M1 1h15M1 7h15M1 13h15'
            />
          </svg>
        </button>
        <div className='hidden w-full md:block md:w-auto' id='navbar-dropdown'>
          <ul className='mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse'>
            <li className={'m-auto'}>
              <LinkButton href={'/'} current={'page'}>
                Início
              </LinkButton>
            </li>
            {Object.keys(navigation).map((categoryName) => {
              const category = navigation[categoryName];

              if (!category.items.length)
                return (
                  <li key={categoryName} className={'m-auto'}>
                    <LinkButton href={category.path}>{categoryName}</LinkButton>
                  </li>
                );

              return (
                <li key={categoryName} className={'m-auto'}>
                  <Dropdown options={category.items} label={categoryName} />
                </li>
              );
            })}
            <li className={'m-auto'}>
              <LinkButton href='/galeria'>Galeria de fotos</LinkButton>
            </li>
            <li className={'m-auto'}>
              <LinkButton href='/loja'>Loja</LinkButton>
            </li>
            <li className={'m-auto'}>
              <LinkButton href='/contato'>Contato</LinkButton>
            </li>
            <UserContext />
          </ul>
        </div>
      </div>
    </nav>
  );
}
