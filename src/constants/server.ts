export const SERVER_HOST =
  process.env.NODE_ENV === 'development'
    ? 'localhost'
    : process.env.HEROKU_PR_NUMBER
      ? `ipe-web-pr-${process.env.HEROKU_PR_NUMBER}.herokuapp.com`
      : 'instituto-ipe.org';

export const SERVER_PORT =
  process.env.NODE_ENV === 'development' ? '3300' : '80';

export const SERVER_PROTOCOL =
  process.env.NODE_ENV === 'development' ? 'http' : 'https';

export const SERVER_URL =
  typeof window === 'undefined'
    ? `${SERVER_PROTOCOL}://${SERVER_HOST}${['443', '80'].includes(SERVER_PORT) ? '' : `:${SERVER_PORT}`}`
    : process.env.SERVER_URL!;
