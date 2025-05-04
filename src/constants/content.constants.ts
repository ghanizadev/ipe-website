import { SERVER_URL } from '@/constants/server';

export const MOTIVATION =
  'Somos uma instituição sem fins lucrativos, que teve início em 2016 com apenas 4 atletas, e hoje atendemos mais de 200 pessoas entre guias e paratletas, promovendo ações ligadas ao esporte e lazer, com foco a inclusão de pessoas com deficiência e voluntários.';

export const DEFAULT_OPENGRAPH = {
  title: 'IPE - Inclusão Pelo Esporte',
  description: MOTIVATION,
  url: SERVER_URL,
  siteName: 'IPE - Inclusão Pelo Esporte',
  images: {
    height: 850,
    width: 1920,
    alt: 'A primeira corrida do instituto IPE',
    url: '/hero.jpg',
  },
};
