import Handlebars from 'handlebars';

import { GenerateEmailFn, PayloadEmailTemplate } from '@/types/mail';

const template = Handlebars.compile(`
    <p>Verifique sua conta aqui {{ baseUrl }}/verificar?token={{ token }}.</p>
`);

const generateEmail: GenerateEmailFn = (args) =>
  template({ ...args, baseUrl: process.env.PAYLOAD_PUBLIC_SITE_URL });

const usersEmailVerifyTemplate: PayloadEmailTemplate = {
  generateEmailSubject: () => 'Verifique seu e-mail',
  generateEmailHTML: generateEmail,
};

export default usersEmailVerifyTemplate;
