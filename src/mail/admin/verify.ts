import Handlebars from 'handlebars';
import 'server-only';

import { GenerateEmailFn, PayloadEmailTemplate } from '@/types/mail';

const template = Handlebars.compile(`
    <p>Verifique sua conta aqui {{ baseUrl }}/verify?token={{ token }}.</p>
`);

const generateEmail: GenerateEmailFn = (args) =>
  template({ ...args, baseUrl: process.env.PAYLOAD_PUBLIC_SITE_URL });

const adminEmailVerifyTemplate: PayloadEmailTemplate = {
  generateEmailSubject: () => 'Verifique seu e-mail',
  generateEmailHTML: generateEmail,
};

export default adminEmailVerifyTemplate;
