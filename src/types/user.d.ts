declare type TShirtType = 'masc' | 'fem' | 'inf';

declare type TShirtSize = 'P' | 'M' | 'G' | 'XG';

declare type UserDTO = PayloadDocument & {
  birthday: string;
  cpf: string;
  email: string;
  name: string;
  rg: string;
  role: string;
  tshirt?: { type: TShirtType; size: TShirtSize };
};

declare type CreateUserDTO = Partial<UserDTO> & {
  password: string;
  'confirm-password': string;
  'accept-terms': boolean;
};

declare type UpdatePasswordArgs = {
  password: string;
  token: string;
};

declare type VerifyEmailArgs = {
  token: string;
};
