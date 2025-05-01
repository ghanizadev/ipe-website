'use client';

import { useUser } from '@/context/user.context';
import { useActionState } from 'react';

import PrimaryButton from '@/components/button/primary-button';
import { TextInput } from '@/components/input';
import { RecaptchaInput } from '@/components/recaptcha-input';
import SelectInput from '@/components/select';
import TextArea from '@/components/textarea';

import { tshirtSizes, tshirtTypes } from '@/constants/account.constants';

export default function UpdateForm(props: {
  updateAction: (
    initialState: {
      success: boolean;
      error?: Record<string, string[] | undefined>;
    },
    formData: FormData
  ) => Promise<{
    success: boolean;
    error?: Record<string, string[] | undefined>;
  }>;
}) {
  const form = useActionState(props.updateAction, {
    success: false,
  });
  const user = useUser();

  return (
    <form action={form[1]} className={'grid gap-1'}>
      <h3 className={'my-4 text-lg leading-none text-[--primary]'}>Geral</h3>
      <TextInput
        label={'Nome'}
        name={'name'}
        readonly
        defaultValue={user?.name}
        required
      />
      <TextInput
        label={'E-mail'}
        name={'email'}
        readonly
        defaultValue={user?.email}
        required
      />
      <TextInput
        label={'Data de Nascimento'}
        name={'birthday'}
        type={'date'}
        defaultValue={user?.birthday}
        required
      />
      <TextArea
        label={'Endereço'}
        name={'address'}
        defaultValue={user?.address}
        required
      />
      <h3 className={'my-4 text-lg leading-none text-[--primary]'}>
        Documentação
      </h3>
      <TextInput
        label={'CPF (Certidão de Pessoa Física)'}
        name={'cpf'}
        defaultValue={user?.cpf}
        required
      />
      <TextInput
        label={'RG (Registro Geral)'}
        name={'rg'}
        defaultValue={user?.rg}
        required
      />
      <h3 className={'my-4 text-lg leading-none text-[--primary]'}>Camiseta</h3>
      <SelectInput
        name={'tshirt.type'}
        label={'Tipo da Camiseta'}
        options={tshirtTypes}
        defaultValue={user?.tshirt?.type}
        required
      />
      <SelectInput
        name={'tshirt.size'}
        label={'Tamanho da Camiseta'}
        options={tshirtSizes}
        defaultValue={user?.tshirt?.size}
        required
      />
      <RecaptchaInput />
      <input type={'hidden'} name={'id'} value={user?.id} />
      <br />
      <small>
        <span className={'text-red-600'}>*</span> Campos obrigatórios.
      </small>
      <PrimaryButton tag={'button'} className={'w-min justify-self-end'}>
        Salvar
      </PrimaryButton>
    </form>
  );
}
