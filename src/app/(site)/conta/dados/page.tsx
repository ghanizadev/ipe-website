import { redirect } from 'next/navigation';

import PrimaryButton from '@/components/button/primary-button';
import Form from '@/components/form';
import { TextInput } from '@/components/input';
import SelectInput from '@/components/select';
import TextArea from '@/components/textarea';

import getMeAction from '@/actions/get-me.action';

import { tshirtSizes, tshirtTypes } from '@/constants/account.constants';

import removeAccountAction from './_actions/remove-account.action';
import updateUserProfileAction from './_actions/update-user-profile.action';
import RemoveAccountButton from './_components/remove-acount-button';

export default async function AccountDataPage() {
  const me = await getMeAction();

  if (!me?.user) {
    return redirect('/');
  }

  const { id, name, email, birthday, rg, cpf, tshirt, address } = me.user;

  return (
    <div>
      <Form<Partial<UserDTO>, { id: string }>
        action={updateUserProfileAction}
        additionalData={{ id: id }}
        className={'grid gap-1'}
      >
        <h3 className={'my-4 text-lg leading-none text-[--primary]'}>Geral</h3>
        <TextInput
          label={'Nome'}
          name={'name'}
          readonly
          defaultValue={name}
          required
        />
        <TextInput
          label={'E-mail'}
          name={'email'}
          readonly
          defaultValue={email}
          required
        />
        <TextInput
          label={'Data de Nascimento'}
          name={'birthday'}
          type={'date'}
          defaultValue={birthday}
          required
        />
        <TextArea
          label={'Endereço'}
          name={'address'}
          defaultValue={address}
          required
        />
        <h3 className={'my-4 text-lg leading-none text-[--primary]'}>
          Documentação
        </h3>
        <TextInput
          label={'CPF (Certidão de Pessoa Física)'}
          name={'cpf'}
          defaultValue={cpf}
          required
        />
        <TextInput
          label={'RG (Registro Geral)'}
          name={'rg'}
          defaultValue={rg}
          required
        />
        <h3 className={'my-4 text-lg leading-none text-[--primary]'}>
          Camiseta
        </h3>
        <SelectInput
          name={'tshirt.type'}
          label={'Tipo da Camiseta'}
          options={tshirtTypes}
          defaultValue={tshirt?.type}
          required
        />
        <SelectInput
          name={'tshirt.size'}
          label={'Tamanho da Camiseta'}
          options={tshirtSizes}
          defaultValue={tshirt?.size}
          required
        />
        <br />
        <small>
          <span className={'text-red-600'}>*</span> Campos obrigatórios.
        </small>
        <PrimaryButton tag={'button'} className={'w-min justify-self-end'}>
          Salvar
        </PrimaryButton>
      </Form>
      <h3 className={'my-4 text-lg leading-none text-[--primary]'}>Outros</h3>
      <RemoveAccountButton
        userId={id}
        removeAccountAction={removeAccountAction}
      />
    </div>
  );
}
