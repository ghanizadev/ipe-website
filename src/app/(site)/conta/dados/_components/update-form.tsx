'use client';

import { useUser } from '@/context/user.context';
import { useActionState, useEffect } from 'react';

import PrimaryButton from '@/components/button/primary-button';
import { TextInput } from '@/components/input';
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
  const [formState, formAction] = useActionState(props.updateAction, {
    success: false,
  });
  const [user, refresh] = useUser();

  useEffect(() => {
    if (formState.success) {
      refresh();
    }
  }, [formState, refresh]);

  return (
    <form action={formAction} className={'grid gap-1'}>
      <h3 className={'my-4 text-lg leading-none text-[--primary]'}>Geral</h3>
      <TextInput
        label={'Nome'}
        name={'name'}
        defaultValue={user?.name}
        required
        error={formState.error?.name?.[0]}
      />
      <TextInput
        label={'E-mail'}
        name={'email'}
        defaultValue={user?.email}
        required
        error={formState.error?.email?.[0]}
      />
      <TextInput
        label={'Data de Nascimento'}
        name={'birthday'}
        type={'date'}
        defaultValue={user?.birthday}
        required
        error={formState.error?.birthday?.[0]}
      />
      <TextArea
        label={'Endereço'}
        name={'address'}
        defaultValue={user?.address}
        required
        error={formState.error?.address?.[0]}
      />
      <h3 className={'my-4 text-lg leading-none text-[--primary]'}>
        Documentação
      </h3>
      <TextInput
        label={'CPF (Certidão de Pessoa Física)'}
        name={'cpf'}
        defaultValue={user?.cpf}
        required
        error={formState.error?.cpf?.[0]}
      />
      <TextInput
        label={'RG (Registro Geral)'}
        name={'rg'}
        defaultValue={user?.rg}
        required
        error={formState.error?.rg?.[0]}
      />
      <h3 className={'my-4 text-lg leading-none text-[--primary]'}>Camiseta</h3>
      <SelectInput
        name={'tshirt.type'}
        label={'Tipo da Camiseta'}
        options={tshirtTypes}
        defaultValue={user?.tshirt?.type}
        required
        error={formState.error?.['tshirt.type']?.[0]}
      />
      <SelectInput
        name={'tshirt.size'}
        label={'Tamanho da Camiseta'}
        options={tshirtSizes}
        defaultValue={user?.tshirt?.size}
        required
        error={formState.error?.['tshirt.size']?.[0]}
      />
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
