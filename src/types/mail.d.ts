import type { PayloadRequest, User } from 'payload';

declare type GenerateEmailFn = (args?: {
  req?: PayloadRequest;
  token?: string;
  user?: User;
}) => Promise<string> | string;

declare type PayloadEmailTemplate = {
  expiration?: number;
  generateEmailHTML?: GenerateEmailFn;
  generateEmailSubject?: GenerateEmailFn;
};
