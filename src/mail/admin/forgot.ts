import Handlebars from 'handlebars';

import { SERVER_URL } from '@/constants/server';

import { GenerateEmailFn, PayloadEmailTemplate } from '@/types/mail';

const template = Handlebars.compile(`
    <p>Atualize sua senha aqui {{ baseUrl }}/reset-password?token={{ token }}.</p>
`);

const generateEmail: GenerateEmailFn = (args) =>
  template({ ...args, baseUrl: SERVER_URL });

const adminEmailForgotTemplate: PayloadEmailTemplate = {
  generateEmailSubject: () => 'Recupere sua senha',
  generateEmailHTML: generateEmail,
};

export default adminEmailForgotTemplate;
