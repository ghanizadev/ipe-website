import Handlebars from 'handlebars';
import 'server-only';

import { GenerateEmailFn, PayloadEmailTemplate } from '@/types/mail';

const template = Handlebars.compile(`
    <p>Atualize sua senha aqui {{ baseUrl }}/reset-password?token={{ token }}.</p>
`);

const generateEmail: GenerateEmailFn = (args) =>
  template({ ...args, baseUrl: process.env.PAYLOAD_PUBLIC_SITE_URL });

const adminEmailForgotTemplate: PayloadEmailTemplate = {
  generateEmailSubject: () => 'Recupere sua senha',
  generateEmailHTML: generateEmail,
};

export default adminEmailForgotTemplate;
