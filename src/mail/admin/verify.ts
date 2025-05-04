import Handlebars from 'handlebars';

import { SERVER_URL } from '@/constants/server';

import { GenerateEmailFn, PayloadEmailTemplate } from '@/types/mail';

const template = Handlebars.compile(`
    <p>Verifique sua conta aqui {{ baseUrl }}/verify?token={{ token }}.</p>
`);

const generateEmail: GenerateEmailFn = (args) =>
  template({ ...args, baseUrl: SERVER_URL });

const adminEmailVerifyTemplate: PayloadEmailTemplate = {
  generateEmailSubject: () => 'Verifique seu e-mail',
  generateEmailHTML: generateEmail,
};

export default adminEmailVerifyTemplate;
