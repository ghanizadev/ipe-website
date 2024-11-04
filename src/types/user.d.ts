declare type TShirtType = 'masc' | 'fem' | 'inf';

declare type TShirtSize = 'P' | 'M' | 'G' | 'XG';

declare type UserDTO = {
    id: string;
    birthday: string;
    cpf: string;
    email: string;
    name: string;
    rg: string;
    role: string;
    tshirt?: { type: TShirtType, size: TShirtSize };
    createdAt: string;
    updatedAt: string;
}